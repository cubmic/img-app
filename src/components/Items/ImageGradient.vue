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
        const array = []
        for (const item of this.data.inputs.find(o => o.key === 'g').value) {
          array.push({ id: item.id, color: item.color, percent: item.percent })
        }
        return array
      },
      set (newVal) {
        const val = JSON.parse(JSON.stringify(newVal))
        const id = this.data.inputs.find(o => o.key === 'g').id
        this.setInputWithId({ id: id, value: val })
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['setInputWithId'])
  }
})
</script>
