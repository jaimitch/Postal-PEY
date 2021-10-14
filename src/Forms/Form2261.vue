<template>
    <div class="outline">
        <div class="preparing-activity">
            PREPARING ACTIVITY
            <input v-model="formData.apoNum">
        </div>
        <div class="period-covered">
            <div class="period-covered-top">
                <p>PERIOD COVERED (YYYYMMDD)</p>
            </div>
            <div class="period-covered-from">
                FROM <input v-model="formData.from">
            </div>
            <div class="period-covered-to">
                TO <input v-model="formData.to">
            </div>
        </div>
        <div class="part1-banner">
            <b>PART 1 - NUMBER OF ITEMS PROCESSED</b>
        </div>
        <div class="mid-line"/>
        <div class="sectionA">
            <div class="sectionA-banner">
                <b>SECTION A-ON HAND,ACCEPTED,RECIEVED AND PREPARED FOR DISPATCH</b>
            </div>
            <div class="box1">
                <p>1</p>
            </div>
            <div class="center-box1">
                <p>ITEMS ON HAND AT START OF PERIOD</p>
            </div>
            <div class="box2">
                <p>2</p>
            </div>
            <div class="center-box2">
                <p>ITEMS ACCEPTED ON PS FORM 3806 AND 3877 AND RETURNED FROM UMC ON PS FORM 3883</p>
            </div>
            <div class="box3">
                <p>3</p>
            </div>
            <div class="center-box3">
                <p>ITEMS LISTED ON INSIDE BILLS(PS Form 3854)</p>
            </div>
            <div class="box4">
                <p>4</p>
            </div>
            <div class="center-box4">
                <p>ITEMS LISTED ON INCOMING MANIFESTS</p>
            </div>
            <div class="box5">
                <p>5</p>
            </div>
            <div class="center-box5">
                <p>ITEMS LISTED ON INCOMING TRUCK BILLS</p>
            </div>
            <div class="box6">
                <p>6</p>
            </div>
            <div class="center-box6">
                <p>NUMBER OF POUCHES/JACKETS CLOSED</p>
            </div>
            <div class="box7">
                <p>7</p>
            </div>
            <div class="center-box7">
                <p>ITEMS RECIEVED FROM OTHER SOURCES</p>
            </div>
            <div class="box8">
                <p>8</p>
            </div>
            <div class="center-box8">
                <p>TOTAL OF ITEMS 1 THROUGH 7</p>
            </div>
            <div class="right-box1">
                <input v-model="formData.itemsAtStart">
            </div>
            <div class="right-box2">
                <input v-model="formData.itemsAccepted">
            </div>
            <div class="right-box3">
                <input v-model="formData.itemsListedOnInsideBillsA">
            </div>
            <div class="right-box4">
                <input v-model="formData.itemsOnIncomingManifests">
            </div>
            <div class="right-box5">
                <input v-model="formData.itemsOnIncomingTruck">
            </div>
            <div class="right-box6">
                <input v-model="formData.numberOfPouchesClosed">
            </div>
            <div class="right-box7">
                <input v-model="formData.itemsRecievedFromOther">
            </div>
            <div class="right-box8">
                <input v-model="formData.total1thru7">
            </div>
        </div>
        <div class="sectionB">
            <div class="sectionB-banner">
                <b>SECTION B-OPEN,DELIVERED,DISPATCHED AND ON HAND</b>
            </div>
            <div class="box1">
                <p>9</p>
            </div>
            <div class="center-box1">
                <p>ITEMS DELIVERED ON PS FORM 3849 AND 3883</p>
            </div>
            <div class="box2">
                <p>10</p>
            </div>
            <div class="center-box2">
                <p>ITEMS LISTED ON INSIDE BILLS(PS Form 3854)</p>
            </div>
            <div class="box3">
                <p>11</p>
            </div>
            <div class="center-box3">
                <p>ITEMS LISTED ON OUTGOING MANIFESTS</p>
            </div>
            <div class="box4">
                <p>12</p>
            </div>
            <div class="center-box4">
                <p>ITEMS LISTED ON OUTGOING TRUCK BILLS</p>
            </div>
            <div class="box5">
                <p>13</p>
            </div>
            <div class="center-box5">
                <p>NUMBER OF POUCHES/JACKETS OPENED</p>
            </div>
            <div class="box6">
                <p>14</p>
            </div>
            <div class="center-box6">
                <p>ITEMS ON HAND AT END OF PERIOD</p>
            </div>
            <div class="box15">
                <p>15</p>
            </div>
            <div class="center-box15">
                <b>TOTAL OF ITEMS 9 THROUGH 14(This total must be the same as the total shown in item 8)</b>
            </div>
            <div class="right-box1">
                <input v-model="formData.itemsDelivered">
            </div>
            <div class="right-box2">
                <input v-model="formData.itemsListedOnInsideBillsB">
            </div>
            <div class="right-box3">
                <input v-model="formData.itemsOnOutgoingManifests">
            </div>
            <div class="right-box4">
                <input v-model="formData.itemsOnOutgoingTruck">
            </div>
            <div class="right-box5">
                <input v-model="formData.numberOfPouchesOpened">
            </div>
            <div class="right-box6">
                <input v-model="formData.itemsOnHandAtEnd">
            </div>
            <div class="right-box15">
                <input v-model="formData.totalItems9thru14">
            </div>
        </div>
        <div class="sectionC">
            <div class="sectionC-banner">
                <b>SECTION C-INVENTORY BY NUMBER OF EACH ITEM DELIVERED ON PS FORM 3849(Continue in remarks if necessary)</b>
            </div>
            <div class="row1">
                <div class="space1"><input v-model="formData.sectionC1"></div>
                <div class="space2"><input v-model="formData.sectionC2"></div>
                <div class="space3"><input v-model="formData.sectionC3"></div>
                <div class="space4"><input v-model="formData.sectionC4"></div>
                <div class="space5"><input v-model="formData.sectionC5"></div>
                <div class="space6"><input v-model="formData.sectionC6"></div>
            </div>
            <div class="row2">
                <div class="space1"><input v-model="formData.sectionC7"></div>
                <div class="space2"><input v-model="formData.sectionC8"></div>
                <div class="space3"><input v-model="formData.sectionC9"></div>
                <div class="space4"><input v-model="formData.sectionC10"></div>
                <div class="space5"><input v-model="formData.sectionC11"></div>
                <div class="space6"><input v-model="formData.sectionC12"></div>
            </div>
            <div class="row3">
                <div class="space1"><input v-model="formData.sectionC13"></div>
                <div class="space2"><input v-model="formData.sectionC14"></div>
                <div class="space3"><input v-model="formData.sectionC15"></div>
                <div class="space4"><input v-model="formData.sectionC16"></div>
                <div class="space5"><input v-model="formData.sectionC17"></div>
                <div class="space6"><input v-model="formData.sectionC18"></div>
            </div>
        </div>
        <div class="part2-banner">
            <b>PART II-REMARKS</b>
        </div>
        <div class="remarks">
            <textarea v-model="formData.remarks"></textarea>
        </div>
        <div class="part3-banner">
            <b>PART III-VERIFICATION AND TRANSFER OF ACCOUNTABILITY</b>
        </div>
        <div class="A">
            <div class="a-banner">
                <b>A. I VERIFY THAT ALL ENTRIES ON THIS BALANCE AND INVENTORY ARE CORRECT</b>
            </div>
            <div class="prep-sign">
                1.SIGNATURE OF PERSON PREPARING FORM
                <input v-model="formData.prepSig">
            </div>
            <div class="official-sign">
                2.SIGNATURE OF VERIFYING OFFICIAL
                <input v-model="formData.officialSig">
            </div>
        </div>
        <div class="B">
            <div class="b-banner">
                <b>B. I ACKNOWLEDGE RECEIPT OF ALL REGISTERED ITEMS LISTED ON THIS INVENTORY</b>
            </div>
            <div class="name-print">
                1.TYPED/PRINTED NAME OF ACCEPTOR
                (Last,First,Middle Initial)
                <input v-model="formData.typedName">
            </div>
            <div class="pay-grade">
                2.PAY GRADE
                <input v-model="formData.payGrade">
            </div>
            <div class="official-sign">
                3.SIGNATURE
                <input v-model="formData.signature">
            </div>
        </div>
        <div class="bottom-text">
            <b>DD FORM 2261, MAY 2000</b>
            <b class="centered">&emsp;&emsp;PREVIOUS EDITION IS OBSOLETE</b>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
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
                },   
            }
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
        left: 10%;
        width: 35vmax;
        height: 45vmax;
        border: 1px solid black;
        text-align: center;
        background-color: rgb(255, 255, 255);
        color: black;
        font-size: 1vmin;
    }
    .preparing-activity{
        position: absolute;
        left:0%;
        top:0;
        width: 45%;
        height: 10%;
        border: 1px solid black;
        border-top: none;
        border-left: none;
        text-align: left;
    }
    .preparing-activity input{
        position: absolute;
        top: 25%;
        left:5%;
        width: 85%;
        height: 55%;
        border:none;
    }
    .period-covered{
        position: absolute;
        left:45%;
        top:0;
        width: 55%;
        height: 10%;
        border: 1px solid black;
        border-top: none;
        border-left: none;
        text-align: left;
    }
    .period-covered-top{
        position: absolute;
        text-align: center;
        width: 100%;
        height: 50%;
        border-bottom: 1px solid black;
    }
    .period-covered-from{
        position: absolute;
        top: 50%;
        left:2%;
        width: 48%;
        height: 50%;
        border-right: 1px solid black;
        text-align: left;
    }
    .period-covered input{
        position: absolute;
        top:30%;
        left: 0;
        width: 90%;
        border: none;
    }
    .period-covered-to{
        position: absolute;
        top: 50%;
        left:52%;
        width: 48%;
        height: 50%;
        text-align: left;
    }
    .centered{
        text-align: center;
    }
    .part1-banner{
        position: absolute;
        top: 10%;
        height: 2%;
        width:100%;
        border-bottom: 1px solid black;
        text-align: center;
    }
    .sectionA{
        position: absolute;
        top: 12%;
        width: 50%;
        height: 38%;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        font-size: 0.75vmin;
        
    }
    .sectionA input{
        position: absolute;
        left:5%;
        top:5%;
        width:75%;
        height: 75%;
        border: none;
    }
    .sectionB input{
        position: absolute;
        left:5%;
        top:5%;
        width:75%;
        height: 75%;
        border: none;
    }
    .sectionA-banner{
        position: absolute;
        top: 0%;
        width: 90%;
        left: 5%;
        height: 11%;
        font-size: 1vmin;
        text-align: center;
    }
    .box1{
        position: absolute;
        top:11%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box2{
        position: absolute;
        top:22%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box3{
        position: absolute;
        top:33%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box4{
        position: absolute;
        top:44%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box5{
        position: absolute;
        top:55%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box6{
        position: absolute;
        top:66%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box7{
        position: absolute;
        top:77%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .box8{
        position: absolute;
        top:88%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        border-bottom: none;
        height: 12%;
        width: 10%;
    }
    .box15{
        position: absolute;
        top:77%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        border-bottom: none;
        height: 23%;
        width: 10%;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .mid-line{
        position: absolute;
        border-bottom: 1px solid black;
        top: 16%;
        left: 0;
        width: 100%;
    }
    .sectionB{
       position: absolute;
        top: 12%;
        width: 50%;
        height: 38%;
        left: 50%;
        border-bottom: 1px solid black;
        font-size: 0.75vmin;
    }
    .sectionB-banner{
        position: absolute;
        top: 0%;
        width: 90%;
        left: 5%;
        height: 10%;
        font-size: 1vmin;
    }
    .center-box1{
        position: absolute;
        top:11%;
        left: 10%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
    }
    .center-box2{
        position: absolute;
        top:22%;
        left: 10%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
    }
    .center-box3{
        position: absolute;
        top:33%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
        left: 10%;
    }
    .center-box4{
        position: absolute;
        top:44%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
        left: 10%;
    }
    .center-box5{
        position: absolute;
        top:55%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
        left: 10%;
    }
    .center-box6{
        position: absolute;
        top:66%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
        left: 10%;
    }
    .center-box7{
        position: absolute;
        top:77%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 80%;
        left: 10%;
    }
    .center-box8{
        position: absolute;
        top:88%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        border-bottom: none;
        height: 12%;
        width: 80%;
        left: 10%;
    }
    .center-box15{
        position: absolute;
        top:77%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        border-bottom: none;
        height: 23%;
        width: 80%;
        left: 10%;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .right-box1{
        position: absolute;
        top:11%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box2{
        position: absolute;
        top:22%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box3{
        position: absolute;
        top:33%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box4{
        position: absolute;
        top:44%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box5{
        position: absolute;
        top:55%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box6{
        position: absolute;
        top:66%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box7{
        position: absolute;
        top:77%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        height: 11%;
        width: 10%;
    }
    .right-box8{
        position: absolute;
        top:88%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        border-bottom: none;
        height: 12%;
        width: 10%;
    }
    .right-box15{
        position: absolute;
        top:77%;
        left: 90%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        border-bottom: none;
        height: 23%;
        width: 10%;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .sectionC{
        position: absolute;
        top: 50%;
        height: 15%;
        width: 100%;
        border:1px solid black;
        border-left: none;
    }
    .sectionC input{
        position: absolute;
        top:10%;
        left: 5%;
        width:80%;
        height: 70%;
        border:none;
    }
    .sectionC-banner{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 10%;
        border-bottom: 1px solid black ;
        font-size: 0.9vmin;
    }
    .row1{
        position: absolute;
        top: 10%;
        left:0;
        height: 30%;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .row2{
        position: absolute;
        top: 40%;
        left:0;
        height: 30%;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .row3{
        position: absolute;
        top: 70%;
        left:0;
        height: 30%;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .space1{
        position: absolute;
        width: 16%;
        height: 100%;
        border-right: 1px solid black;
    }
    .space2{
        position: absolute;
        left: 16%;
        width: 17%;
        height: 100%;
        border-right: 1px solid black;
    }
    .space3{
        position: absolute;
        left: 33%;
        width: 17%;
        height: 100%;
        border-right: 1px solid black;
    }
    .space4{
        position: absolute;
        left: 50%;
        width: 17%;
        height: 100%;
        border-right: 1px solid black;
    }
    .space5{
        position: absolute;
        left: 67%;
        width: 17%;
        height: 100%;
        border-right: 1px solid black;
    }
    .space6{
        position: absolute;
        left: 84%;
        width: 16%;
        height: 100%;
        border-right: 1px solid black;
    }
    .part2-banner{
        position: absolute;
        top: 65%;
        width: 100%;
        height: 2%;
        border-bottom: 1px solid black;
    }
    .remarks{
        position: absolute;
        border-bottom: 1px solid black;
        top: 67%;
        width: 100%;
        height: 13%;
    }
    .remarks textarea{
        position: absolute;
        top:2%;
        left:1%;
        width: 97%;
        height: 91%;
        border:none;
    }
    .part3-banner{
        position: absolute;
        top: 80%;
        width: 100%;
        height: 2%;
        border-bottom: 1px solid black;
    }
    .A{
        position: absolute;
        top: 82%;
        height: 8%;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .A input{
        position: absolute;
        top:30%;
        left:1%;
        width: 90%;
        height: 55%;
        border: none;
    }
    .a-banner{
        position: absolute;
        width: 100%;
        top:0%;
        height: 20%;
        border-bottom: 1px solid black;
    }
    .B{
        position: absolute;
        top: 90%;
        height: 8%;
        width: 100%;
        border-bottom: 1px solid black;
    }
    .B input{
        position: absolute;
        top:50%;
        left:1%;
        width: 80%;
        height: 35%;
        border: none;
        
    }
    .b-banner{
        position: absolute;
        width: 100%;
        top:0%;
        height: 20%;
        border-bottom: 1px solid black;
    }
    .prep-sign{
        text-align: left;
        position: absolute;
        top:20%;
        height: 80%;
        width: 50%;
        border-right: 1px solid black;
    }
    .name-print{
        text-align: left;
        position: absolute;
        top:20%;
        height: 80%;
        width: 40%;
        border-right: 1px solid black;
    }
    .pay-grade{
        text-align: left;
        position: absolute;
        top:20%;
        left:40%;
        height: 80%;
        width: 10%;
        border-right: 1px solid black;
    }
    .pay-grade input{
        position: absolute;
        left: 2%;
        width: 80%;
    }
    .official-sign{
        text-align: left;
        position: absolute;
        top:20%;
        left:50%;
        height: 80%;
        width: 50%;
        border-right: 1px solid black;
    }
    .bottom-text{
        position: absolute;
        top: 98%;
    }
    .bottom-text-center{
        position: absolute;
        top: 98%;
    }
</style>