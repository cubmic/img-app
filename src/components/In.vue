<template>
  <div style="width:20px; height:20px; margin-left:-15px; position:relative" :class="`only-allow-out-${type}`">
    <div class="dot" :id="`in-${id}-${name}`" :style="`background:${color}`" v-drop />
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
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  transition: 0.5s box-shadow;
}
</style>
