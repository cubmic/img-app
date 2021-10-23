<template>
  <q-item class="q-pa-xs">
    <q-item-section>
      <div :class="{ 'bg-black': !alpha, 'img-checker-bg': alpha }" style="width:200px; height:200px">
        <q-img :src="image" v-if="image" style="height:200px" fit="contain" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageOutput',
  props: {
    data: Object
  },
  data () {
    return {
      alpha: false
    }
  },
  watch: {
    image: {
      handler (newVal) {
        if (newVal) {
          this.$utils.imgHasAlpha(newVal, value => {
            this.alpha = value
          })
        } else {
          this.alpha = false
        }
      },
      immediate: true
    }
  },
  computed: {
    image () {
      for (const input of this.data.inputs) {
        // color image
        if (input.type === 'image' && input.value) {
          return input.value.data
        }
      }
      return null
    }
  }
})
</script>
