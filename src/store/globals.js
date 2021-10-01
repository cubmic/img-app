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
      const dataType = JSON.parse(JSON.stringify(state.itemTypes.find(o => o.id === item.id)))
      state.items.push({
        id: uid(),
        label: 'New Item',
        x: 0,
        y: 0,
        dataType: dataType
      })
      console.log(JSON.stringify(state.items, null, 2))
    },
    delItem: (state, id) => {
      state.items = state.items.filter(o => o.id !== id)
    },
    setItem: (state, { id, key, value }) => {
      state.items.find(o => o.id === id)[key] = value
    },

    /* data */
    setData: (state, { id, key, value }) => {
      state.items.find(o => o.id === id).dataType.data[key] = value
    }
  },
  actions: {
  },
  state: {
    items: [],
    itemTypes: [
      {
        id: 1,
        label: 'Image',
        data: {
          image: {
            data: null,
            label: null
          }
        }
      },
      {
        id: 2,
        label: 'Image Resize',
        data: {
          image: {
            data: null,
            label: null
          },
          rect: {
            left: null,
            top: null,
            right: null,
            bottom: null
          }
        }
      }
    ],
    datas: [],
    dataTypes: [
      { label: 'Integer', value: null, color: '#975' },
      { label: 'Float', value: null, color: '#579' },
      { label: 'Array', value: [], color: '#795' },
      { label: 'String', value: null, color: '#597' },
      { label: 'Image', value: null, color: '#759' },
      { label: 'Color', value: { r: null, g: null, b: null, a: null }, color: '#957' }
    ]
  }
}
