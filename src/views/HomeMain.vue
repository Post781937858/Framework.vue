<template>
  <div class="main">
   <div class="main-left" ref="Navleft">
       <div class="main-left-logo">
         <span class="logo-menu" v-show="tltle_icon"><i  class="fa fa-laptop fa-ls"></i></span>
         <span class="title-menu" v-show="tltle_text">Blog后台管理系统</span>
       </div>
       <div class="main-left-menu">
         <el-scrollbar style="height:100%;">
         <el-menu  class="el-menu-vertical-demo" :router="true" :default-active="$route.path" @select='NavMenuselect'
                background-color="#191a23"
                style="transition: all 0s"
                text-color="#fff"
                unique-opened  :collapse="isCollapse"
                active-text-color="white" >
      <template v-for="(item,index) in routes">
       <el-submenu   :index="'/'+item.url+item.title"  :key="index+'index'" v-if="item.submenu!=null">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <Menubar v-for="(menu,index) in item.submenu"  :key="index +'1'"
          :submenuitem="menu"></Menubar>
        </el-submenu>
        <el-menu-item :index="item.url" v-else :key="index+'s'">
            <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
       </el-menu-item>
      </template>
      </el-menu>
    </el-scrollbar>
       </div>
   </div>
   <div class="main-top" ref=NavTop>
      <!-- <div class="main-top-content"> -->
        <div class="main-top-head">
          <ul class="main-top-head-menu head-menu-left">
            <li @click="OnCollapse"><i  class="fa fa-outdent " ></i></li>
            <li><i  class="fa fa-sitemap "></i></li>
            <li><i  class="fa fa-desktop"></i></li>
          </ul>
      <div class="dropdown-menu">
       <div class="dropdown-menu-item">
        <ul class="main-top-head-menu head-menu-right">
        <li><i data-v-68e61d72="" class="fa fa-envelope-o "></i></li>
        <li><i data-v-68e61d72="" class="fa fa-arrows-alt "></i></li>
      </ul>
       </div>
     <div class="dropdown-menu-item" style=" padding-right: 10px;">
               <img :src='require("../assets/user.svg")' class="user-img">
        <el-dropdown @command="handleCommand" >
       <span class="el-dropdown-link" style="cursor:pointer;margin:0px 8px;">
        贤心<i class="el-icon-arrow-down el-icon--right lg"></i>
        </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="1">基本资料</el-dropdown-item>
            <el-dropdown-item command="2">修改密码</el-dropdown-item>
            <el-dropdown-item command="3" >退出系统</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
            </div>
          </div>
        </div>
        <div class="main-top-head-bar">
        <ScrollPane style="height:38px">
        <div style="white-space: nowrap;">
            <template  v-for="(tag,index) in dynamicTags">
            <el-tag
              :key="tag.title"
              closable
              v-if="index!=0"
              type="info"
              :class="tag.Tagcalss"
              :disable-transitions="true"
              @click="TagClick(tag)"
              @close="TagClose(tag)">
              {{tag.title}}
            </el-tag>
                <el-tag
                v-else
              :key="tag.title"
              type="info"
              :class="tag.Tagcalss"
              :disable-transitions="true"
              @click="TagClick(tag)"
              >
              {{tag.title}}
            </el-tag>
            </template>
        </div>

    </ScrollPane>
<div class="menu-bar" type="primary">
    <el-dropdown>
       <span class="el-dropdown-link">
       <i class="el-down fa fa-angle-double-down fa-lg tag-menu" ></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭当前页</el-dropdown-item>
          <el-dropdown-item>关闭其它页</el-dropdown-item>
          <el-dropdown-item>关闭所有页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
        </div>
      <!-- </div> -->
   </div>
   <div class="main-content" ref="NavMain">
     <!-- <el-scrollbar style="height:100%;"> -->
      <router-view></router-view>
     <!-- </el-scrollbar> -->
   </div>
  </div>
</template>
<script>
import ScrollPane from '@/components/ScrollPane'
import Menubar from '@/components/Menubar'
import router from '@/router'
export default {
  components: { Menubar, ScrollPane },
  data () {
    return {
      dynamicTags: [{ 'title': '系统首页', 'Tagcalss': 'el-tag-select', 'path': '/HomeMain' }],
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      tltle_text: true,
      tltle_icon: false,
      isCollapse: false,
      routes: []
    }
  },
  created () {
    if (localStorage.getItem('tags') != null) { this.dynamicTags = JSON.parse(localStorage.getItem('tags')) }
    this.routes = JSON.parse(localStorage.getItem('menus'))
    this.NavMenuselect(this.$route.path, null)
  },
  mounted () {
    document.body.addEventListener('touchstart', function () { })
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    const that = this
    this.init(that.screenWidth)
  },
  methods: {
    NavMenuselect (index, indexPath) {
      let item = JSON.parse(localStorage.getItem('Usermenus')).filter(p => p.path === index)
      if (item.length > 0) {
        this.dynamicTags.forEach(item => { item.Tagcalss = '' })
        let tags = this.dynamicTags.filter(p => p.path === index)
        if (tags.length === 0) {
          this.dynamicTags.push({ 'title': item[0].name, 'Tagcalss': 'el-tag-select', 'path': index })
        } else {
          tags[0].Tagcalss = 'el-tag-select'
        }
        sessionStorage.setItem('tags', JSON.stringify(this.dynamicTags))
      }
    },
    TagClose (tag) {
      let index = this.dynamicTags.indexOf(tag)
      if (tag.Tagcalss === 'el-tag-select') {
        if (parseInt(index) !== 0) {
          let last = this.dynamicTags[parseInt(index) - 1]
          last.Tagcalss = 'el-tag-select'
          this.$router.push(last.path)
        } else {
          this.$router.push({ name: 'HomeMain' })
        }
      }
      this.dynamicTags.splice(index, 1)
      sessionStorage.setItem('tags', JSON.stringify(this.dynamicTags))
    },
    TagClick (tag) {
      this.dynamicTags.forEach(item => { item.Tagcalss = '' })
      tag.Tagcalss = 'el-tag-select'
      if (this.$route.path !== tag.path) {
        this.$router.push(tag.path)
      }
      sessionStorage.setItem('tags', JSON.stringify(this.dynamicTags))
    },
    OnCollapse () {
      this.tltle_text = this.isCollapse
      this.tltle_icon = !this.isCollapse
      if (this.isCollapse) {
        this.$refs.NavTop.classList.remove('main-top-collapse')
        this.$refs.NavMain.classList.remove('main-content-collapse')
        this.$refs.Navleft.classList.remove('main-left-collapse')
      } else {
        this.$refs.NavTop.classList.add('main-top-collapse')
        this.$refs.NavMain.classList.add('main-content-collapse')
        this.$refs.Navleft.classList.add('main-left-collapse')
      }
      this.isCollapse = !this.isCollapse
    },
    handleCommand (command) {
      switch (parseInt(command)) {
        case 1: break
        case 2: break
        case 3:this.exit(); break
      }
    },
    exit () {
      localStorage.clear()
      router.resetRouter()
      this.$router.push({ name: 'Login' })
    },
    init (Width) {
      if (Width < 768 && !this.isCollapse) {
        this.OnCollapse()
      } else if (Width > 700 && this.isCollapse) {
        // this.OnCollapse()
      }
    }
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.init()
          that.timer = false
        }, 400)
      }
    },
    '$route.path': function (newVal, oldVal) {

    }
  }
}
</script>
<style>
.main{
  height: 100%;
}
.main-left{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 256px;
    height: 100%;
    background-color: #191a23;
    overflow: hidden;
    transition: all  0.2s linear;
    z-index: 5;
}
.main-top{
    position: fixed;
    left: 0px;
    top: 0px;
     right: 0px;
     margin-left: 256px;
    /* height: 88px; */
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    transition: all 0.2s linear;
}
.main-top-content{
    background: white;
    padding-right:  256px;
    border-top: 1px solid rgb(117, 102, 102);
}
.main-content{
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    margin-left:  256px;
    margin-top: 94px;
    overflow: auto;
    transition: all 0.2s linear;
    background:#f5f7f9;
    -webkit-overflow-scrolling: touch;
}
.main-content-Body{
     height: 100%;
     background: #f5f7f9 !important;
     padding-right:  256px;
     padding-bottom:88px;
}
.main-left-logo{
    height: 50px;
    line-height: 50px;
     color: rgb(255, 255, 255);
    text-align: center;
    font-size: 20px;
    box-shadow: black 0px 1px 2px 0px;
}
.main-left-menu{
    height: 100%;
    margin-top: 2px;
 overflow: hidden;
}
.logo-menu{
    /* display: none ; */
    font-size: 23px;
}
.title-menu{
    /* display: block; */
    font-weight: bold;
    font-size: 16px;
    font-family: 微软雅黑;
}
.main-top-head{
  height: 50px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
}
.main-top-head-bar{
  position: relative;
 padding-right: 45px;
 padding-left: 10px;;
 height: 44px;
 line-height: 44px;
 background: #f5f7f9;
}
.main-top-head-menu{
  display: inline-block;
}
.main-top-head-menu li{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding: 0px 25px;
    color: rgb(94, 94, 94);
    text-align: center;
    cursor: pointer;
    position: relative;
}
.dropdown-menu-item{
  display: inline-block;
}
.dropdown-menu{
  display:block;
  float: right;
  display: inline-block;
  height: 50px;
}
.head-menu-left{
   float: left;
  padding-left: 10px;
}
.main-top-head-menu li:after{
  content: '';
  position: absolute;
  left: 30%;
  top: 0px;
  width:0px;
  height: 2px;
 background-color: #20222A;
  transition: all 0.3s;
  overflow: hidden;

}
.main-top-head-menu li:hover:after{
width: 40%;
}
.user-img{
  position: relative;
  top: 7px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}
.main-top-head-menu li:hover{
 /* background: #f6f6f6 !important; */
}
.men-nav-item{
   float:left;
  margin-right: 48px !important;
}
.men-nav-item i{
  cursor:pointer;
}
.el-menu{
  border-right: none !important;
}
.el-submenu__title{
    height: 48px !important;
  line-height: 48px !important;
  color: #babbbd !important;
}
.el-menu-item {
  height: 48px !important;
  line-height: 48px !important;
  color: #babbbd !important;
}
.el-submenu .el-menu-item {
  height: 48px !important;
  line-height: 48px !important;
  background: #17181e !important;
  color: #babbbd !important;

}
.el-menu-item.is-active {
   background-color:#2d8cf0 !important;
   color: white !important;
}
 .el-tag,.el-tag-select{
    height: 32px !important;
    line-height:32px !important;
    /* border-radius: 0px !important; */
    min-width: 0px !important;;
    /* line-height: 40px; */
    max-width: 160px !important;
    text-overflow: ellipsis;
    /* padding-right: 40px; */
    /* overflow: hidden;
    border-right: 1px solid #f6f6f6;
    vertical-align: top;
    background: transparent !important;
    color: #666666 !important;
    border: 1px solid transparent !important;
    border-right: 1px solid #f6f6f6 !important;*/
    cursor:pointer;
    background: #fff !important;
    border-radius: 3px !important;
    border: none;
    margin-right: 6px;
    color: #808695 !important;
    font-size: 14px !important;
  }
  .el-tag-select{
    /* background: #f6f6f6 !important; */
    color: #2d8cf0 !important;
  }
      /* .el-tag:after{
     content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      transition: 0.3s;
      border-top: 2px solid #20222a !important;
   }
   .el-tag-select:after {
     content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 0;
      transition: 0.3s;
      border-top: 2px solid #20222a !important;
   }
   .el-tag:hover:after{
     width: 100%;
   } */
   .menu-bar{
     position: absolute;
     text-align: center;
     right: 10px;
      top: 6px;
         line-height: 32px;
     height:32px;
     width:32px;
      background: white;
   }
   .tag-menu{
        /* line-height: 31px;
     height:31px;
     width:31px; */
     display:inline-block;
     cursor: pointer;

   }
   .tag-menu:hover{
     /* background: #f6f6f6 !important; */
   }
 .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
}
  .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
  .el-select-dropdown .el-scrollbar {padding-bottom: 10px;}
  .el-tooltip{
    line-height: 56px !important;
  }
.main-left-collapse{
 width:64px !important;
}
.main-top-collapse{
 margin-left:64px  !important;
}
.main-content-collapse{
  margin-left:64px  !important;
}
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

.el-steps--simple {
    padding: 8px 8% !important;
}
.el-step__title{
   font-size: 15px !important;
}
.el-step.is-simple .el-step__head {
    padding-top: 10px !important;
}
</style>
