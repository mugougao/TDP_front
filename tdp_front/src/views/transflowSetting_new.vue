<template>
    <div id="task_new">
        <div id="taskx">
            <div id="task_name">
                <label id="name_lable">任务名称：</label>
                <input v-model="task_name" id="name_input" />
            </div>
            <div id="task_url">
                <label id="url_lable">任务地址：</label>
                <input v-model="task_name" id="url_input" />
            </div>
        </div>
    </div>
</template>  
  
<script>
// import { ref } from 'vue'
// let task_name=ref('1')
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

  #task_name {
      position: absolute;
      left: 30px;
      top: 15px;
      width: 400px;
      height: 36px;

  }

  #task_url {
      position: absolute;
      left: 30px;
      top: 70px;
      width: 400px;
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

  }
  #url_input {
      position: absolute;
      height: 30px;
      background-color: #1C1E24;
      border-style: solid;
      border-color:#705DEB;
      border-radius: 5px;
      width: 900px;
      margin: auto;
  }
  #name_lable{
    color: #ffffff;
    font-size: 18px;
    top:6px;
  }
  #url_lable{
    color: #ffffff;
    font-size: 18px;
  }
  #taskx{
    position: absolute;
    border-style: solid;
    border-color:#705DEB;
    height:120px;
    width:1479px;
    border-radius: 10px;
    top: 120px;
    left: 120px;
  }
</style>

