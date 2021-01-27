import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/index.vue'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})
