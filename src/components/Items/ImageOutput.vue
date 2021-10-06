<template>
  <q-item class="q-pa-xs">
    <q-item-section>
      <div :class="{ 'bg-black': !alpha, 'img-checker-bg': alpha }">
        <q-img :src="image" v-if="image" @load="imgLoaded()" style="height:200px" fit="scale-down" />
      </div>
    </q-item-section>
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
      alpha: false
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
