import { uid } from 'quasar'

export default {
  namespaced: true,
  getters: {
    items: state => state.items
  },
  mutations: {
    addItem: (state) => {
      state.items.push({
        id: uid(),
        name: 'New Item',
        x: 0,
        y: 0
      })
    },
    delItem: (state, id) => {
      state.items = state.items.filter(o => o.id !== id)
    },
    setProp: (state, { id, key, value }) => {
      state.items.find(o => o.id === id)[key] = value
    }
  },
  actions: {
  },
  state: {
    items: []
  }
}
