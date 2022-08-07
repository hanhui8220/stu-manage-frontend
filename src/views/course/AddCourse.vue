<template>
  <div class="wrapper">

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm" :inline="true">
            <el-form-item label="课程编号" prop="courseNumber">
                    <el-input v-model="form.courseNumber" placeholder="请输入课程编号"></el-input>
            </el-form-item>

            <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
            </el-form-item>

            <el-form-item label="开放人数" prop="courseTotal">
                    <el-input v-model="form.courseTotal" placeholder="请设置开放人数,0表示无限制"></el-input>
            </el-form-item>

            <el-form-item label="剩余可选" prop="courseRemain">
                    <el-input v-model="form.courseRemain" disabled></el-input>
            </el-form-item>

            <el-form-item label="课程类型" prop="courseType">
                <el-select v-model="form.courseType" placeholder="课程类型">
                    <el-option label="必修" value="0">必修</el-option>
                    <el-option label="选修" value="1">选修</el-option>
                </el-select>
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
            courseType:null,
            courseTotal:null,
            courseRemain:null
        },
        rules: {
            courseNumber: [
            { required: true, message: '请输入课程编号', trigger: 'blur' },
            { min: 1, max: 16, message: '不能输入超过16个字符', trigger: 'blur' }
          ],
            courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
            courseType: [
            { required: true, message: '请选择课程类型', trigger: 'blur' }
          ],
            courseTotal: [
            { required: true, message: '请设置课程开放人数,0表示不限制人数', trigger: 'blur' }
          ]
        }
    }
  },
  watch:{
    'form.courseTotal':{
      immediate:true,
      handler(newValue,oldValue){
         console.log("监听courseTotal：","newValue="+newValue,"oldValue="+oldValue);
         this.form.courseRemain = newValue;
      }
    }
  },
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