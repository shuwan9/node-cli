const exec = require('child_process').exec
const iconv = require('iconv-lite')

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { encoding: 'buffer' }, (error, stdout, stderr) => {
      if (error) {
        reject(iconv.decode(stderr, 'cp936'))
      } else {
        resolve(iconv.decode(stdout, 'cp936'))
      }
    })
  })
}

module.exports = execCommand
