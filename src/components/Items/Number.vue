<template>
  <q-item style="background:#DB9;">
    <q-item-section avatar>
      <In />
    </q-item-section>
    <q-item-section>
      <Form-input v-model="number" type="number" />
    </q-item-section>
    <q-item-section avatar>
      <Out key="test" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'Number',
  props: {
    data: Object
  },
  computed: {
    ...mapGetters('globals', ['dataWithId']),
    number: {
      get () { return this.dataWithId(this.data.dataTypes[0]).value },
      set (newVal) { this.setData({ id: this.data.dataTypes[0], key: 'value', value: newVal }) }
    }
  },
  methods: {
    ...mapMutations('globals', ['setData'])
  }
})
</script>
