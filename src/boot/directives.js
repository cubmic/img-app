import { boot } from 'quasar/wrappers'

import { drag, drop } from '../directives/vue3-dragmaster.js'

export default boot(({ app }) => {
  app.directive('drag', drag)
  app.directive('drop', drop)
})
