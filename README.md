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
