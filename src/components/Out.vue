<template>
  <div class="dot-bg bg-grey-8">
    <div class="dot only-allow-in-dot bg-positive" :class="{ 'dot-drag': drag }" v-drag="dragDefs" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Out',
  props: {
    key: String
  },
  data () {
    return {
      drag: false,
      hit: false,
      dragDefs: {
        start: (vm) => {
          this.drag = true
          this.hit = false
          // set parent item also to drag state
          vm.$el.closest('.item').classList.add('item-drag')
        },
        drag: (pos) => {
        },
        end: (vm) => {
          this.drag = false
          // set parent item back to none drag state
          vm.$el.closest('.item').classList.remove('item-drag')

          return false // force animation to back
        },
        drop: (vm) => {
          if (vm.$el.classList.contains('only-allow-out-dot')) {
            // this.$math.appendToWithSameGlobalPos(obj, vm.$el)
            console.log('drag', vm.$el)
            this.hit = true
          }
        }
      }
    }
  }
})
</script>

<style scoped>
.dot-bg {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.dot {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #FFF;
  transition: 0.5s box-shadow;
  cursor: move;
}
.dot-drag {
  box-shadow: 0 0 10px #000;
}
</style>
