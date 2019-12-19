<template>
	<div id="add">
		<!--面包屑导航-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		  <el-breadcrumb-item>添加商品</el-breadcrumb-item>
		</el-breadcrumb>
		<!--卡片区域-->
		<el-card>
			<!--消失提示-->
			 <el-alert title="添加商品信息" type="info" center show-icon :closable='false'></el-alert>
			 <!--步骤条
			 	active控制当前进度项,从下标0开始
			 	align-center居中显示
			 	activeName需要是一个数值类型
			 	'0'- 0 = 0
			 -->
			 <el-steps :space="200" :active="activeName -0 " finish-status="success" align-center>
				  <el-step title="基本信息"></el-step>
				  <el-step title="商品参数"></el-step>
				  <el-step title="商品属性"></el-step>
				  <el-step title="商品图片"></el-step>
				  <el-step title="商品内容"></el-step>
				  <el-step title="完成"></el-step>
				</el-steps>
				<!--标签页
					activeName:字符串类型
				-->
				<el-form label-position='top' :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
					<el-tabs @tab-click='tabClick' :before-leave='beforLeave' :tab-position="'left'" v-model="activeName">
				    <el-tab-pane label="基本信息" name='0'>
				  			 <el-form-item label="商品名称" prop="goods_name">
								    <el-input v-model="addForm.goods_name"></el-input>
								 </el-form-item>
								 <el-form-item label="商品价格" prop="goods_price">
								    <el-input v-model="addForm.goods_price" type='number'></el-input>
								 </el-form-item>
								 <el-form-item label="商品重量" prop="goods_weight">
								    <el-input v-model="addForm.goods_weight" type='number'></el-input>
								 </el-form-item><el-form-item label="商品数量" prop="goods_number">
								    <el-input v-model="addForm.goods_number" type='number'></el-input>
								 </el-form-item>
								 <!--级联选择器-->
								 <el-form-item label="选择分类">
									 <el-cascader
									    v-model="addForm.goods_cat"
									    :options="cateList"
									    :props="cascaderProp"
									    @change="handleChange">
								   </el-cascader>
								 </el-form-item>
								 
				    </el-tab-pane>
				    <el-tab-pane label="商品参数" name='1'>
				    	<el-form-item :label="item.attr_name" v-for='item in manyCateList' :key='item.attr_id'>
									<el-checkbox-group v-model="item.attr_vals">
									    <el-checkbox border :label="list" v-for='(list,i) in item.attr_vals' :key='i'></el-checkbox>
									</el-checkbox-group>
							</el-form-item>
				    </el-tab-pane>
				    <el-tab-pane label="商品属性" name='2'>
				    	<el-form-item :label='item.attr_name' v-for='item in onlyCateList' :key='item.attr_i'>
				    		<el-input v-model='item.attr_vals'></el-input>
				    	</el-form-item>
				    </el-tab-pane>
				    <el-tab-pane label="商品图片" name='3'>
				    	<!--图片上传的组件
				    		action 地址:将来要上传的地址,后台api
				    	-->
				    	<el-upload
				    		:on-success='successFile'
				    		:headers='headerObj'
							  :action="activePath"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  list-type="picture">
							  <el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
				    </el-tab-pane>
				    <el-tab-pane label="商品内容" name='4'>
				    	<quill-editor v-model="addForm.goods_introduce"></quill-editor> 
				    	<el-button class='addBtn' type='primary' @click='add'>添加商品</el-button>
				    </el-tab-pane>
				  </el-tabs>
				</el-form>
		</el-card>
		
		<!--预览大图效果的对话框-->
		<el-dialog title="预览大图" :visible.sync="previewdialogVisible"
 			 width="50%">
		  <img :src="imgUrl" class='previewImg'/>
		</el-dialog>
	</div>
	
</template>

<script>
	//引入lodash
	import _ from 'lodash'
	export default {
		data(){
			return {
				//步骤条当前进度
				activeName:'0',
				//添加商品对象
				addForm:{
					goods_name:'',//商品名称
					goods_price:0,//商品价格
					goods_weight:0,//商品重量
					goods_number:0,//商品数量
					//分类列表
					goods_cat:[],
					pics:[],
					//商品介绍
					goods_introduce:'',
					attrs:[]
				},
				//检验规则
				addFormRules:{
					goods_name:[ { required: true, message: '请输入商品名称', trigger: 'blur' }],
					goods_price:[ { required: true, message: '请输入商品价格', trigger: 'blur' }],
					goods_weight:[ { required: true, message: '请输入商品重量', trigger: 'blur' }],
					goods_number:[ { required: true, message: '请输入商品数量', trigger: 'blur' }],
					
				},
				//级联选择器的配置
				cascaderProp:{
					expandTrigger:'hover',
					label:'cat_name',
					value:'cat_id',
					children:'children'
				},
				//所有商品分类
				cateList:[],
				//参数数据
				manyCateList:[],
				//属性数据
				onlyCateList:[],
				//上传路径
				activePath:'http://127.0.0.1:8888/api/private/v1/upload',
				//配置token
				headerObj:{
					Authorization:window.sessionStorage.getItem('token')
				},
			//	预览大图对话框的显示隐藏控制
				previewdialogVisible:false,
				//预览大图的url
				imgUrl:''
			}
		},
		methods:{
			//级联选择器发生改变的事件
			handleChange(){
				console.log(1)
				console.log(this.addForm.goods_cat)
				//只允许用户选择三级分类
				if(this.addForm.goods_cat.length !== 3){
					this.addForm.goods_cat = []
					return
				}
			},
			//获取商品的所有分类数据
			async getCateList(){
				const {data:res} = await this.$http.get('categories')
				if(res.meta.status !== 200){
					return this.$message.error('或是失败')
				}
				this.cateList = res.data;
				console.log(this.cateList)
			},
			//监听标签页发生切换
			beforLeave(activeName,oldActiveName){
				//console.log(activeName + '-----') //1 ,进入的标签页
				//console.log(oldActiveName + '+++++') //0 ,离开的标签页
				//return false;
				//判断用户是否选择了三级分类
				if(oldActiveName === '0' && this.addForm.goods_cat.length === 0){
					this.$message.info('请选择三级分类')
					return false;
				}
			},
			async tabClick(){
				//console.log('ok')
				console.log(this.activeName)
				if(this.activeName === '1'){//商品参数标签页
					const {data:res} = await this.$http.get(`categories/${this.getCateId}/attributes`,{
						params:{sel:'many'}
					})
					if(res.meta.status !== 200){
						return this.$message.error('获取失败')
					}
					//把字符串转成数组
					res.data.forEach( item=>{
						item.attr_vals = item.attr_vals.split(' ')
					})
					//console.log(res.data)
					this.manyCateList = res.data
				}else if(this.activeName === '2'){//商品属性标签页
					//console.log('okk')
					const {data:res} = await this.$http.get(`categories/${this.getCateId}/attributes`,{
						params:{sel:'only'}
					})
					if(res.meta.status !== 200){
						return this.$message.error('获取失败')
					}
					//console.log(res.data)
					this.onlyCateList = res.data;
				}
			},
			//移除上传的图片
			handleRemove(file){
				console.log('remove')
				console.log(file)
				//file.response.data.tmp_path ->临时路径
				const temPath = file.response.data.tmp_path
				//i是下标 ,x是数组的每一项
				const i = this.addForm.pics.findIndex( x => {
					//条件
					 x.pic == temPath 
				})
				this.addForm.pics.splice(i,1);
				
				console.log(this.addForm)
			},
			//点击上传图片列表
			handlePreview(file){
				//console.log('Preview')
				this.previewdialogVisible = true
			//	console.log(file);
				this.imgUrl = file.response.data.url
				
			},
			//图片上传成功后临时路径进行存储
			successFile(response){
				console.log(response)
				const picsObj = {
					pic:response.data.tmp_path
				}
				this.addForm.pics.push(picsObj)
				
				console.log( this.addForm )
			},
			//点击添加实现商品添加到数据库中
			add(){
				console.log('ok')
				//表单的预校验
				this.$refs.addFormRef.validate(async vali=>{
					if(!vali){
						return this.$message.error('请输入表单内容')
					}
					console.log('okk')
					//处理表单数据
					//this.addForm.good_cat转成以逗号分隔的字符串
					//不能直接操作addForm这个对象
					//我们可以把这个对象拷贝一个,操作这个拷贝的对象
					//两个对象就互不干扰
					//addForm 深拷贝 form
					const form = _.cloneDeep(this.addForm)
					//处理form中的goods_cat
					form.goods_cat = form.goods_cat.join(',');
					//attrs处理
					
					this.manyCateList.forEach( item => {
						const obj = {
							attr_id:item.attr_id,
							attr_value:item.attr_vals.join(' ')
						}
						this.addForm.attrs.push(obj)
					})
					
					this.onlyCateList.forEach( item => {
						const obj = {
							attr_id:item.attr_id,
							attr_value:item.attr_vals
						}
						this.addForm.attrs.push(obj)
					})
					
					form.attrs = this.addForm.attrs;
					console.log(form)
					//发送ajax
					
					const {data:res} = await this.$http.post('goods',form)
					if(res.meta.status !== 201){
						return this.$message.error('创建商品失败')
					}
					this.$message.success('创建成功');
					this.$router.push('/goods')
				})
			}
		},
		created(){
			this.getCateList()
		},
		computed:{
			getCateId(){
				if(this.addForm.goods_cat.length === 3){
					return this.addForm.goods_cat[2]
				}
			}
		}
	}
</script>

<style scoped>
	.el-steps {
		margin: 15px 0;
	}
	.el-checkbox {
		margin: 0 5px 0 0 !important;
	}
	/*设置预览大图占满对话框*/
	.previewImg{
		width: 100%;
	}
	.addBtn {
		margin-top: 10px;
	}
</style>