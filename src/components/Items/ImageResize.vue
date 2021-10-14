<template>
  <div class="row justify-center" v-if="image">
    <div style="position:relative" :style="`width:${prevWidth + 20}px`">
      <img :src="image" class="img" :style="`left:10px; top:10px; width:${prevWidth}px`" />
      <div
        class="rect"
        :style="`
          left:${left + 10}px;
          top:${top + 10}px;
          width:${width}px;
          height:${height}px;
          background-image:url(${image});
          background-size:${prevWidth}px ${prevHeight}px;
          background-position:-${left}px -${top}px;
        `"
      />
      <div class="dot" v-drag="dragDefs1" ref="dot1" />
      <div class="dot" v-drag="dragDefs2" ref="dot2" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'ImageInput',
  props: {
    data: Object
  },
  data () {
    return {
      prevWidth: 300,
      left: 0,
      top: 0,
      width: 0,
      height: 0,
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
          this.left = this.$refs.dot1.offsetLeft
          this.top = this.$refs.dot1.offsetTop
          this.width = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
          this.height = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          // update inputs
          this.l = Math.round(this.left * this.originalWidth / this.prevWidth)
          this.t = Math.round(this.top * this.originalHeight / this.prevHeight)
          this.w = Math.round(this.width * this.originalWidth / this.prevWidth)
          this.h = Math.round(this.height * this.originalHeight / this.prevHeight)
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
          this.width = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
          this.height = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          // update inputs
          this.w = Math.round(this.width * this.originalWidth / this.prevWidth)
          this.h = Math.round(this.height * this.originalHeight / this.prevHeight)
        }
      }
    }
  },
  watch: {
    image: {
      handler (newVal) {
        if (newVal) {
          this.$utils.urlToImgData(newVal, data => {
            this.originalWidth = data.width
            this.originalHeight = data.height
            // initial size
            this.width = this.prevWidth
            this.height = this.prevHeight
            if (this.l === null) {
              this.l = 0
            }
            if (this.t === null) {
              this.t = 0
            }
            if (this.w === null) {
              this.w = this.originalWidth
            }
            if (this.h === null) {
              this.h = this.originalHeight
            }
            this.$refs.dot1.style.left = (this.l * this.prevWidth / this.originalWidth) + 'px'
            this.$refs.dot1.style.top = (this.t * this.prevHeight / this.originalHeight) + 'px'
            this.$refs.dot2.style.left = ((this.l + this.w) * this.prevWidth / this.originalWidth) + 'px'
            this.$refs.dot2.style.top = ((this.t + this.h) * this.prevHeight / this.originalHeight) + 'px'
            this.left = this.$refs.dot1.offsetLeft
            this.top = this.$refs.dot1.offsetTop
            this.width = this.$refs.dot2.offsetLeft - this.$refs.dot1.offsetLeft
            this.height = this.$refs.dot2.offsetTop - this.$refs.dot1.offsetTop
          })
        }
      },
      immediate: true
    }
  },
  computed: {
    image () {
      for (const input of this.data.inputs) {
        // color image
        if (input.key === 'c' && input.value) {
          return input.value.data
        }
      }
      return null
    },
    l: {
      get () {
        return this.data.inputs.find(o => o.key === 'l').value
      },
      set (newVal) {
        const id = this.data.inputs.find(o => o.key === 'l').id
        this.setInputs({ id: id, value: newVal })
      }
    },
    t: {
      get () {
        return this.data.inputs.find(o => o.key === 't').value
      },
      set (newVal) {
        const id = this.data.inputs.find(o => o.key === 't').id
        this.setInputs({ id: id, value: newVal })
      }
    },
    w: {
      get () {
        return this.data.inputs.find(o => o.key === 'w').value
      },
      set (newVal) {
        const id = this.data.inputs.find(o => o.key === 'w').id
        this.setInputs({ id: id, value: newVal })
      }
    },
    h: {
      get () {
        return this.data.inputs.find(o => o.key === 'h').value
      },
      set (newVal) {
        const id = this.data.inputs.find(o => o.key === 'h').id
        this.setInputs({ id: id, value: newVal })
      }
    },
    prevHeight () {
      return this.prevWidth / this.originalWidth * this.originalHeight
    }
  },
  methods: {
    ...mapMutations('globals', ['setInputs'])
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
