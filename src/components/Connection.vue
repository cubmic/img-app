<template>
  <path :d="`M${l} ${t} C${l + w / 2} ${t}, ${l + w / 2} ${b}, ${r} ${b - 2}`" />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Connection',
  props: {
    item: Object
  },
  computed: {
    w () { return this.r - this.l },
    h () { return this.b - this.t },
    l () { return this.item.in.x },
    t () { return this.item.in.y },
    r () { return this.item.out.x },
    b () { return this.item.out.y }
  }
})
</script>
