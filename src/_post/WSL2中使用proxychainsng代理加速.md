---
layout: post
title: WSL2中使用proxychains ng代理加速
author: beet
post: "@13@"
date: 2020-07-21 08:14:22
nailimg: https://m.beetcb.com/nailimg/proxy.png
tags: wsl
---
> 情景：windows 已开启代理，需要 WSL2 走主机的代理

依以前的做法，直接使用 `export http_proxy="http://127.0.0.1:7899"`就可以临时使用，但是 WSL2 下访问主机已经没有这么简单, 官方文档有说明：

> If you want to access a networking app running on Windows (for example an app running on a NodeJS or SQL server) from your Linux distribution (ie Ubuntu), then you need to use the IP address of your host machine. While this is not a common scenario, you can follow these steps to make it work. - Obtain the IP address of your host machine by running this command from your Linux distribution: cat /etc/resolv.conf - Copy the IP address following the term: nameserver. - Connect to any Windows server using the copied IP address.

所以，依据文档，我们需要使用 `/etc/resolv.conf` 文件中的 `nameserver` 值作为 hostIP，而且这个 hostIP 是动态的，需要使用脚本动态获取，下面是初步的尝试:

#### 初步方法(`http_proxy`)

思路：使用 gerp 配合正则匹配 IP 地址，动态写入   http_proxy; 至于端口，如果不想设定固定值，需要用 powershell 获取系统代理的端口值

``` bash
# 获得 hostIP
export hostIP=`grep -oP  "(\d+\.)+(\d+)" /etc/resolv.conf`
# 获得端口号 => 这需要后台启动powershell，如果在意速度问题，建议直接设定成定值，以后少改动端口就行
export hostPort=`(powershell.exe Get-ItemProperty -Path "Registry::HKCU\Software\Microsoft\Windows\CurrentVersion\'Internet Settings'") | tail -n 13 | grep -oP '\d{4}'`
# 设置alias，防止启动shell默认挂代理
alias setProxy='export http_proxy="http://$hostIP:$hostPort"'
```
以上设置可以写入 `~/bashrc`(或 `~/.zshrc`), 以后在想要使用代理的时候输入 `setProxy` 即可启用代理
#### 改进方法(`proxychains ng`)
使用 `proxychains ng (又名 proxychains4 )` 可以有更佳的代理体验，相比于 `http_proxy`, `proxychains ng`可以给特定的程序设定代理
- 比如 git 就不需要额外设定 `git proxy` 了；
- 还有 vim 插件安装程序，只需要安装时使用`proxychains ng`, 就全部使用代理进行安装，这是极其方便的；
- 另外，`proxychains ng` 不会占用全局代理，只要加上一个前缀就可以使用代理，不加前缀不不会走代理。

查看[官方repo](https://github.com/rofl0r/proxychains-ng)进行安装

安装完成后需要更改配置文件，加入代理，同样由于 hostIP 是动态的，这里需要用脚本曲线更改此文件, 下面是详细步骤

1.`proxychains4 -h` 可以查看配置文件位置, 位于`/etc/proxychains4.conf`

2.`cat -n /etc/proxychains4.conf`
设置代理的那一行的位置，就在这几行注释的下面 `# add proxy here # meanwile # defaults set to "tor"`, 可以看到是115行

所以在脚本里面写上：

``` bash
# 获得hostIP
export hostIP=`grep -oP  "(\d+\.)+(\d+)" /etc/resolv.conf`
# 获得端口号=>这需要后台启动powershell，如果在意速度问题，建议直接设定成定值，以后少改动端口就行
export hostPort=`(powershell.exe Get-ItemProperty -Path "Registry::HKCU\Software\Microsoft\Windows\CurrentVersion\'Internet Settings'") | tail -n 13 | grep -oP '\d{4}'`
# 替换配置文件里设置代理那一行
sudo sed -i "115c http $hostIP $hostPort" /etc/proxychains4.conf
```

#### 简化操作

给 `proxychains4` 命令设定 alias

``` bash
alias px='proxychains4'
# 此后只需输入 px git pull 即可
```
> 注意：`px gp` 如此的连续两个alias是无法识别的，依旧需要使用`px git pull`

最后，放一张 `proxychains ng` 体验图
![px test](https://m.beetcb.com/postimg/13/13.png)

参考及补充：
- [通过 ProxyChains-NG 实现终端下任意应用代理](https://www.hi-linux.com/posts/48321.html)
- [Accessing Windows networking apps from Linux (host IP)](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#accessing-windows-networking-apps-from-linux-host-ip)

