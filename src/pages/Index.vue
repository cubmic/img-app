<template>
  <Item bordered v-for="item in items" :key="item.id" :data="item" />
  <q-select :options="ITEM_TYPES" :modelValue="null" @update:modelValue="addItem" outlined dense />
  <pre>{{ items }}</pre>
  <pre>{{ datas }}</pre>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Item from 'src/components/Item.vue'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapGetters('globals', ['items', 'datas', 'ITEM_TYPES'])
  },
  methods: {
    ...mapMutations('globals', ['addItem', 'delItem', 'setProp'])
  },
  components: {
    Item
  }
})
</script>
