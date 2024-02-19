<template>
  <div id="task_new">
    <el-button color="#705DEB" id="new_task1" @click="create_new_task">创建任务</el-button>
    <div id="taskx1">
      <h2 class="title_l">基础设置：</h2>
      <div id="task_name1">
        <label class="ev_lable">任务名称：</label>
        <input v-model="task_info.trip_name" class="input" />
        <label class="must1">*</label>
      </div>
      <div id="task_url">
        <label id="url_lable">输出地址：</label>
        <div id="jiashurukuang">
          <input v-model="task_info.trip_code" id="url_input" />
          <p id="url1">{{ url }}</p>
          <div id="url_bkg"></div>
          <label class="must2">*</label>
        </div>
      </div>
    </div>
    <div id="taskx2">
      <h2 class="title_l">数据源设置：</h2>
      <div id="bk1"></div>
      <el-radio-group size="small" id="radio1" v-model="selectedPanel">
        <el-radio label="zaixian" size="large" v-model="selectedPanel">在线数据</el-radio>
        <el-radio label="lixian" size="large" v-model="selectedPanel">离线数据</el-radio>
        <div id="line"></div>
      </el-radio-group>
      <div v-if="selectedPanel === 'zaixian'">
        <el-button color="#705DEB" id="add_url" @click="add_url()" v-if="selectedPanel == 'zaixian'">添加数据源</el-button>
        <div v-for="(item, index) in task_info.trip_source_list" id="url_list" :key="index">
          <div id="data_info">
            <label class="ev_lable" id="url_index">地址{{ index+1 }}：</label>
            <input v-model="item.source_url" class="input" id="data_url_input" />
            <div id="retry">
              <el-checkbox  v-model="item.retry" true-label="true" false-label="false"	 size="large" />
              <em id="zidongchonglian">自动重连</em>
              <em id="shanchu"  @click="delete_url(index)" >删除</em>
            </div>
            
          </div>
        </div>
      </div>
      <div v-else-if="selectedPanel === 'lixian'" id="lixian">
        <div id="jwd">
          <label id="name_lable">中心点坐标：</label>
          <label id="file_upload">文件上传：</label>
          <input v-model="task_info.trip_static_source_list[0].source_center_lon" class="input" id="lon" />
          <p id="douhao">,</p>
          <input v-model="task_info.trip_static_source_list[0].source_center_lat" class="input" id="lat" />
          <label class="must1">*</label>
          <el-upload class="upload-demo" id="upload" :show-file-list="true" drag :action="uploadip" :limit=1
            :on-success="handleSuccess" :on-remove="remove" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽或<em id="djsc">点击上传离线交通流文件</em>(.txt)
            </div>
          </el-upload>
        </div>
        <div id="uploadsuccess">
          <el-icon color="#705DEB" size="60" id="Finished">
            <Finished />
          </el-icon>
          <h3 id="file_name">{{ file_name }}</h3>
        </div>
        <label class="must3">*</label>
      </div>
    </div>
    <div id="taskx3" v-if="selectedPanel == 'zaixian'">
      <h2 class="title_l">频率规整：</h2>
      <!-- <div id="Issave">
        <el-switch v-model="task_info.is_send_period_ms" size="large" active-color="#705DEB" inactive-color="#000000" />
        <div id="line2"></div>
      </div> -->
      <div class="task_name1" id="task_name1x" v-if="task_info.is_send_period_ms">
        <label class="ev_lable"  id="bzzq">标准周期：</label>
        <input v-model="task_info.send_period_ms" class="input" id="pl" />
        <label class="ev_lable" id="ms">ms</label>
      </div>
    </div>
    <div id="taskx4" v-if="selectedPanel == 'zaixian'">
      <h2 class="title_l ">轨迹落盘：</h2>
      <div id="Issave">
        <el-switch v-model="task_info.is_dump" 	size="large" active-color="#705DEB" inactive-color="#000000" />
        <div id="line2"></div>
      </div>
      <label class="ev_lable" id="bcsj" v-if="task_info.is_dump">保存时间：</label>
      <input v-if="task_info.is_dump" v-model="task_info.dump_expire_day" class="input" id="day" />
      <label v-if="task_info.is_dump" class="ev_lable" id="tian">天</label>
    </div>
    <div id="taskx5">
      <h2 class="title_l">轨迹纠偏：</h2>
    </div>
    <div id="taskx6">
      <h2 class="title_l">轨迹调度：</h2>
      <div id="Issave">
        <el-switch v-model="task_info.space_query" size="large"  active-active-value="true"  inactive-value="false"	active-color="#705DEB" inactive-color="#000000" />
      <div id="line2"></div>
      </div>
    </div>
    <div id="task_last">
    </div>
  </div>
</template>  
  
<script setup>
import { ref, onMounted } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
let url = ref(0)

let file_name = ref("")
let task_info = ref(
  {
    "trip_source_list": [
      {
        "source_url": "",
        "source_protocol": "ws://",
        "enable": true,
        "retry": false
      }

    ],
    "trip_static_source_list": [
      {
        "source_file": "/upload/2024/01/27/4b395a51-712d-4b0a-9194-9dc5f0f53cc2.txt",
        "source_type": "",
        "source_center_lat": "",
        "source_center_lon": "",
        "loop_send": true
      }
    ],
    "trip_name": "",
    "trip_code": "",
    "enable": true,        //开启任务
    "space_query": false,  //是否开启空间查询
    "inactive_fix": false, //静止优化
    "turn_direction_fix": false,  //转向优化
    "fix_accuracy": "",       //优化级别 lane-车道 road-道路
    "fix_file": "",   //路网文件 fix_file
    "is_dump": "false",             //是否开启录制
    "dump_expire_day": "",         //有效时长
    "send_period_ms": "100",       //时间间隔
    "is_send_period_ms":"false"
  }
)
const selectedPanel = ref("zaixian")
let ip = window.location.hostname
let ws = `ws://${ip}:31000/ws/streamer/`
url.value = ws
let uploadip = `http://${ip}:31000/api/v1/common/upload`



//添加一个数据源地址
function add_url() {
  task_info.value.trip_source_list.push({
        "source_url": "",
        "source_protocol": "ws://",
        "enable": true,
        "retry": false
      })
}


//删除一个数据源地址
function delete_url(index){
  task_info.value.trip_source_list.splice(index,1)
}


//获取上传成功的回调之后，创建上传成功信息
function handleSuccess(response, file, fileList) {
  console.log(response); // 服务器返回的数据  
  console.log(file); // 上传的文件信息  
  console.log(fileList); // 上传的文件列表  
  file_name.value = file.name
  task_info.value.trip_static_source_list[0].source_file=response.data.file_url
  document.getElementById("uploadsuccess").style.display = "inline-block";
}

//删除已经上传的文件
function remove() {
  document.getElementById("uploadsuccess").style.display = "none";
}
onMounted(() => {
  var url1 = document.querySelector('#url1');
  var url_input = document.querySelector('#url_input');
  var url1tWidth = url1.offsetWidth;
  url_input.style.width = 880 - url1tWidth + "px";
  url_input.style.left = 20 + url1tWidth + "px";
  url_bkg.style.width = url1tWidth + 20 + "px"
})

</script>  
  
<style> 
#retry{
  position: absolute;
  top:-5px;
  left: 1010px;
  width:300px;
}
#shanchu{
  position: relative;
  left: 25px;
  top:-2px;
  color: rgb(122, 7, 7);
  cursor: pointer;
  font-style: normal;
  user-select: none;
  font-size: 15px;
}

#zidongchonglian{
  position: relative;
  left: 8px;
  top:-2px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-style: normal;
  user-select: none;
  font-size: 15px;
  

}
#data_info{
  position:relative;
  top: -45px;
  left:30px;
  width: 1200px;
  margin-top: 10px;
  user-select: none;

}
#data_url_input{
  position:relative;
  top: 0px;
  left: 26px;
}
#url_index{
  position:relative;
  top: 0px;
  left: 0px;
  width: 100px;

}

#task_name1x {
   position: absolute;
   left: 0px;
 }

 #Issave {
   position: absolute;
   top: 35px;
   left: 40px
 }

 #line2 {
   position: absolute;
   background-color: #494444;
   height: 80px;
   width: 2px;
   left: 80px;
   top: -25px;
 }

 #name_lable {
   color: white;
   font-size: 18px;
 }

 #bcsj {
   position: relative;
   top: 35px;
   left: 180px;
 }

 #bzzq {
   position: relative;
   top: 35px;
   left: 30px;

 }

 #tian {
   position: relative;
   top: 35px;
   left: 190px;
 }

 #day {
   position: relative;
   top: 35px;
   left: 180px;
   width: 50px;
 }

 #ms {
   position: relative;
   top: 35px;
   left: 38px;
 }

 #add_url {
   position: relative;
   top: -70px;
   left: 1130px;
 }

 #pl {
   position: relative;
   left: 30px;
   top: 35px;
   width: 50px;
 }

 #task_new {
   position: absolute;
   right: 0px;
   left: 256px;
   border-radius: 30px 0px 0px 30px;
   opacity: 1;
   background: #1C1E24;

 }

 #task_name1 {
   display: grid;
   align-items: center;
   position: relative;
   left: 30px;
   top: 15px;
   width: 1000px;
   height: 36px;

 }

 #task_url {
   display: grid;
   align-items: center;
   position: relative;
   left: 30px;
   top: 35px;
   width: 1000px;
   height: 36px;
 }

 .input {
   position: absolute;
   height: 30px;
   left: 90px;
   background-color: #000000;
   border-style: solid;
   border-color: #705DEB;
   border-radius: 5px;
   width: 900px;
   margin: auto;
   border-width: 1px;
   outline: none;
   color: white;
   font-size: 16px;
   font-weight: lighter;
   font-family: Arial, Helvetica, sans-serif;
 }

 #url_input {
   position: absolute;
   height: 30px;
   background-color: #000000;
   border-style: solid;
   border-color: #000000;
   font-family: Arial, Helvetica, sans-serif;
   top: 0px;
   border-top-right-radius: 4px;
   border-bottom-right-radius: 4px;
   margin: auto;
   border-width: 0px;
   outline: none;
   color: white;
   font-size: 16px;
   font-weight: lighter;
 }

 .ev_lable {
   position: relative;
   color: #ffffff;
   font-size: 18px;
   top: 0px;
   user-select: none;
 }

 #file_upload {
   position: absolute;
   color: #ffffff;
   font-size: 18px;
   top: 60px;
   left: 18px;
   user-select: none;
 }

 #url_lable {
   position: relative;
   color: #ffffff;
   font-size: 18px;
   top: 0px;
   user-select: none;
 }

 #taskx1 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   height: 120px;
   width: 1479px;
   border-radius: 10px;
   top: 100px;
   left: 80px;
 }

 #taskx2 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   width: 1479px;
   border-radius: 10px;
   min-height: 100px;
   margin-top: 100px;
   top: 100px;
   left: 80px;
 }

 #taskx3 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   width: 1479px;
   border-radius: 10px;
   min-height: 100px;
   margin-top: 100px;
   top: 100px;
   left: 80px;
 }

 #taskx4 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   width: 1479px;
   border-radius: 10px;
   min-height: 100px;
   margin-top: 100px;
   top: 100px;
   left: 80px;
 }

 #taskx5 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   width: 1479px;
   height: 200px;
   border-radius: 10px;
   min-height: 100px;
   margin-top: 100px;
   top: 100px;
   left: 80px;
 }

 #taskx6 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   width: 1479px;
   border-radius: 10px;
   min-height: 100px;
   margin-top: 100px;
   top: 100px;
   left: 80px;
 }

 #task_last {
   position: relative;
   width: 1479px;
   height: 30px;
   margin-top: 100px;
   top: 100px;
 }

 #url1 {
   position: absolute;
   top: 0px;
   line-height: 0px;
   left: 10px;
   color: #ffffff;

 }

 #url_bkg {
   background-color: #705DEB;
   width: 120px;
   height: 32px;
   border-top-left-radius: 3px;
   border-bottom-left-radius: 3px;
 }

 #jiashurukuang {
   position: absolute;
   top: 0px;
   left: 90px;
   height: 32px;
   background-color: #1C1E24;
   border-style: solid;
   border-color: #705DEB;
   border-radius: 5px;
   margin: auto;
   border-width: 1px;
   width: 904px;
 }

 .must1 {
   position: absolute;
   color: #ff0000;
   font-size: 18px;
   top: 6px;
   left: 1011px;
   user-select: none;
 }

 .must2 {
   position: absolute;
   color: #ff0000;
   font-size: 18px;
   top: 6px;
   left: 920px;
   user-select: none;
 }

 .must3 {
   position: absolute;
   color: #ff0000;
   font-size: 18px;
   top: 140px;
   left: 1011px;
   user-select: none;
 }

 .title_l {
   position: absolute;
   color: #ffffff;
   font-weight: normal;
   font-size: 22px;
   top: -60px;
   user-select: none;
   font-family: Arial, Helvetica, sans-serif;
 }

 #sjylx {
   position: relative;
   top: 5px;
   line-height: 0px;
   font-size: 18px;
   left: 30px;
 }

 #radio1 {
   position: absolute;
   left: 30px;
   top: 10px;

 }

 #data_laiyuan {
   position: relative;
   left: 30px;
   top: 10px;
   width: 1200px;
 }

 #line {
   position: absolute;
   top: 40px;
   width: 1200px;
   background-color: #494444;
   height: 2px;
   border-radius: 5px;
 }

 #jwd {
   display: grid;
   align-items: center;
   position: relative;
   top: 0px;
   height: 36px;

 }

 #lon {
   position: absolute;
   width: 420px;
   left: 110px;
 }
#douhao{
   position: absolute;
   left: 550px;
   color: #ffffff;
   font-size: 24px;
   font-family: Arial, Helvetica, sans-serif;
}
 #lat {
   position: absolute;
   width: 420px;
   left: 570px;
 }

 #bk1 {
   position: relative;
   width: 1200px;
   height: 80px;
   left: 30px;
   background-color: #1C1E24;
   margin: 0;
   padding: 0;
   border: none;
   box-sizing: border-box;

 }

 #lixian {
   position: relative;
   width: 1200px;
   height: 300px;
   left: 30px;
   background-color: #1C1E24;
   margin: 0;
   padding: 0;
   border: none;
   box-sizing: border-box;
 }

 .upload-demo {
   position: relative;
   width: 886px;
   top: 40px;
   left: 110px;
 }

 #djsc {
   color: #705DEB;
 }

 .dragging {
   background-color: #000000;

 }

 #uploadsuccess {
   position: absolute;
   height: 182px;
   width: 884px;
   background-color: #000000;
   top: 62px;
   left: 111px;
   border-radius: 5px;
   display: none;
 }

 #Finished {
   position: relative;
   top: 20%;
   left: 45%;
 }

 #file_name {
   position: relative;
   color: #ffffff;
   text-align: center;
   top: 20px;
 }

#new_task1{
  position: absolute;
  top: 50px;
  left: 1440px;
  width: 120px;
  height: 40px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  letter-spacing: 0.1em;

}
</style>

