<template>
	<div id="list">
    <el-card>
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		
			<!--搜索添加栏目-->
			<el-row :gutter='20' class='searchRow'>
				<el-col :span='8'>
					 <el-input placeholder="请输入内容">
					    <el-button slot="append" icon="el-icon-search"></el-button>
					 </el-input>
				</el-col>
				<el-col :span='5'>
					<el-button type='primary' @click="AddList">添加商品</el-button>
				</el-col>
			</el-row>
			<!--表格展示商品-->
			<el-table :data='goodsList' border >
				<!--index(#)-->
				 <el-table-column type='index' label="#" width="60"></el-table-column>
				 <!--商品名称-->
				 <el-table-column prop="goods_name" label="商品名称"></el-table-column>
				 <!--商品价格(元)-->
				 <el-table-column prop="goods_price" label="商品价格(元)" width='120'></el-table-column>
				 <!--商品重量(千克)-->
				 <el-table-column prop="goods_weight" label="商品重量(千克)" width='120'></el-table-column>
				 <!--创建时间-->
				 <el-table-column prop="add_time" label="创建时间" width='160'></el-table-column>
				<!--操作(编辑和删除)-->
				 <el-table-column label="操作" width='140'>
				 	<el-button icon='el-icon-edit' type='primary' size='mini'></el-button>
				 	<el-button icon='el-icon-delete' type='warning' size='mini'></el-button>
				 </el-table-column>
			</el-table>
		</el-card>
		<!--分页-->
		 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//存储商品列表数据
				goodsList:[],
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:10
				},
				//总的页数
				total:0
			}
		},
		methods:{
			//获取商品列表数据
			async getGoodsList(){
				const {data:res} = await this.$http.get('goods',{
					params:this.queryInfo
				})
				//console.log(res.data)
				//获取失败判断并提示
				//获取成功
				this.total = res.data.total;
				this.goodsList = res.data.goods
				console.log(this.goodsList)
			},
			handleSizeChange(val){
				console.log(val)
					this.queryInfo.pagesize = val
					this.getGoodsList()
			},
			handleCurrentChange(val){
				console.log(val+ 'a')
				this.queryInfo.pagenum = val
				this.getGoodsList()
			},
			AddList(){
				this.$router.push("goods/add")
			}
		},
		created(){
			this.getGoodsList()
		}
	}
</script>

<style scoped>
	.searchRow {
		margin: 10px 0;
	}
	.el-pagination {
		margin: 10px 0;
	}
</style>