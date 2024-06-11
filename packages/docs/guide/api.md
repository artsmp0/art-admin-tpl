# API 请求

> 对于 `axios` 的封装以及使用均在 `src/api` 目录中。

## 目录结构

```bash
 api
├──  index.ts                     # 接口模块文件整合导出
├──  apis                         # 存放接口请求文件，可以根据自己需要选择按模块分割或者统一放在 common 文件中
│  ├──  auth.ts                   # 用户权限相关的接口，一般不需要动
│  ├──  common.ts                 # 普通接口，放在一个文件是为了保证接口的唯一性，避免重复定义
│  └──  types.ts                  # 接口请求和响应参数的类型定义。当然你也可以分模块存储。
└──  request                      # 封装 axios
   ├──  index.ts                  # 导出 get、post、request三个方法便于使用
   ├──  interceptors              # 存放拦截器
   │  ├──  add-auth-header.ts     # 请求开始前添加一些请求头
   │  ├──  parse-args.ts          # 解析路径参数
   │  ├──  repeat-req.ts          # 重复请求处理
   │  └──  api-result.tsx         # 请求结果处理
   ├──  request.ts                # axios 封装及类型支持
   └──  types.ts                  # 存放封装 axios 时用到的类型，以及请求结果的基础形状和分页参数的基础形状。
```

## 如何定义一个接口模块？

此处以 `common` 模块举例：

新建文件，例如 `api/apis/user.ts`，填入如下内容。 `get`、`post`、`pathArgGet`均是 `request` 方法的快解封装，仅仅只是为了减少类型参数的定义。

```ts
import { get, pathArgGet, post } from '../request'

import type { BaseRes, PageParams } from '../request/types'
import type { TableItem } from './types'

export const enum URLS {
  getTest = '/api/get',
  postTest = '/api/post',
  tableList = '/tag/tb/bind/list',
  userInfo = '/api/user/{id}',
}

export default {
  /** 演示 get 分页请求 */
  [URLS.tableList]: (() => {
    return (params: PageParams<any>): Promise<any> => {
      const { page, size } = params.params
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: 'ok',
            code: 200,
            data: {
              total: 1000,
              list: Array.from({ length: 20 }).map((item, idx) => ({
                id: size * (page - 1) + idx,
                1: `名字${size * (page - 1) + idx}`,
                2: `描述${size * (page - 1) + idx}`,
                3: `数据量${size * (page - 1) + idx}`,
                4: `占用磁盘${size * (page - 1) + idx}`,
                5: `最近更新时间${size * (page - 1) + idx}`,
              })),
            },
          })
        }, 2000)
      })
    }
  })(),
  /** 演示 get 普通请求 */
  [URLS.getTest]: get<BaseRes<TableItem>, { search?: string, xx?: string }>(URLS.getTest),
  /** 演示 post 请求 */
  [URLS.postTest]: post<BaseRes<boolean>, { username: string, password: string }>(URLS.postTest),
  /** 此处演示路径参数的请求方式，此种写法等同于改行下的注释 */
  [URLS.userInfo]: pathArgGet<BaseRes<TableItem>, URLS.userInfo>(URLS.userInfo),
  // [URL.userInfo]: request<BaseRes<TableItem>, undefined, undefined, URL.userInfo>({ url: URL.userInfo })
}
```

> 请注意，当使用该模板进行接口请求时，请先根据后端接口适配 `api/request/types.ts` 文件里的三个类型： `BaseRes`、`PageParams`、`PageRes`。

还有记得查看 `src/api/request/resHandler.tsx` 文件，根据 `BaseRes` 修改的结果修改如下行代码：

```ts
// 业务错误直接这里报错的话，要求后端 msg 必填
// (response.config as unknown as any).showMessage && message.error(**data.message**);
```

## 如何使用一个接口定义？

在任意文件中先引入 APIS，然后跟随 ts 提示一步步 enter 下去即可。如下是示例请求：

```html
<script setup lang="ts">
  import { GpPageWrapper } from '@/components';
  import Md from './markdown.md';
  import { APIS } from '@/api';
  import { URLS } from '@/api/apis/common';

  // 演示 get path arg
  APIS.common[URLS.userInfo]({ args: { id: 1 } });
  // 演示 get query
  APIS.common[URLS.getTest]({ params: { search: 'xxx' } });
  // 演示 post
  APIS.common[URLS.postTest]({ data: { password: 'xxx', username: 'artsmp' } });
</script>
```
