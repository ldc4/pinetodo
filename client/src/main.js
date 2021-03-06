import Vue from 'vue'
import App from './App.vue'
import Api from './plugins/api'
import Message from './plugins/message'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(Api)  // 注入API方法：this.$api
Vue.use(Message)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
