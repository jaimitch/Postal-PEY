<template>
<div v-show="show" class="modal-backdrop" @click="closeModal()">
    <div class="modal">
        <div class="modal-text">
            {{ displayText }}
        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'ToolTip',
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
        displayText() {
            let pageNum = this.$store.state.pageNum
            if(pageNum == 1) {
                return "This is a tool tip that explains situation 1!";
            }
            else if(pageNum == 4) {
                return "This is a tool tip that explains situation 3!";
            }

            return "The tooltip modal should not be displaying";
        }
    },
  };
</script>

<style scoped>
.modal {
    position: absolute;
    top: 45vh;
    left:50%;
    min-width: 20vw;
    min-height: 20vh;
    max-width: 20vw;
    max-height: 20vh;
    border-radius: 12px;
    z-index:50;
  }
  .modal-text{
      position:relative;
      top: 3.5vw;
      text-align:center;
      padding: 1vw;
  }
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
</style>