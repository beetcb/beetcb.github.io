---
layout: post
title: DSA | Sorting Algorithm
author: beet
post: '@20@'
date: 2020-11-15 09:02:24
nailimg: https://m.beetcb.com/nailimg/dsa.png
tags: DSA
---

### Sorting Algorithm

[排序算法](https://en.wikipedia.org/wiki/Sorting_algorithm)。它通过特定的规则，把一个数列中的元素进行比较并改变其次序，从而达到排序的目的。再者，其他抽象数据结构算法的实现也需要用到排序作为基础，比如 [search](https://en.wikipedia.org/wiki/Search_algorithm) [merge](https://en.wikipedia.org/wiki/Merge_algorithm) 算法，要求输入内容必须是有序列表，因此，排序算法的效率也直接影响了这些算法的执行效率。本文将介绍几种常见的排序算法，对每一种算法介绍的大致思路是：

- 名称由来：方便迅速联系到算法本身原理
- 原理：既是复习，也是个人的一些理解
- Big O：时间复杂度，判断算法的执行效率，了解当输入大量数据时，其坏情形下执行次数的多少（本文也会介绍其期望执行次数以及空间复杂度）
- 编程语言实现：实操可以说是最重要的一部分，本文使用 C 和 javascript 实现

本文将介绍的算法有：Insertion Selection MergeSort Heapsort Quicksort Shellsort Bubble Bucket

几者之间关系为：
![](https://m.beetcb.com/postimg/20/BigO.png)

此外，网上有许多数据结构和算法可视化的项目，可以更好理解其原理，本文不再做搬运。

**规定**：在排序过程中，经常涉及到把数列分为两块：已排好序和需要排序的两块，本文为方便表示，将其分别命名为 `sortedPart(SDP)` 和 `sortingPart(SP)`。同时，简单起见，数列都用数组表示，元素全为数字，默认按从小到大排序。

### Selection sort

选择排序排序是最直观简单、也是最容易想到的排序方法。选择排序，顾名思义，选择是其核心思想，它就像是体育课学生依据高矮排队成一列，选择最矮，排到第一，再从剩下的人中选择最矮，排列到第二，依此类推。具体实现为：设 SDP 为空，遍历 SP 数组元素，每次总是 **选择** 最小的元素，依序移入 SDP ，再继续遍历 SP 元素，直到 SP 为空（当然，SP 只剩下一个元素就已经结束，这时它迅速移动到 SDP，所以也可以说 SP 为空）。当然，为了避免创建 SDP 为一个新的数组而增加时间复杂度，我们可以交换原数组上对应的位置而实现排序，即交换后便完成了上文所说的*移动*

BigO 的简单分析：需要多次选择，每次选择又需要多次比较，时间复杂度：O(n^2)，并且这种比较与原数组的有序性完全没关系，缺点显而易见，可以说其唯一的优点就只有空间复杂度：O(1)

C 实现：

```c
/**
 * selection sort
 * @param {array} array array needs to be sorted
 * @param {number} length array's length
 */
void selection(int array[], int length);
void selection(int array[], int length)
{
    for (int i = 0; i < length - 1; i++)
    {
        int minIdx = i;
        /* select the smallest one, who's idx is minIdx */
        for (int j = i + 1; j < length; j++)
        {
            if (array[j] < array[minIdx])
                minIdx = j;
        }
        /* swap */
        if (i != minIdx)
        {
            int temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;
        }
    }
}
```

JS 实现：

```js
/**
 * selection sort
 * @param {array} array array needs to be sorted
 */
function selection(array) {
  for (let i = 0; i < array.length - 1; i += 1) {
    let minIndex = i

    // Find minimum element in the rest of array.
    for (let j = i + 1; j < array.length; j += 1) {
      if (this.comparator.lessThan(array[j], array[minIndex])) {
        minIndex = j
      }
    }
    // swap
    if (minIndex !== i) {
      ;[array[i], array[minIndex]] = [array[minIndex], array[i]]
    }
  }
}
```

### Insertion sort

如果说选择排序的工作重心在 SP，那么插入排序反之，它主要操作 SDP。插入排序，同样拿上面排队问题来说，先随便找个人站好，剩下的同学依次（根据高矮）插入队伍中去。那么具体实现就是：先默认放置数组第一个元素到 SDP 中，然后遍历 SP，每个元素都在 SDP 中找到合适的位置，**插入**。 插入排序核心在插入的操作，简单描述就是：SDP 中比 target 小的元素保持不动，比 target 大的元素都统一向后移动一位，再把 target 插入空出来的位置

BigO 的简单分析：对于有序输入，很明显只需要一次遍历，什么都不要做，时间复杂度 O(n), 最坏情形需要遍历数组，每次遍历又要完全遍历 SDP，时间复杂度 O(n^2)

C 实现：

```c
/**
 * insertion sort
 * @param {array} array array needs to be sorted
 * @param {number} length array's length
 */
void insertion(int array[], int length);
void insertion(int array[], int length)
{
    for (int i = 1; i < length; i++)
    {
        int tar = array[i];
        /* loop through SCP, move the position */
        int j = i - 1;
        while ((j >= 0) && (array[j] > tar))
        {
            array[j + 1] = array[j];
            j--;
        }
        /* insert */
        array[j + 1] = tar;
    }
}

```

JS 实现：

```js
/**
 * selection sort
 * @param {array} array array needs to be sorted
 */
function selection(array) {
  for (let i = 1; i < array.length - 1; i += 1) {
    const target = array[i]
    let j = i - 1
    // loop through SCP, move position
    while (j >= 0 && array[j] > target) {
      array[j + 1] = array[j]
      j--
    }
    // insert
    array[j + 1] = target
  }
}
```

> 接下来我们来研究研究效率更高的算法

### Merge sort

归并排序，采用了 Divide and Conquer (分而治之) 的思想，递归地把当前数组元素分成两半，之后合并（前提是保存顺序）。这样是为了减少迭代的次数，提升效率。具体的实现思路是：递归地将数组元素分成两份（偶数均分，奇数数目相差 1），直到每个元素单一存在为止。之后进行相反的操作——进行合并，只是这种合并是**归并**操作，归并操作需要把两个已经排序的序列合并成新的排序序列，最后归并成一个序列时就达到了排序的效果

> Divide and Conquer (分而治之): 通常我们找到一个普适化的解决方案，据此把问题（递归地）分成若干个子问题，（递归地）解决这些问题，最后合并结果得到最终结果。

不难看处，归并排序的核心在于归并算法的实现，举个例子：我们需要归并 A1[2,3]和 A2[1,4] 成 A3[1,2,3,4]，思路应该是：比较 A1[0] 和 A2[0]，其中两个 0 都是两个数组比较索引的初始值，把小的值作为推入 A3，并把比较其所属数组的比较索引 +1，按照新的比较索引继续重复以上比较操作，当 A3 长度只差一个元素时，比较终止。在此例中，比较 2 1 => A3[0] = 1, 2 4 => A3[1] = 2, 3 4 => A3[2],再 A3[3] = 4，完成归并

BigO 的简单分析：和选择排序一样，归并排序和原始数据的有序性关系不大，又因为采用了分治法，所以最好最差情形都是 O(nlog(n))。值得注意的是，其空前复杂度为 O(n)，这是一个牺牲

C 实现：由于 C 语言精简的特点，许多功能需要自己实现，相对也更复杂一点。C 的实现没有利用新的数组，而是借用原来的数组，这就需要理解函数调用机制。根据函数调用栈 FILO 的原则，在实际的 `merge()` 方法中，我们直接改变了 arr 相应索引的值。注意我们把这些需要归并的元素预先使用 `L[]` 和 `R[]` 存起来了，直接改变区域数组某个值，既不会丢失当前区域值，更不会丢失后面区域内数组值（因为 `merge()` 执行顺序的原因）。

同时，c 实现排序一般使用 `In-place` 策略，也就是说不会构建新的数组用于排序，而是直接操作元素组，减小空间复杂度。如果使用这种方法，那么就需要记录起始和结束索引，也就是函数至少要三个形参：数组指针变量、起始索引、结束索引，后面几个算法的 c 实现也利用了这个特性

```c
/**
 * merge action
 * @param {array} arr array needs to be sorted
 * @param *2 {number} l/m left subarray's start/end idx
 * @param {number} m+1/r right subarray's start/end idx
 */
void merge(int arr[], int l, int m, int r);
/**
 * merge sort
 * @param {array} arr array needs to be sorted
 * @param {number} l left subarray's start/en idx
 * @param {number} r right subarray's end idx
 */
void mergeSort(int arr[], int l, int r);

void merge(int arr[], int l, int m, int r)
{
    int i, j, k;
    int n1 = m - l + 1; // compute L array length
    int n2 = r - m;     // compute R array length

    /* create temp arrays */
    int L[n1], R[n2];

    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    /* Merge the temp arrays back into arr[l..r]*/
    i = 0, j = 0, k = l; // Initial index of L & R & merged subarray
    while (i < n1 && j < n2)
        (L[i] < R[j]) ? (arr[k++] = L[i++]) : (arr[k++] = R[j++]);

    while (i < n1)
        arr[k++] = L[i++];

    while (j < n2)
        arr[k++] = R[j++];
}

/* l is for left index and r is right index of the sub-array of arr to be sorted */
void mergeSort(int arr[], int l, int r)
{
    if (l < r)
    {
        // Same as (l+r)/2, but avoids overflow for large l and h
        int m = l + (r - l) / 2;

        // Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}

```

JS 实现：利用 js 的 Array 原型上提供的方法，很容易实现 Merge 功能。

```js
/**
 * merge sort
 * @param {array} array array needs to be sorted
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  /* merge two SDP to one SDP */
  function merge(left, right) {
    const result = []
    while (left.length > 0 && right.length > 0) {
      if (left[0] < right[0]) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }
    return result.concat(left, right)
  }

  return merge(mergeSort(left), mergeSort(right))
}
```

### Quicksort

与其记忆次名称，不如记忆其别名：partition-exchange sort（分区交换排序），和归并排序一样，它采用分治策略。快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为较小和较大（使用 pivot 做中间基准值）的 2 个子序列，每次要保证与 pivot 的相对位置正确。

步骤为：

1. 选取 pivot 作为基准值，其选取方式多种多样，常常选择最后一个元素或中间元素。
2. 根据 pivot 执行 partition() 操作，该操作的功能是通过与 pivot 元素的交换，使得数组左边（设为 `L[]`）的所有元素值小于 pivot ，数组右边（设为`R[]`）所有元素值大于 pivot
3. 递归地对 L \ R 进行上述操作，直到无法分出左右数为止

下面是简单的伪代码：

```js
quickSort(array, leftmostIndex, rightmostIndex)
  if (leftmostIndex < rightmostIndex)
    pivotIndex <- partition(array,leftmostIndex, rightmostIndex)
    quickSort(array, leftmostIndex, pivotIndex)
    quickSort(array, pivotIndex + 1, rightmostIndex)

partition(array, leftmostIndex, rightmostIndex)
  set rightmostIndex as pivotIndex
  storeIndex <- leftmostIndex - 1
  for i <- leftmostIndex + 1 to rightmostIndex
  if element[i] < pivotElement
    swap element[i] and element[storeIndex]
    storeIndex++
  swap pivotElement and element[storeIndex+1]
return storeIndex + 1
```

选取基准值有数种具体方法，此选取方法对排序的时间性能有决定性影响。本文选取最后元素以避免遍历的麻烦

C 实现：

```c
/**
 * quick Sort
 * @param {array} arr array needs to be sorted
 * @param {number} l array's start idx
 * @param {number} r array's end idx
 */
void quickSort(int arr[], int l, int r);

/**
 * partition method
 * @param {array} arr array needs to be sorted
 * @param {number} l left subarray's start/en idx
 * @param {number} r right subarray's end idx
 * @return {number} neoIdx new pivot idx
 */
int partition(int arr[], int l, int r);

/* swap two array's items */
int swap(int arr[], int f, int s)
{
    int tmp = arr[f];
    arr[f] = arr[s];
    arr[s] = tmp;
    return f;
}

void quickSort(int arr[], int l, int r)
{
    if (l <= r)
    {
        int p = partition(arr, l, r);
        quickSort(arr, l, p - 1);
        quickSort(arr, p + 1, r);
    }
}

/* l/r start/end idx */
int partition(int arr[], int l, int r)
{
    int neoIdx = r;
    for (int i = l; i < r; i++)
        if (arr[i] > arr[r])
            neoIdx = swap(arr, i, r);
    return neoIdx;
}
```

JS 实现：同样，由于 JS 不检查参数数量并且可以初始化参数，为方便递归，设定了看起来多余的 `l, r` 参数

```js
/**
 * quick sort
 *
 * @param {array} arr array needs to be sorted
 * @param {number} l array's start idx
 * @param {number} r array's end idx
 */
function quickSort(arr, l = 0, r = arr.length) {
  if (l < r) {
    const pivot = partition(l, r)
    quickSort(arr, l, pivot - 1)
    quickSort(arr, pivot + 1, r)

    // partition func
    function partition(left, right) {
      let p = right
      for (let i = left; i < right; i++)
        if (arr[i] > arr[right])
          ([arr[i], arr[right]] = [arr[right], arr[i]]) && (p = i)
      return p
    }
  } else {
    return arr
  }
}
```

### Heapsort

堆排序是利用了堆这种数据结构的特点，我们读入输入的每个数，构建一个最大堆数据结构。不断地剔除堆首（最大值），用堆尾代之（同时调整堆的顺序），直到堆结构只剩一层为止。为了节省空间，可以把堆首和堆尾交换，这样每次最大的元素都到了数组的右半部分，成为 SDP 的元素，而 SP 的元素继续存在堆中，完成排序，最终可以直接完成排序。可以说堆排序的重点完全在于堆结构和堆方法的实现。

堆结构的实现：通过简单的一维数组可以实现，这恰好符合排序的数据类型。`root => Array[i]`, `left child: Array[2i + 1]`, `right child: Array[2i + 2]` , `father => Array[(int)(i - 1 / 2)]`, 其中 i 是目标节点在堆（也就是完全二叉树）的深度大小。

最大堆调整（Max Heapify）方法的实现: 对于 root node ，找出它和它子节点中最大的元素，如过替换 node 的位置。显然，这种策略对简单的堆还适用，但是深度一旦超过一，就需要完善了。即需要递归地对下面深度的节点进行调整，所以我们应提前记录最大元素的索引 `maxIdx`，将其作为新的 root node 递归地调用 heapify，直到它为树叶为止。注意：这种策略实现的前提是下面的子堆必须是 max-heap 结构，这也决定了构建堆的顺序问题

伪代码：

```js
func max(arr, rN, lC, rC) {
  maxIdx = max item's idx in arr[rN lC rC]
  return maxIdx
}
func heapify(arr, len, rootNode) {
  if (lChild = 2*rootNode + 1) > len
    lChild = rootNode
  if (rChild = 2*rootNode + 2) > len
    rChild = rootNode

  maxIdx = max(arr, rootNode, lChild, rChild)
  if (rootNode !== maxIdx) {
    swap(arr, rootNode, maxIdx)
    heapify(arr, len, maxIdx)
  }
}
```

构造堆（build heap）的实现，要达到构造堆的效果，就是循环调用 heapity()，而为了保证 heapity 执行的条件，我们需要从最深的有子节点的 node 节点开始，一直执行 heapity 到 rootNode 停止

```js
for (i in len / 2 - 1...0)
  heapify(arr, len, i)
```

结合堆结构后排序的实现：现在就简单了，我们堆初始数组先进行堆的构建，然后初始 SDP 为空，逆序遍历 SP，把首元素与最后元素交换（并把交换后的元素移入 SDP），同时对首元素进行最大堆调成，使其恢复堆结构，然后继续遍历新的 SDP，直到 SDP 为空：

Big O: 堆排序的平均时间复杂度为 O(nlog(n))，空间复杂度为 O(1)

C 实现：

```c
/**
 * heapify a given array
 * @param {array} arr array needs to be sorted
 * @param {number} len array's length
 * @param {number} current root node
 */
void heapify(int arr[], int len, int i);
/**
 * heap Sort
 * @param {array} arr array needs to be sorted
 * @param {number} len array's length
 */
void heapSort(int arr[], int len);
/* return max array item */
int max(int arr[], int rN, int lC, int rC)
{
    int maxIdx = rN;
    if (arr[maxIdx] < arr[lC])
        maxIdx = lC;
    if (arr[maxIdx] < arr[rC])
        maxIdx = rC;
    return maxIdx;
}
void heapify(int arr[], int len, int rootNode)
{
    int lChild, rChild;
    if ((lChild = 2 * rootNode + 1) >= len)
        lChild = rootNode;
    if ((rChild = 2 * rootNode + 2) >= len)
        rChild = rootNode;

    int maxIdx = max(arr, rootNode, lChild, rChild);
    if (rootNode != maxIdx)
    {
        swap(arr, rootNode, maxIdx);
        heapify(arr, len, maxIdx);
    }
}

void heapSort(int arr[], int len)
{
    // build max heap array
    for (int i = len / 2 - 1; i >= 0; i--)
        heapify(arr, len, i);

    for (int i = len - 1; i >= 0; i--)
    {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}
```

JS 实现：

```js
/**
 * quick sort
 * @param {array} arr array needs to be sorted
 */
function heapSort(arr) {
  const len = arr.length

  function heapify(len, rootNode) {
    let lChild, rChild
    if ((lChild = 2 * rootNode + 1) >= len) lChild = rootNode
    if ((rChild = 2 * rootNode + 2) >= len) rChild = rootNode

    /* return max array item */
    function max(rN, lC, rC) {
      let maxIdx = rN
      if (arr[maxIdx] < arr[lC]) maxIdx = lC
      if (arr[maxIdx] < arr[rC]) maxIdx = rC
      return maxIdx
    }

    const maxIdx = max(rootNode, lChild, rChild)
    if (rootNode != maxIdx) {
      ;[arr[rootNode], arr[maxIdx]] = [arr[maxIdx], arr[rootNode]]
      heapify(len, maxIdx)
    }
  }

  // build max heap array
  for (let i = len / 2 - 1; i >= 0; i--) heapify(len, i)

  for (let i = len - 1; i >= 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    heapify(i, 0)
  }
}
```

### Shellsort

希尔排序设定一定的间隔（`interval`），初始化起始索引（`idx`）为 0，先对相对起始索引左右间隔位上的元素排序，随后递增起始索引再排序，然后不断缩小间隔再重复上述过程（间隔 <1 时停止）。可以看出其中间隔如何缩小，是个问题，这也导致了很多间隔序列的诞生，我们先用原作者提供的序列进行研究：`1, len /2, len / 4, len / 8...`, 它保证了起始的间隔（注意：在实现希尔排序时间隔是由大到小的）。具体实现方法：计算 `interval`，循环地排序（使用交换元素的方法，因为需要采用原地策略）并递增 `idx`，递归上述操作，直到 `interval < 1`

Big O 的简单分析：

C 实现：

```c
/**
 * shell Sort
 * @param {array} arr array needs to be sorted
 * @param {number} len array's length
 * @param {number} interval for recursion
 */
void shellSort(int arr[], int len, int interval);
/* swap two array's items */
void swap(int arr[], int f, int s)
{
    int tmp = arr[f];
    arr[f] = arr[s];
    arr[s] = tmp;
}

void shellSort(int arr[], int len, int interval)
{
    if (interval > 1)
    {
        interval /= 2;
        for (int idx = 0; (idx + interval) < len; idx++)
        {
            if (arr[idx] > arr[idx + interval])
                swap(arr, idx, idx + interval);
            // handle left
            if (idx - interval >= 0)
                for (int lIdx = idx; lIdx - interval >= 0; lIdx -= interval)
                    if (arr[lIdx] < arr[lIdx - interval])
                        swap(arr, lIdx, lIdx - interval);
        }
        shellSort(arr, len, interval);
    }
}
```

JS 实现：同样，由于 JS 不检查参数数量并且可以初始化参数，为方便递归，设定了多余的 `interval` 参数

```js
/**
 * shell sort
 *
 * @param {array} arr array needs to be sorted
 */
function shellSort(arr, interval = arr.length) {
  if (interval > 1) {
    interval /= 2
    for (let idx = 0; idx + interval < arr.length; idx++) {
      if (arr[idx] > arr[idx + interval])
        [arr[idx], arr[idx + interval]] = [arr[idx + interval], arr[idx]]
      // handle left
      if (idx - interval >= 0)
        for (let lIdx = idx; lIdx - interval >= 0; lIdx -= interval)
          if (arr[lIdx] < arr[lIdx - interval])
            [arr[lIdx], arr[lIdx - interval]] = [
              arr[lIdx - interval],
              arr[lIdx],
            ]
    }
    shellSort(arr, interval)
  }
}
```

### Bubble sort

冒泡排序在未排序的序列中寻找最小的元素，推入已排序的序列中。这听起来是插入排序的复刻，但它查找最小元素的策略更好：逆序每相邻两个元素间比较，谁更小，就是我们想要的元素，我们就说谁冒泡了（计算机科学中冒泡一般是指某些个事件连续发生），这时我们需要保证冒泡的元素总前。通过连续的这种冒泡，不仅使得最左边元素始终最小，同时还让数组更加有序。具体实现：初始 SDP 空，逆序遍历 SP，冒泡后最左边元素移至 SDP 中，再在新的 SP 中执行上述操作。终止情形是 SP 只有一个元素，直接移入 SDP 即可

优化：在外循环中，如果上次内循环没有任何交换操作，则数组已经有序，不需要再操作。我们通过变量 `swapped` 标记数组是否经过交换，达到优化效果

Big O 的简单分析：双循环，每次循环次数都是 n 的一元表达式，因此内外相乘得到最坏情形：，最好情形是输入一个有序数组，优化后只会花费：O(n)，如果没有优化，还是 O(n^2)。空间复杂度总是：O(1)

C 实现:

```c
/**
 * bubble Sort
 *
 * @param {array} arr array needs to be sorted
 * @param {number} len array's length
 */
void bubbleSort(int arr[], int len);
/* swap two array's items */
void swap(int arr[], int f, int s)
{
    int tmp = arr[f];
    arr[f] = arr[s];
    arr[s] = tmp;
}

void bubbleSort(int arr[], int len)
{
    int swapped = 0;
    for (int i = 0; i < len; i++){
        for (int j = len - 1; j > i; j--)
            if (arr[j] < arr[j - 1])
                swap(arr, j, j - 1) && (swapped = 1);
    }
    if (!swapped) break;
}
```

JS 实现：

```js
/**
 * bubble sort
 * @param {array} arr array needs to be sorted
 */
function bubbleSort(arr) {
  let swapped = false
  for (let i = 0; i < arr.length; i++)
    for (let j = arr.length - 1; j > i; j--)
      if (arr[j] < arr[j - 1])
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]] && (swapped = true)
  if (!swapped) break
}
```

### reference

- [bubble sort](https://www.programiz.com/dsa/bubble-sort)
- [selection sort](https://www.programiz.com/dsa/selection-sort)
- [insertion sort](https://www.programiz.com/dsa/insertion-sort)
- [merge sort](https://www.programiz.com/dsa/merge-sort)
- [quick sort](https://www.programiz.com/dsa/quick-sort)
- [heap sort](https://www.programiz.com/dsa/heap-sort)
- [shell sort](https://www.programiz.com/dsa/shell-sort)
