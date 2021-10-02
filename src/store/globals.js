import { uid } from 'quasar'

export default {
  namespaced: true,
  getters: {
    items: state => state.items,

    itemTypes: state => state.itemTypes,
    ITEM_TYPE_DEFS: state => state.itemTypeDefs,

    connections: state => state.connections,
    inConnectionWithId: state => id => state.connections.find(o => `${o.in.id}-${o.in.name}` === id),
    outConnectionWithId: state => id => state.connections.find(o => `${o.out.id}-${o.out.name}` === id)
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
      item.id = uid()
      state.connections.push(item)
    },
    setConnection: (state, { id, value }) => {
      console.log(state.connections.find(o => `${o.out.id}-${o.out.name}` === id))
      state.connections.find(o => `${o.out.id}-${o.out.name}` === id).data = value
    }
  },
  actions: {
  },
  state: {
    items: [],
    itemDef: { name: 'New Item', x: 0, y: 0, inputs: {}, outputs: {} },

    itemTypeDefs: [
      { id: 1, label: 'Image Input', component: 'ImageInput', data: { image: { data: null, label: null } } },
      { id: 2, label: 'Image Output', component: 'ImageOutput', data: { image: { data: null, label: null } } },
      { id: 3, label: 'Image Resize', component: 'ImageResize', data: { image: { data: null, label: null } } }
    ],

    connections: [],
    connectionDef: { id: null, in: { id: null, name: null }, out: { id: null, name: null }, data: null }
    /*
    ,
    dataDefs: [
      { label: 'Integer', value: null, color: '#975' },
      { label: 'Float', value: null, color: '#579' },
      { label: 'Array', value: [], color: '#795' },
      { label: 'String', value: null, color: '#597' },
      { label: 'Image', value: { data: null, label: null }, color: '#759' },
      { label: 'Color', value: { r: null, g: null, b: null, a: null }, color: '#957' }
    ]
    */
  }
}
