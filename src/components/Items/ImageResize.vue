<template>
  <div />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageResize',
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
    color () {
      this.updateResize()
    },
    width () {
      this.updateResize()
    },
    height () {
      this.updateResize()
    }
  },
  methods: {
    updateResize () {
      if (!this.lock) {
        this.lock = true
        this.$utils.resizeImg(this.color, { width: this.width, height: this.height }, image => {
          this.out.color(image)
          this.lock = false
        })
      }
    }
  }
})
</script>
