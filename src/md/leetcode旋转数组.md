#### [189. 轮转数组](https://leetcode-cn.com/problems/rotate-array/)

难度中等 1370 收藏分享切换为英文接收动态反馈

给你一个数组，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

**示例 1:**

```
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
```

**示例 2:**

```
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释:
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

**思路:**

**代码**

1. 自己的解法 超时了~

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  for (let i = 1; i <= k; i++) {
    let cur = nums[nums.length - 1];
    for (let j = nums.length - 1; j >= 1; j--) {
      nums[j] = nums[j - 1];
    }
    nums[0] = cur;
  }
  return nums;
};
console.log(rotate([-1, -100, 3, 99], 2));
```

2.自己的解法 没超时 但是 k 的取值不萌超过 nums.length

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  let _arr = nums.splice(nums.length - k);
  let arr = [..._arr, ...nums];
  for (let i = 0; i < arr.length; i++) {
    nums[i] = arr[i];
  }
  return arr;
};
```

3. 改进 2 关键代码 k = k % nums.length; 求余操作 提交了 25 次 终于成功了~

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  // 取余操作
  k = k % nums.length;
  // 截取
  let _arr = nums.splice(nums.length - k);
  // 生成新的arr
  let arr = [..._arr, ...nums];
  // 覆盖原来的nums
  for (let i = 0; i < arr.length; i++) {
    nums[i] = arr[i];
  }
  // ok
  return arr;
};
```
