<template>
  <div>
    <Error 
      v-bind:showError="showError"
      v-bind:problemItems="problemItems"
      v-bind:totalErrors="totalErrors"
      @changeShow="this.showError = false"
    />
    <Delete 
      v-bind:deleteModalShow="deleteModalShow"
      v-bind:deletingItem="deletingItem"
      @deleteChoice="deleteItem($event, data)"
      @doNothing="deleteModalShow = false"
    />
    <SectionCompleted
      v-bind:sectionNumber="getSituationNumber"
      v-bind:successModalShow="successModalShow"
      @successModal="successModalShow = false"
    />
    <div class="scroll-zone-up"
    draggable=false
    @dragover="onHoverUp()"/>

    <div class="scroll-zone-down"
    draggable=false
    @dragover="onHoverDown()"/>
    
    <div class='frame'>
      <button v-if="this.showSubmit.includes(this.pageNum)" :class="'page-submit-button'" @click="submitPage()">SUBMIT</button>
      <div class= "form-creation">
        <button class="creation-button" @click="createItem(createFormType, 'created', getSituationNumber, 2, true, '', undefined, this.updateGradeAt(), true)">
          CREATE NEW FORM
        </button>
        <select class="form-creation-select creation-dropdown" v-model="createFormType">
          <option value="psform3854">PS Form 3854</option>
          <option value="psform3877">PS Form 3877</option>
          <option value="ddform2261">DD Form 2261</option>
          <option value="psform3883">PS Form 3883</option>
          <option value="psform3849">PS Form 3849</option>
        </select>
      </div>
      
      <a target="_blank" @click="popOut(openPDF)"><button class="creation-button sho">STUDENT HAND OUT</button></a>

      <div v-if="this.showPouchCreation.includes(this.pageNum)" class="pouch-creation">
        <button class="creation-button" @click="createPouch()">
          CREATE NEW POUCH
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
            <span class="bold">{{ item.title }}</span>
            <button v-if='item.collapsed == false || item.collapsed == undefined' class="creation-button" @click="collapseItem(item)">Close</button>
            <button v-if='item.collapsed == true' class="creation-button" @click="collapseItem(item)">Open</button>
             <div v-if="item.children.length == 0 && item.collapsed == false">
              <br><br>
            </div>
            <div v-if="item.collapsed == false || item.collapsed == undefined">
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

                  <button v-if="items[child].created" @click="startDelete($event, items[child])" class="delete-button">X</button>

                  <div class = "child-text">
                    {{ items[child].type }} <br> <span v-if="!items[child].articleCode.includes('created') && items[child].articleCode != '48'">{{ items[child].articleCode }}</span> <br> {{ items[child].situationNumber }}
                  </div>
                </div>  
                <div class="child-content item-image" v-if="items[child].images.length != 0">
                  <div class="stamp-input" v-show="items[child].showImage && items[child].type != 'Pouch'"> <input class="stamp-button" v-model="items[child].stampCounter" @click="this.stampItem($event, items[child])" type="checkbox">Stamp </div>
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

                      <button v-if="items[grandchild].created" @click="startDelete($event, items[grandchild])" class="delete-button">X</button>

                      <div class='grand-text'>
                        {{ items[grandchild].type }} <br> <span v-if="!items[grandchild].articleCode.includes('created') && items[grandchild].articleCode != '48'">{{ items[grandchild].articleCode }}</span> <br> {{ items[grandchild].situationNumber }}
                      </div>
                    </div>

                    <div class="grand-child-content" v-if="items[grandchild].images.length != 0">
                    <div class="stamp-input" v-show="items[grandchild].showImage"> <input class="stamp-button" v-model="items[grandchild].stampCounter" @click="this.stampItem($event, items[grandchild])" type="checkbox">Stamp </div>
                      <img v-show="items[grandchild].showImage" :src="itemImage(items[grandchild])">
                    </div>
                    <div 
                      class='great-grand-level' 
                      v-for='greatgrand in getChildrenIndexes(items[grandchild].id)'
                      :key='greatgrand'
                      :draggable ='true'
                      @dragstart='startDrag($event, items[greatgrand])'
                      @drop="onDrop($event,items[greatgrand].id)"
                      @click="changeCurrentItem($event, items[greatgrand].id), toggleItemImage(items[greatgrand])"
                    >
              
                      <div class="grand-child-content">
                        <img v-if="items[greatgrand].type == 'Letter'" src="../assets/White-Letter.svg" class="item-icon grand-letter">
                        <img v-else-if="items[greatgrand].type == 'Package'" src="../assets/White-Box.svg" class="item-icon grand-package">
                        <img v-else-if="items[greatgrand].type == 'Pouch'" src="../assets/White-Pouch.svg" class="item-icon grand-pouch">
                        <img v-else src="../assets/White-form.svg" class="item-icon grand-form">

                        <button v-if="items[greatgrand].created" @click="startDelete($event, items[greatgrand])" class="delete-button">X</button>

                        <div class='great-grand-text'>
                          {{ items[greatgrand].type }} <br> <span v-if="!items[greatgrand].articleCode.includes('created') && items[greatgrand].articleCode != '48'">{{ items[greatgrand].articleCode }}</span><br> {{ items[greatgrand].situationNumber }}
                        </div>
                      </div>

                      <div class="grand-child-content" v-if="items[greatgrand].images.length != 0">
                        <div class="stamp-input" v-show="items[greatgrand].showImage"> <input class="stamp-button" v-model="items[greatgrand].stampCounter" @click="this.stampItem($event, items[greatgrand])" type="checkbox">Stamp </div>
                        <img v-show="items[greatgrand].showImage" :src="itemImage(items[greatgrand])">
                      </div>
                      <div 
                        class='great-grand-level' 
                        v-for='greatgreat in getChildrenIndexes(items[greatgrand].id)'
                        :key='greatgreat'
                        :draggable ='true'
                        @dragstart='startDrag($event, items[greatgreat])'
                        @drop="onDrop($event,items[greatgreat].id)"
                        @click="changeCurrentItem($event, items[greatgreat].id), toggleItemImage(items[greatgreat])"
                      >
              
                        <div class="grand-child-content">
                          <img v-if="items[greatgreat].type == 'Letter'" src="../assets/White-Letter.svg" class="item-icon grand-letter">
                          <img v-else-if="items[greatgreat].type == 'Package'" src="../assets/White-Box.svg" class="item-icon grand-package">
                          <img v-else-if="items[greatgreat].type == 'Pouch'" src="../assets/White-Pouch.svg" class="item-icon grand-pouch">
                          <img v-else src="../assets/White-form.svg" class="item-icon grand-form">

                          <button v-if="items[greatgreat].created" @click="startDelete($event, items[greatgreat])" class="delete-button">X</button>

                          <div class='great-grand-text'>
                            {{ items[greatgreat].type }} <br> <span v-if="!items[greatgreat].articleCode.includes('created') && items[greatgreat].articleCode != '48'">{{ items[greatgreat].articleCode }}</span><br> {{ items[greatgreat].situationNumber }}
                          </div>
                        </div>
                        <div class="grand-child-content" v-if="items[greatgreat].images.length != 0">
                          <div class="stamp-input" v-show="items[greatgreat].showImage"> <input class="stamp-button" v-model="items[greatgreat].stampCounter" @click="this.stampItem($event, items[greatgreat])" type="checkbox">Stamp </div>
                            <img v-show="items[greatgreat].showImage" :src="itemImage(items[greatgreat])">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-frame" @click="currentFormIndex = ''">
          <div class="situation-title">Situation {{ getSituationNumber }}</div>
          <div class="situation-text"> <span v-html="this.getSituationText"></span> </div>

          <div class="right-side-document" v-if="this.currentFormIndex != ''" @click="$event.stopPropagation()">
            <div v-if="this.items[currentFormIndex].type == 'PS FORM 3854' && form3854Back == false">
              <Form3854 
                v-bind:item="items[currentFormIndex]"
                v-bind:studentName="studentName"
                v-bind:studentPG="payGrade"
                @changeForm="changeForm($event, data)"
                :key="formKey"
              />
              <button class="flip-2261" @click="form3854Back = true">Flip</button>
            </div>
          <div v-if="this.items[currentItemIndex].type == 'PS FORM 3854' && form3854Back == true">
            <Form3854Back 
              v-bind:item="items[currentItemIndex]"
              v-bind:studentName="studentName"
              v-bind:studentPG="payGrade"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form3854Back = false">Flip</button>
          </div>
          <div v-if="this.items[currentFormIndex].type == 'PS FORM 3877'" >
            <Form3877 
              v-bind:item="items[currentFormIndex]"
              v-bind:studentName="studentName"
              v-bind:studentPG="payGrade"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          <div v-if="this.items[currentFormIndex].type == 'DD FORM 2261' && form2261Back == false">
            <Form2261 
              v-bind:item="items[currentFormIndex]"
              v-bind:studentName="studentName"
              v-bind:studentPG="payGrade"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form2261Back = true">Flip</button>
          </div>
          <div v-if="this.items[currentFormIndex].type == 'DD FORM 2261' && form2261Back == true">
            <Form2261Back 
              v-bind:item="items[currentFormIndex]"
              v-bind:studentName="studentName"
              v-bind:studentPG="payGrade"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
            <button class="flip-2261" @click="form2261Back = false">Flip</button>
          </div>
          <div v-if="this.items[currentFormIndex].type == 'PS FORM 3883'" class="form-3883">
            <Form3883 
              v-bind:item="items[currentFormIndex]"
              v-bind:studentName="studentName"
              v-bind:studentPG="payGrade"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
          <div v-if="this.items[currentFormIndex].type == 'PS FORM 3849'">
            <Form3849
              v-bind:item="items[currentFormIndex]"
              v-bind:studentName="studentName"
              v-bind:studentPG="payGrade"
              @changeForm="changeForm($event, data)"
              :key="formKey"
            />
          </div>
        </div>
      </div>
    </div>
    <PageNav 
      v-bind:pageErrors="pageErrors"
      @clearForm="currentFormIndex = ''"
    />
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
  import Error from '../components/Error.vue'
  import Delete from '../components/Delete.vue'
  import SectionCompleted from '../components/SectionCompleted.vue'
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
      Form3854Back,
      Error,
      Delete,
      SectionCompleted
    },
    props: [
      'pageNum',
      'changePage'
    ],
    data() {
      return {
        collapsed: false,
        showError: false,
        problemItems: [],
        totalErrors: 0,
        studentName: "Student",
        showPouchCreation: [9],
        showSubmit: [1, 3, 4, 8, 10, 11],
        payGrade: "0",
        error: false,
        answerKey: key,
        items: [
          {
            articleCode: "Placeholder",
            id: 1,
            title: "Placeholder",
            children: [],
            level: 0,
            stampCounter: false,
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
            stampCounter: false,
            stampable: false,
            formInputs: {},
            type: "safe",
            droppable: true,
            gradeAt: [],
          },
          {
            articleCode: "Forms",
            id: 5,
            title: "Forms & Pouches",
            children: [],
            level: 1,
            images: [],
            currentImageIndex: 0,
            stampCounter: false,
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
            stampCounter: false,
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
            stampCounter: false,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 3"
              },
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
          {
            id: 8,
            title: "Incoming Truck 3",
            articleCode: "Truck 3",
            children: [],
            level: 0,
            situationNumber: "Situation 4",
            stampCounter: false,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 4"
              },
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
          {
            id: 9,
            title: "Incoming Truck 4",
            articleCode: "Truck 4",
            children: [],
            level: 0,
            situationNumber: "Situation 4",
            stampCounter: false,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 4"
              },
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
          {
            id: 10,
            title: "Incoming Transfer Bill 5",
            articleCode: "Truck 5",
            children: [],
            level: 0,
            situationNumber: "Situation 4",
            stampCounter: false,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 4"
              },
            type: "Truck",
            droppable: true,
            gradeAt: []
          },
          {
            id: 11,
            title: "Outgoing Truck 6",
            articleCode: "Truck 6",
            children: [],
            level: 0,
            situationNumber: "Situation 5",
            stampCounter: false,
            stampable: false,
            formInputs: {
              situationNumber: "Situation 5"
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
        ],
        currentItemIndex: 2,
        currentFormIndex: '',
        idCounter: 1000,
        draggedItem: {},
        createFormType: "",
        definedSeal: 62345678,
        createdPouch: false,
        situationOneInit: false,
        situationTwoPartOne: false,
        situationTwoPartTwo: false,
        situationThreeInit: false,
        situationFourPartOne: false,
        situationFourPartTwo: false,
        situationFourPartThree: false,
        situationFourPartFour: false,
        situationFivePartOne: false,
        situationFivePartTwo: false,
        formKey: 0,
        form2261Back: false,
        form3854Back: false,
        showCurrentItem: true,
        time: "",
        deleteModalShow: false,
        deletingItem: 0,
        successModalShow: false 
      }   
    },
    mounted() {
      this.updateSituation();
      this.time = this.getNearestTime();
      this.processAnswerKey();
    },
    computed: {
      openPDF() {
        return require('/public/Process_Reg_SHO.pdf');
      },
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
        //Sitution 1
        if(this.pageNum ==  1) {
          //Situation 1
          text = "You are the registry clerk on duty in the registry section at APO AE 09459. You just opened the registry \
          section and verified the items inside the safe against the previous day's inventory. Verify that the following \
          items (RB339 065 331US and RB290 770 790US) are accounted for, and then sign the DD Form 2261 (Section B)."
        }
        //Situation 2 Part 1
        else if(this.pageNum == 2) {
          //Situation 2 Part 1
          text = "1. PFC Terry Jones, the mail guard, arrives at the registry section from the AMT with one registered \
          pouch and two registered outside pieces (OSP's).\
          <br><br>\
          APDS all OSPs. Ensure the correctness of the incoming truck bill and sign. Then move the PS Form 3854 form into \
          the Forms & Pouches section and all of the incoming articles into the Safe."
        }
        //Sitution 2 Part 2
         else if(this.pageNum == 3) {
           //Situation 2 Part 2
          text = "2. You and PFC George Forrest, the witness, open the pouch and located the incoming inside bill. \
          <br><br> \
          APDS all mail pieces. Ensure the correctness of the inside bill and note any discrepancies. Fill out the coupon \
          on the back side of the bill. Then, sign the bill along with the witness. Move the PS Form 3854 form and the \
          empty pouch into the Forms & Pouches section and the associated mail articles into the Safe."
        }
        //Situation 3
        else if(this.pageNum == 4) {
          //Situation 3
          text = `<div>Deliver the following mail using the appropriate PS Forms. Create a PS Form 3849 for each personal \
          article and or a PS Form 3883 for each official article, then attach the article to its form. Each form and its attached article go into the outgoing truck.</div><br>\
          RB 298 302 613 US , RB 339 065 331 US , RB 290 770 790 US , RB 309 266 140 US , RB 218 344 488 US , RB 143 899 161 US , RB 867 092 744 US , RB 102 022 763 US\
          <br><br>
          Use the following Last Bill Numbers for the PS Form 3883s:<br><br>
          <div  style="position: relative; left:32vw; transform: translateX(-50%);" class=sit3chart style="text-align:center;"> <table><tr><th>UNIT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>LAST BILL # USED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>UNIT MAIL CLERK</th></tr>\
          <tr><th>14th ADMIN CO</th><th>183</th><th>SGT EARL SMITH</th></tr>\
          <tr><th>13th EOC</th><th>101</th><th>PFC JOHN THOMPSON</th></tr>\
          <tr><th>11th ENGR DET</th><th>182</th><th>SPC RONNIE CARTER</th></tr>\
          <tr><th>45TH MP CO</th><th>195</th><th>SGT JERRY JOHNSON</th></tr></table><div>`

        }
        //Situation 4 Part 1
        else if(this.pageNum == 5) {
          text = "1. PFC Terry Jones, the mail guard, arrives at the registry section from Unit 2 with a pouch and one OSP \
          to dispatch to the AMT serving you area. Check the incoming truck bill, APDS and sign it. Move the extra OSP to \
          the Safe and the truck bill to the Forms & Pouches section."         
        }
        //Situation 4 Part 2
        else if(this.pageNum == 6) {
          text = "2. You and PFC George Forrest, the witness, open the pouch received from Unit 2. Check the incoming \
          inside bill, and then sign bill with witness. Move all mail to safe and move the inside bill to Forms & Pouches."
        }
        //Situation 4 Part 3
        else if(this.pageNum == 7) {
          text = "3. SGT Jerry Johnson (the 45th MP CO mail clerk) arrives at the registry section with the items listed \
          on the PS Form 3877. Ensure the correctness of the PS Form 3877 and sign. Move articles to safe and the PS Form \
          3877 to Forms & Pouches."
        }
        //Situation 4 Part 4
        else if(this.pageNum == 8) {
          text = "4. NOTE: Incoming Truck 5 should be Incoming Transfer Bill 5\
          <br><br>\
          SPC Turner, who works at the finance window, comes to the registry section with the items listed on the transfer \
          bill. APDS all items, and ensure correctness of the transfer bill (PS Form 3877). Sign the bill and move to Forms \
          & Pouches, move all mail items to Safe."
        }
        //Situation 5 Part 1
        else if(this.pageNum == 9) {
          text = "The registry section is now closed. PFC Terry Jones, the mail guard has arrived at your location and is \
          waiting for the outgoing registered mail.\
          <br><br> \
          Create a PS Form 3854 for dispatching all pouchable outgoing registered mail to AMF Kennedy, NY 00300. Put this \
          outgoing inside bill and its associated mail items into a new pouch, and move it into the Safe. "
        }
        //Situation 5 Part 2
        else if(this.pageNum == 10) {
          text = "Prepare the necessary documentation to dispatch all outgoing registered mail (pouches and OSPs) to the \
          AMT that services your post office.\
          <br><br> \
          Dispatch these items via the Outgoing Truck."
        }
        //Situation 6
        else if(this.pageNum == 11) {
          text = "Prepare a DD Form 2261 (Registered Mail Balance and Inventory) to account for all registered mail \
          received, delivered, dispatched, and mail that is still on hand and has not been delivered. Move this form to \
          the Forms & Pouches section."
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
      collapseItem(item){
        if(item.collapsed == false || item.collapsed == undefined){
          item.collapsed = true
        }
        else{
          item.collapsed = false
        }
      },
      popOut(url) {
        var height = window.screen.height;
        var width = this.calculateNewWidth();
        window.open(url, '_blank', `location=yes,height=${height},width=${width}`);
      },
      calculateNewWidth(){
        var newWidth = window.screen.width * .6;
        return newWidth;
    },
      startDrag (evt, item)  {
        evt.dataTransfer.dropEffect = 'move'
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData('itemID', item.id)
        evt.dataTransfer.setData('parentID', this.findParent(item.id))
        evt.stopPropagation()
      },
      //"stamp items"
      stampItem(evt, item) {
        item.stampCounter = true;
        evt.stopPropagation()
      },
      onDrop (evt, destination) {
        const draggedID = evt.dataTransfer.getData('itemID')
        const prevParentID = evt.dataTransfer.getData('parentID')
        let childrenIndexes = this.getChildrenIndexes(draggedID)
        if(this.items[this.getItemIndex(destination)].level < 5){
          if(childrenIndexes.indexOf(this.getItemIndex(this.findParent(destination))) == -1){
            if(this.items[this.getItemIndex(destination)].type != "Letter"){
              if(this.items[this.getItemIndex(destination)].type != "Package"){
                if(this.isDroppable(destination)){
                  if(draggedID != destination){
                    if(childrenIndexes.indexOf(this.getItemIndex(destination)) == -1){
                      this.removeItemOnDrop(draggedID,prevParentID)
                      this.items[this.getItemIndex(draggedID)].level = this.items[this.getItemIndex(destination)].level + 1
                      this.items[this.getItemIndex(destination)].children.push(this.items[this.getItemIndex(draggedID)].id)
                    }
                  }
                }
              }
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
      //starts the deletion process
      startDelete(evt, item){
        this.deleteModalShow = true
        this.deletingItem = item
        evt.stopPropagation()
      },
      //removes an item given it's id
      deleteItem(item) {
        //console.log("Delete item:", item)
        if(this.items[this.currentFormIndex] == item){
          this.currentFormIndex = ""
        }
        let parent = this.findParent(item.id)
        parent = this.findItemByID(parent)[0]
        for(let i=0; i < item.children.length; i++){
          this.items[this.getItemIndex(item.children[i])].level--
        }
        parent.children = parent.children.concat(item.children)
        item.children = []
        item.gradeAt = []
        //remove id from parent's children array
        parent.children = parent.children.filter(x => x != item.id)
        //NOTE:Filtering the item from this.items causes errors with anything to do with currentItem
        let itemIndex = this.getItemIndex(item.id)
        this.items[itemIndex].id = undefined
        this.items[itemIndex].showImage = false
        console.log("'deleted'")
        console.log(this.items)
        this.deleteModalShow = false
        // evt.stopPropagation()
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

      createPouch() {
        if(!this.createdPouch) {
          this.createItem('pouch', this.definedSeal, this.getSituationNumber, 2, true, 'Bag-1', undefined, this.updateGradeAt(), false);
          this.createdPouch = true;
        }
      },
      //record current item index and update current form index when needed
      changeCurrentItem (evt, id) {
          this.currentItemIndex = this.getItemIndex(id)
          if(this.items[this.currentItemIndex].type.indexOf("FORM") !== -1) {
            if(this.currentItemIndex == this.currentFormIndex){
              this.currentFormIndex = ''
            }
            else{
              this.currentFormIndex = this.currentItemIndex;
            }
          }
        evt.stopPropagation()
      },
      //toggles the item to display or hide it's image
      toggleItemImage(item) {
        item.showImage = !item.showImage;
      },
      /*creates a new item given information:
      ['string'] type of item, ['string'] unique article identifer, ['int'] situation number, ['int'] level, ['boolean'] default item creation behavior, ['string'] image code, ['object'] form settings,
      ['array'] list of situations to grade the article, ['boolean'] was the item created by the user

      NOTE: Default item creation causes forms to be added to the forms section, and all other things to be added to the safe.
      You would want to disable default behavior if you planned to add the item to another item's children array for example.
      */
      createItem(itemType, articleCode, situationNumber, level, defaultCreate, imageCode, formSettings, gradeAt, created) {
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
            stampCounter: false,
            stampable: false,
            gradeAt: gradeAt,
            created: created,
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
          if(articleCode == "created"){
            newItem.userCreated= true
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
            stampCounter: false,
            stampable: false,
            gradeAt: gradeAt,
            created: created,
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
          if(articleCode == "created"){
            newItem.userCreated= true
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
            stampCounter: false,
            stampable: false,
            gradeAt: gradeAt,
            created: created,
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

          if(formSettings != undefined) {
            newItem.formInputs = {...newItem.formInputs, ...formSettings}
          }
          if(articleCode == "created"){
            newItem.userCreated= true
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
            stampCounter: false,
            stampable: false,
            gradeAt: gradeAt,
            created: created,
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
          if(articleCode == "created"){
            newItem.userCreated= true
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
            stampCounter: false,
            stampable: false,
            gradeAt: gradeAt,
            created: created,
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
              address:"",
              bill:""
            },
            type: "PS FORM 3883",
            droppable: true
          }

          if(formSettings != undefined) {
            newItem.formInputs = {...newItem.formInputs, ...formSettings}
          }
          if(articleCode == "created"){
            newItem.userCreated= true
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
            stampCounter: false,
            formInputs: {},
            type: "Letter",
            droppable: true,
            gradeAt: gradeAt,
            created: created,
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
            stampCounter: false,
            formInputs: {},
            type: "Package",
            droppable: true,
            showImage: false,
            gradeAt: gradeAt,
            created: created,
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
            stampCounter: false,
            formInputs: {},
            type: "Pouch",
            droppable: true,
            gradeAt: gradeAt,
            created: created,
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
        this.formKey++
        this.currentFormIndex = this.getItemIndex(newItem.id)
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
        this.currentFormIndex = ''
        this.gradeSituationContents();
      },
      //Returns an item given it's ID
      findItemByID(id){
        return this.items.filter(x => x.id == id);
      },
      //Creates an array with current and all future situation numbers so that a user created item can be graded at every point it exists
      //NOTE: CREATED ITEMS'S LOCATIONS WILL BE GRADED AT EVERY SITUATION TO SIMPLIFY THE ISSUE OF UPDATING THEM ON CREATE
      updateGradeAt() {
        let newGradeAt = [];
        for(let i = this.getSituationNumber; i <= 6; i++) {
          newGradeAt.push(i);
        }
        return newGradeAt;
      },
      /*Accepts an item and its corresponding key item and checks to see if the item is in the correct location
      returns 0 if it's correct or 1 if it's incorrect
      */
      checkItemLocation(item, keyItem) {
        console.log("checking location!")
        let parentID = this.findParent(item.id)
        let location = this.findItemByID(parentID)[0].articleCode
        if(location == keyItem[`situation${this.getSituationNumber}Location`]) {
          // console.log(keyItem.articleCode, "is in the right spot")
          return 0;
        }
        else {
          // console.log("ERROR:", keyItem.articleCode, "is in the wrong spot")
          return 1;
        }
      },
      /*Accepts an item and and returns the number of errors it has
      NOTE: Grading of forms takes place in gradeForm() since it's much more complex then other items
      NOTE 2: At the time this is called, we assume that there is a match between the item and the answer key
      */
      gradeItem(item, keyItem) {
        // console.log("gradeItem got:", item)
        let itemType = item.type;
        switch(itemType) {
            case "Package": {
              console.log("Its a package")
              let errors = this.checkItemLocation(item, keyItem);
              if(item.stampCounter != true) {
                errors++;
              }
              return errors;
            }
            case "Letter": {
              console.log("Its a letter")
              let errors = this.checkItemLocation(item, keyItem);
              if(item.stampCounter != true) {
                errors++;
              }
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
              else if(itemType == "PS FORM 3854") {
                // console.log(item.articleCode, keyItem, item.type)
                errors += this.checkItemLocation(item, keyItem)
                errors += this.gradeForm(item.articleCode, keyItem, item.type)
                return errors
              }
              else if(itemType == "PS FORM 3883") {
                  console.log("Its a PS FORM 3883")
                  errors += this.checkItemLocation(item, keyItem)
                  errors += this.gradeForm(item.articleCode, keyItem, item.type)
                  return errors
              }
              else if (itemType == "PS FORM 3849"){
                console.log("Its a PS FORM 3849")
                  errors += this.checkItemLocation(item, keyItem)
                  errors += this.gradeForm(item.articleCode, keyItem, item.type)
                  return errors
              }
              else if(itemType == "PS FORM 3877") {
                console.log("PS FORM 3877")
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
          let situationItems = this.getGradingItemList;
          this.problemItems = []
          //Update any created items article code to the form input article code
          for(let i = 0; i < situationItems.length; i++) {
            if(situationItems[i].userCreated == true) {
              //situationItems[i].articleCode = situationItems[i].formInputs.articleCode;
            }
          }
          console.log("in grade situation", situationItems)
          let keyItems = this.answerKey.answers.filter(x => x.gradeAt.includes(this.getSituationNumber))

          keyItems.forEach((currentKeyItem) => {

            //check to see if our filtered key list contains a matching article code
            let currentItem = situationItems.filter(x => 
              x.articleCode == currentKeyItem.articleCode
            )
            
            if(currentItem[0] != undefined) {
              console.log("situationItems",situationItems.length)
              let itemErrors = this.gradeItem(currentItem[0], currentKeyItem);
              console.log("itemErrors",itemErrors)
              
              //if there are no errors, remove item from both arrays
              if(itemErrors == 0) {
                situationItems = situationItems.filter(x => 
                  x.articleCode != currentItem[0].articleCode
                  )
                keyItems = keyItems.filter(x => 
                  x.articleCode != currentItem[0].articleCode
                  )
              }
              else{
                errors++
              }   
            }
          })
          //If there are no errors, unlock the navigation arrow
          if(errors == 0) {
            this.pageErrors[this.getSituationNumber-1] = false;
            this.$emit('errorChange', this.pageErrors)
            this.successModalShow = true
          }
          else{
            console.log("**************ERRORS**************",errors)
            //console.log(situationItems[0].type)
            for(let i = 0; i < situationItems.length; i++){
              //console.log(situationItems[i])
              let newItem = {
                type: situationItems[i].type,
                detail: situationItems[i].articleCode
              }
              this.problemItems.push(newItem)
            }
            for(let i = 0; i < keyItems.length; i++){
              if(!this.problemItems.some(e => e.detail === keyItems[i].articleCode)){
                let newItem = {
                  type: keyItems[i].type,
                  detail: keyItems[i].articleCode
                }
                this.problemItems.push(newItem)
              }
            }
            this.totalErrors = this.problemItems.length
            this.showError = true
          }
        console.log(this.problemItems.length)
      },
      gradeForm(articleCode, keyForm, formCode) {
        let userForm = this.items[this.getItemByArticleCode(articleCode)].formInputs
        if(formCode == "DD FORM 2261") {
          let errors = 0;
          let sectionC = []
          for(let property in keyForm){
            if(property.includes("sectionC") && keyForm[property] != ""){
              sectionC.push(keyForm[property])
            }
          }
          for (let property in keyForm) {
            if(property.includes("sectionC") && keyForm[property] != ""){
              if(!sectionC.includes(userForm[property])){
                errors++;
              }
            }
            else if(userForm[property] != keyForm[property] && property != "items" && property != "gradeAt" && !property.includes("Location")) {
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
        else if(formCode == "PS FORM 3854") {
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
                    if(keyForm.itemOrigins[i] != undefined) {
                      let keyItem = {left: keyForm.itemNums[i], right: keyForm.itemOrigins[i]}
                      keyPairs.push(keyItem);
                    }
                  }
                  console.log("+++++HERE+++++",keyPairs)
                  //second pass to see if the items are in the wrong order
                  for(let i = 1; i < userForm.itemNums.length; i++) {
                    for(let j = 0; j < keyPairs.length; j++) {
                      //If left column item should have a match
                      if(userForm.itemNums[i] == keyPairs[j].left) {
                        //If the right hand column item is defined at the current index
                        if(keyPairs[j].right == undefined || keyPairs[j].right == ""){
                          //console.log("User Form: ", userForm.itemOrigins[i], "Key Pair: ", keyPairs[j].right)
                          if(userForm.itemOrigins[i] != undefined){
                            if(userForm.itemOrigins[i] != ""){
                              console.log("ERROR")
                              errors++
                              break
                            }
                          }
                        }
                        else{
                          if(userForm.itemOrigins[i] != keyPairs[j].right) {
                            errors++
                            console.log("mismatch:", userForm.itemOrigins[i],  keyPairs[j].right)
                            break
                          }
                        }
                      }
                    }
                  }

                }
              } // end itemOrigins processing
              else if(property == "itemNums"){
                //Make sure all entries are correct
                  let keyItems = keyForm.itemNums;
                  let userItems = userForm.itemNums;
                  if(userItems.length != keyItems.length){
                    console.log(userItems.length, keyItems.length)
                    errors++
                  }
                  console.log("Key Items: ",keyItems)
                  for(let i = 0; i < userItems.length; i++){
                    if(!keyItems.includes(userItems[i]) && userItems[i] != undefined){
                      console.log(userItems[i])
                      errors++
                    }
                  }
              }
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
              if(property === "type" || property.includes("Location")){
                // console.log("hello")
              }
              else{
                console.log("prop:", property, `${userForm[property]}`, '!=', `${keyForm[property]}`)
                errors++;
              }
            }
          }
          // console.log(keyPairs)
          return errors;
        }
        else if(formCode == "PS FORM 3883") {
          let errors = 0
          console.log("Its a 3883!")

          for (let property in keyForm) {
            // console.log(property)
            if(Array.isArray(keyForm[property])) {

              if(property == "article") {
                if(keyForm.article.length > 1) {
                  for(let i = 1; i < keyForm.article.length; i++) {
                    if(!keyForm[property].includes(userForm[property][i])) {
                      console.log("It doesnt match")
                      errors++;
                    }
                  }
                }
              }

            }
            //Property is not an array, and is incorrect
            else if(userForm[property] != keyForm[property] && !property.includes("Location") && !property == "type") {
              console.log("prop:", property, `${userForm[property]}`, '!=', `${keyForm[property]}`)
              errors++;
            }
          }

          return errors
        }
        else if(formCode == "PS FORM 3849"){
          let errors = 0
          console.log("Its a 3849")
          for(let property in keyForm){
            if(userForm[property] != keyForm[property] && property != "gradeAt" && !property.includes("Location") && !property == "type") {
              console.log(`${userForm[property]}`, '!=', `${keyForm[property]}`)
              errors++;
            }
          }
          return errors
        }
        else if(formCode == "PS FORM 3877") {
          let errors = 0;
          console.log("Attempting to grade a 3877!")
          for(let property in keyForm){
             if(!Array.isArray(keyForm[property])) {
               if(userForm[property] != keyForm[property] && property != "gradeAt" && property != "square" && !property.includes("Location") && !property == "type") {
                console.log(property, `${userForm[property]}`, '!=', `${keyForm[property]}`)
                errors++;
              }
            }
          }
          return errors;

        }
      },
      //Returns the index of an item given it's article code
      getItemByArticleCode(code) {
        let index = this.items.findIndex(item => item.articleCode == code)
        console.log("getItemByArticleCode:", index);
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
         ].join('-');
      },
      //gets the nearest time and sets in in the answer key
      getNearestTime(){
        let currentTime
        this.answerKey.answers.forEach(obj => {
          let d = new Date()
          let hours = d.getHours()
          let minutes = d.getMinutes()
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
            if(obj[property] == "Current time"){
              obj[property] = currentTime;
              //console.log(obj[property])
            }
          }
        })
        return currentTime
      },
      //function that handles events as the situation is changed
      updateSituation() {
        if(this.getSituationNumber == 1) {

          //hardcode truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;
            this.items[5].level = 0;
            this.items[6].level = 0;
            this.items[7].level = 0;
            this.items[8].level = 0;

          if(!this.situationOneInit){

            let newFormSettings = {
              apoNum: "APO AE 09459",
                from: this.getYYYYMMDD(-1),
                to: this.getYYYYMMDD(-1),
                items: ["RB339065331US", "RB290770790US"],
                totalItems9thru14: 15,
                itemsOnHandAtEnd: 2,
                numberOfPouchesOpened: 1,
                itemsOnOutgoingTruck: 0,
                itemsOnOutgoingManifests: 0,
                itemsListedOnInsideBillsB: 3,
                itemsDelivered: 9,
                total1thru7: 15,
                itemsRecievedFromOther: 1,
                numberOfPouchesClosed: 1,
                itemsOnIncomingTruck: 1,
                itemsOnIncomingManifests: 0,
                itemsListedOnInsideBillsA: 1,
                itemsAccepted: 1,
                itemsAtStart: 10,
            }

            let yest = this.getYYYYMMDD(-1)
            this.createItem('ddform2261', yest, 1, 2, true, '', newFormSettings, [1, 6], false)
            let package1 = this.createItem('package', 'RB 339 065 331 US', 1, 2, true, '331', undefined, [1, 3], false)
            let letter1 = this.createItem('letter', 'RB 290 770 790 US', 1, 2, true, '790', undefined, [1, 3], false)
            package1 = this.findItemByID(package1)[0]
            letter1 = this.findItemByID(letter1)[0]
            package1 = this.getItemByArticleCode(package1.articleCode)
            letter1 = this.getItemByArticleCode(letter1.articleCode)
            this.items[package1].stampCounter = true;
            this.items[letter1].stampCounter = true;
            console.log(this.items[package1])
            console.log(this.items[letter1])
          }
          this.situationOneInit = true;
        }
        else if(this.getSituationNumber == 2) {

          //hardcode all truck visibility
          this.items[3].level = 1;
          this.items[4].level = 0;
          this.items[5].level = 0;
          this.items[6].level = 0;
          this.items[7].level = 0;
          this.items[8].level = 0;

          if(this.pageNum == 2 && !this.situationTwoPartOne) {
            
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
            let form1 = this.createItem('psform3854', '260', 2, 2, false, '', newFormSettings, [2], false)
            this.assignItemToParent('Truck 1', form1)
            let item1 = this.createItem('pouch', '70948511', 2, 2, false, 'Bag-1', undefined, [], false)
            this.assignItemToParent('Bill #260', item1)
            let item2 = this.createItem('package', 'RB 102 022 763 US', 2, 2, false, '763', undefined, [2, 3], false)
            this.assignItemToParent('Bill #260', item2)
            let item3 = this.createItem('package', 'RB 298 302 613 US', 2, 2, false, '613', undefined, [2, 3], false)
            this.assignItemToParent('Bill #260', item3)
            console.log(this.items)

            //42 - 47
            this.situationTwoPartOne = true;
          }
          else if(this.pageNum == 3) {
            //hardcode all truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;
            this.items[5].level = 0;
            this.items[6].level = 0;
            this.items[7].level = 0;
            this.items[8].level = 0;

            if(!this.situationTwoPartTwo) {
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
            
            let item1 = this.createItem('psform3854', '231', 2, 3, false, '', newFormSettings, [2], false)
            this.assignItemToParent('SEAL #70948511', item1)
            let item2 = this.createItem('letter', 'RB 867 092 744 US', 2, 3, false, '744', undefined, [2, 3], false)
            this.assignItemToParent('SEAL #70948511', item2)
            let item3 = this.createItem('letter', 'RB 309 266 140 US', 2, 3, false, '140', undefined, [2, 3], false)
            this.assignItemToParent('SEAL #70948511', item3)
            let item4 = this.createItem('letter', 'RB 143 899 161 US', 2, 3, false, '161', undefined, [2, 3], false)
            this.assignItemToParent('SEAL #70948511', item4)
            let item5 = this.createItem('letter', 'RB 218 344 488 US', 2, 3, false, '488', undefined, [2, 3], false)
            this.assignItemToParent('SEAL #70948511', item5)
            let item6 = this.createItem('letter', 'RB 888 122 361 US', 2, 3, false, '361', undefined, [2, 3, 5], false)
            this.assignItemToParent('SEAL #70948511', item6)
            //34-41
            this.situationTwoPartTwo = true;
            }
          }
          
        }
        else if(this.getSituationNumber == 3) {

          //hardcode all truck visibility
          this.items[3].level = 0;
          this.items[4].level = 1;
          this.items[5].level = 0;
          this.items[6].level = 0;
          this.items[7].level = 0;
          this.items[8].level = 0;

          if(!this.situationThreeInit) {
            this.situationThreeInit = true;
          }
        }

        else if(this.getSituationNumber == 4) {

          if(this.pageNum == 5) {
          //hardcode truck visibility
          this.items[3].level = 0;
          this.items[4].level = 0;
          this.items[5].level = 1;
          this.items[6].level = 0;
          this.items[7].level = 0;
          this.items[8].level = 0;

            if(!this.situationFourPartOne) {
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

            let form1 = this.createItem('psform3854', '30', 4, 2, false, '', newFormSettings, [4], false)
            this.assignItemToParent('Truck 3', form1)
            let item1 = this.createItem('pouch', '43000277', 4, 2, false, 'Bag-1', undefined, [], false)
            this.assignItemToParent('Bill #30', item1)
            let item2 = this.createItem('package', 'RB 300 911 759 US', 4, 2, false, '759', undefined, [4, 5], false)
            this.assignItemToParent('Bill #30', item2)
            //30-33
            this.situationFourPartOne = true;
            }

          }
          else if(this.pageNum == 6) {

            //hardcode truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;
            this.items[5].level = 0;
            this.items[6].level = 0;
            this.items[7].level = 0;
            this.items[8].level = 0;

            if(!this.situationFourPartTwo){

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

            let item1 = this.createItem('psform3854', '24', 4, 3, false, '', newFormSettings, [4], false)
            this.assignItemToParent('SEAL #43000277', item1)
            let item2 = this.createItem('letter', 'RB 300 911 755 US', 4, 3, false, '755', undefined, [4, 5], false)
            this.assignItemToParent('SEAL #43000277', item2)
            let item3 = this.createItem('letter', 'RB 300 911 756 US', 4, 3, false, '756', undefined, [4, 5], false)
            this.assignItemToParent('SEAL #43000277', item3)
            let item4 = this.createItem('letter', 'RB 300 911 757 US', 4, 3, false, '757', undefined, [4, 5], false)
            this.assignItemToParent('SEAL #43000277', item4)
            let item5 = this.createItem('package', 'RB 300 911 758 US', 4, 3, false, '758', undefined, [4, 5], false)
            this.assignItemToParent('SEAL #43000277', item5)
            let item6 = this.createItem('letter', 'RB 300 911 760 US', 4, 3, false, '760', undefined, [4, 5], false)
            this.assignItemToParent('SEAL #43000277', item6)
            let item7 = this.createItem('package', 'RB 300 911 761 US', 4, 3, false, '761', undefined, [4, 5], false)
            this.assignItemToParent('SEAL #43000277', item7)
            //22-29
            this.situationFourPartTwo = true;

            }
            
          }
          else if(this.pageNum == 7) {

            //hardcode truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;
            this.items[5].level = 0;
            this.items[6].level = 1;
            this.items[7].level = 0;
            this.items[8].level = 0;

            if(!this.situationFourPartThree) {
              let newFormSettings = {
                senderAddress: "45th MP CO APO AE 09459",
                registeredMail: true,
                trackingNum1: "RB842320438US",
                trackingNum2: "RB842320439US",
                trackingTextInput1: "HQ CAC FT KNOX, KY 40121",
                trackingTextInput2: "545 MP CO FORT JACKSON, SC 29207",
                piecesSent: "2",
                rows:["0.87", "9.50", "N/A", "", "", "", "", "", "", "", "", "", "",
                      "1.83", "9.50", "N/A"],
                stamped: false
            }

            let form1 = this.createItem('psform3877', '48', 4, 2, false, '', newFormSettings, [4], false)
            this.assignItemToParent('Truck 4', form1)
            let item1 = this.createItem('letter', 'RB 842 320 438 US', 4, 2, false, '438', undefined, [4, 5], false)
            this.assignItemToParent('48', item1)
            let item2 = this.createItem('letter', 'RB 842 320 439 US', 4, 2, false, '439', undefined, [4, 5], false)
            this.assignItemToParent('48', item2)
            //18-21
            this.situationFourPartThree = true;
            }

          }
          else if(this.pageNum == 8) {

            //hardcode truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;
            this.items[5].level = 0;
            this.items[6].level = 0;
            this.items[7].level = 1;
            this.items[8].level = 0;

            if(!this.situationFourPartFour) {
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

            let form1 = this.createItem('psform3854', '33', 4, 2, false, '', newFormSettings, [4], false)
            this.assignItemToParent('Truck 5', form1)
            let item1 = this.createItem('letter', 'RB 707 092 210 US', 4, 2, false, '210', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item1)
            let item2 = this.createItem('package', 'RB 707 092 211 US', 4, 2, false, '211', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item2)
            let item3 = this.createItem('letter', 'RB 707 092 212 US', 4, 2, false, '212', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item3)
            let item4 = this.createItem('letter', 'RB 707 092 213 US', 4, 2, false, '213', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item4)
            let item5 = this.createItem('letter', 'RB 707 092 214 US', 4, 2, false, '214', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item5)
            let item6 = this.createItem('package', 'RB 707 092 215 US', 4, 2, false, '215', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item6)
            let item7 = this.createItem('letter', 'RB 707 092 216 US', 4, 2, false, '216', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item7)
            let item8 = this.createItem('letter', 'RB 707 092 217 US', 4, 2, false, '217', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item8)
            let item9 = this.createItem('letter', 'RB 707 092 218 US', 4, 2, false, '218', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item9)
            let item10 = this.createItem('letter', 'RB 707 092 219 US', 4, 2, false, '219', undefined, [4, 5], false)
            this.assignItemToParent('Bill #33', item10)
            //6-17
            this.situationFourPartFour = true;
            }


          }
        }
        else if(this.getSituationNumber == 5) {

          if(this.pageNum == 9) {

            //hardcode truck visibility
            this.items[3].level = 0;
            this.items[4].level = 0;
            this.items[5].level = 0;
            this.items[6].level = 0;
            this.items[7].level = 0;
            this.items[8].level = 1;

            if(!this.situationFivePartOne) {
              this.situationFivePartOne = true;
            }

          }
        }
        else if(this.getSituationNumber == 6) {
          //hardcode truck visibility
          this.items[3].level = 0;
          this.items[4].level = 0;
          this.items[5].level = 0;
          this.items[6].level = 0;
          this.items[7].level = 0;
          this.items[8].level = 0;

          //Add all bills that left to forms/pouches

          //Determine what getItemByArticleCode actually returns


          let form1 = this.getItemByArticleCode("SGT Ronald Cain")
          this.items[2].children.push(this.items[form1].id)
          let form2 = this.getItemByArticleCode("PFC Carl Thompson")
          this.items[2].children.push(this.items[form2].id)
          let form3 = this.getItemByArticleCode("SSG Donald Green")
          this.items[2].children.push(this.items[form3].id)
          let form4 = this.getItemByArticleCode("SGM Mary Fulton")
          this.items[2].children.push(this.items[form4].id)
          let form5 = this.getItemByArticleCode("Bill #102")
          this.items[2].children.push(this.items[form5].id)
          let form6 = this.getItemByArticleCode("Bill #196")
          this.items[2].children.push(this.items[form6].id)
          let form7 = this.getItemByArticleCode("Bill #184")
          this.items[2].children.push(this.items[form7].id)
          let form8 = this.getItemByArticleCode("Bill #129") 
          this.items[2].children.push(this.items[form8].id)
          let form9 = this.getItemByArticleCode("Bill #144")
          this.items[2].children.push(this.items[form9].id)

          console.log("Added all bills that left on trucks:", this.items);

        }

      },
      changeForm(newForm){
          this.items[this.currentFormIndex].formInputs = newForm;
          this.items[this.currentFormIndex].articleCode = newForm.articleCode
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
      },
      changePage: function () {
        this.currentFormIndex = ''
      }
    }      
  }
</script>

<style scoped>
  

  .frame{
    position: relative;
    top: 10vh;
    left: 0;
    width: 100vw;
    height: 90vh;
    z-index: 1;
  }
  .drop-zone {
    padding: 10%;
    order: 1;
    background-color: #333366;
    width: 30vw;
    height: 65vh;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
  .left-frame{
    position: relative;
    top: 2vh;
    left: 2vw;
    width: 36vw;
    height: 90vh;
  }
  .right-frame{
    position: absolute;
    top: 5vw;
    right: 2vw;
    width: 56vw;
    height: 80vh;
    /* background-color: coral; */
  }
  .parent-level {
    position: relative;
    background-color: #D5D5D5;
    width: 27vw;
    margin-bottom: 1.5vh;
    padding: 22px;
    color: #42426A;
    border-radius: 2vw;
    font-size: 2.2vmin;
    z-index: 1;
  }
  .bold{
    font-weight: bold;
  }
  .child-level {
    margin-bottom: 10px;
    padding: 5px;
    color: #D5D5D5;
    z-index: 2;
    font-size: 1vw;
    max-width: 20.4vw;
  }
  .grand-child-level {
    position:relative;
    left: 3vw;
    max-width: 20.4vw;;
    padding: 5px;
    color: #D5D5D5;
    z-index: 2;
    font-size: 1vw;
    margin-bottom: 10px;

  }
  .great-grand-level {
    position:relative;
    left: 3vw;
    max-width: 20.4vw;;
    padding: 5px;
    color: #D5D5D5;
    z-index: 2;
    font-size: 1vw;
    margin-bottom: 10px;

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

  .page-submit-button {
    background-color: #D5D5D5;
    color: #32334B;
    border-radius: 5px;
    padding: .5vw;
    position: absolute;
    transform: translateY(50%);
    top: 1vw;
    right: 2vw;
    z-index: 2;
    font-size: 1vw;
    font-weight: bold;
    letter-spacing: .5vw;
    cursor: pointer;
  }
  .page-submit-button:hover {
    background-color: #32334B;
    color: #D5D5D5;
  }
  .letter{
    pointer-events: none;
  }
  .situation-text {
    max-width: 39vw;
    text-align: center;
  }
  .form-creation,.pouch-creation{
    font-weight: bold;
    letter-spacing: .5vw;
    font-size: 1vw;
    position: absolute;
    left: 6.5vw;
    z-index: 3;
    color: #32334B;
    border-radius: 5px;
  }
  .form-creation{
    transform: translateY(-50%);
    bottom: .5vw;
  }
  .pouch-creation {
    transform: translateY(-50%);
    bottom: .5vw;
    left: 40vw;
  }
  .creation-button{
    font-size: 1vw;
    font-weight: bold;
    letter-spacing: .5vw;
    background-color: #D5D5D5;
    color: #32334B;
    border-radius: .5vw;
    padding: .5vw;
    cursor: pointer;
  }
  .creation-button:hover{
    background-color: #32334B;
    color: #D5D5D5;
  }
    .creation-dropdown{
    font-size: 1vw;
    background-color: white;
    color: #32334B;
    padding: .5vw;
    margin-left: .5vw;
    border-radius: .5vw;
  }
  .sho{
    position: absolute;
    transform: translateY(-50%);
    bottom: .5vw;
    right: 15vw;
    z-index:100;
    cursor: pointer;
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
    border-radius: .8vw;
    margin-top: 0.15vw;
    cursor: grab;

  }
  .grand-child-content {
    background-color: #42426A;
    border-radius: .8vw;
    margin-top: 0.15vw;
    cursor: grab;

  }
  .great-grand-content {
    background-color: #42426A;
    border-radius: .8vw;
    margin-top: 0.15vw;
    cursor: grab;

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
  .great-grand-text{
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
    position: absolute;
    top: 4vw;
    font-size: 1.2vw;
    left: 50%;
    transform: translateX(-50%);
    min-width: 50vw;
  }
  .situation-title {
    position: absolute;
    top: 1vw;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.8vw;
    font-weight: bold;
  }
  .scroll-zone-up {
    position:absolute;
    z-index: 40;
    top: 10vh;
    width: 90vw;
    height:2vh;
    background-color: transparent;
  }
  .scroll-zone-down {
    position:absolute;
    z-index: 40;
    height:2vh;
    top: 90vh;
    width: 80vw;
    background-color: transparent;
  }
  .flip-2261{
    z-index: 2;
    position: absolute;
    right:4%;
    bottom:0%;
    height:5%;
    width: 5%;
  }
  .delete-button {
    position: relative;
    bottom: 1vw;
    left: 14vw;
  }
  .right-side-document {
    box-shadow: 1px 5px 5px black;
    position: absolute;
    top: 0vh;
    left: 50%;
    transform: translateY(-5%) translateX(-50%);
    max-width: 60vw;
    max-height: 75vh;
    overflow: scroll;
  }
</style>