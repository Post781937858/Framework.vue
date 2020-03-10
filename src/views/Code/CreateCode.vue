<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-steps  :active="active" simple>
    <el-step title="步骤 1-选择数据表"  description="选择数据表" icon="el-icon-edit"></el-step>
    <el-step title="步骤 2-配置模板信息" icon="el-icon-upload"></el-step>
    <el-step title="步骤 3-查看代码" icon="el-icon-picture"></el-step>
    </el-steps>
    </div>
    <div v-show="active==0">
     <div class="app-form">
      <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
      <el-form-item label="表名" prop='Name'>
        <el-input placeholder="表名" v-model="QueryForm.Name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="Query"  >查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
     <div class="app-card-body app-card-list ">
        <el-table    :data="RoletableData"  style="width: 100%"
         v-loading="loading"
        header-row-class-name="app_heard"
        row-class-name=''
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white" >
            <el-table-column   type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="name" label="表名称" align="center"></el-table-column>
            <el-table-column prop="rowsCount" label="数据行数" align="center"></el-table-column>
            <el-table-column prop="encode" label="编码格式" align="center"></el-table-column>
            <el-table-column prop="commentsValue" label="表注释" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
        </el-table>
       </div>
    </div>

    <div class="app-card-body app-card-list "  v-show="active==1">
    <el-form  label-width="150px" class="demo-ruleForm">
    <el-form-item class="col-umn1" label="创建人员" prop="name">
        <el-input ></el-input>
    </el-form-item>
     <el-form-item  class="col-umn1" label="功能描述" prop="name">
        <el-input ></el-input>
    </el-form-item>
     <el-form-item  class="col-umn1" label="前端输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="模型输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
     <el-form-item  class="col-umn1" label="控制器输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="仓储接口输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="服务接口输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="仓储实现输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
     <el-form-item  class="col-umn1" label="服务实现输出目录" prop="name">
        <el-input ></el-input>
    </el-form-item>
     </el-form>
    </div>
   <div class="app-card-body app-card-list "  v-show="active==2">
 <el-tabs first  tab-position="left">
    <el-tab-pane label="前端页面" name="first"><div class="pang">用户管理</div></el-tab-pane>
    <el-tab-pane label="实体模型" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="仓储接口" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="服务接口" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="仓储实现" name="fourth1">定时任务补偿</el-tab-pane>
    <el-tab-pane label="服务实现" name="fourth2">定时任务补偿</el-tab-pane>
  </el-tabs>
    </div>
       <div class="app-steps">
            <el-button @click="back">上一步</el-button>
            <el-button  @click="next">下一步</el-button>
            <el-button type="primary" disabled>完成</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    return {
      url: api.apiUrl.CodeCreate,
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: {
        Name: ''
      },
      rules: { // 表单验证
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      },
      active: 0
    }
  },
  created  () {
    this.Query()
  },
  methods: {
    // 查询
    Query () {
      this.loading = true
      api.get(this.url, { Name: this.QueryForm.Name },
        data => {
          this.RoletableData = data.data
          this.loading = false
        }, er => { this.loading = false })
    },
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.Query()
    },
    back () {
      if (this.active > 0) { this.active-- }
    },
    next () {
      if (this.active < 2) { this.active++ }
    },
    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  }
}
</script>
<style scoped>
.app-steps{
    padding: 20px;
    text-align: right;
}
.pang{
    height: 500px;
}
</style>
