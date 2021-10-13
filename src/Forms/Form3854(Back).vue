<template>
    <div class="outline">
        <div class="right-area">
            <div class="right-area-content">
                <textarea></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .outline{
        position:relative;
        left: -15%;
        width: 50vmax;
        height: 36vmax;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        color: black;
        font-size: 1vmin;
        font-family: Arial;
    }
    .right-area{
        position: absolute;
        top: 0%;
        left: 86%;
        height: 100%;
        border-left: 2px dotted black;
        width: 14%;
        display: flex;
        flex-direction: column;
        font-size: 1vmin;
        text-align: left;
    }
    
    .right-area textarea{
        position: absolute;
        width: 95%;
        height: 98%;
        font-family: Arial;
        border: none;
    }
</style>