<template>
    <!-- Holds the hamburger menu -->

<div>
    <!-- "@click" handler uses the  "drawerVisible" property.  It's set to true so that when the menu is clicked the menu drawer 
    will pop out. -->
      <button class="toggle" @click="drawerVisible = true"><div></div></button>
   

<!-- Holds the drawer with the menu options. -->
<div 
class="drawer"
:style="{
     width: drawerVisible? '20vw' : '0',
     paddingLeft: drawerVisible? '10px' : '0',
  }">
  
  <div>
    <!-- "@click" event handler uses the drawerVisible property.  It is set to false to close the menu drawer when clicked. -->
  <button class="close" @click="drawerVisible = false">X
  </button>
  </div>
        <div>
          <button @click="jumpToPage(section.page)" :key="section" v-for="section in situations" >{{ section.name }}</button>
        </div>   
  </div>
    
    <!-- Creates a "screen" over the page while the menu is open.  Will not allow any body or header elements to be selected
    while open.  "@click" event handler uses the drawerVisible property.  It is set to false to close the menu drawer whenever the
    space outside of the menu is clicked on. -->
    <div 
    class="drawer-mask"
    :style="{
        width: drawerVisible ? '100vw' : '0',
        opacity: drawerVisible ? '0.6' : '0',
      }"
      @click="drawerVisible = false">
      </div>
      <div class="pageCount">
    
      </div>
      </div>
      <!-- <Submit /> -->
</template>

<script>

export default {
    name: "SituationNav",
    data () {
      return {
        drawerVisible: false,
        situations: [{name: 'Situation 1', page: 0}, {name: 'Situation 2', page: 2}, {name: 'Situation 3', page: 3}, {name: 'Situation 4', page: 4},{name: 'Situation 5', page: 5}, {name: 'Situation 6', page: 6},],
        }
      
    },
    methods: {
        jumpToPage(num) {
            this.$store.commit('jumpToPage', num);
        }
    }

}


</script>

<style>

.drawer {
  position: absolute;
  top: 15.5%;
  left: 0;
  width: 0; 
  overflow: hidden;
  height: 70vh;
  padding-top: 5vw;
  padding-left: 0; 
  background-color: #3F3F3F;
  z-index: 200;
  transition: all 0.5s;
  overflow: scroll;
}

.drawer-mask {
  position: absolute;
  right: 0;
  top: 0;
  width: 0; 
  height: 100vh;
  background: #000;
  opacity: 0.3;
  z-index: 199;
  
}
.close {
  display: flex;
  flex-direction: column;
  align-content: left;
  justify-content: center;
  position: absolute;
  top:0%;
  right:0%;
  border: none;
  background-color: #222222;
  color: #EBAD1B;
  margin: auto; 
  padding: 3vh;
  margin: 0 0% 1vh 85%;
  width: 20%;
  height: 7vh;
  font-size: 1.25vmax;
  font-weight: bold;
  
}

.toggle {
  position: absolute;
  top: 15.5%;
  left: 0%;
  z-index: 1;
  width: 3.5vw;
  height: 3.5vw;
  /* padding: 1rem; */
  background-color: #3F3F3F;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

}

.toggle > div {
  position: relative;
  width: 1.5vw;
  height: 2px;
  background-color:#EBAD1B;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle > div:before,
.toggle > div:after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -10px;
  width: 1.5vw;
  height: 2px;
  background-color:#EBAD1B;
}

.toggle > div:after {
  top: 10px;
}

.drawer-btn {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
  right: 0%;
  border: none;
  background-color: #353535;
  color: #EBAD1B;
  margin: 5% auto;
  padding: 3vh;
  width: 70%;
  height: 2.5vh;
  font-size: 1vmax;
  text-align: center;
  
}

.drawer-btn2 {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
  right: 0%;
  border: none;
  background-color: #375542;
  color: #EBAD1B;
  margin: 5% auto;
  padding: 3vh;
  width: 70%;
  height: 2.5vh;
  font-size: 1vmax;
  text-align: center;
  
}

.drawer-btn:hover,.drawer-btn2:hover {
  background-color: #EBAD1B;
  color: black;
}
.pageCount {
    position: absolute;
    color: white;
    background-color: #333232;
    font-size: 2.2vmin;
    top: 94vh;
    right: 3.2vw;
    font-family: Arial, Helvetica, sans-serif;
}
.completion {
  position: absolute;
  left: 15vw;
  font-size: 1.5vw;
}
</style>

