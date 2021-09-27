<template>
  <q-list style="width:400px">
    <q-item>
      <q-item-section>
        <q-input :modelValue="data.name" @update:modelValue="setProp({ id: data.id, key: 'name', value: $event })" outlined dense />
      </q-item-section>
      <q-item-section avatar>
        <Del class="avatar" @click="delItem(data.id)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Del from 'src/components/Del.vue'

export default defineComponent({
  name: 'Item',
  props: {
    data: Object
  },
  computed: {
    ...mapGetters('globals', ['items'])
  },
  methods: {
    ...mapMutations('globals', ['delItem', 'setProp'])
  },
  components: {
    Del
  }
})
</script>
