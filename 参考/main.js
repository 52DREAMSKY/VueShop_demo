import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/base.css'
//阿里图标库
import './assets/font/iconfont.css'

//引入elementUI库
import ElementUI from 'element-ui'
//elementUI库的样式文件
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios,用来发送ajax
import axios from 'axios'
//配置一下路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//有权限的api添加token
axios.interceptors.request.use( config =>{
		//为请求头,添加token验证Authorization字段
		//console.log(config)
		config.headers.Authorization = window.sessionStorage.getItem('token');
		return config;
});
//axios挂载到Vue实例的原型对象上,后面就是可以直接使用this.$http
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
