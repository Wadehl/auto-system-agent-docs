---
title: 运行
sidebar_label: 运行
---

Run 表示一次执行，不是长期会话。一个 Workspace 可以通过多个 Session 开展不同对话，刷新后仍能回到对应 Session 查看和继续。

## 发起与恢复

用户发送消息后，Web 请求 Go API 创建 Run。用户可以继续最近 Session、切换历史 Session，或新建对话。Go 保存 Workspace 与 Session 绑定及运行历史；对话正文从 Claude 本地 Session 记录重建。

运行状态、文本增量、工具请求和最终结果通过 SSE 推送。刷新页面后，Web 恢复 Session、消息与未完成工具请求，再订阅活动 Run。

## FollowUp、Steering 与取消

运行期间的新消息默认进入 FollowUp；用户明确选择“引导”时，可以作为 Steering 发送给活动 Runtime。Go API 记录消息，并按运行状态处理。取消操作请求 Daemon 停止 Runtime，并更新 Run 终态。

## 工具结果与交付

Agent 请求 deliver_patch 后，Editor 审阅并保存。Web 将确认过的 Revision 回传，Go 校验 Revision 后，工具结果才返回 Daemon。送达状态不确定时会保留记录供核对，避免静默重复执行。

:::tip
Run 完成只说明这一轮执行结束；用户仍可在同一 Session 中继续对话。
:::
