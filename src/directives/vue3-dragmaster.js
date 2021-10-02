const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const invlerp = (x, y, a) => clamp((a - x) / (y - x))
const lerp = (start, end, a) => (1 - a) * start + a * end

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

function animate (start, end, duration = 1.0, ease = 'linear', fps = 30, callback, completed) {
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
  animateLoop(props)
}

function animateLoop (props) {
  const now = Date.now()
  if (now < props.endTime) {
    const value = invlerp(props.startTime, props.endTime, now)
    if (props.callback) {
      props.callback(lerp(props.start, props.end, props.ease(value)), value)
    }
    setTimeout(() => {
      animateLoop(props)
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

const dropVMs = []

export const drag = {
  created (el, binding) {
    const vm = binding.instance
    let obj = null
    const oldPos = { x: null, y: null }
    const actualPos = { x: null, y: null }
    const startPos = { x: null, y: null }

    // start drag event
    function startDrag (event) {
      event = event || window.event
      event.preventDefault()

      if (event.target === el) {
        obj = el
        startPos.x = obj.offsetLeft
        startPos.y = obj.offsetTop
        oldPos.x = event.clientX
        oldPos.y = event.clientY
        // start function on drag directive
        if (binding.value.start) {
          binding.value.start(vm)
        }
      }
    }
    window.addEventListener('mousedown', startDrag)

    // drag event
    function onDrag (event) {
      event = event || window.event
      event.preventDefault()

      if (obj) {
        const deltaPos = {
          x: oldPos.x - event.clientX,
          y: oldPos.y - event.clientY
        }
        oldPos.x = event.clientX
        oldPos.y = event.clientY
        actualPos.x = obj.offsetLeft - deltaPos.x
        actualPos.y = obj.offsetTop - deltaPos.y
        obj.style.left = actualPos.x + 'px'
        obj.style.top = actualPos.y + 'px'
        // drag function on drag directive
        if (binding.value.drag) {
          binding.value.drag(actualPos)
        }
      }
    }
    window.addEventListener('mousemove', onDrag)

    function rectOverlap (r1, r2) {
      if (r1.left >= r2.right || r2.left >= r1.right) return false
      if (r1.top >= r2.bottom || r2.top >= r1.bottom) return false
      return true
    }

    function isParentOfChild (parent, child) {
      let node = child.parentNode
      while (node) {
        if (node === parent) {
          return true
        }
        // Traverse up to the parent
        node = node.parentNode
      }
      // Go up until the root but couldn't find the `parent`
      return false
    }

    // stop drag event
    function stopDrag (event) {
      event = event || window.event
      event.preventDefault()

      if (obj) {
        // check overlap of all drop elements
        const dragRect = obj.getBoundingClientRect()
        for (const otherVm of dropVMs) {
          if (otherVm.vm !== vm && !isParentOfChild(obj, otherVm.obj)) { // check only other rects and not direct child
            const dropRect = otherVm.obj.getBoundingClientRect()
            if (rectOverlap(dragRect, dropRect)) {
              // drop function on drag directive
              if (binding.value.drop) {
                binding.value.drop(otherVm.vm)
              }
              // drop function on drop directive
              if (otherVm.drop) {
                otherVm.drop(vm)
              }
            }
          }
        }
        // end function on drag directive
        if (binding.value.end) {
          if (binding.value.end(vm) === false) { // if respond is false bounce back to start position
            const objCopy = obj
            animate(objCopy.offsetLeft, startPos.x, 1, 'easeOutElastic', 50, (value) => {
              objCopy.style.left = value + 'px'
            })
            animate(objCopy.offsetTop, startPos.y, 1, 'easeOutElastic', 50, (value) => {
              objCopy.style.top = value + 'px'
            })
          }
        }
      }
      obj = null
    }
    window.addEventListener('mouseup', stopDrag)

    // store to remove on unbind
    el.events = { startDrag, onDrag, stopDrag }
  },
  unbind (el) {
    el.removeEventListener('mousedown', el.events.startDrag)
    el.removeEventListener('touchstart', el.events.startDrag)
    window.removeEventListener('mouseup', el.events.stopDrag)
  }
}

export const drop = {
  created (el, binding) {
    const obj = el
    const vm = binding.instance
    const drop = binding.value ? binding.value.drop : null
    dropVMs.push({ obj, vm, drop })
  },
  unbind () {
  }
}
