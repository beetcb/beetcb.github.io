---
layout: post
title: 读Openssh Manual
author: beet
post: '@17@'
date: 2020-08-04
nailimg: https://static.beetcb.com/nailimg/openssh-fish.png
tags: ssh
---

> 第一次去深入了解 openssh ，此篇是我的学习笔记。本文使用的 ip 地址均替换成了某厂 CDN 地址，所以热心的朋友不必去尝试 \*\* 啦 (✿◡‿◡) 。

### Openssh 概览

**[`ssh`](https://en.wikipedia.org/wiki/Secure_Shell)（secure shell） 是一种加密的网络传输协议。**

为实现服务器的远距离访问和信息传输，最初的 `telnet` 协议诞生。但是传输的明文信息暴露在网络，(若密码不可靠)很容易被监听，使得 `telnet` 协议并不安全。

自然，`ssh` 以其安全性替代了 `telnet` ，对远程连接进行身份验证、内容加密。

`Openssh` 是对 ssh 协议开源的实现，还集成了许多工具。其基本功能是登陆远端服务器，执行一系列的操作，很是方便。

`Openssh` 在各大操作系统广泛支持（内置），包括 win10（1809 后）、macOS、Linux 等。所以，前文所说的**服务器**，也可以普适到**绝大多数电脑**

---

### Openssh 三类工具

### 1.远程操作工具

#### a.`ssh`:远程登陆客户端

- 作用

  远程登陆执行命令(还可把远端执行的命令结果返回客户端输出)，除此之外，SSH 也支持隧道协议、端口映射和 X11 连接。

- 身份验证方式（密码和密钥）

  1.密码验证

  密码验证采用普通的 `用户名+密码` 验证方式, 需要手动输入密码

  ```bash
  # 与当前客户端用户名匹配
  ssh 221.236.11.90
  # 使用指定的用户名root
  ssh root@221.236.11.90
  ```

  2.密钥验证

  密钥验证使用不对称的 `公钥、私钥` 进行验证，公钥需要提前放到服务端电脑中，私钥自己保管。

  公钥不太重要，私钥最重要，使用密钥验证时不需要输入密码(使用私钥密码 `passphrase` 列外)

  拿 github 的 ssh 配置举个栗子

  ```bash
  # 使用ssh-keygen 生成密钥，会提示公钥的保存位置
  ssh-keygen -t rsa -b 4096 -C "zhparnex@gmail.com" # 输入passphrase或者留空

  # 查看公钥id_rsa.pub
  cat ~/id_rsa.pub # 然后将公钥添加到github账号

  # 使用ssh进行git clone操作
  git clone git@github.com:beetcb/blog-backup.git
  ```

  3.执行返回，不进入远端 shell

  在`ssh 221.236.11.90`后面追加需要执行的命令，则不进入远端 shell, 将远端 output 传输到本地客户端来 output。也支持标准输入、输出、错误的重定向，下面是几个实用重定向操作(可以使用 pipeline)。

  ```bash
  # 简单的输出重定向
  ssh 221.236.11.90 ls -Alh 1>ls.log # 数字1可省略

  # 利用输出重定向接收文件
  ssh 221.236.11.90 'cat remotefile.zip' 1> pv filefromremote.zip

  # 利用输入重定向发送文件
  ssh 221.236.11.90 cat 1> filefromlocal.zip 0< localfile.zip # 可以省略0

  # 发送接收文件夹或多个文件，需要使用pipeline简化操作
  ssh 221.236.11.90 tar Jc bin/* | tar xJ
  tar Jc bin/* | ssh -v 221.236.11.90 tar xJ
  ```

- `ssh [option]`选项一角

  选项很多，忘记时就查阅 manual，列出几个常用的：

  ```bash
  # 指定ssh自定义端口
  ssh -p 2222 221.236.11.90 # 端口需要在服务端修改`sshd_config`文件

  # ssh 指定用户名的另一种写法
  ssh -l root 221.236.11.90

  # debug
  ssh -v 221.236.11.90
  ## debug更改输出避免污染控制台
  ssh -v 221.236.11.90 2>debug.log
  ### or
  ssh -v -E debug.log 221.236.11.90
  ## 查看Exit status
  ssh -v 221.236.11.90 ls -Ah 2>debug.log&&cat debug.log | grep  ' Exit status'
  ## 仅查看debug信息，替代输出
  ssh -v 221.236.11.90 ls -Ah 2>&1

  # 压缩传输[适合下行小的机器]
  scp -C debug.log 221.236.11.90:. # 采用gzip压缩算法，如果网速很快，会降低传输速度

  # 安静模式
  scp -q 2222 debug.log 221.236.11.90:.
  ```

#### b.`scp`和`sftp`:加密文件传输

`scp` 可替代 rcp ，使用 ssh 传输和加密文件。scp 与 ssh 更改输入输出传输传输相比，scp 有进度条、网速显示，而且操作更简单、多文件或目录也不需要压缩再传输（当然 ssh 方法也可以使用 pv）

scp 的基本格式：

`scp -[options] [arguments] <push location> <pull location>`

`scp` 大部分参数继承 ssh 参数（`-p`改变），常用的有：

```bash
# 当前目录地文件传到远端$HOME目录
scp debug.log 221.236.11.90:. # 远端目录用 user@host:/tem/ 表示

# 远端$HOME目录文件拉取到本地当前目录
scp root@221.236.11.90:node.zip .

# 目录传输
scp -r root@221.236.11.90:Downloads . # tab 键可以实现远端目录补全

# 指定端口
scp -P 2222 debug.log 221.236.11.90:.

# 保留文件修改次数
scp -p 2222 debug.log 221.236.11.90:.
```

`sftp` 可替代 ftp ，使用 ftp + ssh 传输文件，有 ftp 的功能，ssh 的特性。与 scp 相比，sftp 有操作文件的能力，而 scp 只能复制文件；另外 sftp 可以交互的，进入交互模式以后，可以进行基本的文件管理操作。

同样，`sftp` 大部分参数继承 ssh 参数（`-p`改变，类似于 `scp`）。此外，在交互模式下，还有它自己的一些命令及参数（输入`help`获得提示），下面是几个我了解的：

```bash
# 首先进入sftp交互模式
sftp 221.236.11.90

# ls cd 用于导航
sftp> ls

# 下载文件(夹)到local进入sftp模式的目录
sftp> get file1.zip file2.zip
sftp> get -r remote_directory

# 上传文件（夹）=> 从local进入的目录
sftp> put file1.zip file2.zip
sftp> put -r local_directory
sftp> put /file1.zip /file2.zip # 使用绝对路径

# 如果get 和 put 失败，可以重试
sftp> reget -r remote_directory
sftp> reput -r local_directory
```

此外，还有一些类似于 linux 的命令（下面的 comment 使用 linux 命令）

```bash
# df mkdir rm chmod chown chgrp => same

# mv(change name) => rename
rename file.zip renamedFile.zip
# exit => bye or exit
exit
bye
# 'manual' => help
help # 显示帮助手册
# ls (local) pwd (local) mkdir (local)=> add prefix `l`(local)
lcd ~ # 改变本地目录
lls # 列出本地目录
lpwd # 显示本地工作目录
lmkdir dirLocal # 在本地创建文件夹
```

好了，这就是利用 Openssh 进行远程操作的工具了，其深入功能还有很多没有列出，需要持续学习。

### 2.密钥管理工具

#### a.ssh-keygen

`ssh-keygen`主要用于生成密钥对（也能管理转换密钥），一个生成过程如下：

```bash
~ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/ylo/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/ylo/.ssh/id_rsa.
Your public key has been saved in /home/ylo/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:Up6KjbnEV4Hgfo75YM393QdQsK3Z0aTNBz0DoirrW+c ylo@klar
The key's randomart image is:
+---[RSA 2048]----+
|    .      ..oo..|
|   . . .  . .o.X.|
|    . . o.  ..+ B|
|   .   o.o  .+ ..|
|    ..o.S   o..  |
|   . %o=      .  |
|    @.B...     . |
|   o.=. o. . .  .|
|    .oo  E. . .. |
+----[SHA256]-----+
klar (11:40) ~>
```

过程中有两个选项：

- 选择密钥保存位置，一般保持默认

  `Enter file in which to save the key (/home/ylo/.ssh/id_rsa):`

  同时可以指定文件名

- `passphrase`私钥密码

  `Enter passphrase (empty for no passphrase):`

  留空则不设定私钥密码，`passphrase` 是推荐使用的，如果觉得每次连接输入密码麻烦，可以使用 `ssh-add` `ssh-agent` 管理密钥[参见下文]。

选项：

```bash
# 指定生成算法
ssh-keygen -t dsa # default：rsa
# 指定生成大小
ssh-keygen -b 4096 # default: 2048
# 提前指定储存位置和文件名
ssh-keygen -f ~/tatu-key-ecdsa -t ecdsa -b 521
# 把公钥发送到服务器，写入 authorized_keys  文件
ssh-copy-id -i 221.236.11.90 # 如果使用自定义设置，需要指定密钥位置
# 测试是否连通成功
ssh -i 221.236.11.90
```

> `ssh-copy-id` 是如何工作的？
>
> The command edits the authorized_keys file on the server. It creates the .ssh directory if it doesn't exist. It creates the authorized keys file if it doesn't exist. Effectively, ssh key copied to server.
>
> It also checks if the key already exists on the server. Unless the -f option is given, each key is only added to the authorized keys file once.
>
> It further ensures that the key files have appropriate permissions. Generally, the user's home directory or any file or directory containing keys files should not be writable by anyone else. Otherwise someone else could add new authorized keys for the user and gain access. Private key files should not be readable by anyone else.

#### b.ssh-add

> 建议先了解`ssh-agent`，初始的 ssh-agent 并没有储存私钥

`ssh-add` 的作用就是把私钥加入 `ssh-agent` 代为管理，这样私钥就会储存到内存中，而不是物理磁盘中。（`ssh-add` 也可以从 `ssh-agent` 移除私钥 ）

```bash
# 把默认的私钥加入ssh-agent管理
ssh-add
# 移除私钥
ssh-add -d
```

#### c.ssh-keysign

`ssh-keysign` 是用于主机验证的帮助程序，默认关闭状态，需要修改 ssh 配置文件，使用几率不大（我就偷懒略过了）

```bash
# modify /etc/ssh/ssh_config
HostbasedAuthentication yes
```

#### d.ssh-keyscan

`ssh-keyscan` 可扫描收集远端服务器的公钥信息。主要用来提前验证设备指纹，加入 `known_hosts`。
简单来说就是我们在连接新远端主机时，会出现下面的指纹验证提示：

```bash
The authenticity of host '221.236.11.90 (221.236.11.90)' can't be established.
ECDSA key fingerprint is SHA256:kkX7M+KBwxX/Lz438A/ik/hvNkLFQbhqOfgUctr2UpI.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

必须输入 `yes` 才能继续连接，但是如果我们正在写一个 shell 脚本，功能是遍历一群主机，有些是没有验证指纹的。在 shell 脚本里不可能输入 `yes`，需要用 `ssh-keyscan` 提前获取指纹写入 `known_hosts` 文件，下面是一个示例：

```bash
# in script.sh
ssh-keyscan $2 >> ~/.ssh/known_hosts
ssh $1@$2
# back to terminal
./script.sh root 221.236.11.90
```

下面是在命令含输出的一个展示：

```bash
~
△ ssh root@221.236.11.90
The authenticity of host '221.236.11.90 (221.236.11.90)' can't be established.
ECDSA key fingerprint is SHA256:kkX7M+KBwxX/Lz438A/ik/hvNkLFQbhqOfgUctr2UpI.
Are you sure you want to continue connecting (yes/no/[fingerprint])? no
Host key verification failed.

~
▲ cat ~/script.sh
#!/bin/bash
ssh-keyscan $2 >> ~/.ssh/known_hosts
ssh $1@$2

~
△  ./script.sh root 221.236.11.90
# 221.236.11.90:22 SSH-2.0-OpenSSH_7.4
# 221.236.11.90:22 SSH-2.0-OpenSSH_7.4
# 221.236.11.90:22 SSH-2.0-OpenSSH_7.4
# 221.236.11.90:22 SSH-2.0-OpenSSH_7.4
# 221.236.11.90:22 SSH-2.0-OpenSSH_7.4
Last login: Fri Aug  7 11:41:44 2020 from 43.227.139.30

Welcome to Alibaba Cloud Elastic Compute Service !

[root@Ali ~]#
```

### 服务端工具 or 后台进程

#### a.ssh-agent

> 如果使用的是 `C Shell`，需要追加 `-s` 选项。

`ssh-agent` 程序可以跟踪 ssh 私钥 ，`ssh-agent` 的便利性在于可以不用每次输入 `passpharse` （只需初始输入一次），还可以在远程的机器上启用 `ssh-agent` 转发，使得远程机器可以使用本地转发给它的私钥进而连接其他的远程机器。可以参考 [Using SSH agent forwarding](https://developer.github.com/v3/guides/using-ssh-agent-forwarding/) ，下面是一个简单的示例:

**注解：**

对两个环境变量的解释 =>
`ssh` 与 `ssh-agent` 是两个单独的进程，需要通过 `ssh-agent` 的两个环境变量实现交流：

> - `SSH_AGENT_PID`: 储存 ssh-agent 进程的 PID；
> - `SSH_AUTH_SOCK`: 为实现进程通信。

```bash
# 通过使用eval启动它并且暴露它内部的环境变量（因为它不能自动暴露环境变量到shell中）
eval $(ssh-agent) # 不暴露环境变量，就无法与ssh-agent沟通
## or
ssh-agent zsh
## or
source <(ssh-agent)

# ssh-add
ssh-add
```

下面是对为何要使用 eval 的一个直观解释？

```bash
~
△ ssh-agent
SSH_AUTH_SOCK=/tmp/ssh-JcB99CiIGY8S/agent.192; export SSH_AUTH_SOCK;
SSH_AGENT_PID=193; export SSH_AGENT_PID;
echo Agent pid 193;

~
△ ssh-agent zsh # 与eval同效果

~
△ env
HOSTTYPE=x86_64
LANG=C.UTF-8
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/mnt/c/WINDOWS/system32:/mnt/c/WINDOWS:/mnt/c/WINDOWS/System32/Wbem:/mnt/c/WINDOWS/System32/WindowsPowerShell/v1.0/:/mnt/c/WINDOWS/System32/OpenSSH/:/mnt/c/ProgramData/chocolatey/bin:/mnt/c/Program Files/dotnet/:/mnt/c/Program Files/nodejs/:/mnt/c/Users/Administrator/AppData/Local/Microsoft/WindowsApps:/mnt/c/Users/Administrator/AppData/Local/Programs/Microsoft VS Code/bin:/mnt/c/Users/Administrator/AppData/Roaming/npm
TERM=xterm-256color
WT_SESSION=20284759-5434-4f3d-8e8e-a9c6b1afe1dc
WT_PROFILE_ID={2c4de342-38b7-51cf-b940-2309a097f518}
WSL_INTEROP=/run/WSL/8_interop
NAME=beet
HOME=/home/beet
USER=beet
LOGNAME=beet
SHELL=/usr/bin/zsh
WSL_DISTRO_NAME=Ubuntu
SHLVL=2
PWD=/home/beet
OLDPWD=/home/beet
PROMPT_EOL_MARK=
CONDA_CHANGEPS1=no
VIRTUAL_ENV_DISABLE_PROMPT=12
_=/usr/bin/env
#####下面两个是agent的环境变量####
SSH_AUTH_SOCK=/tmp/ssh-nrFOHntUqfKi/agent.210
SSH_AGENT_PID=211
```

> 除了使用 `ssh-agent <youShell>` 和 `source <(ssh-agent)` 可以替代 eval 外，还可以使用 `ssh-agent <normal command>` 使得 `<normal command>` 的进程处于 `ssh-agent` 的环境中，因此，上面两条命令实际可以使用一条命令代替：

```bash
ssh-agent ssh-add
```

#### b.sshd (ssh daemon)

`sshd` 是 ssh 的守护进程，是通过 ssh 服务端连接必要条件。一般不需要我们手动管理，学会通过配置文件修改一些默认配置即可:

```bash
# 修改默认配置文件
vim /etc/ssh/sshd_config

# 几个常用的配置关键字
## ssd服务监听端口
Port 22
## 禁止使用密码登录
PasswordAuthentication no
## 允许作为root登录
PermitRootLogin yes
## 公钥保存位置
AuthorizedKeysFile      .ssh/authorized_keys
## 允许agent转发
AllowAgentForwarding yes
## subsystem使用sftp-server
Subsystem       sftp    /usr/libexec/openssh/sftp-server
```

#### c.sftp-server

sftp 的服务端子系统，可以于 `/etc/ssh/sshd_config` 修改。sftp-server 的存在是为了保存向后兼容，现在可以用 sshd 内置的 `internal-sftp` ，获取更好的性能。

```bash
# 更改subsystem为internal-sftp
Subsystem sftp internal-sftp
```

---

> 本文中用于的文件系统很少提及(我只功利性的关注了几个配置文件)，但其它的文件却非常重要，Manual 中有详细的提示，还需坚持学习

### ssh alias

对于我来说，shell 设置太多 alias 感觉很乱，想要简化 ssh 的连接操作，可以使用 `ssh alias` 。

编辑 ssh 配置文件

```bash
vim ~/.ssh/config
```

按如下类似格式添加（不要修改原本内容）：

按如下类似格式写入：

```bash
Host hostaliasname
     HostName 221.236.11.90
     User root
     Port 2233
```

以后的连接就可以直接使用 `ssh <hostaliasname>`即可

### Openssh 之外

除了 Openssh 的强大工具，我还想介绍一个利用 sftp 挂载磁盘的工具，很是实用。

`SSHFS` 可以通过 sftp 来挂载远端硬盘位置到本地：

```bash
# mount
sshfs [user@]221.236.11.90:[directory] mountpoint
# unmount
fusermount -u mountpoint
```

- 参考及补充

  [openssh manual](https://www.openssh.com/)

  [ssh keygen](https://www.ssh.com/ssh/keygen/)

  [OpenSSH: Difference between internal-sftp and sftp-server](https://serverfault.com/questions/660160/openssh-difference-between-internal-sftp-and-sftp-server)

  [add public key to known hosts file](https://stackoverflow.com/questions/34906302/add-public-key-to-known-hosts-file)
