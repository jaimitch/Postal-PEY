<template>
  <div v-show="deleteModalShow">
    <div class="modal-backdrop">
      <div class="modal">
        <div class="gold">
          Are you sure you want to delete {{deletingItem.type}}: {{deletingItem.articleCode}}?
          <br>
          <button class="delete-yes" @click="closeModal(true)">Yes</button>
          <button class="delete-no" @click="closeModal(false)">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Warning',
    props: ['deleteModalShow', 'deletingItem', 'problemItems'],
    methods: {
      closeModal(bool) {
        if(bool == true){
          this.$emit('deleteChoice', this.deletingItem)
        }
        else{
          this.$emit('doNothing')
        }  
      },
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
  .delete-yes,.delete-no{
    font-size: 1vw;
    font-weight: bold;
    letter-spacing: .15vw;
    background-color: #D5D5D5;
    color: #32334B;
    border-radius: .5vw;
    padding: 1vw;
    margin: 2%;
  }
  .delete-yes:hover,.delete-no:hover{
    background-color: #32334B;
    color: #D5D5D5;
  }
</style>