# 介绍

## 简介

gupo-admin-tpl 是一个基于 `vue3、vite、typescript、naive-ui、unocss` 的中后台解决方案，目标是为了简化中后台项目从零到一的搭建流程。其包括了一套二次封装的业务组件、请求方案、权限菜单和按钮、 `utils` 和 `hooks` 等。项目使用目前最新的技术栈，既可以作为项目的启动模板，也可以作为学习示例，让您快速掌握项目工程化、最新最流行的 vue 技术栈、封装组件和打包组件产物等技术。

## 文档

文档采用 [vitepress](https://vitepress.dev/zh/) 开发，如果发现文档有误，请通过 codeup 提交 pr 进行修正。

## 本地运行项目
本项目为了快捷运行脚本命令，使用了 `@antfu/ni` 进行开发，请自行全局安装该脚本。
```bash
# 拉取代码
git clone https://github.com/artsmp0/art-admin-tpl

# 安装依赖
ni

# 运行项目
nr dev

# 运行项目文档
nr dev:docs
```

## 先决条件
不会 vue 请立即关闭该文档，会的请继续：
1. typescript：不必拘泥于用了 ts 就一定要写类型，始终记住它只是为了增强我们开发效率以及增强代码可维护性。
2. unocss：请记住 1 个 unocss 单位表示 `4px`，如果你觉得太难换算，请写类似：`w-100px` 这样的代码。
3. 解决问题的能力：只有大家多用多做，共同进步，模板才能越来越完善。
