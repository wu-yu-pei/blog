const { mdToml } = require('./core/mdToml');

const { createListHtml } = require('./core/createList');


// markdown 转为 html
mdToml();

// 生成list列表页
createListHtml();
