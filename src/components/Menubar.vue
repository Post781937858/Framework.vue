<template>
  <el-menu-item  v-if="submenuitem.submenu==null"  :key="submenuitem.url+'m'" :index="submenuitem.url">{{submenuitem.title}}</el-menu-item>
  <el-submenu :index="submenuitem.url" v-else>
     <span slot="title">{{submenuitem.title}}</span>
     <Menubar v-for="(item,index) in submenuitem.submenu" :submenuitem="item" :key="index+'r'"></Menubar>
  </el-submenu>
</template>
<script>
export default {
  name: 'Menubar',
  props: {
    submenuitem: {
      type: Object,
      required: true
    }
  }
}
</script>
