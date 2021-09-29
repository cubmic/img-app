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
    },
    appendToWithSameGlobalPos (obj, newParent) {
      const objRect = obj.getBoundingClientRect()
      const newParentRect = newParent.getBoundingClientRect()
      newParent.append(obj)
      obj.style.left = (objRect.left - newParentRect.left) + 'px'
      obj.style.top = (objRect.top - newParentRect.top) + 'px'
    }
  }
})
