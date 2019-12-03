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
				<el-aside width="200px">
					<el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
						
						<el-submenu index="1">
							<template slot="title">
								<!--一级菜单的图标-->
								<i class="el-icon-location"></i>
								<!--一级菜单的文字内容-->
								<span>用户管理</span>
							</template>
							<el-menu-item index="1-1">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>二级菜单1</span>
							</template>
							</el-menu-item>
							<el-menu-item index="1-2">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>二级菜单2</span>
							</template>
							</el-menu-item>
						</el-submenu>
						
						<!--第二个-->
						<el-submenu index="2">
							<template slot="title">
								<!--一级菜单的图标-->
								<i class="el-icon-location"></i>
								<!--一级菜单的文字内容-->
								<span>商品管理</span>
							</template>
							<el-menu-item index="2-1">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>二级菜单1</span>
							</template>
							</el-menu-item>
							<el-menu-item index="2-2">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>二级菜单2</span>
							</template>
							</el-menu-item>
						</el-submenu>
						
						
					</el-menu>
				</el-aside>
				<!--右边的主要内容区-->
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
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
	
	.el-main {
		background-color: #F5F2F0;
	}
</style>