import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$utils = {
    clamp: (a, min = 0, max = 1) => Math.min(max, Math.max(min, a)),
    invlerp (x, y, a) {
      return this.clamp((a - x) / (y - x))
    },
    lerp: (start, end, a) => (1 - a) * start + a * end,
    getRGBAChannel (image, callback, channel = { r: true, g: true, b: true, a: true }) {
      if (!image) {
        callback(null)
        return
      }
      this.urlToImgData(image.data, imageData => {
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
        const newImage = { data: this.imgDataToUrl(imageData), label: image.label }
        callback(newImage)
      })
    },
    getHSLChannel (image, callback, channel = { h: true, s: true, l: true }) {
      if (!image) {
        callback(null)
        return
      }
      this.urlToImgData(image.data, imageData => {
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
        const newImage = { data: this.imgDataToUrl(imageData), label: image.label }
        callback(newImage)
      })
    },
    getImgGradient (image, callback, gradient) {
      if (!image) {
        callback(null)
        return
      }
      // copy last gradient color and append it
      gradient = JSON.parse(JSON.stringify(gradient))
      gradient.push(JSON.parse(JSON.stringify(gradient[gradient.length - 1])))
      gradient[gradient.length - 1].percent = 100

      this.urlToImgData(image.data, imageData => {
        for (let nr = 0; nr < imageData.data.length; nr += 4) {
          const lightness = this.rgbToHsl(imageData.data[nr + 0], imageData.data[nr + 1], imageData.data[nr + 2]).l * 100
          for (let c = 0; c < gradient.length; c++) {
            if (gradient[c].percent > lightness) {
              const min = Math.max(0, c - 1)
              const pos = this.invlerp(gradient[min].percent, gradient[c].percent, lightness) // get pos between two gradient colors
              const rgba1 = this.hexToRgba(gradient[min].color)
              const rgba2 = this.hexToRgba(gradient[c].color)
              imageData.data[nr + 0] = this.lerp(rgba1.r, rgba2.r, pos)
              imageData.data[nr + 1] = this.lerp(rgba1.g, rgba2.g, pos)
              imageData.data[nr + 2] = this.lerp(rgba1.b, rgba2.b, pos)
              imageData.data[nr + 3] = this.lerp(rgba1.a, rgba2.a, pos)
              break
            }
          }
        }
        const newImage = { data: this.imgDataToUrl(imageData), label: image.label }
        callback(newImage)
      })
    },
    imgHasAlpha (image, callback) {
      let found = false
      if (!image) {
        callback(found)
        return
      }
      this.urlToImgData(image.data, imageData => {
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
    resizeImg (image, rect, callback) {
      if (!image) {
        callback(null)
        return
      }
      const img = new Image()
      img.src = image.data
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      img.onload = () => {
        canvas.width = rect.width
        canvas.height = rect.height
        ctx.drawImage(img, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height)
        const newImage = { data: this.imgDataToUrl(ctx.getImageData(0, 0, rect.width, rect.height)), label: image.label }
        callback(newImage)
      }
    },
    lerpColor (a, b, amount) {
      const ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab)
      return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1)
    },
    luminance (r, g, b) {
      const a = [r, g, b].map(function (v) {
        v /= 255
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, 2.4)
      })
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
    },
    contrast (rgb1, rgb2) {
      // https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
      const lum1 = this.luminance(rgb1.r, rgb1.g, rgb1.b)
      const lum2 = this.luminance(rgb2.r, rgb2.g, rgb2.b)
      const brightest = Math.max(lum1, lum2)
      const darkest = Math.min(lum1, lum2)
      return (brightest + 0.05) / (darkest + 0.05)
    },
    contrastColor (hexString) {
      const rgb = this.hexToRgb(hexString)
      return this.contrast(rgb, { r: 255, g: 255, b: 255 }) < 2 ? '#000' : '#fff'
    },
    hexToRgb (hex) {
      const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
      return { r: rgb[0], g: rgb[1], b: rgb[2] }
    },
    hexToRgba (hex) {
      const [r, g, b, a] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
      return { r, g, b, a }
    },
    rgbTohex ({ r, g, b }) {
      r = Math.round(r)
      g = Math.round(g)
      b = Math.round(b)
      r = Math.min(r, 255)
      g = Math.min(g, 255)
      b = Math.min(b, 255)
      return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
    }
  }
})
