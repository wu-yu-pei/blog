#### 模拟 Element 组件库的实现

**思路:**
组件变成插件
install 方法

**插件的使用:**

```js
app.use(插件名);
```

**Element 如何使用?**

```js
improt Element from 'element'

app.use(Element)

// use方法 :使用插件  去调用了install方法 并且把app传进去了
```

##### 自己实现一下

**代码:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入vue -->
    <script src="../../node_modules/vue/dist/vue.global.prod.js"></script>
    <style>
      .vs-button {
        width: 100px;
        height: 40px;
        background-color: #fff;
        border: 1px solid #000;
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const { createApp, mount } = Vue;

      // 定义根组件
      const App = {
        name: 'App',
        data() {
          return {
            a: 10,
          };
        },
        template: '<vs-button>+</vs-button>',
      };

      // 自定义组件
      const VsButton = {
        name: 'wy-button',
        template: `
          <button class="vs-button">
            <slot></slot>
          </button>
        `,
        // 自定义组件为什么要install方法呢 ?  因为这样就可以可以 按需引入了
        install(app) {
          app.component('vs-button', VsButton);
        },
      };

      // 这个就是定义的自己的组件库
      const Elements = {
        VsButton,
        // install方法里面需要注册所有的组件(这里只有一个)
        install(app) {
          app.component('vs-button', VsButton);
        },
      };

      const app = createApp(App);

      // app.use的方法, 使用自己的组件库
      app.use(Elements);

      app.mount('#app');
    </script>
  </body>
</html>
```

####总结:
这样显然不是一个真正的组件库,要想实现像 Element-plus 呢样,
我们还需要很多工具, 我们应该搭建一个项目单独开发组件库(思路就是上面呢样)
像这样的组件库一般都是使用 roullp 来进行打包的可以把文件打包成各种类型(esm, cjs, commenjs 等...)
