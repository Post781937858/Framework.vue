<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
      <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
      <el-form-item label="名称" prop='title'>
        <el-input placeholder="名称" v-model="QueryForm.title"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop='state'>
      <el-select placeholder="请选择"  v-model="QueryForm.state">
         <el-option label="全部" :value="0"></el-option>
         <el-option label="正常" :value="200"></el-option>
         <el-option label="锁定" :value="500" ></el-option>
      </el-select>
      </el-form-item>
     <el-form-item label="类型" prop='menutype'>
      <el-select placeholder="请选择"  v-model="QueryForm.menutype">
         <el-option label="全部" :value="99"></el-option>
         <el-option label="菜单" :value="0"></el-option>
         <el-option label="按钮" :value="1"></el-option>
         <el-option label="接口" :value="2" ></el-option>
      </el-select>
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
         row-key="id"
       :tree-props="{children: 'submenu'}"
        header-row-class-name="app_heard"
        row-class-name=''
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
        :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column prop="id"  type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="title" label="名称" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center"></el-table-column>
            <el-table-column prop="method" label="接口类型" align="center"></el-table-column>
            <el-table-column prop="url" label="地址" align="center"></el-table-column>
              <el-table-column prop="menutype" label="类型"   align="center">
                <template slot-scope="scope">
                {{Typeformat(scope.row.menutype)}}
              </template>
             </el-table-column>
            <el-table-column prop="state" label="状态"   align="center">
                <template slot-scope="scope">
                <el-tag class="statetag " :class="scope.row.state === 200 ?'tag-succeed':'tag-error'" disable-transitions>{{scope.row.state === 200 ? '正常' : '锁定'}}</el-tag>
              </template>
             </el-table-column>
            <el-table-column prop="no" label="排序" align="center"></el-table-column>
              <el-table-column prop="explain" label="描述" align="center"></el-table-column>
        <el-table-column label="操作" width="180"  align="center" >
        <template slot-scope="scope" >
          <div><a  @click="AppEdit(scope.$index, scope.row)">编辑</a>
          <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
           <a   @click="AppDelete(scope.$index, scope.row)">删除</a>
          </div>
      </template>
    </el-table-column>
        </el-table>
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
      <el-form-item label="名称" prop='title'>
        <el-input placeholder="名称" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop='icon'>
        <el-input placeholder="图标" v-model="ruleForm.icon" ></el-input>
      </el-form-item>
      <el-form-item label="接口类型" prop='method'>
        <el-input placeholder="get post put delete"  v-model="ruleForm.method"></el-input>
      </el-form-item>
     <el-form-item label="父级" prop='menuid'>
        <el-cascader :options="cascaderoptions" :props="{
          children: 'submenu',
          label: 'title',
          value:'id',
          checkStrictly: true,
          multiple:false,
          emitPath:false
        }" v-model="ruleForm.menuid" clearable ref="cascader"></el-cascader>
      </el-form-item>
      <el-form-item label="地址" prop='url'>
        <el-input placeholder="地址" value="#" v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop='state'>
      <el-select placeholder="请选择"  v-model="ruleForm.state">
         <el-option label="正常" :value="200"></el-option>
         <el-option label="锁定" :value="500" ></el-option>
      </el-select>
      </el-form-item>
     <el-form-item label="类型" prop='menutype'>
      <el-select placeholder="请选择"  v-model="ruleForm.menutype">
         <!-- <el-option label="全部" :value="0"></el-option> -->
         <el-option label="菜单" :value="0"></el-option>
         <el-option label="按钮" :value="1"></el-option>
         <el-option label="接口" :value="2" ></el-option>
      </el-select>
      </el-form-item>
      <!-- <el-form-item label="父级" prop='menuid'>
      <el-select placeholder="请选择"  v-model="ruleForm.menuid">
      <el-option label="无" :value="999"></el-option>
      <el-option v-for="items in roleoptions"
      :key="items.value"
      :label="items.label"
      :value="items.value" ></el-option>
      </el-select>
      </el-form-item> -->
      <el-form-item label="排序" prop='no'>
        <el-input placeholder="排序" v-model="ruleForm.no"></el-input>
      </el-form-item>
     <el-form-item label="描述" prop='explain'>
        <el-input placeholder="描述" v-model="ruleForm.explain"></el-input>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入排序编号'))
      } else {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'))
        }
        callback()
      }
    }
    return {
      loading: false, // loading加载
      RoletableData: [],
      QueryForm: {
        title: '',
        state: 0,
        menutype: 99
      },
      dialogVisible: false, // dialog显示
      rules: { // 表单验证
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入图标类名', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入URL', trigger: 'blur' }
        ],
        menutype: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        no: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      ruleForm: { // 表单模型
        id: 0,
        title: '',
        icon: '#',
        url: '/',
        state: 200,
        menutype: null,
        menuid: null,
        explain: '',
        method: '',
        no: 0
      },
      Rowthis: {}, // 当前角色数据
      Isedit: false, // 是否编辑
      TableSelect: [],
      roleoptions: [],
      cascaderoptions: []
    }
  },
  created  () {
    this.QueryData()
  },
  methods: {
    Typeformat (type) {
      if (type === 0) {
        return '菜单'
      } else if (type === 1) {
        return '按钮'
      } else if (type === 2) {
        return '接口'
      }
      return '未知'
    },
    // 查询
    Query () {
      this.QueryData()
    },
    // 编辑
    AppEdit (index, row) {
      this.Isedit = true
      this.Rowthis = row
      this.ruleForm.id = row.id
      this.ruleForm.title = row.title
      this.ruleForm.icon = row.icon
      this.ruleForm.url = row.url
      this.ruleForm.state = row.state
      this.ruleForm.menutype = row.menutype
      console.log(row.menutype)
      this.ruleForm.menuid = row.menuid
      this.ruleForm.explain = row.explain
      this.ruleForm.no = row.no
      this.ruleForm.method = row.method
      this.dialogVisible = true
    },
    // 新增
    BarAdd () {
      this.dialogVisible = true
      this.Isedit = false
      this.Rowthis.id = 0
    },
    // 删除
    AppDelete (index, row) {
      this.$confirm('此操作将删除所选内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Rowthis = row
        this.dalete([this.Rowthis])
      }).catch(() => {})
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
      this.QueryData()
    },
    // PageIndex更改
    CurrentChange (index) {
      this.PageIndex = index
      this.QueryData()
    },
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.QueryData()
    },
    // 清除dialog表单
    resetdialog () {
      this.ruleForm.id = 0
      this.ruleForm.title = ''
      this.ruleForm.icon = '#'
      this.ruleForm.url = '/'
      this.ruleForm.state = 200
      this.ruleForm.menutype = null
      this.ruleForm.menuid = null
      this.ruleForm.explain = ''
      this.ruleForm.no = 0
      this.ruleForm.method = ''
      this.$refs.ruleForm.clearValidate()
    },
    // 表单提交
    submitForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.Isedit) {
            this.update()
          } else { this.Add() }
        } else {
          return false
        }
      })
    },
    // 查询角色
    QueryData () {
      this.loading = true
      api.Query(api.apiUrl.MenusAll, data => {
        this.loading = false
        this.RoletableData = data.data
        this.roleoptions = []
        data.data.forEach(p => {
          if (p.menutype === 0) {
            this.roleoptions.push({ value: p.id, label: p.title })
          }
        })
      }, this.QueryForm, error => { this.loading = false; console.error(error) })
      api.Query(api.apiUrl.MenusPower, data => {
        this.cascaderoptions = data.data
      }, this.QueryForm, error => { this.loading = false; console.error(error) })
    },
    // 添加角色
    Add () {
      this.ruleForm.no = parseInt(this.ruleForm.no)
      this.ruleForm.menuid = parseInt(this.ruleForm.menuid == null ? 0 : this.ruleForm.menuid)
      api.add(api.apiUrl.Menus, data => {
        this.QueryData()
        this.$notify({
          title: '提示',
          message: data.state === 200 ? '操作成功' : '操作失败',
          duration: 2000,
          type: data.state === 200 ? 'success' : 'error'
        })
        this.dialogVisible = false
      }, this.ruleForm, error => {
        console.error(error)
      })
    },
    // 更新角色
    update () {
      let CheckedNodes = this.$refs.cascader.getCheckedNodes()
      if (CheckedNodes.length > 0) {
        if (CheckedNodes[0] != null && (CheckedNodes[0].data.id === this.ruleForm.id)) {
          this.$notify({
            title: '提示',
            message: '父子级关系错误',
            duration: 2000,
            type: 'error'
          })
          return
        }
      }
      this.ruleForm.menuid = parseInt(this.ruleForm.menuid == null ? 0 : this.ruleForm.menuid)
      api.update(api.apiUrl.Menus, data => {
        this.QueryData()
        this.$notify({
          title: '提示',
          message: data.state === 200 ? '操作成功' : '操作失败',
          duration: 2000,
          type: data.state === 200 ? 'success' : 'error'
        })
        this.dialogVisible = false
      }, this.ruleForm, error => {
        console.error(error)
        this.dialogVisible = false
      })
    },
    // 删除角色
    dalete (data) {
      api.delete(api.apiUrl.Menus, data => {
        this.QueryData()
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
<style scoped>
.statetag{
  display: inline-block !important;
    font-size: 75% !important;
    font-weight: 700 !important;
    color: #fff !important;
    text-align: center !important;
    width: 65px !important;
    border-radius: 0.25em !important;
   height: 23px !important;
    line-height: 23px !important;
    border-radius: 3px !important;
}
.tag-succeed{
  background: #2D8CF0 !important;
}
.tag-error{
  background:#2F4056!important
}
.userImg{
  width:30px;
  height: 30px;
  border-radius: 50%;
}
</style>
