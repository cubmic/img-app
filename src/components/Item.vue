<template>
  <div
    :id="'k' + data.id"
    class="item"
    :class="{ 'item-drag': drag }"
    :style="`left:${data.x}px; top:${data.y}px; background:${data.color}`"
    v-drag="dragDefs"
  >
    <div class="bg-grey-4" style="pointer-events:none;">
      <div class="row items-center">
        <q-icon name="drag_indicator" size="xs" />
        <div class="col">{{ data.label }}</div>
        <div>
          <q-icon
            name="expand_more"
            size="xs"
            style="pointer-events:all; cursor:pointer; transition:all 1s;"
            :style="`transform:rotate(${data.expand ? 90 : 0}deg)`"
            @click="toggleExpand()"
          />
        </div>
      </div>
    </div>

    <div v-if="data.expand">
      <div class="q-pa-xs">
        <div class="row q-col-gutter-xs items-center" @mousedown.stop>
          <div class="col">
            <Form-input :modelValue="data.label" @update:modelValue="setItem({ id: data.id, key: 'label', value: $event })" />
          </div>
          <div class="col-auto">
            <IconButton icon="close" color="negative" class="avatar" @click="delItem(data.id)" />
          </div>
        </div>
      </div>

      <component :is="data.component" :data="data" class="q-mb-md" ref="item" />

      <!-- connectors -->
      <div class="row q-ma-xs">
        <div class="col-6">
          <div class="column q-gutter-xs justify-start">
            <In v-for="item in data.inputs" :key="item.id" :data="item" />
          </div>
        </div>
        <div class="col-6">
          <div class="column q-gutter-xs justify-start">
            <Out v-for="item in data.outputs" :key="item.id" :data="item" @changed="updateConnection" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'Item',
  props: {
    data: Object
  },
  data () {
    return {
      drag: false,
      dragDefs: {
        start: () => {
          this.drag = true
        },
        drag: (pos) => {
          this.setItem({ id: this.data.id, key: 'x', value: pos.x })
          this.setItem({ id: this.data.id, key: 'y', value: pos.y })
          this.updateConnections()
        },
        end: () => {
          this.drag = false
        }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['items'])
  },
  methods: {
    ...mapMutations('globals', ['delItem', 'setItem', 'updateConnections']),
    toggleExpand () {
      this.setItem({ id: this.data.id, key: 'expand', value: !this.data.expand })
      setTimeout(() => {
        this.updateConnections()
      }, 0)
    },
    updateConnection (key) {
      this.$refs.item.updateConnection(key)
    }
  }
})
</script>

<style scoped>
  .item {
    position: absolute;
    background: #CCC;
    width: 350px;
    z-index: 0;
    transition: 0.5s box-shadow;
  }
  .item-drag {
    box-shadow: 0 0 10px #000;
    z-index: 1;
  }
</style>
