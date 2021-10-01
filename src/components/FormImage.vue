<template>
  <q-file style="width:100%" dense outlined v-model="img">
    <template v-slot:prepend v-if="modelValue.data">
      <img :src="modelValue.data" height="30"/>
    </template>
    <template v-slot:append>
      <q-icon name="close" @click.stop.prevent="$emit('update:modelValue', { data: null, label: null })" class="cursor-pointer" v-if="modelValue.data" />
      <q-icon name="cloud_upload" @click.stop v-else />
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
        return this.modelValue.data ? new File([''], this.modelValue.label) : null
      },
      set (newVal) {
        this.imgChanged(newVal)
      }
    }
  },
  methods: {
    imgChanged (file) {
      if (file) {
        this.getBase64(file, data => {
          this.$emit('update:modelValue', { data, label: file.name })
        })
      } else {
        this.$emit('update:modelValue', { data: null, label: null })
      }
    },
    getBase64 (file, resolve) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        resolve(reader.result)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
    /*
    ,
    calcImg (src) {
      // <canvas id="canvas" v-show="false"></canvas>
      const img = new Image()
      img.src = src
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      img.onload = () => {
        const dstWidth = img.width
        const dstHeight = img.height
        canvas.width = dstWidth
        canvas.height = dstHeight
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, dstWidth, dstHeight)
        const imageData = ctx.getImageData(0, 0, dstWidth, dstHeight)
        // create 2d array
        const array = []
        let nr = 0
        for (let x = 0; x < dstHeight; x++) {
          const row = []
          for (let x = 0; x < dstHeight; x++) {
            row.push({
              r: imageData.data[nr + 0],
              g: imageData.data[nr + 1],
              b: imageData.data[nr + 2],
              a: imageData.data[nr + 3]
            })
            nr += 4
          }
          array.push(row)
        }
        this.$emit('update:modelValue', array)
      }
    }
    */
  }
})
</script>
