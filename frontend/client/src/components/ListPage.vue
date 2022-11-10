<template>
    <div> 
    <div v-if="user">
        <div class="logout">Hello {{user}}<br /><button @click="logOut">logout</button></div>
    <div class="main">    
    <div class="drop-zone" @drop="onDrop($event)"  @dragover.prevent  @dragenter.prevent>
      <div v-if="names">list of names
        <div v-for="name, index in names" :key="name.id" class="drag-el" draggable="true"  @dragstart="startDrag($event, name)">
        <div @drop="onDrop($event, index)"  @dragover.prevent  @dragenter.prevent>{{ incrementIndex(index) }}. {{name.name}}</div>
        </div>
      </div>
      <div v-else><h1>Loading data...</h1></div>
    </div>
    <div class="edit-zone">
        <input type="button" @click="saveList()" value="save list of names" />
    </div>
    </div>
    </div>
    <div v-else>
    <h2>Please <RouterLink to="/login">login</RouterLink> or <RouterLink to="/register">register</RouterLink></h2>
    
    </div>
    </div>
    </template>
    <script>
    import { ref } from 'vue'
    import listService from '@/services/listService'
    
    export default {
      name: 'ListPage',
    
      async setup(){
        const names = ref([])
        const user = ref(null)
    
        if (localStorage.getItem('user')){
            user.value = localStorage.getItem('user')
            
        }

        names.value = await listService.getAllNames()
    
    
    
      return { user, names }
    },
    methods:{ 

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },

    onDrop(evt, pos) {
      const itemID = evt.dataTransfer.getData('itemID')
      if(pos>=0){
        const posItem = this.names.findIndex(el => {return el.id == itemID})
        if (posItem < pos){
            pos++
        }
        const left = this.names.slice(0, pos).filter(el => el.id != itemID)
        const right = this.names.slice(pos).filter(el => el.id != itemID)
        const mid = this.names.find(el => el.id == itemID)

        this.names = left.concat(mid, right)
        console.log(posItem, pos)
      }
    },

    logOut () {
      localStorage.removeItem('user')
      this.$router.push({path:'/login'})
    },
    incrementIndex(i) {
        return i + 1;
    },

    async saveList(){
        const res = await listService.saveListOfNames(this.names)
        if (res){
            alert("you succesfully saved the list")
        }
        else{
            alert("something goes wrong")
        }
    }
    } 
    
    
    }
    </script>
    
    <style scoped>
.logout{
    display: block;
    text-align:  right;
    margin: 0px 50px 0px 0px;
}
.drop-zone {
  background-color: #eee;
  flex:1;
  padding: 10px;
  text-align: left;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
.edit-zone {
  flex:1;
  float: right;
  min-height: 10 px;
  width: 200px;
  margin: 10 px;
  background: rgb(238, 234, 234);
}
.main{
  display:flex;
  padding:10px;
  margin: auto;
  padding: 10px;
  width:500px;
}
    </style>
    