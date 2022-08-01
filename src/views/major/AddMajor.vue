<template>
  <div class="wrapper">

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm" :inline="true">
            <el-form-item label="专业编号" prop="majorNumber">
                    <el-input v-model="form.majorNumber"></el-input>
            </el-form-item>

            <el-form-item label="专业名称" prop="majorName">
                    <el-input v-model="form.majorName"></el-input>
            </el-form-item>
    </el-form>

        <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>

  </div>
</template>

<script>
export default {
  name:"Add<Major",  
  components:{},
  props:{},
  data(){
    return {
        form:{
            majorNumber:null,
            majorName:null,
        },
        rules: {
            majorNumber: [
            { required: true, message: '请输入专业编号', trigger: 'blur' },
            { min: 1, max: 16, message: '不能输入超过16个字符', trigger: 'blur' }
          ],
            majorName: [
            { required: true, message: '请输入专业名称', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过50个字符', trigger: 'blur' }
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
                const data = this.form
                this.axios.post('/Major',data).then((response) => {
                    if(response){
                        this.$message({
                            message: '课程信息添加成功',
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
      },
  },
  created(){},
  mounted(){}
}
</script>
<style  scoped>
.wrapper{}
</style>