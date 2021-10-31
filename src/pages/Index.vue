<template>
  <div class="q-pa-sm">
    <div class="row q-gutter-sm items-center">
      <IconButton icon="add" color="positive">
        <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
          <q-list style="width:300px">
            <q-expansion-item
              v-for="(group, index) in ITEM_TYPE_DEFS" :key="index"
              :label="group.name"
              :header-style="`background:${group.color}`"
              group="group"
            >
              <q-list>
                <q-item clickable v-for="item in group.items" :key="item.id" :style="`background:${lighten(item.color, 30)}`" v-close-popup @click="addItem(item)">
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </q-popup-proxy>
      </IconButton>
      <IconButton icon="get_app" @click="$utils.exportJSONfromObj('img-app-data', download)" />
      <JsonUploadButton @uploaded="upload" />
    </div>

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
    <pre>{{ connections }}</pre>
    -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { colors } from 'quasar'
const { lighten } = colors

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapGetters('globals', ['items', 'connections', 'connectionSize', 'connectionDrag', 'ITEM_TYPE_DEFS', 'download'])
  },
  methods: {
    ...mapMutations('globals', ['addItem', 'upload']),
    lighten: lighten
  }
})
</script>
