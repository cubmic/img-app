<template>
  <q-btn :icon="icon" :color="color" size="12px" round outline />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IconButton',
  props: {
    icon: String,
    color: String
  }
})
</script>
