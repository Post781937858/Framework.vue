<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
      <el-form-item label="消息id" prop='mesid'>
        <el-input placeholder="消息id" v-model="QueryForm.mesid"></el-input>
      </el-form-item>
      <el-form-item label="消息类型" prop='messageName'>
        <el-input placeholder="消息类型" v-model="QueryForm.messageName"></el-input>
      </el-form-item>
      <el-form-item label="箱号ID" prop='boxId'>
        <el-input placeholder="箱号ID" v-model="QueryForm.boxId"></el-input>
      </el-form-item>
      <el-form-item label="层位" prop='level'>
        <el-input placeholder="层位" v-model="QueryForm.level"></el-input>
      </el-form-item>
      <el-form-item label="重量" prop='weight'>
        <el-input placeholder="重量" v-model="QueryForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="库区编码" prop='areaCode'>
        <el-input placeholder="库区编码" v-model="QueryForm.areaCode"></el-input>
      </el-form-item>
      <el-form-item label="来源库区" prop='sourceCode'>
        <el-input placeholder="来源库区" v-model="QueryForm.sourceCode"></el-input>
      </el-form-item>
      <el-form-item label="取货站台" prop='s_station'>
        <el-input placeholder="取货站台" v-model="QueryForm.s_station"></el-input>
      </el-form-item>
      <el-form-item label="放货站台" prop='d_station'>
        <el-input placeholder="放货站台" v-model="QueryForm.d_station"></el-input>
      </el-form-item>
      <el-form-item label="货位" prop='location'>
        <el-input placeholder="货位" v-model="QueryForm.location"></el-input>
      </el-form-item>
      <el-form-item label="wmsID" prop='wmsid'>
        <el-input placeholder="wmsID" v-model="QueryForm.wmsid"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop='state'>
        <el-input placeholder="状态" v-model="QueryForm.state"></el-input>
      </el-form-item>
      <el-form-item label="priority" prop='priority'>
        <el-input placeholder="priority" v-model="QueryForm.priority"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop='createTime'>
        <el-date-picker placeholder="创建时间" v-model="QueryForm.createTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="完成时间" prop='endTime'>
        <el-date-picker placeholder="完成时间" v-model="QueryForm.endTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="主键" prop='Id'>
        <el-input placeholder="主键" v-model="QueryForm.Id"></el-input>
      </el-form-item>
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
            <el-table-column prop="mesid" label="消息id" align="center"></el-table-column>
            <el-table-column prop="messageName" label="消息类型" align="center"></el-table-column>
            <el-table-column prop="boxId" label="箱号ID" align="center"></el-table-column>
            <el-table-column prop="level" label="层位" align="center"></el-table-column>
            <el-table-column prop="weight" label="重量" align="center"></el-table-column>
            <el-table-column prop="areaCode" label="库区编码" align="center"></el-table-column>
            <el-table-column prop="sourceCode" label="来源库区" align="center"></el-table-column>
            <el-table-column prop="s_station" label="取货站台" align="center"></el-table-column>
            <el-table-column prop="d_station" label="放货站台" align="center"></el-table-column>
            <el-table-column prop="location" label="货位" align="center"></el-table-column>
            <el-table-column prop="wmsid" label="wmsID" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
            <el-table-column prop="priority" label="priority" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="endTime" label="完成时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180"  align="center" >
        <template slot-scope="scope" >
          <div><a  @click="AppEdit(scope.$index, scope.row)">编辑</a>
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
      <el-form :model="ruleForm" class="demo-form-inline" :inline="true" label-width="80px" :rules="rules" ref='ruleForm'>
      <el-form-item  class="col-2" label="消息id" prop='mesid'>
        <el-input  v-model.number="ruleForm.mesid"></el-input>
      </el-form-item>
      <el-form-item class="col-2" label="消息类型" prop='messageName'>
        <el-input  v-model="ruleForm.messageName"></el-input>
      </el-form-item>
      <el-form-item class="col-2"  label="箱号ID" prop='boxId'>
        <el-input  v-model.number="ruleForm.boxId"></el-input>
      </el-form-item>
      <el-form-item label="层位" class="col-2" prop='level'>
        <el-input  v-model="ruleForm.level"></el-input>
      </el-form-item>
      <el-form-item label="重量" class="col-2" prop='weight'>
        <el-input  v-model.number="ruleForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="库区编码" class="col-2" prop='areaCode'>
        <el-input  v-model="ruleForm.areaCode"></el-input>
      </el-form-item>
      <el-form-item label="来源库区" class="col-2" prop='sourceCode'>
        <el-input  v-model="ruleForm.sourceCode"></el-input>
      </el-form-item>
      <el-form-item label="取货站台" class="col-2" prop='s_station'>
        <el-input  v-model="ruleForm.s_station"></el-input>
      </el-form-item>
      <el-form-item label="放货站台" class="col-2" prop='d_station'>
        <el-input  v-model="ruleForm.d_station"></el-input>
      </el-form-item>
      <el-form-item label="货位" class="col-2" prop='location'>
        <el-input  v-model="ruleForm.location"></el-input>
      </el-form-item>
      <el-form-item label="wmsID" class="col-2" prop='wmsid'>
        <el-input  v-model.number="ruleForm.wmsid"></el-input>
      </el-form-item>
      <el-form-item label="状态" class="col-2" prop='state'>
        <el-input  v-model.number="ruleForm.state"></el-input>
      </el-form-item>
      <el-form-item label="priority" class="col-2" prop='priority'>
        <el-input  v-model.number="ruleForm.priority"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import api from '@/api/api'
import elPagination from '@/components/Pagination'
export default {
  components: { elPagination },
  data () {
    return {
      url: '/api/Order',
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: { mesid: null,
        messageName: '',
        boxId: null,
        level: '',
        weight: null,
        areaCode: '',
        sourceCode: '',
        s_station: '',
        d_station: '',
        location: '',
        wmsid: null,
        state: null,
        priority: null,
        createTime: null,
        endTime: null,
        Id: null
      },
      dialogVisible: false, // dialog显示
      rules: { // 表单验证
        mesid: [{ required: true, message: '不能为空', trigger: 'blur' }],
        messageName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        boxId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        level: [{ required: true, message: '不能为空', trigger: 'blur' }],
        weight: [{ required: true, message: '不能为空', trigger: 'blur' }],
        areaCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sourceCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        s_station: [{ required: true, message: '不能为空', trigger: 'blur' }],
        d_station: [{ required: true, message: '不能为空', trigger: 'blur' }],
        location: [{ required: true, message: '不能为空', trigger: 'blur' }],
        wmsid: [{ required: true, message: '不能为空', trigger: 'blur' }],
        state: [{ required: true, message: '不能为空', trigger: 'blur' }],
        priority: [{ required: true, message: '不能为空', trigger: 'blur' }],
        createTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        id: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      ruleForm: {}, // 表单模型
      Isedit: false, // 是否编辑
      TableSelect: []
    }
  },
  created  () {

  },
  methods: {
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
