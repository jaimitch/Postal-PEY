<template>
  <div>
    <Frame v-bind:pageNum="this.$store.state.pageNum"/>
    <TLO/>
    <SituationNav v-on:jump="jumpPage()" :class="{'is-stamping': this.$store.state.stamping == true}"/>
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
  },
  computed: {
    vuexPageNum() {
      return this.$store.state.pageNum
    }
  }
}
</script>

<style scoped>
  .is-stamping{
    pointer-events: none;
  }
</style>
