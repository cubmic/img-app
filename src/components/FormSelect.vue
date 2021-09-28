<template>
  <q-select
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    outlined dense
  />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormSelect',
  props: {
    modelValue: Object,
    options: Array
  }
})
</script>
