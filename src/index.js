const fs = require('fs');
const showdown = require('showdown');
const ejs = require('ejs');

let converter = new showdown.Converter();

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

function mdToml() {
  let files = findFile();

  if (files.length === 0) {
    console.log('无更新内容|如果你是修改内容,请删除源md文件,再运行程序');
    return 0;
  }

  files.forEach((file) => {
    let text = fs.readFileSync(`./md/${file}.md`, { encoding: 'utf-8' }).toString();

    let html = converter.makeHtml(text);

    fs.writeFileSync(`./html/${file}.html`, html, { encoding: 'utf-8' });

    console.log(`编译成功:${file}.md`);
  });
}

function createListHtml() {
  let info = [];
  // 列表
  let data = fs.readdirSync('./html');

  data.forEach((item) => {
    let stat = fs.statSync(`./html/${item}`);
    console.log(stat);
    let itemInfo = {
      name: item.split('.')[0],
      ct: stat.ctime,
    };
  });
  
  ejs.renderFile('./ejs/list.ejs', { data: info }, {}, function (err, str) {
    if (err) {
      console.log(err);
    }
    fs.writeFileSync('../list.html', str, { encoding: 'utf-8' });
  });
}

createListHtml();

mdToml();
