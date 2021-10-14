<template>
    <div class="outline">
        <div class="top-line">
            <div class="logo">USPS logo</div>
            <div class="top-text">
                Firm Mailing Book For Accountable Mail
            </div>
        </div>
        <div class="sender-area">
            <div class="sender-text">
                Name and Address of Sender
            </div>
            <textarea class="sender-input" v-model="formData.senderAddress"></textarea>
        </div>
        <div class="type-area">
            <div class="sender-text">
                Check type of mail or service
            </div>
            <div class="left-stamps">
                <input type="checkbox" class="checkboxes" v-model="formData.adultSigReq">
                <label>Adult Signature Required</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.adultSigRest">
                <label>Adult Signature Restricted Delivery</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.certMail">
                <label>Certified Mail</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.certMailRestDeliv">
                <label>Certified Mail Restricted Delivery</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.cOD">
                <label>Collect on Delivery (COD)</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.insuredMail">
                <label>Insured Mail</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.priorityMail">
                <label>Priority Mail</label>
            </div>
            <div class="right-stamps">
                <input type="checkbox" class="checkboxes" v-model="formData.priorityMailEx">
                <label>Priority Mail Express</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.registeredMail">
                <label>Registered Mail</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.returnReciept">
                <label>Return Reciept for Merchandise</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.sigConfirm">
                <label>Signature Confirmation</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="formData.sigConfirmRestrDeliv">
                <label>Signature Confirmation Restricted Delivery</label>
                <br>
            </div>
        </div>
        <div class="stamp-area">
            <div class="stamp-text">
                Affix Stamp Here<br>
                (for additional copies of this receipt).<br>
                Postmark with Date of Receipt.
            </div>
            <input type="checkbox" v-model="formData.stamped">
        </div>
        
        <div class="tracking-area">
            <div class="tracking-text">
                <p>USPS Tracking/Article Number</p>
            </div>
            <div class="tracking1">
                <p>&emsp;1.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum1">
            </div>
            <div class="tracking2">
                <p>&emsp;2.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum2">
            </div>
            <div class="tracking3">
                <p>&emsp;3.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum3">
            </div>
            <div class="tracking4">
                <p>&emsp;4.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum4">
            </div>
            <div class="tracking5">
                <p>&emsp;5.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum5">
            </div>
            <div class="tracking6">
                <p>&emsp;6.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum6">
            </div>
            <div class="tracking7">
                <p>&emsp;7.</p>
                <input class="tracking-text-input" v-model="formData.trackingNum7">
            </div>
            <div class="tracking8">
                <p>&emsp;8.</p>  
                <input class="tracking-text-input" v-model="formData.trackingNum8"> 
            </div>
        </div>
        <div class="address-area">
            <div class="tracking-text">
                <p>Addressee (Name, Street, City, State, & ZIP Code™)</p>
            </div>
            <div class="tracking1">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput1"/>
            </div>
            <div class="tracking2">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput2"/>
            </div>
            <div class="tracking3">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput3"/>
            </div>
            <div class="tracking4">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput4"/>
            </div>
            <div class="tracking5">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput5"/>
            </div>
            <div class="tracking6">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput6"/>
            </div>
            <div class="tracking7">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput7"/>
            </div>
            <div class="tracking8">
                <textarea class="tracking-text-input" v-model="formData.trackingTextInput8"/>
            </div>
        </div>
        <div class="postage-area">
            <div class="postage-text">
                <div class="box1"><div class="hover">Postage</div></div>
                <div class="box1"><div class="hover">(Extra Service) Fee</div></div>
                <div class="box1"><div class="hover">Handling Charge</div></div>
                <div class="box1"><div class="hover">Actual Value if Registered</div></div>
                <div class="box1"><div class="hover">Insured Value</div></div>
                <div class="box1"><div class="hover">Due Sender if COD</div></div>
                <div class="box1"><div class="hover">ASR Fee</div></div>
                <div class="box1"><div class="hover">ASRD Fee</div></div>
                <div class="box1"><div class="hover">RD Fee</div></div>
                <div class="box1"><div class="hover">RR Fee</div></div>
                <div class="box1"><div class="hover">SC Fee</div></div>
                <div class="box1"><div class="hover">SCRD Fee</div></div>
                <div class="box1"><div class="hover">SH Fee</div></div>
            </div>
            <div class = "grid">
                <div v-for="i in 104" :key="i" class="box">
                    <input v-model="formData.rows[i-1]">
                </div>
            </div>
        </div>
        <div class="pieces-sent">
            <div class="pieces-text">
                Total Number of Pieces
                Listed by Sender
                <input class="pieces-input" v-model="formData.piecesSent">
            </div>
        </div>
        <div class="pieces-recieved" >
            <div class="pieces-text">
                Total Number of Pieces
                Recieved at Post Office
                <input class="pieces-input" v-model="formData.piecesRecieved">
            </div>
        </div>
        <div class="postmaster">
            Postmaster, Per (Name of receiving employee)
            <input class="postmaster-input" v-model="formData.postmaster">
        </div>
        <div class="blank"/>
        <div class="bottom-text1">
            PS Form 3877.April 2015(Page 1 of 2)
        </div>
        <div class="bottom-text2">
            Complete in Ink
        </div>
        <div class="bottom-text3">
            Privacy Notice: For more information on USPS privacy policies, visit usps.com/privacypolicy.
        </div>
    </div>
</template>

<script>
    export default{
        props: ['item'],
        data () {
            return{
                formData: {
                    articleCode:this.item.formInputs.articleCode,
                    situationNumber: this.item.formInputs.situationNumber,
                    senderAddress: this.item.formInputs.senderAddress,
                    adultSigReq: this.item.formInputs.adultSigReq,
                    adultSigRest: this.item.formInputs.adultSigRest,
                    certMail: this.item.formInputs.certMail,
                    certMailRestDeliv: this.item.formInputs.certMailRestDeliv,
                    cOD: this.item.formInputs.cOD,
                    insuredMail: this.item.formInputs.insuredMail,
                    priorityMail: this.item.formInputs.priorityMail,
                    priorityMailEx: this.item.formInputs.priorityMailEx,
                    registeredMail: this.item.formInputs.registeredMail,
                    returnReciept: this.item.formInputs.returnReciept,
                    sigConfirm: this.item.formInputs.sigConfirm,
                    sigConfirmRestrDeliv: this.item.formInputs.sigConfirmRestrDeliv,
                    trackingNum1: this.item.formInputs.trackingNum1,
                    trackingNum2: this.item.formInputs.trackingNum2,
                    trackingNum3: this.item.formInputs.trackingNum3,
                    trackingNum4: this.item.formInputs.trackingNum4,
                    trackingNum5: this.item.formInputs.trackingNum5,
                    trackingNum6: this.item.formInputs.trackingNum6,
                    trackingNum7: this.item.formInputs.trackingNum7,
                    trackingNum8: this.item.formInputs.trackingNum8, 
                    trackingTextInput1: this.item.formInputs.trackingTextInput1,
                    trackingTextInput2: this.item.formInputs.trackingTextInput2,
                    trackingTextInput3: this.item.formInputs.trackingTextInput3,
                    trackingTextInput4: this.item.formInputs.trackingTextInput4,
                    trackingTextInput5: this.item.formInputs.trackingTextInput5,
                    trackingTextInput6: this.item.formInputs.trackingTextInput6,
                    trackingTextInput7: this.item.formInputs.trackingTextInput7,
                    trackingTextInput8: this.item.formInputs.trackingTextInput8,
                    piecesSent: this.item.formInputs.piecesSent,
                    piecesRecieved: this.item.formInputs.piecesRecieved,
                    postmaster:this.item.formInputs.postmaster,
                    rows: this.item.formInputs.rows,
                    stamped: this.item.formInputs.stamped
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
    textarea  {
        font-family:Arial;     
    }
    .outline{
        position: relative;
        left:-10%;
        width: 50vmax;
        height: 36vmax;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        color: black;
        font-size: 1vmin;
        font-family: Arial;
    }
    .top-line{
        position: absolute;
        top: 0%;
        height: 7%;
        left: 2%;
        width: 96%;
        border-bottom: 1px solid black;
    }
    .logo{
        position: absolute;
        top: 55%;
    }
    .top-text{
        position: absolute;
        right: 0;
        top: 55%;
        font-size: 0.75vmax;
    }
    .sender-area{
        position: absolute;
        top: 7%;
        height: 20%;
        left: 2%;
        width: 23%;
        border: 1px solid black;
        border-left: none;
    }
    .type-area{
        position: absolute;
        top: 7%;
        left: 25%;
        width: 26%;
        height: 20%;
        border: 1px solid black;
        text-align: left;
        font-size: 00.90vmin;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }
    .stamp-area{
        position: absolute;
        top: 7%;
        left: 51%;
        width: 47%;
        height: 20%;
        border: 1px solid black;
        border-left: none;
        border-right: none;
    }
    .stamp-area input{
        position: absolute;
        height: 80%;
        width: 25%;
    }
    .tracking-area{
        position: absolute;
        top: 27%;
        height: 66%;
        left: 2%;
        width: 23%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
        text-align: left;
    }
    .tracking-text{
        position: absolute;
        border: 1px solid black;
        border-top: none;
        border-left:none;
        border-right: none; 
        left: 0;
        height: 5%;
        width: 100%;
        text-align: center;
    }
    .tracking-text-input{
        position: absolute;
        left:10%;
        top: 6%;
        height: 80%;
        width: 80%;
        border:none;
        font-family:Arial;
    }
    .address-area{
        position: absolute;
        top: 27%;
        left: 25%;
        width: 26%;
        height: 66%;
        border: 1px solid black;
        border-top: none;
        color:black;
        text-align: left;
    }
    .address-text{
        position: absolute;
        border: 1px solid black;
        border-top: none;
        border-left:none;
        border-right: none;
        height: 5%;
        width: 100%;
    }
    .postage-area{
        position: absolute;
        top: 27%;
        left: 51%;
        width: 47%;
        height: 66%;
        border: 1px solid black;
        border-left: none;
        border-right: none;
        border-top: none;
    }
    .pieces-sent{
        position: absolute;
        top: 93%;
        height: 4%;
        left: 2%;
        width: 11.5%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
    }
    .pieces-recieved{
        position: absolute;
        top: 93%;
        height: 4%;
        left: 13.5%;
        width: 11.5%;
        border: 1px solid black;
        border-left: none;
        border-top: none;
    }
    .postmaster{
        position: absolute;
        top: 93%;
        left: 25%;
        width: 26%;
        height: 4%;
        border: 1px solid black;
        border-top: none;
    }
    .postmaster-input{
        position: absolute;
        border:none;
        top: 40%;
        left: 20%;
        height: 45% ;
    }
    .blank{
        position: absolute;
        top: 93%;
        left: 51%;
        width: 47%;
        height: 4%;
        border: 1px solid black;
        border-left: none;
        border-right: none;
        border-top: none;
    }
    .bottom-text1{
        position: absolute;
        top: 97%;
        left: 2%;
        width: 23%;
        text-align: left;
    }
    .bottom-text2{
        position: absolute;
        top: 97%;
        left: 25%;
        text-align: center;
        width: 26%;
    }
    .bottom-text3{
        position: absolute;
        top: 97%;
        left: 50%;
        text-align: left;
        font-size: 0.95vmin;
    }
    .sender-text{
        position: absolute;
        text-align: left;
        left: 3%;
    }
    .sender-input{
        position: absolute;
        top: 20%;
        left: 0;
        width: 95%;
        height: 70%;
        border: none;
    }
    .left-stamps{
        position: absolute;
        max-height: 16%;
        top:10%;
        font-size: 0.4vmax;
    }
    .right-stamps{
        position: absolute;
        max-height: 16%;
        top:10%;
        left:58%;
        font-size: 0.4vmax;
    }
    .checkboxes{
        height: 0.85vmin;
        width: 0.85vmin;
    }
    .stamp-text{
        position: absolute;
        left: 8%;
        top: 25%;
        width: 35%;
        text-align:left;
    }
    .pieces-text{
        text-align: left;
        font-size: 0.8vmin;
    }
    .pieces-input{
        position: absolute;
        width: 50%;
        height: 30%;
        bottom: 0;
        right:0;
        border:none;
    }
    .tracking1{
        position: absolute;
        border: 1px solid black;
        top: 5%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking2{
        position: absolute;
        border: 1px solid black;
        top: 16.875%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking3{
        position: absolute;
        border: 1px solid black;
        top: 28.75%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking4{
        position: absolute;
        border: 1px solid black;
        top: 40.625%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking5{
        position: absolute;
        border: 1px solid black;
        top: 52.5%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking6{
        position: absolute;
        border: 1px solid black;
        top: 64.375%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking7{
        position: absolute;
        border: 1px solid black;
        top: 76.25%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%
    }
    .tracking8{
        position: absolute;
        border: 1px solid black;
        top: 88.125%;
        border-right: none;
        border-left: none;
        border-top:none;
        height: 11.875%;
        width: 100%;
    }
    .grid{
        position: absolute;
        width: 100%;
        height: 95%;
        top:5%;
        display: grid;
        grid-template-columns: repeat(13, 1fr);
    }
    .box{
        border:1px solid black;
        border-left:none;
        border-bottom:none;
    }
    .box input{
        width:60%;
        height: 80%;
        border:none;
        background-color: transparent;
    }
    .postage-text{
        display: grid;
        width:100%;
        height: 5%;
        grid-template-columns: repeat(13, 1fr);
        top: 0%;
        font-size: 0.7vmin;
    }
    .box1{
        position: relative;
        border-right: 1px solid black;
        min-height: 100%;
        text-align: center;
        display: inline-block;
    }
    .hover { 
        transition: all .2s ease-in-out; 
    }
    .hover:hover { 
        transform: scale(5); 
        background-color: white;
    }
</style>