<template>
  <div>
    <div class="top-bar">
      <p class="left-text">Page {{this.$store.state.pageNum}}</p>
      <p class="right-text">Right side text</p>
      <button :class="'stamp-button'" @click="changeCursor()"> Stamp</button>
    </div>
      
    <div :class="{'frame': this.stamping == false, 'frame-is-stamping': this.stamping == true}">
      <div
        :class="{'drop-zone': this.stamping == false, 'drop-zone-is-stamping': this.stamping == true}"
        @dragover.prevent
        @dragenter.prevent
      >   
        <div 
          class='parent-level' 
          v-for='item in firstLevel' 
          :key='item.title' 
          draggable=false
          @drop="onDrop($event,item.id)"
          @click="changeCurrentItem($event, item.id)"
        >
          {{ item.title }}
          <div 
            class='child-level' 
            v-for='child in getChildrenIndexes(item.id)' 
            :key='child' 
            :draggable ='true'
            @dragstart='startDrag($event, items[child])'
            @drop="onDrop($event,items[child].id)"
            @click="changeCurrentItem($event, items[child].id)"
          >
            {{items[child].title}}
            <div 
              class='grand-child-level' 
              v-for='grandchild in getChildrenIndexes(items[child].id)' 
              :key='grandchild' 
              :draggable ='true'
              @dragstart='startDrag($event, items[grandchild])'
              @drop="onDrop($event,items[grandchild].id)"
              @click="changeCurrentItem($event, items[grandchild].id)"
            >
              {{items[grandchild].title}}
              <div 
                class='child-level' 
                v-for='greatGrand in getChildrenIndexes(items[grandchild].id)' 
                :key='greatGrand' 
                :draggable ='true'
                @dragstart='startDrag($event, items[greatGrand])'
                @click="changeCurrentItem($event, items[greatGrand].id)"
              >
                {{items[greatGrand].title}}
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class = "vertical-line"></div>
        <div class="right-side-content">
          <p> This is a {{this.items[currentItemIndex].title}} </p>
          <img 
            :class="{'letter': this.stamping == false, 'letter-stamping': this.stamping == true }"
            :src="itemImage(this.items[currentItemIndex])"
            width="500"
            @click="stamp(this.items[currentItemIndex])"
          >
        </div>
        <PageNav :class="{'is-stamping': this.stamping == true}"/>
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
                image: require('../assets/mail-truck.jpeg')
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
                stamped: false,
                image: require('../assets/letter.png'),
                stampedImage: require('../assets/stamped-letter.png')

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
            stamping: false,
            currentItemIndex: 2
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
                let childrenIndexes = this.getChildrenIndexes(draggedID)
                if(draggedID != destination){
                  if(childrenIndexes.indexOf(this.getItemIndex(destination)) == -1){
                    this.removeItemOnDrop(draggedID,prevParentID)
                    this.items[this.getItemIndex(draggedID)].level = destination.level+1
                    this.items[this.getItemIndex(destination)].children.push(this.getItemIndex(draggedID)-1)
                  }
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
              },
            changeCursor(){
                this.stamping = !this.stamping
              },
            stamp(object) {
                if(object.stamped != undefined){
                  object.stamped = !object.stamped;
                }
                this.stamping = false;
              },
            itemImage(object) {
                if(object.stamped == true){
                  return object.stampedImage
                }
                return object.image
              },
            changeCurrentItem (evt, id) {
              this.currentItemIndex = this.getItemIndex(id);
              evt.stopPropagation()
            }
    }
        
}
</script>

<style scoped>
  .frame{
      display: flex;
      flex-direction: row;
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
  .frame-is-stamping{
    display: flex;
    cursor:  url("../assets/stamp.gif"), auto;
    flex-direction: row;
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
  .drop-zone-is-stamping{
    order: 1;
    background-color: #333366;
    pointer-events: none;
    width: 15vw;
  }
  .right-side-content{
    order: 3;
    color: #D5D5D5;
    top:15vh;
    text-align: center;
  }
  .parent-level {
    background-color: #D5D5D5;
    margin-bottom: 10px;
    padding: 5px;
    color: #42426A;
    border-radius: 5px;
    z-index: 1;
  }
  .child-level {
    background-color: #42426A;;
    margin-bottom: 10px;
    padding: 5px;
    color: #D5D5D5;
    border-radius: 5px;
    z-index: 2;
  }
  .grand-child-level {
    background-color: #ddd;
    margin-bottom: 5px;
    padding: 5px;
    color: #42426A;
    border-radius: 5px;
  }
  .vertical-line {
    order: 2;
    border-left: .25vw solid white;
    top: 10vh;
    height: 55vh;
    z-index: 4;
  }
  .top-bar {
    position: absolute;
    top: 0;
    left: 3vw;
    width: 97vw;
    height: 50px;
    z-index: 2;
    font-family: Arial;
    background-color: #32334B;
    color: white;
    box-shadow: 1px 5px 5px black;
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
  .stamp-button {
    position: absolute;
    top: 60px;
    right: 30px;
  }
  .letter{
    pointer-events: none;
  }
  .letter-stamping{
    cursor:  url("../assets/stamp.gif"), auto;
  }
  .is-stamping{
    pointer-events: none;
  }

</style>
