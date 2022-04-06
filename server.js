// 开启服务器访问: express

const express = require('express');

const app = express();

// 开启静态文件夹: ./
app.use(express.static('./'));

app.listen(8000, () => console.log('PORT:8000 server is runing...'));
