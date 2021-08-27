import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routers.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)

//创建路由
let router = new VueRouter({
  routes: Routes,
  mode: "history"
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
