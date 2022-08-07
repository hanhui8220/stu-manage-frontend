<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <div class="el-container-div">
          <el-col :xs="{span: 22, offset: 1}"
                  :sm="{span: 22, offset: 1}"
                  :md="{span: 6, offset: 9}"
                  :lg="{span: 6, offset: 9}"
                  :xl="{span: 6, offset: 9}">
            <el-card class="box-card">
              <i class="el-icon-eleme icon-size"></i><br>
              <p class="logo-family">学生信息管理系统</p><br>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="usercode">
                  <el-input type="text" v-model="ruleForm.usercode" autocomplete="off" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" :style="leftBtnStyle">登录</el-button>
                  <el-button type="primary" :style="rightBtnStyle">注册</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      leftBtnStyle: {
        width: '46%',
        float: 'left'
      },
      rightBtnStyle: {
        marginLeft: 0,
        width: '50%',
        float: 'right'
      },
      ruleForm: {
        usercode: 'admin',
        password: '123'
      },
      rules: {
        usercode: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get('/User/login',{
            params:{
              usercode: this.ruleForm.usercode,
              password: this.ruleForm.password,
            }}).then((response) => {
            if (response.data.userCode === this.ruleForm.usercode) {
              this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
              sessionStorage.setItem('USER_CODE', response.data.userCode); // 设置本地存储信息
              sessionStorage.setItem('USER_NAME', response.data.userName); 
              this.$router.push('/main');
            }
          }).catch((error) => {
            console.log(error)
            this.$message.error('用户名或密码错误');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.el-container-div {
  width: 100vw;
  height: 45vh;
  background-color: #409eff;
}
.box-card{
  margin-top: 150px;
  text-align: center;
}
.icon-size{
  font-size: 60px;
  color: #409eff;
}
.logo-family{
  font-size: 20px;color: #409eff;font-weight: bold;
}
</style>