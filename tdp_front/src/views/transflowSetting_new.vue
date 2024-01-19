<template>
    <div id="task_new">
        <div id="taskx">
            <div id="task_name1">
                <label id="name_lable">任务名称：</label>
                <input  id="name_input" />
            </div>
            <div id="task_url">
                <label id="url_lable">输出地址：</label>
                <div id="jiashurukuang">
                <input  id="url_input"/>
                <p id="url1">{{ url }}</p>
               </div>
            </div>
        </div>
    </div>
</template>  
  
<script setup>
 import { ref,onMounted } from 'vue'
let url= ref(0)
let ip=window.location.hostname
let ws=`ws://${ip}:31000/ws/streamer/`
url.value=ws

onMounted(() => {  
var url1 = document.querySelector('#url1');  
var url_input = document.querySelector('#url_input');  
var url1tWidth = url1.offsetWidth; 
url_input.style.width = 890-url1tWidth+"px";  
url_input.style.left = 10+url1tWidth+"px";  
})

</script>  
  
<style> 
 #task_new {
      position: absolute;
      right: 0px;
      left: 256px;
      top: 0px;
      height: 100%;
      border-radius: 30px 0px 0px 30px;
      opacity: 1;
      background: #1C1E24;


  }

  #task_name1 {
      position: absolute;
      left: 30px;
      top: 15px;
      width: 1000px;
      height: 36px;

  }

  #task_url {
      position: absolute;
      left: 30px;
      top: 70px;
      width: 1000px;
      height: 36px;
  }

  #name_input {
      position: absolute;
      height: 30px;
      background-color: #1C1E24;
      border-style: solid;
      border-color:#705DEB;
      border-radius: 5px;
      width: 900px;
      margin: auto;
      border-width: 1px;
      outline: none;
      color:white;
      font-size:16px;
      font-weight: lighter;
      font-family: Arial, Helvetica, sans-serif;
  }

  #url_input {
      position: absolute;
      height: 28px;
      background-color: #1C1E24;
      border-style: solid;
      border-color:#705DEBff;
      font-family: Arial, Helvetica, sans-serif;
      top: 2px;
      border-radius: 5px;
      margin: auto;
      border-width: 0px;
      outline: none;
      color:white;
      font-size:16px;
      font-weight: lighter;
  }

  #name_lable{
    position: relative;
    color: #ffffff;
    font-size: 18px;
    top:4px;
    user-select: none;
  }

  #url_lable{
    position: relative;
    color: #ffffff;
    font-size: 18px;
    top:4px;
    user-select: none;
  }

  #taskx{
    position: absolute;
    border-style: solid;
    border-color:#705DEB;
    border-width: 2px;
    height:120px;
    width:1479px;
    border-radius: 10px;
    top: 80px;
    left: 80px;
  }

  #url1{
    position: absolute;
    top:0px;
    line-height: 0px;
    left: 10px;
    color:#ffffff;

  }

  #jiashurukuang{
    position: absolute;
      top: 0px;
      left: 90px;
      height: 32px;
      background-color: #1C1E24;
      border-style: solid;
      border-color:#705DEB;
      border-radius: 5px;
      margin: auto;
      border-width: 1px;
      width: 904px;
  }
</style>

