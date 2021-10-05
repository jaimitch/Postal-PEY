<template>
  <div>
    <div class="top-bar">
      <p class="left-text">Left side text</p>
      <p class="right-text">Right side text</p>
    </div>
    <div :class="{'frame': this.stamping == false, 'frame-is-stamping': this.stamping == true}">
      <button :class="'stamp-button'" @click="changeCursor()">Stamp</button>
      <div class= "form-creation">
        <button @click="createItem(createFormType, 'default', getSituationNumber, 2, true)" :class="{'is-stamping': this.stamping == true}">
          Create New Form
        </button>
        <select v-model="createFormType" :class="{'is-stamping': this.stamping == true}">
          <option value="psform3854">PS Form 3854</option>
          <option value="psform3877">PS Form 3877</option>
          <option value="ddform2261">DD Form 2261</option>
        </select>
      </div>
      <div
        :class="{'drop-zone, left-side-content': this.stamping == false, 'drop-zone-is-stamping': this.stamping == true}"
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
            <div>
              <img v-if="items[child].type == 'Letter'" src="../assets/White-Letter.svg" class="item-icon">
              <img v-else-if="items[child].type == 'Package'" src="../assets/White-Box.svg" class="item-icon">
              <img v-else-if="items[child].type == 'Pouch'" src="../assets/White-Pouch.svg" class="item-icon">
              <img v-else src="../assets/White-form.svg" class="item-icon">

              {{ items[child].type }} <br> {{ items[child].articleCode }} <br> {{ items[child].situationNumber }}
            </div>  
            
            <div 
              class='grand-child-level' 
              v-for='grandchild in getChildrenIndexes(items[child].id)' 
              :key='grandchild' 
              :draggable ='true'
              @dragstart='startDrag($event, items[grandchild])'
              @drop="onDrop($event,items[grandchild].id)"
              @click="changeCurrentItem($event, items[grandchild].id)"
            >
              <img v-if="items[child].type == 'Letter'" src="../assets/Black-Letter.svg" class="item-icon">
              <img v-else-if="items[child].type == 'Package'" src="../assets/Black-Box.svg" class="item-icon">
              <img v-else-if="items[child].type == 'Pouch'" src="../assets/Black-Pouch.svg" class="item-icon">
              <img v-else src="../assets/Black-Form.svg" class="item-icon">

              {{ items[grandchild].type }} <br> {{ items[grandchild].articleCode }} <br> {{ items[grandchild].situationNumber }}
              <!-- <div 
                class='child-level' 
                v-for='greatGrand in getChildrenIndexes(items[grandchild].id)'
                :key='greatGrand' 
                :draggable ='true'
                @dragstart='startDrag($event, items[greatGrand])'
                @click="changeCurrentItem($event, items[greatGrand].id)"
              >
                {{items[greatGrand].title}}
              </div> -->
            </div>
          </div>
        </div>
      </div>
        <div class = "vertical-line"></div>
        <div class="right-side-content">
          <div> Situation {{ getSituationNumber }} </div>
          <div class="right-side-content"> {{ this.getSituationText }} </div>
          <p> This is a {{this.items[currentItemIndex].title}} </p>
          <div v-if="this.items[currentItemIndex].type != 'PS FORM 3854'">
            <img 
              :class="{'letter': this.stamping == false, 'letter-stamping': this.stamping == true }"
              :src="itemImage(this.items[currentItemIndex])"
              width="500"
              @click="stamp(this.items[currentItemIndex])"
            >
          </div>
          <div v-else>
            <Form3877/>
          </div>
        </div>
        <PageNav :class="{'is-stamping': this.stamping == true}"/>
    </div>
  </div>
</template>

<script>
  import PageNav from '../Navigation/PageNav.vue'
  //import Form3854 from '../Forms/Form3854.vue'
  import Form3877 from '../Forms/Form3877.vue'
  export default {
    name: 'Frame',
    components: {
      PageNav,
      //Form3854,
      Form3877
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
        situationTwoPartOne: false,
        situationTwoPartTwo: false,
        situationThreeInit: false,
        situationFourPartOne: false,
        situationFourPartTwo: false,
        situationFourPartThree: false,
        situationFourPartFour: false,
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
        else if(this.pageNum == 2) {
          text = "1. PFC Terry Jones, the mail guard, arrives at the registry section from the AMT with one registered pouch and two registered outside pieces (OSP's)."
        }
         else if(this.pageNum == 3) {
          text = "2. You and PFC George Forrest, the witness, opened the pouch and located the incoming inside bill."
        }
        else if(this.pageNum == 4) {
          text = "Deliver the following mail using the appropriate PS Forms: \
          RB298 302 613US, RB339 065 331US, RB290 770 790US, RB309 266 140US, RB218 344 488US, RB143 899 161US, RB867 092 744US, RB102 022 763US"
        }
        else if(this.pageNum == 5) {
          text = "1. PFC Terry Jones, the mail guard, arrives at the registry section from Unit 2 with a pouch and one OSP to dispatch to the AMT serving you area."         
        }
        else if(this.pageNum == 6) {
          text = "2. You and PFC George Forrest, the witness, opened the pouch recieved from Unit 2."
        }
        else if(this.pageNum == 7) {
          text = "3. SGT Jerry Johnson (the 45th MP CO mail clerk) arrives at the registry section with the items listed on the PS Form 3877."
        }
        else if(this.pageNum == 8) {
          text = "4. SPC Turner, who works at the finance window, comes to the registry section with the items listed on the transfer bill."
        }
        else if(this.pageNum == 9) {
          text = "The registry section is now closed. PFC Terry Jones, the mail guard has arrived at your location and is waiting for the outgoing\
          registered mail.\
          1. Prepare the necessary documentation for dispatching all pouchable outing registeted mail to AMF Kennedy, NY 00300."
        }
        else if(this.pageNum == 10) {
          text = "2. Prepare the necessary documentation to dispatch all outgoing registered mail (pouches and OSPs) to the AMT that services your post office."
        }
        else if(this.pageNum == 11) {
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
        else if(this.pageNum >= 9 && this.pageNum < 11) {
          num = 5;
        }
        else if(this.pageNum == 11) {
          num = 6;
        }
        return num;
      },
      getVuexPageNum() {
        return this.pageNum;
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
      /*creates a new item given information:
      (['string' type of item], ['string' unique article identifer], ['int' situation number], ['int' level], ['boolean'] default item creation)
      */
      createItem(itemType, articleCode, situationNumber, level, defaultCreate) {
        let newItem = {};

        if(itemType == "psform3854") {
          newItem = {
            id: this.idCounter,
            articleCode: 'Bill #' + articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "PS FORM 3854",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[2].children.push(newItem.id)
          }
        }
        else if(itemType == "psform3877") {
          newItem = {
            id: this.idCounter,
            articleCode: 'Bill #' +articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "PS FORM 3877",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[2].children.push(newItem.id)
          }
        }
        else if(itemType == "ddform2261") {
          newItem = {
            id: this.idCounter,
            articleCode: articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "DD FORM 2261",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[2].children.push(newItem.id)
          }
        }
        else if(itemType == "letter") {
          newItem = {
            id: this.idCounter,
            articleCode: 'RB #' + articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            formInputs: {},
            type: "Letter",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[1].children.push(newItem.id)
          }
        }
        else if(itemType == "package") {
          newItem = {
            id: this.idCounter,
            articleCode: 'RB #' + articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            formInputs: {},
            type: "Package",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[1].children.push(newItem.id)
          }
        }
        else if(itemType == "pouch") {
          newItem = {
            id: this.idCounter,
            articleCode: 'SEAL #' + articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            formInputs: {},
            type: "Pouch",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[1].children.push(newItem.id)
          }
        }
        this.idCounter++;
        return newItem.id;
     
      },
      //Uses the parent's article code and the child's id to add the child to the parent's children array
      assignItemToParent(parentArticleCode, childID) {
        let parent = this.items.filter(x => x.articleCode == parentArticleCode)
        let child = this.items.filter(x => x.id == childID)
        parent[0].children.push(child[0].id);
      },
      //function that handles events as the situation is changed
      updateSituation() {
        if(this.getSituationNumber == 1) {
          if(!this.situationOneInit){
            this.createItem('package', 'RB339 065 331US', 1, 2, true)
            this.createItem('package', 'RB290 770 790US', 1, 2, true)
          }
          this.situationOneInit = true;
        }
        else if(this.getSituationNumber == 2) {
          if(this.pageNum == 2 && !this.situationTwoPartOne) {
            this.createItem('pouch', '70948511', 2, 2, true)
            this.createItem('package', 'RB102 022 763US', 2, 2, true)
            this.createItem('package', 'RB298 302 613US', 2, 2, true)
            this.createItem('psform3854', '260', 2, 2, true)
            //42 - 47
            this.situationTwoPartOne = true;
          }
          else if(this.pageNum == 3 && !this.situationTwoPartTwo) {
            let item1 = this.createItem('psform3854', '123', 2, 3, false)
            this.assignItemToParent('SEAL #70948511', item1)
            let item2 = this.createItem('letter', 'RB867 092 744US', 2, 3, false)
            this.assignItemToParent('SEAL #70948511', item2)
            let item3 = this.createItem('letter', 'RB309 266 140US', 2, 3, false)
            this.assignItemToParent('SEAL #70948511', item3)
            let item4 = this.createItem('letter', 'RB143 899 161US', 2, 3, false)
            this.assignItemToParent('SEAL #70948511', item4)
            let item5 = this.createItem('letter', 'RB218 344 488US', 2, 3, false)
            this.assignItemToParent('SEAL #70948511', item5)
            let item6 = this.createItem('letter', 'RB888 122 361US', 2, 3, false)
            this.assignItemToParent('SEAL #70948511', item6)
            //34-41
            this.situationTwoPartTwo = true;
          }
          
        }
        else if(this.getSituationNumber == 3 && !this.situationThreeInit) {
          this.situationThreeInit = true;
        }
        else if(this.getSituationNumber == 4) {
          if(this.pageNum == 5 && !this.situationFourPartOne) {
            this.createItem('psform3854', '30', 4, 2, true)
            this.createItem('pouch', '43000277', 4, 2, true)
            this.createItem('package', 'RB300 911 759US', 4, 2, true)
            //30-33
            this.situationFourPartOne = true;
          }
          else if(this.pageNum == 6 && !this.situationFourPartTwo) {
            let item1 = this.createItem('psform3854', '24', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item1)
            let item2 = this.createItem('letter', 'RB300 911 755US', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item2)
            let item3 = this.createItem('letter', 'RB300 911 756US', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item3)
            let item4 = this.createItem('letter', 'RB300 911 757US', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item4)
            let item5 = this.createItem('package', 'RB300 911 758US', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item5)
            let item6 = this.createItem('letter', 'RB300 911 760US', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item6)
            let item7 = this.createItem('package', 'RB300 911 761US', 4, 3, false)
            this.assignItemToParent('SEAL #43000277', item7)
            //22-29
            this.situationFourPartTwo = true;
          }
          else if(this.pageNum == 7 && !this.situationFourPartThree) {
            this.createItem('psform3877', '24', 4, 2, true)
            this.createItem('letter', 'RB842 320 438US', 4, 2, true)
            this.createItem('letter', 'RB842 320 439US', 4, 2, true)
            //18-21
            this.situationFourPartThree = true;
          }
          else if(this.pageNum == 8 && !this.situationFourPartFour) {
            this.createItem('psform3854', '33', 4, 2, true)
            this.createItem('letter', 'RB707 092 210US', 4, 2, true)
            this.createItem('package', 'RB707 092 211US', 4, 2, true)
            this.createItem('letter', 'RB707 092 212US', 4, 2, true)
            this.createItem('letter', 'RB707 092 213US', 4, 2, true)
            this.createItem('letter', 'RB707 092 214US', 4, 2, true)
            this.createItem('package', 'RB707 092 215US', 4, 2, true)
            this.createItem('letter', 'RB707 092 216US', 4, 2, true)
            this.createItem('letter', 'RB707 092 217US', 4, 2, true)
            this.createItem('letter', 'RB707 092 218US', 4, 2, true)
            this.createItem('letter', 'RB707 092 219US', 4, 2, true)
            //6-17
            this.situationFourPartFour = true;
          }
        }
      },
    },
    watch: {
      getVuexPageNum: function () {
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
    width: 22vw;
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
    max-width: 50vw;
  }
  .left-side-content{
    display: flex;
    flex-direction: column;
    overflow: scroll;
    width: 25vw;
  }
  .parent-level {
    background-color: #D5D5D5;
    margin-bottom: 15px;
    padding: 15px;
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
    font-size: 1vw;
  }
  .grand-child-level {
    background-color: #ddd;
    margin-bottom: 5px;
    padding: 5px;
    color: #42426A;
    border-radius: 5px;
    font-size: 0.8vw;
  }
  .vertical-line {
    order: 2;
    border-left: .25vw solid white;
    width: 0;
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
    text-align: center;
  }
  .form-creation{
    position: absolute;
    top: 10px;
    left: 1vw;
    z-index: 2;
  }
  .item-icon{
    width: 2vw;
  }
</style>