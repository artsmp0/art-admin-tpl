# 路由和菜单

## 路由

项目路由相关的文件均存放在 `src/router` 文件夹中。路由创建后，需要在 views/下创建同名文件夹。例如创建了个路由： `/Project/Detail` 那对应的路径是 `views/Project/Detail/index.vue`。

```bash
# 存放默认路由（一般把一些白名单路由放在这里）和后备路由（不存在的路由统一被这个路由捕获并展示404页面）
├── fallback-routes.ts
# 路由守卫，包含鉴权和国密的逻辑
├── index.ts
# 本地开发时使用的路由，上线时需上传到用户中心
└── mock.json
```

##  路由配置详解

每一个路由都可以有如下的配置信息：
```json
{
  // 必须存在路径：他会被解析成：路径 -> /project/standard-list 路由名称 -> Project.StandardList
  "path": "/Project/StandardList",
  // 请看下面
  "meta": {},
  // 嵌套路由
  "children": []
}
```

他的 `meta` 中可以包含如下内容：

```ts
interface RouteMeta {
  /** 页面标题(菜单项和标签页标题) 必填，用户中心需要展示 */
  title: string
  /** 菜单图标：例如 sidebar-dashboard -> assets/icons/sidebar/dashboard.svg */
  icon?: string
  /** 是否进行页面保活，如果是数组，只有在进入指定页面才会进行保活操作 */
  keepAlive?: boolean | string[]
  /** 是否在 标签栏 隐藏 */
  hideInTab?: boolean
  /** 是否在 菜单栏 显示徽标数 */
  badge?: number
  /** 是否在菜单栏中隐藏：比如详情页 */
  hideInMenu?: boolean
  /** 作为父路由是否本身拥有界面 */
  isPage?: boolean
  /** 默认采取 mock -> router -> 第一项作为首页，这个就是为了支持你自定义首页而不是默认第一项 */
  isIndex?: boolean
  /** 和 path 类似，有时候我们不想用 path 转换成的文件，可以使用这个字段来寻找真实的文件，例如🌰：多个页面指向同一个组件的时候 */
  component?: string
  /** 手动指定要高亮的菜单项 */
  activeMenu?: string
  /** 微应用类型，vite 子应用需要设置为 true */
  isVite?: boolean
  /** 微应用模式：对应子应用要访问的路径 */
  micro?: string
  /** iframe 模式：对应子应用要访问的路径 */
  iframe?: string
  /** 访问的子应用的资源空间名称：例如：http://192.168.6.116:15728/dp-asset-pc-xinjin/#/datasource，对应的就是：dp-asset-pc-xinjin  */
  microName?: string
}
```

###  配置基础路由

此处以一个包含嵌套菜单和详情页的结构举例：
1. 【项目管理】只是作为菜单的一个父级，没有实际页面，若存在实际页面，则需要添加 isPage 标识。
2. 【标准项目】才是一个有页面的菜单，它仅针对【标准项目详情】这个页面，也就是他的详情页进行缓存。
3. 【标准项目详情】这个页面是属于【标准项目】的详情，详情页必须要配置 `hideInMenu` 和 `hideInTab`。

```json
{
  "path": "/Project",
  "meta": {
    "title": "项目管理",
    "icon": "sidebar-project"
  },
  "children": [
    {
      "path": "/Project/Standard",
      "meta": {
        "title": "标准项目",
        "icon": "sidebar-standard",
        "keepAlive": ["/Project/Standard/Detail"]
      },
      "children": [
        {
          "path": "/Project/Standard/Detail",
          "meta": {
            "title": "标准项目详情",
            "hideInMenu": true,
            "hideInTab": true
          }
        }
      ]
    }
  ]
}
```

### 配置 iframe 路由

路由菜单也支持配置 `iframe` 页面，示例如下：

```json
{
  "path": "/bbb",
  "meta": {
    "iframe": "https://www.naiveui.com/zh-CN/os-theme/components/button",
    "title": "iframe 页面",
    "icon": "sidebar-dashboard"
  },
  "children": []
}
```

### 配置 微应用 路由

同时也支持微应用的嵌入，示例如下。注意此时需要修改 `src/layout/pages/MicroPage.vue` 中的 `url` 为你访问的子应用的地址。

```ts
// ...
const url = computed(() => {
  // 替换此处的 http://localhost:5173/
  return !import.meta.env.VITE_LOGIN_URL ? 'http://localhost:5173/' : `${new URL(import.meta.env.VITE_LOGIN_URL).origin}/${route.meta.microName}`
})
// ...
```

```json
{
  "path": "/aaa",
  "meta": {
    "micro": "/#/demo/search",
    "title": "动态微应用",
    "icon": "sidebar-dashboard",
    "microName": "std-pc",
    "isVite": true
  },
  "children": []
}
```

## 高亮菜单项配置

优先级：`路由参数 > meta.activeMenu > 自动选择父级`

此处只展示路由参数配置：

```ts
const router = useRouter()
router.push({
  name: 'Project.Detail',
  query: { activeMenu: '/Standard' }
})
```
