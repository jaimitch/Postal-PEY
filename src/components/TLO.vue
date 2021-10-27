<template>
<div v-show="show">
  <div class="modal-backdrop">
    <div v-if="modalPage == 1" class="modal">
          <div class="gold">
            <span class="tlo-title">Interservice Postal Training Activity<br>
            Lesson #CJAF5216<br>
            Practical Exercise - X</span><br><br>
            The following training material utilizes a drag and drop system. To move an item, click and hold it, then drag it into position.<br>
            <button class="modal-button" @click="modalPage = 2">NEXT</button>
          </div>
    </div>
    <div v-if="modalPage == 2" class="modal">

          <div class="gold">
            <span class="tlo-title">Interservice Postal Training Activity<br>
            Lesson #CJAF5216<br>
            Practical Exercise - X</span><br><br>
            Page 2<br>
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
    top: 15vh;
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
</style>