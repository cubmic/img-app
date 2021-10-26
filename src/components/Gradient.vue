<template>
  <div class="q-ma-sm q-mb-xl">
    <div class="gradient q-color-picker__header-bg">
      <div class="gradient" :style="gradient" ref="gradient" @click="addDot">
        <div
          v-for="item in localValue"
          :key="item.id"
          class="dot"
          :ref="`dot-${item.id}`"
          :style="`left:${this.percentToPos(item.percent)}px; background:${item.color}; border: 1px solid ${$utils.contrastColor(item.color)}`"
          v-drag="dragDefs(item)"
          @click.stop
        >
          <div class="line" :style="`background: ${$utils.contrastColor(item.color)}`" />
        </div>
      </div>
    </div>
    <!-- color picker -->
    <q-popup-proxy v-model="dialogOpen" v-if="selectedItem">
      <q-card>
        <q-card-section class="q-pa-xs">
          <q-color :modelValue="selectedItem.color" @update:modelValue="colorUpdate" />
        </q-card-section>
        <q-card-section class="q-pa-xs q-pt-none">
          <div class="row q-col-gutter-sm">
            <div>
              <q-btn label="cancel" @click="colorCancel()" />
            </div>
            <div>
              <q-btn label="change" @click="colorChange()" color="primary" />
            </div>
            <div>
              <q-btn label="delete" @click="colorDelete()" color="negative" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-popup-proxy>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Gradient',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    modelValue: {
      handler (newVal) {
        if (!this.drag) {
          const array = []
          for (const item of newVal) {
            array.push({ id: item.id, color: item.color, percent: item.percent })
          }
          this.localValue = array
        }
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    return {
      localValue: [],
      drag: false,
      oldColor: null,
      selectedItem: null,
      width: 0,
      dragDefs: item => {
        return {
          yLock: true,
          bounds: () => {
            return {
              left: -10,
              top: 0,
              right: this.width - 10,
              bottom: 50
            }
          },
          start: () => {
            this.drag = true
            this.selectedItem = null
          },
          drag: (pos) => {
            this.localValue.find(o => o.id === item.id).percent = parseFloat(this.posToPercent(pos.x).toFixed(2))
            this.localValue.sort((a, b) => a.percent - b.percent)
            this.$emit('update:modelValue', this.localValue)
          },
          end: (vm, moveDelta, moveDistance) => {
            // drag to bottom
            if (moveDelta.y > 30 && this.localValue.length > 1) {
              this.localValue = this.localValue.filter(o => o.id !== item.id)
              this.$emit('update:modelValue', this.localValue)
            // or on click
            } else if (moveDistance < 3) {
              this.oldColor = item.color
              this.selectedItem = item
            }
            this.drag = false
          }
        }
      }
    }
  },
  computed: {
    gradient () {
      const colors = this.localValue.map(o => `${o.color} ${o.percent}%`).join(',')
      return 'background:' + (this.localValue.length > 1 ? `linear-gradient(90deg, ${colors})` : this.localValue[0] ? this.localValue[0].color : 'transparent')
    },
    dialogOpen: {
      get () {
        return this.selectedItem !== null
      },
      set (newVal) {
        if (!newVal) {
          this.selectedItem = null
        }
      }
    }
  },
  methods: {
    posToPercent (pos) {
      return (pos + 10) * 100 / this.width
    },
    percentToPos (percent) {
      return percent * this.width / 100 - 10
    },
    addDot (event) {
      if (!this.drag) {
        const nextId = Math.max(0, ...this.localValue.map(o => o.id)) + 1
        const percent = this.posToPercent(event.layerX - 10)
        this.localValue.push({ id: nextId, color: '#00000000', percent: percent })
        this.localValue.sort((a, b) => a.percent - b.percent)
        this.$emit('update:modelValue', this.localValue)
      }
    },
    colorUpdate (value) {
      this.localValue.find(o => o.id === this.selectedItem.id).color = value
      this.$emit('update:modelValue', this.localValue)
    },
    colorCancel () {
      this.selectedItem.color = this.oldColor
      this.$emit('update:modelValue', this.localValue)
      this.selectedItem = null
    },
    colorChange () {
      this.selectedItem = null
    },
    colorDelete () {
      this.localValue = this.modelValue.filter(o => o.id !== this.selectedItem.id)
      this.$emit('update:modelValue', this.localValue)
      this.selectedItem = null
    }
  },
  mounted () {
    this.width = this.$refs.gradient.getBoundingClientRect().width
  }
})
</script>

<style scoped>
.gradient {
  position: relative;
  height: 20px;
}
.dot {
  position: absolute;
  top: 10px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  cursor: ew-resize;
  transform-style: preserve-3d;
}
.line {
  position: absolute;
  left: 8px;
  top: -12px;
  width: 2px;
  height: 12px;
  transform: translateZ(-10px);
}
</style>
