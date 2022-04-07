> sequelize 为什么是它呢, 以为 typeORM 太难了~ , 下次再学

介绍:
Sequelize 是一个基于 promise 的 Node.js ORM 工具, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server, Amazon Redshift 和 Snowflake’s Data Cloud. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能.

> 由于这几天再学习软件工程相关内容,这里刚好实验一下

### 一.练习场景

1.注册 2. 登录
3.jwt 身份验证
4.CURD

### 二.软件开发

#### 1.可行性分析

这个以我现在的技术,没问题,直接下一步

#### 2.需求分析

- 注册
- 登录(jwt 身份验证)
- mysql2
- sequelize(CURD)
- 只用登录的人才可以看的信息(message), 未登录不可查看

#### 3.软件设计

> 这一步主要是数据可的设计, 比较简单: 一共两张表, 一个 user(用户)表, 一个 message(信息)表, 文件目录的搭建, 模块分工 这一块比较重要,因为一旦设计错误,后面的开发可能会很痛苦.工作流程 gitflow工作流程(由于只有我一个人开发,我一个人进行模拟gitflow流程) 分支说明: master--> 线上版本 develop --> 开发分支  wuyupei--> 个人分支(有多个,模拟gitflow工作流程)

#### 4.程序编码

这一部就可以开始写代码了

#### 5.测试

> 我这里采用写一个模块,测试一个模块,最后总再一起再测试一遍

### 三.详细设计

1.数据库字段

- 用户表

```shell
+-----+------------+----------------------------------+-----------+-----------+
| id  | uname      | password                         | createdAt | updatedAt |
+-----+------------+----------------------------------+-----------+-----------+
|   1 | wuyupei    | 123456                           | 00:00:01  | 00:00:01  |
| 823 | liuxu      | 123456                           | 00:00:01  | 00:00:01  |
| 824 | lisiyuan   | 123456                           | 00:00:01  | 00:00:01  |
| 825 | zenyuxiang | 123456                           | 00:00:01  | 00:00:01  |
| 826 | hezekuan   | 123456                           | 00:00:01  | 00:00:01  |
| 842 | lxx        | 1ea28e5cbd305a69a5a24c51b673a665 | 00:00:01  | 00:00:01  |
| 843 | lxxx       | 1ea28e5cbd305a69a5a24c51b673a665 | 00:00:01  | 00:00:01  |
| 844 | lxxx       | 1ea28e5cbd305a69a5a24c51b673a665 | 00:00:01  | 00:00:01  |
| 845 | lxxx       | 1ea28e5cbd305a69a5a24c51b673a665 | 00:00:01  | 00:00:01  |
+-----+------------+----------------------------------+-----------+-----------+
```

- 信息表暂时没设计

2.文件夹结构设计

```js
│  index.js  // 项目入口
│
├─config     // 项目配置相关
│      const.js
│
├─controller // 项目控制层(MVC-> C)
│      hi.controller.js
│      login.controller.js
│      register.controller.js
│
├─init       // 项目启动初始化相关
│      mysql.init.js
│
├─middleware // 项目中间件
│      hasExist.middleware.js
│      hasUser.middleware.js
│
├─module     // 项目数据模型相关(MVC -> M)
│      user.module.js
│
├─router     // 项目路由层(MVC -> C)
│      hi.route.js
│      login.router.js
│      register.router.js
│
├─service    // 项目服务层(MVC -> C)
│      hi.service.js
│      login.service.js
│      register.service.js
│
└─utils      // 项目公共函数
        encryptPwd.js
```

3.相关代码

- index.js

```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const { PORT } = require('./config/const.js');

// mysql sequelize
const sequelize = require('./init/mysql.init');

// routers
const hiRouter = require('./router/hi.route');
const registerRouter = require('./router/register.router');
const loginRouter = require('./router/login.router');

// middlire
app.use(bodyParser());

// hirouter
app.use(hiRouter.routes());

// registerRouter
app.use(registerRouter.routes());

// loginRouter
app.use(loginRouter.routes());

app.listen(PORT, () => console.log('服务器启动成功....'));
```

- router

```js
const koaRouter = require('koa-router');
const registerRouter = new koaRouter();

const registerController = require('../controller/register.controller');
const hasExistMiddleware = require('../middleware/hasExist.middleware');

registerRouter.post('/register', hasExistMiddleware, registerController.register);

module.exports = registerRouter;
```

- servece

```js
const User = require('../module/user.module');
const encryptPwd = require('../utils/encryptPwd');
class registerServece {
  constructor() {}

  async register(uname, password) {
    let { dataValues } = await User.create({ uname, password: encryptPwd(password) });
    return dataValues;
  }
}

module.exports = new registerServece();
```

- model

```js
const sequelize = require('../init/mysql.init');
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init(
  {
    // 在这里定义模型属性
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uname: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.TIME,
      defaultValue: true,
    },
    updatedAt: {
      type: DataTypes.TIME,
      defaultValue: true,
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User', // 我们需要选择模型名称
  }
);

User.sync({ alter: true });

module.exports = User;
```

- middleware

```js
const User = require('../module/user.module');
const encryptPwd = require('../utils/encryptPwd');
async function hasExist(ctx, next) {
  const { uname, password } = ctx.request.body;

  let result = await User.findAll({
    where: {
      uname,
    },
  });
  if (result.length !== 0) {
    await next();
  } else {
    ctx.body = {
      code: 210,
      message: '用户名已存在',
    };
  }
}

module.exports = hasExist;
```

### 总结
第一天结束, 经验: 开发前checkout 出自己的分支, merge前 先git pull 再进行merge, 若有冲突,解决冲突,若没有,直接git push即可.
