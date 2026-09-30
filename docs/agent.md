---
title: 智能体
sidebar_label: 智能体
---

当前默认使用 Claude Agent SDK。Agent 身份、工具边界和 Session 续接由本机 Daemon 管理；Web 不直接连接模型服务。

## 默认：Claude Agent

Daemon 使用 Claude Agent SDK 的 query 执行模型交互。新对话创建 Claude Session；继续对话时，Go API 提供保存的 Session ID，Daemon 用它请求续接。

系统指令将 Agent 定义为自动化编辑 Agent：理解 Editor 导出的 ai-meta 与 Vue 工作区，按用户目标生成可验证的 Patch，并经 Editor 人工确认交付。它不是通用系统管理员，不能绕过 Editor 审核发布页面。

## 模型与工具

模型服务使用本机明确配置的 Anthropic API 风格凭据。当前工具包含只读文件检索、操作系统沙箱内 Bash，以及 Daemon 提供的 deliver_patch、ask_user 等工作台工具。本机其他插件和工具配置不会自动继承。

## 后续方向：拓展 Runtime

未来可以在 Runtime 接口边界增加不同 Agent SDK 或 CLI Runtime。当前实际运行链路仍是 Claude Agent SDK；Provider、模型和 Runtime 是不同层次，接入另一模型服务不意味着已经支持其他 Runtime。

:::info
Session ID 属于具体 Runtime 的会话机制。不同 Runtime 间不能假定 ID 可迁移；跨 Runtime 需要显式的上下文交接设计。
:::
