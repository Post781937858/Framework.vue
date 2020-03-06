<template>
      <el-pagination
        background
        :current-page="PageIndex"
        :page-sizes="[10,30, 50, 90]"
        @size-change='SizeChange'
        @current-change='CurrentChange'
        layout="total, sizes, prev, pager, next, jumper"
        :total="PageCount">
    </el-pagination>
</template>
<script>
import api from '@/api/api'
export default {
  props: {
    tableData: {
      type: Array,
      default: function () { return [] }
    },
    parameter: {}
  },
  data () {
    return {
      loading: false,
      pageNumber: 100,
      emptytext: '',
      PageCount: 0,
      PageIndex: 1,
      PageSize: 10,
      role: ''
    }
  },
  mounted  () {
    this.GetRolet()
  },
  methods: {
    Query () {
      this.GetRolet()
    },
    GetRolet () {
      this.loading = true
      api.QueryRole(data => {
        this.RoletableData = data.data.data
        this.PageCount = data.data.dataCount
        this.loading = false
      }, { Pageindex: this.PageIndex, PageSize: this.PageSize, Role: this.role }, errot => { this.loading = false })
    },
    AppEdit (index, row) {

    },
    AppDelete (index, row) {

    },
    SizeChange (size) {
      this.PageSize = size
      this.GetRolet()
    },
    CurrentChange (index) {
      this.PageIndex = index
      this.GetRolet()
    },
    reset () {
      this.role = ''
      this.GetRolet()
    }

  }
}
</script>
