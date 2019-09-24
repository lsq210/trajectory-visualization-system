import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'EaRu4rpgUguMflr8UTqGxuISMOdAV0Lc'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
