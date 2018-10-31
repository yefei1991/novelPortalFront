<template>
    <div style="width:800px;margin:0 auto">
        <el-container>
            <el-header>{{chapter.title}}</el-header>
            <el-main>
                {{chapter.content}}
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      chapterId: '',
      chapter: ''
    }
  },
  mounted: function () {
    // this.novelId = this.$route.query.novelId
    // this.loadData()
  },
  created: function () {
    this.chapterId = this.$route.query.chapterId
    this.loadData()
  },
  methods: {
    loadData () {
      this.getRequest('/api/chapterDetail?chapterId=' + this.chapterId).then(resp => {
        if (resp && resp.status === 200) {
          // console.info(resp)
          this.chapter = resp.data.data
        }
      })
    }
  }
}
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
}

body > .el-container {
  margin-bottom: 40px;
  width: 800px;
}
</style>
