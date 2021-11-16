<template>
    <div>
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
    width: 10vw;
    font-size: 0.9vw;
    /* padding: 0.2vw; */
    /* border: solid; */
    margin: 0px;
    /* border-width: 1px; */
    border-radius: 3px;
}
</style>