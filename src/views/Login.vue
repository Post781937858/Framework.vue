<template>
<div class="Login" :style="note">
   <div class="Login-content">
     <div  class="header">
       <img :src="require('../assets/logo.png')">
     </div>
       <div  class="header-title">
       <span  class="login-title">VUE AND .NET CORE</span>
     </div>
      <div class="form-content">
         <el-form   label-position="top"  label-width="80px" :model="formdata" :rules="rules" ref='ruleForm'>
        <el-form-item  prop='userNumber'>
          <el-input prefix-icon="el-icon-user-solid" v-model="formdata.userNumber"  style="height: 40px"  placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  style="margin-top: 30px;" prop='password'>
          <el-input  prefix-icon="el-icon-lock" placeholder="请输入密码"  style="height: 40px"  v-model="formdata.password" show-password></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px;">
         <el-checkbox v-model="formdata.checked" >自动登陆</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="Submit" :loading="Isloading" type="primary" @click="onSubmit">{{msg}}</el-button>
      </el-form-item>
      </el-form>
      <!-- <div class="form-bottom">
        <a href="#" class="form-bottom-link">免费注册</a>
        <a href="#" class="form-bottom-link">忘记密码</a>
      </div> -->
      </div>
   </div>
   <div class="footer">
     <div  class="copyright">&copy; 2020 GALAXIS 版权所有</div>
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
        password: '',
        checked: false
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
      },
      note: {
        backgroundImage: 'url(' + require('../assets/bg.svg') + ')'
      }
    }
  },
  mounted () {
    let IsAutoLogonData = JSON.parse(localStorage.getItem('AutoLogon'))
    if (IsAutoLogonData != null && IsAutoLogonData.IsAutoLogon && localStorage.getItem('Authorization') != null) {
      this.$router.push({ name: 'HomeMain' })
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
              if (this.formdata.checked) {
                localStorage.setItem('AutoLogon', JSON.stringify({ IsAutoLogon: true }))
              } else {
                localStorage.removeItem('AutoLogon')
              }
              localStorage.setItem('user', JSON.stringify(data.data.user))
              localStorage.setItem('Authorization', data.data.token)
              api.Query(api.apiUrl.Menus, data => {
                localStorage.setItem('menus', JSON.stringify(data.data))
                this.analysisRouter(data.data)
                localStorage.setItem('Usermenus', JSON.stringify(this.routerList))
                router.$addRoutes(filterAsyncRouter(JSON.parse(localStorage.getItem('Usermenus'))))
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
<style>
.el-input__inner {
    height: 40px  !important;
    line-height:40px  !important;
}
  .Login{
    position:absolute;
    width:100%;
    height:100%;
    background: #f0f2f5;
    background-image: "url(" + require("../../assets/save.png") + ")"'./assets/bg.svg';
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
    width: 450px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
       border-radius:3px;
       opacity: 0.9.1;
  }
  .card-header{
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  .header{
    text-align: center;
    height: 70px;
    line-height: 70px;
    margin-bottom: 20px;
  }
  .header-title{
    text-align: center;
    height: 70px;
    line-height: 70px;
    margin-bottom: 40px;
  }
  .header img{
    width: 100px;
    height: 100px;
    vertical-align: top;
  }
  .login-title{
    font-size: 33px;
    color: rgba(0,0,0,.85);
    font-family: Myriad Pro,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
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
  height: 40px !important;
}
.copyright{
  color: rgba(0,0,0,.45);
    font-size: 14px;
}
.footer{
   position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding:30px 0px;
    text-align: center;
}
</style>
