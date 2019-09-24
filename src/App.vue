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
      <p>起始时间 {{ StartTime }}</p>
      <p>结束时间 {{ EndTime }}</p>
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
      <el-button round v-on:click="getUserInfor">显示</el-button>
    </div>
    <div class="main">
      <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
        <bm-marker v-for="(item, index) in points"
        :key ="`points-${index}`"
        :position="item">
        </bm-marker>
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
      points: [
        {
          lng: 116.404,
          lat: 39.915
        },
        {
          lng: 116.405,
          lat: 39.918
        }
      ],
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
