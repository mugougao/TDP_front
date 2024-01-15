<template>
  <div class="transflow">
    <h1 id="title">任务列表</h1>
    <div v-for="item in items" class="list">
      <div class="list_background">
      <div class="trip_name">{{ item.trip_name }}</div>
    </div>
    </div>
    </div>
</template>    
<script setup>
import { ref } from 'vue';

let url = window.location.hostname


let items = ref([]);
async function getList(url) {
  try {
    const response = await fetch(`http://${url}:31000/api/v1/trip?page_size=9999`);
    // 检查响应是否成功  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // 解析响应为JSON  
    const data = await response.json();
    let list = data.data.list;
    items.value = list
    // 返回解析后的数据  
  } catch (error) {
    // 抛出在尝试获取或解析数据时发生的任何错误  
    throw error;
  }
}
getList(url)
</script>  
  
<style> 
.transflow {
   position: absolute;
   right: 0px;
   left: 256px;
   top: 0px;
   height: 100%;
   border-radius: 30px 0px 0px 30px;
   opacity: 1;
   background: #1C1E24;

 }

 #title {
   position: absolute;
   font-size: 32px;
   left: 56px;
   top: 30px;
   color: white;
   font-family: Arial, Helvetica, sans-serif;
   font-weight: 520;
   user-select: none;
   letter-spacing: 10px;
 }


 .list_background {
   position: absolute;
   left: 40px;
   width: 1573px;
   height: 69px;
   border-radius: 20px;
   opacity: 1;
   background: #0E1018;

 }

 .list {
 margin-bottom: 20px;
 }
</style>