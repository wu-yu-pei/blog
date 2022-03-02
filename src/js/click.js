document.addEventListener('click', (e) => {
  let x = e.pageX;
  let y = e.pageY;

  let box = document.createElement('div');
  box.style.width = 30 + 'px';
  box.style.height = 30 + 'px';

  box.style.left = x - 15 + 'px';
  box.style.top = y - 15 + 'px';

  box.style.position = 'relative';
  box.style.background = 'transparent';

  for (let i = 0; i <= 5; i++) {
    let div = document.createElement('div');
    div.classList.add('wave');
    div.classList.add(`wave${5 - i}`);
    box.appendChild(div);
    // setTimeout(() => {
    //   box.removeChild(div);
    // }, 1000 + 200 * (5 - i));
  }
  document.body.appendChild(box);

  setTimeout(() => {
    document.body.removeChild(box);
  }, 2000);
});
