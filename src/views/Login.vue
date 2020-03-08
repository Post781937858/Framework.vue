<template>
<div class="Login">
  <div class="Login-head">
    <span>Vue and .NET Core前后端分离开发框架</span>
  </div>
   <div class="Login-content">
     <div  class="card-header">系统登录</div>
      <div class="form-content">
         <el-form   label-position="top"  label-width="80px" :model="formdata" :rules="rules" ref='ruleForm'>
        <el-form-item label="账号" prop='userNumber'>
          <el-input v-model="formdata.userNumber"  style="height: 40px"  placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input placeholder="请输入密码"  style="height: 40px"  v-model="formdata.password" show-password></el-input>
        </el-form-item>
      <el-form-item>
        <el-button class="Submit" :loading="Isloading" type="primary" @click="onSubmit">{{msg}}</el-button>
      </el-form-item>
      </el-form>
      <div class="form-bottom">
        <a href="#" class="form-bottom-link">免费注册</a>
        <a href="#" class="form-bottom-link">忘记密码</a>
      </div>
      </div>
   </div>
</div>
</template>
<script>
import api from '@/api/api'
import router from '@/router'
import { filterAsyncRouter } from '@/router/index'
export default {
  data () {
    return {
      formdata: {
        userNumber: '',
        password: ''
      },
      msg: '立即登录',
      Isloading: false,
      routerList: [],
      rules: { // 表单验证
        userNumber: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.Isloading = true
          this.msg = '系统登录中'
          localStorage.clear()
          router.resetRouter()
          api.add(api.apiUrl.Login, data => {
            if (data.state === 200) {
              localStorage.setItem('Authorization', data.data)
              api.Query(api.apiUrl.Menus, data => {
                localStorage.setItem('menus', JSON.stringify(data.data))
                this.analysisRouter(data.data)
                localStorage.setItem('Usermenus', JSON.stringify(this.routerList))
                router.$addRoutes(filterAsyncRouter(JSON.parse(localStorage.getItem('Usermenus'))))
                // setTimeout(() => {
                //   this.$notify({
                //     title: '成功',
                //     message: '欢迎登录，系统初始化成功',
                //     duration: 3000,
                //     type: 'success'
                //   })
                //   this.$router.push({ name: 'HomeMain' })
                // }, 500)
                this.$router.push({ name: 'HomeMain' })
              }, null, error => {
                this.Isloading = false
                this.msg = '立即登录'
                console.error(error)
              })
            } else {
              this.$notify({
                message: data.msg,
                type: 'error'
              })
              this.Isloading = false
              this.msg = '立即登录'
            }
          }, this.formdata, error => {
            this.Isloading = false
            this.msg = '立即登录'
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    // 递归获取路由树
    analysisRouter (datarouter) {
      var that = this
      datarouter.forEach(element => {
        if (element.submenu == null) {
          let routerItem = {}
          routerItem.path = element.url
          routerItem.name = element.title
          routerItem.component = null
          routerItem.meta = { 'title': element.title, 'NoNeedHome': false, 'NoNeedmain': true, 'requireAuth': true }
          that.routerList.push(routerItem)
        }
        if (element.submenu != null) { this.analysisRouter(element.submenu) }
      })
    }
  }
}
</script>
<style scoped>
.el-input__inner {
    height: 40px  !important;
    line-height:40px  !important;
}
  .Login{
    position:absolute;
    width:100%;
    height:100%;
    background: #2d3a4b;
    /* min-height: 800px; */
  }
  .Login-head{
   width: 100%;
   height: 100px;
   font-size: 40px;
   color: white;
   font-weight: bold;
   text-align: center;
   margin-top: 110px;
  }
  .Login-content{
    width: 398px;
    height: 347px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 6px black;
      background: white;
       border-radius:3px;
       opacity: 0.9.1;
  }
  .card-header{
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  .form-content{
    padding: 0.8em;
    padding-top: 0.5px;
  }
  .el-form-item {
    margin-bottom: 5px;
}
.form-bottom{
  text-align:right;
  margin-top:8px
}
.form-bottom-link{
  color: #999;
    font-size: 12px;
    margin: 0.3em;
}
.Submit{
  width:100%;
  margin-top:28px;
  height: 40px !important;
}
</style>
