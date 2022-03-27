#### 判断 js 数据类型的几种方法

1. typeof

2. instance

3. Array.isArray

4. constructor

5. Object.prototype.toString.call()

```js
function getType(value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + '';
  }

  // 判断数据是引用类型的情况
  if (typeof value === 'object') {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(' ')[1].split('');

    type.pop();

    return type.join('').toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}
```

### 另

偷偷的记下来:
今天搭建了一个自己的安全翻墙服务器,使用最新的翻墙技术搭建,上网不会被追踪,偷窥~

参考连接地址:

1. https://li-wang.xyz/aliyun&torjan.html
2. https://iyideng.vip/black-technology/cgfw/trojan-v2ray-client-download-and-using-tutorial.html

账号:fq.wuyupei.top 密码: 1978\*\*\*\*wyp
