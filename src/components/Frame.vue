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
                    class='drag-el' 
                    v-for='child in getChildrenIndexes(item.id)' 
                    :key='child' 
                    :draggable ='true'
                    @dragstart='startDrag($event, items[child])'
                    @drop="onDrop($event,items[child].id)"
                    >{{items[child].title}}
                          <div 
                            class='drag-el' 
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
            drop: false,
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
            drag: false,
            idCounter: 1000,
            
            
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
                if(this.drag == false){
                    evt.dataTransfer.dropEffect = 'move'
                    evt.dataTransfer.effectAllowed = 'move'
                    evt.dataTransfer.setData('itemID', item.id)
                }
                this.drag = false
              },
            onDrop (evt, destination) {
              //check to make sure not already child
                const draggedID = evt.dataTransfer.getData('itemID')
                this.items[this.getItemIndex(draggedID)].level = destination.level+1
                this.items[this.getItemIndex(destination)].children.push(this.getItemIndex(draggedID)-1)
                // remove obj id from previous parent' array
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
