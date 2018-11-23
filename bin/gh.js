#!/usr/bin/env node

const program = require('commander')
const execCommand = require('./lib/exec')

const { MyGithub } = require('./lib/github')
const myGithub = new MyGithub()

const { getCloneCommand, getCommitCommand } = require('./lib/helper')

const { username, pwd } = require('./lib/config')

program.version('0.0.1')

program.command('clone <project>').action(project => {
  execCommand(getCloneCommand(project, username, pwd)).then(
    stdout => {
      console.log(stdout)
    },
    stderr => {
      console.log(stderr)
    }
  )
})

program
  .command('new <project>')
  .alias('n')
  .action(project => {
    createNewProject(project)
  })
program
  .command('delete <project>')
  .alias('de')
  .action(project => {
    myGithub.deleteRepo(project)
  })

program
  .command('commit <msg> [otherMsg...]')
  .alias('cm')
  .action((msg, otherMsg) => {
    execCommand(getCommitCommand(`${msg} ${otherMsg.join(' ')}`)).then(
      stdout => {
        console.log(stdout)
      },
      stderr => {
        console.log(stderr)
      }
    )
  })

program.parse(process.argv)

function createNewProject(project) {
  myGithub
    .createRepo(project)
    .then(stdout => {
      return execCommand(getCloneCommand(project, username, pwd))
    })
    .then(stdout => {
      return execCommand(`cd ${project}&&npm init -y`)
    })
    .then(stdout => {
      return execCommand(
        `cd ${project}&&git add .&&git commit -m "first commit"&&git push -u origin master`
      )
    })
    .then(stdout => {
      console.log(stdout)
    })
}
