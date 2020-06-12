<template>
 <div class="hello">
   <el-table
    :data="objectListDir.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"

    ref="multipleTable"
    tooltip-effect="dark"
    @row-dblclick="rowDblclick"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >

    <el-table-column
      type="selection"
       align="left"
      width="55">
    </el-table-column>

    <el-table-column
      prop="name"
      label="名称"
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
      prop="attrs"
      label="属性"
      sortable>
        <template slot-scope="scope" >
        <p v-if="scope.row.length  > 0" style=""> <i class="el-icon-tickets"> 文件</i>
        <p v-else> <i class="el-icon-folder-opened">目录 </i></p>
          </template >
    </el-table-column>

    <el-table-column
      prop="lastModifyTime"
      label="编辑时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      sortable
      prop="length"
      label="长度">
    </el-table-column>
    <el-table-column
      sortable
      prop="mediaType"
      label="类型">
    </el-table-column><el-table-column
      sortable
      prop="contentEncoding"
      label="编码">
    </el-table-column>

     <el-table-column width="220" >
      <template slot="header">
      <!-- <template slot="header" slot-scope="scope"> -->
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索文件"/>
      </template>

      <template slot-scope="scope" >
         <el-button
         v-if="scope.row.length > 0"
           size="mini"
            type="primary"
            icon="el-icon-download"
            @click="handleExport(scope.row)"></el-button>
            <!-- 下载 -->
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
// import { stringifEnd } from '../../utils/utils'
import { loadingRun } from '../../utils/utils'
export default {
  // 改名字
  name: 'ContainerCh',
  props: {
    // msg: String
  },
  data () {
    return {
      search: '',
      multipleSelection: [],
      objectListDir: [{
        attrs: null,
        bucket: 'jerrybucket2',
        contentEncoding: null,
        id: null,
        key: '/dir1/',
        lastModifyTime: '2020-05-27 17:35:53',
        length: 0,
        mediaType: '',
        name: 'dir1',
        route: this.$route.path
      }]
    }
  },
  mounted () {
    this.$store.dispatch('getObjectlistdir', { bucket: this.$route.query.bucket, dir: this.$route.query.dir })
      .then(() => {
        this.objectListDir = this.$store.getters.objectListDir
        console.log(this.$store.getters)
      })
      .catch(error => {
        console.log(error)
      })
    this.$store.commit('POP_route', this.$route.query.dir)
    this.$store.commit('SET_isBucketDir', false)
  },
  methods: {
    // 当某一行被双击时会触发该事件 //进入bucket
    rowDblclick (row, column, event) {
      console.log(row)
      if (row.length === 0) {
        // 不是文件 跳转
        const bucket = row.bucket
        const dir = row.key
        this.$router.push({
          path: '/View/main/FileHome/File',
          query: { bucket: bucket, dir: dir }
        })
        this.$store.commit('PUSH_route', {
          path: '/View/main/FileHome/File',
          name: row.name,
          query: { bucket: bucket, dir: dir }
        })
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleExport (row) {
      console.log(row)
      this.$store.dispatch('getObject', { bucket: row.bucket, key: row.key, name: row.name })
        .then((message) => {
          console.log(message)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleDelete (index, row) {
      console.log(row)
      const loading = loadingRun('数据库疯狂响应中...')
      this.$store.dispatch('deleteObject', { bucket: row.bucket, key: row.key })
        .then(message => {
          loading.close()
          this.$notify({
            title: '提示',
            message: '删除文件:' + message
          })
          this.objectListDir.splice(index, 1)
        })
        .catch(error => {
          loading.close()
          this.$notify({
            title: '提示',
            message: '删除文件出错' + error
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
