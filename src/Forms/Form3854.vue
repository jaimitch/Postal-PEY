<template>
    <div class="outline">
        <div class="top-stamp1">
            <div class="stamp-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.topStamp1">
                <p class="bottom-text">Dispatching Office</p>
            </div>
        </div>
        <div class="right-area">
            <div class="stamp3-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.topStamp2">
                <p class="bottom-text">Dispatching Office</p>
            </div>
            <div  class="right-area-content">
                <div>
                    &emsp;Bill No.
                    <select v-model="formData.billNoRight">
                        <option value="231">231</option>
                        <option value="30">30</option>
                        <option value="260">260</option>
                        <option value="24">24</option>
                        <option value="33">33</option>
                        <option value="129">129</option>
                        <option value="144">144</option>
                        <option value=""></option>
                    </select>
                </div>
                <div> 
                    &emsp;A.M. Rte.<br> 
                    &emsp;& Fit. No. <input type="text" v-model="formData.amNo" disabled>
                </div>
                <div> 
                    &emsp;Jacket No. <input type="text" v-model="formData.jacketNoRight" disabled>
                </div>
                <div> 
                    &emsp;Lock No. <input type="text" v-model="formData.lockNoRight" disabled>
                </div>
                <div> 
                    &emsp;Rotary No. <input type="text" v-model="formData.rotaryNoRight" disabled>
                </div>
                <div> 
                    &emsp;Airmail <input type="text" v-model="formData.airmailRight" disabled>
                </div>
                <div> 
                    &emsp;Seal No. 
                    <select v-model="formData.sealNoRight">
                        <option value="43000277">43000277</option>
                        <option value="70948511">70948511</option>
                        <option value="H/C">H/C</option>
                        <option value="SEAL #62345678">SEAL #62345678</option>
                        <option value=""></option>
                    </select>
                </div>
                <div> 
                    &emsp;Received. 
                    <!-- <input type="text" v-model="formData.recieved"> -->
                    <select v-model="formData.recieved">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value=""> </option>
                        </select>
                    <div class="centered">
                        Articles described
                        on above-specified
                        bill from dispatching
                        office named in postmark
                    </div>
                </div>
                <div class="centered">
                    Receiving Clerks<br>
                    <select v-model="formData.recievingClerks[0]"> 
                        <option value="WIT: George Forrest">WIT: George Forrest</option>
                        <option value="WIT: Scott Sanders">WIT: Scott Sanders</option>
                        <option value="Kyle Dozier">Kyle Dozier</option>
                        <option value="WIT: Larry Brown">WIT: Larry Brown</option>
                        <option value=""></option>
                    </select>
                </div>
                <div class="centered">
                    <select v-model="formData.recievingClerks[1]"> 
                        <option value="WIT: George Forrest">WIT: George Forrest</option>
                        <option value="WIT: Scott Sanders">WIT: Scott Sanders</option>
                        <option value="Kyle Dozier">Kyle Dozier</option>
                        <option value="WIT: Larry Brown">WIT: Larry Brown</option>
                        <option :value="studentName">{{studentName}}</option>
                        <option value="Matthew L. Long">Matthew L. Long</option>
                        <option value=""></option>
                    </select>
                </div>
                
            </div>
        </div>
        <div class="top-left-area">
            <div class="top-left-inputs">
                <div>
                    &emsp;Lock No. <input type="text" v-model="formData.lockNo" disabled>
                </div>
                <div> 
                    Rotary No. <input type="text" v-model="formData.rotaryNo" disabled>
                </div>
                <div> 
                    Jacket No. <input type="text" v-model="formData.jacketNo" disabled>
                </div>
                <div> 
                    Control No. <input type="text" v-model="formData.controlNo" disabled>
                </div>
                <div> 
                    &emsp;Bill No. 
                    <select v-model="formData.billNo">
                        <option value="231">231</option>
                        <option value="30">30</option>
                        <option value="260">260</option>
                        <option value="24">24</option>
                        <option value="33">33</option>
                        <option value="129">129</option>
                        <option value="144">144</option>
                        <option value=""></option>
                    </select>
                </div>
                <div> 
                    Page No. 
                    <select v-model="formData.pageNo">
                        <option value="1X">1X</option>
                        <option value="2X">2X</option>
                        <option value="3X">3X</option>
                        <option value="4X">4X</option>
                        <option value="5X">5X</option>
                        <option value=""></option>
                    </select>
                </div>
                <div> 
                    Airmail <input type="text" v-model="formData.airmail" disabled>
                </div>
                <div> 
                    Seal No.
                    <select v-model="formData.sealNo">
                        <option value="43000277">43000277</option>
                        <option value="70948511">70948511</option>
                        <option value="H/C">H/C</option>
                        <option value="SEAL #62345678">SEAL #62345678</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
        </div>
        <div class="to-input"> 
            &emsp;To 
            <!-- <input type="text" id="fname" name="fname" class="to-input" v-model="formData.to"> -->
            <select class="to-input" v-model="formData.to">
                <option value="APO AE 09459" selected>APO AE 09459</option>

                <option value="AMT APO AE 09463">AMT APO AE  09463</option>
                <option value="AMF KENNEDY, NY 00300">AMF KENNEDY, NY  00300</option>
                <option value="APO AE 09824">APO AE  09824</option>
                <option value="APO AE 09459">APO AE  09459</option>
                <option value=""></option>
            </select>
            <br>
            <div class="to-text">
                (P.O. or R.P.O and Tr. No.)
            </div>
        </div>
        <div class="center-area">
            <div class="center-area-content1">
                <div class="centered-box">
                    Reg. No. Jacket, <br> Lock or Seal Nos.

                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;{{i}}
                    <select v-model="formData.itemNums[i]" class="box">
                        <option value="RB888122361US">RB888122361US</option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911755US">
                            RB300911755US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911756US">
                            RB300911756US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911757US">
                            RB300911757US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911758US">
                            RB300911758US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911760US">
                            RB300911760US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911761US">
                            RB300911761US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092210US">
                            RB707092210US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092211US">
                            RB707092211US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092212US">
                            RB707092212US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092213US">
                            RB707092213US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092214US">
                            RB707092214US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092215US">
                            RB707092215US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092216US">
                            RB707092216US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092217US">
                            RB707092217US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092218US">
                            RB707092218US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092219US">
                            RB707092219US
                        </option>
                        <option v-if="formData.billNo == 129" value="RB842320438US">RB842320438US</option>
                        <option v-if="formData.billNo == 129" value="RB842320439US">RB842320439US</option>
                        <option value="RB298302613US">RB298302613US</option>
                        <option value="RB339065331US">RB339065331US</option>
                        <option value="RB290770790US">RB290770790US</option>
                        <option value="RB309266140US">RB309266140US</option>
                        <option v-if="formData.billNo == 260 || formData.billNo == 231" value="RB218344488US">RB218344488US</option>
                        <option v-if="formData.billNo == 260 || formData.billNo == 231" value="RB143899161US">RB143899161US</option>
                        <option value="RB867092744US">RB867092744US</option>
                        <option value="RB102022763US">RB102022763US</option>
                        <option v-if="formData.billNo == 30" value="S/43000277">S/43000277</option>
                        <option v-if="formData.billNo == 30 || formData.billNo ==144" value="O/RB300911759US">
                            O/RB300911759US
                        </option>
                        <option v-if="formData.billNo == 260" value="S/70948511">S/70948511</option>
                        <option v-if="formData.billNo == 260" value="O/RB102022763US">O/RB102022763US</option>
                        <option v-if="formData.billNo == 260" value="O/RB298302613US">O/RB298302613US</option>
                        <option value="RB300911758US">RB300911758US</option>
                        <option v-if="formData.billNo == 231" value="RB621758502US">RB621758502US</option>
                        <option v-if="formData.billNo == 231" value="RB309266104US">RB309266104US</option>
                        <option v-if="formData.billNo == 144" value="SEAL #62345678">SEAL #62345678</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="center-area-content2">
                <div class="centered-box">
                    Office or ZIP of Origin. Use only for Jacket, Lock, or Seal Numbers. 
                    Not required fo individual Reg. Nos.
                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;
                    <select v-model="formData.itemOrigins[i]" class="box">
                        <option value="APO AE 09459">APO AE 09459</option>
                        <option value="MISSENT">MISSENT</option>
                        <option value="NOT RECEIVED">NOT RECEIVED</option>
                        <option v-if="formData.billNo == 30" value="APO AE 09459 - 2">APO AE 09459 - 2</option>
                        <option value="Should Read RB309266140US">Should Read RB309266140US</option>
                        <option value="Should Read RB309265340US">Should Read RB309265340US</option>
                        <option value="APO">APO</option>
                        <option value="AE 09459">AE 09459</option>
                        <option value="AMF KENNEDY NY 00300">AMF KENNEDY NY 00300</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="center-area-content3">
                <div class="centered-box">
                    Reg. No. Jacket, Lock or Seal Nos.
                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;{{i+15}} 
                    <!-- <input v-if="i <= 5" type="text" v-model="formData.itemNums[i+15]" class="box"> -->
                    <select v-model="formData.itemNums[i+15]" class="box">
                        <option value="RB888122361US">RB888122361US</option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911755US">
                            RB300911755US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911756US">
                            RB300911756US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911757US">
                            RB300911757US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911758US">
                            RB300911758US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911760US">
                            RB300911760US
                        </option>
                        <option v-if="formData.billNo == 24 || formData.billNo == 129" value="RB300911761US">
                            RB300911761US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092210US">
                            RB707092210US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092211US">
                            RB707092211US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092212US">
                            RB707092212US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092213US">
                            RB707092213US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092214US">
                            RB707092214US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092215US">
                            RB707092215US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092216US">
                            RB707092216US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092217US">
                            RB707092217US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092218US">
                            RB707092218US
                        </option>
                        <option v-if="formData.billNo == 33 || formData.billNo == 129" value="RB707092219US">
                            RB707092219US
                        </option>
                        <option v-if="formData.billNo == 129" value="RB842320438US">RB842320438US</option>
                        <option v-if="formData.billNo == 129" value="RB842320439US">RB842320439US</option>
                        <option value="RB298302613US">RB298302613US</option>
                        <option value="RB339065331US">RB339065331US</option>
                        <option value="RB290770790US">RB290770790US</option>
                        <option value="RB309266140US">RB309266140US</option>
                        <option v-if="formData.billNo == 260 || formData.billNo == 231" value="RB218344488US">RB218344488US</option>
                        <option v-if="formData.billNo == 260 || formData.billNo == 231" value="RB143899161US">RB143899161US</option>
                        <option value="RB867092744US">RB867092744US</option>
                        <option value="RB102022763US">RB102022763US</option>
                        <option v-if="formData.billNo == 30" value="S/43000277">S/43000277</option>
                        <option v-if="formData.billNo == 30 || formData.billNo ==144" value="O/RB300911759US">
                            O/RB300911759US
                        </option>
                        <option v-if="formData.billNo == 260" value="S/70948511">S/70948511</option>
                        <option v-if="formData.billNo == 260" value="O/RB102022763US">O/RB102022763US</option>
                        <option v-if="formData.billNo == 260" value="O/RB298302613US">O/RB298302613US</option>
                        <option value="RB300911758US">RB300911758US</option>
                        <option v-if="formData.billNo == 231" value="RB621758502US">RB621758502US</option>
                        <option v-if="formData.billNo == 231" value="RB309266104US">RB309266104US</option>
                        <option v-if="formData.billNo == 144" value="SEAL #62345678">SEAL #62345678</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="center-area-content4">
                <div class="centered-box">
                    Office or ZIP of Origin. Use only for Jacket, Lock, or Seal Numbers. 
                    Not required fo individual Reg. Nos.
                </div>
                <div v-for="i in 15" :key = i class="box">
                    &emsp;
                    <select v-if="i <= 5" v-model="formData.itemOrigins[i+15]" class="box" disabled>
                        <option value="APO AE 09459">APO AE 09459</option>
                        <option value="MISSENT">MISSENT</option>
                        <option value="NOT RECEIVED">NOT RECEIVED</option>
                        <option value="Should Read RB309266140US">
                            Should Read RB309266140US
                        </option>
                        <option value="Should Read RB309265340US">Should Read RB309265340US</option>
                        <option value="APO">APO</option>
                        <option value="AE 09459">AE 09459</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
        </div>
        <div class="bottom-area1">
            <div class="sub-area1">
                A total of 
                <!-- <input type="text" v-model="formData.totalArticlesSent"> -->
                <select v-model="formData.totalArticlesSent">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                </select>
                articles
                <br> sent by this dispatch
            </div>
            <div class="sub-area2">
                &emsp;Postmaster,
                <div class="witness">
                     &emsp;
                     <select v-model="formData.witnessSent">
                         <option value="WIT: George Forrest">WIT: George Forrest</option>
                         <option value="WIT: Scott Sanders">WIT: Scott Sanders</option>
                         <option value="Kyle Dozier">Kyle Dozier</option>
                         <option value="WIT: Larry Brown">WIT: Larry Brown</option>
                         <option value=""></option>
                     </select>
                </div>
                <div class="postmaster">
                     &emsp;
                     <!-- <input type="text" v-model="formData.postmasterSent"> -->
                     <select v-model="formData.postmasterSent"> 
                        <option value="Todd Edgar">Todd Edgar</option>
                        <option value="Anthony Smith">Anthony Smith</option>
                        <option value="Hark Smith">Hark Smith</option>
                        <option value="Leroy Brown">Leroy Brown</option>
                        <option value="Michael Turner">Michael Turner</option>
                        <option :value="studentName">{{studentName}}</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="sub-area3">
                <input type="text" v-model="formData.dispatchingClerk"> M.
                <br> Dispatching Clerk
            </div>
        </div>
        <div class="bottom-area2">
            <div class="sub-area1">
                A total of 
                <!-- <input type="text" v-model="formData.totalArticlesRecieved">  -->
                <select v-model="formData.totalArticlesRecieved">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value=""> </option>
                </select>
                articles
                <br> received in this dispatch
            </div>
            <div class="sub-area2">
                &emsp;Postmaster,
                <div class="witness">
                     &emsp;
                     <select v-model="formData.witnessRecieved">
                         <option value="WIT: George Forrest">WIT: George Forrest</option>
                         <option value="WIT: Scott Sanders">WIT: Scott Sanders</option>
                         <option value="Kyle Dozier">Kyle Dozier</option>
                         <option value="WIT: Larry Brown">WIT: Larry Brown</option>
                         <option :value="studentName">{{studentName}}</option>
                         <option value=""></option>
                     </select>
                </div>
                <div class="postmaster">
                     &emsp;
                     <!-- <input type="text" v-model="formData.postmasterRecieved"> -->
                     <select v-model="formData.postmasterRecieved"> 
                        <option value="Todd Edgar">Todd Edgar</option>
                        <option value="Anthony Smith">Anthony Smith</option>
                        <option value="Hark Smith">Hark Smith</option>
                        <option value="Leroy Brown">Leroy Brown</option>
                        <option value="Michael Turner">Michael Turner</option>
                        <option value="Kyle Dozier">Kyle Dozier</option>
                        <option :value="studentName">{{studentName}}</option>
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div class="sub-area3">
                <input type="text" v-model="formData.currentTime"> M.
                <br> Receiving Clerk
            </div>
        </div>
        <div class="bottom">
            &emsp;PS Form 3854, April 1985
        </div>
        <div class="bottom-stamp1">
            <div class="stamp-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.bottomStamp1">
                <p class="bottom-text">Receiving Office</p>
            </div>
        </div>
        <div class="bottom-stamp2">
            <div class="stamp2-inner">
                <p class="top-text">Postmark of</p>
                <input type="checkbox" v-model="formData.bottomStamp2">
                <p class="bottom-text">Receiving Office</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['item', 'studentName', 'studentPG'],
        data () {
            return{
                currentTime: 0,
                prevTime: 0,
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
        mounted(){
        },
        methods: {
            changeForm() {

                console.log("curent bill num:", )
                if(this.item.userCreated == true){
                    // this.item.articleCode = this.sigOfAgent
                    if(!this.item.articleCode.includes("created") && this.item.articleCode != '') {
                        this.formData.articleCode = "Bill #" + this.formData.billNo
                    }
                    else {
                        this.formData.articleCode = this.formData.billNo
                    }
                    
                }
                //this.changeBackText()
                if(this.backText == undefined){
                    this.backText = this.item.formInputs.backText
                }
                this.formData.backText = this.changeBackText()
                this.$emit('changeForm', this.formData)
            },
            changeBackText(){
                let string = ""
                for(let i = 1; i < this.formData.itemOrigins.length; i++){
                    string = string + " " + this.formData.itemOrigins[i]
                }
                //console.log(string)
                return string
            }
        },
        watch: {
            // whenever question changes, this function will run
            formData: {
                deep: true,
                handler: 'changeForm'
            },
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
    .top-left-area{
        position: absolute;
        top: 0;
        width: 70%;
        height: 17.5%;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        text-align: center;
        background-color: white;
    }
    .top-left-inputs{
        position: absolute;
        top: 10%;
        width: 100%;
        height: 17.5%;
        text-align: center;
        background-color: white;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        color: black;
        text-align: left;
        font-size: 1vmin;   
    }
    .top-stamp1{
        position: absolute;
        top: 0;
        left: 70%;
        width: 16%;
        height: 17.5%;
        border-bottom: 1px solid black;
        color: black;
    }
    .top-stamp1 input{
        position: absolute;
        top: 30%;
        left: 40%;
    }
    .stamp-inner{
        position: inherit;
        border: 1px solid black;
        top: 15%;
        left: 18%;
        height: 70%;
        width: 64%;
    }
    .stamp2-inner{
        position: inherit;
        border: 1px solid black;
        top: 15%;
        left: 87.5%;
        right: 10%;
        height: 75%;
        width: 11%;
    }
    .stamp3-inner{
        position: absolute;
        border: 1px solid black;
        top: 3%;
        left: 8%;
        height: 20%;
        width: 80%;
    }
    .stamp3-inner input{
        position: absolute;
        top: -10%;
        left: 30%;
    }
    .center-area{
        position: absolute;
        top: 20%;
        width: 86%;
        height: 60%;
        border-top: 1px solid black;
        text-align: center;
        background-color: white;
        display: grid;
        grid-template: column;
    }
    .right-area{
        position: absolute;
        top: 0%;
        left: 86%;
        height: 80%;
        border-left: 2px dotted black;
        width: 14%;
        display: flex;
        flex-direction: column;
        font-size: 1vmin;
        text-align: left;
    }
    .right-area-content{
        position: absolute;
        top: 25%;
        display: flex;
        flex-direction: column;
        font-size: 1vmin;
        text-align: left;
    }
    .right-area input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 45%;
    }
    .right-area select{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        font-size: 0.97vmin;
        width: 80%;
    }
    .bottom-area1{
        position: absolute;
        top: 80%;
        width: 70%;
        height: 7.5%;
        z-index: 1;
    }
    .bottom-area1 input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        text-align: right;
        width: 70%;
    }
    .bottom-area1 select{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .bottom-area2 input{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        text-align: right;
        width: 70%;
    }
    .bottom-area2 select{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .sub-area1{
        position: absolute;
        top: 5%;
        width: 25%;
        height: 100%;
        border-right: 1px solid black;
        font-size: 1vmin; 
    }
    .sub-area2{
        position: absolute;
        top: 5%;
        left: 25%;
        width: 55%;
        height: 100%;
        border-right: 1px solid black;
        font-size: 0.75vmax;
        text-align: left;
    }
    .sub-area2 input{
        position: relative;
        border-bottom: 2px dotted black;
        width: 80%;
        text-align: left;
        font-size: 1vmin;
        height: 40%;
        top:0%;
    }
    .sub-area2 select{
        position: relative;
        border-bottom: 2px dotted black;
        width: 80%;
        text-align: left;
        font-size: 1vmin;
        height: 60%;
        top:0%;
    }
    .witness{
        position: absolute;
        top: 20%;
        height: 30%;
        width: 100%;
    }
    .witness select{
        position: relative;
        border-top: none ;
        border-left: none;
        border-right: none;
        border-bottom: 2px dotted black;
        width: 80%;
        text-align: left;
        font-size: 1vmin;
        height: 100%;
        top:0%;
    }
    .postmaster{
        position: absolute;
        top: 50%;
        height: 50%;
        width: 100%;
    }
    .sub-area3{
        position: absolute;
        top: 5%;
        left: 80%;
        width: 20%;
        height: 100%;
        font-size: 1vmin;
        text-align: center;
    }
    .bottom-area2{
        position: absolute;
        top: 87.5%;
        width: 70%;
        height: 7.5%;
        border-top: 1px solid black;
        z-index: 1;
    }
    .bottom-stamp1{
        position: absolute;
        top: 80%;
        left: 70%;
        width: 16%;
        height: 15%;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 2px dotted black;
        color: black;
    }
    .bottom-stamp1 input{
        position: absolute;
        z-index: 30;
        top: 30%;
        left: 40%;
    }
    .bottom-stamp2{
        position: absolute;
        top: 80%;
        width: 100%;
        height: 14%;
        border-top: 1px solid black;
        color: black;
    }
    .bottom-stamp2 input{
        position: absolute;
        top: 30%;
        left: 40%;
    }
    .bottom{
        position: absolute;
        top:95%;
        width: 100%;
        border-top: 1px solid black;
        text-align: left;
        color: black;
        font-size: 0.75vmax;
    }
    .top-text{
        position: relative;
        text-align: center;
        font-size: 1vmin;
    }
    .to-text{
        position: relative;
        vertical-align: text-top;
        font-size: 1vmin;
        bottom: 10%;
        right: 20%;
        text-align: center;
    }
    .bottom-text{
        position: relative;
        font-size: 1vmin;
        text-align: center;
        top: 1vmin;
    }
    .top-left-area input[type=text] {
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 45%;
    }
    .top-left-area select {
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 45%;
    }
    .to-input {
        position: absolute;
        color: black;
        top: 12%;
        text-align: left;
        font-size: 1vmin;
        width: 100%;
    }
    .to-input select{
        border: none;
        border-bottom: 2px dotted black;
        position: relative;
        width: 30%;
    }
    .center-area input{
        position: relative;
        top:0;
        border:none;
    }
    .center-area select{
        position: absolute;
        top:-75%;
        width: 90%;
        height: 150%;
        border:none;
        appearance: none;
        background-color: transparent;
        border: none;
        padding: 0 1em 0 0;
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
    }
    .center-area-content1{
        position: absolute;
        top:0;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .center-area-content2{
        position: absolute;
        top:0;
        border-left: 1px solid black;
        border-right: 1px solid black;
        left: 25%;
        width: 24%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .center-area-content3{
        position: absolute;
        border-left: 1px solid black;
        left: 51%;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .center-area-content4{
        position: absolute;
        border-left: 1px solid black;
        left: 76%;
        width: 24%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .box{
        position: relative;
        border-bottom: 1px solid black;
        text-align: left;
        font-size: 1vmin;
    }
    .box input{
        position: absolute;
        top: -50%;
        height: 110%;
        width: 85%;
    }
    .centered{
        text-align: center;
        font-size: 0.75vmin;
    }
    .centered-box{
        text-align: center;
        border-bottom: 1px solid black;
        font-size: .80vmin;
        height: 8%;
    }
</style>