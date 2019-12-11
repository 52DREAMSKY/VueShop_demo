<template>
    <div id="roles">
        <el-card class="card_01">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 权限列表展示 -->
			<el-table :data='rolesList' style='width=100%' border>
				<el-table-column type='index' label='#'></el-table-column>
				<el-table-column type='expand' label='权限' width="60">
					<template slot-scope='scope'>
						<!--{{scope.row}}-->
						<el-row :class="['bottomBorder',i1===0?'topBorder':'','center']" v-for='(item1,i1) in scope.row.children' :key='item1.id'>
							<!-- 一级权限 -->
							<el-col :span='5'>
								<el-tag type='success'>{{item1.authName}}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!-- 二级\三级的权限 -->
							<el-col :span='19'>
								<el-row :class="[ i2===0?'':'topBorder','center' ]" v-for='(item2,i2) in item1.children' :key='item2.id'>
									<el-col :span='6'>
										<el-tag type='warning'>{{item2.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span='18' >
										<el-tag type='primary' @close='removRoles(scope.row,item3.id)' closable v-for='(item3,i3) in item2.children' :key='item3.id'>{{ item3.authName }}</el-tag>
									</el-col>
								</el-row>

							</el-col>
						</el-row>
					</template>                    
				</el-table-column>
				<el-table-column label="角色名称" prop="roleName" ></el-table-column>
				<el-table-column label="角色描述" prop="roleDesc" ></el-table-column>
				<el-table-column label="操作" width="300">
					<template slot-scope='scope'>
						<!--编辑角色按钮-->
						<el-button type="danger" icon="el-icon-edit" size="mini">编辑</el-button>
						<!--分配角色按钮-->
						<el-button type="warning" @click="setRights(scope.row)" icon="el-icon-setting" size="mini">分配权限</el-button>
						<!--删除角色按钮-->
						<el-button type="info" icon="el-icon-delete" size="mini">删除</el-button>
                    </template>
				</el-table-column>
			</el-table>
        </el-card>
		<el-dialog title="分配权限" @close='watchDialogClose' :visible.sync="setdialogVisible" width="50%">
		<!-- 权限列表树 -->
		<el-tree 
		:data="treeList" 
		ref="treeRef"  
		node-key="id" 
		:default-checked-keys="treeArrKey" 
		:props="treePorps" 
		default-expand-all show-checkbox ></el-tree>
		<span slot="footer" class="dialog-footer">
			<el-button @click="setdialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="setRightsTrue">确 定</el-button>
		</span>
		</el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
			rolesList:[],
			// 控制分配权限对话框显示和隐藏
			setdialogVisible: false,
			// 储存分配权限列表树数据
			treeList:[],
			treePorps:{
				children: 'children',
				label: 'authName'
			},
			treeArrKey:[],
			// 储存角色
			rolesId:''
        }
    },
    methods:{
        //获取角色列表数据
        async getRolesList(){
            const {data:res } = await this.$http.get('roles');
            this.rolesList = res.data;
            // console.log(this.rolesList)
        },
        async removRoles(roleId,rightId){
			const ret = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).catch( err => err )
			// console.log(res);
			if( ret != "confirm") return this.$message.info("取消删除");
			const {data:res} = await this.$http.delete(`roles/${roleId.id}/rights/${rightId}`);
			// console.log(res);
			this.$message.success("删除成功");
			roleId.children = res.data;
		},
		async setRights(role){
			// 将角色的 id 存储下来
			this.rolesId = role.id
			// 发送 ajax 获取数据
			const {data:res} = await this.$http.get("rights/tree");
			// 输出权限列表数据
			// console.log(res)
			if(res.meta.status != 200) return this.$message.error("获取失败")
			// 将获取的数据赋给treeList
			this.treeList = res.data;
			this.getRightsChecked(role,this.treeArrKey)
			this.setdialogVisible = true;
		},
		
		getRightsChecked(node,arr){
			// node 是节点
			// arr 数组
			// 判断 node 节点下是否没有 children 
			if(!node.children){
				return arr.push(node.id)
			}
			// 遍历节点
			node.children.forEach( item => {
				// 循环递归调用
				this.getRightsChecked(item,arr);
			})
		},
		watchDialogClose(){
			this.treeArrKey = []
		},
		// 点击确定按钮，实现权限分配方法
		setRightsTrue(){
			// console.log("yoooooo");
			const arr = []
			this.setdialogVisible = false
		}

    },
    created(){
        this.getRolesList()
    }
}
</script>

<style scoped>
    .el-tag{
        margin: 7px;
    }
    .center{
        display: flex;
        align-items: center;
    }
    .topBorder {
		border-top: 1px solid #eee;
	}
    .bottomBorder {
		border-bottom: 1px solid #eee;
	}
</style>