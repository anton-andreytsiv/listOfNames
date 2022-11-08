<template>
    <div>
    Please login
     <input type="text" name="email" placeholder="Username" required v-model="email"> 
     <input type="password" name="password" placeholder="Password" required v-model="password">
     <input type="submit" value="login" v-on:click="login">
     <hr />
     <router-link to="/register">register</router-link>
     </div>
  </template>
  
  <script>
  import loginService from '../services/loginService.js';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods:{ 
      
      login: async function () {
        const res = await loginService.login(this.email, this.password)
        if (res){
            this.$router.push({path:'/'})
        }
        else {
            alert('error');
        }
      }
    } 
  }
  </script>
  

  <style scoped>
  input {
    display:block;
    width: 150px;
    float:none;
    margin: 10px 10px;
}
  </style>
  