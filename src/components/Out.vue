<template>
  <div class="dot-bg" :style="`width:${size}px; height:${size}px; position:absolute`">
    <div
      ref="drag"
      class="dot"
      :class="{ 'dot-drag': drag }"
      :style="`width:${size}px; height:${size}px; background:${color}`"
      v-drag="dragDefs"
    />
    <!-- line -->
    <svg
      style="transform-origin:0 0; pointer-events:none"
      :style="`margin-left:${size / 2}px; margin-top:${size / 2}px; transform:scaleX(${posX < 0 ? -1 : 1}) scaleY(${posY < 0 ? -1 : 1})`"
      :width="width"
      :height="height"
    >
      <defs>
        <linearGradient :id="`gradient-${nr}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#666"/>
          <stop offset="100%" :stop-color="color"/>
        </linearGradient>
      </defs>
      <path :d="
        `M0 0
        C${width / 2 + 1} 0, ${width / 2 + 1} ${height - 2}, ${width} ${height - 2}
        L${width} ${height}
        C${width / 2 - 1} ${height}, ${width / 2 - 1} 2, 0 2`
      " stroke="none" stroke-width="0" :fill="`url(#gradient-${nr})`" />
    </svg>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  name: 'Out',
  props: {
    id: String,
    name: String,
    type: String,
    color: {
      type: String,
      default: '#21BA45'
    }
  },
  data () {
    return {
      nr: null,
      size: 20,
      drag: false,
      hit: false,
      posX: 0,
      posY: 0,
      dragDefs: {
        start: (vm) => {
          this.drag = true
          this.hit = false
        },
        drag: (pos) => {
          this.posX = pos.x
          this.posY = pos.y
        },
        end: (vm) => {
          if (!this.hit) {
            const obj = this.$refs.drag
            this.$math.animate(this.posX, 0, 1, 'easeOutElastic', 50, (value) => {
              this.posX = value
              obj.style.left = value + 'px'
            })
            this.$math.animate(this.posY, 0, 1, 'easeOutElastic', 50, (value) => {
              this.posY = value
              obj.style.top = value + 'px'
            })
            this.$emit('changed')
          }
          this.drag = false
        },
        drop: (vm) => {
          const obj = vm.$el
          if (obj.classList.contains(`only-allow-out-${this.type}`)) {
            const inConnection = vm.getConnection()
            if (this.type === inConnection.type) {
              this.addConnection({
                out: { name: this.name, id: this.id },
                in: { name: inConnection.name, id: inConnection.id },
                data: null
              })
              this.hit = true
              this.$emit('changed')
            }
          }
        }
      }
    }
  },
  computed: {
    width () {
      return Math.max(this.posX, -this.posX)
    },
    height () {
      return Math.max(this.posY, -this.posY)
    }
  },
  methods: {
    ...mapMutations('globals', ['addConnection'])
  },
  mounted () {
    this.nr = this._.uid
  }
})
</script>

<style scoped>
.dot {
  position: absolute;
  border-radius: 50%;
  border: 2px solid #FFF;
  transition: 0.5s box-shadow;
  cursor: move;
}
.dot-drag {
  box-shadow: 0 0 10px #000;
}
.dot-bg {
  background: #666;
  border-radius: 50%;
}
</style>
