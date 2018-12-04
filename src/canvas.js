const fs = require('fs-extra')
const { createCanvas, loadImage } = require('canvas')

async function resize(source, output, scale = 1){
  let img = await loadImage(source)
  let {width, height} = img;
  width = Math.floor(width * scale)
  height = Math.floor(height * scale)
  let canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true

  ctx.drawImage(img, 0, 0, width, height)
  await fs.ensureFile(output)
  let out = fs.createWriteStream(output)
  canvas.createPNGStream().pipe(out)

  out.on('finish',() => {
    console.log(`${source} =>  ${output}`)
  })
  out.on('error', err => {
    console.log(`${source} 转换失败`)
    console.error(err)
  })
}

module.exports = resize
