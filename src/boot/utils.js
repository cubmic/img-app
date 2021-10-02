import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$utils = {
    getChannel (src, callback, channel = { r: true, g: true, b: true, a: true }) {
      // <canvas id="canvas" v-show="false"></canvas>
      const img = new Image()
      img.src = src
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        for (let nr = 0; nr < imageData.data.length; nr += 4) {
          imageData.data[nr + 0] = channel.r ? imageData.data[nr + 0] : 0 // r
          imageData.data[nr + 1] = channel.g ? imageData.data[nr + 1] : 0 // g
          imageData.data[nr + 2] = channel.b ? imageData.data[nr + 2] : 0 // b
          imageData.data[nr + 3] = channel.a ? imageData.data[nr + 3] : 255 // a
        }
        ctx.putImageData(imageData, 0, 0)
        callback(canvas.toDataURL())
      }
    }
    /*
    resizeImg () {
      canvas.width = dstWidth
      canvas.height = dstHeight
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, dstWidth, dstHeight)
    }
    */
  }
})
