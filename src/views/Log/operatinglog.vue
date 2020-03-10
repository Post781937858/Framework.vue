<template>
  <div class="app-home">
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-panel">
       <div class="app-form">
    <el-form :inline="true"  class="demo-form-inline" ref="QueryForm" :model="QueryForm">
      <el-form-item label="账号" prop='userNumber'>
        <el-input placeholder="账号" v-model="QueryForm.userNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="Query"  >查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button  @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
       </div>
     <div class="app-card-body app-card-list ">
        <el-table    :data="RoletableData"  style="width: 100%"
         v-loading="loading"
        header-row-class-name="app_heard"
        row-class-name=''
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
        >
            <el-table-column prop="userName" label="用户" align="center"></el-table-column>
            <el-table-column prop="operating" label="操作" align="center"></el-table-column>
            <el-table-column prop="details" label="明细" align="center"></el-table-column>
            <el-table-column prop="ip" label="IP地址" align="center"></el-table-column>
            <el-table-column prop="browser" label="浏览器" align="center"></el-table-column>
             <el-table-column prop="os" label="系统" align="center"></el-table-column>
            <el-table-column prop="state" label="状态"   align="center">
                <template slot-scope="scope">
                <el-tag class="statetag " :class="scope.row.state === 200 ?'tag-succeed':'tag-error'" disable-transitions>{{scope.row.state === 200 ? '成功' : '失败'}}</el-tag>
              </template>
             </el-table-column>
             <el-table-column prop="date" label="时间" align="center"></el-table-column>
        </el-table>
        <div class="app-pagination">
         <elPagination :url='url' ref="Page" :parameter='QueryForm'  v-on:get="(data) => { RoletableData = data }"  v-on:loading='(isloading) => { loading = isloading }' ></elPagination>
        </div>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import elPagination from '@/components/Pagination'
export default {
  components: { elPagination },
  data () {
    return {
      url: api.apiUrl.operatingLog,
      RoletableData: [],
      loading: true, // loading加载
      QueryForm: {
        userNumber: ''
      },
      rules: { // 表单验证
        showName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ]
      }
    }
  },
  created  () {

  },
  methods: {
    // 查询
    Query () {
      this.$refs.Page.refresh()
    },
    // 重置
    reset () {
      this.$refs.QueryForm.resetFields()
      this.$refs.Page.refresh()
    }
  }
}
</script>
