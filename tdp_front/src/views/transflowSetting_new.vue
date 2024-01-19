<template>  
<div id="task_new">
 <div id="task_name">
    <label id="name_lable">任务名称：</label>
    <input v-model="task_name" id="name_input" />
 </div>   
</div>
</template>  
  
<script>  
// import { ref } from 'vue'
// let task_name=ref('1')
</script>  
  
<style>  
#task_new{
   position: absolute;
   right: 0px;
   left: 256px;
   top: 0px;
   height: 100%;
   border-radius: 30px 0px 0px 30px;
   opacity: 1;
   background: #1C1E24;


}
#task_name{
    position: absolute;
    left: 100px;
    top: 40px;
    width: 400px;

}
#name_input{
    height: 40px;
    background-color:#1C1E24 ;
    
    
}
</style>

