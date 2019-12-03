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
                    <el-input placeholder="请输入内容" v-model="input1">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="danger">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row>
                <el-col :span="24">
                    <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    >

                    <el-table-column
                    label="姓名"
                    width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                        </el-popover>
                    </template>
                    </el-table-column>
                    

                    <el-table-column
                    label="邮箱"
                    width="180">
                    <template slot-scope="scope">
                        <el-popover placement="top">
                        <div slot="reference" class="name-wrapper">
                            <p>{{ scope.row.email }}</p>
                        </div>
                        </el-popover>
                    </template>
                    </el-table-column>

                    
                    <el-table-column
                    label="日期"
                    width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                    </el-table-column>


                    <el-table-column label="操作">
                    <template >
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                    </el-table-column>


                </el-table>
                </el-col>
            </el-row>
            

            



            
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input1: '',
            tableData: [{
                date: '2019-05-02',
                name: '王小虎',
                email:"805652806@qq.com",
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2019-05-04',
                name: '王小虎',
                email:"805652806@qq.com",
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2019-05-01',
                name: '王小虎',
                email:"805652806@qq.com",
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2019-05-03',
                name: '王小虎',
                email:"805652806@qq.com",
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods:{
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
</style>