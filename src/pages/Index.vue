<template>
  <Item bordered v-for="item in items" :key="item.id" :data="item" />
  <Add @click="addItem()" />
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Add from 'src/components/Add.vue'
import Item from 'src/components/Item.vue'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapGetters('globals', ['items'])
  },
  methods: {
    ...mapMutations('globals', ['addItem', 'delItem', 'setProp'])
  },
  components: {
    Add, Item
  }
})
</script>
