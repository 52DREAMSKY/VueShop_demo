<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      </el-breadcrumb>
      <el-alert style="margin: 20px 0;" title="注意:只允许选择第三级分类设置相关参数" type="warning" :closable="false" show-icon></el-alert>
      <!--选择商品分类-->
      <el-row class="cate_opt">
        <el-col>
          <span>选择商品的分类:</span>
          <el-cascader
            v-model="cascaderKey"
            :options="cateList"
            :props="cascaderProps"
            @change="handleCascaderChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <!--动态参数-->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBntdisabled"
            @click="addParamsdialogVisible=true"
          >添加参数</el-button>
          <el-table :data="manyParamsList" border>
            <el-table-column type="expand">
                <!-- 添加标签参数 -->
                <template slot-scope="scope">
                  <el-tag closable v-for="(item,i) in scope.row.attr_vals" @close="handleClose(i,scope.row)" :key="i">
                    {{item}}
                  </el-tag>
                  <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="info" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!--静态属性-->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="warning"
            size="mini"
            :disabled="isBntdisabled"
            @click="addParamsdialogVisible=true"
          >添加属性</el-button>
          <el-table :data="onlyParamsList" border>
            <el-table-column type="expand">
                <!-- 添加标签参数 -->
                <template slot-scope="scope">
                  <el-tag @close="handleClose(i,scope.row)" closable v-for="(item,i) in scope.row.attr_vals" :key="i">
                    {{item}}
                  </el-tag>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="info" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--添加参数的对话框-->
    <el-dialog  :title=" '添加' + paramsPath " :visible.sync="addParamsdialogVisible" width="50%">
        <el-form :model="addParamsForm" :rules="addParamsFormrules" ref="addParamsFormRef" label-width="100px">
            <el-form-item :label="'添加' + paramsPath" prop="attr_name">
            <el-input v-model="addParamsForm.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="addParamsdialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="addParamsdialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //存储分类数据
      cateList: [],
      activeName: "many",
      // 存放级联选择框选中的分类的id
      cascaderKey: [],
      //级联选择框的配置项
      cascaderProps: {
        expandTrigger: "hover",
        checkStrictly: "true",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      //动态参数数据
      manyParamsList: [],
      //静态属性数据
      onlyParamsList: [],
      //控制添加参数的对话框开启和关闭
      addParamsdialogVisible: false,
      //添加参数
      addParamsForm: {
        attr_name: ""
      },
      //校验规则
      addParamsFormrules: {
        attr_name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      // 标签参数输入框显示
      inputVisible:false,
			inputValue:'',
    };
  },
  methods: {
    //获取分类的数据
    async getcateList() {
      const { data: res } = await this.$http.get("categories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取失败");
      }
      this.cateList = res.data;
      // console.log(this.cateList);
    },
    //tabs标签页发生改变的事件
    handleTabsClick() {
      this.getParamsList();
    },
    //级联选择框发生改变触发的事件
    async handleCascaderChange() {
      this.getParamsList();
    },
    //获取参数的方法
    async getParamsList() {
      if (this.cascaderKey.length !== 3) {
        this.cascaderKey = [];
        this.manyParamsList = [];
        this.onlyParamsList = [];
        return;
      }
      //获取参数
      const { data: res } = await this.$http.get(
        `categories/${this.getCateId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      );
      if (res.meta.status !== 200) {
        return this.$message.error("获取失败");
      }
      console.log(res.data);
      if (this.activeName === "many") {
        this.manyParamsList = res.data;
      } else {
        this.onlyParamsList = res.data;
      }
      // 遍历渲染 res.data 中的 attr_vals 并将以空格分隔的字符串转换成数组
      res.data.forEach( item=>{
        item.attr_vals = item.attr_vals.split(' ')
      })
    },
    // 删除展开行的参数
    async handleClose(i,row){
      row.attr_vals.splice(i,1);
      this.updataList(row);
    },
    // 更新展开行参数方法
    async updataList(row){
      const {data:res} = await this.$http.put(`categories/${this.getCateId}/attributes/${row.attr_id}`,{
        attr_name:row.attr_name,
        attr_sel:row.attr_sel,
        attr_vals:row.attr_vals.join(' ')
      })
      if(res.meta.status != 200 ){
        return this.$message.error('更新失败')
      }
      this.$message.success('更新成功')
      console.log(res.data);
    },
    async handleInputConfirm(row){
      console.log("123123")
      if ( this.inputValue.trim().length === 0  ) {
        this.inputVisible = false;
        this.inputValue = ''
        return;
      }
      row.attr_vals.push(this.inputValue.trim());
      this.inputVisible = false;
      this.inputValue = ''
      this.updataList(row);
    },
    showInput(){
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    }

  },
  created() {
    this.getcateList();
  },
  //计算属性
  computed: {
   
    getCateId() {
      if (this.cascaderKey.length === 3) {
        return this.cascaderKey[2];
      } //获取分类的id
    },
    
    isBntdisabled() { //添加参数按钮是否禁用
      if (this.cascaderKey.length === 3) {
        return false;
      }
      return true;
    },
    paramsPath() {
      if (this.activeName === "many") {
        return "参数";
      }
      return "属性";
    }
  }
};
</script>

<style scoped>
    .el-input__inner{margin-left: 20px;}
    .el-tabs{margin: 20px; }
    .el-dialog input{ width: 80%; }
    .el-tag{margin: 10px;}
    .input-new-tag{width: 150px;}
</style>