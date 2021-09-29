<template>
  <div class="q-pa-sm">
    <Form-select :options="ITEM_TYPES" :modelValue="null" @update:modelValue="addItem" style="width:300px" />
    <div style="position:relative; height:500px" class="q-mt-sm">
      <Item bordered v-for="item in items" :key="item.id" :data="item" />
    </div>

    <pre>{{ items }}</pre>
    <pre>{{ datas }}</pre>
  </div>
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
