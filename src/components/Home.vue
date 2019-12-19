<template>
	<div class="home">	
		<el-container>
			<el-header>				
				<el-row :gutter="20" justify="space-between">
					<el-col :span="16">
						<div class="logo">
							<img src="../assets/logo.png">
						</div>
					</el-col>
					<el-col class="header-right" :span="8">
						<el-button @click="exitBtn" type="danger" icon="el-icon-close" round  align="middle" justify="end">登出后台</el-button>
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
					<el-button size="mini" @click="toggle"  type="danger" icon="el-icon-s-fold"></el-button>
					<!-- 导航选项 -->
					<el-submenu :index="item.id+''" v-for="item in menuLists" :key="item.id">
						<template slot="title">
							<!-- 一级菜单标题图标 -->
							<i :class="listIcon[item.id]"></i>
							<span>{{item.authName}}</span>
						</template>
						<el-menu-item :index="subItem.path+''"  v-for="subItem in item.children" :key="subItem.id" >
							<template slot="title">
								<span>{{subItem.authName}}</span>
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
			flag:false,
			menuLists:[],
			listIcon:{
				125:"iconfont icon-yonghuguanli",
				103:"iconfont icon-quanxianguanli",
				101:"iconfont icon-xiazai",
				102:"iconfont icon-dingdanguanli",
				145:"iconfont icon-data_tool",
			}
	      }
		},
		// 生命周期函数，页面加载完成后，加载渲染内容数据
		created(){
			this.getMenulist();
		},
		methods:{
			toggle(){
				this.flag =! this.flag
			},
			// 退出后台事件
			exitBtn(){
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			// 获取数据侧边栏，列表数据项
			async getMenulist(){
				const {data:res} = await this.$http.get('menus');
				// console.log(res.data)
				if(res.meta.status != 200) return this.$message.error(res.meta.msg)
				this.menuLists = res.data;
			},
			// svaepath(){
			// 	window.sessionStorage.setItem("path",path)
			// 	this.path = path
			// }
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
		display: flex;
		justify-content: flex-end;
	}
	.header-right .el-button{
		margin: 10px 0;
	}
	.el-aside{
		height: 100%;
		background: #545c64;
	}
	.el-menu .el-button{
    	width: 100%!important;
		border-radius:0;
	}
	.el-menu .el-button i{
		font-size: 20px;
		color: #fff;
	}
	.iconfont{
		color:#fff;
		margin-right: 10px;
	}
	.el-menu{
		border-right: none!important;
	}
	.el-main{
		color:#000;
		background: #eee;
	}
</style>