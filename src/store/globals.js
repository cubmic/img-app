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
    allOutConnectionWithItemId: state => parentId => state.connections.filter(o => o.out.parentId === parentId),
    connectionsWithOutId: state => id => state.connections.filter(o => o.out.id === id),
    connectionsWithInId: state => id => state.connections.filter(o => o.in.id === id)
  },
  mutations: {
    addItem: (state, itemType) => {
      itemType = JSON.parse(JSON.stringify(itemType))
      const item = JSON.parse(JSON.stringify(state.itemDef))
      item.id = 'item-' + uid()
      // copy item type defs into item
      item.label = itemType.label
      item.data = itemType.data
      item.component = itemType.component
      item.color = itemType.color
      item.inputs = itemType.inputs.map((o, i) => {
        o.parentId = item.id
        o.id = 'in-' + uid()
        return o
      })
      item.outputs = itemType.outputs.map((o, i) => {
        o.parentId = item.id
        o.id = 'out-' + uid()
        return o
      })
      state.items.push(item)
    },
    delItem: (state, id) => {
      state.connections = state.connections.filter(o => o.in.parentId !== id && o.out.parentId !== id)
      state.items = state.items.filter(o => o.id !== id)
    },
    setItem: (state, { id, key, value }) => {
      state.items.find(o => o.id === id)[key] = value
    },
    setData: (state, { id, key, value }) => {
      state.items.find(o => o.id === id).data[key] = value
    },
    setInputs: (state, { parentId, id, value }) => {
      state.items.find(o => o.id === parentId).inputs.find(o => o.id === id).value = value
    },
    setOutputs: (state, { parentId, id, value }) => {
      state.items.find(o => o.id === parentId).outputs.find(o => o.id === id).value = value
    },
    addConnection: (state, item) => {
      // delete possible in-connection first
      state.connections = state.connections.filter(o => o.in.id !== item.in.id)
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
          const i = document.querySelector('#k' + connection.in.id)
          const rect = i ? i.getBoundingClientRect() : document.querySelector('#k' + connection.in.parentId).getBoundingClientRect()
          connection.in.x = rect.left + window.scrollX
          connection.in.y = (rect.top + rect.bottom) / 2 + window.scrollY
        }
        {
          const o = document.querySelector('#k' + connection.out.id)
          const rect = o ? o.getBoundingClientRect() : document.querySelector('#k' + connection.out.parentId).getBoundingClientRect()
          connection.out.x = rect.right + window.scrollX
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
    delConnection: (state, id) => {
      state.connections = state.connections.filter(o => o.in.id !== id)
    },
    setConnectionWithOutId: (state, { id, value }) => {
      state.connections.find(o => o.out.id === id).data = value
    }
  },
  actions: {
  },
  state: {
    items: [],
    itemDef: { x: 0, y: 0, expand: true },

    itemTypeDefs: [
      {
        id: 1,
        label: 'Image Color',
        color: '#9BD',
        component: 'ImageColor',
        data: { image: { data: null, label: null } },
        inputs: [
          { type: 'image', color: 'color', label: 'Color', value: null }
        ],
        outputs: [
          { type: 'image', color: 'color', label: 'Color', key: 'c' }
        ]
      },
      {
        id: 2,
        label: 'Image RGBA',
        color: '#9BD',
        component: 'ImageRGBA',
        data: { image: { data: null, label: null } },
        inputs: [
          { type: 'image', color: 'color', label: 'Color', value: null }
        ],
        outputs: [
          { type: 'image', color: 'red', label: 'Red', key: 'r' },
          { type: 'image', color: 'green', label: 'Green', key: 'g' },
          { type: 'image', color: 'blue', label: 'Blue', key: 'b' },
          { type: 'image', color: 'alpha', label: 'Alpha', key: 'a' }
        ]
      },
      {
        id: 3,
        label: 'Image HSL',
        color: '#9BD',
        component: 'ImageHSL',
        data: { image: { data: null, label: null } },
        inputs: [
          { type: 'image', color: 'color', label: 'Color', value: null }
        ],
        outputs: [
          { type: 'image', color: 'color', label: 'Hue', key: 'h' },
          { type: 'image', color: 'alpha', label: 'Satuarion', key: 's' },
          { type: 'image', color: 'alpha', label: 'Lightness', key: 'l' }
        ]
      },
      {
        id: 4,
        label: 'Image Output',
        color: '#9BD',
        component: 'ImageOutput',
        data: { image: { data: null, label: null } },
        inputs: [
          { type: 'image', color: 'color', label: 'Color', value: null }
        ],
        outputs: []
      },
      {
        id: 5,
        label: 'Image Resize',
        color: '#9BD',
        component: 'ImageResize',
        data: { image: { data: null, label: null } },
        inputs: [
          { type: 'image', color: 'color', label: 'Color', value: null },
          { type: 'integer', color: 'integer', label: 'Left', value: null },
          { type: 'integer', color: 'integer', label: 'Top', value: null },
          { type: 'integer', color: 'integer', label: 'Width', value: null },
          { type: 'integer', color: 'integer', label: 'Height', value: null }
        ],
        outputs: [
          { type: 'image', color: 'color', label: 'Color', key: 'c' }
        ]
      }
    ],

    connections: [],
    connectionDrag: null
  }
}
