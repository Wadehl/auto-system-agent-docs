---
title: 快速上手
sidebar_label: 快速上手
slug: /
---

Auto System Agent 为现有自动化 Editor 提供一个本地 Agent 工作台。Web 负责对话，Go API 管理工作区与运行记录，Daemon 在本机启动 Claude Agent SDK Runtime。Editor 仍然是页面内容的权威来源。

## 准备环境

需要 Bun、Go、Claude Code CLI，以及本地可运行的 Editor 工程。Web、Go API 和 TypeScript Daemon 位于同一个 monorepo。

## 安装并配置

在 Agent 仓库根目录安装依赖，并创建本机配置：

~~~sh
make install
cp config.local.mk.example config.local.mk
~~~

编辑 config.local.mk，将 EDITOR_PATH 设置为 Editor 工程的绝对路径。需要打开指定页面时，可将完整页面 URL 配到 EDITOR_PAGE_URL。页面 URL 可能包含登录凭据，只保存在本机，不要提交或分享。

## 启动

~~~sh
make start
~~~

随后访问 http://dev.auto-system.ai-local.com:8080/。如果 Editor 已经运行，开发栈会复用它；否则根据 EDITOR_PATH 启动 Editor。

## 开始对话

1. 在 Editor 中进入开发模式。Agent 介入只在开发模式开放。
2. 等待页面快照同步到 Workspace。
3. 选择已有 Session 继续，或新建对话后发送任务。
4. Agent 提交 Patch 后，在 Editor 中审阅并保存。

:::warning 本地开发边界
当前是本地单用户开发版。开发模式开关不是服务端身份认证，不要将 API 或 Daemon 直接暴露到公网。
:::

下一步：[核心概念](/concepts) · [工作方式](/how-it-works)
