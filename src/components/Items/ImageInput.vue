<template>
  <q-item class="q-pa-xs">
    <Form-image v-model="image" @update:modelValue="updateChannels()" />
  </q-item>
  <q-item class="q-pa-xs" v-if="item.expand">
    <q-item-section style="height:100%">
      <div class="column q-gutter-xs justify-start">
        <div class="row q-gutter-xs items-center">
          <In type="Image" name="Image" :id="this.item.id"
            color="
              linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
            "
          />
          <span>Image</span>
        </div>
      </div>
    </q-item-section>
    <q-item-section style="height:100%">
      <div class="column q-gutter-xs justify-start">
        <div class="row q-gutter-xs items-center justify-end">
          <span>Color</span>
          <Out type="Image" name="Color" :id="this.item.id" @changed="updateChannels()"
            color="
              linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
              linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
              linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
            "
          />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Red</span>
          <Out type="Image" name="Red" :id="this.item.id" @changed="updateChannels()" color="#F00" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Green</span>
          <Out type="Image" name="Green" :id="this.item.id" @changed="updateChannels()" color="#0F0" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Blue</span>
          <Out type="Image" name="Blue" :id="this.item.id" @changed="updateChannels()" color="#00F" />
        </div>
        <div class="row q-gutter-xs items-center justify-end">
          <span>Alpha</span>
          <Out type="Image" name="Alpha" :id="this.item.id" @changed="updateChannels()" color="repeating-linear-gradient(45deg, #CCC, #CCC 11px, #333 11px, #333 22px)" />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'ImageInput',
  props: {
    item: Object
  },
  computed: {
    ...mapGetters('globals', ['outConnectionWithId']),
    image: {
      get () { return this.item.data.image },
      set (newVal) {
        this.setData({ id: this.item.id, key: 'image', value: newVal })
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['setData', 'setConnection']),
    setChannel (name, channel) {
      const id = `${this.item.id}-${name}`
      this.$utils.getChannel(this.image.data, data => {
        for (const connection of this.outConnectionWithId(id)) {
          this.setConnection({ id: connection.id, value: data })
        }
      }, channel)
    },
    resetChannel (name) {
      const id = `${this.item.id}-${name}`
      for (const connection of this.outConnectionWithId(id)) {
        this.setConnection({ id: connection.id, value: null })
      }
    },
    updateChannels () {
      if (this.image && this.image.data) {
        this.setChannel('Color', { r: true, g: true, b: true, a: true })
        this.setChannel('Red', { r: true, g: false, b: false, a: false })
        this.setChannel('Green', { r: false, g: true, b: false, a: false })
        this.setChannel('Blue', { r: false, g: false, b: true, a: false })
        this.setChannel('Alpha', { r: false, g: false, b: false, a: true })
      } else {
        this.resetChannel('Color')
        this.resetChannel('Red')
        this.resetChannel('Green')
        this.resetChannel('Blue')
        this.resetChannel('Alpha')
      }
    }
  },
  mounted () {
    if (this.image) {
      this.updateChannels(this.image)
    }
  }
})
</script>
