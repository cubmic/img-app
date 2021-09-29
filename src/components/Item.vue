<template>
  <q-list
    class="item"
    :class="{ 'item-drag': drag }"
    :style="`left:${data.x}px; top:${data.y}px;`"
    v-drag="dragDefs"
    v-drop="dropDefs"
  >
    <q-icon name="drag_indicator" size="xs" style="pointer-events:none" />
    <q-item class="bg-grey-2" @mousedown.stop>
      <q-item-section>
        <Form-input :modelValue="data.label" @update:modelValue="setItem({ id: data.id, key: 'label', value: $event })" />
      </q-item-section>
      <q-item-section avatar>
        <ButtonDel class="avatar" @click="delItem(data.id)" />
      </q-item-section>
    </q-item>
    <component :is="data.data.label" :data="data.data" />
  </q-list>
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
        start: (vm) => {
          this.drag = true
        },
        drag: (pos) => {
          this.setItem({ id: this.data.id, key: 'x', value: pos.x })
          this.setItem({ id: this.data.id, key: 'y', value: pos.y })
        },
        end: (vm) => {
          this.drag = false
        },
        drop: (vm) => {
          console.log('drag', vm.$el)
        }
      },
      dropDefs: {
        drop: (vm) => {
          console.log('drop', vm.$el)
        }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['items'])
  },
  methods: {
    ...mapMutations('globals', ['delItem', 'setItem'])
  }
})
</script>

<style scoped>
  .item {
    position: absolute;
    background: #CCC;
    width: 400px;
    z-index: 0;
    transition: 0.5s box-shadow;
  }
  .item-drag {
    box-shadow: 0 0 10px #000;
    z-index: 1;
  }
</style>
