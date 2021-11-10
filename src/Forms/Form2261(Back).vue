<template>
    <div class="outline">
        <div class="banner">
            <p><b>PART 1V PHYSICAL INVENTORY</b></p>
            (Enter complete listing at the close of business or shift change)
        </div>
            <div v-if="formData.articleCode == 'YESTERDAY' || formData.articleCode == yest" class="grid">
                <div v-for="i in 96" :key="i" class="box">
                    <input v-if="i <= 6" placeholder=" " v-model="formData.items[i-1]" disabled>
                </div>
            </div>
            <div v-else class="grid">
                <div v-for="i in 96" :key="i" class="box">
                    <select v-model="formData.items[i-1]">
                        <option value="RB 309 266 140 US">RB 309 266 140 US</option>
                        <option value="RB 290 770 790 US">RB 290 770 790 US</option>
                        <option value="RB 339 065 331 US">RB 339 065 331 US</option>
                        <option value="RB 298 302 613 US">RB 298 302 613 US</option>
                        <option value="RB 300 911 758 US">RB 300 911 758 US</option>
                        <option value="RB 300 911 760 US">RB 300 911 760 US</option>
                        <option value="RB 300 911 761 US">RB 300 911 761 US</option>
                        <option value="RB 707 092 210 US">RB 707 092 210 US</option>
                        <option value="RB 707 092 211 US">RB 707 092 211 US</option>
                        <option value="RB 707 092 212 US">RB 707 092 212 US</option>
                        <option value="NFE">NFE</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
        <div class="bottom-text">
            <b>DD FORM 2261 (BACK), MAY 2000</b>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item', 'studentName', 'studentPG', 'yest'],
        data(){
            return{
                formData:{
                    articleCode:this.item.formInputs.articleCode,
                    situationNumber: this.item.formInputs.situationNumber,
                    apoNum: this.item.formInputs.apoNum,
                    from: this.item.formInputs.from,
                    to: this.item.formInputs.to,
                    itemsAtStart: this.item.formInputs.itemsAtStart,
                    signature: this.item.formInputs.signature,
                    payGrade: this.item.formInputs.payGrade,
                    typedName: this.item.formInputs.typedName,
                    officialSig: this.item.formInputs.officialSig,
                    prepSig: this.item.formInputs.prepSig,
                    remarks: this.item.formInputs.remarks,
                    sectionC1: this.item.formInputs.sectionC1,
                    sectionC2: this.item.formInputs.sectionC2,
                    sectionC3: this.item.formInputs.sectionC3,
                    sectionC4: this.item.formInputs.sectionC4,
                    sectionC5: this.item.formInputs.sectionC5,
                    sectionC6: this.item.formInputs.sectionC6,
                    sectionC7: this.item.formInputs.sectionC7,
                    sectionC8: this.item.formInputs.sectionC8,
                    sectionC9: this.item.formInputs.sectionC9,
                    sectionC10: this.item.formInputs.sectionC10,
                    sectionC11: this.item.formInputs.sectionC11,
                    sectionC12: this.item.formInputs.sectionC12,
                    sectionC13: this.item.formInputs.sectionC13,
                    sectionC14: this.item.formInputs.sectionC14,
                    sectionC15: this.item.formInputs.sectionC15,
                    sectionC16: this.item.formInputs.sectionC16,
                    sectionC17: this.item.formInputs.sectionC17,
                    sectionC18: this.item.formInputs.sectionC18,
                    totalItems9thru14: this.item.formInputs.totalItems9thru14,
                    itemsOnHandAtEnd: this.item.formInputs.itemsOnHandAtEnd,
                    numberOfPouchesOpened: this.item.formInputs.numberOfPouchesOpened,
                    itemsOnOutgoingTruck: this.item.formInputs.itemsOnOutgoingTruck,
                    itemsOnOutgoingManifests: this.item.formInputs.itemsOnOutgoingManifests,
                    itemsListedOnInsideBillsB: this.item.formInputs.itemsListedOnInsideBillsB,
                    itemsDelivered: this.item.formInputs.itemsDelivered,
                    total1thru7: this.item.formInputs.total1thru7,
                    itemsRecievedFromOther: this.item.formInputs.itemsRecievedFromOther,
                    numberOfPouchesClosed: this.item.formInputs.numberOfPouchesClosed,
                    itemsOnIncomingTruck: this.item.formInputs.itemsOnIncomingTruck,
                    itemsOnIncomingManifests: this.item.formInputs.itemsOnIncomingManifests,
                    itemsListedOnInsideBillsA: this.item.formInputs.itemsListedOnInsideBillsA,
                    itemsAccepted: this.item.formInputs.itemsAccepted,
                    items: this.item.formInputs.items,
                }
                
            }
        },
        mounted(){
            this.$emit("changeShadeTrue")
        },
        beforeUnmount(){
            this.$emit("changeShadeFalse")
        },
        methods:{
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
        position: relative;
        width: 680px;
        height: 880px;
        border: 1px solid black;
        text-align: center;
        background-color: rgb(255, 255, 255);
        color: black;
        font-size: 11px;
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
    .box input{
        width:95%;
        height: 90%;
        border:none;
        background-color: transparent;
        font-size: 11px;
        font-family: Arial;
    }
    .box select{
        width:95%;
        height: 90%;
        border:none;
        background-color: transparent;
        font-size: 11px;
        font-family: Arial;
    }
    .bottom-text{
        position: absolute;
        top: 98%;
    }
</style>