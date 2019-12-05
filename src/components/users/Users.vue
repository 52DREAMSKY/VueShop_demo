<template>
    <div id="user">
        <el-card class="box-card">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索添加用户 -->
            <el-row :gutter="35">
                <el-col :span="18">
                    <el-input placeholder="请输入内容" v-model="userInfo.query" @click="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="danger">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row>
                <el-col :span="24">
                    <el-table :data="userList"  stripe style="width: 100%">
                        <el-table-column prop="username" label="姓名"></el-table-column>
                        <el-table-column prop="email" label="邮箱"></el-table-column>
                        <el-table-column prop="mobile" label="电话"></el-table-column>
                        <el-table-column prop="mobile" label="角色"></el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <el-switch
                                v-model="scope.row.mg_state"
                                @change="stateChange(scope.row)"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <el-button type="danger" icon="el-icon-edit" size="mini">编辑</el-button>
                            <el-button type="info" icon="el-icon-delete" size="mini">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <!-- 分页 -->
            <!-- @size-change="handleSizeChange" 每页条数改变时会触发 -->
            <!-- :current-page="handleCurrentChange" 当前页数 获取当前页面条数 -->
            <!-- :page-sizes="[1, 2, 3, 4]"  每页显示个数选择器的选项设置  -->
            <!-- :page-size="2" 每页显示条目个数 -->
            <el-pagination
            @size-change="handleSizeChange"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { get } from 'http'
export default {
    data() {
        return {
            // 获取用户数据
            userInfo:{
                // 查询用户 
                query:'',
                // 当前页码 默认：1
                pagenum:1,
                // 每一页需要显示的数据内容 默认：2
                pagesize:2 
            },
            // 所有的用户基本数据
            userList:[],
            // 总数据条数
            total:0,
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
        async getUserList(){
            const {data:res} = await this.$http.get('users',{ params:this.userInfo })
            //  请求获取返回响应到用户基本数据
            // console.log(res);
            if(res.meta.status != 200){
                return this.$message.error(res.meta.msg);
            }
            // console.log(res.data.users);
            // console.log(res.data.total)
            this.userList = res.data.users;
            this.total = res.data.total;
        },
        // 修改状态事件
        async stateChange(datas){
            // 请求到 users 改变服务端状态
            const {data:res} = await this.$http.put( `users/${datas.id}/state/${datas.mg_state}` );
            // 请求获取到状态返回的值
            // console.log(res);
            if(res.meta.status != 200){
                res.data.mg_state =! res.data.mg_state;
                return this.$message.error(res.meta.msg);
            }else if(res.data.mg_state == 1){
                this.$message.success("状态开启");
            }else if(res.data.mg_state == 0){
                this.$message.error("状态关闭");
            }
            // console.log(res.meta);
            // console.log(res.data.mg_staste);
        },
        handleSizeChange(val){
            // console.log(val);
            this.userInfol.pagesize = val;
            this.getUserList();
        }
    }
}
</script>

<style>
    .el-card,.el-breadcrumb{
        margin-bottom: 30px;  
    }
    .el-table{
        margin-top: 20px
    }
    .el-pagination{
        margin-top: 20px;
    }
</style>