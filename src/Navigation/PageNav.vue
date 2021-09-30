<template>

    <div class="arrowBtn">
    <div class="arrow">
    <button @click="prevPage" class="previousBtn"><img src="@/assets/left-arrow.svg" style="width: 2vw"></button>
    </div>
    <div class="arrow">
    <button @click="nextPage" class="nextBtn"><img src="@/assets/right-arrow.svg" style="width: 2vw;"></button>
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
</style> 
