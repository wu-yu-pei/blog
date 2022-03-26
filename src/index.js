const { mdToml } = require('./core/mdToml');

const { createListHtml } = require('./core/createList');

function run() {
  // markdown 转为 html
  mdToml();

  // 生成list列表页
  createListHtml();
}

run();
