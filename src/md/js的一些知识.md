#### 关于js中的函数

> 最近看了一些高级函数，把自己看的自闭了，于是乎 又去学习js中的函数 复习了之前学过又忘记的知识

+ 下面是练习代码

```js
// const path = require('path')

// console.log(__dirname);

// const str = '11+45+69'

// const s = str.split(/\d{1}\+\d{1}/)

// console.log(s);

// 给一个对象 只保留指定的属性
// function foo(obj, keys) {
//   obj = obj || {};
//   if ("string" == typeof keys) keys = keys.split(/ +/);
//   return keys.reduce(function (ret, key) {
//     if (null == obj[key]) return ret;
//     ret[key] = obj[key];
//     return ret;
//   }, {});
// }

// let res = foo({name:'wuyupei', age: 20, p: 10}, 'name age')

// console.log(res);

// 组合函数: 传入函数 --> 返回一个函数（传入初始参数）  --> 参数会被第一次传入的函数顺序处理  --> 返回结果值
// function compres(...fns) {
//   return function (res) {
//     return fns.reduceRight((pre, fn) => {
//       return fn(pre);
//     }, res);
//   };
// }

// function add(x) {
//   return x + 1;
// }

// function red(x) {
//   return x - 2;
// }

// const f = compres(add, red);

// let res = f(10);

// console.log(res);

// 函数柯里化原理利用闭包记住了外层变量
// const add = function(x) {
//   return function(y) {
//     return x +y
//   }
// }

// const addone = add(1)

// const addten = add(10)

// let a = addone(2)
// let b = addten(2)

// console.log(a, b)

// 函数的柯里化： 利用闭包收集参数（我的理解） 当参数收集完成后 在执行原来的函数
// function curry(fn, ...outer) {
//   return function (...inner) {
//     let arg = [...outer, ...inner];
//     if (arg.length === fn.length) {
//       return fn(...arg);
//     } else {
//       return curry(fn, ...arg);
//     }
//   };
// }

// function loo(a, b, c, d, e) {
//   return a + b + c + d + e;
// }

// const _loo = curry(loo);

// let a = _loo(1)(2)(3)(4, 5);

// console.log(a);

// 数组乱序 : 实际上使用arr.sort并不能真正意义上的乱序
// const arr = [56,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
// let _arr = arr.sort(() => Math.random() - 0.5) 
// console.log(_arr);


// 函数唯一标识
// function add() {
//   return 10
// }

// function red() {
//   return 20
// }

// const store = {
//   id: 1,
//   fns: {},
//   add(fn) {
//     if(!fn.id) {
//       fn.id = this.id++
//       this.fns[fn.id] = fn
//     }
//   }
// }

// store.add(add)
// store.add(add)
// store.add(red)

// console.log(store.fns)
···

问题：
> 跨域请求怎么携带cookie ?

+ 前端如果使用的发送网络请求的库都已携带cookid的字段
    
    + xhr --> xht.withCredentials = true
    + axios -->  自行查找
    + fetch -->  自行查找
    
+ 后端 设置Access-Control-Allow-Credentials: true