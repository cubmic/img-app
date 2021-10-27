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
  data () {
    return {
      lock: false
    }
  },
  watch: {
    gradient: {
      handler () {
        this.updateOutput()
      },
      immediate: true
    },
    lightness: {
      handler () {
        this.updateOutput()
      },
      immediate: true
    }
  },
  methods: {
    updateOutput () {
      if (!this.lock) {
        this.lock = true
        this.$utils.getImgGradient(this.lightness, image => {
          this.out.color(image)
          this.lock = false
        }, this.gradient)
      }
    }
  }
})
</script>
