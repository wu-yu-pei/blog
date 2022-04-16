### Redux

> 这是第三次学 Redux, 第一次学习:只是有一个印象,基本会用. 第二次学习:在 node 环境下学习的, 也还可以, 这是第三次学习,结合 react 高阶组件 循序渐进 我已经基本掌握了.这里记录一下学习笔记.

##### Redux 基本使用

1.文件目录规划

```shell
│  App.jsx
│
├─page
│      about.jsx
│      home.jsx
├─store
│      createActions.js
│      index.js
│      reducer.js

```

- 重点在 store 文件夹

index.js:

> 使用 createStore 创建一个 store 传入 reducer

```js
import { createStore } from 'redux';

import reducer from './reducer';

const store = createStore(reducer);

export default store;
```

reducer.js

> 初始化 store 处理 action

```js
const store = {
  count: 0,
};

export default function (initStore = store, actions) {
  switch (actions.type) {
    case 'ADD':
      return { ...initStore, count: initStore.count + 1 };
      break;
    case 'RED':
      return { ...initStore, count: initStore.count - 1 };
      break;
    default:
      break;
  }
}
```

createAction.js

> 创建 actions {type: 'ADD', payload: {}}

```js
export const addActions = () => ({ type: 'ADD', payload: 1 });

export const redActions = () => ({ type: 'RED', payload: -1 });
```

接着就是在组件中使用了

- About 组件

```js
import React, { PureComponent } from 'react';
import store from '../store/index';

import { addActions } from '../store/createActions';
import { redActions } from '../store/createActions';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState()?.count || 0,
    };
  }
  componentDidMount() {
    // 订阅store的变化
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count,
      });
    });
  }
  componentWillUnmount() {
    this.unSubscribe();
  }
  render() {
    return (
      <div>
        <hr />
        <h1>About</h1>
        <h2>{this.state.count}</h2>
        <button onClick={(e) => this.add()}>+1</button>
        <button onClick={(e) => this.red()}>-1</button>
      </div>
    );
  }
  add() {
    store.dispatch(addActions());
  }
  red() {
    store.dispatch(redActions());
  }
}
```

- Home 组件

```js
import React, { PureComponent } from 'react';
import store from '../store/index';

import { addActions } from '../store/createActions';
import { redActions } from '../store/createActions';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState()?.count || 0,
    };
  }
  componentDidMount() {
    // 订阅store的变化
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count,
      });
    });
  }
  componentWillUnmount() {
    this.unSubscribe();
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>{this.state.count}</h2>
        <button onClick={(e) => this.add()}>+1</button>
        <button onClick={(e) => this.red()}>-1</button>
      </div>
    );
  }
  add() {
    store.dispatch(addActions());
  }
  red() {
    store.dispatch(redActions());
  }
}
```

通过使用情况可以看出这样使用 redux 并不是很优雅,接着对此进行封装,使用起来更加舒服, 下面是改进和的文件目录结构

```shell
│  App.jsx
│
├─page
│      about.jsx
│      about2.jsx
│      home.jsx
│      home2.jsx
│
├─store
│      createActions.js
│      index.js
│      reducer.js
│
└─utils
        connect.jsx
        context.jsx
```

- connect.jsx
  > 就是一个函数 用来连接 store 和组件, 但是有一点绕

```js
import React, { PureComponent } from 'react';
import store from '../store/index';
import StoreContext from './context';

export default function connect(mapStateToProps, mapActionToProps) {
  return function (Warper) {
    class EncHot extends PureComponent {
      constructor(props, context) {
        super(props);
        this.state = {
          store: context.getState(),
        };
      }

      componentDidMount() {
        this.unSubscribe = this.context.subscribe(() => {
          this.setState({
            store: { ...this.context.getState() },
          });
        });
      }

      componentWillUnmount() {
        this.unSubscribe();
      }

      render() {
        return (
          <Warper
            {...this.props}
            {...mapStateToProps(this.context.getState())}
            {...mapActionToProps(this.context.dispatch)}
          />
        );
      }
    }

    EncHot.contextType = StoreContext;

    return EncHot;
  };
}
```
这个文件重点在 ``` EncHot.contextType = StoreContext;```和props穿透以及订阅store

- context.jsx

> react 给我们提供的共享状态的方法

```js
import { createContext } from 'react';

const StoreContext = createContext();

export default StoreContext;
```

- App.jsx

> 这个文件相交之前也有变化

```js
import React, { PureComponent } from 'react';

import Home from './page/home2';
import About from './page/about2';

import Store from './store/index.js';
import StoreContext from './utils/context';

export default class App extends PureComponent {
  render() {
    return (
      <StoreContext.Provider value={Store}>
        <Home></Home>
        <About></About>
      </StoreContext.Provider>
    );
  }
}
```

- home2.jsx

> 使用 connect 函数 连接与 store 的关系, 将 store 的数据映射到 props 里面使用

```jsx
import React, { PureComponent } from 'react';

import { addActions } from '../store/createActions';
import { redActions } from '../store/createActions';

import connect from '../utils/connect';

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('home render', this.props.count);
    return (
      <div>
        <h1>Home</h1>
        <h2>{this.props.count}</h2>
        <button onClick={(e) => this.props.add()}>+1</button>
        <button onClick={(e) => this.props.red()}>-1</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state?.count || 0,
  };
};
const mapActonToProps = (dispatch) => {
  return {
    add: () => {
      dispatch(addActions());
    },
    red: () => {
      dispatch(redActions());
    },
  };
};

export default connect(mapStateToProps, mapActonToProps)(Home);
```

- about2.jsx

```jsx
import React, { PureComponent } from 'react';

import { addActions } from '../store/createActions';
import { redActions } from '../store/createActions';

import connect from '../utils/connect';

class About extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('about render', this.props.count);
    return (
      <div>
        <h1>About</h1>
        <h2>{this.props.count}</h2>
        <button onClick={(e) => this.props.add()}>+1</button>
        <button onClick={(e) => this.props.red()}>-1</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state?.count || 0,
  };
};

const mapActonToProps = (dispatch) => {
  return {
    add: () => {
      dispatch(addActions());
    },
    red: () => {
      dispatch(redActions());
    },
  };
};

export default connect(mapStateToProps, mapActonToProps)(About);
```

这两个文件重点就是`mapStateToProps`, `mapActonToProps`, `export default connect(mapStateToProps, mapActonToProps)(About);`

**总结:** redux应该还有内容, 比如说中间件, 可以在这里发送网络请求,暂时还没写,晚上我在学学.在react中有react-redux可以帮助我们快速共享状态,不用自己封装connect, context函数等就可以快速使用. 这篇文章也是简单的实现了一下react-redux帮我们做的事情,以后再使用react-redux的时候,明白其中的道理,知其然,更知其所以然.