/* eslint-disable no-console */
import path from 'node:path'
import process from 'node:process'
import * as dotenv from 'dotenv'
import semver from 'semver'
import chalk from 'chalk'
import prompts from 'prompts'
import { git } from './git'

const PADDING = 13
export async function releaseVersion(options: any) {
  let envPath = ''
  if (options.mode) {
    envPath = path.resolve(process.cwd(), `env/.env.${options.mode}`)
  }
  else {
    envPath = path.resolve(process.cwd(), 'env/.env')
  }
  const { parsed: { OSS_TAG } } = dotenv.config({ path: envPath }) as any
  if (!OSS_TAG) {
    console.log(chalk.red('请配置环境变量：OSS_TAG'))
    process.exit()
  }
  try {
    const status = await git.status()
    if (!status.isClean()) {
      console.log(chalk.yellow('There are uncommitted files in the staging area! [请先提交变更！]'))
      return
    }
    await git.cwd(process.cwd())
    let currentVersion = '0.0.0'
    await git.fetch('origin')
    const tags = await git.tags()
    if (tags.all.length > 0) {
      const filteredTags = tags.all.filter(tag => tag.includes(OSS_TAG)).map(item => item.replace(OSS_TAG, ''))
      const sortedTags = filteredTags.sort((a, b) => semver.compare(semver.coerce(a)!, semver.coerce(b)!))
      currentVersion = sortedTags[sortedTags.length - 1]
    }
    const answers = await prompts([
      {
        type: 'autocomplete',
        name: 'release',
        message: `Current version ${chalk.green(OSS_TAG + currentVersion)}`,
        choices: [
          { value: 'patch', title: `${'patch'.padStart(PADDING, ' ')} ${chalk.bold(semver.inc(currentVersion, 'patch'))}` },
          { value: 'minor', title: `${'minor'.padStart(PADDING, ' ')} ${chalk.bold(semver.inc(currentVersion, 'minor'))}` },
          { value: 'major', title: `${'major'.padStart(PADDING, ' ')} ${chalk.bold(semver.inc(currentVersion, 'major'))}` },
          { value: 'custom', title: 'custom ...'.padStart(PADDING + 4, ' ') },
        ],
      },
      {
        type: prev => prev === 'custom' ? 'text' : null,
        name: 'custom',
        message: '请输入新版本号：',
        initial: currentVersion,
        validate: (custom: string) => {
          return semver.valid(custom) ? true : 'That\'s not a valid version number'
        },
      },
    ]) as {
      release: any
      custom?: string
    }
    const { release, custom } = answers
    console.log('custom: ', release, custom, currentVersion)
    if (!release || (release === 'custom' && !custom)) {
      console.log(chalk.red('没有发布任何内容！'))
      return
    }
    const newTag = OSS_TAG + (custom || semver.inc(currentVersion, release))
    await git.addTag(newTag)
    await git.push('origin')
    await git.pushTags('origin')
    console.log(chalk.green(`发布成功，最新的标签是：`, chalk.bgGreen(newTag)))
  }
  catch (error) {
    console.log(chalk.red('发布失败！\n'), error)
  }
}
