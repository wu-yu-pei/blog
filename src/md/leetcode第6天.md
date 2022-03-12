#### [1.无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。

 

**示例 1:**

```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```



**思路:**

+ 一个set用来存每一个最长子串
+ 遍历字符串, 更新max, 更新set

**代码:**

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // 自己的解法  只ac 20%
    let i = 0;
    let j = 0;
    let max = 0;
    while(j < s.length - 1) {
        if(foo(i, j + 1)) {
            max = Math.max(max, j - i)
            i = (s.slice(i, j + 1)).lastIndexOf(s[j]) + 1 + i
            console.log(i)
            j++
        }else {
            j++
        }
    }
    return max
    // 一个函数判断数组中是否有重复字符
    function foo(i, j) {
        let sn = s.slice(i, j)
        var ss = [...new Set(sn)]
        return ss.length === sn.length ? false : true
    }

    //滑动窗口
    // if(s.length === 0) return 0
    // let set = new Set()
    // let i = 0, j = 0; max = 0;
    // for(i; i< s.length; i++) {
    //     if(!set.has(s[i])) {
    //         set.add(s[i])
    //         max = Math.max(max, set.size)
    //     }else {
    //         while(set.has(s[i])) {
    //             set.delete(s[j])
    //             j++
    //         }
    //         set.add(s[i])
    //     }
    // }
    // return max

    // 滑动窗口解法
    // let set = new Set();
    // let len = s.length;
    // let max = 0;
    // let j = 0;
    // for(let i = 0; i < len; i++) {
    //     if(!set.has(s[i])) {
    //         set.add(s[i])
    //         max = Math.max(max, set.size)
    //     }else {
    //         while(set.has(s[i])) {
    //             set.delete(s[j])
    //             j++
    //         }
    //         set.add(s[i])
    //     }
    // }
    // return max
};
```

#### [2. 字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)

难度中等599收藏分享切换为英文接收动态反馈

给你两个字符串 `s1` 和 `s2` ，写一个函数来判断 `s2` 是否包含 `s1` 的排列。如果是，返回 `true` ；否则，返回 `false` 。

换句话说，`s1` 的排列之一是 `s2` 的 **子串** 。

 

**示例 1：**

```
输入：s1 = "ab" s2 = "eidbaooo"
输出：true
解释：s2 包含 s1 的排列之一 ("ba").
```

**示例 2：**

```
输入：s1= "ab" s2 = "eidboaoo"
输出：false
```

**思路:**

+ 想要是全排列, 字母个数必须相同
+ 搞一个Arrar记录每一个字母的个数
+ 最后左对比

**代码:**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    // 没解出来
    // let s1res = [];
    // let s2res = [];

    // s1res = foo(s1)
    // s1res.push(...foo(s1.split('').reverse().join('')))
    // console.log(s1res)
    // // 全排列函数
    // function foo(s) {
    //     let res = []
    //     for(let i = 0; i < s.length; i++) {
    //         for(let j =i + 1; j < s.length + 1; j++) {
    //             res.push(s.slice(i, j))
    //         }
    //     }
    //     return res
    // }

    // // leetcode官方
    // // 1. 计算长度
    // const n = s1.length, m = s2.length;
    // // 2. 如果 n > m 直接 false
    // if (n > m) {
    //     return false;
    // }
    // // cnt1记录s1中字母的个数, ctn2记录s2每个子串的字母个数
    // const cnt1 = new Array(26).fill(0);
    // const cnt2 = new Array(26).fill(0);
    // // 循环遍历s1 记录个数
    // for (let i = 0; i < n; ++i) {
    //     ++cnt1[s1[i].charCodeAt() - 'a'.charCodeAt()];
    //     ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
    // }
	// 下面看的不是很懂
    // if (cnt1.toString() === cnt2.toString()) {
    //     return true;
    // }

    // for (let i = n; i < m; ++i) {
    //     ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
    //     --cnt2[s2[i - n].charCodeAt() - 'a'.charCodeAt()];
    //     if (cnt1.toString() === cnt2.toString()) {
    //         return true;
    //     }
    // }
    // return false;


    // 根据leetcode官网思路 自己解出来了
    let l1 = s1.length;
    let l2 = s2.length;
    let c1 = new Array(26).fill(0)
    let c2 = new Array(26).fill(0)
    if(l1 > l2) return false

    for(let i = 0; i < l1; i++) {
        c1[s1[i].charCodeAt() - 'a'.charCodeAt()]++
    }
    console.log(c1)
    for(let i = 0; i <= l2 - l1; i++) {
        str = s2.slice(i, i + l1)
        for(let j = 0; j < l1; j++) {
            c2[str[j].toString().charCodeAt() - 'a'.charCodeAt()]++
        }
        console.log(c2)
        if(c1.toString() === c2.toString()){
            return true
        }
        c2 = new Array(26).fill(0)
    }
    return false
};
```

