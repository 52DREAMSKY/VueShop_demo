<template>
	<div id="user">
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片-->
		<el-card>
		 	<!--搜索栏-->
		  <!--栅格系统-->
		  <el-row :gutter="60">
			  <el-col :span="10">
			  	<el-input placeholder="请输入内容">
				    <el-button slot="append" icon="el-icon-search"></el-button>
				  </el-input>
			  </el-col>
			  <el-col :span="6"> 
			  	<el-button type="primary">添加用户</el-button>
			  </el-col>
			</el-row>
		</el-card>
		<!--表格展示数据-->
		<el-table border stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="beizhu"
        label="备注">
      </el-table-column>
    </el-table>
		<!--分页功能-->
	</div>
</template>

<script>
	export default {
		data(){
			return {
				 tableData: [{
				 		name: '王小虎',
            date: '2016-05-02',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
          	name: '王小虎',
            date: '2016-05-04',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
          	name: '王小虎',
            date: '2016-05-01',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
          	name: '王小虎',
            date: '2016-05-03',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
			}
		}
	}
</script>

<style scoped>
	.el-card {
		margin: 10px 0;
	}
</style>