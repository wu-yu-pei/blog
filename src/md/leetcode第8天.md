#### [1. 合并二叉树](https://leetcode-cn.com/problems/merge-two-binary-trees/)

难度简单

给你两棵二叉树： `root1` 和 `root2` 。

想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，**不为** null 的节点将直接作为新二叉树的节点。

返回合并后的二叉树。

**注意:** 合并过程必须从两个树的根节点开始。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/05/merge.jpg)

```
输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
输出：[3,4,5,5,4,null,7]
```

**示例 2：**

```
输入：root1 = [1], root2 = [1,2]
输出：[2,2]
```

 

**思路:**

+ 递归遍历
+ 同时遍历两颗树

**代码:**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
	// 递归边界
    if(root1 === null) return root2
    if(root2 === null) return root1
    
    //递归式
    root1.val += root2.val
    root1.left = mergeTrees(root1.left, root2.left)
    root1.right = mergeTrees(root1.right, root2.right)
    
    return root1
};
```

#### [2. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

难度中等700收藏分享切换为英文接收动态反馈

给定一个 **完美二叉树** ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 `NULL`。

初始状态下，所有 next 指针都被设置为 `NULL`。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2019/02/14/116_sample.png)

```
输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
```



**示例 2:**

```
输入：root = []
输出：[]
```

 **思路:**

+ 层序遍历
+ 取出每一层的某一个,让其指向队头就可以了

**代码:**

```
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    // ac 12%
    // 初步判断应该是要进行层序遍历
    // 一个栈,帮助完成层序遍历
    // if(!root) return root
    // root.next = null
    // let queue = [root]
    // while(queue.length) {
    //     let cur = queue.shift()
    //     if(cur.left) {
    //         queue.push(cur.left)
    //     }
    //     if(cur.right) {
    //         cur.left.next = cur.right
    //         queue.push(cur.right)
    //     }
    //     if(cur.right && cur.right.left) {
    //         cur.left.right.next = cur.right.left
    //     }
    // }
    // return root
    
    if(!root) return root
    let queue = [root]
    while(queue.length) {
        let len = queue.length
        for(let i = 0; i < len; i++) {
            const node = queue.shift()
            if(i < len - 1) {
                node.next = queue[0]
            } 

            node.left&&queue.push(node.left)
            node.right&&queue.push(node.right)
        }
    }
    return root
};
```

今天着两题都只ac了一部分,不过看了题解,都看懂了!

下次一定解出来...