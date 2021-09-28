<template>

    <div class="arrowBtn">
    <div class="arrow">
    <button @click="previousPage" class="previousBtn"><img src="@/assets/left-arrow.svg" style="width: 2vw"></button>
    </div>
    <div class="arrow">
    <button @click=" nextPage" class="nextBtn"><img src="@/assets/right-arrow.svg" style="width: 2vw;"></button>
    </div>


    </div>
</template>

<script>
export default {
    name: "PageNav",
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

.previousBtn {
    position: absolute;
    top: 89.5vh;
    right: 5.225vw;
}
.nextBtn {
    position: absolute;
    top: 89.5vh;
    right: 2.725vw;
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
</style> 
