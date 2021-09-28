<template>
  <q-input
    :modelValue="localValue"
    @update:modelValue="valueChanged"
    @keydown="keydown"
    outlined dense
  />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormInput',
  props: {
    modelValue: [Number, String],
    type: {
      type: String,
      default: 'text',
      validator: function (value) {
        return ['text', 'number', 'integer'].indexOf(value) !== -1
      }
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  watch: {
    modelValue: {
      handler (newVal) {
        this.localValue = '' + newVal
      },
      immediate: true
    }
  },
  methods: {
    updateEmit (newVal) {
      this.$emit('update:modelValue', newVal)
    },
    valueChanged (newVal) {
      this.localValue = newVal
      if (this.type === 'number') {
        this.updateEmit(parseFloat(newVal) || 0)
      } else if (this.type === 'integer') {
        this.updateEmit(parseInt(newVal) || 0)
      } else {
        this.updateEmit(newVal)
      }
    },
    keydown (event) {
      if (this.type === 'number') {
        // allow only this keys
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          const nr = parseFloat(this.localValue) + this.step
          this.localValue = '' + nr
          this.$emit('update:modelValue', nr)
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          const nr = parseFloat(this.localValue) - this.step
          this.localValue = '' + nr
          this.$emit('update:modelValue', nr)
        }
        // only one time allowed
        if (event.key === '.' && this.localValue.includes('.')) {
          event.preventDefault()
        }
        // only at beginning
        if (event.key === '-' && this.localValue !== '') {
          event.preventDefault()
        }
        // allow only this keys
        if (!['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter', '.', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault()
        }
      }
      if (this.type === 'integer') {
        // allow only this keys
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          const nr = parseFloat(this.localValue) + this.step
          this.localValue = '' + nr
          this.$emit('update:modelValue', nr)
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          const nr = parseFloat(this.localValue) - this.step
          this.localValue = '' + nr
          this.$emit('update:modelValue', nr)
        }
        // only at beginning
        if (event.key === '-' && this.localValue !== '') {
          event.preventDefault()
        }
        // allow only this keys
        if (!['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault()
        }
      }
    }
  }
})
</script>
