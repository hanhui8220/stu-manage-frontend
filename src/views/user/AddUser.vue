<template>
  <div class="wrapper">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="userForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="userCode">
                <el-input v-model="userForm.userCode"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="passWord">
                <el-input v-model="userForm.passWord"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" prop="status">
                <el-radio v-model="userForm.status" label="1">正常</el-radio>
                <el-radio v-model="userForm.status" label="0">禁用</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
        </el-form>

        

  </div>
</template>

<script>
export default {
  name:"AddUser",
  components:{},
  props:{
    
  },
  data(){
    return {
        userForm: {
          userName: '',
          userCode: '',
          passWord: '',
          status: 1
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          userCode: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
            { min: 3, max: 50, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请选择用户状态', trigger: 'blur' }
          ]
        }  
    }
  },
  watch:{},
  computed:{},
  methods:{
    submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
                const userData = {
                    userCode: this.userForm.userCode,
                    userName: this.userForm.userName,
                    passWord: this.userForm.passWord,
                    status: this.userForm.status
                }
                this.axios.post('/User',userData).then((response) => {
                if (response.data.userCode === this.userForm.userCode) {
                    this.$message({
                        message: '用户添加成功',
                        type: 'success'
                    });
                    sessionStorage.setItem('USER_CODE', response.data.userCode); // 设置本地存储信息
                    that.$emit("closeAddDialog");
                    // this.$router.push('/SearchUser');
                }
            })
          } else {
            this.$message({
                message: '请检查填写信息',
                type: 'warning'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

  },
  created(){},
  mounted(){}
}
</script>
