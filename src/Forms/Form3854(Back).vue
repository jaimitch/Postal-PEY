<template>
    <div class="outline">
        <div class="right-area">
            <div class="right-area-content">
                <textarea v-model="formData.backText" disabled></textarea>
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
        resize: none;
        position: absolute;
        width: 95%;
        height: 98%;
        font-family: Arial;
        border: none;
    }
</style>