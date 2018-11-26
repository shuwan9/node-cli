#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const artTemplate = require('art-template')
const timestamp = require('time-stamp')

let argv = process.argv[2]
let argvArr = argv.split('.')

let camel = getCamel(argvArr)

let data = getData(argv, argvArr, camel)

let pathList = [
  data.configPath,
  data.controllerPath,
  data.htmlPath,
  'index.js',
  data.scssPath
]

let dataList = ['config', 'controller', 'html', 'index', 'scss'].map(item => {
  return artTemplate(
    path.join(__dirname, `../template/ionic1/${item}.art`),
    data
  )
})

fs.mkdir(path.join(process.cwd(), argv), err => {
  if (err) {
    console.log(err)
  } else {
    pathList.forEach((item, index) => {
      fs.writeFile(
        path.join(process.cwd(), argv, item),
        dataList[index],
        err => {
          if (err) {
            console.log(err)
          }
        }
      )
    })
  }
})

/**
 * {
 *  routerConfig,
 *  state,
 *  url,
 *  controller,
 *  className
 *  htmlPath
 *  scssPath,
 *  configPath,
 *  controllerPath
 *  moduleName
 *  module
 * }
 */
function getData(argv, argvArr, camel) {
  return {
    routerConfig: getRouterConfig(camel),
    state: getState(argv),
    url: getUrl(argvArr),
    controller: getController(camel),
    className: getClassName(argv),
    htmlPath: getPath(argv, '', 'html'),
    scssPath: getPath(argv, '', 'scss'),
    configPath: getPath(argv, 'config'),
    controllerPath: getPath(argv, 'controller'),
    moduleName: getModuleName(camel),
    module: getModule(argv),
    date: getDate()
  }
}
function getDate() {
  return timestamp('YYYY-MM-DD HH:mm:ss')
}
function getCamel(argvArr) {
  return argvArr
    .map((item, index) => {
      if (index === 0) {
        return item
      } else {
        return item.charAt(0).toUpperCase() + item.slice(1)
      }
    })
    .join('')
}
function getClassName(argvArr) {
  return argvArr.split('.').join('-')
}
function getRouterConfig(camel) {
  return `${camel}Config`
}
function getState(argv) {
  return argv
}
function getUrl(argvArr) {
  return argvArr[argvArr.length - 1]
}
function getController(camel) {
  return `${camel}Controller`
}
function getPath(argv, type, extension = '.js') {
  return `${argv}.${type}${extension}`
}
function getModuleName(camel) {
  return `${camel}Module`
}
function getModule(argv) {
  return argv
}
