
document.documentElement.classList.add('js');
const tabList = document.querySelector('.view-list');
const tabs = [...tabList.querySelectorAll('[role="tab"]')];
function selectView(index) {
  tabs.forEach((tab, position) => {
    const active = position === index;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
}
const narrow = window.matchMedia('(max-width:740px)');
function updateOrientation() {
  tabList.setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
}
updateOrientation();
narrow.addEventListener('change', updateOrientation);
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectView(index));
  tab.addEventListener('keydown', event => {
    const forward = narrow.matches ? 'ArrowRight' : 'ArrowDown';
    const back = narrow.matches ? 'ArrowLeft' : 'ArrowUp';
    let target = index;
    if (event.key === forward) target = (index + 1) % tabs.length;
    else if (event.key === back) target = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tabs.length - 1;
    else return;
    event.preventDefault();
    selectView(target);
    tabs[target].focus();
  });
});
selectView(0);
tabList.hidden = false;
const viewer = document.getElementById('image-viewer');
const largeImage = document.getElementById('viewer-image');
document.querySelectorAll('[data-enlarge]').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    largeImage.src = image.currentSrc || image.src;
    largeImage.alt = image.alt;
    document.getElementById('viewer-caption').textContent = button.dataset.enlarge;
    viewer.showModal();
  });
});
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const box = viewer.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) viewer.close();
});
const play = document.getElementById('play-demo');
const video = document.getElementById('demo-video');
const mediaError = document.getElementById('video-error');
video.addEventListener('error', () => {
  video.hidden = true;
  play.hidden = false;
  mediaError.hidden = false;
});
play.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  mediaError.hidden = true;
  video.hidden = false;
  play.hidden = true;
  video.src = play.href;
  video.focus();
  video.play().catch(() => { /* Native controls allow another playback attempt. */ });
});
