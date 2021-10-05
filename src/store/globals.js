import { uid } from 'quasar'

export default {
  namespaced: true,
  getters: {
    items: state => state.items,

    itemTypes: state => state.itemTypes,
    ITEM_TYPE_DEFS: state => state.itemTypeDefs,

    connections: state => state.connections,
    inConnectionWithId: state => id => state.connections.find(o => `${o.in.id}-${o.in.name}` === id),
    outConnectionWithId: state => id => state.connections.filter(o => `${o.out.id}-${o.out.name}` === id)
    // DATA_DEFS: state => state.dataDefs
  },
  mutations: {
    addItem: (state, itemType) => {
      const item = JSON.parse(JSON.stringify(state.itemDef))
      item.id = uid()
      // copy item type defs into item
      item.label = itemType.label
      item.data = itemType.data
      item.component = itemType.component
      item.color = itemType.color
      state.items.push(item)
    },
    delItem: (state, id) => {
      state.connections = state.connections.filter(o => o.in.id !== id && o.out.id !== id)
      state.items = state.items.filter(o => o.id !== id)
    },
    setItem: (state, { id, key, value }) => {
      state.items.find(o => o.id === id)[key] = value
    },
    setData: (state, { id, key, value }) => {
      state.items.find(o => o.id === id).data[key] = value
    },
    setInputs: (state, { id, key, value }) => {
      state.items.find(o => o.id === id).inputs[key] = value
    },
    setOutputs: (state, { id, key, value }) => {
      state.items.find(o => o.id === id).outputs[key] = value
    },
    addConnection: (state, item) => {
      // delete possible in-connection first
      state.connections = state.connections.filter(o => !(o.in.id === item.in.id && o.in.name === item.in.name))
      item.id = uid()
      item.in.x = null
      item.in.y = null
      item.out.x = null
      item.out.y = null
      state.connections.push(item)
    },
    updateConnections: (state) => {
      for (const connection of state.connections) {
        {
          const i = document.querySelector(`#in-${connection.in.id}-${connection.in.name}`)
          const rect = i ? i.getBoundingClientRect() : document.querySelector(`#item-${connection.in.id}`).getBoundingClientRect()
          connection.in.x = rect.left
          connection.in.y = rect.top
        }
        {
          const o = document.querySelector(`#out-${connection.out.id}-${connection.out.name}`)
          const rect = o ? o.getBoundingClientRect() : document.querySelector(`#item-${connection.out.id}`).getBoundingClientRect()
          connection.out.x = o ? rect.left : rect.right - 10
          connection.out.y = rect.top
        }
      }
    },
    delConnection: (state, { id, name }) => {
      state.connections = state.connections.filter(o => o.in.id === id && o.in.name === name)
    },
    setConnection: (state, { id, value }) => {
      state.connections.find(o => o.id === id).data = value
    }
  },
  actions: {
  },
  state: {
    items: [],
    itemDef: { name: 'New Item', x: 0, y: 0, expand: true },

    itemTypeDefs: [
      { id: 1, label: 'Image Input', component: 'ImageInput', data: { image: { data: null, label: null } } },
      { id: 2, label: 'Image Output', component: 'ImageOutput', data: { image: { data: null, label: null } } },
      { id: 3, label: 'Image Resize', component: 'ImageResize', data: { image: { data: null, label: null } } }
    ],

    connections: []
  }
}
