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
          <div class="gold">This is text for instructions/TLO</div>
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
    top: 33vw;
    left:50%;
    transform: translateX(-50%);
    background: #353535;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 35vw;
    min-height: 10vh;
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
    color: #EBAD1B;
    background: transparent;
    text-align: right;
  }

.gold {
  color: #EBAD1B;
  text-align: center;
}
</style>