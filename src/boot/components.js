import { boot } from 'quasar/wrappers'

import ButtonAdd from '../components/ButtonAdd.vue'
import ButtonDel from '../components/ButtonDel.vue'

import FormInput from 'src/components/FormInput.vue'
import FormSelect from 'src/components/FormSelect.vue'
import FormImage from 'src/components/FormImage.vue'

import Number from 'src/components/Items/Number.vue'
import Image from 'src/components/Items/Image.vue'

export default boot(({ app }) => {
  app.component('ButtonAdd', ButtonAdd)
  app.component('ButtonDel', ButtonDel)

  app.component('FormInput', FormInput)
  app.component('FormSelect', FormSelect)
  app.component('FormImage', FormImage)

  app.component('Number', Number)
  app.component('Image', Image)
})
