<template>
  <div class="app-home">
    <div class="app-centre">
       <!-- <div class="app-Tag-row app-Tag-row-panel app-Breadcrumb">
         <el-breadcrumb separator="/">
          <el-breadcrumb-item >首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
       </div> -->
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
      <el-form-item label="账号" prop='userNumber'>
        <el-input placeholder="账号" v-model="QueryForm.userNumber"></el-input>
      </el-form-item>
      <el-form-item label="角色"  prop='powerName'>
      <el-select placeholder="请选择" v-model="QueryForm.powerName">
      <el-option v-for="items in roleoptions"
      :key="items.value"
      :label="items.label"
      :value="items.value" ></el-option>
      </el-select>
      </el-form-item>
        <el-form-item label="状态" prop='userState'>
      <el-select placeholder="请选择"  v-model="QueryForm.userState">
         <el-option label="全部" :value="0"></el-option>
         <el-option label="正常" :value="200"></el-option>
         <el-option label="锁定" :value="500" ></el-option>
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
        header-row-class-name="app_heard"
        row-class-name=''
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
       >
            <el-table-column prop="id"  type="selection" align="center"  width="40"></el-table-column>
            <el-table-column prop="userNumber" label="账号" align="center"></el-table-column>
            <el-table-column prop="showName" label="显示名称" align="center"></el-table-column>
            <el-table-column prop="powerName" label="角色" align="center"></el-table-column>
            <el-table-column prop="remark" label="描述" align="center"></el-table-column>
            <el-table-column prop="userState" label="状态"   align="center">
                <template slot-scope="scope">
                <el-tag class="statetag " :class="scope.row.userState === 200 ?'tag-succeed':'tag-error'" disable-transitions>{{scope.row.userState === 200 ? '正常' : '锁定'}}</el-tag>
              </template>
             </el-table-column>
              <!-- <el-table-column prop="Imgurl" label="图像" align="center">
                <template slot-scope="scope" >
                  <img class="userImg" :src='GetImg(scope.row.imgurl)'>
                </template>
              </el-table-column> -->
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
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
      title="角色编辑"
      @close="resetdialog"
      :append-to-body='true'
      :visible.sync="dialogVisible"
      width="27%">
      <el-form :model="ruleForm" label-position="top" label-width="80px" :rules="rules" ref='ruleForm' >
      <el-form-item label="账号" prop='userNumber'>
        <el-input  v-model="ruleForm.userNumber"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop='password'>
        <el-input  type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
       <el-form-item label="再次输入密码" prop='checkpassword'>
        <el-input type="password"  v-model="ruleForm.checkpassword"></el-input>
      </el-form-item>
       <el-form-item label="显示名称" prop='showName'>
        <el-input  v-model="ruleForm.showName"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop='remark'>
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="角色"  prop='powerName'>
      <el-select placeholder="请选择"  v-model="ruleForm.powerName">
      <el-option v-for="items in roleoptions"
      :key="items.value"
      :label="items.label"
      :value="items.value" ></el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="状态" prop='userState'>
      <el-select placeholder="请选择"  v-model="ruleForm.userState">
         <el-option label="正常" :value="200"></el-option>
         <el-option label="锁定" :value="500" ></el-option>
      </el-select>
      </el-form-item>
  <el-form-item label="图像">
    <el-upload
    class="upload-demo"
    :limit='1'
     :action="action()"
    :headers='Fileheaders()'
    :file-list="fileList"
    :on-error='FileError'
    :on-success="FileSuccess"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
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
import elPagination from '@/components/Pagination'
export default {
  components: { elPagination },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkpassword !== '') {
          this.$refs.ruleForm.validateField('checkpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      url: api.apiUrl.User,
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: {
        userNumber: '',
        powerName: '',
        userState: 0
      },
      dialogVisible: false, // dialog显示
      rules: { // 表单验证
        userNumber: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkpassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        powerName: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      },
      ruleForm: { // 表单模型
        userNumber: '',
        password: '',
        checkpassword: '',
        remark: '',
        powerName: '',
        userState: 200,
        showName: ''
      },
      Rowthis: {}, // 当前角色数据
      Isedit: false, // 是否编辑
      TableSelect: [],
      fileList: [],
      roleoptions: []
    }
  },
  created  () {
    this.QueryRole()
  },
  methods: {
    action () {
      return api.UserUpload()
    },
    GetImg (filename) {
      return api.GetImg(filename)
    },
    Fileheaders () {
      return { 'Authorization': 'Bearer ' + localStorage.getItem('Authorization') }
    },
    FileError () {
      this.$notify({
        title: '提示',
        message: '文件上传失败',
        duration: 2000,
        type: 'error'
      })
    },
    FileSuccess (response, file, fileList) {
      console.log(response.initialPreviewConfig.key)
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
      this.fileList[0].name = response.initialPreviewConfig.key
    },
    // 查询
    Query () {
      this.$refs.Page.refresh()
    },
    // 编辑
    AppEdit (index, row) {
      this.Isedit = true
      this.Rowthis = row
      this.fileList.push({ name: row.imgurl, url: this.GetImg(row.imgurl) })
      this.ruleForm.userNumber = row.userNumber
      this.ruleForm.password = row.password
      this.ruleForm.showName = row.showName
      this.ruleForm.remark = row.remark
      this.ruleForm.userState = row.userState
      this.ruleForm.powerName = row.powerName
      this.dialogVisible = true
    },
    // 新增
    BarAdd () {
      this.fileList = []
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
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.$refs.Page.refresh()
    },
    // 清除dialog表单
    resetdialog () {
      this.ruleForm.userNumber = ''
      this.ruleForm.password = ''
      this.ruleForm.showName = ''
      this.ruleForm.remark = ''
      this.ruleForm.userState = 200
      this.ruleForm.powerName = ''
      this.ruleForm.checkpassword = ''
      this.$refs.ruleForm.clearValidate()
      this.fileList = []
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
    QueryRole () {
      api.Query(api.apiUrl.PowerAll, data => {
        data.data.forEach(p => {
          this.roleoptions.push({ value: p.name, label: p.name })
        })
      }, {}, error => { console.error(error) })
    },
    // 添加
    Add () {
      if (this.fileList.length === 0) {
        this.$notify({
          title: '提示',
          message: '请上传图像',
          duration: 2000,
          type: 'error'
        })
        return
      }
      this.ruleForm.userState = parseInt(this.ruleForm.userState)
      this.ruleForm.imgurl = this.fileList[0].name
      this.$refs.Page.add(JSON.parse(JSON.stringify(this.ruleForm)))
      this.dialogVisible = false
    },
    // 更新
    update () {
      this.Rowthis.password = this.ruleForm.password
      this.Rowthis.showName = this.ruleForm.showName
      this.Rowthis.remark = this.ruleForm.remark
      this.Rowthis.userState = this.ruleForm.userState
      this.Rowthis.powerName = this.ruleForm.powerName
      this.Rowthis.imgurl = this.fileList[0].name
      this.$refs.Page.edit(this.Rowthis)
      this.dialogVisible = false
    },
    // 删除
    dalete (data) {
      this.$refs.Page.dalete(data)
    }
  }
}
</script>
<style >
.userImg{
  width:30px;
  height: 30px;
  border-radius: 50%;
}
</style>
