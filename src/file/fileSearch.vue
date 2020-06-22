<template>
 <div>
    <el-card shadow="hover">
      <h2>文件检索</h2>
      <h4>(用于快速检索，文件系统的的存储数据。)</h4>
    </el-card>

    <el-card shadow="hover" style="text-align: left;">
      <div style="margin:10px 0;">
        <el-tag type="success"><h2>首先选择文件库：</h2></el-tag>
        </div>
        <div style="margin:10px 0;">
        <el-tag size="mide" >设计上不同文件库文件权限不同，所以不提供跨库检索。</el-tag>
      </div>
       <el-radio-group v-model="searchData.bucket">
          <el-radio-button
            v-for="item in bucketList"
            :key="item.bucketId"
            :value="item.bucketName"
            :label="item.bucketName"></el-radio-button>
        </el-radio-group>

      <div style="margin: 20px 0px 10px 0;">
        <el-tag type="success"><h2>然后选择筛选信息：</h2></el-tag>
        </div>
        <div style="margin:10px 0;">
        <el-tag size="mide" >hbase适用于RowKey搜索，并非传统的结构化信息筛选。</el-tag>
      </div>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
         <el-form-item label="指定目录">
           <el-select
           wide="100"
              v-model="searchData.dir"
              filterable
              allow-create
              default-first-option
              placeholder="支持自定义输入">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="指定起始key">
           <el-input
              placeholder="请输入开始位置(可以为空)"
              v-model="searchData.startKey"
              clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="指定终止key">
           <el-input
              placeholder="请输入开始位置(可以为空)"
              v-model="searchData.endKey"
              clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="指定前缀">
           <el-input
              placeholder="请输入前缀(可以为空)"
              v-model="searchData.prefix"
              clearable>
            </el-input>
        </el-form-item>
      </el-form>

          <el-button type="success"  @click="submit">开始检索</el-button>
  </el-card>

    <el-card shadow="hover" style="text-align: left;" >
      <div slot="header" class="clearfix">
          <div style="margin: 10px 0px 10px 0;">
            <el-tag type="success"><h2>检索信息：</h2></el-tag>
          </div>
          <div style="margin:10px 0;">
            <el-table
                border
                :data="listObjectByPrefix"
                style="width: 70%">
                <el-table-column
                  prop="bucket"
                  label="所属文件库">
                </el-table-column>
                <!-- <el-table-column
                  prop="listId"
                  label="listId">
                </el-table-column> -->
                <el-table-column
                prop="minKey"
                label="minKey">
                </el-table-column>
                <el-table-column
                prop="maxKey"
                label="maxKey">
                 </el-table-column>
                 <el-table-column
                prop="maxKeyNumber"
                label="最大key容量">
                 </el-table-column>
                 <el-table-column
                prop="nextMarker"
                label="nextMarker">
                 </el-table-column>
                 <el-table-column
                  prop="objectCount"
                label="检索结果数量">
                 </el-table-column>
            </el-table>
          </div>
      </div>
       <div class="hello">
         <div style="margin: 10px 0px 10px 0;">
            <el-tag><h2>检索结果：</h2></el-tag>
          </div>
          <el-table
            :data="objectListDir.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"

            ref="multipleTable"
            tooltip-effect="dark"
            @row-dblclick="rowDblclick"
            style="width: 100% ;text-align: center;"
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

            <el-table-column width="240" >
              <template slot="header">
              <!-- <template slot="header" slot-scope="scope"> -->
                <el-input
                  v-model="search"
                  size=""
                  placeholder="在检索列表中搜索"/>
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

    </el-card>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>{{dialogMessage}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false ;$router.go(0)">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { loadingRun } from '@/utils/utils'
export default {
  // 改名字
  name: 'fileSearch',
  props: {
    // msg: String
  },
  data () {
    return {
      // 检索结果
      listObjectByPrefix: [
        // {
        // bucket: '',
        // listId: '',
        // maxKey: '',
        // maxKeyNumber: null,
        // minKey: '',
        // nextMarker: '',
        // objectCount: null
      // }
      ],
      searchData: {
        bucket: '',
        prefix: '',
        startKey: '',
        endKey: '',
        dir: ''
      },
      // 目录选择器
      options: [{
        value: '/',
        label: '/ (根目录）'
      }, {
        value: '/data/',
        label: '/data/'
      }],
      // 接收Bucketlist
      bucketList: [{
        // creator: '小明',
        // bucketId: '1',
        // createTime: '2016-05-02',
        // bucketName: '王小虎',
        // detail: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogVisible: false, // dialogWindows
      dialogMessage: '',
      // filelist 相关
      search: '',
      multipleSelection: [],
      objectListDir: [
      //   {
      //   attrs: null,
      //   bucket: '',
      //   contentEncoding: null,
      //   id: null,
      //   key: null,
      //   lastModifyTime: null,
      //   length: null,
      //   mediaType: null,
      //   name: null,
      //   route: null
      // }
      ]
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
  },

  methods: {

    submit () {
      if (this.searchData.bucket !== '' && this.searchData.dir !== '') {
        if (this.searchData.startkey !== '' && this.searchData.endKey !== '') {
          this.searchD('getListObject')
        } else {
          this.searchD('listObjectByPrefix')
        }
      } else {
        this.dialogMessage = '请至少选择 文件库 和 目录。'
        this.dialogVisible = true
      }
    },
    searchD (name) {
      // 清空
      this.listObjectByPrefix = []
      const loading = loadingRun('数据库疯狂响应中...')
      this.$store.dispatch(name, this.searchData)
        .then(message => {
          // 表格数据是list 一行也没办法
          this.listObjectByPrefix.push(this.$store.getters.listObjectByPrefix)
          this.objectListDir = this.$store.getters.listObjectByPrefix.objectList
          // console.log(this)
          loading.close()
          this.$notify({
            title: '提示',
            message: '检索成功:'
          })
        })
        .catch(error => {
          loading.close()
          console.log(error)
          this.$notify({
            title: '提示',
            message: '检索文件出错/' + error
          })
        })
    },
    // 对话框X
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 当某一行被双击时会触发该事件 //进入bucket
    rowDblclick (row, column, event) {
      // console.log(row)
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
      // console.log(row)
      this.$store.dispatch('getObject', { bucket: row.bucket, key: row.key, name: row.name })
        .then((message) => {
          console.log(message)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleDelete (index, row) {
      // console.log(row)
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
  },
  watch: {
    // isBucketDir: function (val, oldVal) {
    //   console.log(val + oldVal)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-card__body {
    padding: 10px;
}
.el-card {
    margin: 0.5ch 0;
}
h1 {
  margin: 40px 0 0;
}

</style>
