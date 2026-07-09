# PolyInterview 项目主页 — 设计文档

日期: 2026-07-09
状态: 已确认，待实现

## 1. 目标

为 PolyInterview 项目搭建一个学术风格的介绍主页，参考 InteractiveSurvey (https://technicolorguo.github.io/InteractiveSurvey/) 的布局。

关键约束:
- 论文内容尚未定稿，先用**贴近 AI/LLM 面试主题的占位内容**填充。
- 定稿后能**快速替换**内容，最好只改一个文件。
- 纯静态，之后部署到 **GitHub Pages** 供公网访问，无构建步骤、无外部 CDN 依赖。

## 2. 参考站布局（单列居中，自上而下）

1. 大标题（论文题目，H1 居中）
2. 一排彩色胶囊按钮: 📄 Paper / ⭐ GitHub / 🚀 Online Demo / 📺 Video
3. 一行灰色小字备注
4. 分隔线 → 主视频（带播放器）
5. 分隔线 → 方法流程图（一张大图）
6. Abstract 摘要段落
7. 分隔线 → "Examples" 小标题 + 两个内嵌 iframe demo

本项目板块与参考站**逐一对应**，不增不减（已确认不加作者/单位、BibTeX、结果表格）。

## 3. 核心设计: 数据与模板分离

所有会被替换的内容集中在单个 `assets/content.js` 的配置对象 `window.SITE_CONTENT` 中。`index.html` 只提供空的结构骨架（带 id 的容器），由 `assets/main.js` 在页面加载时读取配置并渲染进 DOM。

论文定稿后，**只需编辑 `assets/content.js`**（标题、链接、备注、视频、图、摘要、demo 链接），无需改动 HTML/CSS。

## 4. 文件结构

```
polyinterview/
├── index.html              # 结构骨架（空容器 + 占位 id）
├── assets/
│   ├── content.js          # ★唯一需要改的内容配置（window.SITE_CONTENT）
│   ├── main.js             # 读取 content.js 渲染到页面
│   └── style.css           # 样式（居中单列、胶囊按钮、分隔线）
├── media/
│   ├── teaser-poster.svg   # 视频占位封面
│   ├── figure.svg          # 方法流程图占位（灰底 + 提示文字）
│   └── demo-placeholder.html  # Examples iframe 的占位页
└── README.md               # 内容替换步骤 + GitHub Pages 部署步骤
```

## 5. content.js 数据结构

```js
window.SITE_CONTENT = {
  title: "PolyInterview: An LLM-based Personalized Multi-Round Interview Simulation and Evaluation System",
  badges: [
    { icon: "📄", label: "Paper",       url: "#" },
    { icon: "⭐", label: "GitHub",      url: "#" },
    { icon: "🚀", label: "Online Demo", url: "#" },
    { icon: "📺", label: "Video",       url: "#" },
  ],
  note: "[Note: The online demo runs on limited resources and may respond slowly under load. Please be patient.]",
  teaser: { poster: "media/teaser-poster.svg", src: "" },   // src 为空时只显示 poster
  figure: { src: "media/figure.svg", alt: "PolyInterview method overview" },
  abstract: "……（贴合 AI 面试主题的占位摘要，一段）",
  examples: [
    { src: "media/demo-placeholder.html" },
    { src: "media/demo-placeholder.html" },
  ],
};
```

### 渲染约定（main.js 行为）
- `title` → 写入 `#title`。
- `badges` → 生成一排 `<a class="badge">`，文本为 `icon + label`，`href` 为 `url`。
- `note` → 写入 `#note`。
- `teaser` → `<video controls poster=...>`；若 `src` 非空则设置 `<source>`，为空时仅展示 poster（占位阶段）。
- `figure` → `<img src alt>`。
- `abstract` → 写入 `#abstract` 段落。
- `examples` → 每项生成一个 `<iframe src>`，包在响应式 16:9 容器中。

## 6. 占位内容（AI/LLM 面试主题）

- 标题: "PolyInterview: An LLM-based Personalized Multi-Round Interview Simulation and Evaluation System"
- 摘要: 一段占位英文，描述基于 LLM 的多轮个性化模拟面试与评估系统的动机与能力（后续替换为真实摘要）。
- 视频: 无真实源，仅 `teaser-poster.svg` 占位封面。
- 方法图: `figure.svg` 灰底 + "Method Figure Placeholder" 文字。
- Examples: 两个 iframe，均指向本地 `demo-placeholder.html`（页面中央显示 "Demo Placeholder"）。

## 7. 样式要点

- 单列居中，容器 `max-width` 约 820px，左右自动留白。
- 标题居中加粗，深色。
- 胶囊按钮: 圆角、彩色背景、白字、hover 微交互；一排横向排列，窄屏自动换行。
- 分隔线: 细灰色 `<hr>`。
- 视频/iframe: 响应式，宽度撑满容器，保持 16:9。
- 移动端友好（`viewport` meta + 相对单位）。
- 不引入任何外部 CDN / 字体 / 框架，使用系统字体栈。

## 8. 部署（GitHub Pages）

纯静态、无构建。推送到 GitHub 仓库后:
Settings → Pages → Source 选 `main` 分支、目录 `/ (root)` → 保存，即可通过 `https://<user>.github.io/<repo>/` 访问。

README 需包含:
1. 本地预览方式（直接用浏览器打开 index.html，或起一个本地静态服务器）。
2. 如何替换内容（只改 `assets/content.js` 与 `media/` 里的资源）。
3. GitHub Pages 部署步骤。

## 9. 不做的（YAGNI）

- 不加作者/单位、BibTeX 引用框、结果对比表格。
- 不引入框架、打包工具、CSS 框架、CDN 依赖。
- 不做多页面、路由、暗色模式切换等额外功能。
