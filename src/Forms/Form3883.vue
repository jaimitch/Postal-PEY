<template>
    <div class="outline">
       <div class="top-text">
           United States Postal Service<br>
           <b>
               Firm Delivery Receipt for
                <br>Accountable and Bulk Delivery Mail
            </b>
       </div>
       <div class="options-area">
           <div class="check-area">
               <div class="certified">
                   Certified <input type="checkbox" v-model="formData.certified">
                   <br>
                   COD  <input type="checkbox" v-model="formData.COD">
               </div>
               <div class="delivery-confirm">
                   Delivery <br> Confirmation <br> Service <br><input type="checkbox" v-model="formData.DCS">
               </div>
               <div class="express-mail">
                   Express Mail <input type="checkbox" v-model="formData.expressMail">
                   <br>
                   Insured  <input type="checkbox" v-model="formData.insured">
               </div>
               <div class="recorded-delivery">
                   Recorded Delivery <input type="checkbox" v-model="formData.recDelivery">
                   <br>
                   Registered  <input type="checkbox" v-model="formData.registered">
               </div>
               <div class="return">
                   Return <br> Receipt for <br> Merchandise <br><input type="checkbox" v-model="formData.returnReceipt">
               </div>
               <div class="sign">
                   Signature <br> Confirmation <br> Service  <br><input type="checkbox" v-model="formData.SCS">
               </div>
           </div>
           <div class="bill-no">
               Mail for/Bill No.
               <input v-model="formData.billNo">
           </div>
       </div>
       <div class="article-area">
            <div class="articleNum-1">
               Article Number
            </div>
           <div class="code-1">*<br>Code</div>
           <div class="originOffice-1">Office of Origin <br> (International)</div>
           <div class="articleNum-2">Article Number</div>
           <div class="code-2">*<br>Code</div>
           <div class="originOffice-2">Office of Origin <br> (International)</div>
           <div class="articleNum-1-area"> 
               <div v-for="i in 10" :key="i" class="articleNum-1-boxes">
                    {{i}}. <input v-model="formData.article[i]">
                </div>
           </div>
           <div class="code-1-area"> 
               <div v-for="i in 10" :key="i" class="code-1-boxes">
                    <input v-model="formData.code[i]">
                </div>
           </div>
           <div class="originOffice-1-area"> 
               <div v-for="i in 10" :key="i" class="originOffice-1-boxes">
                    <input v-model="formData.origin[i]">
                </div>
           </div>
           <div class="articleNum-2-area"> 
               <div v-for="i in 10" :key="i" class="articleNum-2-boxes">
                    {{i+10}}. <input v-model="formData.article[i+10]">
                </div>
           </div>
           <div class="code-2-area"> 
               <div v-for="i in 10" :key="i" class="code-2-boxes">
                    <input v-model="formData.code[i+10]">
                </div>
           </div>
           <div class="originOffice-2-area"> 
               <div v-for="i in 10" :key="i" class="originOffice-2-boxes">
                    <input v-model="formData.origin[i+10]">
                </div>
           </div>
       </div>
       <div class="code-area">
           <b>* CODE: DC = Recieved in Damaged Condition. OS = Officially Sealed. 
               R = Return Requested. RE = Re-enveloped. RW =  Returned to Writer
           </b>
       </div>
       <div class="sig-area">
           <div class="sig-area-top">
               <div class="date-of-delivery">
                   <div class="sig-area-text">
                        Date of Delivery <input v-model="formData.dateOfDeliv">
                   </div>
               </div>
               <div class="delivered-by">
                   <div class="sig-area-text">
                        Delivered By: <br>
                        (Clerk/Carrier)
                        <input v-model="formData.deliveredBy">
                   </div>
               </div>
               <div class="recieved">
                   <div class="recieved-text">
                        <b>Recieved the <input v-model="formData.recievedNum"><br> pieces described above</b>
                   </div>
                   <div class="arrow-right">
                   </div>
                    
               </div>
               <div class="recieved-by">
                   <div class="sig-area-text">
                     Recieved By:<br>
                     (Print Name)  
                     <input v-model="formData.recievedBy">
                   </div>
               </div>
               <div class="sig-of-agent">
                   <div class="sig-area-text">
                     Signature of
                     <br>Addressee/
                     <br>Agent
                     <input v-model="formData.sigOfAgent">
                   </div>
               </div>
           </div>
           <div class="sig-area-bottom">
               <div class="sig-area-bottom-left">
                   Form 3849 Barcode Number (If delivered using scanning option)
                   <input v-model="formData.barcodeNum">
               </div>
               <div class="sig-area-bottom-right">
                    If using handheld scanner
                    option, have recipient sign
                    Form 3849.
               </div>
           </div>
       </div>
       <div class="stamp-area">
           <b>Postmark - Delivery Office</b>
           <input type="checkbox" v-model="formData.stamped">
       </div>
       <div class="bottom-text">
           PS Form 3883, November 1999
       </div>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data () {
            return{
                formData: {
                    certified: this.item.formInputs.certified,
                    COD: this.item.formInputs.COD,
                    DCS: this.item.formInputs.DCS,
                    expressMail: this.item.formInputs.expressMail,
                    insured: this.item.formInputs.insured,
                    recDelivery: this.item.formInputs.recDelivery,
                    registered: this.item.formInputs.registered,
                    returnReceipt: this.item.formInputs.returnReceipt,
                    SCS: this.item.formInputs.SCS,
                    billNo: this.item.formInputs.billNo,
                    article: this.item.formInputs.article,
                    code: this.item.formInputs.code,
                    origin: this.item.formInputs.origin,
                    dateOfDeliv: this.item.formInputs.dateOfDeliv,
                    sigOfAgent: this.item.formInputs.sigOfAgent,
                    barcodeNum: this.item.formInputs.barcodeNum,
                    recievedBy: this.item.formInputs.recievedBy,
                    recievedNum: this.item.formInputs.recievedNum,
                    deliveredBy: this.item.formInputs.deliveredBy,
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
    .top-text{
        position: absolute;
        top:0;
        left: 5%;
        height: 10%;
        width:90%;
        border-bottom: 1px solid black;
        text-align: left;
        font-size:1vmax;
    }
    .options-area{
        position: absolute;
        top:10%;
        height: 8%;
        left:5%;
        width:90%;
        border-bottom: 1px solid black;
    }
    .article-area{
        position: absolute;
        top:18%;
        height: 60%;
        left: 5%;
        width: 90%;
        border-bottom: 1px solid black; 
    }
    .articleNum-1{
        position: absolute;
        top:0%;
        height: 9%;
        left: 0%;
        width: 30%;
        background-color: black;
        color: white;
        font-size: 0.7vmax;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .code-1{
        position: absolute;
        top:0%;
        height: 9%;
        left: 30%;
        width: 5%;
        background-color: black;
        color: white;
        font-size: 0.7vmax;
        border-left: 1px solid white;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .originOffice-1{
        position: absolute;
        top:0%;
        height: 9%;
        left: 35%;
        width: 15%;
        background-color: black;
        color: white;
        font-size: 0.7vmax;
        border-left: 1px solid white;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .articleNum-2{
        position: absolute;
        top:0%;
        height: 9%;
        left: 50%;
        width: 30%;
        background-color: black;
        color: white;
        border-left: 1px solid white;
        font-size: 0.7vmax;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .code-2{
        position: absolute;
        top:0%;
        height: 9%;
        left: 80%;
        width: 5%;
        background-color: black;
        color: white;
        font-size: 0.7vmax;
        border-left: 1px solid white;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .originOffice-2{
        position: absolute;
        top:0%;
        height: 9%;
        left: 85%;
        width: 15%;
        background-color: black;
        color: white;
        font-size: 0.7vmax;
        border-left: 1px solid white;
        display: flex;
        align-items:center;
        justify-content:center;
    }
    .articleNum-1-area{
        position: absolute;
        top: 9%;
        height: 91%;
        left: 0%;
        width: 30%;
    }
    .articleNum-1-boxes{
        height: 9.75%;
        width:100%;
        border-top: 1px solid black; 
        border-right: 1px solid black; 
        text-align: left;
    }
    .articleNum-1-boxes input{
        position: absolute;
        width: 90%;
        border:none;
        height: 7%;
    }
    .code-1-area{
        position: absolute;
        top: 9%;
        height: 91%;
        left: 30%;
        width: 5%;
    }
    .code-1-boxes{
        height: 9.75%;
        width:100%;
        border-top: 1px solid black; 
        border-right: 1px solid black; 
        text-align: left;
    }
    .code-1-boxes input{
        position: absolute;
        width: 85%;
        left: 2%;
        border:none;
        height: 7%;
    }
    .originOffice-1-area{
        position: absolute;
        top:9%;
        height: 91%;
        left: 35%;
        width: 15%;
    }
    .originOffice-1-boxes{
        height: 9.75%;
        width:100%;
        border-top: 1px solid black; 
        border-right: 1px solid black; 
        text-align: left;
    }
    .originOffice-1-boxes input{
        position: absolute;
        width: 85%;
        left: 1%;
        border:none;
        height: 7%;
    }
    .articleNum-2-area{
        position: absolute;
        top: 9%;
        height: 91%;
        left: 50%;
        width: 30%;
    }
    .articleNum-2-boxes{
        height: 9.75%;
        width:100%;
        border-top: 1px solid black; 
        border-right: 1px solid black; 
        text-align: left;
    }
    .articleNum-2-boxes input{
        position: absolute;
        width: 90%;
        border:none;
        height: 7%;
    }
    .code-2-area{
        position: absolute;
        top: 9%;
        height: 91%;
        left: 80%;
        width: 5%;
    }
    .code-2-boxes{
        height: 9.75%;
        width:100%;
        border-top: 1px solid black; 
        border-right: 1px solid black; 
        text-align: left;
    }
    .code-2-boxes input{
        position: absolute;
        width: 85%;
        left: 2%;
        border:none;
        height: 7%;
    }
    .originOffice-2-area{
        position: absolute;
        top:9%;
        height: 91%;
        left: 85%;
        width: 15%;
    }
    .originOffice-2-boxes{
        height: 9.75%;
        width:100%;
        border-top: 1px solid black;  
        text-align: left;
    }
    .originOffice-2-boxes input{
        position: absolute;
        width: 85%;
        left: 1%;
        border:none;
        height: 7%;
    }
    .code-area{
        position: absolute;
        border-bottom: 1px solid black;
        top: 78%;
        height: 3%; 
        left: 5%;
        width: 90%;
    }
    .sig-area{
        position: absolute;
        top: 81%;
        left: 5%;
        width: 72%;
        height: 17%;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
    }
    
    .stamp-area{
        position: absolute;
        top: 81%;
        left: 73%;
        width: 23%;
        height: 17%;
        border-bottom: 1px solid black;
    }
    .stamp-area input{
        position: absolute;
        top:7%;
        left:20%;
        width: 80%;
        height: 80%;
    }
    .sig-area-top{
        position: absolute;
        top:0%;
        width: 100%;
        height: 60%;
        border-bottom: 1px solid black;
    }
    .date-of-delivery{
        position: absolute;
        top:0%;
        height: 50%;
        width: 30%;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
    }
    .date-of-delivery input{
        position: absolute;
        top: 15%;
        width: 150%;
        height: 175%;
        border: none;
    }
    .delivered-by{
        position: absolute;
        top:50%;
        height: 50%;
        width: 30%;
        border-right: 1px solid black;
    }
    .delivered-by input{
        position: absolute;
        top: 7%;
        width: 175%;
        height: 125%;
        border: none;
    }
    .recieved{
        position: absolute;
        top:0%;
        left:30%;
        height: 100%;
        width: 14%;
        border-right: 1px solid black;
    }
    .recieved-by{
        position: absolute;
        top:0%;
        left:44%;
        height: 50%;
        width: 56%;
        border-bottom: 1px solid black;
    }
    .recieved-by input{
        position: absolute;
        top: 7%;
        width: 400%;
        height: 125%;
        border: none;
    }
    .sig-of-agent{
        position: absolute;
        top:50%;
        left:44%;
        height: 50%;
        width: 56%;
        border-bottom: 1px solid black;
    }
    .sig-of-agent input{
        position: absolute;
        top: 7%;
        width: 400%;
        height: 85%;
        left: 110%;
        border: none;
    }
    .arrow-right {
        position: absolute;
        left: 70%;
        top: 20%;
        width: 50%;
        border-top: 2vmin solid transparent;
        border-bottom: 2vmin solid transparent;
        border-left: 2vmin  solid black;
    }
    .recieved-text{
        position: absolute;
        top:0;
        left:3%;
        right:40%;
        text-align: left;
        
    }
    .recieved-text input{
        position: absolute;
        width: 40%;
        height: 17%;
        border-right: none;
        border-top: none;
        border-left: none;
    }
    .sig-area-text{
        position: absolute;
    }
    .sig-area-bottom{
        position: absolute;
        top:60%;
        width: 100%;
        height: 40%;
    }
    .sig-area-bottom-left{
        position: absolute;
        height: 100%;
        width: 75%;
        border-right: 1px solid black;
        text-align: left;
    }
    .sig-area-bottom-left input{
        position: absolute;
        top: 40%;
        width: 95%;
        height: 50%;
        left: 0%;
        border: none;
    }
    .sig-area-bottom-right{
        position: absolute;
        height: 100%;
        left:75%;
        display: flex;
        align-items:center;
        justify-content:left;
    }
    .check-area{
        position: absolute;
        border-right: 1px solid black;
        height: 100%;
        width: 75%;
        text-align: left;
    }
    
    .bill-no{
        position: absolute;
        height: 100%;
        width: 25%;
        left: 75%;
        text-align: left;
    }
    .bill-no input{
        position: absolute;
        width: 80%;
        top: 30%;
        left:2%;
        height: 70%;
        border: none;
    }
    .certified{
        position: absolute;
        height: 100%;
        width: 15%;
    }
    .delivery-confirm{
        position: absolute;
        height: 100%;
        width: 15%;
        left: 15%;
    }
    .delivery-confirm input{
        position: absolute;
        top:0;
        right:10%;
    }
    .express-mail{
        position: absolute;
        height: 100%;
        width: 15%;
        left: 30%;
    }
    .recorded-delivery{
        position: absolute;
        height: 100%;
        width: 20%;
        left: 45%;
    }
    .return{
        position: absolute;
        height: 100%;
        width: 20%;
        left: 65%;
    }
    .return input{
        position: absolute;
        top:0;
        right:10%;
    }
    .sign{
        position: absolute;
        height: 100%;
        width: 15%;
        left: 85%;
    }
    .sign input{
        position: absolute;
        top:0;
        right:10%;
    }
    .bottom-text{
        position: absolute;
        top: 98%;
        left: 5%;
    }
</style>