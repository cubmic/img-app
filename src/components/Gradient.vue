<template>
  <div class="q-ma-sm q-mb-xl">
    <div class="gradient" :style="gradient" ref="gradient">
      <div
        v-for="(item, index) in modelValue"
        :key="item.id"
        class="dot"
        :ref="`dot-${index}`"
        :style="`background:${item.color}`"
        v-drag="dragDefs(item)"
      />
    </div>
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
      width: 0,
      dragDefs: item => {
        return {
          yLock: true,
          bounds: () => {
            return {
              left: -10,
              top: 0,
              bottom: 50,
              right: this.width - 10
            }
          },
          drag: (pos) => {
            const array = [...this.modelValue]
            array.find(o => o.id === item.id).percent = this.posToPercent(pos.x)
            this.$emit('update:modelValue', array)
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
    }
  },
  mounted () {
    this.width = this.$refs.gradient.getBoundingClientRect().width
    this.modelValue.forEach((o, i) => {
      this.$refs[`dot-${i}`].style.left = this.percentToPos(o.percent) + 'px'
    })
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
}
</style>
