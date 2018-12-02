/**
 * os.homedir()
 * process.chdir()
 */

const path = require('path')
const os = require('os')
const exec = require('child_process').exec
const test = () => {
  let cwd = process.cwd()
  let homedir = os.homedir()
  console.log('cwd', cwd, path.resolve(process.cwd()))
  console.log('homedir', homedir)
  process.chdir(`D:/2018-11-20`)
  exec('mkdir test', (error, stdout, stderr) => {
    if (error) {
      console.log('error:', error)
    } else {
      console.log(stdout, stderr)
    }
  })
}
test()
