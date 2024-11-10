# 随机快速排序笔记

## 参考资料
[左程云大佬的视频](https://www.youtube.com/watch?v=hcmSMRD_Eb0)

[题目](https://www.luogu.com.cn/problem/P1177)

## 概述
随机快速排序是快速排序的一个变体，其核心是在选择基准元素(pivot)时引入随机行为，从而避免最坏情况下的时间复杂度。

## 算法过程

1. 随机选择一个基准元素
2. 分区（Partition）过程
3. 递归处理左右两边区域

## Partition详细逻辑

### 变量定义
- `x`：当前基准数
- `a`：小于区域的右边界（不包含）
- `b`：大于区域的左边界（不包含）
- `i`：遍历的下标

### 遍历处理情况

1. 当 `arr[i] < x` 时：
   - `a++`
   - `i++`
   - 交换 `a` 和 `i` 位置的数
   - 小于区域扩充

2. 当 `arr[i] = x` 时：
   - `i++`
   - 继续遍历
   - 小于区域不扩充

3. 当 `arr[i] > x` 时：
   - `b--`
   - 交换 `b` 和 `i` 位置的数
   - 大于区域扩充

### 遍历结束条件
- `i > b`

### 遍历结束后
- `a` 和 `b` 分别是等于区域的左右边界（包含）

## 代码示例（Java）

```java
import java.io.*;

public class QuickSort {

    private static int MAXN = 100001;

    private static int[] arr = new int[MAXN];

    private static int first;

    private static int last;

    private static int n;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StreamTokenizer in = new StreamTokenizer(br);
        PrintWriter out = new PrintWriter(new OutputStreamWriter(System.out));
        in.nextToken();
        n = (int) in.nval;
        for (int i = 0; i < n; i++) {
            in.nextToken();
            arr[i] = (int) in.nval;
        }
        quickSort(0, n - 1);
        for (int i = 0; i < n - 1; i++) {
            out.print(arr[i] + " ");
        }
        out.println(arr[n - 1]);
        out.flush();
        out.close();
        br.close();
    }

    public static void quickSort(int l, int r) {
        if (l >= r) {
            return;
        }
        int x = arr[l + (int) (Math.random() * (r - l + 1))];
        //  先走一遍
        partition(l, r, x);
        // 缓存当前partition得到的区间避免过程中，重置
        int left = first;
        int right = last;
        // 左边
        quickSort(l, left - 1);
        quickSort(right + 1, r);
    }

    // 荷兰国旗
    public static void partition(int l, int r, int x) {
        first = l;
        last = r;
        int i = l;
        while (i <= last) {
            if (arr[i] == x) {
                i++;
            } else if (arr[i] < x) {
                swap(first++, i++);
            } else {
                swap(i, last--);
            }
        }
    }

    public static void swap(int a, int b) {
        int x = arr[a];
        arr[a] = arr[b];
        arr[b] = x;
    }
}
```

## 优点
- 避免最坏情况下的时间复杂度
- 原地排序
- 平均时间复杂度 O(n log n)

## 注意事项
- 处理重复元素
- 控制递归深度
- 小数组可以使用插入排序