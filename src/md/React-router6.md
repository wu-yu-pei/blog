#### React-router v6

> 最近学习的 React 视频视频有点老了,自己结合项目摸索模式新的 React-router v6 hooks

##### React-router 官网

1. 官网配置的都是手写路由
2. 官网没有给出像 vue 呢样的配置式路由
3. 官网的路由懒加载也是手写的, 在一些情况写可能希望动态路由是配置的而且是懒加载的

##### 尝试

1. 使用配置式路由,对项目的路由进行配置(路由嵌套)
   > 下面式我配置的路由
   > router/index.jsx

```js
import { Navigate } from 'react-router-dom';
import Discover from '@/pages/discover';
import Artist from '@/pages/discover/child-page/artist';
import Ablum from '@/pages/discover/child-page/album';
import Djradio from '@/pages/discover/child-page/djradio';
import Ranking from '@/pages/discover/child-page/ranking';
import Recommend from '@/pages/discover/child-page/recommend';
import Songs from '@/pages/discover/child-page/songs';

import Friend from '@/pages/friend';
import Mine from '@/pages/mine';

const routes = [
  {
    path: '/',
    // 重定向
    element: <Navigate to="/discover"></Navigate>,
  },
  {
    path: '/discover',
    element: <Discover></Discover>,
    children: [
      {
        path: '/discover',
        // 重定向
        element: <Navigate to="/discover/recommend"></Navigate>,
      },
      {
        path: '/discover/recommend',
        element: <Recommend></Recommend>,
      },
      {
        path: '/discover/ranking',
        element: <Ranking></Ranking>,
      },
      {
        path: '/discover/songs',
        element: <Songs></Songs>,
      },
      {
        path: '/discover/djradio',
        element: <Djradio></Djradio>,
      },
      {
        path: '/discover/artist',
        element: <Artist></Artist>,
      },
      {
        path: '/discover/album',
        element: <Ablum></Ablum>,
      },
    ],
  },
  {
    path: '/friend',
    element: <Friend></Friend>,
  },
  {
    path: '/mine',
    element: <Mine></Mine>,
  },
];

export default routes;
```

使用的时候需要借助 hooks 进行书写

```js
import React, { memo } from 'react';

import { useRoutes } from 'react-router-dom';
import routes from './router/index';

import AppHeader from 'components/app-header';
import AppFotter from 'components/app-fotter';

const App = memo(() => {
  return (
    <>
      <AppHeader></AppHeader>
      {useRoutes(routes)}
      <AppFotter></AppFotter>
    </>
  );
});
```

2. 尝试懒加载

> 最后懒加载我尝试了一下

```js
import { lazy } from 'react';

const Home = lazy(() => import('../page/home'));
const About = lazy(() => import('../page/about'));
const Profile = lazy(() => import('../page/profile'));
const AboutA = lazy(() => import('../page/about-a'));
const AboutB = lazy(() => import('../page/about-b'));

const routes = [
  { path: '/', component: Home },
  {
    path: '/about',
    component: About,
    children: [
      { path: '/about', component: AboutA },
      { path: '/about/b', component: AboutB },
    ],
  },
  { path: '/profile', component: Profile },
];

export default routes;
```

使用

```js
<Routes>
  {routes.map((item, i) => {
    <Routes>
      {item.children.map((citem, cindex) => {
        return (
          <Route
            key={cindex}
            path={citem.path}
            element={
              <Suspense fallback={<div>路由懒加载...</div>}>
                <citem.component />
              </Suspense>
            }
          />
        );
      })}
    </Routes>;
  })}
</Routes>
```

但是我看没有懒加载的效果,因为浏览器里同时加载了所有组件 但是官网也是这么写的
另外,如果有嵌套组件,只写一层是不行的, 需要递归掉用, 动态生成路由配置.
