const path = require('path')
const fs = require('fs-extra')

let fileMap = []
let _source = './'
let _outPath = './'

function _walk(filePath) {
  let isDir = fs.statSync(filePath).isDirectory()
  if (isDir) {
    fs.readdirSync(filePath)
      .map(name => {
        name = `${filePath}${path.sep}${name}`
        _walk(name)
      });
  } else {
    if (filePath.match(/(\.png|\.jpg|\.jpeg)$/)) {
      let pathAdd = filePath.replace(_source, '')
      let op = _outPath
      if (pathAdd != '') {
        op = path.join(op, pathAdd)
      }
      fileMap.push({sourcePath: filePath, outPath: op})
    }
  }
}
function walk(source ,outPath) {
  if (outPath && typeof outPath == 'string') _outPath = outPath
  if (outPath && typeof outPath == 'string') _source = source
  _walk(source)
  return fileMap
}
module.exports = walk
