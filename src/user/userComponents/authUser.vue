<template>
  <div >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="" size="mini" >
        <label style="font-size: 15px;font-weight: 700;color: red;">{{ruleForm.mgs}}</label>
      </el-form-item>

      <el-form-item
        prop="email"
        label="邮箱(账号)"
        :rules="[
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item label="id" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="ruleForm.detail"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <!-- <el-input type="textarea" v-model="userData.role" disabled></el-input> -->
        <el-radio-group v-model="ruleForm.role" >
          <el-radio-button label="USER" ></el-radio-button>
          <el-radio-button label="SUPERADMIN" disabled></el-radio-button>
          <el-radio-button label="ADMIN"></el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'CreateUser',
  data () {
    var checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      }
      callback()
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      check: false,
      ruleForm: {
        role: 'USER',
        mgs: '输入信息提交注册申请',
        checkPass: '',
        userName: 'test',
        password: '',
        email: 'test@qq.com',
        detail: 'test'
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    register () {
      this.$store.dispatch('createUser', this.ruleForm)
        .then((data) => {
          // this.userData = this.$store.getters.userInfo
        // console.log(this.$store.getters)
          this.open(data, '')
          this.resetForm('ruleForm')
          this.$data.ruleForm.mgs = '注册成功，注册下一个请按要求填好信息！！'
        })
        .catch(error => {
          console.log(error)
          this.open(error, 'error')
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          this.$data.ruleForm.mgs = '请按要求填好信息！！'
          console.log('error submit!!')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    open (data, message) {
      this.$confirm('注册' + message + '\n' + data, '提示', {
        confirmButtonText: '确定',
        type: 'info ',
        center: true
      })
    }
  }
}
</script>

<style scoped>
</style>
