/* eslint-disable no-console */
import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'
import prompts from 'prompts'
import chalk from 'chalk'
import type { Route } from './utils'
import { flatRoute, getParentRoutes } from './utils'

interface Answers {
  name: string
  path: string
  isDetail: boolean
  type: string
  typeName?: string
  apiName?: string
}

export async function generate() {
  const answers = await prompts([
    {
      type: 'text',
      name: 'name',
      message: '路由名称（meta.name）',
      validate: (input: string) => input ? true : '请输入路由名称',
    },
    {
      type: 'text',
      name: 'path',
      message: '路由路径（/Project/Standard）',
      validate: (input: string) => input ? true : '请输入路由路径',
    },
    {
      type: 'select',
      name: 'type',
      message: '页面类型',
      choices: [
        {
          title: '空白页',
          value: 'empty-page',
        },
        {
          title: '列表页',
          value: 'table-page',
        },
      ],
    },
    {
      type: prev => prev === 'table-page' ? 'text' : null,
      name: 'typeName',
      message: '列表类型名称：',
      validate: (input: string) => input ? true : '请输入路由路径',
    },
    {
      type: prev => prev ? 'text' : null,
      name: 'apiName',
      message: '接口名称（定义在 backend.ts 中的 URLS）：',
      validate: (input: string) => input ? true : '请输入接口名称',
    },
    {
      type: 'toggle',
      name: 'isDetail',
      initial: false,
      message: '是否是详情页',
      active: 'yes',
      inactive: 'no',
    },
  ]) as Answers

  if (answers.isDetail === undefined) {
    return
  }
  try {
    await genRoute(answers)
    await genPage(answers)
    console.log(chalk.bgGreen(`\n\n页面『${answers.path}/index.vue』生成成功！\n`))
  }
  catch (error) {
    console.log(chalk.red('\n页面生成失败！'))
  }
}

/** 生成路由 */
async function genRoute(answers: Answers) {
  try {
    const mockFilePath = path.resolve(process.cwd(), `src/router/mock.json`)
    const mockData = JSON.parse(await fs.promises.readFile(mockFilePath, 'utf-8'))
    const flatRoutes = flatRoute(mockData.router)
    const targetChild = flatRoutes.find(r => r.path.includes(answers.path))
    if (targetChild) {
      console.log(chalk.red(`已经存在路径为「${targetChild.path}」的子路径，添加失败！`))
      return
    }
    const newRoute: Route = {
      path: answers.path,
      meta: {
        title: answers.name,
        hideInMenu: answers.isDetail,
        hideInTab: answers.isDetail,
      },
      children: [],
    }
    const parents = getParentRoutes(flatRoutes, newRoute.path)
    if (parents.length === 0) {
      mockData.router = [...mockData.router, newRoute]
    }
    else {
      const parent = parents.at(-1)!
      parent.meta.isPage = true
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(newRoute)
    }
    await fs.promises.writeFile(mockFilePath, JSON.stringify(mockData, null, 2))
  }
  catch (e: any) {
    console.error(e)
    return Promise.reject(e)
  }
}

/** 生成页面 */
async function genPage(answers: Answers) {
  try {
    const pagePath = path.resolve(process.cwd(), `src/views/${answers.path}/index.vue`)
    const pageDirPath = path.resolve(process.cwd(), `src/views/${answers.path}`)
    if ((fs.existsSync(pagePath))) {
      console.log(chalk.red(`已经存在路径为「${pagePath}」的页面，添加失败！`))
      return
    }
    const tplPath = path.resolve(__dirname, `../templates/${answers.type}.hbs`)
    let tplContent = await fs.promises.readFile(tplPath, 'utf-8')
    if (answers.typeName) {
      tplContent = tplContent.replaceAll('{{typeName}}', answers.typeName)
    }
    if (answers.apiName) {
      tplContent = tplContent.replaceAll('{{apiName}}', answers.apiName)
    }
    tplContent = tplContent.replaceAll('{{filepath}}', answers.path)
    await fs.promises.mkdir(pageDirPath, { recursive: true })
    await fs.promises.writeFile(pagePath, tplContent)
  }
  catch (e: any) {
    console.error(e)
    return Promise.reject(e)
  }
}
