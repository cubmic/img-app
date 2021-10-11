import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$utils = {
    getRGBAChannel (urlData, callback, channel = { r: true, g: true, b: true, a: true }) {
      this.urlToImgData(urlData, imageData => {
        for (let nr = 0; nr < imageData.data.length; nr += 4) {
          // rgba
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
        callback(this.imgDataToUrl(imageData))
      })
    },
    getHSLChannel (urlData, callback, channel = { h: false, s: false, l: false }) {
      this.urlToImgData(urlData, imageData => {
        for (let nr = 0; nr < imageData.data.length; nr += 4) {
          // hsl
          if (!(channel.h && channel.s && channel.l)) {
            const hsl = this.rgbToHsl(imageData.data[nr + 0], imageData.data[nr + 1], imageData.data[nr + 2])
            let v = null
            if (channel.h) {
              v = hsl.h * 256
            } else if (channel.s) {
              v = hsl.s * 256
            } else if (channel.l) {
              v = hsl.l * 256
            }
            imageData.data[nr + 0] = v
            imageData.data[nr + 1] = v
            imageData.data[nr + 2] = v
            imageData.data[nr + 3] = 255
          }
        }
        callback(this.imgDataToUrl(imageData))
      })
    },
    imgHasAlpha (urlData, callback) {
      this.urlToImgData(urlData, imageData => {
        let found = false
        for (let nr = 0; nr < imageData.data.length; nr += 4) {
          if (imageData.data[nr + 3] < 255) {
            found = true
            break
          }
        }
        callback(found)
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
    imgDataToUrl (imageData) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = imageData.width
      canvas.height = imageData.height
      ctx.putImageData(imageData, 0, 0)
      return canvas.toDataURL()
    },
    rgbToHsl (r, g, b) {
      r /= 255
      g /= 255
      b /= 255
      const max = Math.max(r, g, b), min = Math.min(r, g, b)
      const l = (max + min) / 2
      let h, s = l
      if (max === min) {
        h = s = 0 // achromatic
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }
      return { h, s, l }
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
