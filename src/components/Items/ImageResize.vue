<template>
  <q-item class="q-pa-xs">
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'ImageInput',
  props: {
    item: Object
  },
  computed: {
    ...mapGetters('globals', ['outConnectionWithId'])
  },
  methods: {
    ...mapMutations('globals', ['setData', 'setConnection'])
  }
})
</script>
