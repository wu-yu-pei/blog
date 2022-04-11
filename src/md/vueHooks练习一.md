#### vue 中的 hooks

> 随着 vue2 --> vue3 optionApi --> componstionApi hook 再 vue 中也逐渐变得灵活好用,vue2 经常使用 mixin 的方法抽离相同逻辑,存在很多问题,比如说跟 data 中的属性冲突等问题, 但是 hook 可以完美解决这一点,而且使用 hook,可以根据 hook 的名字迅速了解到 hook 的功能这几天刚好想研究一下 vue 中的 hook, 练习一下封装 hook 的能力.

#### useWindowResize

```ts
import { ref, onMounted, onUnmounted } from 'vue';
import { Ref } from 'vue';

interface Window {
  width: Ref<number>;
  height: Ref<number>;
}

export default function (): Window {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const resize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', resize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });

  return {
    width: width,
    height: height,
  };
}
```

使用

```vue
<template>
  <div>useWindowResizeHooks-->width:{{ width }}, height:{{ height }}</div>
</template>

<script setup lang="ts">
import useWindowResize from '../hooks/useWindowResize';

let { width, height } = useWindowResize();

```

#### useStorage

```ts
import { ref, onMounted, onUnmounted } from 'vue';
import { Ref } from 'vue';

interface Usestorage {
  value: Ref<string>;
  setItem: (value: string) => void;
}

const getStoreItem = (key: string, store: Storage): null | string => {
  let value = store.getItem(key);
  if (!value) {
    return null;
  }
  try {
    // JSPN.parse可能出错,try catch一下
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export default function (key: string, type: string = 'local'): Usestorage {
  let storage = null;
  switch (type) {
    case 'session':
      storage = sessionStorage;
      break;
    case 'local':
      storage = localStorage;
      break;
    default:
      return null;
  }

  const value = ref(getStoreItem(key, storage));

  // 原处这样写:
  // const setItem = (storage) => {
  //   return (newValue) => {
  //     value.value = newValue;
  //     storage.setItem(key, JSON.stringify(newValue));
  //   };
  // };

  // return [value, setItem(storage)];

  // 我觉得这样写也没问题:
  const setItem = (newValue) => {
    value.value = newValue;
    storage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setItem };
}
```

使用

```vue
<template>
  <div>useStorage:{{ value }}{{ value1 }}</div>
</template>

<script setup lang="ts">
import useStrage from '../hooks/useStorage';

let { value, setItem } = useStrage('name', 'local');
let { value: value1, setItem: setItem1 } = useStrage('name', 'session');

setTimeout(() => {
  setItem('wuyupei');
  setItem1('wuyupei');
}, 1000);
</script>
```

#### useNetworkStatus

```ts
import { onMounted, onUnmounted, ref, Ref } from 'vue';

// 原处这样写:
// export default function (callback: (status: string) => void): void {
//   const updateOnlineStatus = () => {
//     const status = navigator.onLine ? 'online' : 'offline';
//     callback(status);
//   };

//   onMounted(() => {
//     window.addEventListener('online', updateOnlineStatus);
//     window.addEventListener('offline', updateOnlineStatus);
//   });

//   onUnmounted(() => {
//     window.removeEventListener('online', updateOnlineStatus);
//     window.removeEventListener('offline', updateOnlineStatus);
//   });
// }

// 我觉得也可以这样写:
export default function (): Ref<string> {
  const status = ref('online');

  const updateStatus = () => {
    status.value = navigator.onLine ? 'online' : 'offline';
  };

  onMounted(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus);
    window.removeEventListener('offline', updateStatus);
  });

  return status;
}
```

使用

```vue
<template>
  <div>useNetworkStatus: {{ status }}</div>
</template>

<script setup lang="ts">
import useNetworkStatus from '../hooks/useNetworkStatus';

// useNetworkStatus((status) => {
//   console.log(status);
// });

let status = useNetworkStatus();
</script>
```

**总结**
利用 vue 的响应式以及函数的灵活性,可以写出非常通用的 hook,代码看起来也更加灵活,美观
