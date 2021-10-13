import { createStore } from 'vuex'

const store = createStore({
    state: {
        pageNum: 1,
        stamping: false,
        answerKey: [
            {
                lockNo: "",
                rotaryNo: "",
                jacketNo: "",
                controlNo: "",
                billNo: "260",
                pageNo: "1X",
                airmail: "",
                sealNo: "",
                to: "APO AE 09459",
                billNoRight: "260",
                amNo: "",
                jacketNoRight: "",
                lockNoRight: "",
                rotaryNoRight: "",
                airmailRight: "",
                sealNoRight: "",
                recieved: "",
                recievingClerks: [],
                totalArticlesSent: "3",
                totalArticlesRecieved: "3",
                postmasterSent: "Anthony Smith",
                postmasterRecieved: "Student's",
                recievingClerk: "Current Time",
                dispatchingClerk: "0800",
                itemNums: ["", "S/70948511", "O/RB102022763US", "O/RB298302613US"],
                itemOrigins: ["", "AMF KENNEDY NY 00300"],
                topStamp1: true,
                topStamp2: true,
                bottomStamp1: true,
                bottomStamp2: true,
                witnessSent: "",
                witnessRecieved: ""
              }
        ]

    },
    mutations: {
        nextPage(state) {
            state.pageNum++;
        },
        prevPage(state) {
            state.pageNum--;
        },
        jumpToPage(state, num) {
            state.pageNum = num;
        },
        stamp(state){
            state.stamping = !state.stamping;
        }
    }
})
  export default store;