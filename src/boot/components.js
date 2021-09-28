import { boot } from 'quasar/wrappers'

import ButtonAdd from '../components/ButtonAdd.vue'
import ButtonDel from '../components/ButtonDel.vue'

import FormInput from 'src/components/FormInput.vue'
import FormSelect from 'src/components/FormSelect.vue'

export default boot(({ app }) => {
  app.component('ButtonAdd', ButtonAdd)
  app.component('ButtonDel', ButtonDel)

  app.component('FormInput', FormInput)
  app.component('FormSelect', FormSelect)
})
