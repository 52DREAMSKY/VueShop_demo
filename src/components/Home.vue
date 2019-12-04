<template>
	<div class="home">	
		<el-container>
			<el-header>				
				<el-row :gutter="20" justify="space-between">
					<el-col :span="16">
						<div class="logo">
							<a href="welcome"><img src="../assets/logo.png"></a>
						</div>
					</el-col>
					<el-col class="header-right" :span="8">
					</el-col>	
				</el-row>

			</el-header>
			<el-container>
				<!--左边侧边栏-->
				<el-aside :width="flag?'64px':'200px'" >
					<div class="home-toggle" @click="toggle">

					</div>
					<el-menu 
					background-color="#545c64" 
					text-color="#fff" 
					active-text-color="#ffd04b" 
					:unique-opened="true" 
					:collapse="flag" 
					:collapse-transition="false" 
					router>
					<!-- 第一个导航选项 -->
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item index="users">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>用户列表</span>
						</template>
						</el-menu-item>
					</el-submenu>
					
					<!-- 第二个导航选项 -->
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item index="2-1">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>角色列表</span>
						</template>
						</el-menu-item>
						<el-menu-item index="2-2">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>权限列表</span>
						</template>
						</el-menu-item>
					</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<!-- 展示子路由界面 -->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
			flag:false
	      }
		},
		methods:{
			toggle(){
				this.flag =! this.flag
			}
		}
  }
</script>
<style>
	.home {
		width: 100%;
		height: 100%;
		background-color:#F2F6FC;
	}
	.home-box{
		width: 300px;
		height: 300px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.el-container{
		color:#fff;
		height: 100%;
	}
	.el-header{
		height: 100%;
		background-image: linear-gradient(to right, #F56C6C , #fbc4bd);
	}
	.header-title h1{
		margin: 14px 0;	
		margin-left: 20px;
	}
	.logo{
		width: auto;
		height: 50px;
		padding: 5px;
	}
	.logo img{
		width: auto;
		height: 45px;
		margin-top: 5px;
		background: none!important;
	}
	.header-right{
		/* text-align: right */
	}
	.el-aside{
		height: 100%;
		background: #545c64;
	}
	.el-menu{
		border-right: none!important;
	}
	.el-main{
		color:#000;
		background: #eee;
	}
</style>