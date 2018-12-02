/**
 * child_process.exec
 */

const exec = require('child_process').exec
const iconv = require('iconv-lite')
exec(
  'cd bin&&mkdir test&&cd test&&git init&&git remote add origin https://vue5456:sw1260593926@github.com/vue5456/node-module-test.git&&git pull origin master',
  { encoding: 'buffer' },
  (err, stdout, stderr) => {
    console.log(
      err,
      iconv.decode(stdout, 'cp936'),
      iconv.decode(stderr, 'cp936')
    )
  }
)
