import { boot } from 'quasar/wrappers'

import ButtonAdd from '../components/ButtonAdd.vue'
import ButtonDel from '../components/ButtonDel.vue'

import FormInput from 'src/components/FormInput.vue'
import FormSelect from 'src/components/FormSelect.vue'
import FormImage from 'src/components/FormImage.vue'

import In from 'src/components/In.vue'
import Out from 'src/components/Out.vue'
import Connection from 'src/components/Connection.vue'

import Item from 'src/components/Item.vue'
import ImageColor from 'src/components/Items/ImageColor.vue'
import ImageRGBA from 'src/components/Items/ImageRGBA.vue'
import ImageOutput from 'src/components/Items/ImageOutput.vue'
import ImageResize from 'src/components/Items/ImageResize.vue'

export default boot(({ app }) => {
  app.component('ButtonAdd', ButtonAdd)
  app.component('ButtonDel', ButtonDel)

  app.component('FormInput', FormInput)
  app.component('FormSelect', FormSelect)
  app.component('FormImage', FormImage)

  app.component('In', In)
  app.component('Out', Out)
  app.component('Connection', Connection)

  app.component('Item', Item)
  app.component('ImageColor', ImageColor)
  app.component('ImageRGBA', ImageRGBA)
  app.component('ImageOutput', ImageOutput)
  app.component('ImageResize', ImageResize)
})
