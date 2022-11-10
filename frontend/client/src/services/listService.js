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
    if (response.data.name) {
     return response.data;
    }
    else {
      console.log ("error of saving list");
      return null
    }    
  }).catch(error => console.log(error));
}


}

export default listService;
