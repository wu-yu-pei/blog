1. 

#### [55. 跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

难度中等1699收藏分享切换为英文接收动态反馈

给定一个非负整数数组 `nums` ，你最初位于数组的 **第一个下标** 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

 

**示例 1：**

```
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
```

**示例 2：**

```
输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
```

 **官方思路:**

+ 这道题目关键点在于：不用拘泥于每次究竟跳跳几步，而是看覆盖范围，覆盖范围内一定是可以跳过来的，不用管是怎么跳的。

**代码:**

看懂了,后续继续研究~

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    // 初始化dp数组  数组下标代表每一个位置是否可以到达
    let dp = new Array(nums.length).fill(false)
    // 第1个位置可以到达
    dp[0] = true;
    // 循环每一个位置
    for(let i = 1; i < nums.length; i++) {
        for(let j = 0; j <i; j++) {
            // 当前位置j能到达,并且当前位置加上j 到达的位置超过i那么代表可以到达当前位置, 更新di[i] 为ture
            if(dp[j] && nums[j] + j >= i) {
                dp[i] = true
                break
            }
        }
    }
    return dp[nums.length - 1]
};
```

