<template>
    <!-- Holds the hamburger menu -->

<div>
    <!-- "@click" handler uses the  "drawerVisible" property.  It's set to true so that when the menu is clicked the menu drawer 
    will pop out. -->
      <div class="toggle" @click="drawerVisible = true"><div></div></div>
   

<!-- Holds the drawer with the menu options. -->
<div class="top-bar" />
<div class="title-left">Registered Mail PE-X</div>
<img src="../../public/logo-postal-seal.png" class="seal">
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
          <div :key="section" v-for="section in situations">
            <!-- comment this div if you want to turn on the sit nav buttons -->
            <div v-if="section.clickable === false" >
              <button class="buttons" @click="jumpToPage(section.page), $emit('jump')">{{ section.name }}</button>
            </div>
            <div v-else>
              <!-- disable this in final product -->
              <button class="disabled" @click="jumpToPage(section.page), $emit('jump')" >{{ section.name }}</button>
            </div>
          </div>
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
    props: ["pageErrors"],
    data () {
      return {
        drawerVisible: false,
        situations: [{name: 'Situation 1', page: 1, clickable: this.pageErrors[0]}, {name: 'Situation 2', page: 2, clickable: this.pageErrors[1]}, {name: 'Situation 3', page: 4, clickable: this.pageErrors[2]}, {name: 'Situation 4', page: 5, clickable: this.pageErrors[3]},{name: 'Situation 5', page: 9 , clickable: this.pageErrors[4]}, {name: 'Situation 6', page: 11, clickable: this.pageErrors[5]},],
        }
      
    },
    methods: {
        jumpToPage(num) {
            this.$store.commit('jumpToPage', num);
            console.log(this.pageErrors[0])
        }
    }

}


</script>

<style>
.seal {
  position: absolute;
  top:1vh;
  right:1vw;
  width: 8vmin;
  z-index: 100;
}
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
  top: 0px;
  left: 0px;
  z-index: 2;
  width: 3vw;
  height: 10vh; 
  background-color: #d5d5d5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0px;
  box-shadow: 1px 5px 5px black;
}
.top-bar {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100vw;
  height: 10vh; 
  background-color: #32334B;
  box-shadow: 1px 5px 5px black;
}
.buttons,.disabled {
  background-color: green;
  margin-bottom: 10px;
  padding: 1vw;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.disabled{
  background-color: #d5d5d5;
  color: #32334B;
}
.buttons:hover{
  background-color: #d5d5d5;
  color: #32334B;
}
.toggle > div {
  position: relative;
  width: 1.5vw;
  height: 3px;
  background-color:#42426A;
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
  height: 3px;
  background-color:#42426A;
}

.toggle > div:after {
  top: 10px;
}
.toggle{
  cursor: pointer;
}

.drawer-btn {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
  right: 0%;
  border: none;
  background-color: #32334B;
  color: #d5d5d5;
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
.title-left {
  position: absolute;
  top: 5vh;
  transform: translateY(-50%);
  left: 4vw;
  z-index: 2;
  font-size: 1.6vw;
  font-weight: bold;
  letter-spacing: .5vw;
}

</style>

