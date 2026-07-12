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
- `badges` — 顶部按钮数组，每项 `{ icon, label, url, color }`。`url` 填真实链接；`color` 可选（不填用默认蓝色）。增删/重排按钮只改这个数组即可，无需动 CSS。若某一项带 `platforms` 数组（如 Video 同时在 B 站/YouTube 上线），则渲染为 `label: 图标 图标` 的形式：`label` 为放大的文字，冒号后每个平台 `{ title, url, color, iconSvg }` 是可点跳转的品牌色内联图标（`iconSvg` 用 `fill="currentColor"`，颜色由 `color` 控制）。
- `note` — 标题下方备注（不需要可设为空字符串）
- `teaser.src` — 主视频地址（填入后渲染播放器；为空则只显示 `teaser.poster` 封面图）
- `workflow` — 工作流总览图 `{ src, alt, caption }`（视频下方那张大图）
- `abstract` — 摘要正文
- `figure` — 方法流程图 `{ src, alt, caption }`
- `examples` — UI 截图走查数组，每项 `{ src, caption }`；`src` 是图片路径，`caption` 是该截图的说明

媒体文件放在 `media/` 目录，替换同名文件或改 `content.js` 里的路径即可。

### 常见替换示例

```js
// 按钮：换真实链接
badges: [
  { icon: "📄", label: "Paper",  url: "https://arxiv.org/abs/XXXX.XXXXX", color: "#3b82f6" },
  { icon: "⭐", label: "GitHub", url: "https://github.com/you/polyinterview", color: "#374151" },
],

// 主视频：本地 mp4 + 封面
teaser: { poster: "media/teaser-poster.jpg", src: "media/teaser.mp4" },

// Examples：截图 + 说明
examples: [
  { src: "media/ui/setup.png", caption: "Personalized setup ..." },
  { src: "media/ui/live.png",  caption: "Immersive live interview ..." },
],
```

## 部署到 GitHub Pages

1. 将本仓库推送到 GitHub。
2. 仓库 Settings → Pages → Build and deployment → Source 选 **Deploy from a branch**。
3. Branch 选 `main`，目录选 `/ (root)`，保存。
4. 稍等片刻，通过 `https://<用户名>.github.io/<仓库名>/` 访问。
