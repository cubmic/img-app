<template>
  <path :d="`M${l} ${t} C${l + Math.min(w / 2, -50)} ${t}, ${r - Math.min(w / 2, -50)} ${b}, ${r} ${b}`" />
  <!--  <path :d="`M${l},${t} Q${l + w * 0.4},${t} ${l + w * 0.5},${(b + t) / 2} T${r},${b - 2}`" /> -->
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
