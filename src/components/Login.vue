<template>
	<div class="login">
		<div class="login-box">
			<div class="login-img"><img src="../assets/logo.jpg"/></div>
			
			<el-form class="login-el" :model="loginForm" :rules="loginRules" ref="loginRules" onsubmit="return false">
			  <el-form-item prop="username">
			    <el-input prefix-icon="iconfont icon-user_name" v-model="loginForm.username">
			    	
			    </el-input>
			  </el-form-item>
			  
			  <el-form-item prop="password" >
			    <el-input prefix-icon="iconfont icon-password" v-model="loginForm.password" show-password ></el-input>
		
			  </el-form-item>
			  
			  <el-row class="login-elrow">
				  
				  <el-button type="primary" @click="denglu">提交</el-button>
				
				  <el-button type="danger" @click="chongzhi">重置</el-button>
				</el-row>
							
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				loginForm:{
					username:'',
					password:''
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
				this.$refs.loginRules.validate((valid) => {
					
					
					console.log(valid)//输入正确之后结果是一个布尔值true
			          if (!valid) {
			          	return this.$message.error('登录失败，请重新登录')		            
			          } 
			         
			         this.$message.success('登录成功~~~~~~~')	
			         this.$router.push('/home')
			    });
			},
			//重置
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
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>