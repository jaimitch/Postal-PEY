<template>
  <div>
    <div class="top-bar">
      <p class="left-text">Left side text</p>
      <p class="right-text">Right side text</p>

      <div class="scroll-zone-up"
      draggable=false
      @dragover="onHoverUp()">
      </div>

      <div class="scroll-zone-down"
      draggable=false
      @dragover="onHoverDown()">
      </div>

    </div>
    <div :class="{'frame': this.stamping == false, 'frame-is-stamping': this.stamping == true}">
      <button :class="'stamp-button'" @click="changeCursor()">Stamp</button>

      <div class= "form-creation">
        <button @click="createItem(createFormType, '', getSituationNumber, 2, true, '')" :class="{'is-stamping': this.stamping == true}">
          Create New Form
        </button>
        <select class="form-creation-select" v-model="createFormType" :class="{'is-stamping': this.stamping == true}">
          <option value="psform3854">PS Form 3854</option>
          <option value="psform3877">PS Form 3877</option>
          <option value="ddform2261">DD Form 2261</option>
          <option value="psform3883">PS Form 3883</option>
        </select>
      </div>

      <div class="pouch-creation">
        <button @click="createItem('pouch', getSeal(), getSituationNumber, 2, true, 'Bag-1')">
          Create New Pouch
        </button>
      </div>

    <div class="left-frame">
      <div
        id="left-frame"
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
            @click="changeCurrentItem($event, items[child].id), toggleItemImage(items[child])"
          >
            <div class="child-content">
              <img v-if="items[child].type == 'Letter'" src="../assets/White-Letter.svg" class="item-icon child-letter">
              <img v-else-if="items[child].type == 'Package'" src="../assets/White-Box.svg" class="item-icon child-package">
              <img v-else-if="items[child].type == 'Pouch'" src="../assets/White-Pouch.svg" class="item-icon child-pouch">
              <img v-else src="../assets/White-form.svg" class="item-icon child-form">

            <!-- <div class='space-bar'>|</div> -->

              <div class = "child-text">
              {{ items[child].type }} <br> {{ items[child].articleCode }} <br> {{ items[child].situationNumber }}
              </div>
            </div>  
            <div class="child-content item-image">
              <img v-show="items[child].showImage" :src="itemImage(items[child])">
            </div>
            
            <div 
              class='grand-child-level' 
              v-for='grandchild in getChildrenIndexes(items[child].id)'
              :key='grandchild'
              :draggable ='true'
              @dragstart='startDrag($event, items[grandchild])'
              @drop="onDrop($event,items[grandchild].id)"
              @click="changeCurrentItem($event, items[grandchild].id), toggleItemImage(items[grandchild])"
            >
            
              <div class="grand-child-content">
              <img v-if="items[grandchild].type == 'Letter'" src="../assets/White-Letter.svg" class="item-icon grand-letter">
              <img v-else-if="items[grandchild].type == 'Package'" src="../assets/White-Box.svg" class="item-icon grand-package">
              <img v-else-if="items[grandchild].type == 'Pouch'" src="../assets/White-Pouch.svg" class="item-icon grand-pouch">
              <img v-else src="../assets/White-form.svg" class="item-icon grand-form">

            <!-- <div class='space-bar'>|</div> -->

              <div class='grand-text'>
              {{ items[grandchild].type }} <br> {{ items[grandchild].articleCode }} <br> {{ items[grandchild].situationNumber }}
              </div>
              </div>

              <div class="grand-child-content">
                <img v-show="items[grandchild].showImage" :src="itemImage(items[grandchild])">
              </div>
              
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
    </div>
        <div class = "vertical-line"></div>
        <div class="right-side-content">
          <div class="situation-title">Situation {{ getSituationNumber }}</div>
          <div class="situation-text"> <span v-html="this.getSituationText"></span> </div>

          <!-- <p> This is a {{this.items[currentItemIndex].title}} </p> -->
          <div>
            <!-- <img 
              :class="{'letter': this.stamping == false, 'letter-stamping': this.stamping == true }"
              :src="itemImage(this.items[currentItemIndex])"
              width="500"
              @click="stamp(this.items[currentItemIndex])"
            > -->
          </div>
          <div v-if="this.items[currentItemIndex].type == 'PS FORM 3854'" class="form-3854">
            <Form3854 
              v-bind:item="items[currentItemIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          <div v-if="this.items[currentItemIndex].type == 'PS FORM 3877'" >
            <Form3877 
              v-bind:item="items[currentItemIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          <div v-if="this.items[currentItemIndex].type == 'DD FORM 2261' && form2261Back == false">
            <Form2261 
              v-bind:item="items[currentItemIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form2261Back = true">Flip</button>
          </div>
          <div v-if="this.items[currentItemIndex].type == 'DD FORM 2261' && form2261Back == true">
            <Form2261Back 
              v-bind:item="items[currentItemIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form2261Back = false">Flip</button>
          </div>
          <div v-if="this.items[currentItemIndex].type == 'PS FORM 3883'" class="form-3883">
            <Form3883 
              v-bind:item="items[currentItemIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
        </div>
        <PageNav :class="{'is-stamping': this.stamping == true}"/>
    </div>
  </div>
</template>

<script>
  import PageNav from '../Navigation/PageNav.vue'
  import Form3854 from '../Forms/Form3854.vue'
  import Form3877 from '../Forms/Form3877.vue'
  import Form2261 from '../Forms/Form2261.vue'
  import Form2261Back from '../Forms/Form2261(Back).vue'
  import Form3883 from '../Forms/Form3883.vue'
  export default {
    name: 'Frame',
    components: {
      PageNav,
      Form3854,
      Form3877,
      Form2261,
      Form2261Back,
      Form3883
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
        definedSeals: [12345678, 22345678, 32345678, 42345678, 52345678, 62345678],
        situationOneInit: false,
        situationTwoPartOne: false,
        situationTwoPartTwo: false,
        situationThreeInit: false,
        situationFourPartOne: false,
        situationFourPartTwo: false,
        situationFourPartThree: false,
        situationFourPartFour: false,
        formKey: 0,
        form2261Back: false,
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
          let now = new Date();
          text = `<div>Deliver the following mail using the appropriate PS Forms:</div><br>\
          RB 298 302 613 US , RB 339 065 331 US , RB 290 770 790 US , RB 309 266 140 US , RB 218 344 488 US , RB 143 899 161 US , RB 867 092 744 US , RB 102 022 763 US\
          <br><br> <div>TODAY'S DATE AND TIME: ${now} </div><br>\
          <div>REGISTRY SECTION OPERATING HOURS: 0800 to 1600 hours</div><br>\
          <div style="text-align:center;"> <table><tr><th>UNIT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>LAST BILL # USED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>UNIT MAIL CLERK</th></tr>\
          <tr><th>14th ADMIN CO</th><th>183</th><th>SGT EARL SMITH</th></tr>\
          <tr><th>13th EOC</th><th>101</th><th>PFC JOHN THOMPSON</th></tr>\
          <tr><th>11th ENGR DET</th><th>182</th><th>SPC RONNIE CARTER</th></tr>\
          <tr><th>45TH MP CO</th><th>195</th><th>SGT JERRY JOHNSON</th></tr></table><div>`
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
      onHoverUp() {
        document.getElementById('left-frame').scrollTop -= 10;
        console.log(document.getElementById('left-frame').scrollTop)
      },
      onHoverDown() {
        document.getElementById('left-frame').scrollTop += 10;
        console.log(document.getElementById('left-frame').scrollTop)
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
      //toggles the item to display or hide it's image
      toggleItemImage(item) {
        item.showImage = !item.showImage;
      },
      //returns a seal off of the seal array, and then removes it so it cant be duplicated
      getSeal() {
        let seal = this.definedSeals[0];
        this.definedSeals.shift();
        if(seal == undefined) {
          alert("There are no remaining pouches!")
        }
        else {
          return seal;
        }
      },
      /*creates a new item given information:
      (['string' type of item], ['string' unique article identifer], ['int' situation number], ['int' level], ['boolean'] default item creation behavior, ['string' image code)

      NOTE: Default item creation causes forms to be added to the forms section, and all other things to be added to the safe.
      You would want to disable default behavior if you planned to add the item to another item's children array for example.
      */
      createItem(itemType, articleCode, situationNumber, level, defaultCreate, imageCode) {
        let newItem = {};

        if(itemType == "psform3854") {
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
            formInputs: {
              lockNo: "",
              rotaryNo: "",
              jacketNo: "",
              controlNo: "",
              billNo: "",
              pageNo: "",
              airmail: "",
              sealNo: "",
              to: "",
              billNoRight: "",
              amNo: "",
              jacketNoRight: "",
              lockNoRight: "",
              rotaryNoRight: "",
              airmailRight: "",
              sealNoRight: "",
              recieved: "",
              recievingClerks: [],
              totalArticlesSent: "",
              totalArticlesRecieved: "",
              postmasterSent: "",
              postmasterRecieved: "",
              recievingClerk: "",
              dispatchingClerk: "",
              itemNums: [],
              itemOrigins: [],
              topStamp1: false,
              topStamp2: false,
              bottomStamp1: false,
              bottomStamp2: false
            },
            type: "PS FORM 3854",
            droppable: true
          }
          if(newItem.articleCode != '') {
            newItem.articleCode = 'Bill #' + newItem.articleCode;
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[2].children.push(newItem.id)
          }
        }
        else if(itemType == "psform3877") {
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
            formInputs: {
              senderAddress: "",
                adultSigReq: false,
                adultSigRest: false,
                certMail: false,
                certMailRestDeliv: false,
                cOD: false,
                insuredMail: false,
                priorityMail: false,
                priorityMailEx: false,
                registeredMail: false,
                returnReciept: false,
                sigConfirm: false,
                sigConfirmRestrDeliv: false,
                trackingNum1: "",
                trackingNum2: "",
                trackingNum3: "",
                trackingNum4: "",
                trackingNum5: "",
                trackingNum6: "",
                trackingNum7: "",
                trackingNum8: "", 
                trackingTextInput1: "",
                trackingTextInput2: "",
                trackingTextInput3: "",
                trackingTextInput4: "",
                trackingTextInput5: "",
                trackingTextInput6: "",
                trackingTextInput7: "",
                trackingTextInput8: "",
                piecesSent: "",
                piecesRecieved: "",
                postmaster:"",
                rows:[],
                square:"",
                stamped: false
            },
            type: "PS FORM 3877",
            droppable: true
          }
          if(newItem.articleCode != '') {
            newItem.articleCode = 'Bill #' + newItem.articleCode;
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
            formInputs: {
              apoNum: "",
                from: "",
                to: "",
                itemsAtStart: "",
                signature: "",
                payGrade: "",
                typedName: "",
                officialSig: "",
                prepSig: "",
                remarks: "",
                sectionC1: "",
                sectionC2: "",
                sectionC3: "",
                sectionC4: "",
                sectionC5: "",
                sectionC6: "",
                sectionC7: "",
                sectionC8: "",
                sectionC9: "",
                sectionC10: "",
                sectionC11: "",
                sectionC12: "",
                sectionC13: "",
                sectionC14: "",
                sectionC15: "",
                sectionC16: "",
                sectionC17: "",
                sectionC18: "",
                totalItems9thru14: "",
                itemsOnHandAtEnd: "",
                numberOfPouchesOpened: "",
                itemsOnOutgoingTruck: "",
                itemsOnOutgoingManifests: "",
                itemsListedOnInsideBillsB: "",
                itemsDelivered: "",
                total1thru7: "",
                itemsRecievedFromOther: "",
                numberOfPouchesClosed: "",
                itemsOnIncomingTruck: "",
                itemsOnIncomingManifests: "",
                itemsListedOnInsideBillsA: "",
                itemsAccepted: "",
                items: [],
            },
            type: "DD FORM 2261",
            droppable: true
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[2].children.push(newItem.id)
          }
        }
        else if(itemType == "psform3883") {
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
            formInputs: {
              certified: false,
              COD: false,
              DCS: false,
              expressMail: false,
              insured: false,
              recDelivery: false,
              registered: false,
              returnReceipt: false,
              SCS: false,
              billNo: "",
              article: [],
              code: [],
              origin: [],
              dateOfDeliv: "",
              sigOfAgent: "",
              barcodeNum: "",
              recievedBy: "",
              recievedNum: "",
              deliveredBy: "",
              stamped: false
            },
            type: "PS FORM 3883",
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
            articleCode: articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [require(`../assets/${imageCode}.svg`),],
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
            articleCode: articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [require(`../assets/${imageCode}.svg`),],
            currentImageIndex: 0,
            stampCounter: 0,
            formInputs: {},
            type: "Package",
            droppable: true,
            showImage: false,
          }
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[1].children.push(newItem.id)
          }
        }
        else if(itemType == "pouch") {
          newItem = {
            id: this.idCounter,
            articleCode: articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [require(`../assets/${imageCode}.svg`),],
            currentImageIndex: 0,
            stampCounter: 0,
            formInputs: {},
            type: "Pouch",
            droppable: true
          }
          //checking to see if the user has used all existing seals
          if(newItem.articleCode != undefined) {
            newItem.articleCode = 'SEAL #' + newItem.articleCode;
          }

          if(itemType == "pouch" && newItem.articleCode != undefined) {
            this.items.push(newItem);
            if(defaultCreate) {
              this.items[1].children.push(newItem.id)
            }
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
            this.createItem('package', 'RB 339 065 331 US', 1, 2, true, '331')
            this.createItem('package', 'RB 290 770 790 US', 1, 2, true, '790')
          }
          this.situationOneInit = true;
        }
        else if(this.getSituationNumber == 2) {
          if(this.pageNum == 2 && !this.situationTwoPartOne) {
            this.createItem('pouch', '70948511', 2, 2, true, 'Bag-1')
            this.createItem('package', 'RB 102 022 763 US', 2, 2, true, '763')
            this.createItem('package', 'RB 298 302 613 US', 2, 2, true, '613')
            this.createItem('psform3854', '260', 2, 2, true, '')
            //42 - 47
            this.situationTwoPartOne = true;
          }
          else if(this.pageNum == 3 && !this.situationTwoPartTwo) {
            let item1 = this.createItem('psform3854', '123', 2, 3, false, '')
            this.assignItemToParent('SEAL #70948511', item1)
            let item2 = this.createItem('letter', 'RB 867 092 744 US', 2, 3, false, '744')
            this.assignItemToParent('SEAL #70948511', item2)
            let item3 = this.createItem('letter', 'RB 309 266 140 US', 2, 3, false, '140')
            this.assignItemToParent('SEAL #70948511', item3)
            let item4 = this.createItem('letter', 'RB 143 899 161 US', 2, 3, false, '161')
            this.assignItemToParent('SEAL #70948511', item4)
            let item5 = this.createItem('letter', 'RB 218 344 488 US', 2, 3, false, '488')
            this.assignItemToParent('SEAL #70948511', item5)
            let item6 = this.createItem('letter', 'RB 888 122 361 US', 2, 3, false, '361')
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
            this.createItem('psform3854', '30', 4, 2, true, '')
            this.createItem('pouch', '43000277', 4, 2, true, 'Bag-1')
            this.createItem('package', 'RB 300 911 759 US', 4, 2, true, '759')
            //30-33
            this.situationFourPartOne = true;
          }
          else if(this.pageNum == 6 && !this.situationFourPartTwo) {
            let item1 = this.createItem('psform3854', '24', 4, 3, false, '')
            this.assignItemToParent('SEAL #43000277', item1)
            let item2 = this.createItem('letter', 'RB 300 911 755 US', 4, 3, false, '755')
            this.assignItemToParent('SEAL #43000277', item2)
            let item3 = this.createItem('letter', 'RB 300 911 756 US', 4, 3, false, '756')
            this.assignItemToParent('SEAL #43000277', item3)
            let item4 = this.createItem('letter', 'RB 300 911 757 US', 4, 3, false, '757')
            this.assignItemToParent('SEAL #43000277', item4)
            let item5 = this.createItem('package', 'RB 300 911 758 US', 4, 3, false, '758')
            this.assignItemToParent('SEAL #43000277', item5)
            let item6 = this.createItem('letter', 'RB 300 911 760 US', 4, 3, false, '760')
            this.assignItemToParent('SEAL #43000277', item6)
            let item7 = this.createItem('package', 'RB 300 911 761 US', 4, 3, false, '761')
            this.assignItemToParent('SEAL #43000277', item7)
            //22-29
            this.situationFourPartTwo = true;
          }
          else if(this.pageNum == 7 && !this.situationFourPartThree) {
            this.createItem('psform3877', '24', 4, 2, true, '')
            this.createItem('letter', 'RB 842 320 438 US', 4, 2, true, '438')
            this.createItem('letter', 'RB 842 320 439 US', 4, 2, true, '439')
            //18-21
            this.situationFourPartThree = true;
          }
          else if(this.pageNum == 8 && !this.situationFourPartFour) {
            this.createItem('psform3854', '33', 4, 2, true, '')
            this.createItem('letter', 'RB 707 092 210 US', 4, 2, true, '210')
            this.createItem('package', 'RB 707 092 211 US', 4, 2, true, '211')
            this.createItem('letter', 'RB 707 092 212 US', 4, 2, true, '212')
            this.createItem('letter', 'RB 707 092 213 US', 4, 2, true, '213')
            this.createItem('letter', 'RB 707 092 214 US', 4, 2, true, '214')
            this.createItem('package', 'RB 707 092 215 US', 4, 2, true, '215')
            this.createItem('letter', 'RB 707 092 216 US', 4, 2, true, '216')
            this.createItem('letter', 'RB 707 092 217 US', 4, 2, true, '217')
            this.createItem('letter', 'RB 707 092 218 US', 4, 2, true, '218')
            this.createItem('letter', 'RB 707 092 219 US', 4, 2, true, '219')
            //6-17
            this.situationFourPartFour = true;
          }
        }
      },
      changeForm(newForm){
        this.items[this.currentItemIndex].formInputs = newForm;
      }
    },
    watch: {
      getVuexPageNum: function () {
        this.updateSituation();
      },
      currentItemIndex: function () {
        this.formKey++
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
    text-align: center;
    max-width: 39vw;

  }
  .left-frame{
    position: relative;
    top: 2vw;
    left: 2vw;
  }
  .left-side-content{
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 35vw;
    width: 28vw;
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
    margin-bottom: 10px;
    padding: 5px;
    color: #D5D5D5;
    border-radius: 5px;
    z-index: 2;
    font-size: 1vw;

  }
  .grand-child-level {
    position:relative;
    left: 5vw;
    max-width: 20.4vw;;
    padding: 5px;
    color: #D5D5D5;
    border-radius: 5px;
    z-index: 2;
    font-size: 1vw;
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
    text-align: center;
  }
  .form-creation{
    position: absolute;
    font-family: Arial;
    top: 5.5vw;
    left: 10vw;
    z-index: 2;
    background-color: #D5D5D5;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 5px;
  }
  .pouch-creation {
    position: absolute;
    font-family: Arial;
    top: 8vw;
    left: 10vw;
    z-index: 2;
    background-color: #D5D5D5;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 5px;
  }
  .item-icon{
    position: relative;
    width: 2.5vw;
    left: 1vw;
    top: 2vw;
  }
  .child-text{
    position: relative;
    margin-left: 40px;
    left: 3vw;
    bottom: 1vw;
  }
  .child-content {
    background-color: #42426A;
    border-radius: 5px;
    margin-top: 0.15vw;
  }
  .grand-child-content {
    background-color: #42426A;
    border-radius: 5px;
    margin-top: 0.15vw;
  }
  .child{
    display: flex;
    flex-direction: row;
  }
  .grand-text{
    position: relative;
    margin-left: 40px;
    left: 3vw;
    bottom: 1vw; 
  }
  .space-bar{
    margin-left: 5px;
    font-size: 40px;
  }
  .item_image {
    height: auto;
    width: 2vw;
  }
  .form {
    position: absolute;
    top: 20vw;
  }
  .situation-text {
    position: relative;
    bottom: 15vw;
    font-size: 0.8vw;
  }
  .situation-title {
    position: relative;
    bottom: 16vw;
    font-size: 1.2vw;
    font-weight: bold;
  }
  .scroll-zone-up {
    position:absolute;
    left: 7vw;
    top: 13vw;
    width: 27vw;
    /* border: 2px solid green; */
    padding: 1vw;
  }
  .scroll-zone-down {
    position:absolute;
    left: 7vw;
    top: 48.5vw;
    width: 27vw;
    /* border: 2px solid green; */
    padding: 1vw;
  }
  /* .child-package{
    margin-top: 15px;
  } */
  .flip-2261{
    z-index: 2;
    position: absolute;
    right:4%;
    bottom:10%;
    height:5%;
    width: 5%;
  }
  .form-3883{
    position: relative;
    left: -15%;
  }
</style>