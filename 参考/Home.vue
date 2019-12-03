<template>
	<div id="home">
		<!--基本布局-->
		<el-container>
			<!--头部内容-->
			<el-header>
				<div class="home-header">
					<img src="../assets/logo.jpg" class="home-logo" />
					<span>电商后天管理系统</span>
				</div>
			</el-header>
			<!--主体内容-->
			<el-container>
				<!--左边侧边栏-->
				<el-aside :width="flag?'64px':'200px'" >
					<!--添加一个收起打开侧边栏的盒子-->
					<div class="home-toggle" @click="toggle">|||</div>
					<!--unique-opened保持一个菜单的开启
						active-text-colo激活的文字颜色
						collapse水平折叠
						collapse-transition动画的开启关闭
						router 开启点击跳转路由模式
					-->
					<el-menu 
					background-color="#545c64" 
					text-color="#fff" 
					active-text-color="#ffd04b" 
					:unique-opened="true" 
					:collapse="flag" 
					:collapse-transition="false" 
					router>
						
						<el-submenu index="1">
							<template slot="title">
								<!--一级菜单的图标-->
								<i class="el-icon-location"></i>
								<!--一级菜单的文字内容-->
								<span>用户管理</span>
							</template>
							<el-menu-item index="user">
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>用户列表</span>
							</template>
							</el-menu-item>
						</el-submenu>
						
						<!--第二个-->
						<el-submenu index="2">
							<template slot="title">
								<!--一级菜单的图标-->
								<i class="el-icon-menu"></i>
								<!--一级菜单的文字内容-->
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
				<!--右边的主要内容区-->
				<el-main>
					<!--展示子路由界面-->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				flag:false
			}
		},
		methods:{
			toggle(){
				this.flag = ! this.flag
			},
		}
	}
</script>

<style scoped>
	#home {
		height: 100%;
		/*background-color: #999;*/
	}
	
	.el-container {
		height: 100%;
	}
	
	.el-header {
		background-color: orange;
		padding-left: 0;
	}
	
	.home-logo {
		height: 60px;
		width: 60px;
		border-radius: 50%;
	}
	
	.home-header span {
		font-size: 24px;
		color: #fff;
		vertical-align: top;
		line-height: 60px;
		margin-left: 30px;
	}
	
	.el-aside {
		background-color: skyblue;
	}
	.el-menu {
		border: none;
	}
	.home-toggle {
		font-size: 20px;
		color: #fff;
		text-align: center;
		line-height: 30px;
		cursor: pointer;
		letter-spacing: 0.2em;
		background-color: #222222;
	}
	.el-main {
		background-color: #F5F2F0;
	}
</style>