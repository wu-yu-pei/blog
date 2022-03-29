#### watch 和 computed

> 今天面试被问 watch 和 computed 的区别,我回答的不是很好,今天先来一篇 watch 和 computed 的简单使用

```vue
<template>
  <div>{{ name }}--{{ person.one }} -- {{ person.two }}-- {{ person.count }}</div>
  <button @click="click">+</button>
</template>
```

```js
import { ref, computed, watch, reactive } from 'vue';

let person = reactive({
  one: 'liu',
  two: 'xu',
  count: 1,
});

let firstName = ref('Wu');
let lastName = ref('yupei');

let name = computed(() => firstName.value + lastName.value);

setTimeout(() => {
  firstName.value += 1;
  person.one = 'li';
}, 1000);

function click() {
  person.count++;
}

// getter
watch(firstName, (o, n) => {
  console.log(o, n);
});
```
我今天的回答是:
computed是具有缓存的,只会调用一次, 会优先使用缓存

watch是用来监听属性的变化,只要变化一次就会执行回调, 如果配置deep的话,会进行深度监听,内部可能是进行了一个递归监听


回答的非常片面而且很不准确,没有深入了解到真正的区别,明天在更一篇,详细说明computed和watch的区别, 做到对api的知根知地.....
