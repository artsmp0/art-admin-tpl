import process from 'node:process'
import simpleGit, { type SimpleGit, type SimpleGitOptions } from 'simple-git'

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
}
export const git: SimpleGit = simpleGit(gitOptions)
