<template>
  <q-list
    class="item"
    :class="{ 'item-drag': drag }"
    :style="`left:${data.x}px; top:${data.y}px;`"
    v-drag="dragDefs"
  >
    <div class="row q-col-gutter-xs items-center" style="pointer-events:none; margin-bottom:2px">
      <q-icon name="drag_indicator" size="xs" />
      <div class="col">{{ data.name }}</div>
      <div>
        <q-icon
          name="expand_more"
          size="xs"
          style="pointer-events:all; cursor:pointer; transition:all 1s;"
          :style="`transform:rotate(${data.expand ? 90 : 0}deg)`"
          @click="setItem({ id: data.id, key: 'expand', value: !data.expand })"
        />
      </div>
    </div>
    <q-item class="bg-grey-2" @mousedown.stop v-if="data.expand">
      <q-item-section>
        <Form-input :modelValue="data.name" @update:modelValue="setItem({ id: data.id, key: 'name', value: $event })" />
      </q-item-section>
      <q-item-section avatar>
        <ButtonDel class="avatar" @click="delItem(data.id)" />
      </q-item-section>
    </q-item>
    <component :is="data.component" :item="data" />
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
        start: () => {
          this.drag = true
        },
        drag: (pos) => {
          this.setItem({ id: this.data.id, key: 'x', value: pos.x })
          this.setItem({ id: this.data.id, key: 'y', value: pos.y })
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
