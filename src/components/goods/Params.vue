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
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="warning" icon="el-icon-delete" size="mini">删除</el-button>
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
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="warning" icon="el-icon-delete" size="mini">删除</el-button>
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
        <el-button @click="addParamsdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParamsdialogVisible = false">确 定</el-button>
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
      }
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
      console.log(this.cateList);
    },
    //tabs标签页发生改变的事件
    handleTabsClick() {
      this.getParamsList();
    },
    //级联选择框发生改变触发的事件
    async handleCascaderChange() {
      this.getParamsList();
    },
    async getParamsList() {
      if (this.cascaderKey.length !== 3) {
        this.cascaderKey = [];
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

<style>
    .el-input__inner{margin-left: 20px;}
    .el-tabs{margin: 20px; }
    .el-dialog input{ width: 80%; }
</style>