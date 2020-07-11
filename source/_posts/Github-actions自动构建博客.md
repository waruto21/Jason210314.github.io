---
title: Github Actions自动构建博客
date: 2020-06-19 23:39:07
categories:
 - github
tags:
- CI/CD
- gitpages
---

## 新建Secret

在博客项目的的`Secrets`里面新建一个`Secret`，名为`CI_PRIVATE_KEY`，将内容设置为配置在GitHub中的公钥对应的私钥。

## 配置工作流

在项目根目录下新建`.github/workflow/nodejs.yaml`，内容为

```yaml

# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Hexo CI

on:
  push:
    branches: hexo

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - name: Setup Source
      uses: actions/checkout@v2
      with:
        ref: hexo
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: Setup Hexo
      env:
        ACTION_DEPLOY_KEY: ${{ secrets.CI_PRIVATE_KEY }}
      run: |
        mkdir -p ~/.ssh/
        echo "$ACTION_DEPLOY_KEY" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        git config --global user.email "wmc314@outlook.com"
        git config --global user.name "Jason210314"
        npm install -g hexo
        yarn install
    - name: Hexo Deploy
      run: |
        hexo c
        hexo g
        hexo d
      env:
        CI: true
```

