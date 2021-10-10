<template>
  <div class="q-pa-sm">
    <Form-select :options="ITEM_TYPE_DEFS" :modelValue="null" @update:modelValue="addItem" style="width:300px" />

    <!-- connection lines -->
    <svg
      style="position:absolute; pointer-events:none; left:0; top:0; z-index:0"
      :width="connectionSize.width" :height="connectionSize.height" stroke="#999" stroke-width="2" fill="transparent"
    >
      <Connection v-for="item in connections" :key="item.id" :item="item" />
      <Connection :item="connectionDrag" v-if="connectionDrag" />
    </svg>

    <!-- items -->
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
    ...mapGetters('globals', ['items', 'connections', 'connectionSize', 'connectionDrag', 'ITEM_TYPE_DEFS'])
  },
  methods: {
    ...mapMutations('globals', ['addItem'])
  }
})
</script>
