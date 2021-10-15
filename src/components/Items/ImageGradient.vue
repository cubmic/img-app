<template>
  <Gradient v-model="gradient" />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ImageGradient',
  props: {
    data: Object
  },
  data () {
    return {
      gradient: [{ id: 1, color: '#fff', percent: 30 }, { id: 2, color: '#000', percent: 100 }]
    }
  }
})
</script>
