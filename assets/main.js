(function () {
  var c = window.SITE_CONTENT || {};

  function el(id) {
    return document.getElementById(id);
  }

  // 图片 + 可选说明文字，追加到指定容器
  function appendFigure(container, fig) {
    if (!fig || !fig.src) return;
    var img = document.createElement("img");
    img.src = fig.src;
    img.alt = fig.alt || "";
    img.setAttribute("loading", "lazy");
    container.appendChild(img);
    if (fig.caption) {
      var cap = document.createElement("p");
      cap.className = "figure-caption";
      cap.textContent = fig.caption;
      container.appendChild(cap);
    }
  }

  // 标题（允许用 <br> 控制断行）
  if (el("title")) el("title").innerHTML = c.title || "";

  // 备注
  if (el("note")) el("note").textContent = c.note || "";

  // 普通徽章：emoji + 文字的药丸链接
  function makeBadge(b) {
    var a = document.createElement("a");
    a.className = "badge";
    a.href = b.url || "#";
    if (b.color) a.style.background = b.color;
    a.textContent = (b.icon ? b.icon + " " : "") + (b.label || "");
    if (b.alert) {
      // 带 alert 的徽章：点击弹提示框而不跳转
      a.addEventListener("click", function (e) {
        e.preventDefault();
        window.alert(b.alert);
      });
    } else if (b.url && b.url !== "#") {
      // 真实外链：新标签页打开
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  // 徽章按钮
  if (el("badges") && Array.isArray(c.badges)) {
    c.badges.forEach(function (b) {
      // 多平台徽章：渲染为 label: 品牌色图标 品牌色图标，图标可点跳转
      if (Array.isArray(b.platforms)) {
        var lbl = document.createElement("span");
        lbl.className = "badge-label";
        lbl.appendChild(document.createTextNode((b.label || "") + ":"));
        b.platforms.forEach(function (p) {
          var link = document.createElement("a");
          link.className = "video-link";
          link.href = p.url || "#";
          if (p.color) link.style.color = p.color;
          if (p.title) {
            link.title = p.title;
            link.setAttribute("aria-label", p.title);
          }
          if (p.iconSvg) link.innerHTML = p.iconSvg;
          if (p.url && p.url !== "#") {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
          }
          lbl.appendChild(link);
        });
        el("badges").appendChild(lbl);
      } else {
        el("badges").appendChild(makeBadge(b));
      }
    });
  }

  // 主视频：src 为空时只显示 poster 封面图（占位阶段），非空时才渲染播放器
  if (el("teaser") && c.teaser) {
    if (c.teaser.src) {
      var v = document.createElement("video");
      v.controls = true;
      if (c.teaser.poster) v.poster = c.teaser.poster;
      v.setAttribute("playsinline", "");
      var s = document.createElement("source");
      s.src = c.teaser.src;
      v.appendChild(s);
      el("teaser").appendChild(v);
    } else if (c.teaser.poster) {
      var pimg = document.createElement("img");
      pimg.src = c.teaser.poster;
      pimg.alt = "Teaser video placeholder";
      el("teaser").appendChild(pimg);
    }
  }

  // 工作流总览图
  if (el("workflow")) appendFigure(el("workflow"), c.workflow);

  // 摘要
  if (el("abstract")) el("abstract").textContent = c.abstract || "";

  // 方法图
  if (el("figure")) appendFigure(el("figure"), c.figure);

  // 单张截图卡片（图 + 说明）
  function buildShot(ex) {
    var shot = document.createElement("figure");
    shot.className = "shot";
    if (ex.caption) {
      var cap = document.createElement("figcaption");
      cap.className = "shot-caption";
      cap.textContent = ex.caption;
      shot.appendChild(cap);
    }
    var img = document.createElement("img");
    img.src = ex.src || "";
    img.alt = ex.caption || "";
    img.setAttribute("loading", "lazy");
    shot.appendChild(img);
    return shot;
  }

  // Examples: 真实 UI 截图走查。带 row 数组的项渲染为一行多列并排。
  if (el("examples") && Array.isArray(c.examples)) {
    c.examples.forEach(function (ex) {
      if (Array.isArray(ex.row)) {
        var rowEl = document.createElement("div");
        rowEl.className = "shot-row";
        ex.row.forEach(function (item) {
          rowEl.appendChild(buildShot(item));
        });
        el("examples").appendChild(rowEl);
      } else {
        el("examples").appendChild(buildShot(ex));
      }
    });
  }
})();
