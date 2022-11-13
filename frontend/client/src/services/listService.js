import axios from "axios";


const url = "http://localhost:8000/list/";


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

static async getList(userId) {

  return axios.get(url + userId,{
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

static async saveListOfNames(list){
  const userId = localStorage.getItem("userId")
  return axios.post(url + "saveList", {
    list,
    userId
  }, {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
    
  }).then (response => { 
    if (response.data == "done") {
     return response.data;
    }
    else {
      console.log ("error of saving list");
      return null
    }    
  }).catch(error => console.log(error));
}

static async updName(id, name){
  return axios.put(url + id, {
    name
  }, {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
    
  }).then (response => { 
    if (response.data) {
     return response.data;
    }
    else {
      console.log ("error of update name");
      return null
    }    
  }).catch(error => console.log(error));

}

static async delName(id) {
  return axios.delete(url + id,{
    withCredentials: true
  }).then (response => { 
    if (response.data) {      
      return response.data;
    }
    else {
      alert ("data delete error");
      return null
    }    
  }).catch(error => console.log(error));
}

static async addName(name) {
  return axios.post(url +"addName",{
    name
  },
  {
    withCredentials: true
  }).then (response => { 
    if (response.data) {      
      return response.data;
    }
    else {
      alert ("data add name error");
      return null
    }    
  }).catch(error => console.log(error));
}



}

export default listService;
