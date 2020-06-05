<template>
 <div class="hello">
   <el-table
    :data="bucketList.filter(data => !search || data.bucketName.toLowerCase().includes(search.toLowerCase()))"
    ref="multipleTable"
    tooltip-effect="dark"
    @row-dblclick="rowDblclick"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      prop="bucketName"
      label="文件库名"
      sortable
      width="180">
      <!-- 还有机会这里加上图片 名称靠id筛选出来 -->
      <!-- <template>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
      </template> -->

    </el-table-column>
      <el-table-column
      prop="creator"
      label="创建人"
      sortable
      width="180">
    </el-table-column>

    <el-table-column
      prop="createTime"
      label="创建时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="描述">
    </el-table-column>

     <el-table-column
      align="right">
      <template slot="header">
      <!-- <template slot="header" slot-scope="scope"> -->
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索文件库"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
import { remove, loadingRun } from '../../utils/utils'
export default {
  // 改名字
  name: 'Container1',
  props: {
    // msg: String
  },
  data () {
    return {
      search: '',
      multipleSelection: [],
      bucketList: [{
        creator: '小明',
        bucketId: '1',
        createTime: '2016-05-02',
        bucketName: '王小虎',
        detail: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  mounted () {
    this.$store.dispatch('getBucket')
      .then(() => {
        this.bucketList = this.$store.getters.bucketList
        // console.log(this.$store.getters)
      })
      .catch(error => {
        console.log(error)
      })
      // 面包屑
    this.$store.commit('POP_route', '')
    this.$store.commit('SET_isBucketDir', true)
  },
  methods: {
    // 当某一行被双击时会触发该事件 //进入bucket
    rowDblclick (row, column, event) {
      console.log(row, column)
      const bucket = row.bucketName
      this.$router.push({
        path: '/View/main/FileHome/File',
        query: { bucket: bucket, dir: '/' }
      })
      this.$store.commit('PUSH_route', {
        path: '/View/main/FileHome/File',
        name: bucket,
        query: { bucket: bucket, dir: '/' }
      })
    },

    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      const loading = loadingRun('数据库疯狂响应中...')
      this.$store.dispatch('deleteBucket', { bucket: row.bucketName })
        .then(message => {
          loading.close()
          this.$notify({
            title: '提示',
            message: '删除文件库:' + message
          })
          this.bucketList = remove(this.bucketList, row)
        })
        .catch(error => {
          this.$notify({
            title: '提示',
            message: '删除文件库出错' + error
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  margin: 40px 0 0;
}

</style>
