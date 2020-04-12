<template>
<div class="app-home">
    <div class="row">
    <div class="app-column1" >
       <div class="app-Tag-row app-Tag-row-panel" >
         <div class="app-card-header">CPU</div>
          <div class="app-card-body app-card-list">
            <el-table :data="CPUData" size='mini' style="width: 100%">
                <el-table-column prop="name" label="属性"></el-table-column>
                <el-table-column prop="date" label="值"></el-table-column>
            </el-table>
          </div>
      </div>
  </div>
    <div class="app-column1" >
    <div class="app-Tag-row app-Tag-row-panel" >
        <div class="app-card-header">内存</div>
        <div class="app-card-body app-card-list">
        <el-table :data="memoryData" size='mini' style="width: 100%">
            <el-table-column prop="name" label="属性"></el-table-column>
            <el-table-column prop="date" label="值"></el-table-column>
        </el-table>
        </div>
    </div>
   </div>
  </div>
  <div class="app-centre" >
    <div class="app-Tag-row app-Tag-row-panel" >
        <div class="app-card-header">服务器信息</div>
        <div class="app-card-body app-card-list">
            <el-table :data="serverData" size='mini' :show-header='false' style="width: 100%">
                <el-table-column prop="name" label="属性"></el-table-column>
                <el-table-column prop="date" label="值"></el-table-column>
                <el-table-column prop="name1" label="属性"></el-table-column>
                <el-table-column prop="date1" label="值"></el-table-column>
            </el-table>
        </div>
    </div>
   </div>
    <div class="app-centre" >
    <div class="app-Tag-row app-Tag-row-panel" style="height: 250px;">
        <div class="app-card-header">框架信息</div>
        <div class="app-card-body app-card-list">
       <el-table :data="FrameworkData" size='mini' :show-header='false' style="width: 100%">
                <el-table-column prop="name" label="属性"></el-table-column>
                <el-table-column prop="date" label="值"></el-table-column>
                <el-table-column prop="name1" label="属性"></el-table-column>
                <el-table-column prop="date1" label="值"></el-table-column>
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
      url: '/api/Server',
      stateurl: '/api/Server/ServerStatus',
      timer: {},
      Servertimer: {},
      CPUData: [{
        name: '核心数',
        date: ''
      }, {
        name: 'CPU使用率',
        date: ''
      }],
      memoryData: [{
        name: '总内存',
        date: ''
      }, {
        name: '内存使用率',
        date: ''
      }],
      serverData: [{
        name: '服务器名称',
        date: '',
        name1: '操作系统',
        date1: ''
      }, {
        name: '系统运行时长',
        date: '',
        name1: '系统架构',
        date1: ''
      }, {
        name: '局域网IP',
        date: ''
      }],
      FrameworkData: [{
        name: '环境变量',
        date: ''
      }, {
        name: 'ContentRootPath',
        date: '',
        name1: 'WebRootPath',
        date1: ''
      }, {
        name: '.NET Core版本',
        date: '',
        name1: '内存占用',
        date1: ''
      }, {
        name: '网站启动时间',
        date: ''
      }]
    }
  },
  created () {
    this.getServerStatus()
    this.get()
    this.timer = setInterval(() => {
      this.get()
    }, 5000)
    this.Servertimer = setInterval(() => {
      this.getServerStatus()
    }, 5000)
  },
  beforeDestroy () {
    // 清除定时器
    clearInterval(this.timer)
    clearInterval(this.Servertimer)
  },
  destroyed () {
    // 清除定时器
    clearInterval(this.timer)
    clearInterval(this.Servertimer)
  },
  methods: {
    get () {
      api.get(this.url, { },
        data => {
          if (data.state === 200) {
            this.CPUData[0].date = data.data.processorCount
            this.serverData[0].date = data.data.machineName
            this.serverData[0].date1 = data.data.osDescription
            this.serverData[1].date1 = data.data.osArchitecture
            this.serverData[2].date = data.data.lanIp
            this.FrameworkData[0].date = data.data.environmentName
            this.FrameworkData[1].date = data.data.contentRootPath
            this.FrameworkData[1].date1 = data.data.webRootPath
            this.FrameworkData[2].date = data.data.frameworkDescription
            this.FrameworkData[2].date1 = data.data.memoryUsage
            this.FrameworkData[3].date = data.data.startTime
          }
        }, er => { })
    },
    getServerStatus () {
      api.get(this.stateurl, { },
        data => {
          if (data.state === 200) {
            this.CPUData[1].date = data.data.cpuRate
            this.memoryData[0].date = data.data.totalRAM
            this.memoryData[1].date = data.data.ramRate
            this.serverData[1].date = data.data.runTime
          }
        }, er => { })
    }
  }
}
</script>
<style scoped>

</style>
