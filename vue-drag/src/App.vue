<template>
  <div class="vue-drag">
    <button @click="changeshow">change</button>
    <div v-if="isShow">
      <h2>Transform 属性实现拖拽效果</h2>
      <div class="container transformContainer">
        <div
          class="drag"
          v-drag="{ outerElement: '.transformContainer', dragElement: '.head1' }"
        >
          <p class="head1">可拖拽头</p>
          <p>内容</p>
        </div>
      </div>
      <h2>position 属性实现拖拽效果</h2>
      <div class="container positionContainer">
        <div
          class="drag"
          v-drag="{ outerElement: '.positionContainer', dragType: 'position',dragElement: '.head2' }"
        >
          <p class="head2">可拖拽头</p>
          <p>内容</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'app',
  setup() {
    const isShow = ref(true)
    const changeshow = () => {
      isShow.value = !isShow.value
    }
    return { changeshow, isShow }
  },
})
</script>
<style>
.container {
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
.drag {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
</style>
