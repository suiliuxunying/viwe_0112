<template>
 <div class="page">
    <!-- <h1>{{ msg }}</h1>
    <button @click="test(Data)">main</button> -->

      <!-- 手风琴 -->
    <el-collapse accordion  @change="handleChange">
      <el-collapse-item >
        <template slot="title">
          <h3 class="h3">数据看板</h3>
          <i class="header-icon el-icon-info"></i>
        </template>
        <div>
          <el-divider content-position="left"><i class="el-icon-setting"/></el-divider>
          <h4 style="text-align:left">设置需要主页显示的数据看板</h4>
          <!-- 选择器 -->
          <el-select
              class="select-1"
              v-model="value"
              multiple
              filterable
              default-first-option
              placeholder="请选择文章标签">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
      </div>
      </el-collapse-item>
    </el-collapse>
    <div class="cardList" >
      <el-card
      shadow="always"
      v-for="(item,index) in value" :key="item">
        总是显示-{{index}}-{{item}}
      </el-card>
    </div>
    <div class="charts">
      <el-card shadow="hover" class="chart">
      鼠标悬浮时显示
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'MainPage',
  props: {
    // msg: String
  },
  data () {
    return {

      msg: 'this is MainPage!',
      state: 1,
      // 选择框
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      },
      {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: ['JavaScript', 'CSS', 'HTML', 'JavaScript']
    }
  },
  methods: {
    test (data) {
      alert('submit!')
      // console.log(data)
    },
    // 手风琴
    handleChange (val) {
      // console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.h3 {
margin-left: 20px;
float: left;
}
.select-1 {
    float: left;
    margin: 10px 20px;
    width: 500px;
}
.cardList > div {
  display:  inline-block;
  width: 20%;
  min-height:150px ;
  margin:10px 2.4%;
  margin-bottom:10px;
  margin-top: 10px;
}
.cardList {
  width: 100%;
  min-height: 20px;
  border: 1px solid #EBEEF5;
  margin: 10px 0;
}
.chart {
  width:25%;
  height: 50vw;
  background: #ccc;
}
</style>
