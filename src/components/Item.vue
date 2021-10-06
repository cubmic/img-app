<template>
  <div
    :id="`item-${data.id}`"
    class="item"
    :class="{ 'item-drag': drag }"
    :style="`left:${data.x}px; top:${data.y}px; background:${data.color}`"
    v-drag="dragDefs"
  >
    <div class="bg-grey" style="pointer-events:none;">
      <div class="row q-col-gutter-xs items-center">
        <q-icon name="drag_indicator" size="xs" />
        <div class="col">{{ data.name }}</div>
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
    <div class="q-pa-xs" v-if="data.expand">
      <div class="row q-col-gutter-xs" @mousedown.stop>
        <div class="col-9">
          <Form-input :modelValue="data.name" @update:modelValue="setItem({ id: data.id, key: 'name', value: $event })" />
        </div>
        <div class="col-auto">
          <ButtonDel class="avatar" @click="delItem(data.id)" />
        </div>
      </div>
    </div>
    <component :is="data.component" :item="data" />
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
    }
  }
})
</script>

<style scoped>
  .item {
    position: absolute;
    background: #CCC;
    width: 210px;
    z-index: 0;
    transition: 0.5s box-shadow;
  }
  .item-drag {
    box-shadow: 0 0 10px #000;
    z-index: 1;
  }
</style>
