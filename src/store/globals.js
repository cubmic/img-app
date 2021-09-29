import { uid } from 'quasar'

export default {
  namespaced: true,
  getters: {
    items: state => state.items,
    ITEM_TYPES: state => state.itemTypes,

    datas: state => state.datas,
    dataWithId: state => id => state.datas.find(o => o.id === id),
    DATA_TYPES: state => state.dataTypes
  },
  mutations: {
    /* items */
    addItem: (state, item) => {
      // add needed itemtype
      const data = JSON.parse(JSON.stringify(state.itemTypes.find(o => o.label === item.label)))
      // add all needed datatypes
      const dataTypes = []
      for (const types of data.dataTypes) {
        const t = JSON.parse(JSON.stringify(state.dataTypes.find(o => o.label === types)))
        t.id = uid()
        state.datas.push(t)
        dataTypes.push(t.id)
      }
      data.dataTypes = dataTypes
      state.items.push({
        id: uid(),
        label: 'New Item',
        x: 0,
        y: 0,
        data: data
      })
      console.log(JSON.stringify(state.items, null, 2))
      console.log(JSON.stringify(state.datas, null, 2))
    },
    delItem: (state, id) => {
      // cleanup first all related datatypes
      for (const dataId of state.items.find(o => o.id === id).data.dataTypes) {
        state.datas = state.datas.filter(e => e.id !== dataId)
      }
      state.items = state.items.filter(o => o.id !== id)
    },
    setItem: (state, { id, key, value }) => {
      state.items.find(o => o.id === id)[key] = value
    },

    /* data */
    setData: (state, { id, value }) => {
      state.datas.find(o => o.id === id).value = value
    },
    delData: (state, id) => {
      state.datas = state.datas.filter(o => o.id !== id)
    }
  },
  actions: {
  },
  state: {
    items: [],
    itemTypes: [
      { label: 'Number', dataTypes: ['Integer'] },
      { label: 'Image', dataTypes: ['String'] }
    ],
    datas: [],
    dataTypes: [
      { label: 'Integer', value: null },
      { label: 'Float', value: null },
      { label: 'Array', value: [] },
      { label: 'String', value: null },
      { label: 'Color', value: { r: null, g: null, b: null, a: null } }
    ]
  }
}
