<template>
  <q-item :style="`background:${color};`">
    <q-item-section>
      <Form-image v-model="image" />
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section>
      <div class="column q-gutter-xs justify-start">
        <div class="row q-gutter-xs items-center">
          <In type="Image" :color="color" />
          <span>Image</span>
        </div>
      </div>
    </q-item-section>
    <q-item-section>
      <div class="column q-gutter-xs justify-start">
        <div class="row q-gutter-xs items-center justify-end">
          <span>Image</span>
          <Out type="Image" :color="color" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Red</span>
          <Out type="Image" color="#F00" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Green</span>
          <Out type="Image" color="#0F0" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Blue</span>
          <Out type="Image" color="#00F" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Alpha</span>
          <Out type="Image" color="repeating-linear-gradient(45deg, #CCC, #CCC 11px, #333 11px, #333 22px)" />
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
  data () {
    return {
      color: '#9BD'
    }
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
