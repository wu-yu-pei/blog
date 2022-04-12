#### React 脚手架

1. React 官方脚手架

> npx create-react-app my-app

2. 使用新的打包工具 vite 搭建开发环境

> npm init vite@latest --> 选择 react

3. 组件

- 函数式组件

```jsx
import React from 'react';

export default function Cpn() {
  return <div>Cpn</div>;
}
```

- 类式组件

```jsx
import React, { Component } from 'react';

export default class Cpn extends Component {
  render() {
    return <div>Cpn</div>;
  }
}
```

4. react 生命周期

- 常用的生命周期

```js
render();

constructor(props);

componentDidMount();

componentDidUpdate(prevProps, prevState, snapshot);

componentWillUnmount();
```

- 不常用的生命周期(一般不会用)

```js
shouldComponentUpdate(nextProps, nextState)

static getDerivedStateFromProps(props, state)

getSnapshotBeforeUpdate(prevProps, prevState)
```

- 生命周期图

![](../mdimg/reactLeftLess.png)
![](../mdimg/reactLeftpng.png)

- react 生命周期文档 : https://react.docschina.org/docs/react-component.html
