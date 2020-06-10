<template>
 <div class="hello">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-tag type="success">关键数据：</el-tag>
          <el-select v-model="data.keyValue" placeholder="请选择关键数据项">
            <el-option
              v-for="(value,key) in keyValueList"
              :key="value"
              :label="key"
              :value="value">
            </el-option>
          </el-select>
          <el-tag type="success">时间间隔：</el-tag>
          <el-input-number v-model="data.interval" :min="1" :max="100000" label="选择时间间隔（秒）"></el-input-number>
          <el-button type="primary" @click="drawLine">开始分析</el-button>
        </div>
        <div id="myChart1" style="min-height:400px;">

        </div>
      </el-card>
  </div>
</template>

<script>

export default {
  // 改名字
  name: 'RealTime',
  props: {
    // msg: String
  },
  data () {
    return {
      data: {
        interval: 1,
        item: null,
        keyValue: 'storageTankUpperTemperature'
      },
      keyValueList: {
        储罐的上位温度: 'storageTankUpperTemperature'
      }
    }
  },
  mounted () {
    this.$store.dispatch('getKeyValue', {})
      .then(() => {
        this.keyValueList = this.$store.state.visual.keyValueList
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.$echarts.init(document.getElementById('myChart1'))

      // 绘制图表
      const optionMain1 = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$store.state.visual.itemlist.timestamp
        },
        yAxis: {
          boundaryGap: [0, '50%'],
          type: 'value'
        },
        series: [
          {
            name: '成交',
            type: 'line',
            // smooth: true,
            symbol: 'none',
            stack: 'a',
            areaStyle: {
              normal: {}
            },
            data: this.$store.state.visual.itemlist[this.data.keyValue]
          }
        ]
      }
      myChart1.setOption(optionMain1)
      console.log(optionMain1)
      this.updata(myChart1, 1000 * this.data.interval)
    },
    updata (myChart1, time) {
      const this_ = this
      setInterval(function () {
        this_.$store.dispatch('realTime', this_.data)
          .then(() => {
            myChart1.setOption({
              xAxis: {
                type: 'category',
                data: this_.$store.state.visual.itemlist.timestamp
              },
              series: [{
                name: '成交',
                data: this_.$store.state.visual.itemlist[this_.data.keyValue]
              }]
            })
            console.log(this_)
          })
          .catch(error => {
            console.log(error)
          })
      }, time)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  margin: 40px 0 0;
}
.clearfix div {
    margin: 0 7px;
}
.clearfix button {
    margin: 0 7px;
}
</style>
