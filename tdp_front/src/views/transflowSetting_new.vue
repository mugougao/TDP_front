<template>
  <div id="task_new">
    <div id="taskx1">
      <h2 class="title_l">基础设置：</h2>
      <div id="task_name1">
        <label id="name_lable">任务名称：</label>
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
        <el-radio label="lixian" size="large" v-model="selectedPanel" >离线数据</el-radio>
        <div id="line"></div>
      </el-radio-group>
      <div v-if="selectedPanel === 'zaixian'">
        <!-- Panel 1 的内容 -->
        <h3>This is Panel 1</h3>
      </div>
      <div v-else-if="selectedPanel === 'lixian'" id="lixian">
        <div id="jwd">
          <label id="name_lable">中心点坐标：</label>
          <label id="file_upload">文件上传：</label>
          <input v-model="task_info.trip_name" class="input" id="lon" />
          <label class="must1">*</label>
          <el-upload class="upload-demo" id="upload" :show-file-list="true" drag :action="uploadip" :limit=1   :on-success="handleSuccess"  :on-remove="remove"
            multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽或<em id="djsc">点击上传离线交通流文件</em>(.txt)
            </div>
          </el-upload>
        </div>
        <div id="uploadsuccess">
          <el-icon color="#705DEB" size="60" id="Finished"><Finished /></el-icon>
          <h3 id="file_name">{{ file_name }}</h3>
        </div>
        <label class="must3">*</label>
      </div>
    </div>
    <div id="taskx3">
      <h2 class="title_l">频率规整：</h2>
      <div id="plgz">
        <label id="name_lable">标准周期（ms）：</label>
        <input v-model="task_info.trip_name" class="input" id="bzzq" />
        <label class="must1">*</label>
      </div>
    </div>
    <div id="taskx4">
      <h2 class="title_l">轨迹落盘：</h2>
    </div>
    <div id="taskx5">
      <h2 class="title_l">轨迹纠偏：</h2>
    </div>
    <div id="taskx6">
      <h2 class="title_l">轨迹调度：</h2>
    </div>
    <div id="task_last">
    </div>
  </div>
</template>  
  
<script setup>
import { ref, onMounted } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
let url = ref(0)
let file_name=ref("")
let task_info = ref(
  {
    "trip_source_list": [

    ],
    "trip_static_source_list": [

    ],
    "trip_name": "",
    "trip_code": "",
    "enable": false,
    "space_query": false,  //是否开启空间查询
    "inactive_fix": false, //静止优化
    "turn_direction_fix": false,  //转向优化
    "fix_accuracy": "road",       //优化级别 lane-车道 road-道路
    "fix_file": "/tmp/123.txt",   //路网文件 fix_file
    "is_dump": false,             //是否开启录制
    "dump_expire_day": 0,         //有效时长
    "send_period_ms": 0           //时间间隔
  }
)
const selectedPanel = ref("zaixian")
let ip = window.location.hostname
let ws = `ws://${ip}:31000/ws/streamer/`
url.value = ws
let uploadip=`http://${ip}:31000/api/v1/common/upload`

function handleSuccess(response, file, fileList) {  
      console.log(response); // 服务器返回的数据  
      console.log(file); // 上传的文件信息  
      console.log(fileList); // 上传的文件列表  
      file_name.value=file.name
      document.getElementById("uploadsuccess").style.display="inline-block";
    }
function remove() {  
      document.getElementById("uploadsuccess").style.display="none";
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
  
<style> #task_new {
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

 #name_lable {
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
   left:18px;
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
   top: 200px;
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
   top: 300px;
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
   top: 400px;
   left: 80px;
 }

 #taskx5 {
   position: relative;
   border-style: solid;
   border-color: #705DEB;
   border-width: 2px;
   width: 1479px;
   border-radius: 10px;
   min-height: 100px;
   top: 500px;
   left: 80px;
 }
 #task_last {
   position: relative;
   width: 1479px;
   height: 30px;
   top: 500px;
   left: 80px;
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
   width: 880px;
   left: 110px;
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
 .upload-demo{
  position: relative;
  width: 886px;
  top: 40px;
  left: 110px;
 }
 #djsc{
  color: #705DEB;
 }

 .dragging{
  background-color: #000000;

 }
 #uploadsuccess{
  position: absolute;
  height:  182px;
  width: 884px;
  background-color: #000000;
  top: 65px;
  left:111px;
  border-radius: 5px;
  display: none;
 }

 #Finished{
  position: relative;
  top:  20%;
  left: 45%;
 }
 #file_name{
  position: relative;
  color: #ffffff;
  text-align: center;
  top: 20px;
 }
</style>

