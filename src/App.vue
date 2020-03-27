<template>
  <div id="app">
      <router-view v-if="this.$route.meta.NoNeedHome"></router-view>
      <HomeMain v-else-if="this.$route.meta.NoNeedmain"></HomeMain>
  </div>
</template>
<script>
import HomeMain from '@/views/HomeMain'
export default {
  components: {
    HomeMain
  }
}
</script>
<style>
 * {
    /* font-family: 'Trebuchet MS', Helvetica, sans-serif; */
     /* font:  Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif; */
     font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    /* line-height: 1.5; */
    /* color: #515a6e; */
      margin:0;
      padding:0;
      text-decoration: none;
      list-style: none;
 }
 p{
   font-size: 14px;
 }
 #app, body,html{
    height: 100%;
  }
blockquote, body, button, dd, div, dl, dt, form, h1, h2, h3, h4, h5, h6, input, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
/* p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
} */
body {
    line-height: 24px;

}
html {
    /* background-color: #f2f2f2; */
    color: #666;

}
.el-table-column--selection .cell {
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.app-centre{
  -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
    display: block;
    width: 100%;
}
.app-Tag-row{

  background: white;
  margin:0px 7.5px 7.5px  7.5px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}

.app-Tag-row-tag{
  height: 140px;
}
.app-Tag-row-rb{
  min-height: 400px;
}
.app-Tag-row-panel{
  min-height: 100px;
}
.app-Tag-row-head{
  min-height: 150px;
}
.app-card-header{
  position: relative;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
}
.app-header{
  /* background-color: rgba(0, 0, 0, 0.03) */
}
.app-home{
  padding:0px 10px 10px 10px;
  /* background: #f2f2f2; */
  white-space: nowrap;
}
app-card-list {
    padding: 15px;
}

.app-card-body {
    position: relative;
    padding: 15px 15px;
    line-height: 25px;
    overflow: hidden;
}
.app-pagination{
    padding-top: 10px;
    text-align: left;
}
::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/

::-webkit-scrollbar-track {
    width: 6px;
    background-color: #B3B3B3;
    -webkit-border-radius: 1.1em;
    -moz-border-radius: 1.1em;
    border-radius: 1.1em;
    display: none;
}

/*滚动条的设置*/

::-webkit-scrollbar-thumb {
    background-color: #B3B3B3;
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 1.1em;
    -moz-border-radius: 1.1em;
    border-radius: 1.1em;
}
    /*滚动条移上去的背景*/

    ::-webkit-scrollbar-thumb:hover {
        background-color: #B3B3B3;
    }

-moz-scrollbar {
    width: 9px;
    height: 9px;
}

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/

-moz-scrollbar-track {
    width: 6px;
    background-color: #B3B3B3;
    -webkit-border-radius: 1.1em;
    -moz-border-radius: 1.1em;
    border-radius: 1.1em;
    display: none;
}

/*滚动条的设置*/

-moz-scrollbar-thumb {
    background-color: #B3B3B3;
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 1.1em;
    -moz-border-radius: 1.1em;
    border-radius: 1.1em;
}
    /*滚动条移上去的背景*/

    -moz-scrollbar-thumb:hover {
        background-color: #B3B3B3;
    }
    .el-loading-spinner .el-loading-text {
    color: black !important;
}
.el-loading-spinner i {
    color: black !important;
    font-size: 25px !important;
}
.el-table__empty-text {
    font-size: 14px !important;
}
.el-loading-mask {
    /* -webkit-transition: opacity 0s !important;
    transition: opacity 0s !important; */
    /* opacity: 0; */
    /* background: transparent  !important; */
}
.el-button--medium {
    padding: 7px 10px !important;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 2px 10px !important;

}
a {
    color: #2d8cf0;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color .2s ease;
}.ivu-divider, .ivu-divider-vertical {
    margin: 0 8px;
    display: inline-block;
    height: .9em;
    width: 1px;
    vertical-align: middle;
    position: relative;
    top: -.06em;
    display: inline-block;

}
.ivu-divider {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #515a6e;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #e8eaec;
     margin: 0 5px;
}
.app_heard{
  font-weight:bold !important;
  font-size: 14px !important;
  color:#515a6e
}
.app_row{
  color: #515a6e;
    font-size: 14px;
}
.app-form{
  padding: 20px;
}
.form-bar{
   padding: 8px 20px;
   text-align: left;
}
.app-home .el-input__inner,.el-dialog .el-input__inner {
    height: 32px  !important;
    line-height: 32px  !important;
}
.el-dialog .el-select{
  width: 100% !important;
}
.app-home .el-button,.el-dialog .el-button{
    padding: 0px 15px !important;
    height: 32px !important;
    line-height: 31px !important;
}
.el-popconfirm__action .el-button{
      padding: 0px 15px !important;
    height: 25px !important;
    line-height: 25px !important;
}
.el-popconfirm__action {
    margin-top: 10px !important;
}
.el-form--inline .el-form-item {
    margin-right: 20px !important;
}
.el-form-item {
    margin-bottom: 13px !important;
}

.el-dialog__header {
    padding: 14px 16px !important;
    border-bottom: 1px solid #e8eaec !important;
}

.el-dialog {
    border-radius: 5px !important;
}
.el-dialog__body {
    border-bottom: 1px solid #e8eaec !important;
        padding: 5px 13px !important;
}
.v-modal {
    background: rgba(55,55,55,.6) !important;

}
.app-home .el-form--label-top .el-form-item__label,.el-dialog__body .el-form--label-top .el-form-item__label{
    padding: 0px !important;
    height: 23px !important;
    line-height: 23px;
}
.el-dialog__title {
    font-size: 16px !important;

}
.el-dialog{
  margin-top: 70px !important;
}
.app-form .el-form{
    display: flex !important;
    -ms-flex-wrap: wrap !important;
    flex-wrap: wrap !important;
}
ul.el-menu--popup .el-menu-item{
  /* padding: 0px 8px !important; */
  height: 30px  !important;
  line-height: 30px !important;
}
ul.el-menu--popup{
  border-radius: 5px !important;

}
.el-dialog{
  min-width: 200px!important;
}
.app-Breadcrumb{
  height: 35px !important;
  line-height: 35px !important;
  min-height: 35px !important;
  padding: 0px 10px;
}
.el-breadcrumb{
    height: 35px !important;
  line-height: 35px !important;
  font-size: 15px !important;
}
.el-cascader {
    width: 100%  !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100% !important;
}
.el-form--inline .el-form-item__label {
    min-width:70px !important;
}
.el-input--suffix .el-input__inner {
    padding-right: 15px!important;
}
/* .el-dialog .el-input--suffix .el-input__inner,.form-content .el-input--suffix .el-input__inner{
    width:100% !important;
} */
 .el-input__inner {
    width:100% !important;
}
.el-form--label-top .el-input__inner {
    width:100% !important;
}
.el-dialog{
  position: absolute !important;
  top: 50%  !important;
  left: 50%  !important;
 transform: translate(-50%, -50%) !important;
 margin-top: 0px !important;
}

.el-form--inline .el-form-item__content {
    /* display: block!important; */
    vertical-align: top !important;
    /* margin-left: 100px!important; */
}
.el-form--inline .el-form-item__label {
    float: left !important;
    min-width: 80px !important;
    display: inline-block !important;
}
.el-form--inline .el-form-item {
    display: inline-block!important;
    margin-right: 0px!important;
    vertical-align: top!important;
}
.el-input--prefix .el-input__inner{
  padding-right: 0px !important;
}
.col{
  width: 100%;
}
.col-1{
  width: 50%;
}
.col-2{
  width: 33%;
}
.col-3{
  width: 50%;
}
.btnQuery{
padding-left: 20px;
}
/* 手机样式 */
 @media all and (max-width: 768px) {
.btnQuery{
padding-left: 0px;
}
   .el-form--inline .el-form-item__label {
    float: none !important;
    min-width: 80px !important;
    display: block !important;
}
.el-form--inline .el-form-item__content {
    margin-left:0px!important;
}
  .el-dialog{
  position: relative !important;
    top: 0px  !important;
  left: 0px  !important;
 transform: none !important;
  margin-top: 10px !important;
}
   .el-input--suffix .el-input__inner{
  width: 100% !important;
   }
.el-form--inline .el-form-item {
    width: 100%  !important;
}
.el-form--inline .el-form-item__content {
    width: 100%  !important;
}
.el-select {
    width: 100% !important;
}
 .el-form--inline .el-form-item__label {
    display: block !important;
    text-align: left !important;
}
.app-form .el-button{
  width: 100% !important;
}
.el-dialog{
  width: 95% !important;
  max-width: auto !important;
}
.main-left{
  /* left: 0px !important; */
  /* z-index: 99; */
}
.main-top{
  margin-left: 0px !important;
  transform: translate(220px,0px)
}
.main-content{
margin-left: 0px !important;
 transform: translate(220px,0px)
}
ul.head-menu-left li:nth-child(2)
,ul.head-menu-left li:nth-child(3){
display: none;
}
ul.head-menu-right li:nth-child(2){
display: none;
}
.main-left-collapse{
 /* left: 0px !important; */
 transform: translate(-220px,0px)
}
.main-top-collapse{
 /* margin-left:64px  !important; */
  margin-left: 0px !important;
 transform: translate(0px,0px)
}
.main-content-collapse{
  /* margin-left:64px  !important; */
    margin-left: 0px !important;
    transform: translate(0px,0px)
}
.app-form{
  padding: 7px  !important;
}
.el-form--inline .el-form-item {
    margin-right: 0px !important;
}
.app-home{
  padding: 0px 4px 4px 4px !important;
}
.app-Tag{
   width: 100% !important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
     display: block !important;
}
/* .title-menu{
  display: none !important;
} */
.Login-head{
  margin-top: 70px !important;
  font-size: 1.3em !important;
}
.Login-content{
  width: 93% !important;
}
.treeNode{
  display: none;
}
}
</style>
