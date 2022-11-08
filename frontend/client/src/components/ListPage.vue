<template>
    <div> 
    <h1>List of names:</h1>
    <div v-if="user">
      <div v-if="1">list of items
  
      </div>
      <div v-else><h1>Loading data...</h1></div>
    </div>
    <div v-else>
    <h2>Please <a href="/login">login</a> or <a href="/register">register</a></h2>
    
    </div>
    </div>
    </template>
    <script>
    import { ref } from 'vue'
    
    export default {
      name: 'ListPage',
    
      async setup(){
    
      const user = ref(null)
    
      if (localStorage.getItem('user')){
            user.value = localStorage.getItem('user')
          }
    
    
    
      return { user }
    },
    
    
    }
    </script>
    
    <style scoped>

    </style>
    