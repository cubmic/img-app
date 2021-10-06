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
      pos: { x: null, y: null },
      posY: 0,
      dragDefs: {
        start: (vm) => {
          this.drag = true
          this.hit = false
        },
        drag: (pos) => {
          this.pos = pos
        },
        end: (vm) => {
          if (!this.hit) {
            const obj = this.$refs.drag
            this.$math.animate(this.pos, { x: 0, y: 0 }, 0.5, 'easeOutCubic', 30, (value) => {
              obj.style.left = value.x + 'px'
              obj.style.top = value.y + 'px'
            })
            this.$emit('changed')
          }
          this.drag = false
        },
        drop: (vm) => {
          const otherObj = vm.$el
          if (otherObj.classList.contains(`only-allow-out-${this.type}`)) {
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
              const obj = this.$refs.drag
              obj.style.top = '0px'
              obj.style.left = '0px'
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['outConnectionWithId']),
    hasNoConnection () {
      return this.outConnectionWithId(`${this.id}-${this.name}`)
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
