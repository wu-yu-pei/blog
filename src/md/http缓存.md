### 浏览器的缓存策略

#### 一.浏览器缓存的几个阶段

##### 1.强缓存策略

浏览器端发起请求之后不会直接向服务器请求数据，直接先到达强缓存阶段，如果强缓存命中直接返回，如果没有命中进入下一阶段**协商缓存策略**。


##### 2.协商缓存策略

协商缓存是当强缓存没有命中的情况或者按下 F5 键刷新页面会触发，它每次都会携带标识与服务器进行校验，符合则返回 304 标识，表示资源没有更新，如果协商缓存也失效了，进入下一个阶段获取最新数据，并返回且状态码为 200。

##### 3.储存策略

当强缓存->协商缓存都未命中，请求会直接到达服务器，获取最新资源设置缓存策略，进行返回。

#### 二.强缓存

强缓存的实现分为 Expires、Cache-Control 两个。

+ expires(http1.0)

代码演示:

```node
res.writeHead(200, {
    'Content-Type': 'text/javascript',
    'Expires': new Date('2020-03-25 11:19:00'),
});
```

在浏览器中的请求头中可以看到:

```Expires: Wed Mar 25 2020 11:19:00 GMT+0800 (GMT+08:00)```

注意:

Expires 是参考的本地时间，如果修改本地时间，可能就会造成缓存失效。

+ Cache-Control(http1.1)
  + 可缓存性
    + public：http 经过的任何地方都可以进行缓存（代理服务器也可缓存）
    + private：只有发起请求的这个浏览器才可以进行缓存，如果设置了代理缓存，那么代理缓存是不会生效的
    + no-cache：任何一个节点都不可以缓存（**绕过强缓存，但是还会经过协商缓存**）
  + 到期
    + max-age=：设置缓存到多少秒过期
    + s-maxage=：会代替 max-age，只有在代理服务器（nginx 代理服务器）才会生效
    + max-stale=：是发起请求方主动带起的一个头，是代表即便缓存过期，但是在 max-stale 这个时间内还可以使用过期的缓存，而不需要向服务器请求新的内容
  + 其他
    + no-store：本地和代理服务器都不可以存储这个缓存，永远都要从服务器拿 body 新的内容使用（**强缓存、协商缓存都不会经过**）
    + no-transform：主要用于 proxy 服务器，告诉代理服务器不要随意改动返回的内容

代码演示:

+ max-age

```js
const http = require('http')
http
  .createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    if (req.url === '/') {
      const html = fs.readFileSync('./index.html', 'utf8')
      res.end(html)
    }
    if (req.url === '/script.js') {
      // 1.max-age:
      res.writeHead(200, {
          'Content-Type': 'text/javascript',
          // 缓存3s 可以在浏览器中刷新查看确实是只缓存3s
          'Cache-Control': 'max-age=30',
      })
      const script = fs.readFileSync('./script.js', 'utf8')
      res.end(script)
    }
  })
  .listen(8888, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('启动...')
  })
```

效果:

第一次请求:

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/a.png)

第二次请求:

发现是使用缓存里的文件

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/b.png)

第三次请求:(30s后)

缓存失效,重新向服务器获取文件

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/c.png)

#### 三.协商缓存

如果强缓存未命中或用户按下 F5 强制刷新后进入协商缓存，服务器则根据浏览器请求时的标识进行判断，如果协商缓存生效返回 304 否则返回 200。协商缓存的实现也是基于两点 Last-Modified、ETag 这个需要在 HTTP Headers 中设置。

+ Last-Modified/If-Modified-Since

> Last-Modified 是在服务端设置进行响应，If-Modified-Since 是在浏览器端根据服务端上次在 Response Headers 中设置的 Last-Modified 取其值，如果存在请求时设置其 Request Headers 值 If-Modified-Since 传到服务器，服务器也是拿到这个值进行比对.

代码演示:

```js
const http = require('http')
const fs = require('fs')
http
  .createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    if (req.url === '/') {
      const html = fs.readFileSync('./index.html', 'utf8')
      res.end(html)
    }
    if (req.url === '/script.js') {
      // 2.if-modified-since && Last-Modified
      // 文件路径
      const filePath = path.join(__dirname, req.url)
      // 文件的状态
      const state = fs.statSync(filePath)
      // 文件最后修改的时间
      const mtime = state.mtime.toGMTString()
      // 来自浏览器的值
      const requestMtime = req.headers['if-modified-since']
      console.log(mtime, '-----------', requestMtime)
      // 命中缓存
      if (mtime === requestMtime) {
        console.log('协商缓存:Last-Modified')
        res.statusCode = 304
        res.end()
        return
      }
      // 没命中缓存
      console.log('协商缓存 Last-Modified 失效')
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=0', //  不缓存
        'Last-Modified': mtime,
      })
      const script = fs.readFileSync('./script.js', 'utf8')
      res.end(script)
    }
  })
  .listen(8888, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('启动...')
  })
```

效果:

第一次请求:

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/d.png)

第二次请求:

由于请求时携带if-modified-since和Last-Modified相同所以命中缓存返回304

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/e.png)

第三次请求:(修改一下文件)

此时if-modified-since和Last-Modified不相同,所以没命中缓存 重新向服务器请求文件

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/f.png)

服务器打印的数据

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/g.png)

注意:

这是因为浏览器默认启用了一个**启发式缓存**，这在设置了 Last-Modified 响应头且没有设置 Cache-Control: max-age/s-maxage 或 Expires 时会触发，它的一个**缓存时间是用 Date - Last-Modified 的值的 10% 作为缓存时间**。

+ etage/If-None-Match

> Last-Modified 是以文件的修改时间来判断，Etag 是根据文件的内容是否修改来判断，如果 Etag 有修改重新获取新的资源返回，如果未修改返回 304 通知客户端使用本地缓存。

代码演示

这里使用md5来加密文件生成(Etag),如果文件内容不变,md5加密出来的数据也不会变

```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
http
  .createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    if (req.url === '/') {
      const html = fs.readFileSync('./index.html', 'utf8')
      res.end(html)
    }
    if (req.url === '/script.js') {
      const filePath = path.join(__dirname, req.url) // 拼接当前脚本文件地址
      const buffer = fs.readFileSync(filePath) // 获取当前脚本状态
      const fileMd5 = md5(buffer) // 文件的 md5 值
      const noneMatch = req.headers['if-none-match'] // 来自浏览器端传递的值

      if (noneMatch === fileMd5) {
        console.log('协商缓存:ETag')
        res.statusCode = 304
        res.end()
        return
      }
      console.log('Etag 缓存失效')
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=0',
        ETag: fileMd5,
      })
      const script = fs.readFileSync('./script.js', 'utf8')
      res.end(script)
    }
  })
  .listen(8888, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('启动...')
  })
```

效果:

第一次请求

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/h.png)

第二次请求

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/i.png)

第三次请求(修改文件,Etag值会发生改变)

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/j.png)

服务器打印的数据

![](../mdimg/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98/k.png)

#### Last-Modified 与 Etag 对比

- 精确度：Last-Modified 以时间（秒）为单位，如果出现 1 秒内文件多次修改，在 Last-Modified 缓存策略下也不会失效，Etag 是对内容进行 Hash 比较，只要内容变动 Etag 就会发生变化，精确度更高。
- 分布式部署问题：分布式部署必然涉及到负载均衡，造成的一种现象是 Last-Modified 的时间可能还不太一致，而 Etag 只要保证每台机器的 Hash 算法是一致的就可保证一致性。
- 性能消耗：Etag 需要读取文件做 Hash 计算，相比 Last-Modified 性能上是有损耗的。
- 优先级：如果 Last-Modified/Etag 同时设置，Etag 的优先级会更高些。
- 相同点：校验通过返回 304 通知客户端使用本地缓存，校验不通过重新获取最新资源，设置 Last-Modified/Etag 响应头，返回状态码 200 。

#### 扩展

1. POST 可以缓存吗？

GET 是一个幂等操作，通常用于缓存，POST 是一个非幂等的操作，每次创建新的资源，也不会自动处理 POST 请求进行缓存



这下可以理解缓存机制了吧~