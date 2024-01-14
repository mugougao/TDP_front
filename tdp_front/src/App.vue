<template>
  <body>
    <div id="background"></div>
    <div id="menu_background">
      <div id="timlogo">
        <img src="@/assets/timlogo.png" style="width:100%; height:100%" alt="timlogo">
      </div>
      <button id="transflow" @click="buttenclik">交通流数据处理工具箱</button>
      <button id="station" @click="buttenclik">公路桩号坐标计算工具箱</button>
    </div>
  </body>
</template>

<script setup>
import router from "@/router"
 function buttenclik() {
  const clickedbuttenId = event.target.id;
  
if(clickedbuttenId=="transflow"){
  router.push('/')
}
else if(clickedbuttenId=="station"){
  router.push('/station')
}
}
</script>

<style>
body {
  background-color: #0E1018;
}

#background {
  position: absolute;
  right: 0px;
  left: 256px;
  top: 0px;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
  opacity: 1;

  background: #1C1E24;
}

#menu_background {
  position: absolute;
  left: 0%;
  top: 0px;
  width: 256px;
  height: 100%;
  opacity: 1;
}

#timlogo {
  position: absolute;
  left: 10%;
  top: 21px;
  width: 80%;
  opacity: 1;
}

#transflow {
  position: absolute;
  text-align: left;
  text-indent: 20px;
  background-color: #1C1E24;
  border: none;
  height: 40px;
  left: 0%;
  top: 141px;
  width: 95%;
  opacity: 1;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 0px 10px 10px 0px;
}

 #transflow:hover {
  background-color: #3B3467;

}

 #transflow:focus {
  background-color: #705DEB;

} 

#station {
  position: absolute;
  text-align: left;
  text-indent: 20px;
  background-color: #1C1E24;
  border: none;
  left: 0%;
  top: 194px;
  height: 40px;
  width: 95%;
  opacity: 1;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  border-radius: 0px 10px 10px 0px;
}

 #station:hover {
  background-color: #3B3467;
}

#station:focus {
  background-color: #705DEB;

} 
</style>
