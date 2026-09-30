---
title: 工作方式
sidebar_label: 工作方式
---

Web 负责交互，Go API 负责工作区与运行记录，Daemon 负责本机执行。Editor 保有页面的最终保存状态。

## 一次任务的链路

~~~mermaid
flowchart LR
  E["Editor<br/>页面快照"] --> W["Vue Web<br/>对话与审批"]
  W --> B["Web BFF<br/>同源转发"]
  B --> G["Go API<br/>Workspace · Revision · Run"]
  G --> D["TypeScript Daemon<br/>启动与事件转发"]
  D --> R["Claude Agent SDK<br/>Runtime"]
  R --> M["Anthropic API 兼容服务"]
  R -. "deliver_patch" .-> D
  D -. "请求人工确认" .-> W
  W -. "Editor 审阅并保存" .-> E
  E -. "确认后的新 Revision" .-> G

  classDef editor fill:#f8f9fa,stroke:#c7cbd1,color:#202124
  classDef web fill:#eef4ff,stroke:#9bb9e8,color:#202124
  classDef api fill:#f3f6fc,stroke:#9bb9e8,color:#202124
  classDef daemon fill:#fff4df,stroke:#e1a13a,color:#202124
  classDef runtime fill:#ffffff,stroke:#9aa0a6,color:#202124
  class E,M editor
  class W,B web
  class G api
  class D daemon
  class R runtime
~~~

## 发生了什么

1. Editor 在开发模式下向 Web 提供页面标识与当前快照。
2. Web 将 Workspace、Revision、Session 选择和用户消息提交给 Go API。
3. Go 准备稳定 Agent 工作目录，并将当前快照置于只读的 workspace/current/。
4. Go 请求 Daemon 启动 Run；Daemon 使用 Claude Agent SDK 创建或续接 Session。
5. Daemon → Go API → Web 通过 SSE 推送状态、文本增量、工具请求和最终结果。
6. Patch 由 Editor 审阅并保存；服务端确认新 Revision 后，才把成功工具结果交回 Runtime。

## 数据与执行边界

| 组件 | 负责 | 不负责 |
| --- | --- | --- |
| Vue Web | Editor 桥接、聊天、Session 选择、SSE 和人工审批。 | 不作为 Workspace / Revision 的权威存储。 |
| Go API | Workspace、Revision、Session 绑定、Run 与 FollowUp 记录。 | 不执行 Claude 模型请求。 |
| Daemon | Runtime 生命周期、事件转发和受限工具。 | 不长期保存 Run 与事件历史。 |
| Editor | 页面编辑、Patch 审阅、保存与最终页面状态。 | 不管理 Agent Session 或 Runtime 生命周期。 |

:::info
Go API 的运行记录与 Claude Session 上下文是两类数据。Daemon 重启会中断活动 Runtime；已保存 Session 可供新的 Run 尝试续接。
:::
