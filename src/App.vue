<template>
  <div>
    <Frame 
      v-bind:pageNum="this.$store.state.pageNum"
      v-bind:changePage="change"
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
import pipwerks from './assets/scorm-api-wrapper.js';


export default {
  name: 'App',
  store,
  created() {
    window.addEventListener('beforeunload', this.handler);
    window.addEventListener('beforedestroy', this.removehandler);
  },
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
        change: 0,
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
      this.change++
    },
    changeError(data){
      this.pageErrors = data
    },
    changeKey(){
      this.navKey++
    },
    handler: function handler(event) {
      console.log(event)
       pipwerks.SCORM.save();
       pipwerks.SCORM.quit();
    },
    removehandler: function removehandler(event) {
      console.log(event)
       window.removeEventListener('beforeunload');
    },
    markScormPassed() { 
          pipwerks.SCORM.data.set("cmi.score.min", "0");
          pipwerks.SCORM.data.set("cmi.score.max", "100");
          pipwerks.SCORM.data.set("cmi.score.raw", "100");
          pipwerks.SCORM.data.set("cmi.score.scaled", "100");
          pipwerks.SCORM.data.set("cmi.success_status", "passed");
          pipwerks.SCORM.data.set("cmi.completion_status", "completed");
          pipwerks.SCORM.data.save();
          pipwerks.SCORM.quit();
          console.log('all lessons passed, scorm notified and terminated')
        },
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
* {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
