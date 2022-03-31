const showdown = require('showdown');
const fs = require('fs');
const ejs = require('ejs');
let converter = new showdown.Converter();

const { findFile } = require('./fildFile');
/**
 *把md转化成html
 * @returns Blearn 是否有更新内容
 */
function mdToml() {
  let files = findFile();

  if (files.length === 0) {
    console.log('无更新内容|如果你是修改内容,请删除源md文件,再运行程序');
    return true;
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

module.exports = { mdToml };
