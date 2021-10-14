<template>
  <div />
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
export default defineComponent({
  name: 'ImageHSL',
  props: {
    data: Object
  },
  data () {
    return {
      channels: {
        h: { h: true, s: false, l: false },
        s: { h: false, s: true, l: false },
        l: { h: false, s: false, l: true }
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
                this.$utils.getHSLChannel(input.value.data, value => {
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
