<template>
  <div class="dot bg-negative" :class="`only-allow-out-${type}`" v-drop="dropDefs" />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'In',
  props: {
    type: String
  },
  data () {
    return {
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #FFF;
  transition: 0.5s box-shadow;
}
</style>
