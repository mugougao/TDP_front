<template>
  <div class="transflow">
    <h1 id="title">任务列表</h1>
    <el-button color="#705DEB" id="new_task" @click="task_setting_new">新建任务</el-button>
    <div v-for="(item, index) in items" id="list" :key="index">
      <div class="list_background">
        <p class="trip_name">{{ item.trip_name }}</p>
        <!-- 运行状态 -->
        <div class="enable_lighting" :style="{ background: item.color1 }"></div>
        <p class="enable">{{ item.enable }}</p>
        <!-- 获取输出地址 -->
        <el-icon id="link_icon" style="color: white" @click="get_url(index)">
          <Link />
        </el-icon>
        <p class="enable" id="url" @click="get_url(index)">获取输出地址</p>
        <!-- 修改设置 -->
        <el-icon id="setting_icon" style="color: white" @click="task_setting">
          <Operation />
        </el-icon>
        <p class="enable" id="setting" @click="task_setting(item.trip_id)">修改设置</p>
        <!-- 启停任务 -->
        <el-icon id="start_icon" :style="{ color: item.color2 }" @click="start_task(index, item.trip_id)">
          <component :is="item.icon" />
        </el-icon>
        <p class="enable" id="start" :style="{ color: item.color2 }" @click="start_task(index, item.trip_id)">{{
          item.start }}</p>
        <!-- 删除任务 -->
        <el-icon id="delete_icon" style="color: red" @click="delete_task(index, item.trip_id)">
          <Delete />
        </el-icon>
        <p class="enable" id="delete" @click="delete_task(index, item.trip_id)">删除任务</p>
      </div>
    </div>
    <div id="last_div"></div>
  </div>
</template>    
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import router from "@/router"
let url = window.location.hostname

function task_setting(trip_id) {
  router.push(`/transflowSetting?trip_id=${trip_id}`)
}
function task_setting_new() {
  router.push('/transflowSetting_new')
}
//进入页面后将左侧对应的按钮设置为紫色
document.getElementById("transflow").style.backgroundColor = "#705DEB"

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
    //添加一些相应参数控制HTML渲染对应的内容
    for (let i = 0; i < list.length; i++) {
      if (list[i].enable == true) {
        list[i].color2 = "#ffffff"
        list[i].color1 = "#705DEB"
        list[i].start = "暂停任务"
        list[i].enable = "运行中"
        list[i].icon = "VideoPause"
      }
      else if (list[i].enable == false) {
        list[i].color1 = "#ffffff"
        list[i].color2 = "#705DEB"
        list[i].start = "启动任务"
        list[i].enable = "未运行"
        list[i].icon = "VideoPlay"
      }
    }
    //将添加的参数加入原有的json后赋予已经声明的ref参数
    items.value = list

    // 返回解析后的数据  
  } catch (error) {
    // 抛出在尝试获取或解析数据时发生的任何错误  
    throw error;
  }
}


//删除任务
async function delete_task(index, trip_id) {
  //从ref响应参数重删除当前条目
  items.value.splice(index, 1)
  fetch(`http://${url}:31000/api/v1/trip/${trip_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('删除失败，请刷新页面后尝试:', error);
    });
}

//任务启停

async function start_task(index, trip_id) {
  console.log(items.value[index])
  let state = ""
  if (items.value[index].enable == "运行中") {
    console.log("我要关掉喽")
    state = "off"
  }
  else if (items.value[index].enable == "未运行") {
    console.log("我要启动喽")
    state = "on"
  }

  fetch(`http://${url}:31000/api/v1/trip/${trip_id}/${state}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('启停任务成功:', data)
      if (data.code == 40001) {
        ElMessage({
          message: '离线数据处理未完成请稍后再试',
          grouping: true,
          type: 'warning',
        })
      }
      else if (data.code == 200&state == "on") {
        ElMessage({
          message: '任务启动！',
          grouping: true,
          type: 'success',
        })
      }
      else if (data.code == 200&state == "off") {
        ElMessage({
          message: '任务暂停！',
          grouping: true,
          type: 'info',
        })
      }
      getList(url)
    })
    .catch(error => {
      console.error('启停任务失败，请刷新页面后尝试:', error);
    });

}

//获取地址
async function get_url(index) {
  const text = `ws://${url}:31000/ws/streamer/${items.value[index].trip_code}`
  const textarea = await document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  await document.execCommand('copy');
  document.body.removeChild(textarea);


  ElMessage({
    message: '数据输出地址已经复制到剪切板',
    grouping: true,
    type: 'info',
  })
}



//场景渲染时，调用获取列表函数，对场景进行初始化
getList(url)


</script>  
  
<style> .transflow {
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

 #url:hover {
   color: #3B3467;

 }

 #setting:hover {
   color: #3B3467;

 }

 #start:hover {
   color: #3B3467;

 }

 #delete:hover {
   color: #580404;

 }

 .list_background {
   position: relative;
   top: 0px;
   display: flex;
   left: 40px;
   width: 1573px;
   height: 55px;
   border-radius: 20px;
   opacity: 1;
   align-items: center;
   background: #0E1018;

 }

 .trip_name {
   position: relative;
   left: 60px;
   width: 300px;
   opacity: 1;
   color: white;
   user-select: none;
   font-family: Arial, Helvetica, sans-serif;

 }

 .enable_lighting {
   position: relative;
   left: 100px;
   opacity: 1;
   background: #705DEB;
   width: 12px;
   height: 12px;
   border-radius: 6px;
   user-select: none;
 }

 .enable {
   position: relative;
   left: 110px;
   opacity: 1;
   color: white;
   user-select: none;

 }

 #list {
   position: relative;
   margin-bottom: 15px;
   top: 130px;
 }

 #last_div {
   position: relative;
   width: 1479px;
   height: 30px;
   top: 120px;
   left: 80px;
 }

 #link_icon {
   left: 290px;
   cursor: pointer;
 }

 #url {
   left: 300px;
   cursor: pointer;
 }

 #setting_icon {
   left: 550px;
   cursor: pointer;
 }

 #setting {
   left: 560px;
   color: white;
   cursor: pointer;
 }

 #start_icon {
   left: 650px;
   cursor: pointer;
 }

 #start {
   left: 660px;
   color: #705DEB;
   cursor: pointer;
 }

 #delete_icon {
   left: 750px;
   cursor: pointer;
 }

 #delete {
   left: 760px;
   color: white;
   cursor: pointer;
 }

 #new_task {
   position: absolute;
   top: 60px;
   left: 1490px;
   width: 120px;
   height: 40px;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 16px;
   letter-spacing: 0.1em;
 }
</style>