<template>
  <div>
    <div class="top-bar">
      <p class="left-text">Left side text</p>
      <p class="right-text">Right side text</p>
    </div>
    <div :class="{'frame': this.stamping == false, 'frame-is-stamping': this.stamping == true}">
      <button :class="'stamp-button'" @click="changeCursor()">Stamp</button>
      <div class= "form-creation">
        <button @click="createItem('form', createFormType)" :class="{'is-stamping': this.stamping == true}">
          Create New Form
        </button>
        <select v-model="createFormType" :class="{'is-stamping': this.stamping == true}">
          <option value="DD Form 2261">DD Form 2261</option>
          <option value="PS Form 3854">PS Form 3854</option>
          <option value="Truck Bill">Truck Bill</option>
        </select>
      </div>
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
          <div> Situation {{ getSituationNumber }} </div>
          <div class="situation-text"> {{ this.getSituationText }} </div>
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
    props: [
      'pageNum'
    ],
    data() {
      return {
        items: [
          {
            id: 0,
            title: "Truck",
            children: [],
            level: 1,
            images: [require('../assets/mail-truck.jpeg'),],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "Truck",
            droppable: true
          },
          {
            id: 4,
            title: "Safe",
            children: [],
            level: 1,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "safe",
            droppable: true
          },
          {
            id: 1,
            title: "Letter",
            children: [],
            level: 2,
            images: [require('../assets/letter.png'), undefined ,require('../assets/stamped-letter.png')],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: true,
            formInputs: {},
            type: "mail",
            droppable: true
          },
          {
            id: 2,
            title: "Package",
            children: [],
            level: 2,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: true,
            formInputs: {},
            type: "mail",
            droppable: true
          },
          {
            id: 3,
            title: "Pouch",
            children: [],
            level: 2,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: true,
            formInputs: {},
            type: "pouch",
            droppable: true
          },
          {
            id: 5,
            title: "Forms",
            children: [],
            level: 1,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "forms",
            droppable: true
          }
        ],
        stamping: false,
        currentItemIndex: 2,
        idCounter: 1000,
        draggedItem: {},
        createFormType: "",
        situationOneInit: false,
        situationTwoInit: false,
        situationThreeInit: false,
        situationFourInit: false,
        situationFiveInit: false,
        situationSixInit: false,
      }   
    },
    mounted() {
      this.updateSituation();
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
      getSituationText() {
        let text = "";
        if(this.pageNum ==  1) {
          text = "You are the registry clerk on duty in the registry section at APO AE 09459. You just opened the registry section and verified the items inside\
          the safe against the previous day's inventory. Verify that the following items (RB339 065 331US and RB290 770 790US) are accounted for."
        }
        else if(this.pageNum > 1 && this.pageNum < 4) {
          text = "1. PFC Terry Jones, the mail guard, arrives at the registry section from the AMT with one registered pouch and two registered outside pieces (OSP's).\
          2. You and PFC George Forrest, the witness, opened the pouch and located the incoming inside bill."
        }
        else if(this.pageNum >= 4 && this.pageNum < 5) {
          text = "This is situation three!"
        }
        else if(this.pageNum >= 5 && this.pageNum < 9) {
          text = "1. PFC Terry Jones, the mail guard, arrives at the registry section from Unit 2 with a pouch and one OSP to dispatch to the AMT serving you area.\
          2. You and PFC George Forrest, the witness, opened the pouch recieved from Unit 2.\
          3. SGT Jerry Johnson (the 45th MP CO mail clerk) arrives at the registry section with the items listed on the PS Form 3877.\
          4. SPC Turner, who works at the finance window, comes to the registry section with the items listed on the transfer bill."         
        }
        else if(this.pageNum == 9) {
          text = "The registry section is now closed. PFC Terry Jones, the mail guard has arrived at your location and is waiting for the outgoing\
          registered mail.\
          1. Prepare the necessary documentation for dispatching all pouchable outing registeted mail to AMF Kennedy, NY 00300. \
          2. Prepare the necessary documentation to dispatch all outgoing registered mail (pouches and OSPs) to the AMT that services your post office."
        }
        else if(this.pageNum == 10) {
          text = "Prepare a DD Form 2261 (Registered Mail Balance and Inventory) to account for all registered mail recieved, delivered, dispatched, and mail\
          that is still on hand and has not been delivered."
        }
        return text;
      },
      getSituationNumber() {
        let num = 1;
        if(this.pageNum ==  1) {
          num = 1;
        }
        else if(this.pageNum > 1 && this.pageNum < 4) {
          num = 2;
        }
        else if(this.pageNum >= 4 && this.pageNum < 5) {
          num = 3;
        }
        else if(this.pageNum >= 5 && this.pageNum < 9) {
          num = 4;
        }
        else if(this.pageNum == 9) {
          num = 5;
        }
        else if(this.pageNum == 10) {
          num = 6;
        }
        return num;
      } 
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
        if(this.isDroppable(destination)){
          if(draggedID != destination){
            if(childrenIndexes.indexOf(this.getItemIndex(destination)) == -1){
              this.removeItemOnDrop(draggedID,prevParentID)
              this.items[this.getItemIndex(draggedID)].level = this.items[this.getItemIndex(destination)].level + 1
              this.items[this.getItemIndex(destination)].children.push(this.items[this.getItemIndex(draggedID)].id)
            }
          }
        }
        evt.stopPropagation();
      },
      isDroppable(id){
        return this.items[this.getItemIndex(id)].droppable
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
      //accepts an item id and returns that items parent id
      findParent(id){
        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].children.indexOf(id) != -1){
            return this.items[i].id
          }
        }
      },
      //deletes an item from it's original position
      removeItemOnDrop(itemID,parentID){
        var index = this.getItemIndex(parentID)
        return this.items[index].children = this.items[index].children.filter(x => x != itemID)
      },
      //returns the "items" array index of the given item id's parent
      findParentIndex(itemID){
        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].children.indexOf(itemID) == -1){
            return i
          }
        }
      },
      changeCursor(){
        this.stamping = !this.stamping
        this.$store.commit('stamp');
      },
      stamp(object) {
        if(object.stampable){
          if(object.stampCounter == 0){
          object.currentImageIndex = 2
          }else{
            object.currentImageIndex = object.currentImageIndex+1
          }
        }
        this.stamping = false
        this.$store.commit('stamp');
      },
      itemImage(object) {
        return object.images[object.currentImageIndex]
      },
      changeCurrentItem (evt, id) {
        this.currentItemIndex = this.getItemIndex(id);
        evt.stopPropagation()
      },
      //creates a new item given information via various parameters
      createItem(itemType, itemName) {
        if(itemType == "form") {
          let newForm = {
            id: this.idCounter,
            title: itemName,
            children: [],
            level: 2,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "form",
            droppable: true
          }
          this.items.push(newForm);
          this.items[5].children.push(newForm.id)
        }
        else if(itemType == "mail") {
          let mail = {
            id: this.idCounter,
            title: itemName,
            children: [],
            level: 2,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: true,
            formInputs: {},
            type: "mail",
            droppable: true
          }
          this.items.push(mail);
          this.items[1].children.push(mail.id)
        }
        this.idCounter++;      
      },
      //function that handles events as the situation is changed
      updateSituation() {
        if(this.getSituationNumber == 1) {
          if(!this.situationOneInit){
            this.createItem('mail', 'RB339 065 331US')
            this.createItem('mail', 'RB290 770 790US')
          }
          this.situationOneInit = true;
        }
        else if(this.getSituationNumber == 2 && !this.situationTwoInit) {
          //Either need to add a pouch '70948511'
          this.createItem('mail', 'RB102 022 763US')
          this.createItem('mail', 'RB298 302 613US')
          this.createItem('form', 'PS Form 3854')
          //42 - 47


          this.createItem('form', 'PS Form 3854 S2 #2')
          this.createItem('mail', 'RB867 092 744US')
          this.createItem('mail', 'RB309 266 140US')
          this.createItem('mail', 'RB143 899 161US')
          this.createItem('mail', 'RB218 344 488US')
          this.createItem('mail', 'RB888 122 361US')
          //34-41
          this.situationTwoInit = true;
        }
        else if(this.getSituationNumber == 3 && !this.situationThreeInit) {

          this.situationThreeInit = true;
        }
      },
    },
    watch: {
      getSituationNumber: function () {
        this.updateSituation();
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
    height: 5vh;
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
    top: 10px;
    right: 1vw;
    z-index: 2;
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
  .situation-text {
    max-width: 39vw;
  }
  .form-creation{
    position: absolute;
    top: 10px;
    left: 1vw;
    z-index: 2;
  }
</style>