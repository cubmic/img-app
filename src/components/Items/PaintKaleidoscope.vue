<template>
  <div class="row justify-center">
    <div style="position:relative">
      <canvas
        ref="plot"
        :width="size"
        :height="size"
        class="q-color-picker__header-bg"
        :style="`width:${previewSize}px; height:${previewSize}px; border-radius:50%`"
        @click="addPoint"
      >
      </canvas>
      <div
        v-for="(point, index) in points" :key="index"
        class="dot"
        :style="`left:${point.x}px; top:${point.y}px`"
        v-drag="dragDefs(index)"
      />
      <!-- info -->
      <q-btn icon="info" size="md" round flat padding="none" :style="`position:absolute; left:${previewSize*0.87}px; top:${previewSize*0.87}px`">
        <q-popup-proxy>
          <q-card>
            <q-card-section class="q-pa-xs" style="white-space:pre;">
              {{ $t('kaleidoskope.info') }}
            </q-card-section>
            <q-card-section class="q-pa-xs q-pt-none">
              <div class="row q-col-gutter-sm">
                <div>
                  <q-btn :label="$t('btn.close')" v-close-popup />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </q-btn>
    </div>
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
      previewSize: 200,
      dragDefs: index => {
        return {
          drag: (pos) => {
            setTimeout(() => {
              const points = JSON.parse(JSON.stringify(this.points))
              points[index] = pos
              this.points = points
              this.drawCanvas()
            }, 0)
          },
          end: (vm, moveDelta, moveDistance, actualPos) => {
            const previewHalfSize = this.previewSize / 2
            const distance = this.$math.distanceBetween(
              { x: actualPos.x + 10, y: actualPos.y + 10 },
              { x: previewHalfSize, y: previewHalfSize }
            )
            if (distance > previewHalfSize) {
              const points = JSON.parse(JSON.stringify(this.points))
              points.splice(index, 1)
              this.points = points
              this.drawCanvas()
            }
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
    },
    radius () {
      setTimeout(() => {
        this.drawCanvas()
      }, 0)
    }
  },
  computed: {
    center () {
      return { x: this.radius, y: this.radius }
    },
    step () {
      return Math.max(0, 2 * Math.PI / this.repeat)
    },
    size () {
      return this.radius * 2
    }
  },
  methods: {
    zoom (nr) {
      return (nr + 10) * this.size / this.previewSize
    },
    addPoint (event) {
      const points = this.points ? JSON.parse(JSON.stringify(this.points)) : []
      const point = { x: event.layerX - event.target.offsetLeft, y: event.layerY - event.target.offsetTop }
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
      ctx.clearRect(0, 0, this.size, this.size)
      if (this.points.length > 0 && this.repeat > 0 && this.radius > 0) {
        const p1 = { x: this.zoom(this.points[0].x), y: this.zoom(this.points[0].y) }
        ctx.moveTo(p1.x, p1.y)
        ctx.beginPath() // to clear also for new path
        ctx.lineWidth = this.lineWidth
        ctx.lineCap = 'round'
        for (let r = 0; r < this.repeat; r++) {
          if (this.separate) {
            ctx.moveTo(p1.x, p1.y)
            ctx.beginPath()
          }
          for (let i = 0; i < this.points.length; i++) {
            const p = { x: this.zoom(this.points[i].x), y: this.zoom(this.points[i].y) }
            const distance = this.$math.distanceBetween(p, this.center)
            const angle = this.$math.angleBetween(p, this.center)
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
        const imageData = ctx.getImageData(0, 0, this.size, this.size)
        const image = {
          data: this.$utils.imgDataToUrl(imageData),
          label: 'image',
          width: this.size,
          height: this.size
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
