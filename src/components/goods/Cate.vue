<template>
    <div id="cate">
        <el-card>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 添加分类按钮 -->
            <el-row>
                <el-col :span="5">
                    <el-button class="addBtn" @click="addCate" type="danger">添加分类</el-button>
                </el-col>
            </el-row>
            <!-- 展示分类 -->
            <tree :expand-type="false" :selection-type="false" :data='cateList' :columns="columns" index-text="#" show-index :show-row-hover="false">
            <!-- 排序 -->
            <template slot='level' scope="scope">
                <el-tag type='warning' v-if="scope.row.cat_level===0">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
                <el-tag type="primary" v-else>三级</el-tag>
            </template>
            <!--是否有效-->
            <template slot="isOk" slot-scope="scope">
                <i class="el-icon-success" style="color: green;font-size: 20px;" v-if='scope.row.cat_deleted === false'></i>
                <i class="el-icon-error" style="color: orange;font-size: 20px;" v-else></i>
            </template>
            <!--操作-->
            <template slot="setting">
                <el-button type="danger" size="mini" class="el-icon-edit">编辑</el-button>
                <el-button type="info" size="mini" class="el-icon-delete">删除</el-button>
            </template>
            </tree>
            <!-- 分页展示 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="cateInfo.pagenum"
            :page-sizes="[1, 2, 3, 5]"
            :page-size="cateInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
        <el-dialog title="添加分类" @close="addCateClose" :visible.sync="addCatedialogVisible" width="40%">
            <el-form :model="addCateFrom" ref="addCateFormRef" :rules="addCateFormRules" label-width="100px">
                <!-- 父级分类下来选项 -->
                <el-form-item style="margin-right: 30px;" prop="cat_name" label="父级分类" >
                    <el-cascader clearable v-model="cascaderKeys" :options="parentCate"  @change="cascaderChange" :props="cascaderProps"></el-cascader>
                </el-form-item>  
                 <!-- 分类名称输入框 -->
                <el-form-item style="margin-right: 30px;"  prop="cat_name" label="分类名称" >
                    <el-input v-model="addCateFrom.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCatedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCate">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return {
            cateInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            cateList:[], // 分类列表的数据
            total:0, // 保存总的数据条数
            // 保存每条数据
            columns:[
                {
                    label: "分类名称",
                    prop:"cat_name",
                },
                {
                    label:"是否有效",
                    prop:"cat_deleted",
                    type:"template",
                    template:"isOk"
                },
                {
                    label:"排序",
                    prop: "cat_level",
                    type:"template",
            		template: 'level',
                },
                {
                    label:"操作",
                    type:"template",
            		template: 'setting',
                }
            ],
            addCateFrom:{
                // 分类名称
                cat_name:'',
                // 父级的id
                cat_pid: 0,
                // 层级 (一级、二级、三级)
                cat_level: 0
            },
            // 校验规则
            addCateFormRules:{
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ]
            },
            // 父级分类的数组
            cascaderKeys:[],
            // 配置下来联级选项内容
            cascaderProps:{
                checkStrictly:"true",
                expandTrigger:"hover",
                value:"cat_id",
                label:"cat_name",
                children:"children"
            },
            // 存储父级的分类
            parentCate:[],
            // 控制添加分类对话框
            addCatedialogVisible: false,
        }
    },
    methods:{
        //每页展示数据条数的改变
        handleSizeChange(val){
            //console.log(val)
            this.cateInfo.pagesize = val;
            this.getCateList();
        },
        //当前显示第几页
        handleCurrentChange(val){
            //console.log(val)
            this.cateInfo.pagenum = val;
            this.getCateList();
        },
        //获取商品分类数据的方法
        async getCateList(){
            const {data:res} = await this.$http.get('categories',{
                params:this.cateInfo
            })
            if(res.meta.status !== 200 ){
                return this.$message.error('获取失败')
            }
            // 将获取到的列表数据传入 cateList
            this.cateList = res.data.result;
            // 获取当前的总条目数传入 total
            this.total = res.data.total;
            // console.log( this.cateList )
        },
        async addCate(){
            // 获取父级的数据 发送 ajax
            const {data:res} = await this.$http.get("categories",{
                params:{type:2}
            })
            // console.log(res)
            // 判断一下是否没有拿到数据
            if(res.meta.status !== 200) return this.$message.error("获取失败")
            this.parentCate = res.data;
            // console.log(this.parentCate)
            // 开关添加分类对话框
            this.addCatedialogVisible = true
        },
        // 下拉选项时改变方法
        cascaderChange(){
            // console.log(this.cascaderKeys)
            // 判断父级分类的数组长度是否为大于，就证明有父元素
            if( this.cascaderKeys.length > 0){
                //父级分类的数组的长度的最后一项传入 添加分类父级 id
                this.addCateFrom.cat_pid = this.cascaderKeys[
                    this.cascaderKeys.length -1
                ]
                // 父级分类的数组的长度传入 cat_level 层级
                this.addCateFrom.cat_level = this.cascaderKeys.length;
            }else{
                this.addCateFrom.cat_pid = 0;
                this.addCateFrom.cat_level = 0;
            }
            this.cascaderKeys.length > 0
        },
        // 关闭对话框清除已选内容
        addCateClose(){
            this.$refs.addCateFormRef.resetFields();
            this.cascaderKeys=[]
        },
        saveCate(){
            this.$refs.addCateFormRef.validate( async vali => {
                if(!vali) return;
                const {data:res} = await this.$http.post("categories",this.addCateFrom)
                if(res.meta.status !== 201){
                    return this.$message.error("创建失败")
                }
                this.$message.success("操作成功")
                // 重新渲染页面
                this.getCateList()
                this.addCatedialogVisible = false
            })
        }  
    },
    created(){
        this.getCateList()
    }
}
</script>

<style>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
    .addBtn{
        margin-bottom: 20px!important;
    }
</style>