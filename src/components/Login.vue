<template>
  <div>
    <form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <div label="账号" prop="username">
        <input type="text" placeholder="请输入账号" v-model="form.username"/>
      </div>
      <div label="密码" prop="password">
        <input type="password" placeholder="请输入密码" v-model="form.password"/>
      </div>
      <div>
        <button type="primary" v-on:click="onSubmit('loginForm')">登录</button>
      </div>
    </form>
    <dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%">
<!--      :before-close="handleClose">-->
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <button type="primary" @click="dialogVisible = false">确 定</button>
      </span>
    </dialog>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit (formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          this.$router.push('/main')
        } else {
          this.dialogVisible = true
          return false
        }
      })
    }
  }
}
</script>

<style>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
  .item {

  }
</style>
