<template>
  <q-item class="q-pa-xs">
    <!--
    <pre>
    {{ data.outputs }}
    </pre>
    -->
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
export default defineComponent({
  name: 'ImageInput',
  props: {
    data: Object
  },
  data () {
    return {
      channels: {
        c: { r: true, g: true, b: true, a: true },
        r: { r: true, g: false, b: false, a: false },
        g: { r: false, g: true, b: false, a: false },
        b: { r: false, g: false, b: true, a: false },
        a: { r: false, g: false, b: false, a: true }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['outConnectionWithId', 'allOutConnectionWithItemId']),
    allOutConnections () {
      return this.allOutConnectionWithItemId(this.data.id)
    }
  },
  methods: {
    ...mapMutations('globals', ['setData', 'setInputs']),
    updateChannels () {
      for (const input of this.data.inputs) {
        // color image
        if (input.type === 'image' && input.value) {
          // all outputs
          for (const output of this.data.outputs) {
            const connection = this.outConnectionWithId(output.id)
            if (connection) {
              this.$utils.getChannel(input.value.data, value => {
                this.setInputs({ parentId: connection.in.parentId, id: connection.in.id, value: { data: value, label: input.value.label } })
              }, this.channels[output.key])
            }
          }
        }
      }
    }
  },
  watch: {
    'data.inputs': {
      handler () {
        this.updateChannels()
      },
      deep: true,
      immediate: true
    },
    allOutConnections () {
      this.updateChannels()
    }
  }
})
</script>
