<template>
    <div> 
    <h1>List of names:</h1>
    <div v-if="user">
      <div v-if="products">
  
      </div>
      <div v-else><h1>Loading data...</h1></div>
    </div>
    <div v-else>
    <h2>Please login or register</h2>
    
    </div>
    </div>
    </template>
    <script>
    
    import productsService from '../productsService.js'
    import { ref, watchEffect } from 'vue'
    
    export default {
      name: 'ListPage',
    
      methods:{
        
      addToCart(id){
        if(!this.amountArr[id]){
          alert('please insert amount of items you want to buy');
        }   else{    
          this.cart[id] = this.amountArr[id]
          this.emitter.emit('addCart', this.cart)
          localStorage.setItem('cart', JSON.stringify(this.cart));
        }}
      },
    
    async setup(){
    
      const user = ref(null)
      let products = ref(null)
      const amountArr = ref([])
    
      if (localStorage.getItem('user')){
            user.value = localStorage.getItem('user')
          }
    
    
    
      return { getImgUrl, amountArr, cart, user, products}
    },
    
      created () {
          this.emitter.on('login', () => {
          this.user = localStorage.getItem('user')     
        })
      }
    
    
    }
    </script>
    
    <style scoped>
    
    
    .product {
      display:flex;
      text-align: left;
      clear: both;
      margin: 10px 0 px;
      border-bottom: solid;
      overflow: auto;
    
    }
    .left {
      flex:1;
      text-align: left;
      padding: 10px;
      width: 150px;
    }
    .amount{
      width: 30px;
      margin-left: 5px;
    }
    .add{
    
      margin-left: 5px;
    }
    
    </style>
    