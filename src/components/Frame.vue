<template>
<div>
    <div class="frame">
      {{ this.currentPage }} 
      <PageNav/>
  </div>
</div>
  
</template>

<script>

import PageNav from '../Navigation/PageNav.vue'

export default {
  name: 'Frame',
  components: {
      PageNav,

  },
  data() {
        return {

        }
    },
    computed: {
        currentPage() {
            return this.$store.state.pageNum;
        }
    },
        
}
</script>

<style scoped>
.frame{
    position: absolute;
    top: 5%;
    left: 10%;
    width: 80%;
    height: 95%;
    z-index: 1;
    /* overflow: scroll; */
    font-family: Arial, Helvetica, sans-serif;
    background-color: #3F3F3F;
}
</style>
