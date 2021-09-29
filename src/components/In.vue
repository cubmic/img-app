<template>
  <div class="dot-bg">
    <div class="dot only-allow-out-dot bg-negative" v-drop="dropDefs" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'In',
  data () {
    return {
      dropDefs: {
        drop: (vm) => {
          if (vm.$el.classList.contains('only-allow-in-dot')) {
            console.log('drop', vm.$el)
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
}
</style>
