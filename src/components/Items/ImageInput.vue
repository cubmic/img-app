<template>
  <q-item class="q-pa-xs">
    <Form-image v-model="image" @update:modelValue="updateChannels()" />
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
      /*
      this.$utils.getChannel(this.image.data, data => {
        for (const connection of this.outConnectionWithId(`${this.item.id}-${name}`)) {
          this.setConnection({ id: connection.id, value: data })
        }
      }, channel)
      */
    },
    resetChannel (name) {
      /*
      for (const connection of this.outConnectionWithId(`${this.item.id}-${name}`)) {
        this.setConnection({ id: connection.id, value: null })
      }
      */
    },
    updateColor () {
      if (this.image && this.image.data) {
        this.setChannel('Color', { r: true, g: true, b: true, a: true })
      } else {
        this.resetChannel('Color')
      }
    },
    updateRed () {
      if (this.image && this.image.data) {
        this.setChannel('Red', { r: true, g: false, b: false, a: false })
      } else {
        this.resetChannel('Red')
      }
    },
    updateGreen () {
      if (this.image && this.image.data) {
        this.setChannel('Green', { r: false, g: true, b: false, a: false })
      } else {
        this.resetChannel('Green')
      }
    },
    updateBlue () {
      if (this.image && this.image.data) {
        this.setChannel('Blue', { r: false, g: false, b: true, a: false })
      } else {
        this.resetChannel('Blue')
      }
    },
    updateAlpha () {
      if (this.image && this.image.data) {
        this.setChannel('Alpha', { r: false, g: false, b: false, a: true })
      } else {
        this.resetChannel('Alpha')
      }
    },
    updateChannels () {
      this.updateColor()
      this.updateRed()
      this.updateGreen()
      this.updateBlue()
      this.updateAlpha()
    }
  },
  mounted () {
    this.updateChannels()
  }
})
</script>
