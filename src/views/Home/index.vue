<template>
  <div class="app-home">
    <div class="row">
      <div class="app-Tag">
      <div class="app-Tag-row app-Tag-row-tag">
           <div class="app-card-header">A库订单<span class="app-badge app-bg-cyan ">日</span></div>
           <div class="app-card-body app-card-list">
            <p class="app-big-font">{{Tag.TagtodayA}}</p>
            <p>
              总计订单量
              <span class="app-span-color">{{Tag.TagCountA}}单<i  class="fa fa-desktop app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    <div class="app-Tag">
        <div class="app-Tag-row app-Tag-row-tag">
          <div class="app-card-header">B库订单<span class="app-badge app-bg-blue">日</span></div>
          <div class="app-card-body app-card-list">
            <p class="app-big-font">{{Tag.TagtodayB}}</p>
            <p>
              总计订单量
              <span class="app-span-color">{{Tag.TagCountB}}单<i  class="fa fa-desktop app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    <div class="app-Tag">
        <div class="app-Tag-row app-Tag-row-tag">
          <div class="app-card-header"> F库订单<span class="app-badge app-bg-green">日</span></div>
          <div class="app-card-body app-card-list">
            <p class="app-big-font">{{Tag.TagtodayF}}</p>
            <p>
              总计订单量
              <span class="app-span-color">{{Tag.TagCountF}}单<i  class="fa fa-desktop app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    <div class="app-Tag">
        <div class="app-Tag-row app-Tag-row-tag">
          <div class="app-card-header"> 设备异常<span class="app-badge app-bg-orange ">日</span></div>
          <div class="app-card-body app-card-list">
            <p class="app-big-font">3</p>
            <p>
              总计异常次数
              <span class="app-span-color">100次<i  class="fa fa-sitemap app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    </div>
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-rb">
          <div class="app-card-header">订单统计</div>
          <div class="app-card-body app-card-list app-Chart" id="myChart">

          </div>
      </div>
    </div>
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-rb">
          <div class="app-card-header"> 异常统计</div>
          <div class="app-card-body app-card-list app-Chart" id="myChart1">

          </div>
      </div>
    </div>
  </div>
</template>
<script>
import theme from '@/assets/theme/theme'
import api from '@/api/api'
export default {
  data () {
    return {
      url: '/api/MianStatisticsView',
      QueryTagurl: '/api/MianStatisticsView/QueryTag',
      myChart: {},
      myChart1: {},
      timer: false,
      initialize: false,
      dataTime: [],
      dataChart: [],
      Tag: {
        TagtodayA: 0,
        TagCountA: 0,
        TagtodayB: 0,
        TagCountB: 0,
        TagtodayF: 0,
        TagCountF: 0
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.drawLine()
      this.initChartData()
      setTimeout(() => { this.initialize = true }, 1000)
    })
  },
  mounted () {
    let _this = this
    // window.addEventListener('resize', () => {
    //   _this.myChart.resize()
    //   _this.myChart1.resize()
    // }, false)
    var elementResizeDetectorMaker = require('element-resize-detector')
    var erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById('myChart'), function (element) {
      // 解决Div size事件多次触发引起的卡顿问题
      if (!_this.timer && _this.initialize) {
        _this.timer = true
        setTimeout(() => {
          console.log('444')
          _this.myChart.resize()
          _this.myChart1.resize()
          _this.timer = false
        }, 400)
      }
    })
  },
  watch: {
    '$route.path': function (newVal, oldVal) {

    }
  },
  methods: {
    initChartData () {
      api.get(this.QueryTagurl, { },
        data => {
          if (data.state === 200) {
            this.Tag.TagtodayA = data.data.warehouseA
            this.Tag.TagCountA = data.data.warehouseCountA
            this.Tag.TagtodayF = data.data.warehouseF
            this.Tag.TagCountF = data.data.warehouseCountF
            this.Tag.TagtodayB = data.data.warehouseB
            this.Tag.TagCountB = data.data.warehouseCountB
          }
        }, er => { })
      api.get(this.url, { },
        data => {
          if (data.state === 200) {
            this.dataTime = data.data.dataTime
            this.dataChart = data.data.data
            this.drawLine()
          }
        }, er => { })
    },
    drawLine () {
      this.$echarts.registerTheme('theme', theme) // 注册主题
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('myChart'), 'theme')
      this.myChart1 = this.$echarts.init(document.getElementById('myChart1'), 'theme')
      // 绘制图表
      this.myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['A库', 'B库', 'F库']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.dataTime,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [

          {
            name: 'B库',
            type: 'bar',
            stack: '总量',
            areaStyle: {},
            data: this.dataChart[1]
          }, {
            name: 'A库',
            type: 'bar',
            stack: '总量',
            areaStyle: {},
            data: this.dataChart[0]
          },
          {
            name: 'F库',
            type: 'bar',
            stack: '总量',
            areaStyle: {},
            data: this.dataChart[2]
          }

        ]
      })
      this.myChart1.setOption(
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },

          legend: {
            data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '水量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} ml'
              }
            },
            {
              type: 'value',
              name: '温度',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '降水量',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '平均温度',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        }
      )
    }
  }
}
</script>
<style scoped>

.app-Chart{
  height: 330px;
}
.app-Tag{
-ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
    display: inline-block;
    width: 25%;
}

.app-badge {
   position: absolute;
    top: 30%;
    color: #01AAED;
    right: 15px;
    height: 18px;
    line-height: 18px;
    display: inline-block;
    padding: 0 6px;
    font-size: 12px;
    text-align: center;
    background-color: #FF5722;
    color: #fff;
    border-radius: 2px;
}
.app-bg-cyan {
    background-color: #2F4056!important;
}
.app-bg-blue {
     background-color: #1E9FFF!important;
}
.app-bg-green {
    background-color: #009688!important;
}
.app-bg-orange {
    background-color: #FFB800!important;
}
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}

.app-card-list p.app-big-font {
    font-size: 36px;
    color: #666;
    line-height: 36px;
    padding: 5px 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
}
.app-span-color {
    position: absolute;
    right: 15px;
}
.app-ico{
  padding-left: 8px;
}
</style>
