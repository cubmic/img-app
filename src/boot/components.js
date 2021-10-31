import { boot } from 'quasar/wrappers'

import IconButton from '../components/IconButton.vue'
import JsonUploadButton from '../components/JsonUploadButton.vue'
import Gradient from 'src/components/Gradient.vue'

import FormInput from 'src/components/FormInput.vue'
import FormSelect from 'src/components/FormSelect.vue'
import FormImage from 'src/components/FormImage.vue'

import In from 'src/components/In.vue'
import Out from 'src/components/Out.vue'
import Connection from 'src/components/Connection.vue'

import Item from 'src/components/Item.vue'
import ImageColor from 'src/components/Items/ImageColor.vue'
import ImageGradient from 'src/components/Items/ImageGradient.vue'
import ImageRGBA from 'src/components/Items/ImageRGBA.vue'
import ImageHSL from 'src/components/Items/ImageHSL.vue'
import ImageOutput from 'src/components/Items/ImageOutput.vue'
import ImageResize from 'src/components/Items/ImageResize.vue'
import ImageCrop from 'src/components/Items/ImageCrop.vue'

import NumberInput from 'src/components/Items/NumberInput.vue'
import NumberMath from 'src/components/Items/NumberMath.vue'

export default boot(({ app }) => {
  app.component('IconButton', IconButton)
  app.component('JsonUploadButton', JsonUploadButton)
  app.component('Gradient', Gradient)

  app.component('FormInput', FormInput)
  app.component('FormSelect', FormSelect)
  app.component('FormImage', FormImage)

  app.component('In', In)
  app.component('Out', Out)
  app.component('Connection', Connection)

  app.component('Item', Item)
  app.component('ImageColor', ImageColor)
  app.component('ImageGradient', ImageGradient)
  app.component('ImageRGBA', ImageRGBA)
  app.component('ImageHSL', ImageHSL)
  app.component('ImageOutput', ImageOutput)
  app.component('ImageResize', ImageResize)
  app.component('ImageCrop', ImageCrop)

  app.component('NumberInput', NumberInput)
  app.component('NumberMath', NumberMath)
})
