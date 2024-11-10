# 随机快速排序笔记

## 参考资料
[左程云大佬的视频](https://www.youtube.com/watch?v=hcmSMRD_Eb0)

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

## 代码示例（Python）

```python
def three_way_partition(arr, low, high):
    # 随机选择基准元素
    pivot = arr[random.randint(low, high)]
    
    a = low - 1      # 小于区域右边界
    b = high + 1     # 大于区域左边界
    i = low          # 遍历指针
    
    while i < b:
        if arr[i] < pivot:
            a += 1
            arr[a], arr[i] = arr[i], arr[a]
            i += 1
        elif arr[i] > pivot:
            b -= 1
            arr[b], arr[i] = arr[i], arr[b]
        else:
            i += 1
    
    return a + 1, b - 1  # 返回等于区域的左右边界
```

## 优点
- 避免最坏情况下的时间复杂度
- 原地排序
- 平均时间复杂度 O(n log n)

## 注意事项
- 处理重复元素
- 控制递归深度
- 小数组可以使用插入排序