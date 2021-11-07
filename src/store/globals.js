import { uid } from 'quasar'

const itemTypeDefs = [
  {
    id: 1,
    group: 'Image',
    width: 350,
    label: 'Select',
    color: '#9BD',
    icon: 'image',
    component: 'ImageColor',
    inputs: [
      { allow: ['image'], type: 'image', color: 'color', label: 'Color', key: 'color', value: null }
    ],
    outputs: [
      { type: 'image', color: 'color', label: 'Color', key: 'color' }
    ]
  },
  {
    id: 2,
    group: 'Image',
    width: 350,
    label: 'RGBA',
    color: '#9BD',
    icon: 'palette',
    component: 'ImageRGBA',
    inputs: [
      { allow: ['image'], type: 'image', color: 'color', label: 'Color', key: 'color', value: null }
    ],
    outputs: [
      { type: 'image', color: 'red', label: 'Red', key: 'red' },
      { type: 'image', color: 'green', label: 'Green', key: 'green' },
      { type: 'image', color: 'blue', label: 'Blue', key: 'blue' },
      { type: 'image', color: 'alpha', label: 'Alpha', key: 'alpha' }
    ]
  },
  {
    id: 3,
    group: 'Image',
    width: 350,
    label: 'HSL',
    color: '#9BD',
    icon: 'palette',
    component: 'ImageHSL',
    inputs: [
      { allow: ['image'], type: 'image', color: 'color', label: 'Color', key: 'color', value: null }
    ],
    outputs: [
      { type: 'image', color: 'color', label: 'Hue', key: 'hue' },
      { type: 'image', color: 'alpha', label: 'Satuarion', key: 'saturation' },
      { type: 'image', color: 'alpha', label: 'Lightness', key: 'lightness' }
    ]
  },
  {
    id: 4,
    group: 'Image',
    width: 350,
    label: 'Preview',
    color: '#9BD',
    icon: 'visibility',
    component: 'ImageOutput',
    inputs: [
      { allow: ['image'], type: 'image', color: 'color', label: 'Color', key: 'color', value: null }
    ],
    outputs: [
      { type: 'image', color: 'color', label: 'Color', key: 'color' }
    ]
  },
  {
    id: 5,
    group: 'Image',
    width: 350,
    label: 'Crop',
    color: '#9BD',
    icon: 'crop',
    component: 'ImageCrop',
    inputs: [
      { allow: ['image'], type: 'image', color: 'color', label: 'Color', key: 'color', value: null },
      { allow: ['integer'], type: 'integer', color: 'integer', label: 'Left', key: 'left', value: null },
      { allow: ['integer'], type: 'integer', color: 'integer', label: 'Top', key: 'top', value: null },
      { allow: ['integer'], type: 'integer', color: 'integer', label: 'Width', key: 'width', value: null },
      { allow: ['integer'], type: 'integer', color: 'integer', label: 'Height', key: 'height', value: null }
    ],
    outputs: [
      { type: 'image', color: 'color', label: 'Color', key: 'color' }
    ]
  },
  {
    id: 6,
    group: 'Image',
    width: 350,
    label: 'Resize',
    color: '#9BD',
    icon: 'aspect_ratio',
    component: 'ImageResize',
    inputs: [
      { allow: ['image'], type: 'image', color: 'color', label: 'Color', key: 'color', value: null },
      { allow: ['integer'], type: 'integer', color: 'integer', label: 'Width', key: 'width', value: null },
      { allow: ['integer'], type: 'integer', color: 'integer', label: 'Height', key: 'height', value: null }
    ],
    outputs: [
      { type: 'image', color: 'color', label: 'Color', key: 'color' }
    ]
  },
  {
    id: 7,
    group: 'Image',
    width: 350,
    label: 'Gradient',
    color: '#9BD',
    icon: 'gradient',
    component: 'ImageGradient',
    inputs: [
      { allow: ['image'], type: 'image', color: 'alpha', label: 'Lightness', key: 'lightness', value: null },
      { allow: ['array'], type: 'array', color: 'array', label: 'Gradient', key: 'gradient', value: [{ id: 1, color: '#000000ff', percent: 0 }, { id: 2, color: '#00000000', percent: 100 }] }
    ],
    outputs: [
      { type: 'image', color: 'color', label: 'Color', key: 'color' }
    ]
  },
  {
    id: 8,
    group: 'Number',
    width: 200,
    label: 'Integer',
    color: '#ADD',
    icon: 'looks_one',
    component: 'NumberInput',
    inputs: [
      { allow: ['integer', 'float'], type: 'integer', color: 'number', label: 'Integer', key: 'number', value: null }
    ],
    outputs: [
      { type: 'integer', color: 'integer', label: 'Integer', key: 'number' }
    ]
  },
  {
    id: 9,
    group: 'Number',
    width: 200,
    label: 'Float',
    color: '#DDA',
    icon: 'looks_two',
    component: 'NumberInput',
    inputs: [
      { allow: ['float', 'integer'], type: 'float', color: 'number', label: 'Float', key: 'number', value: null }
    ],
    outputs: [
      { type: 'float', color: 'float', label: 'Float', key: 'number' }
    ]
  },
  {
    id: 10,
    group: 'Number',
    width: 200,
    label: 'Math',
    color: '#DAA',
    icon: 'calculate',
    component: 'NumberMath',
    inputs: [
      { allow: ['integer', 'float'], type: 'float', color: 'number', label: 'Float', key: 'numberA', value: null },
      { allow: ['integer', 'float'], type: 'float', color: 'number', label: 'Float', key: 'numberB', value: null },
      { allow: ['select'], type: 'select', color: 'select', label: 'Function', key: 'func', value: { label: 'Add', value: '+' }, options: [{ label: 'Add', value: '+' }, { label: 'Substract', value: '-' }, { label: 'Multiply', value: '*' }, { label: 'Divide', value: '/' }] }
    ],
    outputs: [
      { type: 'float', color: 'float', label: 'Float', key: 'number' }
    ]
  }
]

export default {
  namespaced: true,
  getters: {
    download: state => {
      return {
        items: state.items,
        connections: state.connections
      }
    },
    items: state => state.items,

    itemTypes: state => state.itemTypes,
    ITEM_TYPE_DEF_GROUPS: state => [...new Set(itemTypeDefs.map(o => o.group))],
    ITEM_TYPE_DEFS: state => {
      return [...new Set(itemTypeDefs.map(o => o.group))].map(o => {
        const items = itemTypeDefs.filter(e => e.group === o)
        return { name: o, items: items, color: items[0].color }
      })
    },

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
    connectionWithInId: state => id => state.connections.find(o => o.in.id === id)
  },
  mutations: {
    upload: (state, payload) => {
      state.items = payload.items
      state.connections = payload.connections
    },
    addItem: (state, itemType) => {
      itemType = JSON.parse(JSON.stringify(itemType))
      const item = JSON.parse(JSON.stringify(state.itemDef))
      item.id = 'item-' + uid()
      // copy item type defs into item
      item.label = itemType.label
      item.data = itemType.data
      item.width = itemType.width
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
    setInputWithId: (state, { id, value }) => {
      for (const key in state.items) {
        const found = state.items[key].inputs.find(o => o.id === id)
        if (found) {
          found.value = value
          break
        }
      }
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
    connections: [],
    connectionDrag: null
  }
}
