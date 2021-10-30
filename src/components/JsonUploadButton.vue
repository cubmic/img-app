<template>
  <IconButton icon="upload" @click="pick" />
  <q-file v-show="false" @update:modelValue="uploaded" accept="application/json" ref="upload" />
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'JsonUploadButton',
  props: {
    modelValue: Object
  },
  data () {
    return {
      file: null
    }
  },
  methods: {
    pick () {
      this.$refs.upload.pickFiles()
    },
    uploaded (file) {
      file.text().then(data => {
        this.$emit('uploaded', JSON.parse(data))
      })
    }
  }
})
</script>
