<template>
  <div class="q-ma-sm q-mb-xl">
    <div class="gradient" :style="gradient" ref="gradient" @click="addDot">
      <div
        v-for="item in modelValue"
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
    {{ modelValue }}
    <!-- color picker -->
    <q-popup-proxy :modelValue="selectedItem !== null" v-if="selectedItem">
      <q-card>
        <q-card-section>
          <q-color v-model="selectedItem.color" />
        </q-card-section>
        <q-card-section>
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
  data () {
    return {
      drag: false,
      oldColor: null,
      selectedItem: null,
      width: 0,
      dragDefs: item => {
        return {
          yLock: true,
          bounds: () => {
            const index = this.modelValue.indexOf(item)
            const left = index > 0
              ? this.percentToPos(this.modelValue[index - 1].percent) + 20
              : -10
            const right = index < this.modelValue.length - 1
              ? this.percentToPos(this.modelValue[index + 1].percent) - 20
              : this.width - 10
            return {
              left: left,
              top: 0,
              bottom: 50,
              right: right
            }
          },
          start: () => {
            this.drag = true
          },
          drag: (pos) => {
            const array = [...this.modelValue]
            array.find(o => o.id === item.id).percent = parseFloat(this.posToPercent(pos.x).toFixed(2))
            this.$emit('update:modelValue', array)
          },
          end: () => {
            this.drag = false
          },
          click: () => {
            this.oldColor = item.color
            this.selectedItem = item
          }
        }
      }
    }
  },
  computed: {
    gradient () {
      const colors = this.modelValue.map(o => `${o.color} ${o.percent}%`).join(',')
      return `background: linear-gradient(90deg, ${colors})`
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
        const array = [...this.modelValue]
        const nextId = Math.max(0, ...array.map(o => o.id)) + 1
        const percent = this.posToPercent(event.layerX - 10)
        array.push({ id: nextId, color: '#000', percent: percent })
        array.sort((a, b) => a.percent - b.percent)
        this.$emit('update:modelValue', array)
      }
    },
    colorCancel () {
      this.selectedItem.color = this.oldColor
      this.selectedItem = null
    },
    colorChange () {
      this.selectedItem = null
    },
    colorDelete () {
      const array = this.modelValue.filter(o => o.id !== this.selectedItem.id)
      this.$emit('update:modelValue', array)
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
  border: 1px solid #000;
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
