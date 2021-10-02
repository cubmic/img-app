<template>
  <q-item :style="`background:${color};`">
    <q-item-section>
      <img :src="image" v-if="image" style="max-width:200px" />
    </q-item-section>
  </q-item>
  <q-item v-if="item.expand">
    <q-item-section style="height:100%">
      <div class="column q-gutter-xs justify-start">
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Image" :id="this.item.id" :color="color" />
          <span>Image</span>
        </div>
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Red" :id="this.item.id" color="#F00" />
          <span>Red</span>
        </div>
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Green" :id="this.item.id" color="#0F0" />
          <span>Green</span>
        </div>
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Blue" :id="this.item.id" color="#00F" />
          <span>Blue</span>
        </div>
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Alpha" :id="this.item.id" color="repeating-linear-gradient(45deg, #CCC, #CCC 11px, #333 11px, #333 22px)" />
          <span>Alpha</span>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'ImageOutput',
  props: {
    item: Object
  },
  data () {
    return {
      color: '#9BD'
    }
  },
  computed: {
    ...mapGetters('globals', ['inConnectionWithId']),
    image () {
      const exists = this.inConnectionWithId(`${this.item.id}-Image`)
      return exists ? exists.data : null
    }
  }
})
</script>
