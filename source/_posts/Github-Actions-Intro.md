---
title: Github Actions简介
date: 2020-06-19 23:39:07

tags:
  - CI/CD
  - gitpages
categories:
  - github
---

# 简介

`GitHub Actions`可帮助开发人员在软件开发生命周期内自动化任务。 GitHub Actions 是事件驱动的，这意味着可以在发生指定事件后运行一系列命令。例如，每当有人为仓库新建`pr`时，可以自动运行测试脚本。

<!-- more -->

该图演示了如何使用 GitHub Actions 自动运行软件测试脚本。事件自动触发包`job`含的`workflow`。然后，`job`将使用`step`来控制`action`的执行顺序。这些`action`即是自动化测试软件的命令。

![Workflow overview](overview-actions-simple.png)

# Github Actions 的组件

以下是可协同运行`job`的多个`GitHub Actions`组件的列表。可以看到这些组件之间如何交互

![Component and service overview](overview-actions-design.png)

## workflow

`workflow`您添加到代码仓库中的自动化过程。其由一个或多个`job`组成，可以由事件调度或触发。该`workflow`可用于在 GitHub 上构建，测试，打包，发布或部署项目。

## Events

`event`是触发`workflow`的特定活动。例如，当有人将`commit` 推送到仓库或创建`issue`或`pr`时，Github 会产生`envent`。还可以使用 [repository dispatch webhook](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#create-a-repository-dispatch-event)在发生外部事件时触发`workflow`。有关可用于触发`workflow`的`evrnt`的完整列表，查看[Events that trigger workflows](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows)。

## Jobs

`job`是在同一`runner`上执行的一组`step`。默认情况下，具有多个`job`的`workflow`程将并行运行这些`job`。还可以配置`workflow`以按顺序运行`job`。例如，一个`workflow`可以有两个顺序执行的`job`来构建和测试代码，其中测试`job`取决于构建`job`的状态。如果构建`job`失败，则测试`job`将不会运行。

## Steps

`step`是可以在`job`中运行命令的单个任务。`step`可以是操作或`shell`命令。`job`中的每个`step`都在同一`runner`上执行，从而使该`job`中的操作可以彼此共享数据。

## Actions

`action`是独立的命令，组合成`step`以构建`job`, `action`是工作流中最小的可移植构建块。可以创建自己的`action`，也可以使用 GitHub 社区创建的`action`。要在工作流中使用`action`，必须将其包括在一个`step`中。

## Runners

`runner`是已安装[GitHub Actions runner 应用程序](https://github.com/actions/runner)的服务器。可以使用 GitHub 托管的`runner`，也可以使用自己的`runner`。`runner`监听可用的`job`，一次运行一个`job`，并将进度，日志和结果反馈给 GitHub。对于由 GitHub 托管的`runner`，`workflow`中的每个`job`都在全新的虚拟环境中运行。

GitHub 托管的`runner`基于 Ubuntu Linux，Microsoft Windows 和 macOS。有关 GitHub 托管的`runner`的信息，请参阅"[Virtual environments for GitHub-hosted runners](https://docs.github.com/en/free-pro-team@latest/actions/reference/virtual-environments-for-github-hosted-runners)"。如果需要其他的 OS 或特定的硬件配置，则可以托管自己的`runner`。有关自托管`runner`的信息，请参阅"[Hosting your own runners](https://docs.github.com/en/free-pro-team@latest/actions/hosting-your-own-runners)"。

## 创建样例 workflow

GitHub Actions 使用`YAML`语法定义`event`，`job`和`step`。这些 YAML 文件存储在代码存储库中的`.github / workflows`目录中。

可以在仓库中创建示例的`workflow`，该`workflow`在每次推送代码时自动触发一系列命令。在此`workflow`中，GitHub Actions 使用了[`actions market`](https://github.com/marketplace?type=actions)的`checkout`和`setup-node` `action`，然后安装软件依赖项，并运行`bat -v`。

- 首先在项目中创建`.github/workflow`目录

- 在其中，创建一个`learn-github-actions.yml`文件，内容如下：

  ```yaml
  name: learn-github-actions
  on: [push]
  jobs:
    check-bats-version:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
        - run: npm install -g bats
        - run: bats -v
  ```

- `commit`这些修改并且`push`代码到仓库

现在，新的`GitHub Actions`工作流文件已安装在代码仓库中，并且每次有人将更改推送到仓库时，它将自动运行。有关作业的执行历史记录的详细信息，请参阅"[Viewing the workflow's activity](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#viewing-the-jobs-activity)"。

要更详细了解`workflow`文件，参阅[Understanding the workflow file](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#understanding-the-workflow-file)。

# 自动构建 Hexo 博客

## 配置密钥

首先生成一对新的密钥

```bash
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f github-deploy-key -N ""
```

在对应的 gihtub 仓库设置中的`Deploy keys`,将刚才生成的密钥对中的公钥添加进去;然后在设置中的`Secrets`里面新建一个`Secret`，名为`DEPLOY_KEY`，将刚才生成的密钥对中的私钥添加进去.

## 配置`workflow`

在项目根目录下新建`.github/workflow/ci.yaml`，内容为

```yaml
name: Deploy

on:
  push:
    branches:
      - hexo
  pull_request:
    branches:
      - hexo
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          ref: hexo
      - uses: actions/setup-node@v2
        with:
          node-version: "12"
      - name: Cache node modules
        uses: actions/cache@v2
        env:
          cache-name: cache-node-modules
        with:
          # npm cache files are stored in `~/.npm` on Linux/macOS
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-
      - name: Install Dependencies
        run: |
          npm install -g hexo-cli
          npm install
      - name: build
        run: |
          hexo g
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          deploy_key: ${{ secrets.DEPLOY_KEY }}
          publish_dir: public
```

上面使用了`actions/cache@v2`l github actions market 中的`peaceiris/actions-gh-pages@v3`,让部署博客更加简单.

> 不过部署 Hexo 博客的话,目前 Vercel 更简单,在国内访问也更快,本博客的 Github Actions 已经被禁用了,由 vercel 进行部署.
