<template>
 <div class="hello">
   <el-card style="margin : 0 0 10px 0">
          <div style="text-align: left;">
      <h2>选择文件：</h2>
      <h4 style="margin: 0 0  15px 0">(默认在：根目录 和 data目录下)</h4>
              <el-form :inline="true" :model="uploadData" class="demo-form-inline">
                <el-form-item label="文件库">
                  <el-select v-model="bucket" placeholder="选择导入的文件库">
                    <el-option
                        v-for="item in bucketList"
                        :key="item.bucketId"
                        :value="item.bucketName">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="目录">
                  <el-select
                  wide="100"
                      v-model="dir"
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
                <el-form-item label="文件名" v-show="fileIsShow">
                  <el-select v-model="data.fileName" placeholder="选择分析文件">
                    <el-option
                        v-for="item in $store.getters.objectListDir"
                        :key="item.id"
                        :value="item.name">
                      </el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item v-show="fileIsShow">
                  <el-button type="primary"  @click="submitUpload">确认</el-button>
                </el-form-item> -->
            </el-form>
          </div>
   </el-card >
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: left;">

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

          <el-button  @click="drawLine" type="success">开始分析</el-button>
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
      // 获取文件相关
      // 目录接收值
      dir: '',
      bucket: ' ',
      options: [{
        value: '/',
        label: '/ (根目录,有助于性能）'
      }, {
        value: '/data/',
        label: '/data/ (存分析数据推荐目录)'
      }],
      bucketList: [{
        creator: '小明',
        bucketId: '1',
        createTime: '2016-05-02',
        bucketName: '王小虎',
        detail: '上海市普陀区金沙江路 1518 弄'
      }],
      // 获得目录下的文件
      fileList: [],
      uploadData: {
        bucket: '',
        key: '',
        file: ''
      },
      fileIsShow: false,
      curveData: [],
      line: {

      },
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
    this.$store.dispatch('getBucket')
      .then(() => {
        this.bucketList = this.$store.getters.bucketList
        // console.log(this.$store.getters)
      })
      .catch(error => {
        console.log(error)
      })

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
    submitUpload () {},
    getfile () {
      if (this.dir !== '' && this.bucket !== '') {
        this.fileIsShow = true

        this.$store.dispatch('getObjectlistdir', { bucket: this.bucket, dir: this.dir })
          .then(() => {
            this.flieList = this.$store.getters.objectListDir
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 异步加载数据
      // 转转转
      myChart1.showLoading()

      console.log(this.$store)
      this.$store.dispatch('makeCurve', this.data)
        .then((data) => {
          this.curveData = data.list
          // console.log('data')
          // console.log(data)
          this.$notify({
            title: '提示',
            message: '数据获取成功' + data.code
          })
          this.setChartOption(myChart1, data.list)
          myChart1.hideLoading()
        })
        .catch(error => {
          console.log(error)
          this.$notify({
            title: '提示',
            message: '数据获取出错' + error
          })
        })
    },
    setChartOption (myChart1, data) {
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
            '槽车的液位',
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
        // 图像范围可以调整
        dataZoom: [
        // slider 滑动条
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 1
          },
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '98%',
            start: 0,
            end: 100
          },
          // inside 鼠标
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 0,
            end: 1
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 0,
            end: 100
          }
        ],
        dataset: {
          dimensions: ['timestamp',
            'tankerPressure',
            'tankerLevel',
            'storageTankLevel',
            'storageTankInternalPressure',
            'storageTankLowerTemperature',
            'storageTankUpperTemperature'],
          source: data
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            stack: 'a',
            encode: { x: 'timestamp', y: 1 },
            name: '槽车的压力'
          },
          {
            encode: { x: 'timestamp', y: 2 },
            name: '槽车的液位',
            symbol: 'none',
            smooth: true,
            type: 'line'
          }, {
            encode: { x: 'timestamp', y: 4 },
            name: '储罐的内部压力',
            stack: 'a',
            smooth: true,
            type: 'line'

          }, {
            encode: { x: 'timestamp', y: 5 },
            name: '储罐的下位温度',
            smooth: true,
            type: 'line'
          }, {
            encode: { x: 'timestamp', y: 6 },
            name: '储罐的上位温度',
            smooth: true,
            type: 'line'
          },
          {
            encode: { x: 'timestamp', y: 3 },
            name: '储罐的液位',
            smooth: true,
            type: 'line'
          }
        ]
      }
      myChart1.setOption(optionMain1)
      console.log(optionMain1)
    }
  },
  watch: {
    bucket: function (val, oldVal) {
      console.log(val + oldVal)
      // 触发文件选择器出现 获取文件类表
      this.getfile()
    },
    dir: function (val, oldVal) {
      console.log(val + oldVal)
      // 触发文件选择器出现 获取文件类表
      this.getfile()
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
