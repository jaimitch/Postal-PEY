<template>
<div>
    <div class="frame">
      {{ this.currentPage }} 
      <div
      class='drop-zone-1'
      @dragover.prevent
      @dragenter.prevent
      @drop="onDropOutside($event)"
      >   
        <div 
          class='drag-el' 
          v-for='item in items' 
          :key='item.title' 
          :draggable ='item.draggable'
          @dragstart='startDrag($event, item)'
          @drop="onDrop($event,item)"
        >
          {{ item.title }}
          <div 
            class='drag-el-inner' 
            v-for="child in item.items" 
            :key='child.title' 
            @click="doThing(item,child)"
            @drop="onDrop($event,child)"
            :draggable='child.draggable'
            @dragstart="startDragChild($event, child)"
          >
            {{child.title}}
          </div>
        </div>
        
      
    </div>
      <PageNav/>
  </div>


</div>
  
</template>

<script>

import PageNav from '../Navigation/PageNav.vue'

export default {
  name: 'Frame',
  components: {
      PageNav,

  },
  data() {
        return {
            drop: false,
            items: [
            {
                id: 0,
                title: "Item A",
                items: [],
                draggable: true
            },
            {
                id: 1,
                title: "Truck",
                items: [],
                draggable: true
            },
            {
                id: 2,
                title: "Item C",
                items: [],
                draggable: true
            },
            {
                id: 3,
                title: "Safe",
                items: [],
                draggable: true
            }
            ],
            drag: false,
            idCounter: 1000,
            
            
        }
    },
    computed: {
        currentPage() {
            return this.$store.state.pageNum;
        },
    },
    methods: {
            startDrag (evt, item)  {
                if(this.drag == false){
                    evt.dataTransfer.dropEffect = 'move'
                    evt.dataTransfer.effectAllowed = 'move'
                    evt.dataTransfer.setData('itemID', item.id)
                }
                this.drag = false
            },
                startDragChild (evt, item)  {
                this.drag = true;
                evt.dataTransfer.dropEffect = 'move'
                evt.dataTransfer.effectAllowed = 'move'
                evt.dataTransfer.setData('itemID', item.id)
                },
                onDropOutside (evt) {
                    const itemID = evt.dataTransfer.getData('itemID')
                    if(this.items.find(item => item.id == itemID) == undefined) {
                        console.log(this.items.find(item => item.id == itemID))
                        this.items.push(this.items.find(item => item.id == itemID))
                    }
                },
                onDrop (evt, item) {
                    const itemID = evt.dataTransfer.getData('itemID')
                    if(item.items.find(item => item.id == itemID) == undefined) {
                        console.log(this.items.find(item => item.id == itemID))
                        if(this.items.find(item => item.id == itemID) != undefined){
                            console.log("top")
                            this.items.find(item => item.id == itemID).parentID = item.id;
                            item.items.push(this.items.find(item => item.id == itemID))
                            
                        }
                        else{
                           console.log(this.items.find(thing => thing.id == item.parentID))
                        }
                    }
                    else{
                        console.log("this")
                    }
                    if(this.drop == true){
                        item.items.pop();
                        this.drop = false;
                    }
                 },
                 
                doThing(item,child){
                item.items = item.items.filter(thing => thing !== child)
                //console.log(index)
                }

    }
        
}
</script>

<style scoped>
.frame{
    position: absolute;
    top: 5%;
    left: 10%;
    width: 80%;
    height: 95%;
    z-index: 1;
    /* overflow: scroll; */
    font-family: Arial, Helvetica, sans-serif;
    background-color: #3F3F3F;
}
  .drop-zone-1 {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
    width: 5vw;
  }
    .drop-zone-2 {
    position: absolute;
    background-color: #eee;
    margin-bottom: 10px;
    padding: 10px;
    width: 7vw;
    right: 0vw;
    top:0;
  }

  .drag-el {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 5px;
  }
  .drag-el-inner {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
