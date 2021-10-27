import { ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup: props => {
    const { data } = toRefs(props)
    const store = useStore()
    const obj = {}

    // inputs auto mapping to vuex over key
    const computedKeys = []
    for (const input of data.value.inputs) {
      const v = ref(input)
      computedKeys.push(input.key)
      obj[input.key] = computed({
        get: () => v.value.value,
        set: val => {
          val = JSON.parse(JSON.stringify(val)) // copy to do not mutate outside vuex
          store.commit('globals/setInputWithId', { id: input.id, value: val })
        }
      })
    }

    // outputs
    const out = {}
    const methodsKeys = []
    for (const output of data.value.outputs) {
      methodsKeys.push(output.key)
      out[output.key] = value => {
        const connections = store.getters['globals/connectionsWithOutId'](output.id)
        if (connections.length > 0) {
          for (const conn of connections) {
            store.commit('globals/setInputWithId', { id: conn.in.id, value: value })
          }
        }
      }
    }
    obj.out = out

    obj.info = () => {
      let text = ''
      text += 'computed (input) = [\n  ' + computedKeys.join(',\n  ') + '\n]\n'
      text += 'methods (output) = [\n  out.' + methodsKeys.join('(value),\n  out.') + '(value)\n]'
      console.log(text)
    }

    return obj
  }
}
