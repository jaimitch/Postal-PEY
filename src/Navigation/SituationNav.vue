<template>
    <!-- Holds the hamburger menu -->

<div>
    <!-- "@click" handler uses the  "drawerVisible" property.  It's set to true so that when the menu is clicked the menu drawer 
    will pop out. -->
      <div class="toggle" @click="drawerVisible = true"><div></div></div>
   

<!-- Holds the drawer with the menu options. -->
<div 
class="drawer"
:style="{
     width: drawerVisible? '10vw' : '0',
     paddingLeft: drawerVisible? '0' : '0',
  }">
  
  <div>
    <!-- "@click" event handler uses the drawerVisible property.  It is set to false to close the menu drawer when clicked. -->
  <button class="close" @click="drawerVisible = false">X
  </button>
  </div>
        <div  class="in-menu">
          <button class="buttons" @click="jumpToPage(section.page)" :key="section" v-for="section in situations" >{{ section.name }}</button>
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
  top: 0;
  left: 0;
  width: 0; 
  overflow: hidden;
  height: 100vh;
  background-color: #32334B ;
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
  left:7.25vw;
  border: none;
  background-color: #32334B ;
  color: white;
  margin: auto;
  width: 20%;
  height: 5vh;
  font-size: 1.25vmax;
  font-weight: bold;
  
}
.in-menu {
  position: absolute;
  top: 5vh;
  display: flex;
  flex-direction: column;
  width: 7vw;
  left: 1.5vw
}

.toggle {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 3vw;
  height: 50px; 
  background-color: #E71922;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0px;
  box-shadow: 1px 5px 5px black;
}
.buttons{
  background-color: #E71922;
  margin-bottom: 10px;
  padding: 5px;
  color: white;
  border-radius: 5px;
}
.toggle > div {
  position: relative;
  width: 1.5vw;
  height: 2px;
  background-color:#FFFF;
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
  background-color:#FFFF;
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
  background-color: #E71922;
  color: #FFFF;
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

