<template>
  <q-select
    :options="options"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    outlined dense
  >
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </q-select>
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
