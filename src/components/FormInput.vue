<template>
  <q-input
    :modelValue="localValue"
    @update:modelValue="valueChanged"
    @keydown="keydown"
    outlined dense
    bg-color="grey-4"
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
    },
    min: Number,
    max: Number
  },
  data () {
    return {
      localValue: ''
    }
  },
  watch: {
    modelValue: {
      handler (newVal) {
        this.localValue = '' + this.type === 'string'
          ? newVal
          : newVal || 0
      },
      immediate: true
    }
  },
  methods: {
    updateEmit (newVal) {
      this.$emit('update:modelValue', newVal)
    },
    inBounds (number) {
      if (this.min) {
        number = Math.max(number, this.min)
      }
      if (this.max) {
        number = Math.min(number, this.max)
      }
      return number
    },
    valueChanged (newVal) {
      this.localValue = newVal
      if (this.type === 'number') {
        if (newVal === '-') {
          return
        }
        this.updateEmit(this.inBounds(parseFloat(newVal)) || null)
      } else if (this.type === 'integer') {
        if (newVal === '-') {
          return
        }
        this.updateEmit(this.inBounds(parseInt(newVal)) || null)
      } else {
        this.localValue = newVal
        this.updateEmit(newVal)
      }
    },
    keydown (event) {
      if (this.type === 'number') {
        // allow only this keys
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          const nr = this.inBounds(this.$math.floatAdd(parseFloat(this.localValue), this.step))
          this.localValue = '' + nr
          this.$emit('update:modelValue', nr)
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          const nr = this.inBounds(this.$math.floatSub(parseFloat(this.localValue), this.step))
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
          const nr = this.inBounds(parseFloat(this.localValue) + this.step)
          this.localValue = '' + nr
          this.$emit('update:modelValue', nr)
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          const nr = this.inBounds(parseFloat(this.localValue) - this.step)
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
