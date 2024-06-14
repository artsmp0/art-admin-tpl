/* eslint-disable no-console */
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs/promises'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import { git } from './git'

export function createProject() {
  const repo = `https://github.com/artsmp0/art-admin-tpl`

  const shouldDeleteScripts = ['build:comp', 'dev:docs']

  inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: input => !!input,
    },
  ]).then(async (answers) => {
    const spinner = ora(`Downloading ${repo}...`).start()
    const projectName = answers.projectName
    try {
      await git.clone(repo, projectName, ['--depth', '1'])
      spinner.succeed(`${repo} downloaded successfully!`)
      const packageDir = path.join(process.cwd(), projectName, 'packages')
      const pkgJsonPath = path.join(process.cwd(), projectName, 'package.json')
      const gitDir = path.join(process.cwd(), projectName, '.git')
      await fs.rm(packageDir, { recursive: true, force: true })
      await fs.rm(gitDir, { recursive: true, force: true })
      const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath, 'utf-8'))
      if (pkgJson.scripts)
        shouldDeleteScripts.forEach(s => delete pkgJson.scripts[s])
      await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
      await git.cwd(path.join(process.cwd(), projectName))
      await git.init()
      await git.add('.')
      await git.commit('chore: init')
      console.log(chalk.green(`Project ${projectName} created successfully!`))
    }
    catch (error) {
      spinner.fail(`Failed to download ${repo}`)
      console.error(chalk.red(error))
    }
  })
}