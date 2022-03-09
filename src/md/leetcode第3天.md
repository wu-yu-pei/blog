1.
2. 移动零
   给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
示例 2:

输入: nums = [0]
输出: [0]

**思路:**

- 双指针法
- 让 i 一直指向第一个 0 j 为快指针

**代码:**

```js
var moveZeroes = function (nums) {
  // 1.法一 让i执行第一个0
  // let i = 0
  // for(let j = 0; j < nums.length; j++) {
  //     if(nums[j] !== 0) {
  //         nums[i] = nums[j]
  //         i++
  //     }
  // }
  // for(let k = i; k < nums.length; k++) {
  //     nums[k] = 0
  // }
  // console.log(nums)
  // return nums

  // 2.法二
  let i = (j = 0);
  while (i < nums.length) {
    if (nums[i] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
    i++;
  }
  return nums;
};
```

2.
3. 两数之和 II - 输入有序数组
   给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列 ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。

示例 1：

输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
示例 2：

输入：numbers = [2,3,4], target = 6
输出：[1,3]
解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
示例 3：

输入：numbers = [-1,0], target = -1
输出：[1,2]
解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。

**代码:**

```js
// 自己的代码 不是最优解
var twoSum = function (numbers, target) {
  // for(let i = 0; i < numbers.length; i++) {
  //     for(let j = i + 1; j < numbers.length; j++) {
  //         if(numbers[i] + numbers[j] === target) {
  //             return [i+1, j+1]
  //         }
  //     }
  // }
  // leetcode 网友解法 超时~
  //     for (let i = numbers.length - 1; i >= 0; i--) {
  //     let b = i;
  //     while (b >= 0) {
  //       b--;
  //       if (numbers[i] + numbers[b] === target) {
  //         return [b + 1, i + 1]
  //       }
  //     }
  //   }
  //  加入二分优化
  for (let i = 0; i < numbers.length; i++) {
    // 左闭右闭区间
    let low = i + 1;
    high = numbers.length - 1;
    while (low <= high) {
      let mid = low + ((high - low) >> 1);
      if (numbers[mid] == target - numbers[i]) return [i + 1, mid + 1];
      else if (numbers[mid] > target - numbers[i]) high = mid - 1;
      else low = mid + 1;
    }
  }
  return [-1, -1];
};
```
