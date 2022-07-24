<template>
  <div class="wrapper">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">

            <el-form-item label="用户Id" prop="userId" v-if="showColumn.userId">
                <el-input v-model="userForm.userId"></el-input>
            </el-form-item>

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
                <el-radio v-model="userForm.status" label="1">活动</el-radio>
                <el-radio v-model="userForm.status" label="0">禁用</el-radio>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">保存</el-button>
            </el-form-item>
        </el-form>

        

  </div>
</template>

<script>
export default {
  name:"ViewUser",
  components:{},
  props:{
    userData:{
        userId:null,
        userName:null,
        userCode:null,
        passWord:null,
        status:null
    }
  },
  data(){
    return {
        userForm: {
          userId:this.userData.userId,
          userName: this.userData.userName,
          userCode: this.userData.userCode,
          passWord: this.userData.passWord,
          status: this.userData.status+''
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
        } ,
        showColumn:{
            userId:false
        }
    }
  },
  watch:{},
  computed:{},
  methods:{
    submitForm(formName){
            let that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                    const userData = {
                        userCode: this.userForm.userCode,
                        userName: this.userForm.userName,
                        passWord: this.userForm.passWord,
                        status: this.userForm.status
                    }
                    this.axios.put('/User/'+ this.userData.userId ,userData).then((response) => {
                    if (response.data.userCode === this.userForm.userCode) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
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
        } 
  },
  created(){},
  mounted(){}
}
</script>
