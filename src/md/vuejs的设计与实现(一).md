#### 学习笔记

> 我直接贴代码了 代码有注释

1.vdom 本质就是一个 javascript 对象

```js
// 1.1对象
const title = {
  tag: 'div',
  props: {
    onClick: () => alert('div click'),
  },
  children: 'click me',
};
// 1.2使用vue导出的h函数 h函数只是为了更简便的书写vdom h函数最终返回了一个 类似于1.1中的对象
h(
  'div',
  {
    onClick: () => alert('div click'),
  },
  'click me'
);
```

2. 渲染器: vdom -> 真实的 dom

> 实现一个渲染器 把 vdom 渲染成真实的 dom

```js
function renderer(vnode, container) {
  const el = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(key.substr(2).toLowerCase(), vnode.props[key]);
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else {
    vnode.children.forEach((child) => renderer(child, el));
  }

  container.appendChild(el);
}

renderer(title, document.querySelector('#app'));
```

3. 编译器

```js
// 3.  模板的工作原理
/** .vue文件
 * <template>
 *  <div>
 *      click me
 *  </div>
 * </template>
 */

// 其实.vue文件中的template里的内容会被编译器编译到script里面
//成为一个render函数 返回一个描述真实DOM的对象(vnode)
// 最终由renderer函数完成渲染
```

4. 响应式系统的基本实现

4.1 副作用函数是指会产出副作用的函数

```js
function effect() {
  document.body.innerHTML = '哈哈哈';
}
// 上面这个effect函数的执行会直接或间接的影响其他函数的执行
```

这也是一个副作用函数:

```js
let level = 1;
function effect() {
  level = 2; // 修改全局变量, 产生副作用
}
```

4.2 响应式系统的基本实现

```js
let activeEffect;

// 注册副作用函数
function effect(fn) {
  activeEffect = fn;
  fn();
}

// 储存副作用函数的桶
const bucket = new WeakMap();

const obj = new Proxy(date, {
  get(target, key) {
    if (!activeEffect) return target[key];

    // 将副作用函数acticeEffect添加到储存副作用函数的桶中
    track(target, key);

    return target[key];
  },

  set(target, key, value) {
    target[key] = value;

    //把副作用函数从桶中取出执行
    trigger(target, key);
  },
});

// 在 get拦截函数内调用track函数追踪变化
function track(target, key) {
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  deps.add(activeEffect);
}

// 在set拦截函数内调用trigger函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  const effects = depsMap.get(key);
  // 执行所有副作用函数
  effects && effects.forEach((fn) => fn());
}

// test:
function changeText() {
  console.log(obj.name);
}

setTimeout(() => {
  obj.name = 'aaa';
}, 1000);
effect(changeText);
```
完!
