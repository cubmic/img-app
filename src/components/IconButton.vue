<template>
  <q-btn :icon="icon" :color="color" style="background:rgba(255,255,255,0.2) !important" size="12px" padding="sm" outline>
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
