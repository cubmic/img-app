<template>
  <div>

    <q-toolbar class="text-primary bg-grey-4 shadow-2">
      <q-toolbar-title>
        Img-App {{ appVersion }}
      </q-toolbar-title>
      <IconButton icon="add" color="positive" class="q-mr-xs">
        <q-popup-proxy>
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
      <IconButton icon="get_app" @click="$utils.exportJSONfromObj('img-app-data', download)" class="q-mr-xs" />
      <JsonUploadButton @uploaded="upload" />
    </q-toolbar>

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
    ...mapGetters('globals', ['items', 'connections', 'connectionSize', 'connectionDrag', 'ITEM_TYPE_DEFS', 'download']),
    appVersion () {
      return process.env.APP_VERSION_SHORT
    }
  },
  methods: {
    ...mapMutations('globals', ['addItem', 'upload']),
    lighten: lighten
  }
})
</script>
