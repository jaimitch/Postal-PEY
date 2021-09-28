import { createStore } from 'vuex'

const store = createStore({
    state: {
        pageNum: 0,
        
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
        }
    }
})
  export default store;