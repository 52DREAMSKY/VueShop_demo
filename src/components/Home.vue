<template>
	<div class="home">	
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-main>Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
			  
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
		color: #fff;
	}
	.el-header{
		background: #333;
	}
	.el-aside{
		background: #333;
	}
</style>