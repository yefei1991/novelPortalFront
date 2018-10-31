<template>
    <div style="width:800px;margin:0 auto">
        <el-container>
            <el-header>{{novelName}}</el-header>
            <el-main>
                <router-link target="_blank" v-for="item in chapters" :to="{ path: 'chapterDetail', query: { chapterId: item.id }}" :key="item.id">
                    <el-tag style="float:left;width:150px;margin:10px 20px 0 20px">{{ item.title }}</el-tag>
                </router-link>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      novelId: '',
      novelName: '',
      chapters: []
    }
  },
  mounted: function () {
    // this.novelId = this.$route.query.novelId
    // this.loadData()
  },
  created: function () {
    this.novelId = this.$route.query.novelId
    this.loadData()
  },
  methods: {
    loadData () {
      this.getRequest('/api/chapterList?novelId=' + this.novelId).then(resp => {
        if (resp && resp.status === 200) {
          // console.info(resp)
          this.chapters = resp.data.data.chapters
          this.novelName = resp.data.data.novel
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
