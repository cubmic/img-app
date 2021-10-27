<template>
  <div />
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberInput',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  watch: {
    number: {
      handler (newVal) {
        this.out.number(newVal)
      },
      immediate: true
    }
  },
  methods: {
    updateConnection () {
      this.out.number(this.number)
    }
  }
})
</script>
