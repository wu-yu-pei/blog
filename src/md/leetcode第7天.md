#### [1. 图像渲染](https://leetcode-cn.com/problems/flood-fill/)

难度简单

有一幅以 `m x n` 的二维整数数组表示的图画 `image` ，其中 `image[i][j]` 表示该图画的像素值大小。

你也被给予三个整数 `sr` , `sc` 和 `newColor` 。你应该从像素 `image[sr][sc]` 开始对图像进行 上色**填充** 。

为了完成 **上色工作** ，从初始像素开始，记录初始坐标的 **上下左右四个方向上** 像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应 **四个方向上** 像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为 `newColor` 。

最后返回 *经过上色渲染后的图像* 。

 

**示例 1:**

![img](https://assets.leetcode.com/uploads/2021/06/01/flood1-grid.jpg)

```
输入: image = [[1,1,1],[1,1,0],[1,0,1]]，sr = 1, sc = 1, newColor = 2
输出: [[2,2,2],[2,2,0],[2,0,1]]
解析: 在图像的正中间，(坐标(sr,sc)=(1,1)),在路径上所有符合条件的像素点的颜色都被更改成2。
注意，右下角的像素没有更改为2，因为它不是在上下左右四个方向上与初始点相连的像素点。
```

**示例 2:**

```
输入: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
输出: [[2,2,2],[2,2,2]]
```

 **思路:**

+ 递归遍历
+ 递归三大要点
  + 确定递归边界
  + 递归式
  + 递归函数

**代码:**

```js
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    let x = image.length;
    let y = image[0].length;
    let target = image[sr][sc]
    if(target==newColor) return image;
    // DFS
    function dfs(image, sr, sc, newColor, target) {
        if(sr < 0 || sr >= x ||  sc < 0 || sc >= y || image[sr][sc] !== target) return
        image[sr][sc] = newColor
        dfs(image, sr - 1, sc, newColor, target)
        dfs(image, sr, sc - 1, newColor, target)
        dfs(image, sr, sc + 1, newColor, target)
        dfs(image, sr + 1, sc, newColor, target)
    }
    dfs(image, sr, sc, newColor, target)
    return image
};
```

#### [2. 岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

难度中等719收藏分享切换为英文接收动态反馈

给你一个大小为 `m x n` 的二进制矩阵 `grid` 。

**岛屿** 是由一些相邻的 `1` (代表土地) 构成的组合，这里的「相邻」要求两个 `1` 必须在 **水平或者竖直的四个方向上** 相邻。你可以假设 `grid` 的四个边缘都被 `0`（代表水）包围着。

岛屿的面积是岛上值为 `1` 的单元格的数目。

计算并返回 `grid` 中最大的岛屿面积。如果没有岛屿，则返回面积为 `0` 。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/05/01/maxarea1-grid.jpg)

```
输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
```

**示例 2：**

```
输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0
```

**思路:**

+ 递归
  + 每次把已经记录的置为0防止下一次重复遍历
+ 求最大值
+ 记录结果

**代码:**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    // // 哦只ac了20% 主要最大值不太会算 下次一定.....
    // // 储存结果
    // let res = []
    // let xlen = grid.length
    // let ylen = grid[0].length
    // // 遍历岛屿
    // for(let i = 0; i < xlen; i++) {
    //     for(let j = 0; j < ylen; j++) {
    //         if(grid[i][j] === 1) {
    //             dfs(i , j, 1)
    //         }
    //     }
    // } 

    // function dfs(x, y, count) {
    //     if(x<0 || x >=xlen || y < 0 || y >= ylen || grid[x][y] !== 1) return
    //     grid[x][y] = 0
    //     res.push(count)
    //     count++
    //     console.log(res)
    //     dfs(x - 1, y, count)
    //     dfs(x + 1, y, count)
    //     dfs(x, y + 1, count)
    //     dfs(x, y - 1, count)
    // }
    
    // return res.length === 0 ? 0 : Math.max(...res)
    
    // 哦只ac了20% 主要最大值不太会算 这次一定.....
    // 储存结果
    let res = []
    let xlen = grid.length
    let ylen = grid[0].length
    // 遍历岛屿
    for(let i = 0; i < xlen; i++) {
        for(let j = 0; j < ylen; j++) {
            if(grid[i][j] === 1) {
               let a = dfs(i , j)
               res.push(a)
            }
        }
    } 

    function dfs(x, y) {
        if(x<0 || x >=xlen || y < 0 || y >= ylen || grid[x][y] !== 1) return 0
        grid[x][y] = 0
        let count = 1
        count+= dfs(x - 1, y)
        count+= dfs(x + 1, y)
        count+= dfs(x, y + 1)
        count+= dfs(x, y - 1)
        return count
    }
    return res.length === 0 ? 0 : Math.max(...res)
};
```

今天的算法感觉有一点点可以了,加油

