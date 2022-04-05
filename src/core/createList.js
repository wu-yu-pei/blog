const ejs = require('ejs');
const fs = require('fs');
const { getTime } = require('./getTime');
/**
 * 创建list.html页面
 * @returns void
 */
function createListHtml() {
  // TODO 待优化（每次都会调用，）
  let info = [];
  // 列表
  let data = fs.readdirSync('./md');
  data.forEach((item) => {
    let stat = fs.statSync(`./md/${item}`);
    let itemInfo = {
      name: item.split('.')[0],
      ct: getTime(stat.ctimeMs),
      time: stat.ctime,
    };
    info.push(itemInfo);
  });

  // 排序
  info.sort((a, b) => b.time - a.time);

  ejs.renderFile('./ejs/list.ejs', { data: info }, {}, function (err, str) {
    if (err) {
      console.log(err);
    }
    fs.writeFileSync('../list.html', str, { encoding: 'utf-8' });
  });
}

module.exports = { createListHtml };
