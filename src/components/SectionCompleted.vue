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
    top: 20vw;
    left:50%;
    transform: translateX(-50%);
    background: #32334B;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 35vw;
    min-height: 10vh;
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
}
</style>