import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Goodslist from '../components/goods/Goodslist.vue'
import Params from '../components/goods/Params.vue'


const routes = [
	{path:'/',redirect:'/login'},
	{path:'/login',component:login},
	{
		path:'/home',
		component:Home,
		redirect:'/welcome',
		children:[
			{path:'/welcome',component:Welcome},
			{path:"/users",component:Users},
			{path:"/rights",component:Rights},
			{path:"/roles",component:Roles},
			{path:"/categories",component:Cate},
			{path:"/goods",component:Goodslist},
			{path:"/params",component:Params},
		]
	},
]

const router = new VueRouter({
	routes
})

// 路由导航守卫
router.beforeEach((to,from,next)=>{
	// 如果是用户要登录login页面，没必要做任何验证，直接路由
	if(to.path == '/login') return next()
	// 获取 token 令牌
	const tokenStr = window.sessionStorage.getItem('token');
	if(!tokenStr) return next('/login')
	next();
})

export default router;