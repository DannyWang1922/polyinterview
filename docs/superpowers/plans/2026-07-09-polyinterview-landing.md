# PolyInterview 项目主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建一个纯静态、数据/模板分离的学术风格项目主页，占位内容贴合 AI/LLM 面试主题，定稿后只改 `assets/content.js` 即可替换，最终部署到 GitHub Pages。

**Architecture:** `index.html` 提供带 id 的空骨架；`assets/content.js` 集中所有可替换内容（`window.SITE_CONTENT`）；`assets/main.js` 在 `DOMContentLoaded` 时读取配置渲染进 DOM；`assets/style.css` 负责单列居中的学术布局。媒体全部用本地占位资源（SVG / 本地 HTML），无外部 CDN 依赖。

**Tech Stack:** 原生 HTML5 + CSS3 + Vanilla JS（无框架、无构建）。验证用 Playwright MCP 打开本地文件截图核对。

---

## 文件结构

```
polyinterview/
├── index.html              # 结构骨架（空容器 + id）
├── assets/
│   ├── content.js          # ★内容配置 window.SITE_CONTENT
│   ├── main.js             # 渲染逻辑
│   └── style.css           # 样式
├── media/
│   ├── teaser-poster.svg   # 视频占位封面
│   ├── figure.svg          # 方法图占位
│   └── demo-placeholder.html # Examples iframe 占位页
└── README.md               # 替换内容 + 部署说明
```

职责边界:
- `content.js`: 纯数据，无逻辑，是定稿后唯一编辑点。
- `main.js`: 纯渲染，读 `SITE_CONTENT` 写 DOM，不含内容常量。
- `style.css`: 纯样式。
- `index.html`: 骨架 + 引入顺序（content.js 先于 main.js）。

---

## Task 1: 页面骨架 index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: 写 index.html 骨架**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PolyInterview</title>
  <link rel="stylesheet" href="assets/style.css" />
</head>
<body>
  <main class="container">
    <h1 id="title"></h1>
    <nav id="badges" class="badges"></nav>
    <p id="note" class="note"></p>
    <hr />
    <section id="teaser" class="media-block"></section>
    <hr />
    <section id="figure" class="media-block"></section>
    <p id="abstract" class="abstract"></p>
    <hr />
    <h3 class="section-title">Examples</h3>
    <section id="examples"></section>
  </main>
  <script src="assets/content.js"></script>
  <script src="assets/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add landing page skeleton"
```

---

## Task 2: 内容配置 content.js

**Files:**
- Create: `assets/content.js`

- [ ] **Step 1: 写 content.js（含 AI 面试主题占位文案）**

```js
// 论文定稿后只需编辑此文件即可替换全部内容。
window.SITE_CONTENT = {
  title:
    "PolyInterview: An LLM-based Personalized Multi-Round Interview Simulation and Evaluation System",
  badges: [
    { icon: "📄", label: "Paper", url: "#" },
    { icon: "⭐", label: "GitHub", url: "#" },
    { icon: "🚀", label: "Online Demo", url: "#" },
    { icon: "📺", label: "Video", url: "#" },
  ],
  note:
    "[Note: The online demo runs on limited resources and may respond slowly under load. Please be patient.]",
  // teaser.src 为空时只显示 poster；定稿后填入视频地址（本地路径或外链 mp4）。
  teaser: { poster: "media/teaser-poster.svg", src: "" },
  figure: { src: "media/figure.svg", alt: "PolyInterview method overview" },
  abstract:
    "Preparing for job interviews is stressful, and access to realistic, personalized practice remains scarce. While large language models (LLMs) can hold fluent conversations, most interview tools rely on fixed question banks and generic feedback, ignoring a candidate's target role, resume, and prior answers. In this paper, we introduce PolyInterview, an LLM-based personalized and interactive interview simulation and evaluation system. PolyInterview conducts structured multi-round mock interviews that adapt questions to the candidate's background and real-time responses, spanning behavioral, technical, and role-specific stages. After each session it produces a multi-dimensional evaluation report covering communication, technical depth, and role fit, together with actionable improvement suggestions. Experiments show that PolyInterview generates more relevant questions and more consistent, well-calibrated assessments than strong LLM baselines, while remaining responsive enough for interactive use. (Placeholder abstract — replace with the final version once the paper is ready.)",
  examples: [
    { src: "media/demo-placeholder.html" },
    { src: "media/demo-placeholder.html" },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add assets/content.js
git commit -m "feat: add site content config with placeholder copy"
```

---

## Task 3: 渲染逻辑 main.js

**Files:**
- Create: `assets/main.js`

- [ ] **Step 1: 写 main.js**

```js
(function () {
  var c = window.SITE_CONTENT || {};

  function el(id) {
    return document.getElementById(id);
  }

  // 标题
  if (el("title")) el("title").textContent = c.title || "";

  // 备注
  if (el("note")) el("note").textContent = c.note || "";

  // 徽章按钮
  if (el("badges") && Array.isArray(c.badges)) {
    c.badges.forEach(function (b) {
      var a = document.createElement("a");
      a.className = "badge";
      a.href = b.url || "#";
      a.textContent = (b.icon ? b.icon + " " : "") + (b.label || "");
      el("badges").appendChild(a);
    });
  }

  // 主视频
  if (el("teaser") && c.teaser) {
    var v = document.createElement("video");
    v.controls = true;
    if (c.teaser.poster) v.poster = c.teaser.poster;
    v.setAttribute("playsinline", "");
    if (c.teaser.src) {
      var s = document.createElement("source");
      s.src = c.teaser.src;
      v.appendChild(s);
    }
    el("teaser").appendChild(v);
  }

  // 方法图
  if (el("figure") && c.figure) {
    var img = document.createElement("img");
    img.src = c.figure.src || "";
    img.alt = c.figure.alt || "";
    el("figure").appendChild(img);
  }

  // 摘要
  if (el("abstract")) el("abstract").textContent = c.abstract || "";

  // Examples iframes
  if (el("examples") && Array.isArray(c.examples)) {
    c.examples.forEach(function (ex) {
      var wrap = document.createElement("div");
      wrap.className = "embed";
      var f = document.createElement("iframe");
      f.src = ex.src || "";
      f.setAttribute("loading", "lazy");
      wrap.appendChild(f);
      el("examples").appendChild(wrap);
    });
  }
})();
```

- [ ] **Step 2: Commit**

```bash
git add assets/main.js
git commit -m "feat: render site content into the DOM"
```

---

## Task 4: 样式 style.css

**Files:**
- Create: `assets/style.css`

- [ ] **Step 1: 写 style.css**

```css
:root {
  --fg: #1f2d3d;
  --muted: #6b7280;
  --line: #e5e7eb;
  --bg: #ffffff;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
}

.container {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

#title {
  text-align: center;
  font-size: 1.9rem;
  font-weight: 700;
  margin: 0 0 24px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.badge {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 999px;
  background: #3b82f6;
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: transform 0.1s ease, opacity 0.1s ease;
}
.badge:hover { opacity: 0.9; transform: translateY(-1px); }
.badge:nth-child(2) { background: #374151; }
.badge:nth-child(3) { background: #ef4444; }
.badge:nth-child(4) { background: #0ea5e9; }

.note {
  text-align: center;
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0 0 8px;
}

hr {
  border: none;
  border-top: 1px solid var(--line);
  margin: 32px 0;
}

.media-block { text-align: center; }
.media-block video,
.media-block img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
.media-block video { width: 100%; background: #000; }

.abstract {
  text-align: justify;
  margin-top: 24px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 16px;
}

.embed {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  margin-bottom: 28px;
  background: #1f2226;
  border-radius: 4px;
  overflow: hidden;
}
.embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 600px) {
  #title { font-size: 1.5rem; }
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/style.css
git commit -m "feat: add landing page styles"
```

---

## Task 5: 占位媒体资源

**Files:**
- Create: `media/teaser-poster.svg`
- Create: `media/figure.svg`
- Create: `media/demo-placeholder.html`

- [ ] **Step 1: 写 teaser-poster.svg（16:9 灰底 + 播放提示）**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <rect width="1280" height="720" fill="#e5e7eb"/>
  <circle cx="640" cy="360" r="70" fill="#9ca3af"/>
  <polygon points="615,320 615,400 685,360" fill="#ffffff"/>
  <text x="640" y="500" font-family="sans-serif" font-size="34" fill="#6b7280" text-anchor="middle">PolyInterview — Teaser Video Placeholder</text>
</svg>
```

- [ ] **Step 2: 写 figure.svg（方法图占位）**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" width="1200" height="500">
  <rect width="1200" height="500" fill="#f3f4f6" stroke="#d1d5db" stroke-width="2"/>
  <text x="600" y="250" font-family="sans-serif" font-size="36" fill="#9ca3af" text-anchor="middle">Method Figure Placeholder</text>
  <text x="600" y="300" font-family="sans-serif" font-size="20" fill="#b0b5bd" text-anchor="middle">Replace media/figure.svg with the real pipeline diagram</text>
</svg>
```

- [ ] **Step 3: 写 demo-placeholder.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    html, body { margin: 0; height: 100%; }
    body {
      display: flex; align-items: center; justify-content: center;
      background: #1f2226; color: #9ca3af;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 22px;
    }
  </style>
</head>
<body>
  <div>Demo Placeholder</div>
</body>
</html>
```

- [ ] **Step 4: Commit**

```bash
git add media/teaser-poster.svg media/figure.svg media/demo-placeholder.html
git commit -m "feat: add placeholder media assets"
```

---

## Task 6: 浏览器验证

**Files:** 无（验证任务）

- [ ] **Step 1: 用 Playwright MCP 打开本地页面**

用 `mcp__playwright__browser_navigate` 打开 `file:///Users/DannyWang/VSCodeProject/polyinterview/index.html`。

- [ ] **Step 2: 截全页图核对**

用 `mcp__playwright__browser_take_screenshot`（fullPage）截图，Read 后核对:
- 标题居中显示完整文案。
- 四个彩色胶囊按钮一排（蓝/深灰/红/浅蓝），文本含 emoji。
- 备注小字灰色居中。
- 视频区显示 teaser poster（播放三角 + 提示文字）。
- 方法图占位可见。
- 摘要段落两端对齐显示。
- Examples 下两个 16:9 深色 iframe，中央显示 "Demo Placeholder"。

- [ ] **Step 3: 检查 console 无报错**

用 `mcp__playwright__browser_console_messages` 确认无 JS 错误（尤其 content.js/main.js 加载顺序）。

- [ ] **Step 4: 如有问题修复后重新截图；无问题则继续**

---

## Task 7: README 与部署说明

**Files:**
- Create: `README.md`

- [ ] **Step 1: 写 README.md**

````markdown
# PolyInterview Project Page

PolyInterview 项目介绍主页。纯静态，无构建，托管于 GitHub Pages。

## 本地预览

直接用浏览器打开 `index.html`，或起一个本地静态服务器（推荐，避免 file:// 下 iframe 限制）:

```bash
python3 -m http.server 8000
```

然后访问 http://localhost:8000 。

## 替换内容（论文定稿后）

绝大多数内容只需编辑一个文件: **`assets/content.js`**

- `title` — 论文标题
- `badges` — 顶部按钮的链接（Paper / GitHub / Online Demo / Video 的真实 URL）
- `note` — 标题下方备注（不需要可设为空字符串）
- `teaser.src` — 主视频地址（填入后自动播放器可播；为空则只显示封面）
- `figure.src` — 方法流程图（替换 `media/figure.svg`，或改成 png/jpg 路径）
- `abstract` — 摘要正文
- `examples` — 每个元素的 `src` 指向一个 demo 页/视频（替换 `media/demo-placeholder.html`）

媒体文件放在 `media/` 目录，替换同名文件或改 `content.js` 里的路径即可。

## 部署到 GitHub Pages

1. 将本仓库推送到 GitHub。
2. 仓库 Settings → Pages → Build and deployment → Source 选 **Deploy from a branch**。
3. Branch 选 `main`，目录选 `/ (root)`，保存。
4. 稍等片刻，通过 `https://<用户名>.github.io/<仓库名>/` 访问。
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with content-swap and deploy guide"
```

---

## Self-Review 记录

- **Spec 覆盖:** 骨架(T1)、content.js 数据分离(T2)、渲染约定(T3)、样式要点(T4)、占位媒体(T5)、验证(T6)、部署+替换说明 README(T7) 均覆盖；板块与参考站一致，未加作者/BibTeX/表格（符合 YAGNI 段）。
- **占位扫描:** abstract 为完整占位英文（非 TODO），媒体为真实可渲染的 SVG/HTML，无空 TODO。
- **类型一致:** `SITE_CONTENT` 字段名（title/badges/note/teaser{poster,src}/figure{src,alt}/abstract/examples[{src}]）在 content.js 定义与 main.js 消费处逐一对应；DOM id（title/badges/note/teaser/figure/abstract/examples）在 index.html 与 main.js 一致。
- **加载顺序:** index.html 中 content.js 在 main.js 之前引入，保证 `window.SITE_CONTENT` 就绪。
