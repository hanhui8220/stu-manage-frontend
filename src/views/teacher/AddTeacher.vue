<template>
    <div class="wrapper">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm">
        
                <el-form-item label="教师编号" prop="teachCode">
                    <el-input v-model="form.teachCode"></el-input>
                </el-form-item>

                <el-form-item label="教师姓名" prop="teachName">
                    <el-input v-model="form.teachName"></el-input>
                </el-form-item>
        
                <el-form-item label="身份证号码" prop="teachIdentityCard">
                    <el-input v-model="form.teachIdentityCard"></el-input>
                </el-form-item>

                <el-form-item label="性别" prop="teachGender">
                    <el-radio v-model="form.teachGender" label="0">女</el-radio>
                    <el-radio v-model="form.teachGender" label="1">男</el-radio>
                </el-form-item>

                <el-form-item label="手机号码" prop="teachPhoneNumber">
                    <el-input v-model="form.teachPhoneNumber"></el-input>
                </el-form-item>

                <el-form-item label="教师状态" prop="status">
                    <el-radio v-model="form.status" label="0">离职</el-radio>
                    <el-radio v-model="form.status" label="1">在职任教</el-radio>
                </el-form-item>
        
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:"AddTeacher",
    components:{},
    data(){
    return {
        form:{
            teachCode:null,
            teachName:null,
            teachIdentityCard:null,
            teachGender:null,
            teachPhoneNumber:null,
            status:"1"
        },
        rules: {
          teachCode: [
            { required: true, message: '请输入教师编号', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          teachName: [
            { required: true, message: '请输入教师姓名', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          teachIdentityCard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          teachGender: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          teachPhoneNumber: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请选择教师状态', trigger: 'blur' }
          ]
        }  
    }
  },
  methods:{
    submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
                const data = this.form
                this.axios.post('/Teacher',data).then((response) => {
                    if(response){
                      this.$message({
                        message: '教师信息添加成功',
                        type: 'success'
                    });
                      that.$emit("closeAddDialog");
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

  }
}
</script>

<style>

</style>