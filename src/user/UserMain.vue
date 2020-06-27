<template>
  <div>
    <!-- <el-tabs  type="border-card" stretch style="margin:10px 13% 0px" v-model="activeName" @tab-click="handleClick"> -->
    <el-tabs type="border-card" stretch style="margin:10px 13% 0px" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  name=0>
        <span slot="label"><i class="el-icon-edit"></i> 个人中心</span>
          <el-card class="box-card" style="margin:10px 13% 0px">
            <div slot="header" class="clearfix" style="height: 32px;">
              <span style="font-size: 20px;">个人中心：</span>
              <el-button v-if="state" style="float: right;" @click="edit" type="text">修改信息</el-button>
              <el-button v-else style="float: right;" @click="exitEdit" type="text">取消修改</el-button>
              <el-button style="float: right;   margin:  0 20px;" type="primary" @click="exit">退出登陆</el-button>
            </div>

              <span slot="label"><i class="el-icon-edit"></i>修改</span>

              <el-form :model="userData" :disabled = "state" status-icon :rules="rules" ref="userData" label-width="100px" class="demo-ruleForm">

                <el-form-item if="" size="mini" v-show="!state">
                  <label  style="font-size: 15px;font-weight: 700;color: red;">{{ruleForm.mgs}}</label>
                </el-form-item>

                <el-form-item  label="ID:">
                  <el-tag size="medium" >{{userData.userName}}</el-tag>
                </el-form-item>

                <el-form-item label="简介:"  prop="detail" >
                  <el-input type="textarea" v-model="userData.detail"></el-input>
                </el-form-item>

                <el-form-item v-if="!state"  label="密码:" prop="password">
                  <el-input type="password" v-model="userData.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="!state" label="确认密码:" prop="checkPass">
                  <el-input type="password" v-model="userData.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="角色:">
                  <el-tag size="medium">{{userData.systemRole}}</el-tag>

                </el-form-item>

                <el-form-item v-if="!state">
                  <el-button type="primary" @click="submitForm('userData')">提交</el-button>
                  <el-button @click="resetForm('userData')">重置</el-button>
                </el-form-item>
              </el-form>
          </el-card>
      </el-tab-pane>
      <el-tab-pane  name=1 v-if="userData.systemRole=='ADMIN'||userData.systemRole=='SUPERADMIN'">
        <span slot="label"><i class="el-icon-edit"></i> 权限管理</span>
          <authUser/>
      </el-tab-pane>

      <el-tab-pane name=2 v-if="userData.systemRole=='SUPERADMIN'">
        <span slot="label"><i class="el-icon-edit"></i> 创建用户</span>
          <createUser/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

import createUser from './userComponents/CreateUser'
import authUser from './userComponents/authUser'
export default {
  name: 'UserMain',
  components: {
    createUser,
    authUser
  },
  data () {
    var checkdetail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入简介'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userData.checkPass !== '') {
          this.$refs.userData.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userData: {
        detail: '',
        password: '',
        systemRole: '',
        checkPass: '',
        userName: '',
        mgs: ''
      },
      data: {},
      activeName: 0,
      state: true,
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        detail: [
          { validator: checkdetail, trigger: 'blur' }
        ]
      },
      ruleForm: { mgs: '请按要求填好信息！！' }
    }
  },
  mounted () {
    this.$store.dispatch('getUserInfo')
      .then(() => {
        this.userData.userName = this.$store.getters.userInfo.userName
        this.userData.systemRole = this.$store.getters.userInfo.systemRole
        this.userData.detail = this.$store.getters.userInfo.detail
      })
      .catch(error => {
        console.log(error)
      })
  },
  watch: {

  },
  methods: {
    handleClick (tab, event) { },
    exit () {
      this.$store.dispatch('resetToken')
        .then((message) => {
          this.$notify({
            title: '提示',
            message: '~' + message
          })
        })
        .catch(error => {
          console.log(error)
        })
      this.$router.push({ path: '/View/Login' })
    },
    edit () {
      this.$data.userData.mgs = ''
      console.log('edit!!')
      this.$data.state = false
    },
    exitEdit () {
      console.log('edit!!')
      this.$data.state = true
      this.resetForm('userData')
    },
    submit () {
      this.$store.dispatch('updateUserInfo', this.userData)
        .then((message) => {
          console.log(message)
          // 成功信息会更新
          this.userData.detail = this.$store.getters.userInfo.detail
          this.state = true
        // console.log(this.$store.getters)
        })
        .catch(error => {
          this.state = true
          // 没成功信息不会更新
          this.userData.detail = this.$store.getters.userInfo.detail
          console.log(error)
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          this.$data.userData.mgs = '请按要求填好信息！！'
          console.log('error submit!!')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.checkPass = ''
    }
  }
}
</script>

<style scoped>

</style>
