import { uid } from 'quasar'

export default {
  namespaced: true,
  getters: {
    items: state => state.items,

    itemTypes: state => state.itemTypes,
    ITEM_TYPE_DEFS: state => state.itemTypeDefs,

    connections: state => state.connections,
    connectionDrag: state => state.connectionDrag,
    connectionSize: state => {
      const dragX = state.connectionDrag ? [state.connectionDrag.in.x, state.connectionDrag.out.x] : [0]
      const dragY = state.connectionDrag ? [state.connectionDrag.in.y, state.connectionDrag.out.y] : [0]
      return {
        width: Math.max(0, ...state.connections.map(o => o.in.x), ...state.connections.map(o => o.out.x), ...dragX),
        height: Math.max(0, ...state.connections.map(o => o.in.y), ...state.connections.map(o => o.out.y), ...dragY)
      }
    },
    inConnectionWithId: state => id => state.connections.find(o => `${o.in.id}-${o.in.name}` === id),
    outConnectionWithId: state => id => state.connections.filter(o => `${o.out.id}-${o.out.name}` === id)
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
          connection.in.x = (i ? (rect.left + rect.right) / 2 : rect.left) + window.scrollX
          connection.in.y = (rect.top + rect.bottom) / 2 + window.scrollY
        }
        {
          const o = document.querySelector(`#out-${connection.out.id}-${connection.out.name}`)
          const rect = o ? o.getBoundingClientRect() : document.querySelector(`#item-${connection.out.id}`).getBoundingClientRect()
          connection.out.x = (o ? (rect.left + rect.right) / 2 : rect.right) + window.scrollX
          connection.out.y = (rect.top + rect.bottom) / 2 + window.scrollY
        }
      }
    },
    updateConnectionDrag: (state, objects) => {
      state.connectionDrag = {
        out: {
          x: objects.out.getBoundingClientRect().left,
          y: objects.out.getBoundingClientRect().top + 10
        },
        in: {
          x: objects.in.getBoundingClientRect().left,
          y: objects.in.getBoundingClientRect().top + 10
        }
      }
    },
    resetConnectionDrag: (state) => {
      state.connectionDrag = null
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
      { id: 1, label: 'Image Input', color: '#9BD', component: 'ImageInput', data: { image: { data: null, label: null } } },
      { id: 2, label: 'Image Output', color: '#9BD', component: 'ImageOutput', data: { image: { data: null, label: null } } },
      { id: 3, label: 'Image Resize', color: '#9BD', component: 'ImageResize', data: { image: { data: null, label: null } } }
    ],

    connections: [],
    connectionDrag: null
  }
}
