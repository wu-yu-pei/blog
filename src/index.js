const { mdToml } = require('./core/mdToml');

const { createListHtml } = require('./core/createList');

function run() {
  // markdown 转为 html
  if(mdToml()) return

  // 生成list列表页
  createListHtml();
}

run();
