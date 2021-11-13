<template>
  <div />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageMixer',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  watch: {
    color1: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    },
    color2: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    },
    func: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    }
  },
  methods: {
    updateConnection () {
      this.$utils.combineImages(this.color1, this.color2, this.func.value, image => {
        this.out.color(image)
      })
    }
  }
})
</script>
