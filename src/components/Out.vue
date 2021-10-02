<template>
  <div class="dot-bg" :style="`width:${size}px; height:${size}px;`">
    <div
      class="dot"
      :class="{ 'dot-drag': drag }"
      :style="`width:${size}px; height:${size}px; background:${color}`"
      v-drag="dragDefs"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  name: 'Out',
  props: {
    id: String,
    name: String,
    type: String,
    color: {
      type: String,
      default: '#21BA45'
    }
  },
  data () {
    return {
      size: 20,
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
            return false // force animation to back
          }
        },
        drop: (vm) => {
          if (vm.$el.classList.contains(`only-allow-out-${this.type}`)) {
            const inConnection = vm.getConnection()
            if (this.type === inConnection.type) {
              this.addConnection({
                out: { name: this.name, id: this.id },
                in: { name: inConnection.name, id: inConnection.id },
                data: null
              })
              this.hit = true
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['addConnection'])
  }
})
</script>

<style scoped>
.dot {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #FFF;
  transition: 0.5s box-shadow;
  cursor: move;
}
.dot-drag {
  box-shadow: 0 0 10px #000;
}
.dot-bg {
  background: #666;
  border-radius: 50%;
}
</style>
