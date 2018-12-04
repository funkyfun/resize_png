const path = require('path')

const walk = require('./src/walk')
const program = require('commander')
const resize = require('./src/canvas')
program
  .version('0.0.1')
  .option('-s, --source [source]', 'source dir, 原图片目录或文件地址', './')
  .option('-o, --out [outdir]', 'outfile dir, 处理后文件存放目录')
  .option('-k, --scale [scale]', 'scale, 图片缩放比，默认0.5', 0.5)
  .parse(process.argv)

let source = path.resolve(program.source)

let outPath = program.out
outPath = outPath ? path.resolve(outPath) : path.resolve(source, '../', '__resizepng')

let scale = program.scale || 0.5;

let fileMap = walk(source, outPath)
if (!fileMap.length) {
  console.log(`当前目录没有图片 => ${source} `)
  return
}
fileMap.map(s => resize(s.sourcePath, s.outPath, scale))
