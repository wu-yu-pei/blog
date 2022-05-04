// notify

function isScrollToBottom(cb) {
  window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
      cb();
    }
  });
}

function createNotifyEl() {
  const div = document.createElement('div');
  div.innerHTML = '没有了!';
  div.classList = 'notify animate__animated animate__fadeInTopRight';
  document.body.appendChild(div);

  function f1() {
    div.classList = 'notify animate__animated animate__fadeOutUp';
    clearTimeout(t1, f1);
  }
  function f2() {
    document.body.removeChild(div);
    clearTimeout(t2, f2);
  }

  var t1 = setTimeout(f1, 1500);
  var t2 = setTimeout(f2, 3000);
}

isScrollToBottom(createNotifyEl);

// 滚动条
function createProgress() {
  const progress = document.createElement('progress');

  const bodyHieght = document.body.clientHeight;

  progress.setAttribute('max', '100');
  progress.setAttribute('value', '40');
  document.body.appendChild(progress);

  document.addEventListener('scroll', (e) => {
    const scrollTop = document.documentElement.scrollTop;

    progress.setAttribute('value', 100 * (scrollTop / (bodyHieght - window.innerHeight - 62 - 100)));
  });
}
createProgress();
