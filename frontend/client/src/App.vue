<template>
  <Suspense>
    <RouterView></RouterView>
  </Suspense>
</template>

<script>
import { ref } from 'vue'


export default {
  name: 'App',
  
  setup(){
    const user = ref (null)
    if (localStorage.getItem('user')){
      user.value = localStorage.getItem('user')
    }
    return {user}
  },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
