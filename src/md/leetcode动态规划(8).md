#### [1. 按摩师](https://leetcode-cn.com/problems/the-masseuse-lcci/)

难度简单

一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。

**注意：**本题相对原题稍作改动

 

**示例 1：**

```
输入： [1,2,3,1]
输出： 4
解释： 选择 1 号预约和 3 号预约，总时长 = 1 + 3 = 4。
```

**示例 2：**

```
输入： [2,7,9,3,1]
输出： 12
解释： 选择 1 号预约、 3 号预约和 5 号预约，总时长 = 2 + 9 + 1 = 12。
```

**示例 3：**

```
输入： [2,1,4,5,3,1,1,3]
输出： 12
解释： 选择 1 号预约、 3 号预约、 5 号预约和 8 号预约，总时长 = 2 + 4 + 3 + 3 = 12。
```

**思路:**

+ 动态规划
+ 动态规划三部曲

**代码:**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var massage = function(nums) {
    // 1.错了 只考虑了两两相隔的
    // let max1 = 0;
    // let max2 = 0;
    // for(let i = 0; i < nums.length; i+=2) {
    //     max1+=nums[i]
    // }
    // for(let j = 1; j < nums.length; j+=2) {
    //     max2+=nums[j]
    // }
    // return Math.max(max1, max2)

    // 2.使用动态规划 ac了
    // 2.1初始化dp数组
    // let dp = [0, nums[0]]
    // // 2.2.确定遍历顺序
    // for(let i = 2; i <= nums.length; i++) {
    //     dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
    // }
    // console.log(dp)
    // //2.3 返回结果
    // return dp[nums.length]


    // leetcode网友答案
    const len = nums.length;
    if (!len) return 0;
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[len - 1];
};
```

