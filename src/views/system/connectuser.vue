<template>
  <div class="app-home">
    <div class="app-centre">
      <div class="app-Tag-row app-Tag-row-panel">
        <div class="app-card-body app-card-list">
          <el-table
            :data="RoletableData"
            style="width: 100%"
            v-loading="loading"
            header-row-class-name="app_heard"
            row-class-name
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="white"
          >
            <el-table-column prop="guid" label="标识" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户" align="center"></el-table-column>
            <el-table-column prop="connectstate" label="状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  class="statetag"
                  :class="scope.row.connectstate ?'tag-succeed':'tag-error'"
                  disable-transitions
                >{{scope.row.connectstate ? '在线' : '离线'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ip" label="IP地址" align="center"></el-table-column>
            <el-table-column prop="browser" label="浏览器" align="center"></el-table-column>
            <el-table-column prop="os" label="系统" align="center"></el-table-column>
            <el-table-column prop="connectTime" label="连接时间" align="center"></el-table-column>
             <el-table-column prop="heartbeatTime" label="心跳时间" align="center"></el-table-column>
            <el-table-column label="操作" width="180" fixed="right" align="center">
              <template slot-scope="scope">
                <div>
                  <a @click="off(scope.row)">强制下线</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
      url: '/api/WebSocketManager',
      RoletableData: [],
      loading: false, // loading加载
      timer: {}
    }
  },
  created () {
    this.Query()
    this.timer = setInterval(() => {
      this.Query()
    }, 3000)
  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.timer)
  },
  destroyed () {
    // 清除定时器
    clearInterval(this.timer)
  },
  methods: {
    // 查询
    Query () {
      api.get(this.url, {},
        data => {
          if (data.state === 200) {
            this.RoletableData = data.data
          }
        },
        er => {
          this.RoletableData = null
        }
      )
    },
    off (data) {
      this.$confirm(
        '是否强制下线此用户？',
        '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          api.post(this.url,
            data,
            data => {

            },
            er => { }
          )
        })
        .catch(() => { })
    }
  }
}
</script>
