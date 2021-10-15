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

<style>
.img-checker-bg {
  font-size: 0px;
  background-color: #FFF;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: linear-gradient(45deg, #999 25%, transparent 25%, transparent 75%, #999 75%, #999),
                    linear-gradient(45deg, #999 25%, transparent 25%, transparent 75%, #999 75%, #999);
  box-shadow: 0 0 10px #000 inset;
}
</style>
