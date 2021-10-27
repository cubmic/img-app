<template>
  <q-file dense outlined v-model="img" bg-color="grey-4">
    <template v-slot:prepend>
      <img :src="modelValue.data" height="30" v-if="modelValue" />
    </template>
    <template v-slot:append>
      <q-icon name="close" class="cursor-pointer" @click.stop.prevent="$emit('update:modelValue', null)" v-if="modelValue" />
      <q-icon name="cloud_upload" class="cursor-pointer" @click.stop v-else />
    </template>
  </q-file>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FormImage',
  props: {
    modelValue: Object
  },
  computed: {
    img: {
      get () {
        return this.modelValue ? new File([''], this.modelValue.label) : null
      },
      set (newVal) {
        this.imgChanged(newVal)
      }
    }
  },
  methods: {
    imgChanged (file) {
      if (file) {
        this.getBase64(file, image => {
          this.$emit('update:modelValue', image)
        })
      } else {
        this.$emit('update:modelValue', null)
      }
    },
    getBase64 (file, resolve) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        const image = new Image()
        image.src = reader.result
        image.onload = function () {
          const newImage = { data: reader.result, label: file.name, width: this.width, height: this.height }
          resolve(newImage)
        }
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  }
})
</script>
