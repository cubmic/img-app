const dropVMs = []

const removeFromArray = function (array, value) {
  const idx = array.indexOf(value)
  if (idx !== -1) {
    array.splice(idx, 1)
  }
  return array
}

const distance = function (pos1, pos2) {
  const x = pos1.x - pos2.x
  const y = pos1.y - pos2.y
  return Math.sqrt(x * x + y * y)
}

export const drag = {
  created (el, binding) {
    const vm = binding.instance
    let obj = null
    const oldPos = { x: null, y: null }
    const actualPos = { x: null, y: null }
    const startPos = { x: null, y: null }
    const startMousePos = { x: null, y: null }

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
        startMousePos.x = event.pageX
        startMousePos.y = event.pageY
        // start function on drag directive
        if (binding.value && binding.value.start) {
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
        if (binding.value && binding.value.bounds) {
          const bounds = typeof binding.value.bounds === 'function' ? binding.value.bounds() : binding.value.bounds
          actualPos.x = Math.max(bounds.left, Math.min(bounds.right, actualPos.x))
          actualPos.y = Math.max(bounds.top, Math.min(bounds.bottom, actualPos.y))
        }
        if (!(binding.value && binding.value.xLock)) {
          obj.style.left = actualPos.x + 'px'
        }
        if (!(binding.value && binding.value.yLock)) {
          obj.style.top = actualPos.y + 'px'
        }
        // drag function on drag directive
        if (binding.value && binding.value.drag) {
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
          if (otherVm.obj !== obj && !isParentOfChild(obj, otherVm.obj)) { // check only other rects and not direct child
            const dropRect = otherVm.obj.getBoundingClientRect()
            if (rectOverlap(dragRect, dropRect)) {
              // drop function on drag directive
              if (binding.value && binding.value.drop) {
                binding.value.drop(otherVm.obj, otherVm.vm)
              }
              // drop function on drop directive
              if (otherVm.drop) {
                otherVm.drop(obj, vm)
              }
              break
            }
          }
        }

        // end function on drag directive
        if (binding.value && binding.value.end) {
          const moveDelta = {
            x: event.pageX - startMousePos.x,
            y: event.pageY - startMousePos.y
          }
          const moveDistance = distance(startMousePos, { x: event.pageX, y: event.pageY })
          binding.value.end(vm, moveDelta, moveDistance)
        }
      }
      obj = null
    }
    window.addEventListener('mouseup', stopDrag)

    // store to remove on unbind
    el.events = { startDrag, onDrag, stopDrag }
  },
  unmounted (el) {
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
  unmounted (el) {
    removeFromArray(dropVMs, el)
  }
}
