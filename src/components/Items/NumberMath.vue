<template>
  <div class="q-pa-sm">
    {{ numberA || 0 }} {{ func.value }} {{ numberB || 0 }} = {{ preview }}
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
        this.preview = this.$math.floatOperations(this.numberA, this.numberB, this.func.value)
        this.out.number(this.preview)
      }
    }
  }
})
</script>
