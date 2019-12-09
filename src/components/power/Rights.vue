<template>
    <div id="rights">
        <el-card class="card_01">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 权限列表展示 -->
            <el-table :data="rightsList" style="width: 100%" border stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column prop="authName" label="权限名称" ></el-table-column>
                <el-table-column prop="path" label="路径" ></el-table-column>
                <el-table-column prop="level" label="权限等级" >
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.level == 0">一级</el-tag>
                        <el-tag type="waring" v-else-if="scope.row.level == 1">二级</el-tag>
                        <el-tag type="danger" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            rightsList:[]
        }
    },
    methods:{
        async getRightsList(){
            const { data:res } = await this.$http.get('rights/list');
            // console.log(res.data);
            this.rightsList = res.data;
            // console.log(this.rigthsList);
        }
    },
    created(){
        this.getRightsList();
    }
}
</script>

<style>

</style>