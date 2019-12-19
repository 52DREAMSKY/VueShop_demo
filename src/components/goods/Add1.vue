<template>
    <div id="add">
        <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 提示性文字 -->
            <el-alert title="添加商品信息" center :closable="false" show-icon></el-alert>
            <!-- 步骤进度条 -->
            <el-steps :space="200"  :active="activeName -0" align-center finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- 竖排 tabs 标签页 -->
            <!-- :model="ruleForm" :rules="rules" ref="ruleForm" -->
            <el-form  label-width="100px">
                <!-- :before-leave='beforLeave' -->
                <el-tabs v-model="activeName"  :tab-position="'left'" @tab-click="tabClick">
                    <el-tab-pane label="基本信息">基本信息</el-tab-pane>
                    <el-tab-pane label="商品名称">商品名称</el-tab-pane>
                    <el-tab-pane label="商品价格">商品价格</el-tab-pane>
                    <el-tab-pane label="商品重量">商品重量</el-tab-pane>
                    <el-tab-pane label="商品数量">商品数量</el-tab-pane>
                    <el-tab-pane label="商品选择分类">商品选择分类</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            activeName:"0"
        }
    },
    methods:{
        tabClick(){

        }
    }
}
</script>

<style scoped>
    .el-steps{
        margin: 20px auto;
    }
</style>