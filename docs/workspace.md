---
title: 工作区
sidebar_label: 工作区
---

Workspace 将一个 Editor 页面与 Agent 的稳定工作目录关联起来。Session 可以切换，当前 Editor Revision 只有一份。

## 页面与修订

一个 Editor 页面对应一个 Workspace。Editor 是页面数据来源；Go API 为已确认的快照建立 Revision，并维护当前 HEAD。所有 Agent Session 共用这个 HEAD。

同步以 Editor 业务状态为准，并通过稳定哈希避免无意义的新 Revision。Editor 保存后，Go 更新工作区快照；多次保存不会自动触发模型调用，下一次真实 Run 才让 Agent 读取当前快照和合并后的变化。

## Agent 文件空间

每个 Workspace 有稳定的 Agent 根目录。Editor 快照以只读形式位于 workspace/current/；CURRENT_WORKSPACE.md 说明当前版本与变更概况。Notes、Memory 和 Claude 运行时状态放在快照目录之外，更新 Revision 不需要替换 cwd。

Agent 通过范围受限的 deliver_patch 将 JSON Patch 交给 Editor。草稿目录中的普通文件变化不会自动应用到页面。

## 内容权威

:::tip
Editor 保存后的页面状态是权威内容。Agent Patch 只是待审阅提案；只有 Editor 应用并保存、Go API 确认新 Revision 后，修改才算交付。
:::

Revision 冲突表示服务端当前快照与 Editor 提交基线不一致。应先重新读取当前 Editor 快照并分析，不应直接覆盖服务端版本。
