<template>
    <div class="outline">
        <div class="banner">
            <p><b>PART 1V PHYSICAL INVENTORY</b></p>
            (Enter complete listing at the close of business or shift change)
        </div>
        <div class="grid">
            <div v-for="i in 96" :key="i" class="box">
                <textarea v-model="items[i]"/>
            </div>
        </div>
        <div class="bottom-text">
            <b>DD FORM 2261 (BACK), MAY 2000</b>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                items: [],
            }
        }
    }
</script>

<style scoped>
    .outline{
        position: relative;
        left: 20%;
        width: 30vmax;
        height: 40vmax;
        border: 1px solid black;
        text-align: center;
        background-color: rgb(255, 255, 255);
        color: black;
        font-size: 0.7vmax;
    }
    .banner{
        position: absolute;
        width: 100%;
        height: 8%;
        border-bottom: 1px solid black;
    }
    .grid{
        position: absolute;
        top: 8%;
        width: 100%;
        height: 90%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        border:1px solid black; 
    }
    .box{
        border:1px solid black;
        border-left:none;
        border-bottom:none;
    }
    .box textarea{
        width:95%;
        height: 90%;
        border:none;
        background-color: transparent;
        font-family: Arial;
    }
    .bottom-text{
        position: absolute;
        top: 98%;
    }
</style>