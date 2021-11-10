<template>
<div v-show="successModalShow" @click="closeModal()">
  <div class="modal-backdrop">
    <div class="modal">
          <div class="gold" v-if="sectionNumber != 6">
            You have successfully completed Situation {{sectionNumber}}, you can now move on to Situation {{sectionNumber+1}}
          </div>
          <div class="gold" v-else>
            You have successfully completed the PE - X
          </div>
    </div>
</div>
  </div>
</template>

<script>
  export default {
    name: 'Warning',
    props: ['successModalShow', 'sectionNumber'],
    methods: {
      closeModal() {
        this.$emit("successModal")
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    z-index: 2000;
  }

  .modal {
    position: absolute;
    top: 40%;
    left:50%;
    min-width: 30vw;
    min-height: 10vh;
    border-radius: 12px;
    z-index:50;
    box-shadow: 1px 3px 2px black;
    transform: translateX(-50%);
    background: #D5D5D5;
    color: #32334B;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
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
  position:relative;
  /* top: 8vw; */
  text-align:center;
  padding: 1vw;
  font-size: 1.4vw;
}
</style>