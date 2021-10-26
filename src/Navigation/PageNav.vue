<template>

    <div class="arrowBtn">
    <div class="arrow">
    <button v-if="this.$store.state.pageNum > 1" @click="prevPage(), $emit('prev')" class="previousBtn"><img src="@/assets/left-arrow.svg" style="width: 2vw"></button>
    </div>
    <div class='arrow' v-if="canGo[this.$store.state.pageNum-1] === true">
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
        canGo: [
            false,
            true,
            false,
            false,
            true,
            true,
            true,
            false,
            true,
            false,
            false,
        ],
        pageErrorsNav: this.pageErrors
    }
  },
  methods: { 
        nextPage() {
            this.$emit('clearForm')
            this.$store.commit('nextPage');
        },
        prevPage() {
            this.$emit('clearForm')
            this.$store.commit('prevPage');
        },
        checkCanGo(){
            if(this.pageErrorsNav[0] === false){
                this.canGo[0] = true
            }
            if(this.pageErrorsNav[1] === false){
                this.canGo[2] = true
            }
            if(this.pageErrorsNav[2] === false){
                this.canGo[3] = true
            }
            if(this.pageErrorsNav[3] === false){
                this.canGo[7] = true
            }
            if(this.pageErrorsNav[4] === false){
                this.canGo[9] = true
            }
            if(this.pageErrorsNav[5] === false){
                this.canGo[10] = true
            }
        }
    },
    watch: {
        // whenever question changes, this function will run
        pageErrorsNav: {
            deep: true,
            handler: 'checkCanGo'
       },
    },
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
