<template>
  <div />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageHSL',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  data () {
    return {
      channels: {
        hue: { h: true, s: false, l: false },
        saturation: { h: false, s: true, l: false },
        lightness: { h: false, s: false, l: true }
      }
    }
  },
  watch: {
    color: {
      handler (newVal) {
        this.updateConnection()
      },
      immediate: true
    }
  },
  methods: {
    updateConnection () {
      // update all connections
      for (const channel of Object.keys(this.channels)) {
        this.$utils.getHSLChannel(this.color, image => {
          this.out[channel](image)
        }, this.channels[channel])
      }
    }
  }
})
</script>
