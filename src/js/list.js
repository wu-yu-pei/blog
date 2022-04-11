var lis = document.querySelectorAll('li');

for (let i = 0; i < lis.length; i++) {
  let img = lis[i].querySelector('img');
  let obsever = new IntersectionObserver(
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 进入可视区停止观察
        obsever.unobserve(lis[i]);
        lis[i].classList = 'animate__animated animate__slideInUp';
        let src = img.getAttribute('lazy-src');
        img.setAttribute('src', src);
      }
    },
    {
      // 交叉多少开始加载
      threshold: 0,
    }
  );
  obsever.observe(lis[i]);
}