<template>
  <div :style="`width:${size}px; height:${size}px;`">
    <div
      class="dot"
      :class="`only-allow-out-${type}`"
      :style="`width:${size}px; height:${size}px; background:${color}`"
      v-drop="dropDefs"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'In',
  props: {
    type: String,
    color: {
      type: String,
      default: '#C10015'
    }
  },
  data () {
    return {
      size: 20,
      dropDefs: {
        drop: (vm) => {
          if (vm.$el.classList.contains([`only-allow-in-${this.type}`])) {
            console.log('drop', vm.$el)
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
  border-radius: 50%;
  border: 2px solid #FFF;
  transition: 0.5s box-shadow;
}
</style>
