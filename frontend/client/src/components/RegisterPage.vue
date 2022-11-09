<template>
  <div class="reg">
  <h2>Please enter your data for registration</h2>
   <input type="text" name="name" placeholder="Name" required v-model="name"> <br />
   <input type="text" name="email" placeholder="Email" required v-model="email"> <br />
   <input type="password" name="password" placeholder="Password" required v-model="password"><br />
   <input type="password" name="password2" placeholder="Repeat password" required v-model="password2"><br />
   <input type="submit" value="register" v-on:click="register">
   <hr />
   or <RouterLink to="/login">login</RouterLink>
   </div>
</template>

<script>
import loginService from '../services/loginService.js';


export default {
  name: 'RegiterPage',
  data() {
    return {
        name: '',
        email: '',
        password: '',
        password2: ''
    }
  },
  methods:{ 
    
    register: async function () {
      if (this.password !== this.password2 || this.password.length < 5)
        {
          alert('password must be not less then 5 symbols, or you typed different passwords');
          return false;
        }else {
          const res = await loginService.register(this.name, this.email, this.password)
          if (res){
            alert('successful registration of user')
            this.$router.push({path:'/'})       
          }
        }
    }
  } 
}
</script>

<style scoped>
input {
    width: 150px;
    float:none;
    margin: 10px 10px;
}
.reg{
  text-align: center;
}
</style>
