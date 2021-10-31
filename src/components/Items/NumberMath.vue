<template>
  <div class="q-pa-sm" v-if="func">
    {{ numberA }} {{ func.value }} {{ numberB }} = {{ preview }}
  </div>
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberMath',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  data () {
    return {
      preview: null
    }
  },
  watch: {
    numberA: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    },
    numberB: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    },
    func: {
      handler () {
        this.updateConnection()
      },
      immediate: true
    }
  },
  methods: {
    updateConnection () {
      if (this.func) {
        switch (this.func.value) {
          case '+':
            this.preview = this.numberA + this.numberB
            break
          case '-':
            this.preview = this.numberA - this.numberB
            break
          case '*':
            this.preview = this.numberA * this.numberB
            break
          case '/':
            this.preview = this.numberA / this.numberB
            break
          default:
            this.preview = null
        }
        this.out.number(this.preview)
      }
    }
  }
})
</script>
