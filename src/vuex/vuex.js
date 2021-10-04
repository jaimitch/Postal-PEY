import { createStore } from 'vuex'

const store = createStore({
    state: {
        pageNum: 1,
        stamping: false
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