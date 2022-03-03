### js 单列模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式。

### 简单应用

- 封装一个操作 LocalStorage 的单列类

```javaScript
      //单列模式封装 LocalStorage
      const info = {
        name: 'wuyupei',
        age: 10,
      };

      class MyStore {
        static getInstance() {
          if (!MyStore.instance) {
            MyStore.instance = new MyStore();
          }
          return MyStore.instance;
        }

        getItem(key) {
          return localStorage.getItem(key);
        }

        setItem(key, value) {
          typeof value === 'string'
            ? localStorage.setItem(key, value)
            : localStorage.setItem(key, JSON.stringify(value));
        }
      }

      let store1 = MyStore.getInstance();
      let store2 = MyStore.getInstance();

      console.log(store1.setItem('info', info));
      console.log(store1 === store2);
      console.log(store1.getItem('info'));
      console.log(store2.getItem('info'));
```

- 封装一个模态框(页面中只能有一个模态框)

```javaScript
    // 面向对象的思想封装modle  不用定义一个全局变量来修改模态框的状态了,要用的时候直接new一个
      class Modle {
        constructor(el) {}
        static getModleInstance() {
          if (!Modle.instance) {
            const div = document.createElement('div');
            document.body.appendChild(div);
            Modle.instance = div;
          }
          return Modle.instance;
        }
      }

      let show = document.querySelector('.show');
      let hidden = document.querySelector('.hidden');

      show.addEventListener('click', () => {
        console.log(22);
        const m1 = Modle.getModleInstance();
        m1.style.opacity = '1';
      });

      hidden.addEventListener('click', () => {
        console.log(11);
        const m2 = Modle.getModleInstance();
        m2.style.opacity = '0';
      });
```
