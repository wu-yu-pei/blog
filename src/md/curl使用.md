#### 掘金发现一个 curl

> 浅尝一下,简答搭一下服务器(express)

#### 服务器代码

```js
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
```

#### test

+ get

```shell
curl http://127.0.0.1:8000/hi     ---> 你好啊!
curl  http://127.0.0.1:8000/hi/9  ---> {id: {id : 9}}
```

+ post

```shell
curl -X POST -d "name=wuyupei&age=20" http://127.0.0.1:8000/hi  --> {"data":"{\"name\":\"wuyupei\",\"age\":\"20\"}"}
```

+ head

```shell
curl -I http://127.0.0.1:8000

--->
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Tue, 05 Apr 2022 04:31:17 GMT
ETag: W/"e85-17ff7fdc418"
Content-Type: text/html; charset=UTF-8
Content-Length: 3717
Date: Wed, 06 Apr 2022 12:53:24 GMT
Connection: keep-alive
Keep-Alive: timeout=5
--->
```

####总结

```js
// test curl:
//             method  command  params  methoud  params    value                         url
//             head:     curl    -I                                               http://127.0.0.1:8000
//             put:      curl    -T                                               http://127.0.0.1:8000/hi
//             get:      curl                                                     http://127.0.0.1:8000/hi
//             post:     curl    -X      POST   --date(/-d) "name=wuyupei&age=20" http://127.0.0.1:8000/hi
//             delete:   curl    -X      DELETE                                   http://127.0.0.1:8000/hi
```
以后可以使用这个快速测试接口了!!!