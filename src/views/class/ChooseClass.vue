<template>
    <div>
               <el-transfer
                    v-model="value"
                    filterable
                    filter-placeholder="学生姓名"
                    :data="data "
                    :titles=titles
                />

         <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="doAssignStuent">保存</el-button>
        </el-row>

    </div>

</template>

<script>

export default {
    name: "ChooseClass",
    props:{
        classNumber:{
            type:String,
            default:""
        }
    },
    components:{},
    data() {
      return {
        showColumn:{
          stuId:false  
        },
        value:[],
        data:[],
        titles:["所有学生","当前选中"]
      }
    },
    methods:{
        queryData(){
            this.axios.get('/ClassInfo/Student',{
            params:{
              classNumber: this.classNumber
            }}).then( res =>{
                const assignedStudents =  res.data.assignedStudents;
                assignedStudents.forEach(student =>{
                    this.value.push(student.stuNumber);
                })    
                const allStudens = res.data.allStudens;
                this.data = [];
                allStudens.forEach(student =>{
                    this.data.push({
                        label: student.stuName,
                        key: student.stuNumber
                    });
                })
            })
        },
        doAssignStuent(){
            this.value
            this.classNumber
            const studens = [];
            this.value.forEach( s =>{
                studens.push({
                    stuNumber:s
                });
            })
            const data = {
                classNumber:this.classNumber,
                students:studens
            }
            this.axios.post('/ClassInfo/Student/assign',data)
                .then(res =>{
                    if(res){
                        this.queryData();
                        this.$message({
                            message: '调班成功',
                            type: 'success'
                        });
                    }
                })
        }
        
        
    },
    mounted(){
        this.queryData()
    }
}
</script>

<style>

</style>