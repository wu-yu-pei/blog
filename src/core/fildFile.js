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
    mlFiles.indexOf(item) === -1 ? cpFiles.push(item) : '';
  });

  return cpFiles;
}

module.exports = { findFile };
