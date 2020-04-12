<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-steps  :active="active" simple>
    <el-step title="步骤 1-选择模型"  icon="el-icon-s-promotion"></el-step>
    <el-step title="步骤 2-功能配置" icon="el-icon-edit"></el-step>
    <el-step title="步骤 3-查看代码" icon="el-icon-tickets"></el-step>
    <el-step title="步骤 4-发布功能" icon="el-icon-monitor"></el-step>
    </el-steps>
    </div>
    <div v-show="active==0">
     <div class="app-form">
      <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
      <el-form-item label="模型名称" prop='modelName'>
        <el-input placeholder="模型名称" v-model="QueryForm.modelName"></el-input>
      </el-form-item>
      <el-form-item class="btnQuery">
        <el-button type="primary"  @click="Query">查询</el-button>
      </el-form-item>
      <el-form-item class="btnQuery">
        <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
     <div class="app-card-body app-card-list ">
        <el-table    :data="RoletableData"  style="width: 100%"
         v-loading="loading"
        header-row-class-name="app_heard"
         @selection-change='SelectedChange'
        row-class-name=''
        :stripe='true'
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white" >
            <el-table-column   type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="modelName" label="模型名称" ></el-table-column>
            <el-table-column prop="description" label="模型注释" ></el-table-column>
        </el-table>
       </div>
    </div>
    <div class="app-card-body app-card-list "  v-show="active==1">
    <el-tabs  v-model="activeconfig" tabPosition="left">
    <el-tab-pane label="配置查询条件" name="first">
    <el-table    :data="PropertyData"  style="width: 100%"
      v-loading="Propertyloading"
      header-row-class-name="app_heard"
      @selection-change='PropertyChange'
      row-class-name=''
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="white" >
          <el-table-column   type="selection" align="center"  width="40"></el-table-column>
          <el-table-column prop="columnName" label="属性名称" ></el-table-column>
          <el-table-column prop="columnType" label="属性类型" ></el-table-column>
          <el-table-column prop="columnDescription" label="属性注释" ></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="配置功能模块" name="second">
      <el-form  label-width="150px" class="demo-ruleForm" :model="TemplateConfig"  style="  margin-top: 20px;">
      <!-- <el-form-item  class="col-umn1" label="开启表格分页" prop="name">
        <el-switch  v-model="TemplateConfig.isPaging"></el-switch>
    </el-form-item> -->
     <el-form-item  class="col-umn1" label="关闭表格操作栏" prop="name">
        <el-switch v-model="TemplateConfig.tableToolOn"></el-switch>
    </el-form-item>
     <el-form-item  class="col-umn1" label="前端输出目录" prop="vueOutputPath">
        <el-input v-model="TemplateConfig.vueOutputPath" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item  :inline="true"  class="col-umn1" label="模型输出目录" prop="modelOutputPath">
        <el-input  v-model="TemplateConfig.modelOutputPath" :disabled="true"></el-input>
    </el-form-item>
     <el-form-item  class="col-umn1" label="控制器输出目录" prop="controllersOutputPath">
        <el-input v-model="TemplateConfig.controllersOutputPath" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="仓储接口输出目录" prop="iRepositoryOutputPath">
        <el-input v-model="TemplateConfig.iRepositoryOutputPath" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="服务接口输出目录" prop="iServicesOutputPath">
        <el-input  v-model="TemplateConfig.iServicesOutputPath" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item  class="col-umn1" label="仓储实现输出目录" prop="RepositoryOutputPath">
        <el-input v-model="TemplateConfig.repositoryOutputPath" :disabled="true"></el-input>
    </el-form-item>
     <el-form-item  class="col-umn1" label="服务实现输出目录" prop="servicesOutputPath">
        <el-input v-model="TemplateConfig.servicesOutputPath" :disabled="true"></el-input>
    </el-form-item>
    <!-- <el-form-item>
      <el-button icon="el-icon-edit" type="primary">保存修改</el-button>
    </el-form-item> -->
     </el-form>
    </el-tab-pane>
   </el-tabs>
    </div>
   <div class="app-card-body app-card-list "  v-show="active==2">
   <el-tabs v-model="activeName"  tab-position="left">
    <el-tab-pane label="前端页面" name="first"><div><pre class="code"><code>{{TemplateCode.vueCode}}</code></pre></div></el-tab-pane>
    <el-tab-pane label="实体模型" name="second"><div><pre class="code"><code>{{TemplateCode.modelCode}}</code></pre></div></el-tab-pane>
    <el-tab-pane label="控制器类" name="second1"><div><pre class="code"><code>{{TemplateCode.controllerCode}}</code></pre></div></el-tab-pane>
    <el-tab-pane label="仓储接口" name="third"><div><pre class="code"><code>{{TemplateCode.iRepositoryCode}}</code></pre></div></el-tab-pane>
    <el-tab-pane label="服务接口" name="fourth"><div><pre class="code"><code>{{TemplateCode.iServicesCode}}</code></pre></div></el-tab-pane>
    <el-tab-pane label="仓储实现" name="fourth1"><div><pre class="code"><code>{{TemplateCode.repositoryCode}}</code></pre></div></el-tab-pane>
    <el-tab-pane label="服务实现" name="fourth2"><div><pre class="code"><code>{{TemplateCode.servicesCode}}</code></pre></div></el-tab-pane>
  </el-tabs>
  </div>
  <div class="app-card-body app-card-list "  v-show="active==3">
    <el-form class="demo-ruleForm"  label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
       <el-form-item  class="col-umn1" label="名称" prop='title'>
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
     <el-form-item label="父级" prop='menuId'>
        <el-cascader :options="cascaderoptions" :props="{
          children: 'submenu',
          label: 'title',
          value:'id',
          checkStrictly: true,
          multiple:false,
          emitPath:false
        }" v-model="ruleForm.menuId" clearable ref="cascader"></el-cascader>
      </el-form-item>
      <el-form-item  class="col-umn1" label="图标" prop='icon'>
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item  class="col-umn1" label="路径" prop='url'>
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
         <el-form-item  class="col-umn1" label="排序" prop='sort'>
        <el-input v-model.number="ruleForm.sort"></el-input>
      </el-form-item>
         <el-form-item  class="col-umn1" label="描述"  prop='description'>
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
    </el-form>
  </div>
    <div class="app-steps">
        <el-button @click="back">上一步</el-button>
        <el-button  @click="next" :disabled="nextdisabled">下一步</el-button>
        <el-button type="primary" :disabled='Isdisabled' @click="Btnsave">完成</el-button>
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
      PropertyData: [],
      loading: true, // loading加载
      Propertyloading: true,
      QueryForm: {
        modelName: ''
      },
      rules: { // 表单验证
        url: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      ruleForm: {
        title: '',
        menuId: null,
        url: '#',
        sort: 0,
        icon: '#',
        description: '#'
      },
      active: 0,
      activeName: 'first',
      activeconfig: 'first',
      TemplateConfig: {},
      TemplateCode: {},
      TableSelect: [],
      PropertySelect: [],
      Isdisabled: true,
      nextdisabled: false,
      resultCode: {},
      cascaderoptions: []

    }
  },
  created  () {
    this.Query()
  },
  methods: {
    // 查询
    Query () {
      this.loading = true
      api.get(this.url, { modelName: this.QueryForm.modelName },
        data => {
          this.RoletableData = data.data
          this.loading = false
        }, er => { this.loading = false; this.RoletableData = [] })
      api.Query(api.apiUrl.MenusPower, data => {
        this.cascaderoptions = data.data
      }, this.QueryForm, error => { this.loading = false; console.error(error) })
    },
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.Query()
    },
    SelectedChange (selection) {
      this.TableSelect = selection
    },
    PropertyChange (selection) {
      this.PropertySelect = selection
    },
    back () {
      if (this.active > 0) { this.active-- }
      this.Isdisabled = true
      this.nextdisabled = false
    },
    next () {
      if (this.active < 3) {
        if ((this.active === 0 && this.TableSelect.length === 0) || this.TableSelect.length > 1) {
          this.$notify({
            title: '提示',
            message: '请选中一项后操作',
            duration: 2000,
            type: 'error'
          })
          return
        }
        if (this.active === 1) {
          this.showCode(() => { this.active++ })
          return
        }
        this.active++
        this.Isdisabled = true
        if (this.active === 1) {
          this.ShowProperty()
        }
        this.PaneShow()
        if (this.active === 3) {
          this.Isdisabled = false
          this.nextdisabled = true
        }
      }
    },
    PaneShow () {
      api.get(api.apiUrl.GetTemplateConfig, { },
        data => {
          this.TemplateConfig = data.data
        }, er => { this.loading = false })
    },
    showCode (result) {
      api.post(api.apiUrl.CodeCreate, {
        model: this.TableSelect[0],
        Propertys: this.PropertySelect,
        IsPaging: this.TemplateConfig.isPaging,
        tableToolOn: this.TemplateConfig.tableToolOn
      },
      data => {
        this.TemplateCode = data.data
        result()
      }, er => { result() })
    },
    Btnsave () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.menuId = this.ruleForm.menuId == null ? 0 : this.ruleForm.menuId
          api.put(api.apiUrl.CodeCreate, {
            model: this.TableSelect[0],
            Propertys: this.PropertySelect,
            IsPaging: this.TemplateConfig.isPaging,
            tableToolOn: this.TemplateConfig.tableToolOn,
            menuId: this.ruleForm.menuId,
            url: this.ruleForm.url,
            sort: this.ruleForm.sort,
            description: this.ruleForm.description,
            title: this.ruleForm.title,
            icon: this.ruleForm.icon
          },
          data => {
            this.active = 0
            this.Isdisabled = true
            this.nextdisabled = false
            this.$refs.ruleForm.resetFields()
            this.$refs.ruleForm.clearValidate()
          }, er => { })
        } else {
          return false
        }
      })
    },
    ShowProperty () {
      this.PropertyData = []
      this.Propertyloading = true
      api.get('/api/CodeCreate/Property', this.TableSelect[0],
        data => {
          this.PropertyData = data.data
          this.Propertyloading = false
        }, er => { this.Propertyloading = false })
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
pre{
  background: #F5F7FA !important;
    padding: 20px !important;
    height: 550px !important;
    overflow: auto;
}
.code {
    background: #232B2B;
    border-radius: 3px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-left: 6px solid #516363;
    /* width: 60%;
    margin: 50px auto; */
    white-space: pre-wrap;
    padding: 20px 20px 20px 50px;
    color:black;
    counter-reset: step;
    counter-increment: step 0;
    position: relative;

}
.col-umn1 .el-select {
    width: 100% !important;
}
</style>
