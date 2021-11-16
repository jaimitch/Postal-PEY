<template>
    <div class="background">
        <div v-for='item in locations' :key='item'>
            <button class="modal-button" @click="this.$emit('selectedDestination', $event, currentItem, item)"> {{ item.articleCode }} </button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SendTo',
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
    props: ['locations', 'currentItem']
  };
</script>

<style scoped>
.modal-button {
    /* width: 100%; */
    font-size: 0.9vw;
    padding: 0.5vw;
    border: none;
    border-width: 1px;
    border-radius: .5vw;
    background-color: transparent;
    color: #D5D5D5;
    /* transform: translateX(-15%); */
    text-align: left;
    /* border-radius: 3px; */
    /* transform: translateX(50%); */
}
.modal-button:hover{
  background-color: #D5D5D5;
  color: #42426A;
}
.background{
  background-color: #32334B;
  border-radius: .8vw;
   /* transform: translateX(-2%); */
}
</style>