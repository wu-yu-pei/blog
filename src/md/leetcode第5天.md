1. 

#### [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

 

**示例 1：**

```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

**示例 2：**

```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

 **思路:**

+ 先遍历一遍,计算链表长度
+ 找出中间点
+ 开始移动head指针

**官方思路:**

+ 双指针
+ 慢指针一次走一步,快指针一次走两步
+ 快指针走到头.慢指针一定是再中间
+ 返回慢指针就ok

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
var middleNode = function(head) {
    // // leetcode题解  懂了
    // // 慢指针
    // let left = head;
    // // 快指针
    // let right = head;
    // while(right !== null && right.next !== null) {
    //     // 慢指针一次走一步
    //     left = left.next;
    //     // 快指针一次走两步
    //     right = right.next.next
    // }
    // // 返回慢指针
    // return left;

    // 我的解法
    // 1. 先遍历一遍链表 算出长度
    let h = head;
    let length = 0;
    while(h) {
        length++
        h = h.next
    }
    // 2. 计算中间点
    let mid = Math.floor(length / 2)
    // 3. 移动head指针
    while(mid > 0) {
        head = head.next;
        mid--
    }
    return head
};
```

2. 

#### [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

 **思路:**

+ 双指针
+ 块指针先走n步,慢指针再开始走
+ 快指针走到头,慢指针的下一个节点就是要删除的节点

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // 占位节点
    const demp = new ListNode()
    demp.next = head
    
    // 快指针
    let l = demp;
    // 慢指针
    let r = demp;

    // 快指针先走n步
    while(n > 0) {
        r = r.next;
        n--;
    }

    // 快慢指针一起走
    while(r.next) {
        l = l.next;
        r = r.next;
    }

    l.next = l.next.next

    return demp.next
};
```

