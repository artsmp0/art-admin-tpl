# 快速开始

本文将会告知您如何从头开始使用本模板。

::: tip
本模板的所有组件在 /components 路径下，目前有的组件都是本人项目开发中常用到的，如果您觉得不满足或者您有更好的想法，完全可以肆意修改删除它们，或者通过 pr 来完善它们。
:::

## 环境准备

开始前请检查本地环境。需要有 `node>=18.12.0` 以及 `git`，同时 node 需要启动 `corepack` 功能。
```bash
❯ node -v
v20.11.0

# 开启 corepack
corepack enable

❯ pnpm -v
9.1.4
```

## vscode

本项目推荐使用 vscode 进行开发，并推荐安装以下插件

```
antfu.goto-alias
antfu.iconify
antfu.unocss
christian-kohler.path-intellisense
codeium.codeium
dbaeumer.vscode-eslint
eamodio.gitlens
mikestead.dotenv
naumovs.color-highlight
streetsidesoftware.code-spell-checker
vue.volar
```

## 安装

脚手架只带一个 cli 工具，未来可能会拓展各样的功能。
```bash
# cd 你存放项目的地方
# 下载模板
npx gupo-admin
# 会提示输入项目名称
? Project name: project_name
```

## 脚本说明

```json
{
  "scripts": {
    // 构建组件（脚手架下会被移除）
    "build:comp": "pnpm --filter=@gupo-admin/components build",
    // 格式化代码
    "lint": "eslint . --fix",
    // 启动开发服务器
    "dev": "vite --host",
    // 启动文档开发服务器（脚手架下会被移除）
    "dev:docs": "pnpm --filter=@gupo-admin/docs docs:dev",
    // 构建开发包
    "build": "vue-tsc && vite build --mode development",
    // 构建测试包
    "build:test": "vite build --mode staging",
    // 构建生产包
    "build:prod": "vite build --mode production",
    // 预览
    "preview": "vite preview",
    // 别管
    "prepare": "simple-git-hooks",
    // 类型检查
    "type-check": "vue-tsc --noEmit -p tsconfig.json --composite false"
  }
}
```

## 目录说明

```bash
├── components
│  └── src
│     ├── svg                       # 存放组件包内使用到的 svg 图标文件
│     ├── table                     # table 组件，此处仅做展示
│     │  └── src
│     │     ├── components
│     │     └── hooks
├── env                             # 环境变量文件
├── packages                        # 包含文档和 cli（脚手架下会被移除）
│  ├── cli
│  └── docs
├── public
├── src                             # 实际开发涉及的目录
│  ├── api                          # 请求方案
│  │  ├── apis                      # 编写 api 的地方
│  │  └── request                   # axios 相关封装
│  │     └── interceptors
│  ├── assets                       # 静态资源
│  │  ├── icons                     # 存放图标
│  │  │  └── sidebar                # 个人用于存放 sidebar 相关的图标
│  │  └── imgs                      # 图片
│  ├── composables                  # 通用 hooks
│  │  └── theme                     # 自定义主题
│  │     └── config                 # 主题配置
│  ├── layout                       # 布局相关
│  │  ├── components
│  │  └── pages                     # 存放和业务无关的页面：401、404...
│  ├── router                       # 路由
│  ├── stores                       # 全局状态
│  ├── styles                       # 全局样式
│  │  └── transition                # vue transition css
│  ├── utils                        # 工具方法
│  └── views                        # 页面
└── types                           # 一些全局类型声明，此处的不需要导入即可使用
```
