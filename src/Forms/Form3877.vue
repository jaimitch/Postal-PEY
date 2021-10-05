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
                <input type="checkbox" class="checkboxes">
                <label>Adult Signature Required</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Adult Signature Restricted Delivery</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Certified Mail</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Certified Mail Restricted Delivery</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Collect on Delivery (COD)</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Insured Mail</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Priority Mail</label>
            </div>
            <div class="right-stamps">
                <input type="checkbox" class="checkboxes">
                <label>Priority Mail Express</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Registered Mail</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Return Reciept for Merchandise</label>
                <br>
                <input type="checkbox" class="checkboxes">
                <label>Signature Confirmation</label>
                <br>
                <input type="checkbox" class="checkboxes">
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
        </div>
        <div class="address-area">
            <div class="tracking-text">
                <p>Addressee (Name, Street, City, State, & ZIP Code™)</p>
            </div>
        </div>
        <div class="postage-area">
            <div class="tracking-text">
                
            </div>
        </div>
        <div class="pieces-sent">
            <div class="pieces-text">
                Total Number of Pieces
                Listed by Sender
                <input class="pieces-input">
            </div>
        </div>
        <div class="pieces-recieved">
            <div class="pieces-text">
                Total Number of Pieces
                Recieved at Post Office
                <input class="pieces-input">
            </div>
        </div>
        <div class="postmaster">
            Postmaster, Per (Name of receiving employee)
            <input class="postmaster-input">
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
    }
    .address-area{
        position: absolute;
        top: 27%;
        left: 25%;
        width: 26%;
        height: 66%;
        border: 1px solid black;
        border-top: none;
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
</style>