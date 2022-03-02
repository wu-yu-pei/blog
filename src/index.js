const fs = require('fs');
const showdown = require('showdown');
const ejs = require('ejs');

let converter = new showdown.Converter();

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

/**
 *把md转化成html
 * @returns void
 */
function mdToml() {
  let files = findFile();

  if (files.length === 0) {
    console.log('无更新内容|如果你是修改内容,请删除源md文件,再运行程序');
    return 0;
  }

  files.forEach((file) => {
    let text = fs.readFileSync(`./md/${file}.md`, { encoding: 'utf-8' }).toString();

    let html = converter.makeHtml(text);

    ejs.renderFile('./ejs/article.ejs', { title: file, html }, {}, function (err, str) {
      if (err) {
        console.log(err);
      }
      fs.writeFileSync(`./html/${file}.html`, str, { encoding: 'utf-8' });
    });

    console.log(`编译成功:${file}.md`);
  });
}

/**
 * 创建list.html页面
 * @returns void
 */
function createListHtml() {
  // TODO 待优化（每次都会调用，）
  let info = [];
  // 列表
  let data = fs.readdirSync('./html');
  data.forEach((item) => {
    let stat = fs.statSync(`./html/${item}`);
    let itemInfo = {
      name: item.split('.')[0],
      ct: getTime(stat.ctimeMs),
    };
    info.push(itemInfo);
  });

  ejs.renderFile('./ejs/list.ejs', { data: info }, {}, function (err, str) {
    if (err) {
      console.log(err);
    }
    fs.writeFileSync('../list.html', str, { encoding: 'utf-8' });
  });
}

/**
 *
 */

function getTime(t) {
  let time = new Date(t);
  return (
    [time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-') +
    ' ' +
    [time.getHours(), time.getMinutes(), time.getSeconds()].join(':')
  );
}

mdToml();

createListHtml();
