<template>
  <Gradient v-model="gradient" />
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'ImageGradient',
  props: {
    data: Object
  },
  computed: {
    gradient: {
      get () {
        return this.data.inputs.find(o => o.key === 'g').value
      },
      set (newVal) {
        const id = this.data.inputs.find(o => o.key === 'g').id
        this.setInputWithId({ id: id, value: newVal })
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['setInputWithId'])
  }
})
</script>
