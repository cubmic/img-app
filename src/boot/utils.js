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
    },
    hslToRgb (h, s, l) {
      let r, g, b
      if (s === 0) {
        r = g = b = l // achromatic
      } else {
        function hue2rgb (p, q, t) {
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1 / 6) return p + (q - p) * 6 * t
          if (t < 1 / 2) return q
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
          return p
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
      }
      return { r: r * 255, g: g * 255, b: b * 255 }
    },
    resizeImg (urlData, rect, callback) {
      const img = new Image()
      img.src = urlData
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      img.onload = () => {
        canvas.width = rect.w
        canvas.height = rect.h
        ctx.drawImage(img, rect.l, rect.t, rect.w, rect.h, 0, 0, rect.w, rect.h)
        callback(this.imgDataToUrl(ctx.getImageData(0, 0, rect.w, rect.h)))
      }
    }
  }
})
