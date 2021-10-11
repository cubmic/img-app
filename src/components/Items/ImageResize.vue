<template>
  <div />
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'ImageInput',
  props: {
    item: Object
  },
  methods: {
    ...mapMutations('globals', ['setData', 'setConnection'])
  }
})
</script>
