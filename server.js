const express = require('express');
const { createListHtmlTwo } = require('./src/core/createList');
const app = express();

app.get('/hi/:id', (req, res) => {
  res.send({ id: req.params });
});

app.get('/page/:page', (req, res) => {
  let { page } = req.params;

  page = page ? page : 0;

  createListHtmlTwo(page, count = 14);
  res.send({ page });
});

// 开启静态文件夹: ./
app.use(express.static('./'));

app.listen(8000, () => console.log('PORT:8000 server is runing...'));
