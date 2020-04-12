<template>
    <el-pagination
        background
        :hide-on-single-page='IshidePage'
        :current-page="PageIndex"
        :page-sizes="[10,30, 50, 90]"
        @size-change='SizeChange'
        @current-change='CurrentChange'
       layout="total, sizes, prev, pager, next, jumper"
        :total="PageCount">
    </el-pagination>
    <!-- layout="prev, pager, next" -->
</template>
<script>
import api from '@/api/api'
export default {
  props: {
    url: {
      type: String,
      default: () => { return '' }
    },
    parameter: {}
  },
  data () {
    return {
      IshidePage: true, // 是否隐藏分页
      PageCount: 0, // 分页条数
      PageIndex: 1, // 当页
      PageSize: 10 // 页面大小
    }
  },
  mounted () {
    this.Query()
  },
  methods: {
    // 分页页面大小更改
    SizeChange (size) {
      this.PageSize = size
      this.Query()
    },
    // 分页索引改变
    CurrentChange (index) {
      this.PageIndex = index
      this.Query()
    },
    // 查询
    Query () {
      this.$emit('loading', true)
      api.getPage(this.url,
        {
          page: {
            Pageindex: this.PageIndex,
            PageSize: this.PageSize
          },
          data: this.parameter
        },
        data => {
          this.$emit('loading', false)
          this.IshidePage = false
          this.$emit('get', data.data.data)
          this.PageCount = data.data.dataCount
          this.IshidePage = false
          if (this.PageCount === 0 || data.data.pageCount === 1) this.IshidePage = true
        }, er => { this.$emit('loading', false) })
    },
    edit (data) {
      api.put(this.url, data, data => {
        this.Query()
      }, er => {})
    },
    add (data) {
      api.post(this.url, data, data => {
        this.Query()
      }, error => {
        console.error(error)
      })
    },
    dalete (data) {
      api.deletes(this.url, data, data => {
        this.Query()
      }, error => { console.log(error) })
    },
    refresh () {
      this.PageIndex = 0
      this.Query()
    }
  }
}
</script>
