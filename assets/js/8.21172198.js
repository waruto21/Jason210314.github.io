(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{390:function(t,a,s){t.exports=s.p+"assets/img/driver1.13754a36.png"},391:function(t,a,s){t.exports=s.p+"assets/img/tensor1.320561e0.png"},392:function(t,a,s){t.exports=s.p+"assets/img/run1.d57d78b4.png"},442:function(t,a,s){"use strict";s.r(a);var n=s(11),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"显卡驱动"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#显卡驱动"}},[t._v("#")]),t._v(" 显卡驱动")]),t._v(" "),n("p",[t._v("最新的 18.04.3 已经可以安装 430 驱动")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" nvidia-driver-430\n")])])]),n("p",[n("img",{attrs:{src:s(390),alt:""}})]),t._v(" "),n("h1",{attrs:{id:"安装要求"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装要求"}},[t._v("#")]),t._v(" 安装要求")]),t._v(" "),n("p",[t._v("官网有安装所需"),n("a",{attrs:{href:"https://tensorflow.google.cn/install/gpu",target:"_blank",rel:"noopener noreferrer"}},[t._v("软件要求"),n("OutboundLink")],1),t._v(" "),n("img",{attrs:{src:s(391),alt:""}})]),t._v(" "),n("h1",{attrs:{id:"安装-cuda-及其组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装-cuda-及其组件"}},[t._v("#")]),t._v(" 安装 cuda 及其组件")]),t._v(" "),n("p",[t._v("去官网下载"),n("a",{attrs:{href:"https://developer.nvidia.com/cuda-10.0-download-archive",target:"_blank",rel:"noopener noreferrer"}},[t._v("cuda 安装 runfile 及其补丁"),n("OutboundLink")],1),t._v("，")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Add NVIDIA package repository")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" +x ./cuda_10.0.130_410.48_linux.run ./cuda_10.0.130.1_linux.run\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ./cuda_10.0.130_410.48_linux.run\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ./cuda_10.0.130.1_linux.run\n")])])]),n("p",[t._v("注意不要重复安装 nvidia 显卡驱动。\n然后下载"),n("a",{attrs:{href:"https://developer.nvidia.com/rdp/cudnn-archive",target:"_blank",rel:"noopener noreferrer"}},[t._v("cudnn"),n("OutboundLink")],1),t._v(".")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" -zxvf cudnn-10.0-linux-x64-v7.6.2.24.tgz\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" cuda/include/cudnn.h /usr/local/cuda/include\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" cuda/lib64/libcudnn* /usr/local/cuda/lib64\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*\n")])])]),n("p",[t._v("然后设置环境变量(cuda 安装完成时会提示)")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")])]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/usr/local/cuda/bin/:"),n("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("LD_LIBRARY_PATH")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$LD_LIBRARY_PATH")]),t._v(":/usr/local/cuda/extras/CUPTI/lib64\n")])])]),n("p",[t._v("检验下安装")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("wmc@omen:~$ nvcc -V\nnvcc: NVIDIA "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("R"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" Cuda compiler driver\nCopyright "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("c"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2005")]),t._v("-2018 NVIDIA Corporation\nBuilt on Sat_Aug_25_21:08:01_CDT_2018\nCuda compilation tools, release "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10.0")]),t._v(", V10.0.130\n")])])]),n("h1",{attrs:{id:"anaconda"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#anaconda"}},[t._v("#")]),t._v(" Anaconda")]),t._v(" "),n("p",[t._v("Anaconda 安装十分简单.去喜闻乐见的"),n("a",{attrs:{href:"https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2019.07-Linux-x86_64.sh",target:"_blank",rel:"noopener noreferrer"}},[t._v("tuna"),n("OutboundLink")],1),t._v("下载。")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" +x Anaconda3-2019.07-Linux-x86_64.sh\n./Anaconda3-2019.07-Linux-x86_64.sh\n")])])]),n("p",[t._v("更换 anaconda 和 pip 镜像源")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/\nconda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/\nconda config --set show_channel_urls "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("yes")]),t._v("\n\n\npip "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" pip -U\npip config "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" global.index-url https://pypi.tuna.tsinghua.edu.cn/simple\n")])])]),n("p",[t._v("安装完成后，我们使用创建一个新的 python 虚拟环境，安装 tensorflow-gpu.")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("conda create -n tensor pip "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("python")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3.6")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" activate tensor\npip "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --upgrade tensorflow-gpu\n")])])]),n("h2",{attrs:{id:"安装-jupyter-插件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装-jupyter-插件"}},[t._v("#")]),t._v(" 安装 jupyter 插件")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("conda "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -c conda-forge jupyter_contrib_nbextensions\njupyter contrib nbextension "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --user\n")])])]),n("h2",{attrs:{id:"将-conda-虚拟环境作为-jupyter-内核"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#将-conda-虚拟环境作为-jupyter-内核"}},[t._v("#")]),t._v(" 将 conda 虚拟环境作为 jupyter 内核")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("conda activate tensorflowenv\npip "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" ipykernel\npython -m ipykernel "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --user --name tensorflowenv --display-name "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Python (tensorflowenv)"')]),t._v("\n")])])]),n("h1",{attrs:{id:"示例测试"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#示例测试"}},[t._v("#")]),t._v(" 示例测试")]),t._v(" "),n("div",{staticClass:"language-python extra-class"},[n("pre",{pre:!0,attrs:{class:"language-python"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" tensorflow "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" tf\nmnist "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keras"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("datasets"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mnist\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x_train"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y_train"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mnist"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("load_data"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nx_train"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x_test "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" x_train "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("255.0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" x_test "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("255.0")]),t._v("\n\nmodel "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" tf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keras"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("models"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Sequential"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  tf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keras"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("layers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Flatten"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("input_shape"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("28")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("28")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keras"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("layers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Dense"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("128")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" activation"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'relu'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keras"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("layers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Dropout"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tf"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("keras"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("layers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Dense"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" activation"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'softmax'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nmodel"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("compile")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("optimizer"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'adam'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n              loss"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sparse_categorical_crossentropy'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n              metrics"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'accuracy'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nmodel"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fit"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x_train"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y_train"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" epochs"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nmodel"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("evaluate"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y_test"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("运行结果\n"),n("img",{attrs:{src:s(392),alt:""}})])])}),[],!1,null,null,null);a.default=e.exports}}]);