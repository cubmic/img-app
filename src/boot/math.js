import { boot } from 'quasar/wrappers'

const EasingFunctions = {
  // https://gist.github.com/gre/1650294
  linear: t => t, // no easing, no acceleration
  easeInQuad: t => t * t, // accelerating from zero velocity
  easeOutQuad: t => t * (2 - t), // decelerating to zero velocity
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // acceleration until halfway, then deceleration
  easeInCubic: t => t * t * t, // accelerating from zero velocity
  easeOutCubic: t => (--t) * t * t + 1, // decelerating to zero velocity
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // acceleration until halfway, then deceleration
  easeInQuart: t => t * t * t * t, // accelerating from zero velocity
  easeOutQuart: t => 1 - (--t) * t * t * t, // decelerating to zero velocity
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t, // acceleration until halfway, then deceleration
  easeInQuint: t => t * t * t * t * t, // accelerating from zero velocity
  easeOutQuint: t => 1 + (--t) * t * t * t * t, // decelerating to zero velocity
  easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t, // acceleration until halfway, then deceleration
  // https://easings.net/de
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutElastic: t => { const c4 = (2 * Math.PI) / 3; return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1 },
  easeOutBounce: t => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },
  easeOutBack: t => { const c1 = 1.70158; const c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) }
}

const $math = {
  floatOperations (a, b, op) {
    const fa = ('' + a).replace(/^[^.]*./, '').length
    const fb = ('' + b).replace(/^[^.]*./, '').length
    const factor = Math.max(fa, fb)
    const multiply = Math.pow(10, factor)
    const a2 = Math.round(a * multiply)
    const b2 = Math.round(b * multiply)
    let result = null
    switch (op) {
      case '+':
        result = (a2 + b2) / multiply
        break
      case '-':
        result = (a2 - b2) / multiply
        break
      case 'x':
        result = a2 * b2 / Math.pow(multiply, 2)
        break
      case '??':
        result = a2 / b2
        break
      case '%':
        result = a2 * b2 / Math.pow(multiply, 2) / 100
        break
      case '>':
        result = Math.max(a, b)
        break
      case '<':
        result = Math.min(a, b)
        break
      case '=':
        result = (a2 + b2) / multiply / 2
        break
    }
    return result
  },
  appendToWithSameGlobalPos (obj, newParent) {
    const objRect = obj.getBoundingClientRect()
    const newParentRect = newParent.getBoundingClientRect()
    newParent.append(obj)
    obj.style.left = (objRect.left - newParentRect.left) + 'px'
    obj.style.top = (objRect.top - newParentRect.top) + 'px'
  },
  clamp: (a, min = 0, max = 1) => Math.min(max, Math.max(min, a)),
  invlerp (x, y, a) {
    if (x === y) {
      return 0.5
    }
    return this.clamp((a - x) / (y - x))
  },
  lerp: (start, end, a) => (1 - a) * start + a * end,
  radiansToDegrees (radians) {
    return radians * (180 / Math.PI)
  },
  degreesToRadians (degrees) {
    return degrees / (Math.PI / 180)
  },
  distanceBetween (p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
  },
  degreesBetween (p1, p2) {
    return ((((Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI) - 90) + 360) % 360
  },
  angleBetween (p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
  },
  addPos (p1, p2) {
    return { x: p1.x + p2.x, y: p1.y + p2.y }
  },
  subtractPos (p1, p2) {
    return { x: p1.x - p2.x, y: p1.y - p2.y }
  },
  animate (start, end, duration = 1.0, ease = 'linear', fps = 30, callback, completed) {
    const now = Date.now()
    const props = {
      start: start,
      end: end,
      duration: duration,
      ease: EasingFunctions[ease],
      callback: callback,
      completed: completed,
      frame: 1000 / fps,
      startTime: now,
      endTime: now + duration * 1000 // durtion in milisec
    }
    $math.animateLoop(props)
  },
  animateLoop (props) {
    const now = Date.now()
    if (now < props.endTime) {
      const value = $math.invlerp(props.startTime, props.endTime, now)
      if (props.callback) {
        if (typeof props.start === 'object') {
          const obj = {}
          for (const key of Object.keys(props.start)) {
            obj[key] = $math.lerp(props.start[key], props.end[key], props.ease(value))
          }
          props.callback(obj, value)
        } else {
          props.callback($math.lerp(props.start, props.end, props.ease(value)), value)
        }
      }
      setTimeout(() => {
        $math.animateLoop(props)
      }, props.frame)
    } else {
      if (props.callback) {
        props.callback(props.end, 1.0)
      }
      if (props.completed) {
        props.completed()
      }
    }
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$math = $math
})

export { $math }
