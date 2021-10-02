<template>
  <div :style="`width:${size}px; height:${size}px;`" :class="`only-allow-out-${type}`">
    <div class="dot" :style="`width:${size}px; height:${size}px; background:${color}`" v-drop />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'In',
  props: {
    id: String,
    name: String,
    type: String,
    color: {
      type: String,
      default: '#C10015'
    }
  },
  data () {
    return {
      size: 20
    }
  },
  methods: {
    getConnection () {
      return { id: this.id, name: this.name, type: this.type }
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
