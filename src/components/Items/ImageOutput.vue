<template>
  <q-item class="q-pa-xs">
    <q-item-section>
      <div class="row justify-center">
        <div :class="{ 'bg-black': !alpha, 'q-color-picker__header-bg': alpha }" style="width:200px; height:200px">
          <q-img :src="color.data" v-if="color" style="height:200px; image-rendering:pixelated;" fit="contain" />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageOutput',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  data () {
    return {
      alpha: false
    }
  },
  watch: {
    color: {
      handler (newVal) {
        this.updateConnection()
      },
      immediate: true
    }
  },
  methods: {
    updateConnection () {
      this.$utils.imgHasAlpha(this.color, value => {
        this.alpha = value
      })
      this.out.color(this.color)
    }
  }
})
</script>
