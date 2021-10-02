import { boot } from 'quasar/wrappers'

import ButtonAdd from '../components/ButtonAdd.vue'
import ButtonDel from '../components/ButtonDel.vue'

import FormInput from 'src/components/FormInput.vue'
import FormSelect from 'src/components/FormSelect.vue'
import FormImage from 'src/components/FormImage.vue'

import In from 'src/components/In.vue'
import Out from 'src/components/Out.vue'

import Item from 'src/components/Item.vue'
import ImageInput from 'src/components/Items/ImageInput.vue'
import ImageOutput from 'src/components/Items/ImageOutput.vue'

export default boot(({ app }) => {
  app.component('ButtonAdd', ButtonAdd)
  app.component('ButtonDel', ButtonDel)

  app.component('FormInput', FormInput)
  app.component('FormSelect', FormSelect)
  app.component('FormImage', FormImage)

  app.component('In', In)
  app.component('Out', Out)

  app.component('Item', Item)
  app.component('ImageInput', ImageInput)
  app.component('ImageOutput', ImageOutput)
})
