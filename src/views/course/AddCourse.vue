<template>
  <div class="wrapper">

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm" :inline="true">
            <el-form-item label="课程编号" prop="courseNumber">
                    <el-input v-model="form.courseNumber"></el-input>
            </el-form-item>

            <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model="form.courseName"></el-input>
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
  name:"AddCourse",  
  components:{},
  props:{},
  data(){
    return {
        form:{
            courseNumber:null,
            courseName:null,
        },
        rules: {
            courseNumber: [
            { required: true, message: '请输入课程编号', trigger: 'blur' },
            { min: 1, max: 16, message: '不能输入超过16个字符', trigger: 'blur' }
          ],
            courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
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
                this.axios.post('/Course',data).then((response) => {
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