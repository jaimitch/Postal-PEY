<template>
<div v-show="show">
  <div class="modal-backdrop" @click="closeModal()">
    <div class="modal">
        <button
          type="button"
          class="btn-close"
          @click="closeModal()">
          x
        </button>
          <div class="gold">
            <span class="tlo-title">Interservice Postal Training Activity<br>
            Lesson #CJAF5216<br>
            Practical Exercise - X</span><br><br>
            The following training material utilizes a drag and drop system. To move an item, click and hold it, then drag it into position.<br>
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
            show:true
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
    background-color: rgba(0, 0, 0, 0.3);
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
    background: #32334B;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 70vw;
    min-height: 70vh;
    border-radius: 5px;
  }


  .modal-body {
    position: relative;
    padding: 5vw;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #D5D5D5;
    background: transparent;
    text-align: right;
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