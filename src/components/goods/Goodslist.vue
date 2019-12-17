<template>
    <div id="goodsList">
        <el-card class="box-card">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索和添加栏目 -->
            <el-row :gutter="35">
                <el-col :span="18">
                    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="danger">添加栏目</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    
</style>