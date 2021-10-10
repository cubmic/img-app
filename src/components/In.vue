<template>
  <div class="col">
    <div class="row q-gutter-xs items-center">
      <div class="col-auto">
        <div class="dot" :id="'k' + data.id" v-drop :class="`only-allow-out-${data.type} dot-${data.color}`" />
      </div>
      <div class="col">
        <Form-image v-model="value" v-if="data.type === 'image'" />
        <Form-input v-model="value" v-if="data.type === 'integer'" type="integer" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'

export default defineComponent({
  name: 'In',
  props: {
    data: Object
  },
  computed: {
    value: {
      get () { return this.data.value },
      set (newVal) {
        this.setInputs({ parentId: this.data.parentId, id: this.data.id, value: newVal })
      }
    }
  },
  methods: {
    ...mapMutations('globals', ['setInputs']),
    getConnection () {
      return this.data
    }
  }
})
</script>

<style scoped>
.dot {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  transition: 0.5s box-shadow;
}
.dot div {
  height: 100%;
  pointer-events: none;
  border-radius: 50%;
}
</style>
