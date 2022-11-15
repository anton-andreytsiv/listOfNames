<template>
    <div> 
    <div v-if="user">
        <div class="logout">Hello {{user}}<br /><button @click="logOut">logout</button></div>
    <div class="main">    
    <div class="drop-zone" @drop="onDrop($event)"  @dragover.prevent  @dragenter.prevent>
      <div v-if="names"><h2>List of names:</h2>
        <div v-for="name, index in names" :key="name.id" class="drag-el" draggable="true"  @dragstart="startDrag($event, name)">
        <div class="parent" @drop="onDrop($event, index)"  @dragover.prevent  @dragenter.prevent>
            <div class="number">{{ incrementIndex(index) }}. </div>
            <div class="name"><input class="name-field" type="text" :value="name.name" @change="updateNameText($event, name.id, index)"></div>
            <div class="edit">
                <input type="button" @click="saveNameText(index, name.id)" :ref="'save' + index" :disabled="true" value="save" /> 
                <input type="button" @click="delName(name.id)" value="delete" /></div> 
        </div>
        </div>
        <div class="addName">
            <div class="name"><input type="text" v-model='addName' placeholder="add new name to list" size="40"/></div>
            <div class="addName"><input type="button" @click="addNameToList()" value="add name to the list" /></div>
        </div>
        <div>
            <input type="button" @click="saveList()" value="save order of your list" />
        </div>
      </div>
      <div v-else><h1>Loading data...</h1></div>
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
      data(){
        return {
            addName: ''
        }
      },
    
      async setup(){
        const names = ref([])
        const user = ref(null)
        let userId = 0
        
        if (localStorage.getItem('user')){
            user.value = localStorage.getItem('user')
            userId = localStorage.getItem('userId')
        
            const inpuNnames = await listService.getAllNames()
            const list = await listService.getList(userId)
            names.value = list.map(el =>{
                return inpuNnames.find(name => name.id == el.nameId)
            })
    }
    
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
      }
    },

    logOut () {
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
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
    },

   async addNameToList(){
        const res = await listService.addName(this.addName)
        if(res){
            this.names.push(res)
            this.addName = ''
            alert('name is added')
        } else {
            alert ('error of add')
        }
    },
    async delName(id){
        if(confirm("Are you sure to delete this item? ")){
            const res = await listService.delName(id)
            if(res){
                this.names = this.names.filter(el => el.id != id)
                alert('name is deleted')
            } else {
                alert ('error of update')
            }
        }
    },

    async saveNameText(indx, id){
        const newName = this.names.find(el => el.id == id).name
        const res = await listService.updName(id, newName);
        if(res){
            alert('name is updated')
        } else {
            alert ('error of update')
        }
        this.$refs['save'+indx][0].disabled = true
    },
    updateNameText(e, id, indx){
        const newName = e.target.value;
        this.names.find(el => el.id == id).name = newName
        this.$refs['save'+indx][0].disabled = false
    }
    } 
    
    
    }
    </script>
    
    <style scoped>
 .name-field{
    border: none;
    font-size: 12pt;
}
.parent{
    display: flex;
}
.addName{
    display: flex;
}
.addButton{
    float: right;
    min-width: 100px;
}
.number{
    padding: 0px 5px 0px 5px;
}
.name{
    width:100%;
    text-align: left;
}
.edit{
    float: right;
    min-width: 100px;
}
.logout{
    display: block;
    text-align:  right;
    margin: 0px 50px 0px 0px;
}
.drop-zone {
  background-color: #eee;
  padding: 10px;
  text-align: left;
  width: 500px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
.edit-zone {
  float: right;
  min-height: 10 px;
  margin: 10 px;
  background: #eee;
}
.main{
  display:flex;
  padding:10px;
  margin: auto;
  padding: 10px;
  width:600px;
}
    </style>
    