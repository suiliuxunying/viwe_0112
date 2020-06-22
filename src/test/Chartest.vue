<template>
 <div class="hello">
    <h1>{{name}}</h1>
    <div id="myChart1" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'Chartest',
  props: {
    // msg: String
  },
  data () {
    return {
      data: [
        { value: 335, name: '男' },
        { value: 310, name: '女' }
      ],
      options: [{
        value: 'qq',
        label: 'qq'
      }, {
        value: '微信',
        label: '微信'
      }, {
        value: '王者荣耀',
        label: '王者荣耀'
      }, {
        value: '新浪微博',
        label: '新浪微博'
      }, {
        value: '待扩展',
        label: '待扩展'
      }],
      value: '新浪微博'
    }
  },
  mounted () {
    this.drawLine()
    // console.log(this)
  },
  methods: {
    // onSubmit () {
    //   this.$emit('onSubmit', this.date)
    //   console.log('submit!')
    //   const date = this.date
    //   console.log(date)
    //   const aa = 40 + Math.round(Math.random() * 20)
    //   this.data[0].value = aa
    //   this.data[1].value = 100 - aa
    //   this.drawLine()
    // },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = this.$echarts.init(document.getElementById('myChart1'))

      // 异步加载数据
      // 转转转
      myChart1.showLoading()
      // $.get('data.json').done(function (data) {
      myChart1.hideLoading()
      //  myChart.setOption(...);
      // });
      // 绘制图表
      const optionMain1 = {
        title: {
          text: this.value + '的性别比例',
          subtext: '来自模拟数据',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['男', '女']
        },
        series: [
          {
            name: '男女比例',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.data
          }
        ]
      }
      myChart1.setOption(optionMain1)
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
