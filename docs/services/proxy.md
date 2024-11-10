# 记录一下在linux服务器里面配置proxy

## 参考资料

[一个大佬的blog](https://wuuconix.link/2021/08/14/clash-dashboard/)

## 背景

在docker，github都被墙的现在。使用国内的服务器，就很不方便，但是clash删库以后，可以使用的方案少之又少，终于在goole的时候发现可一个基于docker的方案。前提是可以通过docker先拉取到容易。

## 前置条件

1. docker
2. 有一个docker proxy
3. 自己有可以翻墙的订阅

## 主要过程

```bash
docker pull dreamacro/clash
docker pull haishanh/yacd
docker run -d --name=clash -v "$PWD/clash:/root/.config/clash" -p "7890:7890" -p "9090:9090" -p "7891:7891" --restart=unless-stopped dreamacro/clash
docker run -p 1234:80 -d --name clash-dashboard haishanh/yacd
```

### 解释

- 挂载的`dreamacro/clash`是clash的核心，运行着clash的可执行文件。但是想要翻墙的话需要`config.yaml`文件（clash的配置文件），在容器生成的时候通过`-v "$PWD/clash:/root/.config/clash"`挂载好的。
- **`xternal-controller`** : 是后端api，可以方便`yacd`展示前端页面，并修改节点。一定要设置为`0.0.0.0`不然的话`yacd`是不能访问的。
- `allow-lan`: 必须设置为`true`,是允许局域网中的其他用户访问

配置没有问题以后，可以通过`ip:1234`打开yacd的页面，配置后端地址为`ip:9090`就可以访问到图形化界面了。

<img src="/Users/bary/code/barry/blog/docs/services/assets/yacd.png" alt="yacd" style="zoom:50%;" />

<img src="/Users/bary/code/barry/blog/docs/services/assets/yacd2.png" alt="yacd2" style="zoom:50%;" />

### 如何设置代理

可以通过命令行的方式

```bash
export https_proxy=http://127.0.0.1:7890;export http_proxy=http://127.0.0.1:7890;export all_proxy=socks5://127.0.0.1:7891
```

- 注意：不要暴露ip，只给自己使用。



## 写在最后

1. 怎么配置git代理

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```

