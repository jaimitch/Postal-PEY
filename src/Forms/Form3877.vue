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
            <textarea class="sender-input" v-model="senderAddress"></textarea>
        </div>
        <div class="type-area">
            <div class="sender-text">
                Check type of mail or service
            </div>
            <div class="left-stamps">
                <input type="checkbox" class="checkboxes" v-model="adultSigReq">
                <label>Adult Signature Required</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="adultSigRest">
                <label>Adult Signature Restricted Delivery</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="certMail">
                <label>Certified Mail</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="certMailRestDeliv">
                <label>Certified Mail Restricted Delivery</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="cOD">
                <label>Collect on Delivery (COD)</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="insuredMail">
                <label>Insured Mail</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="priorityMail">
                <label>Priority Mail</label>
            </div>
            <div class="right-stamps">
                <input type="checkbox" class="checkboxes" v-model="priorityMailEx">
                <label>Priority Mail Express</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="registeredMail">
                <label>Registered Mail</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="returnReciept">
                <label>Return Reciept for Merchandise</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="sigConfirm">
                <label>Signature Confirmation</label>
                <br>
                <input type="checkbox" class="checkboxes" v-model="sigConfirmRestrDeliv">
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
        </div>
        
        <div class="tracking-area">
            <div class="tracking-text">
                <p>USPS Tracking/Article Number</p>
            </div>
            <div class="tracking1">
                <p>&emsp;1.</p>
                <input class="tracking-text-input" v-model="trackingNum1">
            </div>
            <div class="tracking2">
                <p>&emsp;2.</p>
                <input class="tracking-text-input" v-model="trackingNum2">
            </div>
            <div class="tracking3">
                <p>&emsp;3.</p>
                <input class="tracking-text-input" v-model="trackingNum3">
            </div>
            <div class="tracking4">
                <p>&emsp;4.</p>
                <input class="tracking-text-input" v-model="trackingNum4">
            </div>
            <div class="tracking5">
                <p>&emsp;5.</p>
                <input class="tracking-text-input" v-model="trackingNum5">
            </div>
            <div class="tracking6">
                <p>&emsp;6.</p>
                <input class="tracking-text-input" v-model="trackingNum6">
            </div>
            <div class="tracking7">
                <p>&emsp;7.</p>
                <input class="tracking-text-input" v-model="trackingNum7">
            </div>
            <div class="tracking8">
                <p>&emsp;8.</p>  
                <input class="tracking-text-input" v-model="trackingNum8"> 
            </div>
        </div>
        <div class="address-area">
            <div class="tracking-text">
                <p>Addressee (Name, Street, City, State, & ZIP Code™)</p>
            </div>
            <div class="tracking1">
                <textarea class="tracking-text-input" v-model="trackingTextInput1"/>
            </div>
            <div class="tracking2">
                <textarea class="tracking-text-input" v-model="trackingTextInput2"/>
            </div>
            <div class="tracking3">
                <textarea class="tracking-text-input" v-model="trackingTextInput3"/>
            </div>
            <div class="tracking4">
                <textarea class="tracking-text-input" v-model="trackingTextInput4"/>
            </div>
            <div class="tracking5">
                <textarea class="tracking-text-input" v-model="trackingTextInput5"/>
            </div>
            <div class="tracking6">
                <textarea class="tracking-text-input" v-model="trackingTextInput6"/>
            </div>
            <div class="tracking7">
                <textarea class="tracking-text-input" v-model="trackingTextInput7"/>
            </div>
            <div class="tracking8">
                <textarea class="tracking-text-input" v-model="trackingTextInput8"/>
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
                    <input :value="square" @change="update($event,i)">
                </div>
            </div>
        </div>
        <div class="pieces-sent">
            <div class="pieces-text">
                Total Number of Pieces
                Listed by Sender
                <input class="pieces-input" v-model="piecesSent">
            </div>
        </div>
        <div class="pieces-recieved" >
            <div class="pieces-text">
                Total Number of Pieces
                Recieved at Post Office
                <input class="pieces-input" v-model="piecesRecieved">
            </div>
        </div>
        <div class="postmaster">
            Postmaster, Per (Name of receiving employee)
            <input class="postmaster-input" v-model="postmaster">
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
        data () {
            return{
                senderAddress: "",
                adultSigReq: false,
                adultSigRest: false,
                certMail: false,
                certMailRestDeliv: false,
                cOD: false,
                insuredMail: false,
                priorityMail: false,
                priorityMailEx: false,
                registeredMail: false,
                returnReciept: false,
                sigConfirm: false,
                sigConfirmRestrDeliv: false,
                trackingNum1: "",
                trackingNum2: "",
                trackingNum3: "",
                trackingNum4: "",
                trackingNum5: "",
                trackingNum6: "",
                trackingNum7: "",
                trackingNum8: "", 
                trackingTextInput1: "",
                trackingTextInput2: "",
                trackingTextInput3: "",
                trackingTextInput4: "",
                trackingTextInput5: "",
                trackingTextInput6: "",
                trackingTextInput7: "",
                trackingTextInput8: "",
                piecesSent: "",
                piecesRecieved: "",
                postmaster:"",
                postageData:{
                    postage:"",
                    extraServFee:"",
                    handlingCharge:"",
                    actualValIfReg:"",
                    insuredVal:"",
                    dueIfCOD:"",
                    asrFee:"",
                    asrdFee:"",
                    rdFee:"",
                    rrFee:"",
                    scFee:"",
                    scrdFee:"",
                    shFee:"",
                },
                rows:[
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    },
                    {
                        postage:"",
                        extraServFee:"",
                        handlingCharge:"",
                        actualValIfReg:"",
                        insuredVal:"",
                        dueIfCOD:"",
                        asrFee:"",
                        asrdFee:"",
                        rdFee:"",
                        rrFee:"",
                        scFee:"",
                        scrdFee:"",
                        shFee:"",
                    }
                ],
                square:"",
            }
        },
        methods:{
            update(evt,index){
                let row;
                if(index < 14){
                    row = 0;
                }
                if(index >= 14 && index < 26){
                    row = 1;
                }
                if(index >= 27 && index < 39){
                    row = 2;
                }
                if(index >= 40 && index < 52){
                    row = 3;
                }
                if(index >= 53 && index < 65){
                    row = 4;
                }
                if(index >= 66 && index < 78){
                    row = 5;
                }
                if(index >= 79 && index < 91){
                    row = 6;
                }
                if(index >= 92 && index < 104){
                    row = 7;
                }
                let column = index + row *(-13);
                if(column == 1){
                    this.rows[row].postage = evt.target.value;
                }
                if(column == 2){
                    this.rows[row].extraServFee = evt.target.value;
                }
                if(column == 3){
                    this.rows[row].handlingCharge = evt.target.value;
                }
                if(column == 4){
                    this.rows[row].actualValIfReg = evt.target.value;
                }
                if(column == 5){
                    this.rows[row].insuredVal = evt.target.value;
                }
                if(column == 6){
                    this.rows[row].dueIfCOD = evt.target.value;
                }
                if(column == 7){
                    this.rows[row].asrFee = evt.target.value;
                }
                if(column == 8){
                    this.rows[row].asrdFee = evt.target.value;
                }
                if(column == 9){
                    this.rows[row].rdFee = evt.target.value;
                }
                if(column == 10){
                    this.rows[row].rrFee = evt.target.value;
                }
                if(column == 11){
                    this.rows[row].scFee = evt.target.value;
                }
                if(column == 12){
                    this.rows[row].scrdFee = evt.target.value;
                }
                if(column == 13){
                    this.rows[row].shFee = evt.target.value;
                }
                console.log(this.rows[row])
            }
        }
    }
</script>

<style scoped>
    .outline{
        position: relative;
        width: 50vmax;
        height: 36vmax;
        border: 1px solid black;
        text-align: center;
        background-color: white;
        color: black;
        font-size: 1vmin;
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