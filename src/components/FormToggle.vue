<template>
  <q-toggle
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :label="label"
  />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormToggle',
  props: {
    modelValue: Boolean,
    label: String
  }
})
</script>
