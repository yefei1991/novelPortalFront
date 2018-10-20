<template>
    <div class="secondMes">
        <el-form :inline="true" align="left" label-position="right" label-width="80px" :model="searchForm" :rules="rules" ref="searchForm" class="demo-form-inline">
            <el-form-item label="时间从" prop="starttime">
                <el-date-picker style="width:200px" value-format="yyyy-MM-dd hh:mm:ss" v-model="searchForm.starttime" type="datetime" placeholder="起始时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="至" prop="endtime">
                <el-date-picker style="width:200px" value-format="yyyy-MM-dd hh:mm:ss" v-model="searchForm.endtime" type="datetime" placeholder="截止时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="项目名" prop="projectName">
                <el-select v-model="searchForm.projectName" placeholder="项目名">
                  <el-option
                    v-for="item in projects"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品名" prop="itemName">
                <el-select v-model="searchForm.itemName" placeholder="品名">
                  <el-option
                    v-for="item in items"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="模具号" prop="modelNum">
                <el-input v-model="searchForm.modelNum" placeholder="模具号"></el-input>
            </el-form-item>
            <el-form-item label="穴号" prop="hole">
                <el-select v-model="searchForm.hole" placeholder="穴号">
                  <el-option
                    v-for="item in holes"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="机台" prop="machine">
                <el-input v-model="searchForm.machine" placeholder="机台"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="sfcStatus">
                <el-select v-model="searchForm.sfcStatus" placeholder="状态">
                  <el-option
                    v-for="item in sfcStatus"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left:66px" icon="el-icon-search" type="primary" @click="onSearch">查询</el-button>
                <el-button icon="el-icon-error" type="primary" @click="onClear()">清空</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" border stripe :data="tableData3" empty-text="暂无数据(请输入条件后查询)" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>
            <el-table-column prop="sfc" label="批次" align="center" width="120">
            </el-table-column>
            <!-- <el-table-column prop="handle" label="handle" align="center" width="120">
            </el-table-column> -->
            <el-table-column prop="projectName" label="项目名" align="center" width="120">
            </el-table-column>
            <el-table-column prop="itemName" label="品名" align="left" width="80">
            </el-table-column>
            <el-table-column prop="model" label="模具" align="left" width="80">
            </el-table-column>
            <el-table-column prop="hole" label="穴号" align="left" width="80">
            </el-table-column>
            <el-table-column prop="resrce" label="机台" align="left" width="120">
            </el-table-column>
            <el-table-column prop="sfcstatus" label="状态" align="left" width="80">
            </el-table-column>
            <el-table-column prop="operation" label="当前工序" align="left" width="120">
            </el-table-column>
            <el-table-column prop="createTimeStr" label="流程卡打印时间" align="left">
            </el-table-column>
        </el-table>
        <br>
        <el-row>
            <el-col :span="8" align="left">
                <el-button :disabled="btndisabled" @click="freeze" type="warning" size="small">批量冻结</el-button>
                <el-button :disabled="btndisabled" @click="unfreeze" type="primary" size="small">批量解冻</el-button>
                <el-button :disabled="btndisabled" @click="discard" type="danger" size="small">批量废弃</el-button>
            </el-col>
            <el-col :span="16" align="right">
                <el-pagination background :page-size="pageSize" :page-sizes="[50, 100, 150, 200]" layout="total, sizes, prev, pager, next" :current-page="currentPage" @current-change="currentChange" @size-change="sizeChange" :total="totalCount">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      totalCount: -1,
      currentPage: 1,
      pageSize: 50,
      site: '',
      projects: [],
      items: [],
      holes: [],
      sfcStatus: [],
      searchForm: {
        starttime: '',
        endtime: '',
        projectName: '',
        itemName: '',
        modelNum: '',
        hole: '',
        machine: ''
      },
      rules: {
        starttime: [
          { required: true, message: '请选择起始时间', trigger: 'change' }
        ],
        endtime: [
          { required: true, message: '请选择截止时间', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '请输入项目名', trigger: 'change' }
        ],
        itemName: [
          { required: true, message: '请输入品名', trigger: 'change' }
        ],
        modelNum: [
          { required: true, message: '请输入模具号', trigger: 'change' }
        ],
        hole: [
          { required: true, message: '请输入穴号', trigger: 'change' }
        ]
      },
      tableData3: [],
      multipleSelection: [],
      btndisabled: true
    }
  },
  mounted: function () {
    this.site = this.$route.query.info
    this.initDictionary()
  },
  methods: {
    initDictionary () {
      this.getRequest('/sfc/dictionary?site=' + this.site).then(resp => {
        if (resp && resp.status === 200) {
          this.projects = resp.data.projects
          this.items = resp.data.items
          this.holes = resp.data.holes
          this.sfcStatus = resp.data.sfcStatus
        }
      })
    },
    loadData () {
      this.loading = true
      let params = this.searchForm
      params.pageNum = this.currentPage
      params.pageSize = this.pageSize
      params.site = this.site
      this.getRequest('/sfc/all', params).then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          this.tableData3 = resp.data.list
          this.totalCount = resp.data.total
        }
      })
    },
    currentChange (currentChange) {
      this.currentPage = currentChange
      this.loadData()
    },
    sizeChange (size) {
      this.pageSize = size
      this.loadData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      if (val.length === 0) {
        this.btndisabled = true
      } else {
        this.btndisabled = false
      }
    },
    onSearch () {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          this.loadData()
        } else {
          return false
        }
      })
    },
    onClear () {
      // console.info(this.$refs)
      this.$refs.searchForm.resetFields()
    },
    freeze () {
      this.confirmAndAct(this.multipleSelection, 'freeze')
    },
    unfreeze () {
      this.confirmAndAct(this.multipleSelection, 'unfreeze')
    },
    discard () {
      this.confirmAndAct(this.multipleSelection, 'discard')
    },
    confirmAndAct (params, action) {
      let handles = params.map(s => { return s.handle }).join('**')
      let actionStr = ''
      if (action === 'freeze') {
        actionStr = '批量冻结'
      } else if (action === 'unfreeze') {
        actionStr = '批量解冻'
      } else {
        actionStr = '废弃'
      }
      actionStr = '<span style="color:green;font-weight:bold">[' + actionStr + ']</span>'
      this.$prompt('确定要进行' + actionStr + '的操作吗?请输入操作备注:', '提示', {
        dangerouslyUseHTMLString: true
      }).then(({ value }) => {
        var query = {}
        query.handles = handles
        query.tag = action
        query.site = this.site
        query.comment = value
        // 废弃时需要传qty
        query.qty = params.map(s => { return s.qty }).join('**')
        this.postRequest('/sfc/act', query).then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data.code === 0) {
              this.loadData()
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message.error(resp.data.message)
              this.loading = false
            }
          } else {
            this.$message.error('服务器错误')
            this.loading = false
          }
        })
        this.loading = true
      })
    }
  }
}
</script>
<style scoped>
.secondMes {
  width: 96%;
  margin-left: 2%;
}
</style>
