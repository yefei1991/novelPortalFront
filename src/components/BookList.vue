<template>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 400px">
      <el-table-column
        label="名称"
        align="left"
        width="200">
        <template slot-scope="scope">
          <router-link target="_blank" :to="{ path: 'chapters', query: { novelId: scope.row.id }}">
            <el-tag>{{ scope.row.name }}</el-tag>
          </router-link>
        </template>
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
          console.info(resp)
          this.tableData = resp.data.data
        }
      })
    }
  }
}
</script>
