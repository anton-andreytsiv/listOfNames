import axios from "axios";
import { watchEffect } from 'vue'
import { useCookies } from "vue3-cookies";
import jwt_decode from "jwt-decode";

const url = "http://localhost:8000/list/";
const { cookies } = useCookies();
let token = cookies.get('token');
if (token){
   token =  jwt_decode(token);
}

class listService {


static async getAllNames() {

  return axios.get(url,{
    withCredentials: true
  }).then (response => { 
    if (response.status == 200) {      
      return response.data;
    }
    else {
      alert ("data fetch error");
      return null
    }    
  }).catch(error => console.log(error));
}

static async getMyOrders_REST() {
   return axios.get(url+'myOrders',{
      withCredentials: true
        }).then (response => {  
          if (response.status == 200) { 
            return response.data;
          }
          else {
            alert ("data fetch error");
            return null
          }
        }).catch(error => console.log(error));
  }


}

export default listService;
