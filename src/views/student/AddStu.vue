<template>
    <div class="wrapper">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm" inline>

            <el-form-item label="学号" prop="stuNumber">
                <el-input v-model="form.stuNumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="stuName">
                <el-input v-model="form.stuName"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="stuIdentityCard">
                <el-input v-model="form.stuIdentityCard"></el-input>
            </el-form-item>

            <el-form-item label="民族" prop="stuNation">
                <el-input v-model="form.stuNation"></el-input>
            </el-form-item>

            <el-form-item label="籍贯" prop="stuNativePlace">
                <el-input v-model="form.stuNativePlace"></el-input>
            </el-form-item>

            <el-form-item label="出生日期" prop="stuBirthDate">
                <el-date-picker
                    v-model="form.stuBirthDate"
                    type="date"
                    placeholder="请选择出生日期"
                    />
            </el-form-item>

            <el-form-item label="手机号码" prop="stuPhoneNumber">
                <el-input v-model="form.stuPhoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="政治面貌" prop="stuPolitical">
                <el-input v-model="form.stuPolitical"></el-input>
            </el-form-item>

            <el-form-item label="紧急联系人" prop="stuEmergencyContact">
                <el-input v-model="form.stuEmergencyContact"></el-input>
            </el-form-item>

            <el-form-item label="紧急联系人号码" prop="stuEmergencyContactPhone">
                <el-input v-model="form.stuEmergencyContactPhone"></el-input>
            </el-form-item>

            <el-form-item label="学生年级" prop="stuGrade">
                <el-input v-model="form.stuGrade"></el-input>
            </el-form-item>

            <el-form-item label="学生院系" prop="stuFaculty">
                <el-input v-model="form.stuFaculty"></el-input>
            </el-form-item>

            <el-form-item label="学生专业" prop="stuMajor">
                <el-select v-model="form.stuMajor" class="m-2" placeholder="Select" filterable clearable>
                        <el-option
                        v-for="item in majorOptions"
                        :key="item.majorNumber"
                        :label="item.majorName"
                        :value="item.majorNumber"
                        />
                    </el-select>
            </el-form-item>

            <el-form-item label="学生班级" prop="stuClass">
                <el-select v-model="form.stuClass" class="m-2" placeholder="Select" filterable clearable>
                        <el-option
                        v-for="item in classOptions"
                        :key="item.classNumber"
                        :label="item.className"
                        :value="item.classNumber"
                        />
                    </el-select>
            </el-form-item>

            
            <el-form-item label="家庭住址" prop="stuHomeAddress">
                <el-input v-model="form.stuHomeAddress"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="remarks">
                <el-input v-model="form.remarks"></el-input>
            </el-form-item>

            <el-form-item label="学生状态" prop="status">               
                <el-select v-model="form.status" placeholder="学生状态">
                    <el-option label="毕业" value="0">毕业</el-option>
                    <el-option label="在校" value="1">在校</el-option>
                    <el-option label="结业" value="2">结业</el-option>
                    <el-option label="辍学" value="3">辍学</el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="性别" prop="stuGender">
                <el-select v-model="form.stuGender" placeholder="性别">
                    <el-option label="女" value="0">女</el-option>
                    <el-option label="男" value="1">男</el-option>
                </el-select>

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
  name:"AddStu",
  components:{},
  props:{
    
  },
    data(){
    return {
      classOptions:[],
      majorOptions:[],
        form:{
            stuNumber:null,
            stuName:null,
            stuIdentityCard:null,
            stuGender:null,
            stuNation:null,
            stuNativePlace:null,
            stuPhoneNumber:null,
            stuPolitical:null,
            stuBirthDate:null,
            stuHomeAddress:null,
            stuEmergencyContact:null,
            stuEmergencyContactPhone:null,
            stuGrade:null,
            stuFaculty:null,
            stuMajor:null,
            stuClass:null,
            remarks:null,
            status:"1"
        },
        rules: {
          stuNumber: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          stuName: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          stuIdentityCard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          stuGender: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          stuNativePlace: [
            { required: true, message: '请输入籍贯', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          stuNation: [
            { required: true, message: '请输入民族', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过32个字符', trigger: 'blur' }
          ],
          stuPhoneNumber: [
            { required: true, message: '请输入学生手机号码', trigger: 'blur' },
            { min: 1, max: 20, message: '不能输入超过20个字符', trigger: 'blur' }
          ],
          stuHomeAddress: [
            { required: true, message: '请输入学生家庭住址', trigger: 'blur' },
            { min: 1, max: 100, message: '不能输入超过100个字符', trigger: 'blur' }
          ],
          stuGrade: [
            { required: true, message: '请输入学生年级', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          stuFaculty: [
            { required: true, message: '请输入学生院系', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          stuMajor: [
            { required: true, message: '请输入学生专业', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          stuClass: [
            { required: true, message: '请输入学生班级', trigger: 'blur' },
            { min: 1, max: 50, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
          stuBirthDate:[
            { required: true, message: '请选择出生日期', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请选择学生状态', trigger: 'blur' }
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
                this.axios.post('/Student',data).then((response) => {
                    if(response){
                      this.$message({
                        message: '学生信息添加成功',
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
      queryClasses(){
            this.classOptions = [];
            this.axios.get('/ClassInfo',{
            params:{
              size:9999,
              current:1
            }}).then( res =>{
                this.classOptions = res.data.records
            })
      },
      queryMajor(){
            this.axios.get('/Major',{
            params:{
              size:9999,
              current:1
            }}).then( res =>{
                this.majorOptions = res.data.records;
            })
        },
  },
  mounted(){
    this.queryClasses();
    this.queryMajor();
  }
}
</script>

<style>

</style>