#### 集成 redux

#### soter 顶层文件目录结果

```shell
C:.
    index.js
    reducer.js
```

- index.js

> 应用中间间 redux-thunk 配置浏览器开发工具 redux-dev-tool 合并 reducer

```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// all reducer
import cReducer from './reducer';

// config browers ReduxDev
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(cReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
```

reducer.js

> 使用 combineReducers 合并 reducer 导出给 index.js 使用

```js
import { combineReducers } from 'redux';
import { reducer as recommendReducer } from '../pages/discover/child-page/recommend/store/index';

const cReducer = combineReducers({
  recommend: recommendReducer,
});

export default cReducer;
```

##### 拆分 store

> 文件夹结构 每个文件都有自己的 store index 导出 reducer 最终在 store/reducer 处进行合并

```shell
C:.
│  index.jsx
│  style.js
│
└─child-page
    ├─album
    │      index.jsx
    │      style.js
    │
    ├─artist
    │      index.jsx
    │      style.js
    │
    ├─djradio
    │      index.jsx
    │      style.js
    │
    ├─ranking
    │      index.jsx
    │      style.js
    │
    ├─recommend
    │  │  index.jsx
    │  │  style.js
    │  │
    │  ├─child-cop
    │  │  └─top-banner
    │  │          index.jsx
    │  │          style.js
    │  │
    │  └─store
    │          action-creater.js
    │          const.js
    │          index.js
    │          reducer.js
    │
    └─songs
            index.jsx
            style.js
```
注意: 使用了react-thunk来进行异步操起, 以为redux本来只支持同步. 当数据过多的时候{...data}这种方式来完成数据的拷贝是非常浪费性能的，因此使用了 immutable 来帮助完成数据的拷贝, 以此来提示性能.

##### 使用 reducer

1. 使用 connect 函数 进行映射 mapStateToProps mapDispatchToProps 传入 组件

```js
const Recommend = (props) => {
  const { banner, getTopBanner } = props;

  useEffect(() => {
    getTopBanner();
  }, [getTopBanner]);

  return <div>推荐{banner.length}</div>;
};

const mapStateToProps = (state) => {
  return {
    banner: state.recommend.topBanner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopBanner: () => {
      dispatch(getTopBannerAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
```

2. 使用 react hook 的方法

> 下面列子中主要使用了 useSelector, useDispatch, shallowEqual 三个 hook 来帮助使用 redux useDispatch 获取 dispatch 对象 useSelector 获取 redux 中的 state shallowEqual 进行性能优化

 1.useDispatch 获取 dispatch
  1.dispathc 派发action
    1. 同步action(对象)
    2. 异步action(函数)
 2.useSelector 获取 store中的数据

 3.结合useEffect使用
 
下面是一个简单的轮播图例子 使用 redux 和 hook 的方式获取数据, 进行页面开发.

```js
import React, { memo, useEffect, createRef, useState, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getTopBannerAction } from '../../store/action-creater';

import { BannerWarpper } from './style';
import { Carousel } from 'antd';

const TopBanner = memo(() => {
  console.log('render');
  // local state
  const carouselRef = createRef();
  const [currentBanner, setCurrentBanner] = useState(0);

  // reudx
  const { banner } = useSelector(
    (state) => ({
      banner: state.recommend.get('topBanner'),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  // 页面逻辑
  const changeBanner = useCallback(function changeBanner(from, to) {
    setCurrentBanner(to);
  });

  const bgImg = banner[currentBanner] && banner[currentBanner].imageUrl + '?imageView&blur=40x20';
  console.log(bgImg);
  return (
    <BannerWarpper bgImg={bgImg}>
      <div className="wrap-v1">
        <div className="left">
          <span onClick={(e) => carouselRef.current.prev()}></span>
        </div>
        <div className="center wrap-v2">
          <div className="center-left">
            <Carousel effect="fade" ref={carouselRef} beforeChange={changeBanner}>
              {banner.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="center-right">
            <a href="https://music.163.com/download" className="download"></a>
          </div>
        </div>
        <div className="right">
          <span onClick={(e) => carouselRef.current.next()}></span>
        </div>
      </div>
    </BannerWarpper>
  );
});

export default TopBanner;
```

##### 总结

react-redux 的使用稍稍有些复杂, 写react代码的使用很容易写出性能不是很好的代码, 使用hook要明白其内部原理, 才能写出高性能的react代码, 比如使用mome包裹组件 使用Immutabel 复制对象.

!完