#### [27. 移除元素](https://leetcode-cn.com/problems/remove-element/)

给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/原地算法)** 移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 `O(1)` 额外空间并 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组**。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。



**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```



**示例 1：**

```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

**示例 2：**

```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

 **代码:**

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    //   let j = 0;
    //   let count = 0;
    //   for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] !== val) {
    //       nums[j] = nums[i];
    //       j++;
    //     } else {
    //       count++;
    //     }
    //   }
    //   nums.splice(j, count);

    // 双指针解法
    // i慢指针, j 快指针
    let i = j = 0;
    for(; j < nums.length; j++) {
        if(nums[j] !== val) {
            nums[i] = nums[j]
            i++
        }
    }
   nums.splice(i)
};
```

#### [557. 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

给定一个字符串 `s` ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。



**示例 1：**

```
输入：s = "Let's take LeetCode contest"
输出："s'teL ekat edoCteeL tsetnoc"
```

**示例 2:**

```
输入： s = "God Ding"
输出："doG gniD"
```



**代码:**

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {

    function reverse(w) {
        let len = w.length;
        w = w.split('')
        for(let i = 0, j = len - 1; i < j; i++, j--) {
            [w[i], w[j]] = [w[j], w[i]];
        }
        return w.join('')
    }

    s = s.split(' ')
    for(let i = 0; i < s.length; i++) {
        s[i] = reverse(s[i])
    }
    return s.join(' ')
};
```

#### [344. 反转字符串](https://leetcode-cn.com/problems/reverse-string/)

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `s` 的形式给出。

不要给另外的数组分配额外的空间，你必须**[原地](https://baike.baidu.com/item/原地算法)修改输入数组**、使用 O(1) 的额外空间解决这一问题。



**示例 1：**

```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```



**代码:**

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    // 双指针 while循环
    // let i = 0;
    // let j = s.length - 1;
    // while(i < j) {
    //     [s[i], s[j]] = [s[j], s[i]]
    //     i++;
    //     j--;
    // }
    // return s

    // 双指针 for循环
    let len = s.length;
    for(let i = 0, j = len - 1; i < j; i++, j--) {
        [s[i], s[j]] = [s[j], s[i]]
    }
    return s
};
```

#### [剑指 Offer 05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。



**示例 1：**

```
输入：s = "We are happy."
输出："We%20are%20happy."
```

 **代码:**

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    //return s.replaceAll(' ', '%20')
    //return s.replace(/[ ]/g, '%20')
        s = s.split("");

    // 把字符串转化成数组
    // 1. 计算原长度
    let oldLen = s.length;
    let spaceCount = 0;
    for (let i = 0; i < oldLen; i++) {
        if (s[i] === ' ') spaceCount++;
    }
    // 计算把空格替换为20%后的长度
    s.length += spaceCount * 2;
    // 从后往前遍历 防止字符串被修改
    for (let i = oldLen - 1, j = s.length - 1; i >= 0; i--, j--) {
        if (s[i] !== ' ') s[j] = s[i];
        else {
            s[j - 2] = '%';
            s[j - 1] = '2';
            s[j] = '0';
            j -= 2;
        }
    }
    return s.join('');
};
```

#### [剑指 Offer II 024. 反转链表](https://leetcode-cn.com/problems/UHnkqh/)

给定单链表的头节点 `head` ，请反转链表，并返回反转后的链表的头节点。



**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

```
输入：head = [1,2]
输出：[2,1]
```

**示例 3：**

```
输入：head = []
输出：[]
```

**思路:**
![img](../mdimg/%E5%8F%8D%E8%BD%AC%E9%93%BE%E8%A1%A8.gif)


**代码:**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 双指针
    // l --> 左指针 r --> 右指针
    // let l = null
    // let r = head
    // // 如果右指针
    // while(r) {
    //     // 保留一下next
    //     let n = r.next
    //     // 交换指针位置
    //     r.next = l
    //     l = r
    //     // next
    //     r = n
    // }
    // return l


    // 递归法
    var reverse = function(pre, head) {
        if(!head) return pre;
        const temp = head.next;
        head.next = pre;
        pre = head
        return reverse(pre, temp);
    }

    return reverse(null, head);
};
```

