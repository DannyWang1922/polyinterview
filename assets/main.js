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

  // 徽章按钮
  if (el("badges") && Array.isArray(c.badges)) {
    c.badges.forEach(function (b) {
      var a = document.createElement("a");
      a.className = "badge";
      a.href = b.url || "#";
      if (b.color) a.style.background = b.color;
      a.textContent = (b.icon ? b.icon + " " : "") + (b.label || "");
      // 带 alert 的徽章：点击弹提示框而不跳转
      if (b.alert) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          window.alert(b.alert);
        });
      } else if (b.url && b.url !== "#") {
        // 真实外链：新标签页打开
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      el("badges").appendChild(a);
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
