import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
const routes = [
	{path:'/',redirect:'/login'},
	{path:'/login',component:login},
	{path:'/home',component:Home}
]

const router = new VueRouter({
  routes
})

export default router
