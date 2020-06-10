<template>
 <div class="hello">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-tag type="success">文件：</el-tag>
          <el-select v-model="data.fileName" placeholder="请选择分析文件">
            <el-option
              v-for="(item ,index) in fileNameList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-tag type="success">步长值：</el-tag>
           <el-input-number v-model="data.step" :min="3" :max="100000" label="选择步长值"></el-input-number>
           <el-tag type="success">关键数据：</el-tag>
          <el-select v-model="data.keyValue" placeholder="请选择关键数据项">
            <el-option
              v-for="(value,key) in keyValueList"
              :key="value"
              :label="key"
              :value="value">
            </el-option>
          </el-select>

          <el-button type="primary" @click="drawLine">开始分析</el-button>
        </div>
        <div id="myChart1" style="min-height:600px;">

        </div>
      </el-card>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'MakeCurve',
  props: {
    // msg: String
  },
  data () {
    return {
      data1: {
        fileName: 'bb.txt',
        step: 10,
        keyValue: 'storageTankUpperTemperature'
      },
      data: {
        fileName: '',
        step: null,
        keyValue: null
      },
      fileNameList: ['aa.txt'],
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
    this.$store.dispatch('getFileName', {})
      .then(() => {
        this.fileNameList = this.$store.state.visual.fileNameList
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 异步加载数据
      // 转转转
      myChart1.showLoading()

      console.log(this.$store)
      this.$store.dispatch('makeCurve', this.data)
        .then(() => {
          myChart1.hideLoading()
        })
        .catch(error => {
          console.log(error)
        })
      //  myChart.setOption(...);
      // });
      // 绘制图表
      const optionMain1 = {
        title: {
          text: '本地数据分析',
          subtext: '来自模拟数据，仅供测试使用',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '55px',
          data: [
            '槽车的温度',
            '槽车的压力',
            '储罐的液位',
            '储罐的内部压力',
            '储罐的下位温度',
            '储罐的上位温度']
        },
        grid: {
          top: '80px',
          left: '3%',
          right: '4%',
          bottom: '70px'
          // containLabel: true
        },
        toolbox: {
          feature: {
            dataZoom: {
              // yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time'
          // nanme: 'timestamp',
          // boundaryGap: false
          // data:
        },
        yAxis: {
          type: 'value'
        },
        dataset: {
          dimensions: ['timestamp',
            'tankerPressure',
            'tankerLevel',
            'storageTankLevel',
            'storageTankInternalPressure',
            'storageTankLowerTemperature',
            'storageTankUpperTemperature'],
          source: this.$store.state.visual.curveData
        },
        series: [
          {
            type: 'line',
            // smooth: true,
            symbol: 'none',
            stack: 'a',
            encode: { x: 'timestamp', y: 1 },
            name: '槽车的压力'
          },
          {
            encode: { x: 'timestamp', y: 2 },
            name: '槽车的液位',
            symbol: 'none',
            type: 'line'
          }, {
            encode: { x: 'timestamp', y: 4 },
            name: '储罐的内部压力',
            stack: 'a',
            type: 'line'

          }, {
            encode: { x: 'timestamp', y: 5 },
            name: '储罐的下位温度',
            type: 'line'
          }, {
            encode: { x: 'timestamp', y: 6 },
            name: '储罐的上位温度',
            type: 'line'
          },
          {
            encode: { x: 'timestamp', y: 3 },
            name: '储罐的液位',
            type: 'line'
          }
        ]
      }
      myChart1.setOption(optionMain1)
      console.log(optionMain1)
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
