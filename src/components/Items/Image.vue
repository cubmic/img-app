<template>
  <q-item style="background:#9BD;">
    <q-item-section avatar>
      <In type="Image" />
    </q-item-section>
    <q-item-section>
      <Form-image v-model="image" />
    </q-item-section>
    <q-item-section avatar>
      <div class="column q-gutter-sm">
        <div style="width:30px; height:30px">
          <Out type="Image" />
        </div>
        <div style="width:30px; height:30px">
          <Out type="Integer" />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'Image',
  props: {
    item: Object
  },
  computed: {
    ...mapGetters('globals', ['dataWithId']),
    image: {
      get () { return this.item.dataType.data.image },
      set (newVal) { this.setData({ id: this.item.id, key: 'image', value: newVal }) }
    }
  },
  methods: {
    ...mapMutations('globals', ['setData'])
  }
})
</script>
