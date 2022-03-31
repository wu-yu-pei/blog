#### express VS koa

> 由于我简历中写了熟悉 express koa 害怕二面被问到原理 于是就研究了一下 express 和 koa 的中间件原理

- express

```js
const sleep = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// express: Express 中间件实现是基于 Callback 回调函数同步的，它不会去等待异步（Promise）完成
const express = require('express');
const app = express();

app.use(async (req, res, next) => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (req, res, next) => {
  console.log(3);
  await next();
  console.log(4);
});

app.use(async (req, res, next) => {
  console.log(5);
  await sleep(1000); //这里加了异步操作 函数的执行就乱了  如果没有异步处理 那抹就于koa的执行顺序一样了
  await next();
  console.log(6);
});

app.use(async (req, res, next) => {
  console.log(7);
});

app.listen(8001, (err) => {
  if (err) console.log(err);
  console.log('server is runing 8001');
});

//执行结果 1 3 5 4 2 7 6
```

- koa

```js
const sleep = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

// koa: 后面使用的是async await 来控制中间件的执行流程的 内部有一个compess函数会把中间件组合起来  会等待异步执行的函数
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});

app.use(async (ctx, next) => {
  console.log(5);
  await sleep(1000);
  await next();
  console.log(6);
});

app.use(async (ctx, next) => {
  console.log(7);
});

app.listen(8001, (err) => {
  if (err) console.log(err);
  console.log('server is runing 8001');
});

// 执行结果: 1 3 5 7 6 4 2
```

其中 koa 中对中间件的处理 是一个 compose 的组合函数, 会把所有的中间件组合起来, 内部完全使用 promise 把函数包装起来



- koa-compose 函数(源码)

```js
function compose(middleware) {
  // 边缘case处理
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
```
> 实力不够 只能看懂一部分 js还呆深入啊~~