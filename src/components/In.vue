<template>
  <div class="row q-gutter-xs items-center" style="min-height:45px">
    <template v-if="connection">
      <div class="dot-bg">
        <div class="dot" :id="'k' + data.id" v-drop v-drag="dragDefs" ref="drag" style="cursor:move;" :class="dotClass + ` dot-${connection.color}`" />
        <span class="q-ml-lg">{{ connection.label }}</span>
      </div>
    </template>
    <template v-else>
      <div class="dot-bg">
        <div class="dot" :id="'k' + data.id" v-drop ref="drag" :class="dotClass + ` dot-${this.data.color}`" />
      </div>
      <div class="col" @mousedown.stop>

        <!-- array -->
        <div class="row q-col-gutter-xs" v-if="data.type === 'array'">
          <div v-for="(item, index) in data.value" :key="index" class="col-auto">
            <q-chip
              @remove="removeArrayItemAtIndex(index)"
              :label="index + 1"
              removable
              square
              class="q-ma-none"
              style="border:1px solid rgba(0, 0, 0, 0.24);"
            />
          </div>
          <div class="col-auto">
            <IconButton icon="add" color="positive" padding="xs" @click="addArrayItem()" />
          </div>
        </div>

        <!-- image -->
        <Form-image v-model="value" v-if="data.type === 'image'" />

        <!-- boolean -->
        <Form-toggle v-model="value" v-if="data.type === 'boolean'" :label="data.label" />

        <!-- integer -->
        <Form-input v-model="value" v-if="data.type === 'integer'" type="integer" :label="data.label" />

        <!-- float -->
        <Form-input v-model="value" v-if="data.type === 'float'" type="float" :label="data.label" />

        <!-- select -->
        <Form-select v-model="value" v-if="data.type === 'select'" :type="data.type" :options="data.options" :label="data.label" />
      </div>
    </template>
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
    ...mapGetters('globals', ['connectionWithInId']),
    dotClass () {
      return this.data.allow.map(o => `only-allow-out-${o}`).join(' ')
    },
    connection () {
      return this.connectionWithInId(this.data.id)
    },
    value: {
      get () { return this.data.value },
      set (newVal) {
        this.setInputWithId({ id: this.data.id, value: newVal })
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['setInputWithId', 'updateConnections', 'delConnection']),
    getConnection () {
      return this.data
    },
    removeArrayItemAtIndex (index) {
      const arrayCopy = JSON.parse(JSON.stringify(this.value))
      arrayCopy.splice(index, 1)
      this.value = arrayCopy
    },
    addArrayItem () {
      const arrayCopy = JSON.parse(JSON.stringify(this.value))
      arrayCopy.push(this.data.schema)
      this.value = arrayCopy
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
