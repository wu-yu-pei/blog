#### React 组件通信

> 根据我之前学习 Vvue 的经验,组件通信这一点知识很重要

##### 父传子 props

1.子组件是类式组件

```jsx
// 子组件 Class式组件
class Child extends Component {
  // constructor(props) {
  //   super();
  //   this.props = props;
  // }

  // constructor(props) {
  //   super(props);
  // }  // 也可以直接省略

  static propTypes = {
    name: PropType.string.isRequired,
    age: PropType.number,
    height: PropType.number,
  };

  static defaultProps = {
    name: 'aaa',
    age: 999,
    height: 10000,
  };

  render() {
    const { name, age, height } = this.props;
    return <div>{name + '' + age + '' + height}</div>;
  }
}

// 父组件
export default class App extends Component {
  render() {
    return (
      <div>
        <Child name="wuyupei" age={20} height={1.88} />
        <Child name="liuxu" age={10} height={1.67} />
        <Child />
      </div>
    );
  }
}
```

2.子组件是函数式组件

```jsx
// 函数式组件 props
function Child(props) {
  const { name, age, height } = props;
  return <div>{name + '' + age + '' + height}</div>;
}
```

3.子组件限定参数的类型

```jsx
Child.propTypes = {
  name: PropType.string.isRequired,
  age: PropType.number,
  height: PropType.number,
};

Child.defaultProps = {
  name: 'aaa',
  age: 999,
  height: 10000,
};
```

##### 子传父 props(传递函数)案例练习

```css
* {
  margin: 0;
  padding: 0;
}
.tab-control {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 36px;
  line-height: 36px;
}

.tab-control li {
  /* flex: 1; */
  width: 40px;
  list-style: none;
  text-align: center;
}
.active {
  border-bottom: 2px solid red;
}
```

```jsx
import React, { Component } from 'react';
class TabControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: 0,
    };
  }

  render() {
    const { tabBar } = this.props;
    const { activeId } = this.state;
    return (
      <ul className="tab-control">
        {tabBar.map((item) => {
          return (
            <li
              className={activeId == item.id ? 'active' : ''}
              onClick={() => this.handleItemClick(item.id)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }

  handleItemClick(id) {
    this.setState({
      activeId: id,
    });
    this.props.itemClick(id);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBar: [
        {
          id: 0,
          name: '主页',
        },
        {
          id: 1,
          name: '商品',
        },
        {
          id: 2,
          name: '详情',
        },
      ],
      text: '主页',
    };
  }
  render() {
    const { tabBar, text } = this.state;
    return (
      <div>
        <TabControl tabBar={tabBar} itemClick={(id) => this.tabBarItemClick(id)}></TabControl>
        <h2 style={{ margin: '0 0 0 10px' }}>{text}</h2>
      </div>
    );
  }

  tabBarItemClick(id) {
    this.setState({
      text: this.state.tabBar[id].name,
    });
  }
}
```

**总结** 传函数就完了, 注意 this 问题. 由此可以看出 react 的灵活

##### 嵌套组件的通信

1.层层传递

```jsx
import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { username, userage } = this.props;
    return (
      <div>
        <p>body</p>
        <span>username:{username}</span>
        <br />
        <span>userage:{userage}</span>
      </div>
    );
  }
}

class Contene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Content</h2>
        <Body username={this.props.username} userage={this.props.userage}></Body>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'wuyupei',
      userage: 20,
    };
  }
  render() {
    const { username, userage } = this.state;
    return (
      <div>
        <Contene username={username} userage={userage}></Contene>
      </div>
    );
  }
}
```

2.使用展开符传递(比第一张方便了一点点点)

```jsx
import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { username, userage } = this.props;
    return (
      <div>
        <p>body</p>
        <span>username:{username}</span>
        <br />
        <span>userage:{userage}</span>
      </div>
    );
  }
}

class Contene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Content</h2>
        <Body {...this.props}></Body>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'wuyupei',
      userage: 20,
    };
  }
  render() {
    return (
      <div>
        <Contene {...this.state}></Contene>
      </div>
    );
  }
}
```

3.使用 React.createContext

3.1 子组件是类式组件

```jsx
import React, { Component } from 'react';

const userContext = React.createContext({
  username: 'XXX',
  userage: 123,
});

class Body extends Component {
  constructor(props) {
    super(props);
  }

  // static contextType = userContext;

  render() {
    const { username, userage } = this.context;
    return (
      <div>
        <p>body</p>
        <span>username:{username}</span>
        <br />
        <span>userage:{userage}</span>
      </div>
    );
  }
}
Body.contextType = userContext;

class Contene extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Content</h2>
        <Body></Body>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'wuyupei',
      userage: 20,
    };
  }
  render() {
    return (
      <userContext.Provider value={this.state}>
        <div>
          <Contene></Contene>
        </div>
      </userContext.Provider>
    );
  }
}
```

**总结** 1.使用<userContext.provide> </userContext.provide> 包裹 2.在子组件中设置 `static contextType = xxxContext;`或`组件名.contextType = xxxContext;`

3.2 子组件是函数式组件

> 要使用 xxxContext.Consumer(消费者组件包裹) 并且里面是一个函数(参数就是 痛惜的数据)  支持套娃
```jsx
function Body() {
  return (
    <userContext.Consumer>
      {(value) => {
        return (
          <div>
            <p>body</p>
            <span>username:{value.username}</span>
            <br />
            <span>userage:{value.userage}</span>
          </div>
        );
      }}
    </userContext.Consumer>
  );
}
```

完!
