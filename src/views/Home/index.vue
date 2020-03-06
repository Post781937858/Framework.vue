<template>
  <div class="app-home">
    <div class="row">
      <div class="app-Tag">
      <div class="app-Tag-row app-Tag-row-tag">
           <div class="app-card-header"> 访问量<span class="app-badge app-bg-cyan ">周</span></div>
           <div class="app-card-body app-card-list">
            <p class="app-big-font">9,999,666</p>
            <p>
              总计访问量
              <span class="app-span-color">88万<i  class="fa fa-desktop app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    <div class="app-Tag">
        <div class="app-Tag-row app-Tag-row-tag">
          <div class="app-card-header">总用户<span class="app-badge app-bg-blue">周</span></div>
          <div class="app-card-body app-card-list">
            <p class="app-big-font">9,999,666</p>
            <p>
              总计用户数
              <span class="app-span-color">88万<i  class="fa fa-envelope-o app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    <div class="app-Tag">
        <div class="app-Tag-row app-Tag-row-tag">
          <div class="app-card-header"> 收入<span class="app-badge app-bg-green">周</span></div>
          <div class="app-card-body app-card-list">
            <p class="app-big-font">9,999,666</p>
            <p>
              总收入
              <span class="app-span-color">88万<i  class="fa fa-sitemap app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    <div class="app-Tag">
        <div class="app-Tag-row app-Tag-row-tag">
          <div class="app-card-header"> 活跃用户<span class="app-badge app-bg-orange ">周</span></div>
          <div class="app-card-body app-card-list">
            <p class="app-big-font">9,999,666</p>
            <p>
              新用户数
              <span class="app-span-color">88万<i  class="fa fa-envelope-o app-ico" ></i></span>
            </p>
          </div>
      </div>
    </div>
    </div>
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-rb">
          <div class="app-card-header">数据统计</div>
          <div class="app-card-body app-card-list app-Chart" id="myChart">

          </div>
      </div>
    </div>
    <div class="app-centre">
       <div class="app-Tag-row app-Tag-row-rb">
          <div class="app-card-header"> 访问统计</div>
          <div class="app-card-body app-card-list app-Chart" id="myChart1">

          </div>
      </div>
    </div>
  </div>
</template>
<script>
import theme from '@/assets/theme/theme'
export default {
  data () {
    return {
      myChart: {},
      myChart1: {},
      timer: false,
      initialize: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.drawLine()
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
          data: ['RGV库', '穿梭车库', '重载库']
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
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'RGV库',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '穿梭车库',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '重载库',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
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
