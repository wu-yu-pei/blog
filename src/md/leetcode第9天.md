#### [1. 腐烂的橘子](https://leetcode-cn.com/problems/rotting-oranges/)

难度中等

今天的题我只能说难难难, 下次一定

在给定的 `m x n` 网格 `grid` 中，每个单元格可以有以下三个值之一：

- 值 `0` 代表空单元格；
- 值 `1` 代表新鲜橘子；
- 值 `2` 代表腐烂的橘子。

每分钟，腐烂的橘子 **周围 4 个方向上相邻** 的新鲜橘子都会腐烂。

返回 *直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 `-1`* 。

 

**示例 1：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png)**

```
输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
输出：4
```

**示例 2：**

```
输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
```

**示例 3：**

```
输入：grid = [[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
```

 **代码:**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    // 不会编辑数量的变化,没算处理
    // let x = grid[0].length;
    // let y = grid.length;
    // let count = 0
    // for(let i = 0; i < x; i++) {
    //     for(let j = 0; j < y; j++) {
    //         if(grid[i][j] === 1) {
    //           count = dfs(i, j, 0)
    //         }
    //     }
    // }

    // function dfs(left, right, count) {
    //     if(left < 0 || left >=x || right < 0 || right >= y || grid[left][right] === 2 || grid[left][right] === 0) return /////count;
        
    //     grid[left][right] = 2
    //     count++
    //     let a = dfs(left - 1, right, count)
    //     let b = dfs(left + 1, right, count)
    //     let c =dfs(left, right + 1, count)
    //     let d = dfs(left, right - 1, count)
    //     return Math.max(...[count, a, b, c ,d])
    // }
    // return count === 1 ? '-1' : count

    // leetcodet题解没看太懂 用的广度遍历  
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    const m = grid.length, n = grid[0].length
    let cnts = 0, cost = 0, queue = new Array()
    for(let i = 0; i < m; i++)
        for(let j = 0; j < n; j++)
            if(grid[i][j] > 0){
                cnts++
                if(grid[i][j] == 2)
                    queue.push([i, j])
            }
    while(queue.length > 0){
        const nxt = new Array()
        cnts -= queue.length
        for(const p of queue){
            for(const d of dirs){
                const nx = p[0] + d[0], ny = p[1] + d[1]
                if(nx >= 0 && ny >= 0 && nx < m && ny < n && grid[nx][ny] == 1){
                    grid[nx][ny] = 2
                    nxt.push([nx, ny])
                }
            }
        }
        queue = nxt
        if(queue.length > 0)
            cost++
    }
    return cnts == 0 ? cost : -1
};
```

#### [2矩阵](https://leetcode-cn.com/problems/01-matrix/)

难度中等

这个更难....

给定一个由 `0` 和 `1` 组成的矩阵 `mat` ，请输出一个大小相同的矩阵，其中每一个格子是 `mat` 中对应位置元素到最近的 `0` 的距离。

两个相邻元素间的距离为 `1` 。

 

**示例 1：**

![img](https://pic.leetcode-cn.com/1626667201-NCWmuP-image.png)

```
输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
输出：[[0,0,0],[0,1,0],[0,0,0]]
```

**示例 2：**

![img](https://pic.leetcode-cn.com/1626667205-xFxIeK-image.png)

```
输入：mat = [[0,0,0],[0,1,0],[1,1,1]]
输出：[[0,0,0],[0,1,0],[1,2,1]]
```

 **代码:**

```js
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
    // 我只能说 我不会  呜呜呜
    // leetcode题解:
  let m = mat.length,
    n = mat[0].length;
  // 目标结果
  let dist = new Array(m)
    .fill(0)
    .map(() => new Array(n).fill(Number.MAX_SAFE_INTEGER));
  // 如果 (i, j) 的元素为 0，那么距离为 0
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) if (mat[i][j] == 0) dist[i][j] = 0;

  // 只有 水平向右移动 和 竖直向下移动，递归的顺序是从左到右，从上到下
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 水平向左 是由同行左侧的元素递推算出来的
      if (i - 1 >= 0) dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
      // 垂直向下，是由同列上行的元素递推算出来的
      if (j - 1 >= 0) dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
    }
  }
  // 只有 水平向左移动 和 竖直向上移动，递归的顺序是从右到左，从下到上
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // 水平向右 是由同行右侧的元素递推算出来的
      if (i + 1 < m) dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
      // 垂直向下，是由同列下行的元素递推算出来的
      if (j + 1 < n) dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
    }
  }
  return dist;
};
```

是真的看不懂~~