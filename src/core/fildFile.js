const fs = require('fs');

/**
 * 找md文件夹中存在的文件而html文件夹中不存在的文件
 * @returns files []
 */
function findFile() {
  let mlFiles = fs.readdirSync('./html');
  let mdFiles = fs.readdirSync('./md');
  let cpFiles = [];

  // 格式化文件名
  mlFiles = mlFiles.map((item) => item.split('.')[0]);
  mdFiles = mdFiles.map((item) => item.split('.')[0]);

  // 从md中找ml中没有的
  mdFiles.forEach((item) => {
    if (mlFiles.indexOf(item) === -1) {
      let { next, pre } = findRound(item);
      let fileInfo = {
        name: item,
        next,
        pre
      }
      cpFiles.push(fileInfo)
    }
  });

  return cpFiles;
}

/**
 *
 * @param  fileName
 * @returns {next, pre}
 */
function findRound(fileName) {
  let info = [];
  let data = fs.readdirSync('./md');
  data.forEach((item) => {
    let stat = fs.statSync(`./md/${item}`);
    let itemInfo = {
      name: item.split('.')[0],
      time: stat.ctime,
    };
    info.push(itemInfo);
  });

  // 排序
  info.sort((a, b) => b.time - a.time);

  let index = info.findIndex((item) => item.name === fileName);

  return {
    next: info[index + 1]?.name || null,
    pre: info[index - 1]?.name || null,
  };
}

module.exports = { findFile };
