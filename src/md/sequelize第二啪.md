> sequelize 为什么是它呢, 以为 typeORM 太难了~ , 下次再学

介绍:
Sequelize 是一个基于 promise 的 Node.js ORM 工具, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server, Amazon Redshift 和 Snowflake’s Data Cloud. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能.

#### 再实战

之前的两张表

- users

```shell
+-----+---------+----------------------------------+-----------+-----------+
| id  | uname   | password                         | createdAt | updatedAt |
+-----+---------+----------------------------------+-----------+-----------+
| 849 | wuyupei | 1ea28e5cbd305a69a5a24c51b673a665 | 00:00:01  | 00:00:01  |
| 850 | zs      | 1ea28e5cbd305a69a5a24c51b673a665 | 00:00:01  | 00:00:01  |
+-----+---------+----------------------------------+-----------+-----------+
```

- messages

```shell
+----+---------+-----------+-----------+
| id | message | createdAt | updatedAt |
+----+---------+-----------+-----------+
|  1 | 我      | 00:00:01  | 00:00:01  |
|  2 | 想      | 00:00:01  | 00:00:01  |
|  3 | 好      | 00:00:01  | 00:00:01  |
|  4 | 想      | 00:00:01  | 00:00:01  |
|  7 | 躺      | 00:00:01  | 00:00:01  |
|  9 | 平      | 00:00:01  | 00:00:01  |
| 10 | 啊      | 00:00:01  | 00:00:01  |
| 11 | !       | 00:00:01  | 00:00:01  |
+----+---------+-----------+-----------+
```

补:myqsl 简单命令

```shell
show databases;    // 显示所有数据库
use databasename;  // 使用某一数据库
show tables;       // 显示某个数据库中的所有表
```

- 增

```js
async register(uname, password) {
    let { dataValues } = await User.create({ uname, password: encryptPwd(password) });
    return dataValues;
}

```

- 删

```js
async deleteMesage(id) {
  let res = Message.destroy({
    where: {
      id,
    },
  });

  return res;
}
```

- 改

```js
async updateMessage(id, message) {
  let result = await Message.update(
    { message },
    {
      where: {
        id,
      },
    }
  );
  return result;
}
```

- 查

```js
async getAllMessage() {
  let result = await Message.findAll();
  return result;
}

async getMessageById(id) {
  let result = await Message.findOne({
    where: {
      id,
    },
  });
  return result;
}
```
使用完毕,这些知识sequelize最基本的使用,还有一些高级的内容可以继续升入研究

这个项目也就此昨玩了,使用git follw的过程中还是有一些疑问, 后面我会对自己写的代码进行一次重构,以为我想把自己的代码写的更漂亮些,理解起来更容易,这个项目目前比较好的一点是目录文件夹按模块化的思想搭建的很好,但是还有进步空间,明天重构,走起!!!!
