> sequelize 为什么是它呢, 以为 typeORM 太难了~ , 下次再学

介绍:
Sequelize 是一个基于 promise 的 Node.js ORM 工具, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server, Amazon Redshift 和 Snowflake’s Data Cloud. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能.

> 前天和昨天的任务已经完成了, 今天上午进行了一波重构

> 重构一
  到处使用`ctx.body = {}`
  重构代码:

```js
// 封装一个全局函数 以便使用
module.exports = function (status, message, data = null) {
  return {
    status,
    message,
    data,
  };
};

// 使用:
async getAllMessage(ctx, next) {
  let data = await curdService.getAllMessage();
  ctx.body = body(200, 'ok', data);
  await next();
}
```

>重构二
  错误处理
  重构代码:

```js
// 全局函数（这里可以定义所有的错误，一遍开发，有利于文档的维护）
module.exports = function (code, ctx) {
  let message;
  console.log(code);
  switch (code) {
    case 2100:
      message = '参数错误或没有token';
      break;
    case 2110:
      message = '用户已存在';
      break;
    case 5100:
      message = '服务器内容错误';
      break;
    default:
      message = '未知错误';
      break;
  }

  ctx.body = {
    status: code,
    message,
    data: null,
  };
};

// index.js(注册)
// errorhandle
app.on('error', errorHandle);

// 使用：
ctx.app.emit('error', 2100, ctx);
```
>重构三
index.js代码过多，分层不够详细
重构代码：

index.js
```js
const Koa = require('koa');
const setRouter = require('./router/index');
const bodyParser = require('koa-bodyparser');
const errorHandle = require('./global/errorHandle');
const { PORT } = require('./config/const.js');

require('./init/mysql.init');

!function () {
  const app = new Koa();

  // middlire
  app.use(bodyParser());

  // init router
  setRouter(app);

  // errorhandle
  app.on('error', errorHandle);

  // bootstrap ....
  app.listen(PORT, () => console.log('.....服务器启动成功.....'));
}()
```

router/index.js
```js
// 自动读入router 并注册
const fs = require('fs')

const setRouter = app => {
    fs.readdirSync(__dirname).forEach(file => {
        if(file === "index.js") return
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}

module.exports = setRouter
```

最后代码仓库:https://gitee.com/wu-yu-pei/node-server