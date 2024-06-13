import { program } from 'commander'
import pkgJson from '../package.json'
import { createProject } from './create-project'
import { releaseVersion } from './release'

program.version(pkgJson.version).description('一个有关 Art-Admin-Tpl 的 CLI 工具集合')

program.command('new').description('create a new project [创建一个新项目]').action(createProject)

program.command('release')
  .option('-m, --mode <string>', 'env 环境变量模式', '')
  .description('release a new version [发布一个新版本]')
  .action(releaseVersion)

program.parse()
