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

  let result = [];
  let start = 0;
  console.log('共:' +  info.length + '篇');
  while (start <= info.length) {
    result.push(info.slice(start, start + 10));
    start += 10;
  }

  for (let i = 0; i < result.length; i++) {
    ejs.renderFile(
      './ejs/list.ejs',
      { data: result[i], page: result.length - i, totalPage: result.length },
      {},
      function (err, str) {
        if (err) {
          console.log(err);
        }
        if (i == 0) {
          fs.writeFileSync(`../pageList/index.html`, str, {
            encoding: 'utf-8',
          });
        }
        fs.writeFileSync(`../pageList/list${result.length - i}.html`, str, {
          encoding: 'utf-8',
        });
      }
    );
  }
}

module.exports = { createListHtml };
