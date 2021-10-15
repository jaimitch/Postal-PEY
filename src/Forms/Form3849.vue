<template>
    <div class="outline">
        <div class="left">
            <div class="left-top">
                <h1>United States Postal Service</h1>
            </div>
            <div class="missed">
                <div class="form">
                    <b>Sorry we missed you while you were out.</b><br>
                    <label>Date:</label> <span><input type="text" v-model="formData.date"></span><br>
                    <label>The item was sent by:</label> <span><input type="text" v-model="formData.sentBy"></span><br>
                    <label>It was sent to:</label> <span><input type="text" v-model="formData.sentTo"></span><br>
                    <label>At this address:</label> <span><input type="text" v-model="formData.address"></span><br>
                </div>
            </div>
            <div class="about">
                <div class="form">
                    <div class="text">
                        <b>About the missed delivery:</b><br>
                        It was a:<br>
                    </div>
                    <input type="checkbox" v-model="formData.pack">Package <input type="checkbox" v-model="formData.letter">Letter 
                    <input type="checkbox" v-model="formData.largeEnvelope">Large envelope<br>
                    <div class="text">
                        <input type="checkbox" v-model="formData.parcelLockEligible">Parcel Locker Eligible <br>
                    </div>
                    <label>Available for Pickup Date:</label> <span><input type="text" v-model="formData.pickupDate"></span><br>
                    <div class="text">
                        This is the:<br>
                    </div>
                    <input type="checkbox" v-model="formData.firstAttempt">First attempt 
                    <input type="checkbox" v-model="formData.finalNotice">Final Notice
                </div>
            </div>
            <div class="schedule">
                <b>To Schedule a Redelivery</b>
                <div class="qr">

                </div>
                <div class="text-schedule">
                    <b>Scan the QR Code or go to usps.com/redelivery</b>
                    <br>
                    <br>
                    Article Number:
                    <br>
                    <br>
                    <b>1A2B 3C1A 2B3C 1A2B</b>
                </div>
            </div>
            <div class="reason">
                <div class="form">
                     <div class="text">
                         <b>We have item/s for you which we could not<br> deliver because:</b><br>
                         <input type="checkbox" v-model="formData.requiresPayment">It requires a payment of $ <input type="text" v-model="formData.cost"> for: <br>
                    </div>
                    <input type="checkbox" v-model="formData.postage">Postage due <input type="checkbox" v-model="formData.customs">Customs<br>
                    <div class="text">
                        <input type="checkbox" v-model="formData.receptFull">Receptacle full/item oversized <br>
                        <input type="checkbox" v-model="formData.noSecLoc">No secure location available <br>
                        <input type="checkbox" v-model="formData.noRecip">No authorized recipient available <br>
                        <input type="checkbox" v-model="formData.sigReq">Signature required <br>
                    </div>
                    <input type="checkbox" v-model="formData.mustBe18">must be 18+ years old <input type="checkbox" v-model="formData.mustBe21">must be 21+ years old<br>
                    <div class="other-text">
                      <input type="checkbox" v-model="formData.other"> Other: <input type="text" v-model="formData.otherText"><br>
                    </div>
                </div>
                <div class="bottom-text">
                    <b><i>Please see reverse to schedule redelivery or pickup</i></b><br>
                    PS Form 3849, February 2021
                </div>
            </div>
        </div>
        <div class="right">
            <div class="right-top">

            </div>
            <div class="missed">
                <div class="form">
                    <b>Choose <b>ONE</b> option for redelivery or pickup</b><br>
                    1. Go online to usps.com/redelivery<br>
                    2. Parcel Locker Delivery If Parcel Locker Eligible is checked on the front of the form, you may request the
                    pickup of items at uspsparcellocker.com/pickip. Your items will be delivered to the parcel locker located
                    at the address listed in section 4.<br>
                    3. Let your carrier know when and where you'd like them to leave the item, then leave this form in your
                    mailbox. (<i>Sorry, not an option for Restricted Delivery or Adult Signature items</i>)<br>
                    <b>Please redeliver on this date: ______________ and leave at (check one):</b><br>
                    <input type="checkbox">Front door <input type="checkbox">Back door 
                    <input type="checkbox">Porch <input type="checkbox">Garage <br>
                    <div class="other-text">
                      <input type="checkbox"> Other: _________________________________<br>
                    </div>
                    4. Go to your local Post Office, located at <br>
                    123 Any Street<br>
                    Any City, Any State, USA 00000 <br>
                    5. Sign up to manage your redeliveries at informeddelivery.com<br>
                    6. Send someone to serve as your representative: Sign below and provide the name of the person you want to 
                    pick up your item at your local Post Office listed in section 4. See option 3 for restrictions/<br>
                    Adressee signature:____________________________________________<br>
                    Name of representative:________________________________________<br>
                    7. Call us at 800-ASK-USPS(800-275-8777)

                </div>
            </div>
            <div class="about">

            </div>
            <div class="schedule">

            </div>
            <div class="reason">
                <div class="delivery-section">
                    <b>Delivery Section</b>
                </div>
                <div class="signature">
                    <div class="reason-text">
                        <p>
                        Signature<br>
                        X
                        </p>
                    </div>
                    <input v-model="formData.signature">
                </div>
                <div class="name">
                    <div class="reason-text">
                        <p>
                        Printed <br>
                        Name
                        </p>
                    </div>
                    <input v-model="formData.name">
                </div>
                <div class="delivery-address">
                    <div class="reason-text">
                        <p>
                        Delivery Address
                        </p>
                    </div>
                    <textarea v-model="formData.reverseAddress"></textarea>
                </div>
                <div class="usps">
                    <h3><b>USPS</b></h3> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;1A2B 3C1A 2B3C 1A2B
                </div>
                <div class="bottom-text-right">
                    PS Form 3849(Reverse)
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return{
                formData: {
                    articleCode:this.item.formInputs.articleCode,
                    situationNumber: this.item.formInputs.situationNumber,
                    reverseAddress: this.item.formInputs.reverseAddress,
                    name: this.item.formInputs.name,
                    signature: this.item.formInputs.signature,
                    otherText: this.item.formInputs.otherText,
                    other: this.item.formInputs.other,
                    mustBe21: this.item.formInputs.mustBe21,
                    mustBe18: this.item.formInputs.mustBe18,
                    sigReq: this.item.formInputs.sigReq,
                    noRecip: this.item.formInputs.noRecip,
                    noSecLoc: this.item.formInputs.noSecLoc,
                    receptFull: this.item.formInputs.receptFull,
                    customs: this.item.formInputs.customs,
                    postage: this.item.formInputs.postage,
                    cost: this.item.formInputs.cost,
                    requiresPayment: this.item.formInputs.requiresPayment,
                    finalNotice: this.item.formInputs.finalNotice,
                    firstAttempt: this.item.formInputs.firstAttempt,
                    pickupDate: this.item.formInputs.pickupDate,
                    parcelLockEligible: this.item.formInputs.parcelLockEligible,
                    pack: this.item.formInputs.pack,
                    letter: this.item.formInputs.letter,
                    largeEnvelope: this.item.formInputs.largeEnvelope,
                    address: this.item.formInputs.address,
                    sentTo: this.item.formInputs.sentTo,
                    sentBy: this.item.formInputs.sentBy,
                    date: this.item.formInputs.date
                }
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
    .left{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 50%;
        border-right: 1px solid black;
    }
    .left-top{
        position: absolute;
        top: 0;
        left: 0;
        height: 10%;
        width: 100%;
        background-color: black;
        color: white;
    }
    .missed{
        position: absolute;
        top: 10%;
        left: 0;
        height: 20%;
        width: 100%;
        text-align: left;
    }
    .about{
        position: absolute;
        top: 30%;
        left: 0;
        height: 20%;
        width: 100%;
    }
    .schedule{
        position: absolute;
        top: 50%;
        left: 0;
        height: 15%;
        width: 100%;  
    }
    .reason{
        position: absolute;
        top: 65%;
        left: 0;
        height: 35%;
        width: 100%; 
    }
    .text input[type = 'text'] {
        width: 10%;
        font-size: 1em;
        height: 1.5em;
        line-height: 1.5em;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    .other-text input[type = 'text'] {
        width: 75%;
        font-size: 1em;
        height: 1.5em;
        line-height: 1.5em;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    .right{
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        width: 50%;
    }
    .right-top{
        position: absolute;
        top: 0;
        left: 0;
        height: 10%;
        width: 100%;
    }
    .text{
        text-align: left;
    }
    .other-text{
        text-align: left;
    }
    .form {
        display: block;
        padding: 1em;
    }
    label {
        float: left;
        line-height: 2em;
    }
    span {
        display: block;
        overflow: hidden;
        padding: 0 1em;
    }
    .missed input[type = 'text'] {
        width: 100%;
        font-size: 1em;
        height: 1.5em;
        line-height: 1.5em;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    .about input[type = 'text'] {
        width: 100%;
        font-size: 1em;
        height: 1.5em;
        line-height: 1.5em;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    .qr{
        position: relative;
        width: 30%;
        height: 0;
        padding-bottom: 30%;
        left: 10%;
        top: 10%;
        background-color: black;
    }
    .text-schedule{
        position: absolute;
        text-align: left;
        left: 52%;
        top: 15%;
    }
    .bottom-text{
        position: relative;
        text-align: left;
        left: 5%;
        bottom: 0%;
    }
    .delivery-section{
        position: absolute;
        height: 5%;
        width:100%;
        border: 1px solid black;
    }
    .signature{
        position: absolute;
        top:5%;
        height: 20%;
        width:100%;
        border-bottom: 1px solid black;
    }
    .name{
        position: absolute;
        top:25%;
        height: 20%;
        width:100%;
        border-bottom: 1px solid black;
    }
    .delivery-address{
        position: absolute;
        top:45%;
        height: 20%;
        width:100%;
        border-bottom: 1px solid black;
    }
    .usps{
        position: absolute;
        top:65%;
        height: 30%;
        width:100%;
        border-bottom: 1px solid black;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .bottom-text-right{
        position: absolute;
        text-align: left;
        left: 5%;
        bottom: 0%;  
    }
    .reason-text{
        position: absolute;
        top:0;
        width: 20%;
        height: 100%;
        border-right: 1px solid black;
    }
    .reason-x{
        top:5%;
    }
    .signature input{
        position: absolute;
        width: 75%;
        left: 22%;
        top:10%;
        height: 60%;
        border: none;
    }
    .name input{
        position: absolute;
        width: 75%;
        left: 22%;
        top:10%;
        height: 60%;
        border: none;
    }
    .delivery-address textarea{
        position: absolute;
        resize: none;
        width: 75%;
        left: 22%;
        top:10%;
        height: 75%;
        border: none;
        font-family: Arial;
    }
</style>