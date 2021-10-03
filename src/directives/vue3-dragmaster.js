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
          binding.value.end(vm)
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
