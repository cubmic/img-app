<template>
  <div class="dot only-allow-in-dot bg-positive" :class="{ 'dot-drag': drag }" v-drag="dragDefs" />
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

          if (!this.hit) {
            return false
          }
        },
        drop: (vm) => {
          if (vm.$el.classList.contains('only-allow-out-dot')) {
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
.dot {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #FFF;
  transition: 0.5s box-shadow;
}
.dot-drag {
  box-shadow: 0 0 10px #000;
}
</style>
