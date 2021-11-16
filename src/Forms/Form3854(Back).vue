<template>
    <div class="outline">
        <div class="right-area">
            <div class="right-area-content">
                <select v-model="formData.select[0]" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB 888 122 361 US – MISSENT">RB 888 122 361 US – MISSENT</option>
                    <option value="RB 621 758 502 US – NOT RECEIVED">RB 621 758 502 US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB 309 266 104 US – SHOULD READ RB 309 266 140 US">RB 309 266 104 US – SHOULD READ RB 309 266 140 US</option>
                    <option value="Should Read RB 309 265 340 US">Should Read RB 309 265 340 US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
                <select v-model="formData.select[1]" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB 888 122 361 US – MISSENT">RB 888 122 361 US – MISSENT</option>
                    <option value="RB 621 758 502 US – NOT RECEIVED">RB 621 758 502 US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB 309 266 104 US – SHOULD READ RB 309 266 140 US">RB 309 266 104 US – SHOULD READ RB 309 266 140 US</option>
                    <option value="Should Read RB 309 265 340 US">Should Read RB 309 265 340 US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
                <select v-model="formData.select[2]" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB 888 122 361 US – MISSENT">RB 888 122 361 US – MISSENT</option>
                    <option value="RB 621 758 502 US – NOT RECEIVED">RB 621 758 502 US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB 309 266 104 US – SHOULD READ RB 309 266 140 US">RB 309 266 104 US – SHOULD READ RB 309 266 140 US</option>
                    <option value="Should Read RB 309 265 340 US">Should Read RB 309 265 340 US</option>
                    <option v-if="formData.billNo == 260" value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                    <option value=""></option>
                </select>
                <select v-model="formData.select[3]" class="box">
                    <option value="APO AE 09459" v-if="formData.billNo == 144">APO AE 09459</option>
                    <option value="RB 888 122 361 US – MISSENT">RB 888 122 361 US – MISSENT</option>
                    <option value="RB 621 758 502 US – NOT RECEIVED">RB 621 758 502 US – NOT RECEIVED</option>
                    <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                    <option value="RB 309 266 104 US – SHOULD READ RB 309 266 140 US">RB 309 266 104 US – SHOULD READ RB 309 266 140 US</option>
                    <option value="Should Read RB 309 265 340 US">Should Read RB 309 265 340 US</option>
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
                    select: this.item.formInputs.select,
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
        mounted(){
            this.$emit("changeShadeTrue")
        },
        beforeUnmount(){
            this.$emit("changeShadeFalse")
        },
        computed: {
            backTextComp(){
                return this.formData.select[0]+this.formData.select[1]+this.formData.select[2]+this.formData.select[3]
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
    .box{
        position: absolute;
        width:175%;
        height: 25px;
        font-size: 11px;
    }
</style>