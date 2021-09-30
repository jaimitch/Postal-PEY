<template>
<div>
 <div class="top-bar"><p class="left-text">Page {{this.$store.state.pageNum}}</p><p class="right-text">Right side text</p></div>
    
    <div class="frame">
      <div
      class='drop-zone'
      @dragover.prevent
      @dragenter.prevent
      >   
        <div 
          class='parent-level' 
          v-for='item in firstLevel' 
          :key='item.title' 
          draggable=false
          @drop="onDrop($event,item.id)"
        >
          {{ item.title }}
                  <div 
                    class='child-level' 
                    v-for='child in getChildrenIndexes(item.id)' 
                    :key='child' 
                    :draggable ='true'
                    @dragstart='startDrag($event, items[child])'
                    @drop="onDrop($event,items[child].id)"
                    >{{items[child].title}}
                          <div 
                            class='grand-child-level' 
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
      <div class = "vertical-line"></div>
      <div class="right-side-content">RIGHT SIDE CONTENT</div>
      
    </div>
  <PageNav/>
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
    display: flex;
    flex-direction: row;
    font: Arial;
    position: absolute;
    top: 5vh;
    left: 0;
    width: 100vw;
    height: 95vh;
    z-index: 1;
    font-family: Arial;
    background-color: #333366;
    justify-content: space-evenly;
    align-items: center;
}
  .drop-zone {
    order: 1;
    background-color: #333366;
    width: 15vw;
    
  }
  .right-side-content{
    order: 3;
    color: #D5D5D5;
  }
  .parent-level {
    background-color: #D5D5D5;
    margin-bottom: 10px;
    padding: 5px;
    color: #42426A;
    border-radius: 5px;
  }
  .child-level {
    background-color: #42426A;;
    margin-bottom: 10px;
    padding: 5px;
    color: #D5D5D5;
    border-radius: 5px;
  }
  .grand-child-level {
    background-color: #ddd;
    margin-bottom: 5px;
    padding: 5px;
    color: #42426A;
    border-radius: 5px;
  }
  .vertical-line {
    order:2;
    border-left: .25vw solid white;
    top: 10vh;
    height: 75vh;
    z-index: 4;
  }
  .top-bar {
    font: Arial;
    position: absolute;
    top: 0;
    left: 3vw;
    width: 97vw;
    height: 5vh;
    z-index: 2;
    font-family: Arial;
    background-color: #32334B;
    text-align: left;
    color: white;
  }
  .right-text{
    position: absolute;
    top:0;
    left:85vw;
    font-family: Arial;
  }
  .left-text {
    position: absolute;
    top: 0;
    left: 1vw;
    font-family: Arial;
    color: white;
  }
</style>
