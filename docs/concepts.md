---
title: 核心概念
sidebar_label: 核心概念
---

把工作区、修订、会话、运行和运行时分开理解，才能看清数据归属与恢复边界。

![工作区共享唯一当前快照，会话在其下分支；每次运行由临时 Runtime 执行](/img/workspace-session-concept.png)

<p className="concept-caption">一个 Workspace 共用一份当前 Revision；不同 Session 独立对话，每个 Session 可产生多次 Run。</p>

## 对象关系

~~~mermaid
flowchart LR
  E["Editor 页面"] -->|"保存快照"| W

  subgraph W["Workspace · 一个稳定工作区"]
    direction TB
    V["当前 Revision<br/>唯一"]
    S1["Session A"]
    S2["Session B"]
  end

  S1 -->|"多次执行"| R1(["Run 1"])
  S1 --> R2(["Run 2"])
  S2 --> R3(["Run 1"])
  R2 -. "仅本次运行" .-> T["Claude Runtime<br/>临时进程"]

  classDef source fill:#f8f9fa,stroke:#c7cbd1,color:#202124
  classDef revision fill:#fff4df,stroke:#e1a13a,stroke-width:2px,color:#202124
  classDef session fill:#eef4ff,stroke:#9bb9e8,color:#202124
  classDef run fill:#ffffff,stroke:#b9c0cc,color:#303846
  classDef runtime fill:#f4f5f7,stroke:#9aa0a6,stroke-dasharray:4 3,color:#5f6368
  class E source
  class V revision
  class S1,S2 session
  class R1,R2,R3 run
  class T runtime
~~~

## 对象说明

| 对象 | 含义 | 归属 |
| --- | --- | --- |
| Editor | 页面编辑与保存界面，是页面内容的权威来源。 | 自动化平台 |
| Workspace | 一个 Editor 页面在 Agent 系统中的稳定工作空间。 | Go API |
| Revision | Workspace 唯一的当前 Editor 快照；所有 Session 共用。 | Go API 保存，快照来自 Editor |
| Session | 可持续的 Claude 对话上下文；一个 Workspace 可以有多个。 | Claude 本地记录，Go 保存最近绑定 |
| Run | 一次用户触发的执行，可续接某个 Session。 | Go 记录，Daemon 执行 |
| Runtime | 一次实际的模型执行进程，不等于长期会话。 | Daemon |

## 记住这条边界

一个 Editor 页面对应一个 Workspace。Workspace 当前只有一个 Revision，但可以有多个 Session；Session 可包含多次 Run。切换 Session 不会切换 Revision。Daemon 重启会中断活动 Runtime，却不一定删除本机持久化的 Claude Session 文件。

:::tip 简单记法
Workspace 是容器，Revision 是当前快照，Session 是对话上下文，Run 是单次执行，Runtime 是执行进程。
:::
