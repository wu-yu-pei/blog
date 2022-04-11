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
