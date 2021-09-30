<template>
  <div class="background">
    <Frame/>
    <TLO/>
    <SituationNav/>
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
  components: {
    Frame,
    SituationNav,
    TLO
  }
}
</script>

<style scoped>
  .background{
    background-color: #32334B ;
  }
</style>
