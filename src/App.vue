<template>
  <div id="app">
    <div class="header">
      轨迹库可视化系统
    </div>
    <div class="aside">
      欢迎使用！
      <el-select v-model="selectedUser" multiple placeholder="请选择用户 ID">
        <el-option
          v-for="item in options"
          :key="item.userId"
          :label="item.label"
          :value="item.data">
        </el-option>
      </el-select>
      <el-button round v-on:click="print">显示</el-button>
    </div>
    <div class="main">
      <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
        <bm-marker :position="{lng: 116.404, lat: 39.915}">
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      selectedUser: [],
      options: [{
        userId: 1,
        data: [{
          day: 1,
          lat: 39.915,
          lng: 116.404,
        },{
          day: 1,
          lat: 39.917,
          lng: 116.404,
        }],
        label: '用户1'
      },{
        userId: 2,
        data: [{
          day: 2,
          lat: 39.915,
          lng: 116.404,
        },{
          day: 2,
          lat: 39.917,
          lng: 116.404,
        }],
        label: '用户2'
      }]
    }
  },
  methods: {
    print: function () {
      console.log(this.selectedUser)
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
