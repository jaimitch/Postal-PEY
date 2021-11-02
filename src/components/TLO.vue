<template>
<div v-show="show">
  <div class="modal-backdrop">
    <div v-if="modalPage == 1" class="modal">
          <div class="gold">
            <span class="tlo-title">Interservice Postal Training Activity<br>
            Lesson #CJAF5216<br>
            Practical Exercise - X</span><br><br>
            <div class="tlo-text">
              OBJECTIVE:  This practical exercise is designed to prepare you for the Registered Mail performance test.<br><br>
              CONDITIONS:  Given the following:<br>
              Incoming Registered Mail Articles<br>
              Blank PS Forms 3849, Delivery Notice/Reminder/Receipt<br>
              PS Form 3854, Manifold Registry Dispatch Book (Incoming and Outgoing Bills)<br>
              PS Form 3877, Firm Mailing Book for Accountable Mail<br>
              PS Form 3883, Firm Delivery Book for Accountable Mail<br>
              DD Form 2261, Registered Mail Balance and Inventory<br>
              Previous Day’s Registered Mail Inventory<br>
              Blank strip label<br>
              Registered tin band seals<br>
              All Purpose Dating Stamp (APDS)<br>
              Standard office supplies (carbon paper, scissors, stapler and stamp pad)<br><br>
              REQUIREMENTS:  The student will:<br>
              Receipt for Registered Mail<br>
              Notify dispatching office of discrepancies found on dispatch bills<br>
              Deliver personal registered mail on PS Form 3849<br>
              Deliver official registered mail on PS Form 3883<br>
              Dispatch registered mail<br>
              Prepare DD Form 2261 to close Registry Section at the end of the business day<br><br>
            </div>
            <button class="modal-button" @click="modalPage = 2">NEXT</button>
          </div>
    </div>
    <div v-if="modalPage == 2" class="modal">

          <div class="gold">
            <span class="tlo-title">Interservice Postal Training Activity<br>
            Lesson #CJAF5216<br>
            Practical Exercise - X</span><br><br>
            <div class="tlo-text">
              INSTRUCTIONS:<br><br>
              Ensure that your name and the date are on the exercise booklet.<br>
              This booklet contains six situations.  You will have 120 minutes to complete the registered exam.<br><br>
              This exercise contains situations that include processing incoming registered mail, delivering registered mail, 
              dispatching outgoing registered mail, and closing a registry section.
              Make all responses clear and legible in the booklet.  Read each situation carefully but move on so that all 
              situations may be answered in the allotted time.
              If you make a mistake or if you have to change an answer in the booklet, completely erase it and then write in the correct information.
              You must achieve a minimum of 80% in order to pass this exercise.<br><br>
              SITUATION:  You are the registry clerk on duty in the registry section at APO AE  09459.  Perform routine registry section duties represented in situations 1 through 6.<br><br>
              SPECIAL INSTRUCTIONS:  For this practical exercise, you will act as the registry clerk, unit mail clerk, addressee, witness, mail guard, and registry section supervisor.  Sign his/her names where applicable.<br><br>
              NOTE:  ASSUME THAT ALL ADDRESSES SHOWN THROUGHOUT THIS PRACTICAL EXERCISE ARE CORRECT.<br><br>

            </div>
            <button class="modal-button" @click="closeModal()">START</button>
          </div>
    </div>
</div>
  </div>
</template>

<script>
  export default {
    name: 'Warning',
    data() {
        return {
            show:true,
            modalPage: 1
        }
    },
    methods: {
      closeModal() {
            this.show = false;
      },
    },
    computed: {
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#32334B;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    z-index: 2000;
  }

  .modal {
    position: absolute;
    top: 5vh;
    left:50%;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 70vw;
    min-height: 70vh;
    border-radius: 5px;
  }

  .modal-button {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #32334B;
    text-align: right;
    padding: 4px;
    border-radius: 3px;
    border: solid 3px #D5D5D5;
    background-color: #D5D5D5;
    letter-spacing: 2px;;
  }
  .modal-button:hover{
    color: #D5D5D5;
    background-color: #32334B;
  }

.gold {
  color: #D5D5D5;
  text-align: center;
  font-size: 2vw;
}
.tlo-title{
  font-weight: bold;
  letter-spacing: 3px;
}
.tlo-text {
  font-size: 1.3vw;
  text-align: center;
}
</style>