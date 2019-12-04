<template>
	<div class="login">
		<div class="login-box">
			<div class="login-img"><img src="../assets/avatar.jpg"/></div>
			
			<el-form class="login-el" :model="loginForm" :rules="loginRules" ref="loginRules" onsubmit="return false">
			  <el-form-item prop="username">
			    <el-input prefix-icon="iconfont icon-user_name" v-model="loginForm.username">
			    </el-input>
			  </el-form-item>
			  <el-form-item prop="password" >
			    <el-input prefix-icon="iconfont icon-password" v-model="loginForm.password" show-password ></el-input>
			  </el-form-item>
			  <el-row class="login-elrow">
				  <el-button type="danger" @click="denglu">提交</el-button>
				  <el-button type="info" @click="chongzhi">重置</el-button>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
// import { async } from 'q';
	export default {
		data(){
			return {
				loginForm:{
					username:'admin',
					password:'123456'
				},
				loginRules:{
					username: [
				        { required: true, message: '请输入用户名', trigger: 'blur' },
				        { min: 3, max: 12, message:'长度在 3 到 12个字符', trigger: 'blur' }
			        ],
			        password: [
			        	{ required: true, message: '请输入密码', trigger: 'blur' },
				        { min: 6, max: 18, message: '长度在 6到 18个字符', trigger: 'blur' }
			        ]
				}
			}
		},
		methods:{
			//登录事件
			denglu(){
//				进行预验证
				this.$refs.loginRules.validate( async valid => {
					// 输入正确之后结果是一个布尔值true
					// console.log(valid)
					
					// 验证错误 不等于返回的值 !valid
					if (!valid) return this.$message.error('登录失败，请重新登录');

					// 第一种写法
					// 如果我们上面通过了，本地预验证后，正式发送验证请求，与后台 api 进行验证
					// const res =  this.$http.post('login',this.loginForm);
					
					// this.$http.post('login',this.loginForm).then(function(res){
					// 	console.log(res)
					// })

					// es6 中 对象的解构赋值
					const {data:res} = await this.$http.post('login',this.loginForm);
					// console.log(res)
					// 验证这个用户名和密码是都是已经注册过了，如果没有注册，依然无法登录
					if( res.meta.status != 200 ) return this.$message.error(res.meta.msg);
					
					// 存储 token 秘钥到 本地临时存储 sessionStorage 
					window.sessionStorage.setItem('token',res.data.token);
					
					// 登录成功提示
					this.$message.success('登录成功(＾Ｕ＾)ノ~ＹＯ~~~~')
					
					// 登录成功了，跳转到 home 页面
			        this.$router.push('/home')
			    });
			},
			// 重置表单
			chongzhi(){
				this.$refs.loginRules.resetFields()
			}
		}
	}
</script>

<style>
	.login-box {
		width: 400px;
		height: 320px;
		background-color: #FFECEC;
	
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		border-radius: 10%;
	}
	.login-img {	
		position: absolute;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.login-img img {
		width: 100px;
		height: 100px;
		border: 1px solid #000;
		border-radius: 50%
	}
	.login-el {
		position: absolute;
		bottom: 20px;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;		
	}
	.login-elrow {
		display: flex;
		justify-content: center;
	}
</style>