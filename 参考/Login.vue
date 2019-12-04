<template>
	<div id="login">
		<div class="login-content">
			<!--表单框里面的图片-->
			<div class="login-img"><img src="../assets/small.jpg" /></div>
			<!--表单内容
				form - item -input
				model数据绑定
				rules表单校验
			-->
			<el-form class="long-form" :model="loginForm" :rules="loginRule" ref="loginForm">
				<el-form-item prop="username">
					<!--<el-input prefix-icon="el-icon-user-solid"></el-input>-->
					<el-input prefix-icon="iconfont icon-icon_boss_fill" v-model="loginForm.username"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<!--<el-input prefix-icon="el-icon-lock"></el-input>-->
					<el-input prefix-icon="iconfont icon-password" v-model="loginForm.password"></el-input>
				</el-form-item>
				<el-form-item class="login-btns">
				  <el-button type="primary" @click='login'>登录</el-button>
				  <el-button type="info" @click='loginReset'>重置</el-button>
				</el-form-item>
			</el-form>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				loginForm:{
					username:'admin',
					password:'123456'
				},
				//校验规则的定义
				loginRule:{
					username:[
					//	required必须填     message提示信息    trigger事件,当失去焦点的时候
					 	{ required: true, message: '请输入用户名', trigger: 'blur' },
					// min最小长度   max最大长度  	
            { min: 3, max: 10, message: '长度在 3到 10个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6到 12个字符', trigger: 'blur' }
					]
				}
			}
		},
		methods:{
			//登录的事件
			login(){
				//先进性预验证
				this.$refs.loginForm.validate( async valid =>{
					console.log(valid) //结果是一个布尔值.true代表表单验证通过
					//if(!valid) return console.log('有错误')
					//给用户一个弹框信息
					//预验证失败
					if(!valid) return this.$message.error('登录失败了~~');
					//预验证成功
					//预验证通过的时候,我们再真正的发送ajax调用后台接口进行验证
					//const res = this.$http.post('login',this.loginForm);
					//第一种写法
					/*this.$http.post('login',this.loginForm).then(function(res){
						//console.log(res)
						console.log(res.data)
					})*/
					//第二种方式
					/*const res = await this.$http.post('login',this.loginForm)
					console.log(res.data)*/
					
					//es6中的对象解构赋值
					const {data:res} = await this.$http.post('login',this.loginForm)
					// console.log(res)
					// 我们要验证这个用户名和密码是都已经注册过了,如果没有注册依然不能登录
					if( res.meta.status != 200) return this.$message.error(res.meta.msg);
					// 我们还需要把这个唯一的token进行存储,使用会话(关闭浏览器就消失)
					window.sessionStorage.setItem('token',res.data.token);
					// 登录后我们才能让他进入下一个主页
					// 编程式导航,登录成功后让页面跳转到/home中
					this.$router.push('/home');
				});
			},
			//重置方法
			loginReset(){
				console.log(this.$refs.loginForm.resetFields())
			}
		}
	}
	console
	
</script>

<style scoped>
	#login {
		height: 100%;
		background-color: orange;
	}
	
	.login-content {
		width: 400px;
		height: 350px;
		background-color: #fff;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 10px;
	}
	
	.login-img {
		width: 150px;
		height: 150px;
		background-color: yellow;
		border-radius: 50%;
		padding: 10px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.login-img img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}
	.long-form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
	.login-btns {
		display: flex;
		justify-content: flex-end;
	}
</style>