<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
<el-form-item  label='请求路径' prop='path'><el-input placeholder='请求路径' v-model='QueryForm.path'></el-input></el-form-item>
<el-form-item  label='请求状态' prop='state'><el-select placeholder='请求状态'  v-model='QueryForm.state'><el-option label='succeed' :value='1'></el-option><el-option label='error' :value='2'></el-option></el-select></el-form-item>
<el-form-item  label='请求用户' prop='userName'><el-input placeholder='请求用户' v-model='QueryForm.userName'></el-input></el-form-item>

      <el-form-item class="btnQuery">
        <el-button type="primary"  @click="Query">查询</el-button>
      </el-form-item>
      <el-form-item class="btnQuery">
    <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
       <div class="form-bar" >
    <el-button-group v-if='false'>
   <el-button type="primary" icon="el-icon-plus" @click="BarAdd">新增</el-button>
   <el-button type="primary" icon="el-icon-edit" @click="BarEdit">编辑</el-button>
   <el-button type="primary" icon="el-icon-delete" @click="Bardelete">删除</el-button>
   </el-button-group>
       </div>
     <div class="app-card-body app-card-list ">
        <el-table    :data="RoletableData"  style="width: 100%"
         v-loading="loading"
        @selection-change='SelectedChange'
        header-row-class-name="app_heard"
        row-class-name=''
        :stripe='true'
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
       >
            <!-- <el-table-column prop="id"  type="selection" align="center"  width="40"></el-table-column> -->
            <el-table-column prop="requestTime" label="请求时间"  width="250"  align="center"></el-table-column>
             <el-table-column prop="method" label="请求类型" align="center"></el-table-column>
            <el-table-column prop="path" label="请求路径" align="center"  width="250"></el-table-column>
            <el-table-column prop="urlparameter" label="URL参数"   width="500" align="center"></el-table-column>
            <el-table-column prop="state" label="请求状态" align="center">
                <template slot-scope="scope">
                <el-tag class="statetag "  :class="Statusclass(scope.row.state)" disable-transitions>{{statesformat(scope.row.state)}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="consumingTime" label="耗时" align="center"></el-table-column>
            <el-table-column prop="userName" label="请求用户" align="center"></el-table-column>
      <el-table-column label="操作" width="180"  align="center" >
        <template slot-scope="scope" >
          <div><a  @click="AppEdit(scope.$index, scope.row)">详情</a>
          </div>
      </template>
    </el-table-column>
        </el-table>
        <div class="app-pagination">
         <elPagination :url='url' ref="Page" :parameter='QueryForm'  v-on:get="(data) => { RoletableData = data }"  v-on:loading='(isloading) => { loading = isloading }' ></elPagination>
        </div>
       </div>
      </div>
    </div>
    <el-dialog
      title="详情"
      @close="resetdialog"
      :append-to-body='true'
      :visible.sync="dialogVisible"
      width="1000px">
      <el-form :model="ruleForm" class="demo-form-inline" :inline="true" label-width="80px"  ref='ruleForm'>
      <el-form-item class='col-2' label='请求路径' prop='path'><el-input placeholder='请求路径' v-model='ruleForm.path'></el-input></el-form-item>
      <el-form-item class='col-2'  label='请求时间' prop='requestTime'><el-date-picker placeholder='请求时间' v-model='ruleForm.requestTime'></el-date-picker></el-form-item>
      <el-form-item class='col-2' label='URL参数' prop='urlparameter'><el-input placeholder='URL参数' v-model='ruleForm.urlparameter'></el-input></el-form-item>
      <el-form-item class='col-2' label='请求参数' prop='formDataparameter'><el-input placeholder='请求参数' v-model='ruleForm.formDataparameter'></el-input></el-form-item>
      <el-form-item class='col-2' label='请求状态' prop='state'><el-select placeholder='请求状态'  v-model='ruleForm.state'><el-option label='succeed' :value='1'></el-option><el-option label='error' :value='2'></el-option></el-select></el-form-item>
      <el-form-item class='col-2' label='耗时' prop='consumingTime'><el-input placeholder='耗时' v-model='ruleForm.consumingTime'></el-input></el-form-item>
      <el-form-item class='col-2' label='请求用户' prop='userName'><el-input placeholder='请求用户' v-model='ruleForm.userName'></el-input></el-form-item>
      <el-form-item class='col-1'  label='响应数据' prop='responseData'><el-input  placeholder='响应数据' v-model='ruleForm.responseData'></el-input></el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="submitForm" v-if="false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import elPagination from '@/components/Pagination'
export default {
  components: { elPagination },
  data () {
    return {
      url: '/api/ApiRequestLog',
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: { path: '',
        state: null,
        userName: ''
      },
      dialogVisible: false, // dialog显示
      ruleForm: {}, // 表单模型
      Isedit: false, // 是否编辑
      TableSelect: []
    }
  },
  created  () {

  },
  methods: {
    statesformat (state) {
      if (state === 1) {
        return '成功'
      } else if (state === 2) {
        return '失败'
      } else {
        return '未知'
      }
    },
    Statusclass (state) {
      if (state === 0) {
        return 'tag-warn'
      } else if (state === 1) {
        return 'tag-succeed'
      } else {
        return 'tag-error'
      }
    },
    // 查询
    Query () {
      this.$refs.Page.refresh()
    },
    // 表格编辑
    AppEdit (index, row) {
      this.Isedit = true
      this.dialogVisible = true
      this.$nextTick(() => {
        this.ruleForm = JSON.parse(JSON.stringify(row))
      })
    },
    // 工具栏新增
    BarAdd () {
      this.dialogVisible = true
      this.Isedit = false
      this.$nextTick(() => {
        this.ruleForm = {}
      })
    },
    // 表格删除
    AppDelete (index, row) {
      this.$confirm('此操作将删除所选内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dalete([row])
      }).catch(() => {})
    },
    // 工具栏删除
    Bardelete () {
      if (this.TableSelect.length > 0) {
        this.$confirm('此操作将删除所选内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dalete(this.TableSelect)
        }).catch(() => {})
      } else {
        this.$notify({
          title: '提示',
          message: '请选中后删除',
          duration: 2000,
          type: 'error'
        })
      }
    },
    // 工具栏编辑
    BarEdit () {
      if (this.TableSelect.length === 1) {
        this.AppEdit(null, this.TableSelect[0])
        this.dialogVisible = true
        this.Isedit = true
      } else {
        this.$notify({
          title: '提示',
          message: '请选中一行后编辑',
          duration: 2000,
          type: 'error'
        })
      }
    },
    // 表格选中
    SelectedChange (selection) {
      this.TableSelect = selection
    },
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.$refs.Page.refresh()
    },
    // 清除dialog表单
    resetdialog () {
      this.$refs.ruleForm.resetFields()
      this.$refs.ruleForm.clearValidate()
    },
    // 表单提交
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.Isedit) {
            this.update()
          } else { this.Add() }
        } else {
          return false
        }
      })
    },
    // 添加方法
    Add () {
      this.$refs.Page.add(JSON.parse(JSON.stringify(this.ruleForm)))
      this.dialogVisible = false
    },
    // 更新方法
    update () {
      this.$refs.Page.edit(JSON.parse(JSON.stringify(this.ruleForm)))
      this.dialogVisible = false
    },
    // 删除方法
    dalete (data) {
      this.$refs.Page.dalete(JSON.parse(JSON.stringify(data)))
    }
  }
}
</script>
