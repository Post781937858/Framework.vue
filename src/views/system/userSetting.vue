<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
    <div class="app-card-header">个人设置</div>
     <div class="app-card-body app-card-list ">
    <div class="setting">
   <el-form :model="ruleForm" label-position="top"  label-width="80px"  ref='ruleForm' :rules="rules">
      <el-form-item  class="col" label="账号" prop='userNumber'>
        <el-input  v-model.number="ruleForm.userNumber" :disabled="true"></el-input>
      </el-form-item>
   <el-form-item  class="col" label="注册日期" prop='createTime'>
        <el-input  v-model.number="ruleForm.createTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item  class="col" label="角色" prop='powerName'>
        <el-input  v-model.number="ruleForm.powerName" :disabled="true"></el-input>
      </el-form-item>
    <el-form-item  class="col" label="昵称" prop='showName'>
        <el-input  v-model.number="ruleForm.showName"></el-input>
      </el-form-item>
      <el-form-item class="col"  label="个人介绍" prop='remark'>
        <el-input  type="textarea" v-model.number="ruleForm.remark"></el-input>
      </el-form-item>
       <el-form-item class="col" >
        <el-button type="primary" @click="btn_submit">更新基本信息</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="setting-img">
    <el-form label-position="top" :model="ruleForm">
       <el-form-item class="col"  label="头像">
        <img :src='GetImg(ruleForm.imgurl)' class="userimg" @click="show">
      </el-form-item>
          <el-form-item class="col" >
                <el-upload
      class="avatar-uploader"
      :action="action()"
      :show-file-list="false"
       :on-success="handleAvatarSuccess"
    >
    <el-button icon="el-icon-camera-solid">更新头像</el-button>
    </el-upload>
    <el-dialog  title="图像查看" :visible.sync="dialogVisible"   :append-to-body='true'>
    <img width="100%" :src="GetImg(ruleForm.imgurl)" alt="">
     </el-dialog>
      </el-form-item>
    </el-form>
    </div>
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
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        userNumber: '',
        createTime: null,
        powerName: '',
        showName: '',
        imgurl: 'user.svg'
      },
      rules: { // 表单验证
        userNumber: [{ required: true, message: '不能为空', trigger: 'blur' }],
        powerName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        createTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        showName: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    action () {
      return api.UserUpload()
    },
    GetImg (filename) {
      return api.GetImg(filename)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.imgurl = res.initialPreviewConfig.key
    },
    get () {
      api.get(api.apiUrl.getUser, null, data => {
        this.ruleForm = data.data
      }, er => {})
    },
    show () {
      this.dialogVisible = true
    },
    btn_submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          api.put(api.apiUrl.userSetting, this.ruleForm, data => {
            if (data.state === 200) {
              this.$parent.update(this.ruleForm.showName, this.ruleForm.imgurl)
            }
          }, er => {})
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.setting{
    width: 50%;
    display: inline-block;
    max-width: 500px;
     float: left;
}
.setting-img{
    width: 38%;
    height: 300px;
    display: inline-block;
    margin-top: 0px;
    float: left;
    margin-left: 40px;
}
.userimg{
display: block;
width: 90px;
height: 90px;
border:  1px solid #dcdee2;
border-radius: 5px;

}
</style>
