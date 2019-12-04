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
				<el-button type='success' class='exitBtn' @click='homeExit'>退出登录</el-button>
				
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
					<el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :collapse="flag" :collapse-transition="false" router>
						<el-submenu :index="item.id + ''" v-for='item in menuLists' :key='item.id'>
							<template slot="title">
								<!--一级菜单的图标-->
								<i :class="iconObj[item.id]"></i>
								<!--一级菜单的文字内容-->
								<span>{{item.authName}}</span>
							</template>
							<el-menu-item :index="subItem.path" v-for='subItem in item.children' :key='subItem.id'>
								<template slot="title">
									<i class="el-icon-menu"></i>
									<span>{{subItem.authName}}</span>
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
				flag:false,
				//存储侧边栏列表的数据
				menuLists:[],
				iconObj:{
					125:'iconfont icon-yonghuguanli',
					103:'iconfont icon-quanxianguanli',
					101:'iconfont icon-Goodgoods',
					102:'iconfont icon-icon',
					145:'iconfont icon-icon-test'
				}
			}
		},
		created(){
				//调用获取数据的方法
				this.getMenuList()
		},
		methods:{
			//页面加载完成就应该获取数据,发送ajax请求
			
			toggle(){
				this.flag = ! this.flag
			},
			//退出按钮事件
			homeExit(){
				//清除本地存储的token
				window.sessionStorage.clear();
				//让页面到login
				this.$router.push('/login');
			},
			//获取数据的方法
			async getMenuList(){
				const {data:res} = await this.$http.get('menus')
				console.log( res.data )
				if(res.meta.status != 200) return this.$message.error(res.meta.msg)
				this.menuLists = res.data;
			}
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
		position: relative;
	}
	.exitBtn {
		position: absolute;
		right: 20px;
		top: 10px;
	}
	.iconfont  {
		margin-right: 5px;
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