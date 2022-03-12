#### [1. 最大子数组和](https://leetcode-cn.com/problems/maximum-subarray/)

难度简单

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

 

**示例 1：**

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

**示例 2：**

```
输入：nums = [1]
输出：1
```

**示例 3：**

```
输入：nums = [5,4,-1,7,8]
输出：23
```

+ 没解出来
+ 官方代码没看懂

**官方代码:**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let ans = nums[0];
    let sum = 0;
    for(const num of nums) {
        if(sum > 0) {
            sum += num;
        } else {
            sum = num;
        }
        ans = Math.max(ans, sum);
    }
    return ans;
};
```

看不懂~~!

#### [2. 环形子数组的最大和](https://leetcode-cn.com/problems/maximum-sum-circular-subarray/)

难度中等327收藏分享切换为英文接收动态反馈

给定一个长度为 `n` 的**环形整数数组** `nums` ，返回 *`nums` 的非空 **子数组** 的最大可能和* 。

**环形数组** 意味着数组的末端将会与开头相连呈环状。形式上， `nums[i]` 的下一个元素是 `nums[(i + 1) % n]` ， `nums[i]` 的前一个元素是 `nums[(i - 1 + n) % n]` 。

**子数组** 最多只能包含固定缓冲区 `nums` 中的每个元素一次。形式上，对于子数组 `nums[i], nums[i + 1], ..., nums[j]` ，不存在 `i <= k1, k2 <= j` 其中 `k1 % n == k2 % n` 。

 

**示例 1：**

```
输入：nums = [1,-2,3,-2]
输出：3
解释：从子数组 [3] 得到最大和 3
```

**示例 2：**

```
输入：nums = [5,-3,5]
输出：10
解释：从子数组 [5,5] 得到最大和 5 + 5 = 10
```

**示例 3：**

```
输入：nums = [3,-2,2,-3]
输出：3
解释：从子数组 [3] 和 [3,-2,2] 都可以得到最大和 3
```

+ 解步出来啊
+ 官方代码没看懂

**官方解法:**

```js
var maxSubarraySumCircular = function(nums) {
  const n = nums.length
  let preMax = nums[0], maxSum = 0, sum = 0
  for (let num of nums) {
    sum += num
    maxSum = Math.max(maxSum + num, num)
    preMax = Math.max(preMax, maxSum)
  }
  let preMin = nums[0], minSum = 0
  for (let num of nums) {
    minSum = Math.min(minSum + num, num)
    preMin = Math.min(preMin, minSum)
  }
  return Math.max(preMax, preMin === sum ? -Infinity : sum - preMin)
};
```

今天的动态规划~

下次一定看懂 (!_!)