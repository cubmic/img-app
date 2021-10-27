<template>
  <div />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageColor',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  watch: {
    color: {
      handler (newVal) {
        this.out.color(newVal)
      },
      immediate: true
    }
  }
})
</script>
