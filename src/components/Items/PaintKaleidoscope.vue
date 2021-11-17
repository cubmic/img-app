<template>
  <div style="position:relative">
    <canvas ref="plot" :width="width" :height="height" style="border:1px solid #000000; border-radius:50%" @click="addPoint">
    </canvas>
    <div
      v-for="(point, index) in points" :key="index"
      class="dot"
      :style="`left:${point.x}px; top:${point.y}px`"
      v-drag="dragDefs(index)"
    />
  </div>
</template>

<script>
import init from 'src/components/Items/ItemInit.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaintKaleidoscope',
  setup (props) {
    return init.setup(props)
  },
  props: {
    data: Object
  },
  data () {
    return {
      width: 200,
      height: 200,
      dragDefs: index => {
        return {
          drag: (pos) => {
            setTimeout(() => {
              const points = JSON.parse(JSON.stringify(this.points))
              points[index] = pos
              this.points = points
              this.drawCanvas()
            }, 0)
          }
        }
      }
    }
  },
  watch: {
    repeat: {
      handler () {
        setTimeout(() => {
          this.drawCanvas()
        }, 0)
      },
      immediate: true
    },
    fill () {
      setTimeout(() => {
        this.drawCanvas()
      }, 0)
    },
    lineWidth () {
      setTimeout(() => {
        this.drawCanvas()
      }, 0)
    },
    separate () {
      setTimeout(() => {
        this.drawCanvas()
      }, 0)
    }
  },
  computed: {
    center () {
      return { x: this.width / 2, y: this.height / 2 }
    },
    step () {
      return Math.max(0, 2 * Math.PI / this.repeat)
    }
  },
  methods: {
    addPoint (event) {
      const points = this.points ? JSON.parse(JSON.stringify(this.points)) : []
      const point = { x: event.layerX - event.target.offsetLeft - 10, y: event.layerY - event.target.offsetTop - 10 }
      points.push(point)
      this.points = points
      this.drawCanvas()
    },
    updateConnection () {
      this.drawCanvas()
    },
    drawCanvas () {
      const c = this.$refs.plot
      const ctx = c.getContext('2d')
      ctx.clearRect(0, 0, this.width, this.height)
      if (this.points.length > 0 && this.repeat > 0) {
        ctx.moveTo(this.points[0].x + 10, this.points[0].y + 10)
        ctx.beginPath() // to clear also for new path
        ctx.lineWidth = this.lineWidth
        ctx.lineCap = 'round'
        for (let r = 0; r < this.repeat; r++) {
          if (this.separate) {
            ctx.moveTo(this.points[0].x + 10, this.points[0].y + 10)
            ctx.beginPath()
          }
          for (let i = 0; i < this.points.length; i++) {
            const distance = this.$math.distanceBetween(this.$math.addPos(this.points[i], { x: 10, y: 10 }), this.center)
            const angle = this.$math.angleBetween(this.$math.addPos(this.points[i], { x: 10, y: 10 }), this.center)
            const x = this.center.x + distance * Math.cos(r * this.step + angle + Math.PI)
            const y = this.center.y + distance * Math.sin(r * this.step + angle + Math.PI)
            ctx.lineTo(x, y)
          }
          if (this.separate) {
            ctx.closePath()
            ctx.stroke()
            if (this.fill) {
              ctx.fill()
            }
          }
        }
        ctx.closePath()
        ctx.stroke()
        if (this.fill) {
          ctx.fill()
        }
        const imageData = ctx.getImageData(0, 0, this.width, this.height)
        const image = {
          data: this.$utils.imgDataToUrl(imageData),
          label: 'image',
          width: this.width,
          height: this.height
        }
        this.out.color(image)
      } else {
        this.out.color(null)
      }
    }
  }
})
</script>

<style scoped>
.dot {
  position: absolute;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  transition: 0.5s box-shadow;
  cursor: move;
  background: #fff;
}
</style>
