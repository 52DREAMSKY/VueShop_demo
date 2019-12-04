import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../public/login.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import ''
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);

// 配置 axios 
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 添加权限api的token

axios.interceptors.request.use( config =>{
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
});

// 挂载 axios 到Vue实例的原型对象上，可以直接使用, this.$http
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')