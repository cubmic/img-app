<template>
  <q-item class="q-pa-xs">
    <q-item-section>
      <div :class="{ 'bg-black': !alpha, 'img-checker-bg': alpha }" style="width:200px; height:200px">
        <q-img :src="image" v-if="image" @load="imgLoaded()" style="height:200px" fit="scale-down" />
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
  computed: {
    image () {
      return this.data.inputs.length > 0 ? this.data.inputs[0].value.data : null
    }
  },
  methods: {
    imgLoaded () {
      this.$utils.imgHasAlpha(this.image, value => {
        this.alpha = value
      })
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
