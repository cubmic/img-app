<template>
  <q-item class="q-pa-xs" :style="`background:${color};`">
    <q-item-section>
      <q-img :src="image" v-if="image" style="max-width:200px" @load="imgLoaded()" />
    </q-item-section>
  </q-item>
  <q-item class="q-pa-xs" v-if="item.expand">
    <q-item-section style="height:100%">
      <div class="column justify-start">
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
import { mapGetters, mapMutations } from 'vuex'

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
  watch: {
    image (newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.updateConnections()
        }, 0)
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['inConnectionWithId']),
    image () {
      const exists = this.inConnectionWithId(`${this.item.id}-Image`)
      return exists ? exists.data : null
    }
  },
  methods: {
    ...mapMutations('globals', ['updateConnections']),
    imgLoaded () {
      setTimeout(() => {
        this.updateConnections()
      }, 0)
    }
  }
})
</script>
