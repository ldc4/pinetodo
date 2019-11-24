import Vue from 'vue'
import App from './App.vue'
import Api from './plugins/api'
import store from './store'

Vue.config.productionTip = false

Vue.use(Api)  // 注入API方法：this.$api

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
