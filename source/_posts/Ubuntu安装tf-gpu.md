---
title: Ubuntu安装tf-gpu
date: 2019-02-01 17:06:10
categories:
    - Python
    - tensorflow
    - ubuntu
tags:
    - ubuntu
---


## 显卡驱动

最新的18.04.3已经可以安装430驱动
```bash
sudo apt install nvidia-driver-430
```
![NVIDIA驱动](driver1.png)
## 安装要求
官网有安装所需[软件要求](https://tensorflow.google.cn/install/gpu)
![](tensor1.png)
## 安装cuda及其组件



去官网下载[cuda安装runfile及其补丁](https://developer.nvidia.com/cuda-10.0-download-archive)，

```bash
# Add NVIDIA package repository
chmod +x ./cuda_10.0.130_410.48_linux.run ./cuda_10.0.130.1_linux.run
sudo ./cuda_10.0.130_410.48_linux.run
sudo ./cuda_10.0.130.1_linux.run
```
注意不要重复安装nvidia显卡驱动。
然后下载[cudnn](https://developer.nvidia.com/rdp/cudnn-archive).
```bash
tar -zxvf cudnn-10.0-linux-x64-v7.6.2.24.tgz
sudo cp cuda/include/cudnn.h /usr/local/cuda/include
sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64
sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
```
然后设置环境变量(cuda安装完成时会提示)
```bash
export PATH=/usr/local/cuda/bin/:$PATH
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/extras/CUPTI/lib64
```
检验下安装
```bash
wmc@omen:~$ nvcc -V
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2018 NVIDIA Corporation
Built on Sat_Aug_25_21:08:01_CDT_2018
Cuda compilation tools, release 10.0, V10.0.130
```
## Anaconda
Anaconda安装十分简单.去喜闻乐见的[tuna](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2019.07-Linux-x86_64.sh)下载。
```bash
chmod +x Anaconda3-2019.07-Linux-x86_64.sh
./Anaconda3-2019.07-Linux-x86_64.sh
```
更换anaconda和pip镜像源
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes


pip install pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```
安装完成后，我们使用创建一个新的python虚拟环境，安装tensorflow-gpu.
```bash
conda create -n tensor pip python=3.6
source activate tensor
pip install --upgrade tensorflow-gpu
```
### 安装jupyter插件
```bash
conda install -c conda-forge jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
```

### 将conda虚拟环境作为jupyter内核
```bash
conda activate tensorflowenv
pip install ipykernel
python -m ipykernel install --user --name tensorflowenv --display-name "Python (tensorflowenv)"
```

## 示例测试
```python
import tensorflow as tf
mnist = tf.keras.datasets.mnist

(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)
```

运行结果
![](run1.png)



