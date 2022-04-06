// 开启服务器访问: express
// test curl:
//             method  command  params  methoud  params    value                         url
//             head:     curl    -I                                               http://127.0.0.1:8000
//             put:      curl    -T                                               http://127.0.0.1:8000/hi
//             get:      curl                                                     http://127.0.0.1:8000/hi
//             post:     curl    -X      POST   --date(/-d) "name=wuyupei&age=20" http://127.0.0.1:8000/hi
//             delete:   curl    -X      DELETE                                   http://127.0.0.1:8000/hi
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/hi/:id', (req, res) => {
  res.send({ id: req.params });
});

app.post('/hi', (req, res) => {
  res.send({ data: JSON.stringify(req.body) });
});

// 开启静态文件夹: ./
app.use(express.static('./'));

app.listen(8000, () => console.log('PORT:8000 server is runing...'));
