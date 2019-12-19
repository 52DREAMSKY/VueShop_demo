<template>
    <div id="Orders">
        
        <el-card>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索添加用户 -->
            <el-row :gutter='20' class='searchRow'>
				<el-col :span='8'>
					 <el-input placeholder="请输入内容">
					    <el-button slot="append" icon="el-icon-search"></el-button>
					 </el-input>
				</el-col>
			</el-row>
            <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column label="#" type='index'></el-table-column>
                <el-table-column prop="order_number" label="订单编号"></el-table-column>
                <el-table-column prop="order_price" label="订单价格"></el-table-column>
                <el-table-column prop="order_pay" label="是否付款">
                    <template slot-scope="scope">
                        <el-tag type='danger' v-if="scope.row.order_pay==0">未付款</el-tag>
                        <el-tag type="success" v-else>已付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="is_send" label="是否发货"></el-table-column>
                <el-table-column prop="create_time" label="下单时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger"  icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="success" icon="el-icon-map-location"
 size="mini">定位</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="userInfo.pagenum"
                :page-sizes="[1, 2, 3, 4, 5,]"
                :page-size="userInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[],
            userInfo: {
                // 查询用户
                query: "",
                // 当前页码 默认：1
                pagenum: 1,
                pagesize:2,
            },
            total:0,
        }
    },
    methods:{
        async getTableList() {
            const { data: res } = await this.$http.get("orders",{
                params:this.userInfo
            });
            console.log(res.data);
            if (res.meta.status != 200) {
                return this.$message.error(res.meta.msg);
            }
            this.tableData = res.data.goods;
            this.total = res.data.total;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.userInfo.pagesize = val;
            this.getTableList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.userInfo.pagenum = val;
            this.getTableList();
        },

    },
    created(){
        this.getTableList();
    }
}
</script>

<style scoped>

</style>