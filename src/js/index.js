let cspan = document.querySelector('.cspan');

cspan.addEventListener('click', () => {
  console.log('改换背景了');
});

let isLight = true;
let check = document.querySelector('.check');
let audio = document.querySelector('.autio');
// 主题切换
check.addEventListener('click', () => {
  if (isLight) {
    // 播放声音
    audio.play();
    check.style.background = 'url(./src/img/bai.png) no-repeat';
    document.documentElement.style.setProperty('--bg-color', '#715e5e');
    document.documentElement.style.setProperty('--bb-color', '#000');
    document.documentElement.style.setProperty('--ht-color', '#fff');
    document.documentElement.style.setProperty('--hoverli-color', '#fff');
    document.documentElement.style.setProperty('--boxbg-color', 'rgba(255, 255, 255, 0.3)');
  } else {
    // 播放声音
    audio.play();
    check.style.background = 'url(./src/img/hei.png) no-repeat';
    document.documentElement.style.setProperty('--bg-color', '#f5f5d5');
    document.documentElement.style.setProperty('--bb-color', '#000');
    document.documentElement.style.setProperty('--ht-color', '#000');
    document.documentElement.style.setProperty('--hoverli-color', '#000');
    document.documentElement.style.setProperty('--boxbg-color', ' rgba(0, 0, 0, 0.3)');
  }
  isLight = !isLight;
});
