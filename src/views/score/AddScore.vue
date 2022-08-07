<template>
  <div class="wrapper">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm" :inline="true">
            
            <el-form-item label="课程" prop="courseNumber">
                    <el-select v-model="form.courseNumber" class="m-2" placeholder="请选择课程" size="default" filterable>
                        <el-option
                        v-for="item in courseOptions"
                        :key="item.courseNumber"
                        :label="item.courseName + '(' + item.courseNumber + ')'"
                        :value="item.courseNumber"
                        />
                    </el-select>
            </el-form-item>

            <el-form-item label="学生" prop="stuNumber">
                    <el-select v-model="form.stuNumber" class="m-2" placeholder="请输入姓名或学号" size="default" 
                    filterable remote :remote-method="queryStudent" :loading="loading">
                        <el-option
                        v-for="item in stuOptions"
                        :key="item.stuNumber"
                        :label="item.stuName + '(' + item.stuNumber + ')'"
                        :value="item.stuNumber"
                        />
                    </el-select>
            </el-form-item>

            <el-form-item label="学年" prop="year">
                    <el-select v-model="form.year" class="m-2" placeholder="请选择学年" size="default" filterable>
                        <el-option
                        v-for="item in yearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>

            </el-form-item>

            <el-form-item label="学期" prop="term">
                    <el-select v-model="form.term" class="m-2" placeholder="请选择学期" size="default" filterable>
                        <el-option
                        v-for="item in termOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
            </el-form-item>

            <el-form-item label="分数" prop="score">
                    <el-input v-model="form.score"></el-input>
            </el-form-item>
            
        </el-form>


        <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">录入</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>


  </div>
</template>

<script>
export default {
  name:"AddScore",  
  components:{},
  props:{},
  data(){
    return {
        courseOptions:[],
        stuOptions:[],
        yearOptions:[],
        termOptions:[],
        loading:false,
        form:{
            courseNumber:null,
            stuNumber:null,
            year:null,
            term:null,
            score:null
        },
        rules: {
            courseNumber: [
            { required: true, message: '请选择课程', trigger: 'blur' },
            ],
            stuNumber: [
            { required: true, message: '请选择课学生', trigger: 'blur' }
            
            ],
            year:[
            { required: true, message: '请选择年度', trigger: 'blur' }
            ],
            term:[
            { required: true, message: '请选择学期', trigger: 'blur' }
            ],
            score:[
            { required: true, message: '请输入分数', trigger: 'blur' }
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
                this.axios.post('/Score',data).then((response) => {
                    if(response){
                        this.$message({
                            message: '学生成绩录入成功',
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
      queryStudent(str){
        if(str){
            this.loading = true;
            setTimeout(() => {
                            this.axios.get('/Student/suggest',{
            params:{
                status:1,
                stuNumber: str
            }}).then( res =>{
                    this.loading = false;
                    this.stuOptions = res.data;
                })
            }, 200);
        }else{
            this.stuOptions = [];
        }
                 
      },
      queryCourse(){
            this.axios.get('/Course',{
            params:{
              size:9999,
              current:1
            }}).then( res =>{
                this.courseOptions = res.data.records;
            })
      },
      initYearSelect(){
        var myDate = new Date();
        var year = myDate.getFullYear(); //获取当前年
        this.years = [];
        for (let i = 0; i < 4; i++) {
            this.yearOptions.push({ value: year - i, label: year - i});
        }
        this.termOptions = [];
        this.termOptions.push({ value: "第一学期" , label: "第一学期" });
        this.termOptions.push({ value: "第二学期" , label: "第二学期" });
      }
  },
  created(){},
  mounted(){
    this.queryCourse();
    this.initYearSelect();
  }
}
</script>
<style  scoped>
.wrapper{}
</style>