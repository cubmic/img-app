<template>
  <Gradient v-model="gradient" />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageGradient',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  watch: {
    gradient: {
      handler (newVal) {
        console.log('gradient', newVal)
      }
    },
    lightness: {
      handler (newVal) {
        console.log('lightness', newVal)
      }
    }
  }
})
</script>
