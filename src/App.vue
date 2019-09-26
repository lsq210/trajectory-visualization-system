<template>
  <div id="app">
    <div class="header">
      轨迹库可视化系统
    </div>
    <div class="aside">
      <div class="title">欢迎使用😀</div>
      <p>第一步：请选择用户 ID</p>
      <el-select v-model="selectedUserId" multiple placeholder="请选择一个或多个用户">
        <el-option
          v-for="item in options"
          :key="item.userId"
          :label="item.userId"
          :value="item.value">
        </el-option>
      </el-select>
      <p>第二步：请选择时间范围</p>
      <div class="subtitle">根据您的需求，从两种方法任选一种即可~</div>
      <el-tabs v-model="activeTime" type="border-card" style="width: 95%; margin-left: 5px;">
        <el-tab-pane label="滑动选择" name="first">
          <div class="subtitle">
            您所选择的用户有效时间是:<br>
            {{ timestampToTime(StartTime.getTime()) }} 至<br>
            {{ timestampToTime(EndTime.getTime()) }}
          </div>
          <el-slider
          v-model="timeRange"
          range
          :format-tooltip="timestampToTime"
          :min="StartTime.getTime()"
          :max="EndTime.getTime()">
          </el-slider>
        </el-tab-pane>
        <el-tab-pane label="手动输入" name="second">
          <div class="subtitle">
            您所选择的用户有效时间是:<br>
            {{ timestampToTime(StartTime.getTime()) }} 至<br>
            {{ timestampToTime(EndTime.getTime()) }}
          </div>
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
        </el-tab-pane>
      </el-tabs>
      <el-button round v-on:click="getUserInfor" style="margin-top: 10px">显示所选轨迹</el-button>
    </div>
    <div class="main">
      <baidu-map class="map" :center="{lat: 40, lng: 116.3}" :zoom="10" :scroll-wheel-zoom="true">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <div v-for="(user, userIndex) in userList"
        :key="`user-${userIndex}`">
          <bm-marker v-for="(point, pointIndex) in user[1]"
          :key ="`point-${pointIndex}`"
          :position="point"
          :icon="{
            url: require(`@/assets/坐标 (${userIndex}).png`), 
            size: {width: 25, height: 25},
            opts: {
              imageSize: {width: 25, height: 25}
            }
          }">
          </bm-marker>
          <bm-polyline
          :path="user[1]" 
          :stroke-color="colorList[userIndex]" 
          :stroke-opacity="0.5" 
          :stroke-weight="3" 
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
      timeRange: [new Date("2000-01-01 00:00:00").getTime(), new Date("2019-09-24 00:00:00").getTime()],
      activeTime: 'first',
      userList: [],
      polylinePath: [],
      colorList: ['red', 'yellow', 'green', 'blue', 'blue'],
      options: [
        {
          userId: 'user0000',
          value: 0
        },
        {
          userId: 'user0001',
          value: 1
        },
        {
          userId: 'user0002',
          value: 2
        },
        {
          userId: 'user0003',
          value: 3
        },
        {
          userId: 'user0004',
          value: 4
        }
      ]
    }
  },
  watch: {
    selectedUserId: function () {
      var timeList = []
      for(var i = 0; i < this.selectedUserId.length; i++){
        var times = allData[this.selectedUserId[i]][1].length
        var min = allData[this.selectedUserId[i]][1][0].time
        var max = allData[this.selectedUserId[i]][1][times - 1].time
        timeList.push(min)
        timeList.push(max)
      }
      /* eslint-disable */
      var maxN = timeList[0];
      var minN = timeList[0];
      for(var i=1;i<timeList.length;i++){
        var cur = timeList[i];
        cur>maxN ? maxN=cur : null;
        cur<minN ? minN=cur : null;
      }
      this.StartTime = new Date(minN)
      this.EndTime = new Date(maxN)
    }
  },
  methods: {
    getUserInfor: function () {
      var strIds = this.selectedUserId.toString()
      if(this.activeTime === 'first'){
        this.selectedStart = new Date(this.timestampToTime(this.timeRange[0]))
        this.selectedEnd = new Date(this.timestampToTime(this.timeRange[1]))
      }      
      /* eslint-disable */
      console.log('start', this.selectedStart, this.selectedEnd)
      userApi.getUserInfor(strIds, this.selectedStart, this.selectedEnd)
        .then(response => {
          this.userList = response.data.data
          console.log('userList', this.userList)
        })
        .catch(error => {
          console.error(error.message)
        })
    },
    timestampToTime: function(timestamp) {
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds())
      return Y+M+D+h+m+s
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
  text-align: center
}
.title {
  line-height: 3rem;
  border-bottom: 1px solid #a0a0a0;
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
.subtitle {
  font-size: 12px;
  color: #a0aaaa;
  margin-bottom: 1rem;
}
</style>
