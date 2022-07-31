<template>
  <div class="wrapper">

        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-userForm" :disabled="isView" :inline="true">
            
            <el-form-item label="班级编号" prop="classNumber">
                    <el-input v-model="form.classNumber"></el-input>
            </el-form-item>

            <el-form-item label="班级名称" prop="className">
                    <el-input v-model="form.className"></el-input>
            </el-form-item>

            <el-form-item label="辅导员/班主任" prop="classManager">
                    <el-select v-model="form.classManager" class="m-2" placeholder="Select" size="large" filterable>
                        <el-option
                        v-for="item in options"
                        :key="item.teachCode"
                        :label="item.teachName"
                        :value="item.teachCode"
                        />
                    </el-select>
            </el-form-item>

            <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">保存</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
             </el-form-item>
        </el-form>


  </div>
</template>

<script>
export default {
  name:"DetailClass",  
  components:{},
  props:{
    readOnly:{
        type:Boolean,
        default:true
    },
    id:{
      type:String,
      default:""
    }
  },
  data(){
    return {
        options:[],
        isView:this.readOnly,
        form:{
            classId:null,
            classNumber:null,
            className:null,
            classManager:null
        },
        rules: {
            classNumber: [
            { required: true, message: '请输入班级编号', trigger: 'blur' },
            { min: 1, max: 16, message: '不能输入超过16个字符', trigger: 'blur' }
          ],
            className: [
            { required: true, message: '请输入班级名称', trigger: 'blur' },
            { min: 1, max: 32, message: '不能输入超过50个字符', trigger: 'blur' }
          ],
            classManager:[
            { required: true, message: '请选择辅导员/班主任', trigger: 'blur' }
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
                this.axios.put('/ClassInfo/'+ this.id,data).then((response) => {
                    response
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    that.$emit("closeAddDialog");
                
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
      getObjData(){
         this.axios.get('/ClassInfo/'+this.id,{}).then((response) => {
                    response
                this.form = response.data
        })
      },
      queryTeacher(){
            this.axios.get('/Teacher',{
            params:{
              size:9999,
              current:1,
              status:1
            }}).then( res =>{
                this.options = res.data.records;
            })
      }
  },
  created(){},
  mounted(){
    this.queryTeacher();
    this.getObjData();
  }
}
</script>
<style  scoped>
.wrapper{}
</style>