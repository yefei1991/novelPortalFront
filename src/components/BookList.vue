<template>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="名称"
        align="left"
        width="200">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        align="left"
        width="200">
      </el-table-column>
    </el-table>
  </template>

<script>
export default {
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      this.getRequest('/api/bookList').then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          this.tableData = resp.data
        }
      })
    }
  }
}
</script>
