<template>
  <div>
    <!-- <Error v-if="error"/> -->

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
    <div class='frame'>
      <button :class="'page-submit-button'" @click="submitPage()">Submit</button>

      <div class= "form-creation">
        <button @click="createItem(createFormType, '', getSituationNumber, 2, true, '', undefined)">
          Create New Form
        </button>
        <select class="form-creation-select" v-model="createFormType">
          <option value="psform3854">PS Form 3854</option>
          <option value="psform3877">PS Form 3877</option>
          <option value="ddform2261">DD Form 2261</option>
          <option value="psform3883">PS Form 3883</option>
          <option value="psform3849">PS Form 3849</option>
        </select>
      </div>

      <div class="pouch-creation">
        <button @click="createItem('pouch', getSeal(), getSituationNumber, 2, true, 'Bag-1', undefined, [])">
          Create New Pouch
        </button>
      </div>

    <div class="left-frame">
      <div
        id="left-frame"
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
            <div class="child-content item-image" v-if="items[child].images.length != 0">
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

              <div class="grand-child-content" v-if="items[grandchild].images.length != 0">
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

          <div v-if="this.currentFormIndex != ''">
            <div v-if="this.items[currentFormIndex].type == 'PS FORM 3854' && form3854Back == false">
            <Form3854 
              v-bind:item="items[currentFormIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form3854Back = true">Flip</button>
          </div>
          <div v-if="this.items[currentItemIndex].type == 'PS FORM 3854' && form3854Back == true">
            <Form3854Back 
              v-bind:item="items[currentItemIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form3854Back = false">Flip</button>
          </div>
          <div v-if="this.items[currentFormIndex].type == 'PS FORM 3877'" >
            <Form3877 
              v-bind:item="items[currentFormIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          <div v-if="this.items[currentFormIndex].type == 'DD FORM 2261' && form2261Back == false">
            <Form2261 
              v-bind:item="items[currentFormIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form2261Back = true">Flip</button>
          </div>
          <div v-if="this.items[currentFormIndex].type == 'DD FORM 2261' && form2261Back == true">
            <Form2261Back 
              v-bind:item="items[currentFormIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form2261Back = false">Flip</button>
          </div>
          <div v-if="this.items[currentFormIndex].type == 'PS FORM 3883'" class="form-3883">
            <Form3883 
              v-bind:item="items[currentFormIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          <div v-if="this.items[currentFormIndex].type == 'PS FORM 3849'">
            <Form3849
              v-bind:item="items[currentFormIndex]"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          </div>
        </div>
        <PageNav 
          v-bind:pageErrors="pageErrors"
        />
    </div>
  </div>
</template>

<script>
  import PageNav from '../Navigation/PageNav.vue'
  import Form3854 from '../Forms/Form3854.vue'
  import Form3854Back from '../Forms/Form3854(Back).vue'
  import Form3877 from '../Forms/Form3877.vue'
  import Form2261 from '../Forms/Form2261.vue'
  import Form2261Back from '../Forms/Form2261(Back).vue'
  import Form3883 from '../Forms/Form3883.vue'
  import Form3849 from '../Forms/Form3849.vue'
  import key from '../data/answerKey.json'
  export default {
    name: 'Frame',
    components: {
      PageNav,
      Form3854,
      Form3877,
      Form2261,
      Form2261Back,
      Form3883,
      Form3849,
      Form3854Back
    },
    props: [
      'pageNum'
    ],
    data() {
      return {
        studentName: "Bob",
        payGrade: "1",
        error: false,
        answerKey: key,
        items: [
          {
            articleCode: "Placeholder",
            id: 1,
            title: "Placeholder",
            children: [],
            level: 0,
            stampCounter: 0,
            stampable: false,
            formInputs: {},
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
          {
            articleCode: "Safe",
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
            droppable: true,
            gradeAt: []
          },
          {
            articleCode: "Forms",
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
            droppable: true,
            gradeAt: []
          },
          {
            id: 6,
            title: "Incoming Truck",
            articleCode: "Truck 1",
            children: [],
            level: 0,
            situationNumber: "Situation 2",
            stampCounter: 0,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 2"
              },
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
          {
            id: 7,
            title: "Outgoing Truck",
            articleCode: "Truck 2",
            children: [],
            level: 0,
            situationNumber: "Situation 3",
            stampCounter: 0,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 3"
              },
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
        ],
        //default assumes there is something wrong
        //(this prevents next arrow from being clicked until they at least try and submit)
        pageErrors: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
        currentItemIndex: 2,
        currentFormIndex: '',
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
        form3854Back: false,
        showCurrentItem: true,
      }   
    },
    mounted() {
      this.updateSituation();
      this.processAnswerKey();
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
      },
      //returns items from items array that contain the current situation in their gradeAt array
      getGradingItemList() {
        return this.items.filter(x => x.gradeAt.includes(this.getSituationNumber))
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
      },
      onHoverDown() {
        document.getElementById('left-frame').scrollTop += 10;
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
      //broken?
      findParentIndex(itemID){
        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].children.indexOf(itemID) == -1){
            return i
          }
        }
      },
      itemImage(object) {
        return object.images[object.currentImageIndex]
      },
      //record current item index and update current form index when needed
      changeCurrentItem (evt, id) {
        console.log(this.currentItemIndex, this.getItemIndex(id))
        if(this.currentFormIndex != this.getItemIndex(id)){
          this.currentItemIndex = this.getItemIndex(id)
          // console.log(this.items[this.currentItemIndex].type)
          if(this.items[this.currentItemIndex].type.indexOf("FORM") !== -1) {
            this.currentFormIndex = this.currentItemIndex;
          }
        } 
        else if(this.showCurrentItem == true){
          this.showCurrentItem = false
          this.currentFormIndex = ''
        }
        else if(this.showCurrentItem == false){
          this.showCurrentItem = true
          if(this.items[this.currentItemIndex].type.indexOf("FORM") !== -1) {
            this.currentFormIndex = this.currentItemIndex;
          }
        }
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
      (['string' type of item], ['string' unique article identifer], ['int' situation number], ['int' level], ['boolean'] default item creation behavior, ['string'] image code, ['object'] form settings)

      NOTE: Default item creation causes forms to be added to the forms section, and all other things to be added to the safe.
      You would want to disable default behavior if you planned to add the item to another item's children array for example.
      */
      createItem(itemType, articleCode, situationNumber, level, defaultCreate, imageCode, formSettings, gradeAt) {
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
            gradeAt: gradeAt,
            formInputs: {
              situationNumber: 'Situation ' + situationNumber,
              articleCode: "Bill #" + articleCode,
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
              currentTime: "",
              dispatchingClerk: "",
              itemNums: [],
              itemOrigins: [],
              topStamp1: false,
              topStamp2: false,
              bottomStamp1: false,
              bottomStamp2: false,
              witnessSent: "",
              witnessRecieved: "",
              backText: "",
            },
            type: "PS FORM 3854",
            droppable: true
          }
          if(newItem.articleCode != '') {
            newItem.articleCode = 'Bill #' + newItem.articleCode;
          }

          if(formSettings != undefined) {
            newItem.formInputs = {...newItem.formInputs, ...formSettings}
          }
          
          this.items.push(newItem);
          if(defaultCreate) {
            this.items[2].children.push(newItem.id)
          }
        }
        else if(itemType == "psform3849") {
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
            gradeAt: gradeAt,
            formInputs: {
               situationNumber: 'Situation ' + situationNumber,
               articleCode: articleCode,
               reverseAddress: "",
               name: "",
               signature: "",
               otherText: "",
               other: false,
               mustBe21: false,
               mustBe18: false,
               sigReq: false,
               noRecip: false,
               noSecLoc: false,
               receptFull: false,
               customs: false,
               postage: false,
               cost: "",
               requiresPayment: false,
               finalNotice: false,
               firstAttempt: false,
               pickupDate: "",
               parcelLockEligible: false,
               pack: false,
               letter: false,
               largeEnvelope: false,
               address: "",
               sentTo: "",
               sentBy: "",
               date: "",
            },
            type: "PS FORM 3849",
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
            articleCode: articleCode,
            situationNumber: 'Situation ' + situationNumber,
            children: [],
            level: level,
            images: [],
            currentImageIndex: 0,
            stampCounter: 0,
            stampable: false,
            gradeAt: gradeAt,
            formInputs: {
                situationNumber: 'Situation ' + situationNumber,
                articleCode: articleCode,
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
                stamped: false,
            },
            type: "PS FORM 3877",
            droppable: true
          }
          if(newItem.articleCode != '') {
            newItem.articleCode = 'Bill #' + newItem.articleCode;
          }

          if(formSettings != undefined) {
            newItem.formInputs = {...newItem.formInputs, ...formSettings}
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
            gradeAt: gradeAt,
            formInputs: {
                situationNumber: 'Situation ' + situationNumber,
                articleCode: articleCode,
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

          if(formSettings != undefined) {
            newItem.formInputs = {...newItem.formInputs, ...formSettings}
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
            gradeAt: gradeAt,
            formInputs: {
              situationNumber: 'Situation ' + situationNumber,
              articleCode: articleCode,
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
              stamped: false,
            },
            type: "PS FORM 3883",
            droppable: true
          }

          if(formSettings != undefined) {
            newItem.formInputs = {...newItem.formInputs, ...formSettings}
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
            droppable: true,
            gradeAt: gradeAt,
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
            gradeAt: gradeAt,
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
            droppable: true,
            gradeAt: gradeAt,
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
        //console.log(newItem)
        this.idCounter++;
        return newItem.id;
     
      },
      //accepts an array and returns it without any blank entries
      cleanArray(arr) {
        let newArr = arr.filter(function(str) {
        return /\S/.test(str);
      });
      return newArr;
      },
      submitPage() {
        this.gradeSituationContents();
      },
      //Returns an item given it's ID
      findItemByID(id){
        return this.items.filter(x => x.id == id);
      },
      //Accepts an item and an array of ints, and updates the given item's gradeAt array
      updateGradeAt(item, newGradeAt) {
        console.log("update grade at:", item, newGradeAt)
      },
      /*Accepts an item and its corresponding key item and checks to see if the item is in the correct location
      returns 0 if it's correct or 1 if it's incorrect
      */
      checkItemLocation(item, keyItem) {
        console.log("checking location!")
        let parentID = this.findParent(item.id)
        let location = this.findItemByID(parentID)[0].articleCode
        if(location == keyItem[`situation${this.getSituationNumber}Location`]) {
          console.log(keyItem.articleCode, "is in the right spot")
          return 0;
        }
        else {
          console.log("ERROR:", keyItem.articleCode, "is in the wrong spot")
          return 1;
        }
      },
      /*Accepts an item and and returns the number of errors it has
      NOTE: Grading of forms takes place in gradeForm() since it's much more complex then other items
      NOTE 2: At the time this is called, we assume that there is a match between the item and the answer key
      */
      gradeItem(item, keyItem) {
        // console.log(item)
        let itemType = item.type;
        switch(itemType) {
            case "Package": {
              console.log("Its a package")
              let errors = this.checkItemLocation(item, keyItem);
              return errors;
            }
            case "Letter": {
              console.log("Its a letter")
              let errors = this.checkItemLocation(item, keyItem);
              return errors;
            }
            case "Pouch": {
              console.log("Its a pouch")
              let errors = this.checkItemLocation(item, keyItem);
              return errors;
            }
            case "Truck": {
              console.log("Its a Truck")
              let errors = this.checkItemLocation(item, keyItem);
              return errors;
            }
            default: {
              let errors = 0;           
              if(itemType == "DD FORM 2261") {
                // console.log(item.articleCode, keyItem, item.type)
                errors += this.checkItemLocation(item, keyItem)
                errors += this.gradeForm(item.articleCode, keyItem, item.type)
                return errors
              }
              if(itemType == "PS FORM 3854") {
                // console.log(item.articleCode, keyItem, item.type)
                errors += this.checkItemLocation(item, keyItem)
                errors += this.gradeForm(item.articleCode, keyItem, item.type)
                return errors
              }
              break
            }
        }
      },
      //facilitates the grading of each item for the current situation on submit
      gradeSituationContents() {
        var errors = 0;
          // let situationItems = this.items.filter(x => x.situationNumber == `Situation ${this.getSituationNumber}`)
          let situationItems = this.getGradingItemList;
          console.log("in grade situation", situationItems)
          let keyItems = this.answerKey.answers.filter(x => x.situationNumber == `Situation ${this.getSituationNumber}`)
          keyItems.forEach((currentKeyItem) => {
            
            //check to see if our filtered key list contains a matching article code
            let currentItem = situationItems.filter(x => 
              x.articleCode == currentKeyItem.articleCode
            )
            
            if(currentItem[0] != undefined) {
              //console.log("situationItems",situationItems.length)
              let itemErrors = this.gradeItem(currentItem[0], currentKeyItem);
              console.log("itemErrors",itemErrors)
              
              //if there are no errors, remove item from both arrays
                situationItems = situationItems.filter(x => 
                  x.articleCode != currentItem[0].articleCode
                  )
                  //console.log("situationItems ",situationItems.length)
            }
          })
          
          //If there are no errors, unlock the navigation arrow
          if(errors == 0) {
            this.pageErrors[0] = false;
          }
        console.log(situationItems.length, keyItems.length)
      },
      gradeForm(articleCode, keyForm, formCode) {
        let userForm = this.items[this.getItemByArticleCode(articleCode)].formInputs
        if(formCode == "DD FORM 2261") {
          let errors = 0;
          for (let property in keyForm) {
            if(userForm[property] != keyForm[property] && property != "items") {
              console.log(`${userForm[property]}`, '!=', `${keyForm[property]}`)
              errors++;
            }
            if(Array.isArray(keyForm[property])) {
              let startGrading = false;
              for(let i = userForm.items.length-1; i >= 0; i--) {
                if(startGrading == true && (userForm.items[i] === "" || userForm.items[i] === undefined)){
                  errors = errors+i+1;
                  break;
                }
                else if(userForm.items[i].length){
                  if(!keyForm.items.includes(userForm.items[i])){
                    errors++;
                  }
                  startGrading = true;
                }
              }
             // console.log(articleCode, "errors:", errors);
              return errors;
            }
          }
        }
        if(formCode == "PS FORM 3854") {
          console.log("Its a 3854!")
          let errors = 0;
          let keyPairs = [];
          for (let property in keyForm) {
            // console.log(property)
            if(Array.isArray(keyForm[property])) {

              if(property == "itemOrigins") {
                //If there are item origins, we need to build an answer key
                if(keyForm.itemOrigins.length > 1) {
                  //first pass to build the answer key
                  for(let i = 1; i < keyForm.itemOrigins.length; i++) {
                    if(userForm.itemOrigins[i] != undefined) {
                      let keyItem = {left: keyForm.itemNums[i], right: keyForm.itemOrigins[i]}
                      keyPairs.push(keyItem);
                    }
                  }
                  //second pass to see if the items are in the wrong order
                  for(let i = 1; i < userForm.itemNums.length; i++) {
                    for(let j = 0; j < keyPairs.length; j++) {
                      //If left column item should have a match
                      if(userForm.itemNums[i] == keyPairs[j].left) {
                        //If the right hand column item is defined at the current index
                        if(userForm.itemOrigins[i] != undefined) {
                          //It doesn't match
                          if(userForm.itemOrigins[i] != keyPairs[j].right) {
                            errors++
                            break
                          }
                        }
                        //Its undefined, so it must be wrong
                        else { 
                          errors++
                          break
                        }
                      }
                    }
                  }

                }
              } // end itemOrigins processing

              else if(property == "recievingClerks") {
                //If the student put nothing, but there should be something its wrong
                if(userForm[property].length == 0 && keyForm[property].length > 0) {
                  errors+= keyForm[property].length;
                }
                else {
                  //Make sure all entries are correct
                  let keyItems = keyForm.recievingClerks;
                  let userItems = userForm.recievingClerks;
                  for(let i = 0; i < keyItems.length; i++) {
                    if(!keyItems.includes(userItems[i])) {
                      errors++;
                    }
                  }
                }
              }


              }
            //Property is not an array, and is incorrect
            else if(userForm[property] != keyForm[property]) {
              console.log("prop:", property, `${userForm[property]}`, '!=', `${keyForm[property]}`)
              errors++;
            }
          }
          return errors;
        }
      },

      getItemByArticleCode(code) {
        let index = this.items.findIndex(item => item.articleCode == code)
        return index;
      },
      //Uses the parent's article code and the child's id to add the child to the parent's children array
      assignItemToParent(parentArticleCode, childID) {
        let parent = this.items.filter(x => x.articleCode == parentArticleCode)
        let child = this.items.filter(x => x.id == childID)
        parent[0].children.push(child[0].id);
      },
      //Returns today by default, provide an int (positive or negative) to adjust the day
      getYYYYMMDD(offset) {
        var d = new Date();
        var mm = d.getMonth() + 1;
        var dd = d.getDate() + offset;

        return [d.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
      },
      //gets the nearest time and sets in in the answer key
      getNearestTime(){
        this.answerKey.answers.forEach(obj => {
          let d = new Date()
          let hours = d.getHours()
          let minutes = d.getMinutes()
          let currentTime
          if(hours < 10){
            currentTime = "0" + hours
          }
          else{
            currentTime = hours
          }
          if(minutes < 15){
            currentTime = currentTime + "00"
          }
          else if(minutes >= 15 && minutes < 30){
            currentTime = currentTime + "15"
          }
          else if(minutes >= 30 && minutes < 45){
            currentTime = currentTime + "30"
          }
          else if(minutes >= 45 && minutes <= 59){
            currentTime = currentTime + "45"
          }
          for(const property in obj){
            if(property == "currentTime"){
              obj[property] = currentTime;
              //console.log(obj[property])
            }
          }
        })
      },
      //function that handles events as the situation is changed
      updateSituation() {
        if(this.getSituationNumber == 1) {
          if(!this.situationOneInit){

            let newFormSettings = {
              apoNum: "APO AE 09459",
                from: this.getYYYYMMDD(-1),
                to: this.getYYYYMMDD(-1),
                totalItems9thru14: "2",
                items: ["RB339065331US", "RB290770790US"],
            }

            let yest = this.getYYYYMMDD(-1)
            this.createItem('ddform2261', yest, 1, 2, true, '', newFormSettings, [1])
            this.createItem('package', 'RB 339 065 331 US', 1, 2, true, '331', undefined, [1])
            this.createItem('package', 'RB 290 770 790 US', 1, 2, true, '790', undefined, [1])
          }
          this.situationOneInit = true;
        }
        else if(this.getSituationNumber == 2) {
          if(this.pageNum == 2 && !this.situationTwoPartOne) {
            
            //hardcode all truck visibility
            this.items[3].level = 1;
            this.items[4].level = 0;

            let newFormSettings = {
              billNo: "260",
              pageNo: "1X",
              to: "APO AE 09459",
              billNoRight: "260",
              totalArticlesSent: "3",
              postmasterSent: "Anthony Smith",
              dispatchingClerk: "0800",
              itemNums: ["", "S/70948511", "O/RB102022763US", "O/RB298302613US"],
              itemOrigins: ["", "AMF KENNEDY NY 00300"],
              topStamp1: true,
              topStamp2: true,
              bottomStamp1: false,
              bottomStamp2: false
            }
            let form1 = this.createItem('psform3854', '260', 2, 2, false, '', newFormSettings, [2])
            this.assignItemToParent('Truck 1', form1)
            let item1 = this.createItem('pouch', '70948511', 2, 2, false, 'Bag-1', undefined, [2])
            this.assignItemToParent('Bill #260', item1)
            let item2 = this.createItem('package', 'RB 102 022 763 US', 2, 2, false, '763', undefined, [2])
            this.assignItemToParent('Bill #260', item2)
            let item3 = this.createItem('package', 'RB 298 302 613 US', 2, 2, false, '613', undefined, [2])
            this.assignItemToParent('Bill #260', item3)
            console.log(this.items)

            //42 - 47
            this.situationTwoPartOne = true;
          }
          else if(this.pageNum == 3 && !this.situationTwoPartTwo) {

            //hardcode all truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;

            let newFormSettings = {
              billNo: "231",
              pageNo: "1X",
              sealNo: "70948511",
              to: "APO AE 09459",
              billNoRight: "231",
              sealNoRight: "70948511",
              totalArticlesSent: "6",
              postmasterSent: "Hark Smith",
              dispatchingClerk: "0930",
              itemNums: ["", "RB621758502US", "RB309266104US", "RB867092744US", "RB218344488US", "RB143899161US", "RB888122361US"],
              witnessSent: "WIT: Larry Brown",
              topStamp1: true,
              topStamp2: true,
              bottomStamp1: false,
              bottomStamp2: false
            }
            
            let item1 = this.createItem('psform3854', '231', 2, 3, false, '', newFormSettings, [2])
            this.assignItemToParent('SEAL #70948511', item1)
            let item2 = this.createItem('letter', 'RB 867 092 744 US', 2, 3, false, '744', undefined, [2])
            this.assignItemToParent('SEAL #70948511', item2)
            let item3 = this.createItem('letter', 'RB 309 266 140 US', 2, 3, false, '140', undefined, [2])
            this.assignItemToParent('SEAL #70948511', item3)
            let item4 = this.createItem('letter', 'RB 143 899 161 US', 2, 3, false, '161', undefined, [2])
            this.assignItemToParent('SEAL #70948511', item4)
            let item5 = this.createItem('letter', 'RB 218 344 488 US', 2, 3, false, '488', undefined, [2])
            this.assignItemToParent('SEAL #70948511', item5)
            let item6 = this.createItem('letter', 'RB 888 122 361 US', 2, 3, false, '361', undefined, [2])
            this.assignItemToParent('SEAL #70948511', item6)
            //34-41
            this.situationTwoPartTwo = true;
          }
          
        }
        else if(this.getSituationNumber == 3 && !this.situationThreeInit) {
          this.situationThreeInit = true;
          //hardcode all truck visibility
          this.items[3].level = 0;
          this.items[4].level = 1;
          console.log(this.items)
        }
        else if(this.getSituationNumber == 4) {
          if(this.pageNum == 5 && !this.situationFourPartOne) {

            let newFormSettings = {
              billNo: "30",
              pageNo: "1X",
              to: "APO AE 09459",
              billNoRight: "30",
              totalArticlesSent: "2",
              postmasterSent: "Todd Edgar",
              dispatchingClerk: "0800",
              itemNums: ["", "S/43000277", "O/RB300911759US"],
              itemOrigins: ["", "APO AE 09459 - 2"],
              topStamp1: true,
              topStamp2: true,
              bottomStamp1: false,
              bottomStamp2: false,
            }

            this.createItem('psform3854', '30', 4, 2, true, '', newFormSettings, [])
            this.createItem('pouch', '43000277', 4, 2, true, 'Bag-1', undefined, [])
            this.createItem('package', 'RB 300 911 759 US', 4, 2, true, '759', undefined, [])
            //30-33
            this.situationFourPartOne = true;
          }
          else if(this.pageNum == 6 && !this.situationFourPartTwo) {

            let newFormSettings = {
              billNo: "24",
              pageNo: "1X",
              sealNo: "43000277",
              to: "APO AE 09459",
              billNoRight: "24",
              sealNoRight: "43000277",
              totalArticlesSent: "6",
              postmasterSent: "Leroy Brown",
              dispatchingClerk: "0745",
              itemNums: ["", "RB300911755US", "RB300911756US", "RB300911757US", "RB300911758US", "RB300911760US", "RB300911761US"],
              topStamp1: true,
              topStamp2: true,
              bottomStamp1: false,
              bottomStamp2: false,
              witnessSent: "WIT: Scott Sanders",
            }

            let item1 = this.createItem('psform3854', '24', 4, 3, false, '', newFormSettings, [])
            this.assignItemToParent('SEAL #43000277', item1)
            let item2 = this.createItem('letter', 'RB 300 911 755 US', 4, 3, false, '755', undefined, [])
            this.assignItemToParent('SEAL #43000277', item2)
            let item3 = this.createItem('letter', 'RB 300 911 756 US', 4, 3, false, '756', undefined, [])
            this.assignItemToParent('SEAL #43000277', item3)
            let item4 = this.createItem('letter', 'RB 300 911 757 US', 4, 3, false, '757', undefined, [])
            this.assignItemToParent('SEAL #43000277', item4)
            let item5 = this.createItem('package', 'RB 300 911 758 US', 4, 3, false, '758', undefined, [])
            this.assignItemToParent('SEAL #43000277', item5)
            let item6 = this.createItem('letter', 'RB 300 911 760 US', 4, 3, false, '760', undefined, [])
            this.assignItemToParent('SEAL #43000277', item6)
            let item7 = this.createItem('package', 'RB 300 911 761 US', 4, 3, false, '761', undefined, [])
            this.assignItemToParent('SEAL #43000277', item7)
            //22-29
            this.situationFourPartTwo = true;
          }
          else if(this.pageNum == 7 && !this.situationFourPartThree) {

            let newFormSettings = {
              senderAddress: "45th MP CO APO AE 09459",
                registeredMail: true,
                trackingNum1: "RB842320438US",
                trackingNum2: "RB842320439US",
                trackingTextInput1: "HQ CAC FT KNOX, KY 40121",
                trackingTextInput2: "545 MP CO FT JACKSON, SC 29207",
                piecesSent: "2",
                rows:["0.87", "9.50", "N/A", "", "", "", "", "", "", "", "", "", "",
                      "1.83", "9.50", "N/A"],
                stamped: false
            }

            this.createItem('psform3877', '24', 4, 2, true, '', newFormSettings, [])
            this.createItem('letter', 'RB 842 320 438 US', 4, 2, true, '438', undefined, [])
            this.createItem('letter', 'RB 842 320 439 US', 4, 2, true, '439', undefined, [])
            //18-21
            this.situationFourPartThree = true;
          }
          else if(this.pageNum == 8 && !this.situationFourPartFour) {

            let newFormSettings = {
              lockNo: "",
              rotaryNo: "",
              jacketNo: "",
              controlNo: "",
              billNo: "33",
              pageNo: "1X",
              airmail: "",
              sealNo: "H/C",
              to: "APO AE 09824",
              billNoRight: "33",
              amNo: "",
              jacketNoRight: "",
              lockNoRight: "",
              rotaryNoRight: "",
              airmailRight: "",
              sealNoRight: "H/C",
              recieved: "",
              recievingClerks: [],
              totalArticlesSent: "10",
              totalArticlesRecieved: "",
              postmasterSent: "Michael Turner",
              postmasterRecieved: "",
              currentTime: "",
              dispatchingClerk: "1400",
              itemNums: ["", "RB707092210US", "RB707092211US", "RB707092212US", "RB707092213US", "RB707092214US", "RB707092215US",
               "RB707092216US", "RB707092217US", "RB707092218US", "RB707092219US"],
              itemOrigins: [],
              topStamp1: true,
              topStamp2: true,
              bottomStamp1: false,
              bottomStamp2: false,
              witnessSent: "",
              witnessRecieved: ""
            }

            this.createItem('psform3854', '33', 4, 2, true, '', newFormSettings, [])
            this.createItem('letter', 'RB 707 092 210 US', 4, 2, true, '210', undefined, [])
            this.createItem('package', 'RB 707 092 211 US', 4, 2, true, '211', undefined, [])
            this.createItem('letter', 'RB 707 092 212 US', 4, 2, true, '212', undefined, [])
            this.createItem('letter', 'RB 707 092 213 US', 4, 2, true, '213', undefined, [])
            this.createItem('letter', 'RB 707 092 214 US', 4, 2, true, '214', undefined, [])
            this.createItem('package', 'RB 707 092 215 US', 4, 2, true, '215', undefined, [])
            this.createItem('letter', 'RB 707 092 216 US', 4, 2, true, '216', undefined, [])
            this.createItem('letter', 'RB 707 092 217 US', 4, 2, true, '217', undefined, [])
            this.createItem('letter', 'RB 707 092 218 US', 4, 2, true, '218', undefined, [])
            this.createItem('letter', 'RB 707 092 219 US', 4, 2, true, '219', undefined, [])
            //6-17
            this.situationFourPartFour = true;
          }
        }
      },
      changeForm(newForm){
        this.items[this.currentItemIndex].formInputs = newForm;
        this.getNearestTime()
      },
      // Takes the answer key from the JSON and changes all of the variable answers that depend on the student and changes them
      // to the correct ones for this student (name, date, etc..) 
      // still needs functionality for time, working on that
      processAnswerKey(){
        this.answerKey.answers.forEach(obj => {
          for(const property in obj ){
            if(typeof obj[property] === 'string'){
              if(obj[property].includes("Student") || obj[property].includes("PayGrade")){
                //console.log("Before ", obj[property])
                obj[property] = obj[property].replaceAll("Student", this.studentName);
                obj[property] = obj[property].replaceAll("PayGrade", this.payGrade);
                //console.log("After ", obj[property
              }
              if(obj[property].includes("YESTERDAY")){
                //console.log("Before ", obj[property])
                obj[property] = obj[property].replaceAll("YESTERDAY", this.getYYYYMMDD(-1));
                //console.log("After ", obj[property])
              }
              if(obj[property].includes("Current Date")){
                //console.log("Before ", obj[property])
                obj[property] = obj[property].replaceAll("Current Date", this.getYYYYMMDD(0));
                //console.log("After ", obj[property])
              }
            }
            if(Array.isArray(obj[property])){
              if(obj[property].includes("Student")){
                //console.log("student in array")
                let index = obj[property].indexOf("Student")
                //console.log("Before ", obj[property][index])
                obj[property][index] = obj[property][index].replaceAll("Student", this.studentName)
                //console.log("After ", obj[property][index])
              }
            }
          }
        })
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
  .drop-zone {
    order: 1;
    background-color: #333366;
    width: 22vw;
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
  .page-submit-button {
    position: absolute;
    top: 10px;
    right: 5vw;
    z-index: 2;
  }
  .letter{
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
    z-index: 3;
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
    z-index: 3;
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
    top: 12.8vw;
    width: 27vw;
    /* border: 2px solid green; */
    padding: 1.1vw;
  }
  .scroll-zone-down {
    position:absolute;
    left: 7vw;
    top: 48.5vw;
    width: 27vw;
    /* border: 2px solid green; */
    padding: 2vw;
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
</style>