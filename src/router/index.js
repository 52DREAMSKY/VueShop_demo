import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'

const routes = [
	{path:'/',redirect:'/login'},
	{path:'/login',component:login},
	{
		path:'/home',
		component:Home,
		redirect:'/welcome',
		children:[
			{path:'/welcome',component:Welcome},
			{path:"/user",component:User},
		]
	},
]

const router = new VueRouter({
  routes
})

export default router;