<template>
<div>
    <div class="frame">
      <div
      class='drop-zone-1'
      @dragover.prevent
      @dragenter.prevent
      >   
        <div 
          class='drag-el' 
          v-for='item in firstLevel' 
          :key='item.title' 
          draggable=false
          @drop="onDrop($event,item.id)"
        >
          {{ item.title }}
                  <div 
                    class='drag-el-layer2' 
                    v-for='child in getChildrenIndexes(item.id)' 
                    :key='child' 
                    :draggable ='true'
                    @dragstart='startDrag($event, items[child])'
                    @drop="onDrop($event,items[child].id)"
                    >{{items[child].title}}
                          <div 
                            class='drag-el-layer3' 
                            v-for='grandchild in getChildrenIndexes(items[child].id)' 
                            :key='grandchild' 
                            :draggable ='true'
                            @dragstart='startDrag($event, items[grandchild])'
                            @drop="onDrop($event,items[grandchild].id)"
                            >{{items[grandchild].title}}
                          </div>
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
            items: [
            {
                id: 0,
                title: "Truck",
                children: [1],
                level: 1,
            },
            {
                id: 4,
                title: "Safe",
                children: [2,3],
                level: 1,
            },
            {
                id: 1,
                title: "Letter",
                children: [],
                level: 2,

            },
            {
                id: 2,
                title: "Package",
                children: [],
                level: 2,

            },
            {
                id: 3,
                title: "Pouch",
                children: [],
                level: 2,

            }
            ],
            idCounter: 1000,
            draggedItem: {}
        }
    },
    computed: {
        currentPage() {
            return this.$store.state.pageNum;
        },
        firstLevel() {
          let res = [];
          this.items.forEach(item => {
            if (item.level === 1) {
              res.push(item)
            }
          })
          return res
        },
    },
    methods: {
            startDrag (evt, item)  {
                    evt.dataTransfer.dropEffect = 'move'
                    evt.dataTransfer.effectAllowed = 'move'
                    evt.dataTransfer.setData('itemID', item.id)
                    evt.dataTransfer.setData('parentID', this.findParent(item.id))
                    evt.stopPropagation()
              },
            onDrop (evt, destination) {
                const draggedID = evt.dataTransfer.getData('itemID')
                const prevParentID = evt.dataTransfer.getData('parentID')
                if(draggedID != destination){
                  this.removeItemOnDrop(draggedID,prevParentID)
                  this.items[this.getItemIndex(draggedID)].level = destination.level+1
                  this.items[this.getItemIndex(destination)].children.push(this.getItemIndex(draggedID)-1)
                }
                evt.stopPropagation();
              },
            getItemIndex(id){
              let index = this.items.findIndex(item => item.id == id)
              return index
              },
            getChildrenIndexes(id){
              let children = this.items[this.getItemIndex(id)].children.map(child => {
                let index = this.getItemIndex(child)
                return index
              })
              return children
              },
            findParent(id){
                for(var i = 0; i < this.items.length; i++){
                  if(this.items[i].children.indexOf(id) != -1){
                    return this.items[i].id
                  }
                }
              },
            removeItemOnDrop(itemID,parentID){
                var index = this.getItemIndex(parentID) 
                return this.items[index].children = this.items[index].children.filter(x => x != itemID)
              },
            findParentIndex(itemID){
                for(var i = 0; i < this.items.length; i++){
                  if(this.items[i].children.indexOf(itemID) == -1){
                    return i
                  }
                }
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
    width: 10vw;
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
  .drag-el-layer2 {
    background-color: #eee;
    margin-bottom: 10px;
    padding: 5px;
  }
  .drag-el-layer3 {
    background-color: #ddd;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
