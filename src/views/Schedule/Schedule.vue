<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
     <el-form-item label='任务名称' prop='jobName'><el-input placeholder='任务名称' v-model='QueryForm.jobName'></el-input></el-form-item>
     <el-form-item label='任务分组' prop='jobGroup'><el-input placeholder='任务分组' v-model='QueryForm.jobGroup'></el-input></el-form-item>
      <el-form-item class="btnQuery">
        <el-button type="primary"  @click="Query">查询</el-button>
      </el-form-item>
      <el-form-item class="btnQuery">
        <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
       <div class="form-bar" >
    <el-button-group>
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
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
       >
            <el-table-column prop="id"  type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="jobGroup" width="180" label="任务分组" align="center"></el-table-column>
            <el-table-column prop="jobName" width="180" label="任务名称" align="center"></el-table-column>
            <el-table-column prop="cron" width="180" label="执行周期表达式" align="center"></el-table-column>
            <el-table-column prop="runStatus" width="180" label="任务运行状态" align="center">
              <template slot-scope="scope">
                <el-tag class="statetag "  :class="Statusclass(scope.row.runStatus)" disable-transitions>{{Statusformat(scope.row.runStatus)}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="assemblyName" width="200" label="程序集名称" align="center"></el-table-column>
            <el-table-column prop="className" width="180" label="Job类名" align="center"></el-table-column>
            <el-table-column prop="runTimes" width="180" label="执行次数" align="center"></el-table-column>
            <el-table-column prop="intervalSecond" width="180" label="执行间隔时间" align="center"></el-table-column>
      <el-table-column label="操作" width="250"  align="center" >
        <template slot-scope="scope" >
          <div>
            <a  @click="RunJob(scope.$index, scope.row)">启动</a>
            <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
            <a  @click="StopJob(scope.$index, scope.row)">暂停</a>
             <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
            <a  @click="AppEdit(scope.$index, scope.row)">编辑</a>
          <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
           <a  @click="AppDelete(scope.$index, scope.row)">删除</a>
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
      title="编辑"
      @close="resetdialog"
      :append-to-body='true'
      :visible.sync="dialogVisible"
      width="1000px">
      <el-form :model="ruleForm" class="demo-form-inline" :inline="true" label-width="100px"  :rules="rules" ref='ruleForm'>
      <el-form-item  class="col-2" label='任务分组' prop='jobGroup'><el-input placeholder='任务分组' v-model='ruleForm.jobGroup'></el-input></el-form-item>
      <el-form-item  class="col-2" label='任务名称' prop='jobName'><el-input placeholder='任务名称' v-model='ruleForm.jobName'></el-input></el-form-item>
      <el-form-item  class="col-2" label='表达式' prop='cron'><el-input placeholder='执行周期表达式' v-model='ruleForm.cron'></el-input></el-form-item>
      <el-form-item  class="col-2" label='程序集名称' prop='assemblyName'><el-input placeholder='程序集名称' v-model='ruleForm.assemblyName'></el-input></el-form-item>
      <el-form-item  class="col-2" label='Job类名' prop='className'><el-input placeholder='Job类名' v-model='ruleForm.className'></el-input></el-form-item>
      <el-form-item  class="col-2"  label='执行次数' prop='runTimes'><el-input placeholder='执行次数' v-model.number='ruleForm.runTimes'></el-input></el-form-item>
      <el-form-item  class="col-2" label='间隔时间' prop='intervalSecond'><el-input placeholder='执行间隔时间' v-model.number='ruleForm.intervalSecond'></el-input></el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import elPagination from '@/components/Pagination'
import api from '@/api/api'
export default {
  components: { elPagination },
  data () {
    return {
      url: '/api/ScheduleEntity',
      Runurl: '/api/ScheduleEntity/Run',
      Stopurl: '/api/ScheduleEntity/Stop',
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: {
        JobName: '',
        JobGroup: ''
      },
      dialogVisible: false, // dialog显示
      rules: { // 表单验证
        jobGroup: [{ required: true, message: '不能为空', trigger: 'blur' }], jobName: [{ required: true, message: '不能为空', trigger: 'blur' }], cron: [{ required: true, message: '不能为空', trigger: 'blur' }], runStatus: [{ required: true, message: '不能为空', trigger: 'blur' }], nextTime: [{ required: true, message: '不能为空', trigger: 'blur' }], beginTime: [{ required: true, message: '不能为空', trigger: 'blur' }], assemblyName: [{ required: true, message: '不能为空', trigger: 'blur' }], className: [{ required: true, message: '不能为空', trigger: 'blur' }], endTime: [{ required: true, message: '不能为空', trigger: 'blur' }], runTimes: [{ required: true, message: '不能为空', trigger: 'blur' }], intervalSecond: [{ required: true, message: '不能为空', trigger: 'blur' }], id: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      ruleForm: {}, // 表单模型
      Isedit: false, // 是否编辑
      TableSelect: []
    }
  },
  created  () {

  },
  methods: {
    Statusformat (state) {
      if (state === 0) {
        return '待执行'
      } else if (state === 1) {
        return '运行中'
      } else if (state === 2) {
        return '已停止'
      }
    },
    Statusclass (state) {
      if (state === 0) {
        return 'tag-warn'
      } else if (state === 1) {
        return 'tag-succeed'
      } else if (state === 2) {
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
    RunJob (index, row) {
      api.post(this.Runurl, row, data => {
        this.$refs.Page.refresh()
      }, er => {})
    },
    StopJob (index, row) {
      api.post(this.Stopurl, row, data => {
        this.$refs.Page.refresh()
      }, er => {})
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
