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
        this.updateOutput()
      }
    },
    lightness: {
      handler (newVal) {
        this.updateOutput()
      }
    }
  },
  methods: {
    updateOutput () {
      this.$utils.getImgGradient(this.lightness, image => {
        this.out.color(image)
      }, this.gradient)
    }
  }
})
</script>
