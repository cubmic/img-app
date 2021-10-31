<template>
  <div class="row q-gutter-xs items-center justify-end" style="height:45px">
    <span>{{ data.label }}</span>
    <div class="dot-bg" ref="dotbg" style="width:20px; height:20px; position:relative;">
      <div
        ref="drag"
        class="dot"
        :class="{ 'dot-drag': drag, [`dot-${data.color}`]: true }"
        v-drag="dragDefs"
        :id="'k' + data.id"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  name: 'Out',
  props: {
    data: Object
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
          const objIn = this.$refs.drag
          const objOut = this.$refs.dotbg
          this.updateConnectionDrag({ out: objOut, in: objIn })
        },
        end: (vm) => {
          if (!this.hit) {
            const objIn = this.$refs.drag
            const objOut = this.$refs.dotbg
            this.$math.animate(this.pos, { x: 0, y: 0 }, 0.5, 'easeOutCubic', 30, (value) => {
              objIn.style.left = value.x + 'px'
              objIn.style.top = value.y + 'px'
              this.updateConnectionDrag({ out: objOut, in: objIn })
            },
            () => {
              this.resetConnectionDrag()
            })
            this.$emit('changed')
          }
          this.drag = false
        },
        drop: (obj, vm) => {
          if (obj.classList.contains(`only-allow-out-${this.data.type}`)) {
            const inConnection = vm.getConnection()
            if (this.data.type === inConnection.type) {
              this.addConnection({
                out: { parentId: this.data.parentId, id: this.data.id },
                in: { parentId: inConnection.parentId, id: inConnection.id },
                data: null
              })
              this.resetConnectionDrag()
              setTimeout(() => {
                this.updateConnections()
              }, 0)
              this.hit = true
              this.$emit('changed', this.data.key)
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
  methods: {
    ...mapMutations('globals', ['addConnection', 'updateConnections', 'updateConnectionDrag', 'resetConnectionDrag'])
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
