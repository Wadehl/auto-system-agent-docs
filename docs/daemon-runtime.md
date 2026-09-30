---
title: 守护进程与运行时
sidebar_label: 守护进程与运行时
---

本地 Daemon 是 Go API 与 Agent Runtime 之间的执行桥梁。它管理执行进程和工具交互，但不拥有长期 Workspace 或 Session 记录。

## Daemon 职责

TypeScript Daemon 监听本机回环地址，接收 Go API 的 Run 请求，校验工作区路径，启动 Claude Agent SDK Runtime，并将 SSE 事件、工具请求和终态返回给 Go API。它也负责取消执行、限制并发及托管 Runtime Tools。

浏览器经 Web BFF 与 Go API 通信，不直接访问 Daemon 内部接口。

## 稳定工作目录

每个 Workspace 有稳定的 Agent 根目录。Editor 快照以只读形式位于 workspace/current/；Notes、Memory 和 Claude 运行时状态各自位于快照之外。更新 Revision 不需要更换 cwd。

Bash 在操作系统沙箱中执行。SDK 直接的 Write / Edit 工具不开放；Editor 变更必须通过范围受限的 Patch 和人工审阅完成。

## 进程与恢复边界

| 状态 | Daemon 重启后 | 说明 |
| --- | --- | --- |
| 活动 Runtime | 不恢复 | 原 Run 中断，需要新 Run。 |
| 内存事件缓冲 | 不恢复 | Daemon 进程内的事件重放消失。 |
| Go Workspace / Session 绑定 | 保留 | 由本地 Go Store 持久化。 |
| Claude Session 文件 | 保留 | 新 Runtime 可尝试续接 Session。 |
| Editor Revision | 保留 | 由 Go API 的本地 Workspace Store 管理。 |

Session 可恢复不代表 Run 可恢复：新的 Runtime 能继续对话上下文，但不会自动恢复旧子进程、外部副作用或不确定的工具调用。

## 部署边界

当前系统面向可信任的本地单用户开发。未来可以将 API 与 Daemon 放在服务器，为工作区提供隔离执行环境；在此之前，还需要补齐身份认证、共享持久化、分布式调度与幂等、配额、密钥隔离和沙箱网络策略。

:::warning
“本地 Workspace + Runtime 类似云端 Pod”是部署形态上的类比，不代表当前已经具备 Pod 的隔离、弹性或故障恢复语义。
:::
