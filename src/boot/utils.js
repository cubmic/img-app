import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$utils = {
    getChannel (urlData, callback, channel = { r: true, g: true, b: true, a: true }) {
      this.urlToImgData(urlData, imageData => {
        for (let nr = 0; nr < imageData.data.length; nr += 4) {
          if (!(channel.r && channel.g && channel.b && channel.a)) {
            let k = null
            if (channel.r) {
              k = 0
            } else if (channel.g) {
              k = 1
            } else if (channel.b) {
              k = 2
            } else if (channel.a) {
              k = 3
            }
            imageData.data[nr + 0] = imageData.data[nr + k]
            imageData.data[nr + 1] = imageData.data[nr + k]
            imageData.data[nr + 2] = imageData.data[nr + k]
            imageData.data[nr + 3] = 255 // a
          }
        }
        this.imgDataToUrl(imageData, urlData => {
          callback(urlData)
        })
      })
    },
    urlToImgData (urlData, callback) {
      const img = new Image()
      img.src = urlData
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)
        callback(ctx.getImageData(0, 0, img.width, img.height))
      }
    },
    imgDataToUrl (imageData, callback) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = imageData.width
      canvas.height = imageData.height
      ctx.putImageData(imageData, 0, 0)
      callback(canvas.toDataURL())
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
