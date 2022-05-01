##### 刷两道算法题

219. 存在重复元素 II
     给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。

示例 1：

输入：nums = [1,2,3,1], k = 3
输出：true
示例 2：

输入：nums = [1,0,1,1], k = 1
输出：true
示例 3：

输入：nums = [1,2,3,1,2,3], k = 2
输出：false

两种解法
思路在代码里

```js
var containsNearbyDuplicate = function (nums, k) {
  // 1.思路: 找出每一项数组要查找的范围,然后遍历范围 求解
  // for(let i = 0; i < nums.length; i++) {
  //     let target = nums[i];
  //     let start = i - k;
  //     let end = i + k;
  //     if(start < 0) {
  //         start = 0
  //         start = start + 1
  //     }
  //     for(let j = start; j<= end && j != i; j++) {
  //         if(nums[j] == target) {
  //             return true
  //         }
  //     }
  // }
  // return false

  // 2.思路 : 搞一个map 存索引 每一次循环找目标
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    } else {
      map.set(nums[i], i);
    }
  }
  return false;
};
```

66. 加一
    给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1：

输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
示例 2：

输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。
示例 3：

输入：digits = [0]
输出：[1]

提示：

1 <= digits.length <= 100
0 <= digits[i] <= 9

两种解法
思路在代码里

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // 解法一: 转字符串 转数组
  // digits =  digits.join('')
  // digits = (digits * 1) + 1
  // return (digits.toString()).split('')

  //解法二: 循环遍历 计算
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] != 9) {
      digits[i] += 1;
      return digits;
    } else {
      digits[i] = 0;
    }
  }
  return [1, ...digits];
};
```
