<template>
  <q-toggle
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :label="label"
    color="grey-4"
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

<style>
.q-toggle__track {
  border-radius: 4px;
}
.q-toggle__thumb::after {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.24);
}
.q-toggle:not(.disabled) .q-toggle__thumb::before {
  border-radius: 4px !important;
}
</style>
