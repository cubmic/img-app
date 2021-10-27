<template>
  <div class="row justify-center" v-if="color">
    <div style="position:relative" :style="`width:${prevWidth + 20}px`">
      <img :src="color.data" class="img" :style="`left:10px; top:10px; width:${prevWidth}px`" />
      <div
        class="rect"
        :style="`
          left:${l + 10}px;
          top:${t + 10}px;
          width:${w}px;
          height:${h}px;
          background-image:url(${color.data});
          background-size:${prevWidth}px ${prevHeight}px;
          background-position:-${l}px -${t}px;
        `"
      />
      <div class="dot" v-drag="dragDefs1" ref="dot1" />
      <div class="dot" v-drag="dragDefs2" ref="dot2" />
    </div>
  </div>
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageInput',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  data () {
    return {
      prevWidth: 300,
      dragDefs1: {
        bounds: () => {
          return {
            left: 0,
            top: 0,
            right: this.prevWidth,
            bottom: this.prevHeight
          }
        },
        drag: () => {
          const l = this.$refs.dot1.offsetLeft
          const t = this.$refs.dot1.offsetTop
          const w = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
          const h = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          this.left = Math.round(l * this.color.width / this.prevWidth)
          this.top = Math.round(t * this.color.height / this.prevHeight)
          this.width = Math.round(w * this.color.width / this.prevWidth)
          this.height = Math.round(h * this.color.height / this.prevHeight)
        }
      },
      dragDefs2: {
        bounds: () => {
          return {
            left: this.$refs.dot1.offsetLeft + 10,
            top: this.$refs.dot1.offsetTop + 10,
            right: this.prevWidth,
            bottom: this.prevHeight
          }
        },
        drag: () => {
          const w = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
          const h = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          this.width = Math.round(w * this.color.width / this.prevWidth)
          this.height = Math.round(h * this.color.height / this.prevHeight)
        }
      }
    }
  },
  watch: {
    color (newVal) {
      if (newVal) {
        this.left = 0
        this.top = 0
        this.width = newVal.width
        this.height = newVal.height
        this.updateDots()
      }
      this.updateResize()
    },
    left () {
      this.updateDots()
      this.updateResize()
    },
    top () {
      this.updateDots()
      this.updateResize()
    },
    width () {
      this.updateDots()
      this.updateResize()
    },
    height () {
      this.updateDots()
      this.updateResize()
    }
  },
  computed: {
    prevHeight () {
      return this.prevWidth / this.color.width * this.color.height
    },
    l () {
      return Math.round(this.left * this.prevWidth / this.color.width)
    },
    t () {
      return Math.round(this.top * this.prevHeight / this.color.height)
    },
    w () {
      return Math.round(this.width * this.prevWidth / this.color.width)
    },
    h () {
      return Math.round(this.height * this.prevHeight / this.color.height)
    }
  },
  methods: {
    updateResize () {
      this.$utils.resizeImg(this.color, { left: this.left, top: this.top, width: this.width, height: this.height }, image => {
        this.out.color(image)
      })
    },
    updateDots () {
      if (this.$refs.dot1) {
        this.$refs.dot1.style.left = this.l + 'px'
        this.$refs.dot1.style.top = this.t + 'px'
        this.$refs.dot2.style.left = (this.l + this.w) + 'px'
        this.$refs.dot2.style.top = (this.t + this.h) + 'px'
      }
    }
  },
  mounted () {
    if (this.color) {
      this.updateDots()
    }
  }
})
</script>

<style scoped>
.dot {
  position: absolute;
  border-radius: 50%;
  left: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  cursor: move;
  background: #fff;
}
.rect {
  position: absolute;
  border: 2px dotted #FFF;
  background-repeat: no-repeat;
}
.img {
  opacity: 0.1;
  left: 10px;
  top: 10px;
  position: relative;
}
</style>
