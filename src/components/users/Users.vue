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
                    <el-input
                        placeholder="请输入内容"
                        v-model="userInfo.query"
                        clearable
                        @clear="getUserList"
                    >
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="danger" @click="dialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-row>
                <el-col :span="24">
                    <el-table :data="userList" stripe  style="width: 100%">
                        <el-table-column prop="username" label="姓名"></el-table-column>
                        <el-table-column prop="email" label="邮箱"></el-table-column>
                        <el-table-column prop="mobile" label="电话"></el-table-column>
                        <el-table-column prop="role_name" label="角色"></el-table-column>
                        <el-table-column label="状态">
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="scope.row.mg_state"
                                    @change="stateChange(scope.row)"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                ></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button @click='editUserInfo(scope.row.id)' type="danger" icon="el-icon-edit" size="mini">编辑</el-button>
                                <el-button icon="el-icon-s-tools" @click="setRoles(scope.row)" type="warning" size="mini">设置角色</el-button>
                                <el-button @click="removeUser(scope.row.id)" type="info" icon="el-icon-delete" size="mini">删除</el-button>
                            </template>
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
                @current-change="handleCurrentChange"
                :current-page="userInfo.pagenum"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="userInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-card>
        <el-dialog title="添加用户" width="50%" :visible.sync="dialogVisible" @close="addclose">
            <!-- 添加用户表单 -->
            <el-form :model="addForm" :rules="addFormRul" ref="addFormRef" class="addform"  label-width="80px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="addUser">确 定</el-button>
                <el-button type="info" @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>


        <!-- 编辑用户的对话框 -->
        <el-dialog  @close='editClose' title="编辑用户" :visible.sync="editdialogVisible" width="50%">
            <!--表单内容-->
            <el-form :model="editUserForm" :rules="editUserFormRules" ref="editUserFormRef" label-width="70px">
                <!--用户名-->
                <el-form-item label="用户名" prop="username">
                <el-input v-model="editUserForm.username" disabled></el-input>
                </el-form-item>
                <!--邮箱-->
                <el-form-item label="邮箱" prop="email">
                <el-input v-model="editUserForm.email"></el-input>
                </el-form-item>
                <!--电话-->
                <el-form-item label="电话" prop="mobile">
                <el-input v-model="editUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserSubmit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 设置角色对话框 -->
        <el-dialog  title="设置角色" :visible.sync="setRoledialogVisible" width="30%">
        <div>
           <p>当前用户: <el-tag type="info">{{userInfos.username}}</el-tag></p> 
           <p>当前角色: <el-tag type="info">{{userInfos.role_name}}</el-tag></p>
           <p>设置新的角色:
               <el-select v-model="rolesId" placeholder="请选择">
                    <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                </el-select>
           </p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="setRoledialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRoles">确 定</el-button>
        </span>
        </el-dialog>


    </div>
</template>
<script>
import { get, request } from "http";
export default {
    data() {
        // 自己定义的正则验证规则 | rule 验证规则 | value 验证的内容
        // 邮箱校验的正则方法
        var checkEmail = (rule, value, callback) => {
            // 定义正则
            const regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            // test
            if (regEmail.test(value)) {
                callback();
            }
            callback(new Error("验证失败"));
        };
        // 手机号校验正则方法
        var checkMobil = (rule, value, callback) => {
            const regMobil = /^1(3|4|5|7|8|9)\d{9}$/;
            if (regMobil.test(value)) {
                callback();
            }
            callback(new Error("验证失败"));
        };
        return {
            // 获取用户数据
            userInfo: {
                // 查询用户
                query: "",
                // 当前页码 默认：1
                pagenum: 1,
                // 每一页需要显示的数据内容 默认：2
                pagesize: 2
            },
            // 所有的用户基本数据
            userList: [],
            // 总数据条数
            total: 0,
            // 控制用户对话框的开启和关闭
            dialogVisible: false,
            setRoledialogVisible:false,
            // 存储当前添加用户的表单数据
            addForm: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            // 预验证，判断用户输入是否符合格式规则
            addFormRul: {
                // 用户名格式规则校验
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    {
                        min: 3,
                        max: 8,
                        message: "长度在 3 到 8 个字符",
                        trigger: "blur"
                    }
                ],
                // 密码格式规则校验
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 18,
                        message: "长度在 6 到 18 个字符",
                        trigger: "blur"
                    }
                ],
                //  邮箱格式规则校验
                email: [
                    // validator:checkEmail 对应的是 checkEmail 自定义的校验的正则表达式
                    { validator: checkEmail, trigger: "blur" }
                ],
                //  手机号格式规则校验
                mobile: [
                    // validator:checkMobil 对应的是 checkMobil 自定义的校验的正则表达式
                    { validator: checkMobil, trigger: "blur" }
                ]
            },
            //点击修改弹框的显示和隐藏
			editdialogVisible:false,
			//根据ID查询到的用户信息
			editUserForm:{},
			editUserFormRules:{
				email:[
						{ validator:checkEmail, trigger: 'blur' }
          	],
          	mobile:[
          		{ validator:checkMobil, trigger: 'blur' }
          		]
            },
            // 用户数据
            userInfos:[],
            // 角色列表
            roleList:[],
            rolesId:''
        }
    },
    created() {
        this.getUserList();
    },
    methods: {
        async getUserList() {
            const { data: res } = await this.$http.get("users", {
                params: this.userInfo
            });
            //  请求获取返回响应到用户基本数据
            // console.log(res);
            if (res.meta.status != 200) {
                return this.$message.error(res.meta.msg);
            }
            // console.log(res.data.users);
            // console.log(res.data.total)
            this.userList = res.data.users;
            this.total = res.data.total;
        },
        
        // 修改状态事件
        async stateChange(datas) {
            // 请求到 users 改变服务端状态
            const { data: res } = await this.$http.put(
                `users/${datas.id}/state/${datas.mg_state}`
            );
            // 请求获取到状态返回的值
            // console.log(res);
            if (res.meta.status != 200) {
                res.data.mg_state = !res.data.mg_state;
                return this.$message.error(res.meta.msg);
            } else if (res.data.mg_state == 1) {
                this.$message.success("状态开启");
            } else if (res.data.mg_state == 0) {
                this.$message.error("状态关闭");
            }
            // console.log(res.meta);
            // console.log(res.data.mg_staste);
        },

        handleSizeChange(val) {
            //每页展示的数据量
            console.log(`每页 ${val} 条`);
            this.userInfo.pagesize = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.userInfo.pagenum = val;
            this.getUserList();
        },

        // 关闭添加用户对话框后 清除表单的内容方法
        addclose() {
            this.$refs.addFormRef.resetFields();
        },

        // 打开添加用户对话框方法
        addUser(){
          this.$refs.addFormRef.validate(async (vali)=> {
                console.log(vali);
                if(!vali){
                    return this.$message.error("添加失败");
                }
                // 预验证通过，后发送ajax请求
                const { data: ret } = await this.$http.post("users",this.addForm);
                if(ret.meta.status != 201){
                    return this.$message.error(ret.meta.msg);
                }
                // 关闭对话框
                this.$message.success(ret.meta.msg);
                this.dialogVisible = false;
                this.getUserList();
            })
        },
        //根据ID查询到要修改的用户的操作
        async editUserInfo(id){
            const {data:res} = await this.$http.get('users/' + id);
            console.log(res)
            if(res.meta.status !== 200) return this.$message.error(ret.meta.msg)
            this.editUserForm = res.data;
            this.editdialogVisible = true;
        },
        //清除内容
        editClose(){
            this.$refs.editUserFormRef.resetFields();
        },
        //修改完成确认提交
        editUserSubmit(){
            //预校验
                this.$refs.editUserFormRef.validate( async vali => {
                    //预校验失败
                    if(!vali) return this.$message.error('编辑失败')
                    //预校验成功
                    const {data:res} = await this.$http.put('users/' + this.editUserForm.id,{
                        id:this.editUserForm.id,
                        email:this.editUserForm.email,
                        mobile:this.editUserForm.mobile
                    })
                    if(res.meta.status !== 200 ) return this.$message.error('更新失败');
                    //更新成功操作
                    //1.提示用户成功
                    this.$message.success('更新成功');
                    //关闭修改信息对话窗口
                    this.editdialogVisible = false;
                    //重新渲染页面
                    this.getUsersList()
                })
        },
        async removeUser(id){
            // alert(id); 测试当前 id 是否拿到
            // 弹出删除确认框，确认删除操作
            const ret = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            // 测试返回的是 成功还是失败
            // console.log(ret);
            // confirm 是代表成功，点击确认后返回的结果
            // cancel 是代表失败，点击取消后返回的结果
            
            // 判断不成功是 返回一个 取消的提示 
            if(ret != "confirm") return this.$message.info("取消删除");

            // 调用 api 实现删除操作
            const { data:res } = await this.$http.delete("users/" + id);
            if( res.meta.status != 200 ) return this.$message.error("删除失败")
            this.$message.success("删除成功");
            this.getUserList();
        },
        // 设置角色获取的方法
        async setRoles(role){
            // alert(1)
            // 将用户数据传入 userInfos
            this.userInfos = role;
            // 开关设置角色对话框
            this.setRoledialogVisible = true;
            // 发送ajax 获取角色数据
            const {data:res} = await this.$http.get('roles');
            // console.log(res);
            // 判断角色数据是否获取失败
            if(res.meta.status != 200){
                return this.$message.error('获取失败')
            }
            // 将获取的角色数据传入roleList
            this.roleList = res.data;
            console.log(this.roleList)
        },
        async saveRoles(roles){
            // 判断当前下拉框是否为空
            if(!this.rolesId){
                return this.$message.info("请选择角色");
            }
            const {data:res} = await this.$http.put(`users/${this.userInfos.id}/role`,{
                rid:this.rolesId
            });
            // 判断是否设置角色失败
            if(res.meta.status !== 200){
                return this.$message.error('设置角色失败')
            }
            // 
            this.$message.success('成功设置角色为：' + this.userInfos.role_name);
            // 将数据渲染到页面
            this.getUserList();
            // 开关设置角色对话框
            this.setRoledialogVisible = false;
        },
        // 关闭确定后关闭对话框，清除已选择的角色选择选项
        setRolesClose(){
            this.rolesId = '';
        }
    }
};
</script>
<style>
.el-card,
.el-breadcrumb {
    margin-bottom: 30px;
}
.el-table {
    margin-top: 20px;
}
.el-pagination {
    margin-top: 20px;
}
</style>