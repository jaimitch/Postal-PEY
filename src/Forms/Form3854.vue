<template>
    <div class="outline">
        <div class="top-stamp1">
            <div class="stamp-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.topStamp1">
                <p class="bottom-text">Dispatching Office</p>
            </div>
        </div>
        <div class="right-area">
            <div class="stamp3-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.topStamp2">
                <p class="bottom-text">Dispatching Office</p>
            </div>
            <div  class="right-area-content">
                <div>
                    &emsp;Bill No. <input type="text" v-model="formData.billNoRight">
                </div>
                <div> 
                    &emsp;A.M. Rte.<br> 
                    &emsp;& Fit. No. <input type="text" v-model="formData.amNo">
                </div>
                <div> 
                    &emsp;Jacket No. <input type="text" v-model="formData.jacketNoRight">
                </div>
                <div> 
                    &emsp;Lock No. <input type="text" v-model="formData.lockNoRight">
                </div>
                <div> 
                    &emsp;Rotary No. <input type="text" v-model="formData.rotaryNoRight">
                </div>
                <div> 
                    &emsp;Airmail <input type="text" v-model="formData.airmailRight">
                </div>
                <div> 
                    &emsp;Seal No. <input type="text" v-model="formData.sealNoRight">
                </div>
                <div> 
                    &emsp;Recieved. <input type="text" v-model="formData.recieved">
                    <div class="centered">
                        Articles described
                        on above-specified
                        bill from dispatching
                        office named in postmark
                    </div>
                </div>
                <div class="centered">
                    <input type="text" v-model="formData.recievingClerks[0]"> <br>
                    Recieving Clerks
                </div>
                <div class="centered">
                    <input type="text" v-model="formData.recievingClerks[1]"> <br>
                </div>
                
            </div>
        </div>
        <div class="top-left-area">
            <div class="top-left-inputs">
                <div>
                    &emsp;Lock No. <input type="text" v-model="formData.lockNo">
                </div>
                <div> 
                    Rotary No. <input type="text" v-model="formData.rotaryNo">
                </div>
                <div> 
                    Jacket No. <input type="text" v-model="formData.jacketNo">
                </div>
                <div> 
                    Control No. <input type="text" v-model="formData.controlNo">
                </div>
                <div> 
                    &emsp;Bill No. <input type="text" v-model="formData.billNo">
                </div>
                <div> 
                    Page No. <input type="text" v-model="formData.pageNo">
                </div>
                <div> 
                    Airmail <input type="text" v-model="formData.airmail">
                </div>
                <div> 
                    Seal No. <input type="text" v-model="formData.sealNo">
                </div>
            </div>
        </div>
        <div class="to-input"> 
            &emsp;To <input type="text" id="fname" name="fname" class="to-input" v-model="formData.to">
            <br>
            <div class="to-text">
                (P.O. or R.P.O and Tr. No.)
            </div>
        </div>
        <div class="center-area">
            <div class="center-area-content1">
                <div class="centered-box">
                    Reg. No. Jacket, <br> Lock or Seal Nos.

                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;{{i}} <input type="text" v-model="formData.itemNums[i]" class="box">
                </div>
            </div>
            <div class="center-area-content2">
                <div class="centered-box">
                    Office or ZIP of Origin. Use only for Jacket, Lock, or Seal Numbers. 
                    Not required fo individual Reg. Nos.
                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;<input type="text" v-model="formData.itemOrigins[i]" class="box">
                </div>
            </div>
            <div class="center-area-content3">
                <div class="centered-box">
                    Reg. No. Jacket, Lock or Seal Nos.
                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;{{i+15}} <input type="text" v-model="formData.itemNums[i+15]" class="box">
                </div>
            </div>
            <div class="center-area-content4">
                <div class="centered-box">
                    Office or ZIP of Origin. Use only for Jacket, Lock, or Seal Numbers. 
                    Not required fo individual Reg. Nos.
                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;<input type="text" v-model="formData.itemOrigins[i+15]" class="box">
                </div>
            </div>
        </div>
        <div class="bottom-area1">
            <div class="sub-area1">
                A total of <input type="text" v-model="formData.totalArticlesSent"> articles
                <br> sent by this dispatch
            </div>
            <div class="sub-area2">
                &emsp;Postmaster,
                <div class="witness">
                     &emsp;<input type="text" v-model="formData.witnessSent">
                </div>
                <div class="postmaster">
                     &emsp;<input type="text" v-model="formData.postmasterSent">
                </div>
            </div>
            <div class="sub-area3">
                <input type="text" v-model="formData.dispatchingClerk"> M.
                <br> Dispatching Clerk
            </div>
        </div>
        <div class="bottom-area2">
            <div class="sub-area1">
                A total of <input type="text" v-model="formData.totalArticlesRecieved"> articles
                <br> recieved in this dispatch
            </div>
            <div class="sub-area2">
                &emsp;Postmaster,
                <div class="witness">
                     &emsp;<input type="text" v-model="formData.witnessRecieved">
                </div>
                <div class="postmaster">
                     &emsp;<input type="text" v-model="formData.postmasterRecieved">
                </div>
            </div>
            <div class="sub-area3">
                <input type="text" v-model="formData.recievingClerk"> M.
                <br> Recieving Clerk
            </div>
        </div>
        <div class="bottom">
            &emsp;PS Form 3854, April 1985
        </div>
        <div class="bottom-stamp1">
            <div class="stamp-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.bottomStamp1">
                <p class="bottom-text">Recieving Office</p>
            </div>
        </div>
        <div class="bottom-stamp2">
            <div class="stamp2-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.bottomStamp2">
                <p class="bottom-text">Recieving Office</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data () {
            return{
                formData: {
                    lockNo: this.item.formInputs.lockNo,
                    rotaryNo: this.item.formInputs.rotaryNo,
                    jacketNo: this.item.formInputs.jacketNo,
                    controlNo: this.item.formInputs.controlNo,
                    billNo: this.item.formInputs.billNo,
                    pageNo: this.item.formInputs.pageNo,
                    airmail: this.item.formInputs.airmail,
                    sealNo: this.item.formInputs.sealNo,
                    to: this.item.formInputs.to,
                    billNoRight: this.item.formInputs.billNoRight,
                    amNo: this.item.formInputs.amNo,
                    jacketNoRight: this.item.formInputs.jacketNoRight,
                    lockNoRight: this.item.formInputs.lockNoRight,
                    rotaryNoRight: this.item.formInputs.rotaryNoRight,
                    sealNoRight: this.item.formInputs.sealNoRight,
                    airmailRight: this.item.formInputs.airmailRight,
                    recieved: this.item.formInputs.recieved,
                    recievingClerks: this.item.formInputs.recievingClerks,
                    totalArticlesSent: this.item.formInputs.totalArticlesSent,
                    totalArticlesRecieved: this.item.formInputs.totalArticlesRecieved,
                    postmasterSent: this.item.formInputs.postmasterSent,
                    postmasterRecieved: this.item.formInputs.postmasterRecieved,
                    recievingClerk: this.item.formInputs.recievingClerk,
                    dispatchingClerk: this.item.formInputs.dispatchingClerk,
                    itemNums: this.item.formInputs.itemNums,
                    itemOrigins: this.item.formInputs.itemOrigins,
                    topStamp1: this.item.formInputs.topStamp1,
                    topStamp2: this.item.formInputs.topStamp2,
                    bottomStamp1: this.item.formInputs.bottomStamp1,
                    bottomStamp2: this.item.formInputs.bottomStamp2,
                    witnessSent: this.item.formInputs.witnessSent,
                    witnessRecieved: this.item.formInputs.witnessRecieved
                },
            }
        },
        methods: {
            changeForm() {
                this.$emit('changeForm', this.formData)
            }
        },
        watch: {
            // whenever question changes, this function will run
            formData: {
                deep: true,
                handler: 'changeForm',
            }
        },
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
    .top-left-area{
        position: absolute;
        top: 0;
        width: 70%;
        height: 17.5%;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        text-align: center;
        background-color: white;
    }
    .top-left-inputs{
        position: absolute;
        top: 10%;
        width: 100%;
        height: 17.5%;
        text-align: center;
        background-color: white;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        color: black;
        text-align: left;
        font-size: 1vmin;   
    }
    .top-stamp1{
        position: absolute;
        top: 0;
        left: 70%;
        width: 16%;
        height: 17.5%;
        border-bottom: 1px solid black;
        color: black;
    }
    .top-stamp1 input{
        position: absolute;
        top: 30%;
        left: 40%;
    }
    .stamp-inner{
        position: inherit;
        border: 1px solid black;
        top: 15%;
        left: 18%;
        height: 70%;
        width: 64%;
    }
    .stamp2-inner{
        position: inherit;
        border: 1px solid black;
        top: 15%;
        left: 87.5%;
        right: 10%;
        height: 75%;
        width: 11%;
    }
    .stamp3-inner{
        position: absolute;
        border: 1px solid black;
        top: 3%;
        left: 8%;
        height: 20%;
        width: 80%;
    }
    .stamp3-inner input{
        position: absolute;
        top: -10%;
        left: 30%;
    }
    .center-area{
        position: absolute;
        top: 20%;
        width: 86%;
        height: 60%;
        border-top: 1px solid black;
        text-align: center;
        background-color: white;
        display: grid;
        grid-template: column;
    }
    .right-area{
        position: absolute;
        top: 0%;
        left: 86%;
        height: 80%;
        border-left: 2px dotted black;
        width: 14%;
        display: flex;
        flex-direction: column;
        font-size: 1vmin;
        text-align: left;
    }
    .right-area-content{
        position: absolute;
        top: 25%;
        display: flex;
        flex-direction: column;
        font-size: 1vmin;
        text-align: left;
    }
    .right-area input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .bottom-area1{
        position: absolute;
        top: 80%;
        width: 70%;
        height: 7.5%;
        z-index: 1;
    }
    .bottom-area1 input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .bottom-area2 input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .sub-area1{
        position: absolute;
        top: 5%;
        width: 25%;
        height: 100%;
        border-right: 1px solid black;
        font-size: 1vmin; 
    }
    .sub-area2{
        position: absolute;
        top: 5%;
        left: 25%;
        width: 55%;
        height: 100%;
        border-right: 1px solid black;
        font-size: 0.75vmax;
        text-align: left;
    }
    .sub-area2 input{
        position: relative;
        border-bottom: 2px dotted black;
        width: 80%;
        text-align: left;
        font-size: 1vmin;
        height: 40%;
        top:0%;
    }
    .witness{
        position: absolute;
        top: 20%;
        height: 30%;
        width: 100%;
    }
    .postmaster{
        position: absolute;
        top: 50%;
        height: 50%;
        width: 100%;
    }
    .sub-area3{
        position: absolute;
        top: 5%;
        left: 80%;
        width: 20%;
        height: 100%;
        font-size: 1vmin;
        text-align: center;
    }
    .bottom-area2{
        position: absolute;
        top: 87.5%;
        width: 70%;
        height: 7.5%;
        border-top: 1px solid black;
        z-index: 1;
    }
    .bottom-stamp1{
        position: absolute;
        top: 80%;
        left: 70%;
        width: 16%;
        height: 15%;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 2px dotted black;
        color: black;
    }
    .bottom-stamp1 input{
        position: absolute;
        z-index: 30;
        top: 30%;
        left: 40%;
    }
    .bottom-stamp2{
        position: absolute;
        top: 80%;
        width: 100%;
        height: 14%;
        border-top: 1px solid black;
        color: black;
    }
    .bottom-stamp2 input{
        position: absolute;
        top: 30%;
        left: 40%;
    }
    .bottom{
        position: absolute;
        top:95%;
        width: 100%;
        border-top: 1px solid black;
        text-align: left;
        color: black;
        font-size: 0.75vmax;
    }
    .top-text{
        position: relative;
        text-align: center;
        font-size: 1vmin;
    }
    .to-text{
        position: relative;
        vertical-align: text-top;
        font-size: 1vmin;
        bottom: 10%;
        right: 20%;
        text-align: center;
    }
    .bottom-text{
        position: relative;
        font-size: 1vmin;
        text-align: center;
        top: 1vmin;
    }
    .top-left-area input[type=text] {
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .to-input {
        position: absolute;
        color: black;
        top: 12%;
        text-align: left;
        font-size: 1vmin;
        width: 100%;
    }
    .to-input input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .center-area input{
        position: relative;
        top:0;
        border:none;
    }
    .center-area-content1{
        position: absolute;
        top:0;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .center-area-content2{
        position: absolute;
        top:0;
        border-left: 1px solid black;
        border-right: 1px solid black;
        left: 25%;
        width: 24%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .center-area-content3{
        position: absolute;
        border-left: 1px solid black;
        left: 51%;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .center-area-content4{
        position: absolute;
        border-left: 1px solid black;
        left: 76%;
        width: 24%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .box{
        position: relative;
        border-bottom: 1px solid black;
        text-align: left;
        font-size: 1vmin;
    }
    .box input{
        position: absolute;
        top: -50%;
        height: 110%;
        width: 85%;
    }
    .centered{
        text-align: center;
        font-size: 0.75vmin;
    }
    .centered-box{
        text-align: center;
        border-bottom: 1px solid black;
        font-size: .80vmin;
        height: 8%;
    }
</style>