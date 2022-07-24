<template>
  <div class="wrapper">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm" disabled>
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
        status:null
    }
  },
  data(){
    return {
        userForm: {
          userName: this.userData.userName,
          userCode: this.userData.userCode,
          passWord: this.userData.passWord,
          status: this.userData.status+''
        } 
    }
  },
  watch:{},
  computed:{},
  methods:{
    
  },
  created(){},
  mounted(){}
}
</script>
