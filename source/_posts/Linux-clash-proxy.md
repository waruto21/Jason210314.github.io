---
title: Linux使用clash代理
date: 2020-08-21 09:19:53
categories:
  - Linux
tags:
  - clash
  - 代理
---

# 起因

偶然发现百度云的学生服务器挺便宜，2 核心 4g 内存机型一个月只要 18 元，有个随时随地能够访问的 Linux 环境还是挺好的，遂购入。新系统初始化完成，第一件事当然是来一套[`ohmyzsh`](https://github.com/ohmyzsh/ohmyzsh)，结果这就出了问题，`git clone`太慢了。

<!-- more -->

![](ohmyzsh.png)

遂想到是不是该给其使用一下代理。不然之后不止`git clone`，很多资源都无法下载。

# 使用`clash`

[`clash`](https://github.com/Dreamacro/clash)是一款使用`go`语言开发的多平台代理工具，支持`ss/v2ray`等多种协议，在`macOS`，`windows`上使用起来很方便，在没有`GUI`的`Linux`也只需要稍加配置。

先从[这里](https://github.com/Dreamacro/clash/releases)下载`clash`的`linux-amd64`可执行文件。

```bash
naruto@bdy:~$ gzip -d clash-linux-amd64-v1.1.0.gz
naruto@bdy:~$ chmod +x clash-linux-amd64-v1.1.0
naruto@bdy:~$ sudo mv clash-linux-amd64-v1.1.0 /usr/local/bin/clash
```

然后下载[`Country.mmdb`](https://github.com/Dreamacro/maxmind-geoip/releases)。

```bash
naruto@bdy:~$ mkdir -p .config/clash
naruto@bdy:~$ mv Country.mmdb .config/clash/
```

之后，需要最关键的`clash`代理配置文件`config.yaml`，一般机场都会提供，同样将其放到`.config/clash`目录下。

之后先直接启动`clash`看看效果。

![](clash_boot.png)

启动遇到`WARN[0000] Failed to start Redir UDP Listener: operation not permitted`，可以使用`sudo clash`启动。

# 配置 GUI 界面

从上一段的图中可以看到，`clash`服务有一个`RESTful API`的服务，通过其我们可以访问 web 管理页面。在`config.yaml`中制定即可。比较受欢迎的是[`yacd`](https://github.com/haishanh/yacd)，可以直接下载[打包好的版本](https://github.com/haishanh/yacd/archive/gh-pages.zip)。

```bash
naruto@bdy:~$ unzip yacd-gh-pages.zip
naruto@bdy:~$ mv yacd-gh-pages .config/clash/dashboard
```

在`config.yaml`中如下设置：

```yaml
external-ui: "dashboard"
secret: ""
```

启动`clash`后，浏览器使用`ip:port/ui`的方式访问，如下所示。

![](yacd.png)

# 享用代理

在 GUI 界面选择好代理服务器后，就可以使用代理了。打开另一个终端窗口，执行如下命令，设置`http(s)`代理环境变量。

```bash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

![](wget.png)

接下来，进行一些完善工作。首先每次都手动启动`clash`并且占用一个终端窗口是很不方便的，先将`clash`作为一个`daemon`进程。参照开发者[推荐](https://github.com/Dreamacro/clash/wiki/clash-as-a-daemon)，使用`pm2`。

```bash
$ wget -qO- https://getpm2.com/install.sh | bash
$ pm2 start clash
```

然后是将代理命令作为函数写入`.zshrc`.

> 注意，下面使用了`zsh`语法，和`bash`略有不同。

```bash
PROXY_IP=127.0.0.1
PROXY_PORT=7890

function Proxy() {
    if [ "$1" = "on" ]; then
        export https_proxy=$PROXY_IP:$PROXY_PORT
        export http_proxy=$PROXY_IP:$PROXY_PORT
        echo Proxy On
    else
        unset https_proxy
        unset http_proxy
        echo Proxy Off
    fi
}
```

然后试试看，非常愉快。

![](google.png)

最后，我们来装一个`rust`试试。

![](rust.png)
