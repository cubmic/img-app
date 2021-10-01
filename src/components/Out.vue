<template>
  <div
    class="dot"
    :class="{ [`only-allow-in-${type}`]: true, 'dot-drag': drag }"
    :style="`background:${color}`"
    v-drag="dragDefs"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'Out',
  props: {
    type: String
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
          if (vm.$el.classList.contains(`only-allow-out-${this.type}`)) {
            // this.$math.appendToWithSameGlobalPos(obj, vm.$el)
            console.log('drag', vm.$el)
            this.hit = true
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['DATA_TYPES']),
    color () {
      const t = this.DATA_TYPES.find(o => o.label === this.type)
      return t ? t.color : '#ccc'
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
  cursor: move;
}
.dot-drag {
  box-shadow: 0 0 10px #000;
}
</style>
