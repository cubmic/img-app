<template>
  <div />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageInput',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  data () {
    return {
      channels: {
        red: { r: true, g: false, b: false, a: false },
        green: { r: false, g: true, b: false, a: false },
        blue: { r: false, g: false, b: true, a: false },
        alpha: { r: false, g: false, b: false, a: true }
      }
    }
  },
  watch: {
    color: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    }
  },
  methods: {
    updateConnection () {
      // update all connections
      for (const channel of Object.keys(this.channels)) {
        this.$utils.getRGBAChannel(this.color, image => {
          this.out[channel](image)
        }, this.channels[channel])
      }
    }
  }
})
</script>
