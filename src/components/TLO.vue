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
              CONDITIONS:  Given the following digital assets<br>
                <ul style="text-align:left; margin:auto;">
                  <li>Incoming Registered Mail Articles<br></li>
                  <li>Blank PS Forms 3849, Delivery Notice/Reminder/Receipt<br></li>
                  <li>PS Form 3854, Manifold Registry Dispatch Book (Incoming and Outgoing Bills)<br></li>
                  <li>PS Form 3877, Firm Mailing Book for Accountable Mail<br></li>
                  <li>PS Form 3883, Firm Delivery Book for Accountable Mail<br></li>
                  <li>DD Form 2261, Registered Mail Balance and Inventory<br></li>
                  <li>Previous Day’s Registered Mail Inventory<br></li>
                  <li>Registered tin band seals<br></li>
                  <li>All Purpose Dating Stamp (APDS)<br></li>
                </ul>
              REQUIREMENTS:  The student will<br>
              <ul style="text-align: left; margin: auto;">
                <li>Receipt for Registered Mail<br></li>
                <li>Notify dispatching office of discrepancies found on dispatch bills<br></li> 
                <li>Deliver personal registered mail on PS Form 3849<br></li> 
                <li>Deliver official registered mail on PS Form 3883<br></li> 
                <li>Dispatch registered mail<br></li> 
                <li>Prepare DD Form 2261 to close Registry Section at the end of the business day<br><br></li> 
              </ul>
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
              INSTRUCTIONS:<br>
                <ul style="text-align:left; margin:auto;">

              <li>This webapp contains six situations.  You will have 120 minutes to complete the exercise.</li>
              <li>This exercise will include processing incoming registered mail, delivering registered mail
              dispatching outgoing registered mail, and closing a registry section.</li>
              <li>Read each situation and all instructions carefully.</li>
              </ul>
              <br>
              <br>
              SITUATION:  You are the registry clerk on duty in the registry section at APO AE  09459.  Perform routine registry section duties.<br><br>
              SPECIAL INSTRUCTIONS:  For this practical exercise, you will act as the registry clerk, unit mail clerk, addressee, witness, mail guard, and registry section supervisor.  Sign his/her names where applicable.<br><br>
              NOTE:  ASSUME THAT ALL ADDRESSES SHOWN THROUGHOUT THIS PRACTICAL EXERCISE ARE CORRECT.

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

<style scoped>
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
      -ms-overflow-style: none; 
  scrollbar-width: none;
  }

  .modal {
    position: absolute;
    top: 3vh;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 70vw;
    min-height: 70vh;
    max-height: 100%;
    max-width: 100%;
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
  font-size: 1.1vw;
  text-align: left;
  /* display: flex; */
  /* justify-content: center; */
  /* flex-direction: column; */
  margin-left: 10%;
  margin-right:10%;

}
.modal-backdrop::-webkit-scrollbar {
  display: none;
}
</style>