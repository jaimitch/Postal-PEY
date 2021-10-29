<template>
    <div class="outline">
        <div class="right-area">
            <div class="right-area-content">
                <select v-model="formData.select1" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB888122361US – MISSENT">RB888122361US – MISSENT</option>
                    <option value="RB621758502US – NOT RECEIVED">RB621758502US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB309266104US – SHOULD READ RB309266140US">RB309266104US – SHOULD READ RB309266140US</option>
                    <option value="Should Read RB309265340US">Should Read RB309265340US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
                <select v-model="formData.select2" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB888122361US – MISSENT">RB888122361US – MISSENT</option>
                    <option value="RB621758502US – NOT RECEIVED">RB621758502US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB309266104US – SHOULD READ RB309266140US">RB309266104US – SHOULD READ RB309266140US</option>
                    <option value="Should Read RB309265340US">Should Read RB309265340US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
                <select v-model="formData.select3" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB888122361US – MISSENT">RB888122361US – MISSENT</option>
                    <option value="RB621758502US – NOT RECEIVED">RB621758502US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB309266104US – SHOULD READ RB309266140US">RB309266104US – SHOULD READ RB309266140US</option>
                    <option value="Should Read RB309265340US">Should Read RB309265340US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
                <select v-model="formData.select4" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB888122361US – MISSENT">RB888122361US – MISSENT</option>
                    <option value="RB621758502US – NOT RECEIVED">RB621758502US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB309266104US – SHOULD READ RB309266140US">RB309266104US – SHOULD READ RB309266140US</option>
                    <option value="Should Read RB309265340US">Should Read RB309265340US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item', 'studentName', 'studentPG'],
        data () {
            return{
                
                formData: {
                    select1: this.item.formInputs.select1,
                    select2: this.item.formInputs.select2,
                    select3: this.item.formInputs.select3,
                    select4: this.item.formInputs.select4,
                    articleCode:this.item.formInputs.articleCode,
                    situationNumber: this.item.formInputs.situationNumber,
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
                    currentTime: this.item.formInputs.currentTime,
                    dispatchingClerk: this.item.formInputs.dispatchingClerk,
                    itemNums: this.item.formInputs.itemNums,
                    itemOrigins: this.item.formInputs.itemOrigins,
                    topStamp1: this.item.formInputs.topStamp1,
                    topStamp2: this.item.formInputs.topStamp2,
                    bottomStamp1: this.item.formInputs.bottomStamp1,
                    bottomStamp2: this.item.formInputs.bottomStamp2,
                    witnessSent: this.item.formInputs.witnessSent,
                    witnessRecieved: this.item.formInputs.witnessRecieved,
                    backText: this.item.formInputs.backText
                },
            }
        },
        computed: {
            backTextComp(){
                return this.formData.select1+this.formData.select2+this.formData.select3+this.formData.select4
            }
        },
        methods: {
            changeForm() {
                if(this.backTextComp != undefined){
                    this.formData.backText = this.backTextComp
                }
                this.$emit('changeForm', this.formData)
            }
        },
        watch: {
            // whenever question changes, this function will run
            formData: {
                deep: true,
                handler: 'changeForm',
            },
        },
    }
</script>

<style scoped>
    .outline{
        position:relative;
        width: 880px;
        height: 680px;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        color: black;
        font-size: 10px;
        font-family: Arial;
    }
    .right-area{
        position: absolute;
        top: 0%;
        left: 75%;
        height: 100%;
        border-left: 2px dotted black;
        width: 14%;
        display: flex;
        flex-direction: column;
        font-size: 10px;
        text-align: left;
    }
    
    .right-area select{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
    }
</style>