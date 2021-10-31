<template>
  <q-btn :icon="icon" :color="color" size="12px" round outline>
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </q-btn>
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
