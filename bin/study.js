#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const program = require('commander')

program.version('0.0.1')

program.command('vue <name>').action(name => {
  let template = path.resolve(__dirname, '../template/study/vue/1.html')
  let target = path.resolve(process.cwd(), `./${name}.html`)
  fs.createReadStream(template).pipe(fs.createWriteStream(target))
})

program.parse(process.argv)
