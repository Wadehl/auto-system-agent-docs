---
title: Skills / MCP
sidebar_label: Skills / MCP
---

当前提供项目内置的 Agent 指令与 Runtime Tools，不会自动继承开发者本机的全部 Skill 或 MCP 配置。

## 当前内置能力

Daemon 在每次运行中注入自动化编辑 Agent 的身份、Patch 边界，以及依赖安装和验证要求。这些指令随项目版本维护，帮助 Agent 遵循 Editor 的 ai-meta 契约。

Daemon 管理的 MCP 工具包括向 Editor 提交 Patch、向用户提问等工作台能力。工具请求经 Go API 和 Web 传递；Patch 由用户在 Editor 审阅并保存，服务端确认新 Revision 后才向 Agent 返回成功。

## 不会自动继承本机配置

用户全局 Skill、Claude 插件和 .mcp.json 不会因本项目启动 Runtime 而自动挂载，以免无意继承宿主机权限、凭据或执行范围。独立启动的 MCP Server 也需要单独的沙箱边界。

## 后续方向：动态加载

后续可以建设按 Workspace 授权的能力目录，支持动态加载外部 Skill、CLI MCP，以及经审核接入的 SSE MCP Client / Server。每种能力都应明确来源、工具权限、网络访问、凭据范围和交付范围，再由用户或管理员显式授权。

:::warning
动态 Skill 加载、通用 MCP 目录和 SSE MCP 接入目前均属规划，不是已交付能力。
:::
