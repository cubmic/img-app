<template>
  <q-item :style="`background:${color};`">
    <q-item-section>
      <img :src="image" v-if="image" style="max-width:200px" />
    </q-item-section>
  </q-item>
  <q-item>
    <q-item-section style="height:100%">
      <div class="column q-gutter-xs justify-start">
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Image" :id="this.item.id" :color="color" />
          <span>Image</span>
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
