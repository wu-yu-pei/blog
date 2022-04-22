#### js原生方法和函数的实现

> javascript原生函数以及方法的实现
>
> 熟练掌握 打好基础
>
> !!!

```js
 1.call函数
Function.prototype.myCall = function (obj, ...args) {
   获取fn
  const fn = this
   挂到obj上
  obj['fn'] = fn
   通过obj.的方式调用  函数可能有返回值 所以return
  return obj.fn(...args)
   删除属性
  delete obj['fn']
}

 1.myCall测试
 var person = {
   name: 'wuyupei',
   age: 20,
 }

 function foo(age) {
   console.log(this.name, age)
   return 30
 }

 console.log(foo.myCall(person, 20))

 2.apply函数
Function.prototype.myApply = function (obj, args) {
  const fn = this
  obj['fn'] = fn
  return obj.fn(...args)
  delete obj['fn']
}

 2.myCall测试
 var person = {
   name: 'wuyupei',
   age: 20,
 }

 function foo(age) {
   console.log(this.name, age)
   return 30
 }

 console.log(foo.myApply(person, [20]))

 3.bind函数的实现
Function.prototype.myBind = function (obj, ...args) {
  const fn = this

  const F = function () {}

  const bindFn = function () {
    if (this instanceof bindFn) {
      return fn.call(this, ...args, ...arguments)
    } else {
      return fn.call(obj, ...args, ...arguments)
    }
  }

  F.prototype = this.prototype
  bindFn.prototype = new F()
  return bindFn
}

 3.myBind测试
 var person = {
   name: 'wuyupei',
   age: 20,
 }

 function foo(age, info) {
   console.log(this.name, age, info)
 }

 const bar = foo.myBind(person, 20)
  bar('xixixi')
 const b = new bar('喜喜')
 b.name = 'a'
 console.log(b.name, b)

 4.防抖
 4.1
function double(fn, delay) {
  let timer
  return function () {
    let _this = this
    let arg = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
       修改this执行到外部
      fn.apply(_this, arg)
    }, delay)
  }
}
4.2
function double(fn, delay) {
  let timer
  return function () {
    let arg = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
       this执行外部
      fn.apply(this, arg)
    }, delay)
  }
}

 5.节流
 5.1
function throttle(fn, delay) {
  let timer
  return function () {
    let arg = arguments
    let _this = this
    if (!timer) {
      timer = setTimeout(function () {
        dn.apply(_this, arg)
      }, delay)
    }
  }
}
 5.2
function throttle(fn, delay) {
  let timer
  return function () {
    let arg = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arg)
        timer = null
      }, delay)
    }
  }
}

 6.map的实现
 6.1 map的基本使用
 var arr = [{ age: 1 }, { age: 11 }, { age: 111 }, { age: 1111 }]

 var res = arr.map((item, index, arr) => {
   return item.age + '1'
 })
 console.log(res);

 6.2 map的实现
Array.prototype.myMap = function (fn) {
  let res = []
  for (var i = 0; i < this.length; i++) {
    res.push(fn(this[i], i, this))
  }
  return res
}
 测试:
 var arr = [{ age: 1 }, { age: 11 }, { age: 111 }, { age: 1111 }]
 var res = arr.myMap((item, index, arr) => {
   return item.age + '1'
 })
 console.log(res)

 7.reduce的实现
 7.1 reduce的基本使用
 var arr = [10, 2, 3, 4, 5, 6]
 var res = arr.reduce((pre, cur, index, arr) => {
   return pre + cur
 })
 console.log(res)

7.2myRudece的实现
Array.prototype.myReduce = function (fn, current) {
  let result = current || this.shift()
  for (var i = 0; i < this.length; i++) {
    result = fn(result, this[i], i, arr)
  }
  return result
}

测试
 var arr = [1, 2, 3, 4, 5, 6]
 var res = arr.myReduce((pre, cur, index, arr) => {
   return pre + cur
 })
 console.log(res)

8.filter
 8.1 filter的使用
 var arr = [1, 2, 3, 4, 5, 6]
 var res = arr.filter((item, index, arr) => {
   return item > 2
 })
 console.log(res)

 8.2 filter的实现
Array.prototype.myFilter = function (fn) {
  let result = []
  for (var i = 0; i < this.length; i++) {
    fn(this[i], i, this) && result.push(this[i])
  }
  return result
}

 测试
 var arr = [1, 2, 3, 4, 5, 6]
 var res = arr.myFilter((item, index, arr) => {
   return item > 2
 })
 console.log(res)

 9. find
 9.1 find的基本使用
 var arr = [1, 2, 3, 4, 5, 6]
 let res = arr.find((item, index, arr) => {
   return item === 1
 })
 console.log(res)

 9.2 find的实现
Array.prototype.myFind = function (fn) {
  for (var i = 0; i < this.length; i++) {
    if (fn(this[i], i, arr)) {
      return this[i]
    }
  }
  return -1
}
 测试
 var arr = [1, 2, 3, 4, 5, 6]
  let a = arr.myFind((item, index, arr) => item === 10)
 let a = arr.myFind((item, index, arr) => item === 1)
 console.log(a);

 10. findIndex
 10.1 findex的基本使用
 var arr = [1,3]
 let a = arr.findIndex(item => item === 1)
 console.log(a);

 10.2 findIndex的基本实现
Array.prototype.myFindIndex = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return i
    }
  }
  return -1
}

 测试
 var arr = [1,3]
 let a = arr.myFindIndex(item => item === 10)
 console.log(a);

 11 every
 11.1 every的基本使用
 var arr = [1, 3]
 let res = arr.every((item) => item > 0)
 console.log(res)
 Array.prototype.myEvery = function (fn) {}

 11.2 every的实现
Array.prototype.myEvery = function (fn) {
  let flag = false
  for (let i = 0; i < arr.length; i++) {
    if (!fn(this[i], i, this)) {
      flag = false
      return flag
    }
  }
  return true
}

测试
 var arr = [1, 3]
 let res = arr.myEvery((item) => item > 0)
 console.log(res)

 12 some
 12.1some的基本使用
 var arr = [1,2,3,90]
 let res = arr.some(item => item > 100)
 console.log(res);

 12.1some的实现
Array.prototype.mySome = function (fn) {
  let flag = true
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return flag
    }
  }
  return false
}
 测试
 var arr = [1,2,3,90]
 let res = arr.mySome(item => item > 80)
 console.log(res);

 13.数组去重
 var arr = [1, 1, 2, 2, 3, 4, 4, 5, 6]
 13.1.set
 let res = [... new Set(arr)]
 console.log(res);

 13.2. includes
 let res = []
 for (var i = 0; i < arr.length; i++) {
   !res.includes(arr[i]) && res.push(arr[i])
 }
 console.log(res);

 13.3.findIndex
 let res = []
 for (let i = 0; i < arr.length; i++) {
   if (res.findIndex((item) => item === arr[i]) === -1) {
     res.push(arr[i])
   }
 }
 console.log(res);

 14.concat
Array.prototype.myConcat = function (arr) {
  return [...this, ...arr]
}
 测试
 let res = arr.myConcat([0,0,0,0])
 console.log(arr, res);

 15.slice数组切片
 15.1基本使用
 var arr = [1,2,3,4,5,6,7]
 console.log(arr.slice(0,2),arr);

 15.2
Array.prototype.mySlice = function (start, end = 0) {
  let result = []
  for (let i = start; i < end; i++) {
    result.push(this[i])
  }
  return result
}
 测试
 var arr = [1,2,3,4,5,6,7]
 console.log(arr.mySlice(0,2));

 16 数组扁平化
 var arr = [1, 2, 3, [4, 5, 6, [2]], [0, 3]]
 16.1 flat(Infinity)
 let res = arr.flat(Infinity)
 console.log(res);

 16.2 递归
 function flat(array, result = []) {
   for (let i = 0; i < array.length; i++) {
     if (Array.isArray(array[i])) {
       flat(array[i], result)
     } else {
       result.push(array[i])
     }
   }
   return result
 }

 16.3 reduce
 function flat(arr) {
   let res = arr.reduce((pre, cur, index, arr) => {
     return Array.isArray(cur) ? pre.concat(flat(cur)) : pre.concat(cur)
   }, [])
   return res
 }

 console.log(flat(arr))

 17 数组的分块
 17.1 我的方法
 var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
 function fenkuai(arr, size) {
   let res = []
   for (
     let j = 0;
     j < Math.floor(arr.length / 3) + (arr.length % 3 < 3 ? 1 : 0);
     j++
   ) {
     for (let i = size * j; i < size * (j + 1); i++) {
       if (!res[j]) res[j] = []
       arr[i] && res[j].push(arr[i])
     }
   }
   return res
 }
 console.time()
 fenkuai(arr, 3)
 console.timeEnd()  0.0517578125 ms

 17.2 另一种方法
 function fenkuai(arr, size) {
   let result = []
   let temp = []
   arr.forEach((item) => {
     if (temp.length === 0) {
       result.push(temp)
     }
     temp.push(item)
     if (temp.length === size) {
       temp = []
     }
   })
   return result
 }
 console.time()
 fenkuai(arr, 3)
 console.timeEnd() 0.046875 ms

 18.数组的交集
 var arr1 = [1, 2, 6, 9, 8, 7, 7, 8, 9]
 var arr2 = [2, 5, 9, 0]
 function jiaoji(a, b) {
   let res = []
   for (let i = 0; i < a.length; i++) {
     for (let j = 0; j < b.length; j++) {
       if (a[i] === b[j]) {
         res.push(a[i])
       }
     }
   }
   return [...new Set(res)]
 }
 console.log(jiaoji(arr1, arr2));

 数组的差集
 var arr1 = [1, 2, 6, 9, 8, 7, 7, 8, 9]
 var arr2 = [2, 5, 9, 0]
 function chaji(a, b) {
   let res = a.filter((item) => !b.includes(item))
   console.log(res);
 }
 chaji(arr1, arr2)

```

