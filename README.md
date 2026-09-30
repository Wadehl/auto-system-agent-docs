# Auto System Agent Docs

该仓库只包含公开文档，不包含 Agent API、Daemon 或 Web 产品源代码。

文档站基于 Docusaurus 官方 Classic 文档主题，使用 Markdown 页面与官方 Mermaid 主题；导航、页面布局、标题目录和代码高亮使用框架默认能力，没有自制文档组件。

## 本地开发

~~~sh
bun install
bun run start
~~~

## 构建并预览

~~~sh
bun run build
bun run serve
~~~

## 部署

Vercel 从 main 分支自动部署。vercel.json 固定 Bun 安装命令、Docusaurus 构建命令和静态输出目录。
