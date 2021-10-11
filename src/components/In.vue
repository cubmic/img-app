<template>
  <div class="col">
    <div class="row q-gutter-xs items-center">
      <div class="dot-bg">
        <div class="dot" :id="'k' + data.id" v-drop v-drag="dragDefs" ref="drag" :class="`only-allow-out-${data.type} dot-${data.color}`" />
      </div>
      <div class="col" v-if="!inConnectionWithId(data.id)" @mousedown.stop>
        <Form-image v-model="value" v-if="data.type === 'image'" />
        <Form-input v-model="value" v-if="data.type === 'integer'" type="integer" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'In',
  props: {
    data: Object
  },
  data () {
    return {
      drag: false,
      dragDefs: {
        start: (vm) => {
          this.drag = true
        },
        drag: (pos) => {
          this.updateConnections()
        },
        end: (vm) => {
          this.delConnection(this.data.id)
          this.drag = false
          // reset pos
          const obj = this.$refs.drag
          obj.style.top = '0px'
          obj.style.left = '0px'
        }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['inConnectionWithId']),
    value: {
      get () { return this.data.value },
      set (newVal) {
        this.setInputs({ parentId: this.data.parentId, id: this.data.id, value: newVal })
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['setInputs', 'updateConnections', 'delConnection']),
    getConnection () {
      return this.data
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
}
.dot-bg {
  position: relative;
  width: 20px;
  height: 20px;
  background: #666;
  border-radius: 50%;
}
</style>
