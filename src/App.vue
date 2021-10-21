<template>
  <div>
    <Frame 
      v-bind:pageNum="this.$store.state.pageNum"
      @errorChange="changeError($event, data)"
    />
    <TLO/>
    <SituationNav 
      v-on:jump="jumpPage()" 
      :class="{'is-stamping': this.$store.state.stamping == true}"
      v-bind:pageErrors="this.pageErrors"
      :key="navKey"
    />
  </div>
</template>

<script>
import Frame from './components/Frame.vue'
import SituationNav from './Navigation/SituationNav.vue'
import store from './vuex/vuex.js'
import TLO from './components/TLO.vue'

export default {
  name: 'App',
  store,
  data() {
    return {
      globalPageNum: this.vuexPageNum,
      pageErrors: [
          true,
          true,
          true,
          true,
          true,
          true,
        ],
        navKey: 0,
    }
  },
  components: {
    Frame,
    SituationNav,
    TLO
  },
  methods: {
    jumpPage() {
      console.log("jump page")
    },
    changeError(data){
      this.pageErrors = data
    },
    changeKey(){
      this.navKey++
    }
  },
  computed: {
    vuexPageNum() {
      return this.$store.state.pageNum
    }
  },
  watch: {
        // whenever question changes, this function will run
        pageErrors: {
            deep: true,
            handler: 'changeKey'
       },
    },
}
</script>

<style scoped>
  .is-stamping{
    pointer-events: none;
  }
</style>
