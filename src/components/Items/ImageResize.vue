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
      l: 0,
      t: 0,
      w: 0,
      h: 0,
      originalWidth: 0,
      originalHeight: 0,
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
          this.l = this.$refs.dot1.offsetLeft
          this.t = this.$refs.dot1.offsetTop
          this.w = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
          this.h = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          // update inputs
          this.left = Math.round(this.l * this.originalWidth / this.prevWidth)
          this.top = Math.round(this.t * this.originalHeight / this.prevHeight)
          this.width = Math.round(this.w * this.originalWidth / this.prevWidth)
          this.height = Math.round(this.h * this.originalHeight / this.prevHeight)
        },
        end: () => {
          this.updateColor()
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
          this.w = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
          this.h = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          // update inputs
          this.width = Math.round(this.w * this.originalWidth / this.prevWidth)
          this.height = Math.round(this.h * this.originalHeight / this.prevHeight)
        },
        end: () => {
          this.updateColor()
        }
      }
    }
  },
  watch: {
    color: {
      handler (newVal) {
        if (newVal) {
          this.$utils.urlToImgData(newVal.data, data => {
            this.originalWidth = data.width
            this.originalHeight = data.height
            // initial size
            if (this.l === null) {
              this.left = 0
            }
            if (this.t === null) {
              this.top = 0
            }
            if (this.w === null) {
              this.width = this.originalWidth
            }
            if (this.h === null) {
              this.height = this.originalHeight
            }
            this.$refs.dot1.style.left = (this.left * this.prevWidth / this.originalWidth) + 'px'
            this.$refs.dot1.style.top = (this.top * this.prevHeight / this.originalHeight) + 'px'
            this.$refs.dot2.style.left = ((this.left + this.width) * this.prevWidth / this.originalWidth) + 'px'
            this.$refs.dot2.style.top = ((this.top + this.height) * this.prevHeight / this.originalHeight) + 'px'
            this.l = this.$refs.dot1.offsetLeft
            this.t = this.$refs.dot1.offsetTop
            this.w = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
            this.h = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
            this.updateColor()
          })
        } else {
          this.out.color(null)
        }
      },
      immediate: true
    }
  },
  computed: {
    prevHeight () {
      return this.prevWidth / this.originalWidth * this.originalHeight
    }
  },
  methods: {
    updateColor () {
      this.$utils.resizeImg(this.color, { left: this.left, top: this.top, width: this.width, height: this.height }, image => {
        this.out.color(image)
      })
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
