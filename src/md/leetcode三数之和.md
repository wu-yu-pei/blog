#### [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

难度中等4428

给你一个包含 `n` 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 *a，b，c ，*使得 *a + b + c =* 0 ？请你找出所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

 

**示例 1：**

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

**示例 2：**

```
输入：nums = []
输出：[]
```

**示例 3：**

```
输入：nums = [0]
输出：[]
```

 **思路:**

+ 排序
+ 移动三指针
+ for循环找目标(注意去重)
  + 每一次循环都要注意防止重复
+ push结果

**代码:**

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  // 结果数组
  let res = [];
  // 长度
  let len = nums.length
  // 排序
  nums = nums.sort((a, b) => a - b);
  
  for(let i = 0; i < len - 2; i++) {
      if(i == 0 || nums[i] !== nums[i-1]) {
          let str = i + 1;
          let end = len - 1;
          while(str < end) {
              if(nums[str] + nums[end] + nums[i] === 0) {
                  res.push([nums[i],nums[str], nums[end]])
                  str++;
                  end--;
                  while(str < end && nums[str] === nums[str - 1]) {
                      str++;
                  }
                  while(str < end && nums[end] === nums[end + 1]) {
                      end--;
                  }
              }else if(nums[str] + nums[end] + nums[i] > 0) {
                  end--
              }else {
                  str++
              }
          }
      }
  }

  return res;
};
```

