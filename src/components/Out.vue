<template>
  <div class="dot-bg" style="width:20px; height:20px; position:relative; margin-right:-15px;" :id="`out-${id}-${name}`">
    <div
      ref="drag"
      class="dot"
      :class="{ 'dot-drag': drag }"
      :style="`background:${color}`"
      v-drag="dragDefs"
      :id="`in-${id}-${name}`"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
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
          this.updateConnections()
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
              this.updateConnections()
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
              this.updateConnections()
              this.hit = true
              this.$emit('changed')
              // reset pos
              this.$refs.drag.style.top = '0px'
              this.$refs.drag.style.left = '0px'
            }
          }
        }
      }
    }
  },
  watch: {
    hasConnection () {
      console.log('no connection')
    }
  },
  computed: {
    ...mapGetters('globals', ['outConnectionWithId']),
    hasNoConnection () {
      return this.outConnectionWithId(`${this.id}-${this.name}`)
    },
    width () {
      return Math.max(this.posX, -this.posX)
    },
    height () {
      return Math.max(this.posY, -this.posY)
    }
  },
  methods: {
    ...mapMutations('globals', ['addConnection', 'delConnection', 'updateConnections'])
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
  width: 20px;
  height: 20px;
  border: 1px solid #000;
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
