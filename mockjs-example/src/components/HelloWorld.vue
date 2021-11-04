<script setup lang="ts">
import { ref } from 'vue'
import mock from "mockjs"
import { get, post, text } from "/@/api"
defineProps<{ msg: string }>()
const count = ref(0)
let result = ref(null)
const handleGet = () => {
  get().then(res => {
    console.log(res)
    result.value = res.data.name
  })
}
const handlePost = () => {
  post().then(res => {
    console.log(res)
    result.value = res.data.name
  })
}
const handleText = () => {
  text().then(res => {
    console.log(res)
    result.value = res.data.number
  })
}
const test = import.meta.env.VITE_APP_MOCK
console.log('import.meta',import.meta.env.VITE_APP_MOCK)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="container">
    <button @click="handleGet">get请求</button>
    <button @click="handlePost">post请求</button>
    <button @click="handleText">生成一个浮点数</button>
  </div>
  <div>{{result}}</div>
</template>

<style scoped>
.container{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}
button + button{
  margin-left:20px;
}
</style>
