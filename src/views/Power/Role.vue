<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="角色名">
        <el-input placeholder="角色名" v-model="role"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input placeholder="创建人" v-model="user"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="Query"  >查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
       <div class="form-bar">
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
        :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column prop="id"  type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="name" label="角色名称"  align="center"></el-table-column>
            <el-table-column prop="explain" label="角色描述" align="center" ></el-table-column>
            <el-table-column prop="showName" label="创建人" align="center"></el-table-column>
             <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" width="180"  align="center" >
        <template slot-scope="scope" >
          <div><a  @click="AppEdit(scope.$index, scope.row)">编辑</a>
          <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
          <el-popconfirm
          @onConfirm='AppDelete(scope.$index, scope.row)'
        confirmButtonText='好的'
        cancelButtonText='不用了'
        icon="el-icon-info"
        title="确定删除当前角色吗？"
        iconColor="red">
    <a slot="reference">删除</a>
    </el-popconfirm>
          </div>
      </template>
    </el-table-column>
        </el-table>
        <div class="app-pagination">
    <el-pagination
        background
        :hide-on-single-page='IshidePage'
        :current-page="PageIndex"
        :page-sizes="[10,30, 50, 90]"
        @size-change='SizeChange'
        @current-change='CurrentChange'
        layout="prev, pager, next"
        :total="PageCount">
    </el-pagination>
        </div>
          </div>
      </div>
    </div>
    <el-dialog
      title="角色编辑"
      @close="resetdialog"
      :append-to-body='true'
      :visible.sync="dialogVisible"
      width="27%">
      <el-form :model="ruleForm" label-position="top" label-width="80px" :rules="rules" ref='ruleForm' >
      <el-form-item label="角色名称" prop="name">
        <el-input  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="ruleForm.explain"></el-input>
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
import api from '@/api/api'
export default {
  data () {
    return {
      RoletableData: [],
      loading: false, // loading加载
      IshidePage: false, // 是否隐藏分页
      PageCount: 0, // 总条数
      PageIndex: 1, // 当页
      PageSize: 10, // 页面大小
      role: '',
      user: '',
      dialogVisible: false, // dialog显示
      rules: { // 表单验证
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      ruleForm: { // 表单模型
        name: '',
        explain: ''
      },
      Rowthis: {}, // 当前角色数据
      Isedit: false, // 是否编辑
      TableSelect: []
    }
  },
  mounted  () {
    this.GetRolet()
  },
  methods: {
    // 查询
    Query () {
      this.GetRolet()
    },
    // 编辑
    AppEdit (index, row) {
      this.dialogVisible = true
      this.Isedit = true
      this.Rowthis = row
      this.ruleForm.name = row.name
      this.ruleForm.explain = row.explain
    },
    // 新增
    BarAdd () {
      this.dialogVisible = true
      this.Isedit = false
      this.Rowthis.id = 0
    },
    // 删除
    AppDelete (index, row) {
      this.Rowthis = row
      console.log(row)
      this.dalete([this.Rowthis])
    },
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
    BarEdit () {
      if (this.TableSelect.length === 1) {
        // this.Rowthis = this.TableSelect[0]
        // this.ruleForm.name = this.TableSelect[0].name
        // this.ruleForm.explain = this.TableSelect[0].explain
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
    SelectedChange (selection) {
      this.TableSelect = selection
    },
    // 分页页面大小更改
    SizeChange (size) {
      this.PageSize = size
      this.GetRolet()
    },
    // PageIndex更改
    CurrentChange (index) {
      this.PageIndex = index
      this.GetRolet()
    },
    // 重置
    reset () {
      this.role = ''
      this.user = ''
      this.GetRolet()
    },
    // 清除dialog表单
    resetdialog () {
      this.ruleForm.name = ''
      this.ruleForm.explain = ''
    },
    // 表单提交
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          if (this.Isedit) {
            this.update()
          } else { this.Add() }
        } else {
          return false
        }
      })
    },
    // 查询角色
    GetRolet () {
      this.loading = true
      api.Query(api.apiUrl.Power, data => {
        this.IshidePage = false
        this.RoletableData = data.data.data
        this.PageCount = data.data.dataCount
        this.loading = false
        if (this.PageCount === 0) this.IshidePage = true
      }, { Pageindex: this.PageIndex, PageSize: this.PageSize, Role: this.role, user: this.user }, error => { this.IshidePage = true; this.loading = false; console.error(error) })
    },
    // 添加角色
    Add () {
      this.Rowthis.name = this.ruleForm.name
      this.Rowthis.explain = this.ruleForm.explain
      api.add(api.apiUrl.Power, data => {
        this.GetRolet()
        this.$notify({
          title: '提示',
          message: data.state === 200 ? '操作成功' : '操作失败',
          duration: 2000,
          type: data.state === 200 ? 'success' : 'error'
        })
      }, this.Rowthis, error => {
        console.error(error)
      })
    },
    // 更新角色
    update () {
      this.Rowthis.name = this.ruleForm.name
      this.Rowthis.explain = this.ruleForm.explain
      api.update(api.apiUrl.Power, data => {
        this.GetRolet()
        this.$notify({
          title: '提示',
          message: data.state === 200 ? '操作成功' : '操作失败',
          duration: 2000,
          type: data.state === 200 ? 'success' : 'error'
        })
      }, this.Rowthis, error => {
        console.error(error)
      })
    },
    // 删除角色
    dalete (data) {
      api.delete(api.apiUrl.Power, data => {
        this.GetRolet()
        this.$notify({
          title: '提示',
          message: data.state === 200 ? '操作成功' : '操作失败',
          duration: 2000,
          type: data.state === 200 ? 'success' : 'error'
        })
      }, data, error => { console.log(error) })
    }
  }
}
</script>
