import process from 'node:process'
import path from 'node:path'
import { program } from 'commander'
import inquirer from 'inquirer'
import ora from 'ora'
import simpleGit, { type SimpleGit, type SimpleGitOptions } from 'simple-git'
import chalk from 'chalk'

program.version('1.0.0').option('-t, --template <template>', 'Specify the Vue3 template to use').parse(process.argv)

const repo = `https://github.com/artsmp0/${program.opts().template || 'art-admin-tpl'}`

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  // timeout: {
  //   block: 60000
  // }
}

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
  const git: SimpleGit = simpleGit(gitOptions)
  try {
    await git.clone(repo, projectName, [])
    spinner.succeed(`${repo} downloaded successfully!`)
    // eslint-disable-next-line no-console
    console.log(chalk.green(`Project ${projectName} created successfully!`))
  }
  catch (error) {
    spinner.fail(`Failed to download ${repo}`)
    console.error(chalk.red(error))
  }
})
