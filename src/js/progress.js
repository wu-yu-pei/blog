// 滚动条
function createProgress() {
  const progress = document.createElement('progress');

  const bodyHieght = document.body.clientHeight;

  progress.setAttribute('max', '100');
  progress.setAttribute('value', '0');
  document.body.appendChild(progress);

  document.addEventListener('scroll', (e) => {
    const scrollTop = document.documentElement.scrollTop;

    progress.setAttribute(
      'value',
      100 * (scrollTop / (bodyHieght - window.innerHeight - 62 - 100))
    );
  });
}
createProgress();
