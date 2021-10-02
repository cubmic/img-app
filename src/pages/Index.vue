<template>
  <div class="q-pa-sm">
    <Form-select :options="ITEM_TYPE_DEFS" :modelValue="null" @update:modelValue="addItem" style="width:300px" />
    <div style="position:relative; height:500px" class="q-mt-sm">
      <Item bordered v-for="item in items" :key="item.id" :data="item" />
    </div>
    <pre>{{ items }}</pre>
    <pre>{{ connections }}</pre>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapGetters('globals', ['items', 'connections', 'ITEM_TYPE_DEFS'])
  },
  methods: {
    ...mapMutations('globals', ['addItem'])
  }
})
</script>
