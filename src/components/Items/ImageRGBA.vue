<template>
  <div />
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
        r: { r: true, g: false, b: false, a: false },
        g: { r: false, g: true, b: false, a: false },
        b: { r: false, g: false, b: true, a: false },
        a: { r: false, g: false, b: false, a: true }
      }
    }
  },
  computed: {
    ...mapGetters('globals', ['connectionsWithOutId', 'allOutConnectionWithItemId']),
    allOutConnections () {
      return this.allOutConnectionWithItemId(this.data.id)
    }
  },
  methods: {
    ...mapMutations('globals', ['setData', 'setInputs']),
    updateChannels () {
      for (const input of this.data.inputs) {
        // color image
        if (input.type === 'image') {
          // all outputs
          for (const output of this.data.outputs) {
            const connections = this.connectionsWithOutId(output.id)
            if (connections.length > 0) {
              if (input.value && input.value.data) {
                this.$utils.getRGBAChannel(input.value.data, value => {
                  for (const conn of connections) {
                    this.setInputs({ id: conn.in.id, value: { data: value, label: input.value.label } })
                  }
                }, this.channels[output.key])
              } else {
                for (const conn of connections) {
                  this.setInputs({ id: conn.in.id, value: null })
                }
              }
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
