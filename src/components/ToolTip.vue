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
                return "Welcome to Registered Mail! This interactive PE includes items such as parcels, letters, and forms, \
                which can be dragged, dropped, and expanded for more information. Click a form to open it, click it a second time to minimize it.\
                Once you've successfully completed this situation, click 'Submit to move to the next situation.";
            }
            else if(pageNum == 2) {
                return "In this situation, you will be moving forms and mail items. To move an item, drag it where you'd like it to go. \
                Items can be dragged on top of other items to attach them together. Items can be detached by dragging an item off of another.";
            }
            else if(pageNum == 3) {
                return "If a section becomes too large or unwieldy, you may expand and minimize it by clicking the plus and minus signs.";
            }
            else if(pageNum == 4) {
                return "On forms which list articles, such as PS Form 3854 and DD Form 2261, select NFE (No Further Entries) after listed items to designate the end of the list.";
            }
            else if(pageNum == 9) {
                return "In this situation, you will be adding items to a pouch. Drag and drop the items onto the pouch and they will stack underneath.";
            }

            return "The tooltip modal should not be displaying";
        }
    },
  };
</script>

<style scoped>
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
    background: #32334B;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}
  .modal-text{
      position:relative;
      /* top: 8vw; */
      text-align:center;
      padding: 1vw;
      font-size: 1.4vw;
  }
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
</style>