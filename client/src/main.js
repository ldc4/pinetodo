import Vue from 'vue'
import App from './App.vue'
import Api from './plugins/api'

Vue.config.productionTip = false

Vue.use(Api)  // 注入API方法：this.$api

new Vue({
  render: h => h(App),
}).$mount('#app')
