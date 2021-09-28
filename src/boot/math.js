import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.config.globalProperties.$math = {
    floatAdd (a, b) {
      const fa = ('' + a).replace(/^[^.]*./, '').length
      const fb = ('' + b).replace(/^[^.]*./, '').length
      const f = Math.max(fa, fb)
      return (a + b).toFixed(f)
    },
    floatSub (a, b) {
      const fa = ('' + a).replace(/^[^.]*./, '').length
      const fb = ('' + b).replace(/^[^.]*./, '').length
      const f = Math.max(fa, fb)
      return (a - b).toFixed(f)
    }
  }
})
