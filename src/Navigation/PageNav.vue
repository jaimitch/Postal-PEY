<template>

    <div class="arrowBtn">
    <div class="arrow">
    <button v-if="this.$store.state.pageNum > 1" @click="prevPage(), $emit('prev')" class="previousBtn"><img src="@/assets/left-arrow.svg" style="width: 2vw"></button>
    </div>
    <div :class="{'arrow': pageErrors[this.$store.state.pageNum-1] == false, 'arrow-off': pageErrors[this.$store.state.pageNum-1] == true}">
    <button v-if="this.$store.state.pageNum < 11" @click="nextPage(), $emit('next')" class="nextBtn"><img src="@/assets/right-arrow.svg" style="width: 2vw;"></button>
    </div>


    </div>
</template>

<script>
export default {
    name: "PageNav",
    props:['pageErrors'],
    data() {
    return {
    }
  },
  methods: { 
        nextPage() {
            this.$store.commit('nextPage');
        },
        prevPage() {
            this.$store.commit('prevPage');
        },
    }




}



</script>

<style>
.arrowBtn {
    font: Arial;
    position: absolute;
    top: 5vh;
    width: 98vw;
    z-index: 1;
    font-family: Arial;
    text-align: left;
    color: white;
}
.previousBtn {
    position: absolute;
    top: 85vh;
    right: 4vw;
}
.nextBtn {
    position: absolute;
    top: 85vh;
    right: 1vw;
}

.previousBtn,
.nextBtn{
    cursor: pointer;
    border: none;
    background-color: transparent;
}

.select {
    position: absolute;
    top: 18vh;
    left: 13vw;
}
.arrow-off{
    pointer-events: none;
    background-color: grey;
}
</style> 
