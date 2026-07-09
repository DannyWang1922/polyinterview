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
