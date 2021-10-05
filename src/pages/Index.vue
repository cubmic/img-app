<template>
  <div class="q-pa-sm">
    <Form-select :options="ITEM_TYPE_DEFS" :modelValue="null" @update:modelValue="addItem" style="width:300px" />
    <svg
      style="position:absolute; pointer-events:none; left:0; top:0; z-index:0"
      :width="width"
      :height="height"
      stroke="#999"
      stroke-width="2"
      fill="transparent"
    >
      <Connection v-for="item in connections" :key="item.id" :item="item" />
    </svg>
    <div style="position:relative; height:500px" class="q-mt-sm">
      <Item bordered v-for="item in items" :key="item.id" :data="item" />
    </div>
    <!--
    <pre>{{ items }}</pre>
    -->
    <pre>{{ connections }}</pre>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapGetters('globals', ['items', 'connections', 'ITEM_TYPE_DEFS']),
    width () {
      return Math.max(0, ...this.connections.map(o => o.in.x), ...this.connections.map(o => o.out.x))
    },
    height () {
      return Math.max(0, ...this.connections.map(o => o.in.y), ...this.connections.map(o => o.out.y))
    }
  },
  methods: {
    ...mapMutations('globals', ['addItem'])
  }
})
</script>
