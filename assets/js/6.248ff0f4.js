(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{387:function(a,s,t){a.exports=t.p+"assets/img/ohmyzsh.9e3a5fe5.png"},388:function(a,s,t){a.exports=t.p+"assets/img/clash_boot.1c48150e.png"},389:function(a,s,t){a.exports=t.p+"assets/img/yacd.0a40015a.png"},390:function(a,s,t){a.exports=t.p+"assets/img/wget.c737bea4.png"},391:function(a,s,t){a.exports=t.p+"assets/img/google.aec40cb5.png"},392:function(a,s,t){a.exports=t.p+"assets/img/rust.8823f044.png"},443:function(a,s,t){"use strict";t.r(s);var e=t(11),n=Object(e.a)({},(function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"起因"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#起因"}},[a._v("#")]),a._v(" 起因")]),a._v(" "),e("p",[a._v("偶然发现百度云的学生服务器挺便宜，2 核心 4g 内存机型一个月只要 18 元，有个随时随地能够访问的 Linux 环境还是挺好的，遂购入。新系统初始化完成，第一件事当然是来一套"),e("a",{attrs:{href:"https://github.com/ohmyzsh/ohmyzsh",target:"_blank",rel:"noopener noreferrer"}},[e("code",[a._v("ohmyzsh")]),e("OutboundLink")],1),a._v("，结果这就出了问题，"),e("code",[a._v("git clone")]),a._v("太慢了。")]),a._v(" "),e("p",[e("img",{attrs:{src:t(387),alt:""}})]),a._v(" "),e("p",[a._v("遂想到是不是该给其使用一下代理。不然之后不止"),e("code",[a._v("git clone")]),a._v("，很多资源都无法下载。")]),a._v(" "),e("h1",{attrs:{id:"使用clash"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用clash"}},[a._v("#")]),a._v(" 使用"),e("code",[a._v("clash")])]),a._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/Dreamacro/clash",target:"_blank",rel:"noopener noreferrer"}},[e("code",[a._v("clash")]),e("OutboundLink")],1),a._v("是一款使用"),e("code",[a._v("go")]),a._v("语言开发的多平台代理工具，支持"),e("code",[a._v("ss/v2ray")]),a._v("等多种协议，在"),e("code",[a._v("macOS")]),a._v("，"),e("code",[a._v("windows")]),a._v("上使用起来很方便，在没有"),e("code",[a._v("GUI")]),a._v("的"),e("code",[a._v("Linux")]),a._v("也只需要稍加配置。")]),a._v(" "),e("p",[a._v("先从"),e("a",{attrs:{href:"https://github.com/Dreamacro/clash/releases",target:"_blank",rel:"noopener noreferrer"}},[a._v("这里"),e("OutboundLink")],1),a._v("下载"),e("code",[a._v("clash")]),a._v("的"),e("code",[a._v("linux-amd64")]),a._v("可执行文件。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("naruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("gzip")]),a._v(" -d clash-linux-amd64-v1.1.0.gz\nnaruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" +x clash-linux-amd64-v1.1.0\nnaruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" clash-linux-amd64-v1.1.0 /usr/local/bin/clash\n")])])]),e("p",[a._v("然后下载"),e("a",{attrs:{href:"https://github.com/Dreamacro/maxmind-geoip/releases",target:"_blank",rel:"noopener noreferrer"}},[e("code",[a._v("Country.mmdb")]),e("OutboundLink")],1),a._v("。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("naruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" -p .config/clash\nnaruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" Country.mmdb .config/clash/\n")])])]),e("p",[a._v("之后，需要最关键的"),e("code",[a._v("clash")]),a._v("代理配置文件"),e("code",[a._v("config.yaml")]),a._v("，一般机场都会提供，同样将其放到"),e("code",[a._v(".config/clash")]),a._v("目录下。")]),a._v(" "),e("p",[a._v("之后先直接启动"),e("code",[a._v("clash")]),a._v("看看效果。")]),a._v(" "),e("p",[e("img",{attrs:{src:t(388),alt:""}})]),a._v(" "),e("p",[a._v("启动遇到"),e("code",[a._v("WARN[0000] Failed to start Redir UDP Listener: operation not permitted")]),a._v("，可以使用"),e("code",[a._v("sudo clash")]),a._v("启动。")]),a._v(" "),e("h1",{attrs:{id:"配置-gui-界面"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置-gui-界面"}},[a._v("#")]),a._v(" 配置 GUI 界面")]),a._v(" "),e("p",[a._v("从上一段的图中可以看到，"),e("code",[a._v("clash")]),a._v("服务有一个"),e("code",[a._v("RESTful API")]),a._v("的服务，通过其我们可以访问 web 管理页面。在"),e("code",[a._v("config.yaml")]),a._v("中制定即可。比较受欢迎的是"),e("a",{attrs:{href:"https://github.com/haishanh/yacd",target:"_blank",rel:"noopener noreferrer"}},[e("code",[a._v("yacd")]),e("OutboundLink")],1),a._v("，可以直接下载"),e("a",{attrs:{href:"https://github.com/haishanh/yacd/archive/gh-pages.zip",target:"_blank",rel:"noopener noreferrer"}},[a._v("打包好的版本"),e("OutboundLink")],1),a._v("。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("naruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("unzip")]),a._v(" yacd-gh-pages.zip\nnaruto@bdy:~$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" yacd-gh-pages .config/clash/dashboard\n")])])]),e("p",[a._v("在"),e("code",[a._v("config.yaml")]),a._v("中如下设置：")]),a._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("external-ui")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"dashboard"')]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[a._v("secret")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(":")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v("\n")])])]),e("p",[a._v("启动"),e("code",[a._v("clash")]),a._v("后，浏览器使用"),e("code",[a._v("ip:port/ui")]),a._v("的方式访问，如下所示。")]),a._v(" "),e("p",[e("img",{attrs:{src:t(389),alt:""}})]),a._v(" "),e("h1",{attrs:{id:"享用代理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#享用代理"}},[a._v("#")]),a._v(" 享用代理")]),a._v(" "),e("p",[a._v("在 GUI 界面选择好代理服务器后，就可以使用代理了。打开另一个终端窗口，执行如下命令，设置"),e("code",[a._v("http(s)")]),a._v("代理环境变量。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("https_proxy")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("http://127.0.0.1:7890 "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("http_proxy")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("http://127.0.0.1:7890 "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("all_proxy")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("socks5://127.0.0.1:7890\n")])])]),e("p",[e("img",{attrs:{src:t(390),alt:""}})]),a._v(" "),e("p",[a._v("接下来，进行一些完善工作。首先每次都手动启动"),e("code",[a._v("clash")]),a._v("并且占用一个终端窗口是很不方便的，先将"),e("code",[a._v("clash")]),a._v("作为一个"),e("code",[a._v("daemon")]),a._v("进程。参照开发者"),e("a",{attrs:{href:"https://github.com/Dreamacro/clash/wiki/clash-as-a-daemon",target:"_blank",rel:"noopener noreferrer"}},[a._v("推荐"),e("OutboundLink")],1),a._v("，使用"),e("code",[a._v("pm2")]),a._v("。")]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("wget")]),a._v(" -qO- https://getpm2.com/install.sh "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("bash")]),a._v("\n$ pm2 start clash\n")])])]),e("p",[a._v("然后是将代理命令作为函数写入"),e("code",[a._v(".zshrc")]),a._v(".")]),a._v(" "),e("blockquote",[e("p",[a._v("注意，下面使用了"),e("code",[a._v("zsh")]),a._v("语法，和"),e("code",[a._v("bash")]),a._v("略有不同。")])]),a._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("PROXY_IP")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),a._v(".0.1\n"),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("PROXY_PORT")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("7890")]),a._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("function")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token function-name function"}},[a._v("Proxy")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$1")]),a._v('"')]),a._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"on"')]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("then")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("https_proxy")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$PROXY_IP")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$PROXY_PORT")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("http_proxy")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$PROXY_IP")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$PROXY_PORT")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" Proxy On\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("else")]),a._v("\n        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("unset")]),a._v(" https_proxy\n        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("unset")]),a._v(" http_proxy\n        "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" Proxy Off\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("fi")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),e("p",[a._v("然后试试看，非常愉快。")]),a._v(" "),e("p",[e("img",{attrs:{src:t(391),alt:""}})]),a._v(" "),e("p",[a._v("最后，我们来装一个"),e("code",[a._v("rust")]),a._v("试试。")]),a._v(" "),e("p",[e("img",{attrs:{src:t(392),alt:""}})])])}),[],!1,null,null,null);s.default=n.exports}}]);