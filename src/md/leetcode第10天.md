#### [1. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

难度简单

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

**示例 2：**

```
输入：l1 = [], l2 = []
输出：[]
```

**示例 3：**

```
输入：l1 = [], l2 = [0]
输出：[0]
```

**思路:**

+ 创建一个新的dump节点位null
+ 遍历list1 list2
+ 修改p.next的指针
+ 最后如果只剩下一个,就直接拼接到p的下面

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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let p = new ListNode()
    let c = p
    while(list1 && list2) {
        if(list1.val < list2.val) {
            p.next = list1;
            list1 = list1.next;
        }else {
            p.next = list2;
            list2 = list2.next;
        }
        p = p.next;
    }

    if(list1) {
        p.next = list1
    }
    if(list2) {
        p.next = list2
    }

    return c.next;
};
```



#### [2. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

难度简单

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

 

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

+ 创建一个null节点(dump节点)
+ 多个指针,遍历链表
+ 修改每一个next的指针

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
    if(!head) return head
    let dump =  null
    let cur = head;

    while(cur) {
        let t = cur.next
        cur.next = dump;
        dump = cur
        cur = t
    }
    return dump
};
```

