<template>
  <div class="main">
    <div class="login-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户登录</span>
          <el-button style="float: right; padding: 3px 0" type="text">注册</el-button>
        </div>

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
          label-position="top"
        >

          <el-form-item  prop="userId">
            <el-input v-model="ruleForm.userId" autocomplete="off"
            placeholder="请输入账号"
             clearable
             prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item  prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"
           placeholder="请输入密码"
             prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var validateuserId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        userId: '1',
        pass: '1'
      },
      rules: {
        userId: [
          { validator: validateuserId, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.ruleForm)// 为啥必须要this.ruleForm
          this.$store.dispatch('login', this.ruleForm)
            .then(() => {
              this.$router.push({ path: '/View/MainPage' })
              this.loading = false
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .login-container{
    width: 30%;
    min-width: 150px;
    margin: 0 10%  0 auto;
    /* position:fixed; */
  }
  .main {
    margin: 0;
    padding-bottom: 450px;
    /* min-height:600px; */
    padding-top: 180px;
    width: 100%;
    background-color: cornsilk;
    background-image: url('../assets/3042.jpg');
    background-repeat:no-repeat;
    background-size:  100% auto;
}
</style>
