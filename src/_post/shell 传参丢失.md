---
layout: post
title: shell 传参变量异常问题
author: beet
post: '@21@'
date: 2020-12-05 08:23:23
nailimg: https://static.beetcb.com/nailimg/bash.png
tags: linux
---

### shell 脚本的通信

为减少程序的耦合，即便是 shell 脚本，我也尽量分成多个文件；再说我对 shell 脚本比较陌生，分文件处理多个功能也更好 debug。当然，这就需要两个脚本之间的通信：两种方式，`Environmental Variables` 和
`Shell Arguments`，一般我不会去碰 `Environmental Variables`，因为许多程序的配置依赖于它们，也在 shell session 启动时就设定了的，一般功能的脚本不建议去添加环境变量。那么就 `Shell Arguments` 咯，通过创建 `shell variable`，在运行另外一个脚本时通过参数传递变量。

### 参数丢失和分割问题

我有两个 shell 脚本文件，他们在传递参数时，出现了奇怪的问题，比如下面这个列子：

`prase.sh:`

```bash
#!/bin/sh

echo -e 'how many arguments\t' $#
while read -r line; do
    GEN=$(echo $line | grep -oP '^\*\K(.+)')
    ./out.sh $GEN 2
done <config
```

`print.sh:`

```bash
#!/bin/sh

echo -e 'how many arguments\t' $#
C=1
for arg in "$@"; do
    echo -e "arguments$C\t"$arg
    ((C++))
done
```

其中 config 的内容是 `*hello`，运行 prase.sh 正确输出：

```bash
how many arguments       3
arguments1      hello
arguments2      2
```

但如果 config 为空，会**丢失参数**：

```bash
how many arguments       1
arguments1      2
```

这时 grep 匹配不到，导致 GEN 为空，只剩下第二个参数，并成为第一个参数。为什么会这样？我们再改一下 config 试试：

`config`：

```bash
*hello world
```

会**分割参数**：

```bash
how many arguments       3
arguments1      hello
arguments2      world
arguments3      2
```

这时很容易想到，shell 是靠空格(或 tab )来分离参数的，但是我们知道，如果把空格包含在字符串中，是可以作为一个参数的。也就是说，修改 `prase.sh` 为 `./out.sh $GEN '2 3' &`，结果还是：

```bash
how many arguments       3
arguments1      hello
arguments2      world
arguments3      2 3
```

### 分析和解决

实践证明，由 `""` 和 `''` 包裹的空格都会同样作为参数，而不是参数分割标识，自然问题归结到 `GEN` 的值，也就是这条赋值语句：

```bash
GEN=$(echo $line | grep -oP '^\*\K(.+)')
```

我们知道，bash 数据类型只有一种：字符串，那么 GEN 只能是一个字符串。假设 GEN 的值为 "hello world"，它与单独传参 "hello world"只有一个区别：GEN 是变量。经过验证，传参时使用变量代表字符串会被空格截开成多个参数，而直接传参字符串不会

也就是说，上面的列子，我们只要给 `$GEN` 加上双引号，就能解决这个问题（同时解决丢失和分割）：

`prase.sh`：

```bash
#!/bin/sh

echo -e 'how many arguments\t' $#
while read -r line; do
    GEN=$(echo $line | grep -oP '^\*\K(.+)')
    ./out.sh "$GEN" 2
done <config
```

则能得到正确的参数：

```bash
how many arguments       2
arguments1      hello world
arguments2      2
```

这是个小坑，虽然变量都是字符串，但在传参时会对变量求值，然后空格会被识别为参数分隔符（导致分割），空字符串会被忽略（导致变量丢失）。

虽然丢失问题可以在接收端进行处理，但非常被动。所以为了减少这些困扰，传参使用变量时应该用双引号包裹变量：

```bash
./better_arguments_passing_save_my_day.sh "$VAR"
```

### reference

- [How To Read and Set Environmental and Shell Variables on Linux](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-linux)
