<template>
 <div class="hello">
   <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"

    ref="multipleTable"
    tooltip-effect="dark"
    @selection-change="handleSelectionChange"

    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
      <!-- <template>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
      </template> -->

    </el-table-column>

    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="描述"
      :formatter="formatter">
    </el-table-column>

     <el-table-column
      align="right">
      <template slot="header">
      <!-- <template slot="header" slot-scope="scope"> -->
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template>
      <!-- <template slot-scope="scope"> -->
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
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  </div>
</template>

<script>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted () {
    this.$store.dispatch('getBucket', this.data)
      .then(() => {
        this.$data.tableData = this.$store.getters.bucketList
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },

    formatter (row, column) {
      return row.address
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
