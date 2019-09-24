<template>
  <div id="app">
    <div class="header">
      轨迹库可视化系统
    </div>
    <div class="aside">
      欢迎使用！
      <el-select v-model="selectedUserId" multiple placeholder="请选择用户 ID">
        <el-option
          v-for="item in options"
          :key="item.userId"
          :label="item.userId"
          :value="item.value">
        </el-option>
      </el-select>
      <p>时间范围</p>
      <p>起始时间 {{ `${StartTime.getFullYear()}年${month =(StartTime.getMonth() + 1).toString()}月${(StartTime.getDate()).toString()}日` }}</p>
      <p>结束时间 {{ `${EndTime.getFullYear()}年${month =(EndTime.getMonth() + 1).toString()}月${(EndTime.getDate()).toString()}日` }}</p>
      <el-date-picker
        v-model="selectedStart"
        type="datetime"
        placeholder="选择起始时间">
      </el-date-picker>
      <el-date-picker
        v-model="selectedEnd"
        type="datetime"
        placeholder="选择结束时间">
      </el-date-picker>
      <el-button round v-on:click="getUserInfor">显示所选轨迹</el-button>
    </div>
    <div class="main">
      <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="10">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <div v-for="(user, userIndex) in userList"
        :key="`user-${userIndex}`">
          <bm-marker v-for="(point, pointIndex) in user[1]"
          :key ="`point-${pointIndex}`"
          :position="point"
          :icon="{
            url: require(`@/assets/坐标 (${userIndex}).png`), 
            size: {width: 50, height: 50},
            opts: {
              imageSize: {width: 50, height: 50}
            }
          }">
          </bm-marker>
          <bm-polyline
          :path="user[1]" stroke-color="blue" 
          :stroke-opacity="0.5" 
          :stroke-weight="2" 
          :editing="false" >
          </bm-polyline>
        </div>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user.api.js'
import allData from './data.json'
export default {
  name: 'app',
  data () {
    return {
      selectedUserId: [],
      StartTime: new Date("2000-01-01 00:00:00"),
      EndTime: new Date("2019-09-24 00:00:00"),
      selectedStart: null,
      selectedEnd: null,
      userList: allData,
      polylinePath: [],
      options: [
        {
          userId: '00001',
          value: 0
        },
        {
          userId: '00002',
          value: 1
        },
        {
          userId: '00003',
          value: 2
        }
      ]
    }
  },
  watch: {
    selectedUserId: function () {
      for(var i = 0; i < this.selectedUserId.length; i++){
        var times = allData[this.selectedUserId[i]][1].length
        var min = allData[this.selectedUserId[i]][1][0].time
        var max = allData[this.selectedUserId[i]][1][times - 1].time    
        if(new Date(min) > this.StartTime){
          this.StartTime = new Date(min)
        }
        if(new Date(max) < this.EndTime){
          this.EndTime = new Date(max)
        }
      }
    },
    value: function () {
      /* eslint-disable */
      console.log(this.value)
    }
  },
  methods: {
    getUserInfor: function () {
      var strIds = this.selectedUserId.toString()
      userApi.getUserInfor(strIds, this.selectedStart, this.selectedEnd)
        .then(response => {
          /* eslint-disable */
          console.log(response.data)
        })
        .catch(error => {
          console.error(error.message)
        })
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0
} */
body {
  width: 100%;
  height: 100%;
  margin: 0
}
.header {
  border-bottom: 1px solid #a0a0a0;
  color: #333;
  text-align: center;
  line-height: 3.5rem;
  /* height: 9vh; */
}
.aside {
  width: 20vw;
  height: 90.5vh;
  float: left;
}
.main {
  width: 80vw;
  height: 90.5vh;
  float: left;
}
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin:0;
}
</style>
