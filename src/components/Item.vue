<template>
  <q-list style="width:400px">
    <q-item>
      <q-item-section avatar>
        <q-icon name="menu" />
      </q-item-section>
      <q-item-section>
        <Form-input :modelValue="data.label" @update:modelValue="setItem({ id: data.id, key: 'label', value: $event })" />
      </q-item-section>
      <q-item-section avatar>
        <ButtonDel class="avatar" @click="delItem(data.id)" />
      </q-item-section>
    </q-item>
    <component :is="data.data.label" :data="data.data" />
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Number from 'src/components/Items/Number.vue'

export default defineComponent({
  name: 'Item',
  props: {
    data: Object
  },
  computed: {
    ...mapGetters('globals', ['items'])
  },
  methods: {
    ...mapMutations('globals', ['delItem', 'setItem'])
  },
  components: {
    Number
  }
})
</script>
