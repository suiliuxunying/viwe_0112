<template>
  <div class="main">
 <el-card shadow="hover">
      <el-col :span="20" :offset="2" >
            <div class="grid-content">
              <div style="margin-top:20px;text-align:center;font-size: 25px;color: #1d1d1d;">
                ——--装备作战数据分析平台--——</div>
              <div style="height: 3px;width: 60px;margin:10px auto;background-color: crimson"></div>
              <div style="margin: 20px;text-align:center;font-size: 16px;color: #1d1d1d;">
                这里是数据分析平台交互前端，提供数据存储、数据检索、数据分析、实时流处理、集群服务管理等多项功能。
              </div>
            </div>
          </el-col>
    </el-card>
  </div>
</template>
<script scoped>
export default {
  name: 'mainPage3',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
 .main {
    margin: 0px;
    padding-bottom: 450px;
    /* min-height: 600px; */
    padding-top: 100px;
    width: 100%;
    background-color: #ffffff;
    background-image: url('../assets/page3.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
}
.el-col[data-v-6090602a] {
    border-radius: 4px;
    width: 100%;
}
.el-col-offset-2 {
    margin-left:0;
}
.el-card__body {
    padding: 10px;
}
.el-card {
    margin: 2ch 112px;
    padding: 0;
    background-color: #ffffffa1;
}
  .bow img{
    width: 50%;
    margin: 30px 25%;
    /*height:200px;*/
  }
  .font{
    font-size: 20px;
    color: rgb(36, 101, 128);
    margin: 0 0 10px 0;
  }
  .el-carousel__item img{
    height: 400px;
    width: 100%;
  }
  .bow{
    background-color: rgba(240, 240, 240, 0.98);
    margin:0 5px 20px 5px;
    width:24%;
    text-align: center;
    min-height: 200px;
    float: left;
  }
  .el-card1 {
    text-align: center;
    width: 90%;
    margin: 0 auto 20px auto;
  }
  .el-card i{
    /*width: 50px;*/
    /*height: 50px;*/
    color: #5673ff;
    display: block;
    font-size: 30px;
    margin: 20px;
    font-weight: 900;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
 .el-row {
   margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .bg-purple {
    background: #555555;
}
</style>
