<template>
  <head>  
  <link rel="shortcut icon" href="/path/to/your/logo.png">  
  <link rel="icon" href="/path/to/your/logo.png">  
</head>
  <body>
    <div id="background"></div>
    <div id="menu_background">
      <div id="timlogo" @click="backhome">
        <img src="@/assets/timlogo.png" style="width:100%; height:100%" alt="timlogo">
      </div>
      <button id="transflow" @click="buttenclik">交通流数据处理工具箱</button>
      <button id="station" @click="buttenclik">公路桩号坐标计算工具箱</button>
      <button id="transflow_test" @click="buttenclik">交通流数据质量可视化工具</button>
    </div>
    <router-view/>
  </body>
  
</template>

<script setup>
import router from "@/router"
import { onMounted } from 'vue';
function buttenclik() {
  //获取点击元素的id
  const clickedbuttenId = event.target.id;
  //设置左侧菜单栏选项被选中时颜色变为紫色，同时其他选项回复原色
  if (clickedbuttenId == "transflow") {
    router.push('/transflow')
    document.getElementById("transflow").style.backgroundColor = "#705DEB"
    document.getElementById("station").style.backgroundColor = "#1C1E24"
    document.getElementById("transflow_test").style.backgroundColor = "#1C1E24"
  }
  else if (clickedbuttenId == "station") {
    router.push('/station')
    document.getElementById("station").style.backgroundColor = "#705DEB"
    document.getElementById("transflow").style.backgroundColor = "#1C1E24"
    document.getElementById("transflow_test").style.backgroundColor = "#1C1E24"
  }
  else if (clickedbuttenId == "transflow_test") {
    router.push('/transflow_test')
    document.getElementById("transflow_test").style.backgroundColor = "#705DEB"
    document.getElementById("station").style.backgroundColor = "#1C1E24"
    document.getElementById("transflow").style.backgroundColor = "#1C1E24"
  }
}

function backhome(){
  router.push('/')
  document.getElementById("transflow_test").style.backgroundColor = "#1C1E24"
    document.getElementById("station").style.backgroundColor = "#1C1E24"
    document.getElementById("transflow").style.backgroundColor = "#1C1E24"

}
//保证页面刷新时左侧菜单栏选项颜色不变化
onMounted(() => {
  let currentPageUrl = window.location.hash;
  if (currentPageUrl == "/transflow"|| currentPageUrl == "/transflowSetting") {
    document.getElementById("transflow").style.backgroundColor = "#705DEB"
  }
  else if (currentPageUrl == "/station") {
    document.getElementById("station").style.backgroundColor = "#705DEB"
  }
  else if (currentPageUrl == "/transflow_test") {
    document.getElementById("transflow_test").style.backgroundColor = "#705DEB"
  }
})




</script>

<style>
body,html {
  background-color: #0E1018;
  height:100%
}

#background {
  position: fixed;
  left: 256px;
  right: 0%;
  top: 0px;
  bottom:0px;
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
  cursor: pointer;
  opacity: 1;
}

#transflow {
  position: absolute;
  text-align: left;
  text-indent: 20px;
  background-color: #1C1E24;
  border: none;
  height: 40px;
  cursor: pointer;
  left: 0%;
  top: 141px;
  width: 95%;
  opacity: 1;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 0px 10px 10px 0px;
}




#station {
  position: absolute;
  text-align: left;
  text-indent: 20px;
  background-color: #1C1E24;
  border: none;
  left: 0%;
  cursor: pointer;
  top: 194px;
  height: 40px;
  width: 95%;
  opacity: 1;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  border-radius: 0px 10px 10px 0px;
}


#transflow_test {
  position: absolute;
  text-align: left;
  text-indent: 20px;
  background-color: #1C1E24;
  border: none;
  cursor: pointer;
  left: 0%;
  top: 247px;
  height: 40px;
  width: 95%;
  opacity: 1;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  border-radius: 0px 10px 10px 0px;
}



</style>
