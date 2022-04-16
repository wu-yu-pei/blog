const express = require('express');

const app = express();

app.get('/hi/:id', (req, res) => {
  res.send({ id: req.params });
});

app.get('/page/:id', (req, res) => {
  
  res.send({ id: req.params.id });
});

// 开启静态文件夹: ./
app.use(express.static('./'));

app.listen(8000, () => console.log('PORT:8000 server is runing...'));
