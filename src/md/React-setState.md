#### React 中的 setState

- 问题一:为什么要使用 setState?

  > React 并没有实现类似于 Vue2 中的 Object.defineProperty 或者 Vue3 中的 Proxy 的方式来监听数据的变化；我们必须通过 setState 来告知 React 数据已经发生了变化；

- 问题二:setState 是同步还是异步的? 在哪里可以获取异步更新后的数据
  > 可以是同步的也可以是异步的, 在使用 setState 的时候, 由于 setState 是 React 内部帮我们调用的, 要想知道它是异步的还是同步的需要去看它的源码, 在源码中, setState 在不同的上下文中,右不同的表现 在元素 api 事件中 是同步的 在 reactapi 中是异步的

```js
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '吴玉配',
    };
  }
  componentDidMount() {
    this.setState({
      message: 'liuxu',
    });
    console.log(this.state.message);
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
      this.setState({
        message: 'liux',
      });
      console.log(this.state.message);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 在这个生命周期中也可获取到
    console.log(prevProps, prevState, this.state.message);
  }
  render() {
    return (
      <div>
        <h2>name:{this.state.message}</h2>
        <button onClick={(e) => this.handleChangeName()}>改变名字</button>
        <button className="btn">改变名字2</button>
      </div>
    );
  }
  handleChangeName() {
    // 异步
    // this.setState({
    //   message: 'liuxu',
    // });
    // console.log(this.state.message);

    // setState跟上第二个参数 就可以获取到修改的结果了
    // this.setState(
    //   {
    //     message: 'liuxu',
    //   },
    //   () => {
    //     console.log(this.state.message);
    //   }
    // );

    // 同步
    setTimeout(() => {
      this.setState({
        message: 'liuxu',
      });
      console.log(this.state.message);
    }, 0);
  }
}
```

- 问题 3: setState 数据的合并

> 多次调用 setState,并没有达到理想的效果

```js
render() {
    return (
      <div>
        {this.state.count}
        <button onClick={(e) => this.add()}>+1</button>
      </div>
    );
  }

  add() {
    this.setState({
      count: this.state.count + 1,
    });
    this.setState({
      count: this.state.count + 1,
    });
    this.setState({
      count: this.state.count + 1,
    });
    // 结果: 浏览器显示 count: 1


    // 这样就可以达到理想效果
    this.setState((state, props) => {
      return {
        count: state.count + 1,
      };
    });

    this.setState((state, props) => {
      return {
        count: state.count + 1,
      };
    });
    this.setState((state, props) => {
      return {
        count: state.count + 1,
      };
    });
  }
```

- 问题 4: React 跟新机制

  > 我觉得跟 vue 差不多,都是使用 diff 算法,进行最小的更新,因此在给列表加 key 也是跟 vue 中差不多,优化 diff 算法

  1.对比不同类型的元素

  > 当节点为不同的元素，React 会拆卸原有的树，并且建立起新的树：当一个元素从 a 变成 img，从 Article 变成 Comment，或从 Button 变成 div 都会触发一个完整的重建流程；

  2.对比同一类型的元素

  > 当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性

  3.对子节点进行递归

  > 默认条件下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation

- 问题 5:setState 数据合并
  > 使用 setState({}) 传一个对象, 会不会把原来对象里的值给覆盖了?

```js
  render() {
    return (
      <div>
        <div>{this.state.message}</div>
        <div>{this.state.age}</div>
        <button onClick={(e) => this.add()}>+1</button>
      </div>
    );
  }
  add() {
    // 这个传了一个对象 那么为什么原理的message还存在呢 以为react内部使用Object.asing({}, serState对象, oldState对象) 进行了一个合并,因此message数据还在
    this.setState({
      age: this.state.age + 1,
    });
  }
```

- 问题 6: React 性能优化
  > 当存在组件嵌套,外层组件数据发生改变,内层的所有组件都要重新渲染

```js
import React, { Component } from 'react';

class Header extends Component {
  render() {
    console.log('class Header render');
    return <div>Header</div>;
  }
}

function Content() {
  console.log('functon Content render');
  return (
    <div>
      Content
      <List></List>
    </div>
  );
}

function List() {
  console.log('functon List render');
  return (
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
    </ul>
  );
}

class Fotter extends Component {
  render() {
    console.log('class Fotter render');
    return <div>Fotter</div>;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    console.log('class App render');
    return (
      <div>
        count:{this.state.count}
        <button onClick={(e) => this.add()}>+1</button> <br />
        <Header></Header>
        <Content></Content>
        <Fotter></Fotter>
      </div>
    );
  }
  add() {
    this.setState({
      count: this.state.count + 1,
    });
  }
}

// 初始化
//[vite] connecting...
// 01-render被调用的次数.jsx:47     class App render
// 01-render被调用的次数.jsx:5      class Header render
// 01-render被调用的次数.jsx:11     functon Content render
// 01-render被调用的次数.jsx:21     functon List render
// 01-render被调用的次数.jsx:34     class Fotter render
// client.ts:53 [vite] connected.

// 点击+1
// 01-render被调用的次数.jsx:47     class App render
// 01-render被调用的次数.jsx:5      class Header render
// 01-render被调用的次数.jsx:11     functon Content render
// 01-render被调用的次数.jsx:21     functon List render
// 01-render被调用的次数.jsx:34     class Fotter render

// 发现所有的render（Class组件）| 函数（函数式组件）都被调用一次 这是相当消耗性能的
```

- 问题 7 如何优化（优化）
  > scp --> shouldConponentUpdate 生命周期函数

```js
constructor(props) {
  super(props);
  this.state = {
    count: 0,
    message: 'wuyupei', // jsx中并没有依赖因此不应该更新
  };
}
// scu优化 只有依赖项发生改变才返回true 让react进行更新
shouldComponentUpdate(nextProps, nextState) {
  if (this.state.count !== nextState.count) {
    return true;
  }

  return false;
}
render() {
  console.log('class App render');
  return (
    <div>
      count:{this.state.count} {this.state.message}
      <button onClick={(e) => this.changeMessage()}>message</button> <br />
      <Header></Header>
      <Content></Content>
      <Fotter></Fotter>
    </div>
  );
}
changeMessage() {
  this.setState({
    message: 'aaa',
  });
}
```

> scp 缺点 如果所有的类，我们都需要手动来实现 shouldComponentUpdate，那么会给我们开发者增加非常多的工作量。

class 组件使用`PureComponent`或者函数式组件`memo`

```js
import React, { PureComponent, Component, memo } from 'react';

class Header extends PureComponent {
  render() {
    console.log('class Header render');
    return <div>Header</div>;
  }
}
const Content = memo(function Content() {
  console.log('functon Content render');
  return (
    <div>
      Content
      <List></List>
    </div>
  );
});

const List = memo(function List() {
  console.log('functon List render');
  return (
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
    </ul>
  );
});

class Fotter extends PureComponent {
  render() {
    console.log('class Fotter render');
    return <div>Fotter</div>;
  }
}

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: 'wuyupei',
    };
  }

  render() {
    console.log('class App render');
    return (
      <div>
        count:{this.state.count} {this.state.message}
        <button onClick={(e) => this.changeMessage()}>message</button> <br />
        <Header></Header>
        <Content></Content>
        <Fotter></Fotter>
      </div>
    );
  }
  changeMessage() {
    this.setState({
      message: 'aaa',
    });
  }
}
// 初始化
// client.ts:16 [vite]              connecting...
// 02-Purecomponent-memo.jsx:48     class App render
// 02-Purecomponent-memo.jsx:5      class Header render
// 02-Purecomponent-memo.jsx:10     functon Content render
// 02-Purecomponent-memo.jsx:20     functon List render
// 02-Purecomponent-memo.jsx:33     class Fotter render
// client.ts:53 [vite]               connected.

// 改变message  可以发现只有App重新render了
// 02-Purecomponent-memo.jsx:48      class App render
```

- 问题 8 this.state 数据不可变的魅力（优化）
> 前提是使用PureComponent 这样可以达到最大的优化， 只更新遍布的组件
```js
import React, { PureComponent, Component } from 'react';

// 注意 这里使用PureComponent 如果使用Component更新式没问题的
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        { name: 'wuyupei', age: 10 },
        { name: 'wuyupei', age: 11 },
        { name: 'wuyupei', age: 12 },
      ],
    };
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.friends.map((item, index) => {
            return (
              <li>
                name{item.name}, age:{item.age} <button onClick={(e) => this.add(index)}>+1</button>
              </li>
            );
          })}
        </ul>

        <button onClick={(e) => this.push()}>push</button>
      </div>
    );
  }

  add(index) {
    // 无法更新
    // this.state.friends[index].age = this.state.friends[index].age + 1;
    // this.setState({
    //   friends: this.state.friends,
    // });
    this.state.friends[index].age = this.state.friends[index].age + 1;
    const newFriends = [...this.state.friends];
    this.setState({
      friends: newFriends,
    });
  }

  push() {
    // 无法更新
    // this.state.friends.push({ name: 'aaa', age: 999 });
    // this.setState({
    //   friends: this.state.friends,
    // });

    // 这样就可以了
    const newFriends = [...this.state.friends, { name: 'aaa', age: 1010 }];
    this.setState({
      friends: newFriends,
    });
  }
}
```
