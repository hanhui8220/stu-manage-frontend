<template>
  <div class="wrapper">

                <!-- 搜索区 -->
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="课程编号">
                <el-input v-model="formInline.courseNumber" placeholder="课程编号"></el-input>
            </el-form-item>
            <el-form-item label="课程名称">
                <el-input v-model="formInline.courseName" placeholder="课程名称"></el-input>
            </el-form-item>

             <el-form-item label="学生学号">
                <el-input v-model="formInline.stuNumber" placeholder="学生学号"></el-input>
            </el-form-item>

             <el-form-item label="学生姓名">
                <el-input v-model="formInline.stuName" placeholder="学生姓名"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryClick" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>   

        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="addScore">成绩录入</el-button>
            <el-button type="primary" icon="el-icon-delete"  @click="deleteByIds">删除</el-button>
        </el-row>

        <!-- 数据区 -->
        <el-table
            @selection-change="selectionChange"
            ref = "classGrid"
            :data="tableData"
            stripe
            style="width: 100%">

            <el-table-column type="selection" width="55" />

            <el-table-column
            v-if="showColumn.classId"
            prop="classId"
            label="主键ID"
            width="180">
            </el-table-column>

             <el-table-column
            prop="stuName"
            label="姓名"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuNumber"
            label="学号"
            width="180">
            </el-table-column>

            <!-- <el-table-column
            prop="stuGender"
            label="性别"
            width="180">
                <template #default="scope">
                    <span v-text="formatGender(scope.row.stuGender)"></span>
                </template>
            </el-table-column> -->

            <el-table-column
            prop="courseName"
            label="课程"
            width="180">
            </el-table-column>

            <el-table-column
            prop="score"
            label="分数"
            width="180">
            </el-table-column>

            <el-table-column
            prop="year"
            label="学年"
            width="180">
            </el-table-column>

            <el-table-column
            prop="term"
            label="学期"
            width="180">
            </el-table-column>

            <!-- <el-table-column
            prop="stuGrade"
            label="学生年级"
            width="180">
            </el-table-column> -->

            <el-table-column
            prop="stuFaculty"
            label="院系"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuMajor"
            label="专业"
            width="180">
            </el-table-column>

            <!-- <el-table-column
            prop="stuClass"
            label="学生班级"
            width="180">
            </el-table-column> -->

             <el-table-column label="操作" fixed="right" width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleView(scope.$index, scope.row)"
                    >查看</el-button
                    >
                </template>
            </el-table-column>

    </el-table>

                <!-- 分页条 -->
    <el-pagination
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
        >
    </el-pagination>

            <el-dialog
            width="70%"
            title="成绩录入"
            v-model="dialogVisible"
            :before-close="handleClose">
            <div class="el-dialog-div">
                <AddScore @closeAddDialog="closeAddDialog"></AddScore>
            </div>

            
        </el-dialog>

        <el-dialog
            width="70%"
            title="成绩查看"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <DetailScore :id="id" :readOnly=true @closeAddDialog="closeAddDialog"></DetailScore>
            </div> 
        </el-dialog>


        <el-dialog
            width="70%"
            title="成绩修改"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                 <DetailScore :id="id" :readOnly=false @closeAddDialog="closeAddDialog"></DetailScore>
            </div> 
        </el-dialog>

  </div>
</template>

<script>
import AddScore from '@/views/score/AddScore'
import DetailScore from '@/views/score/DetailScore'
export default {
  name:"SearchScore",  
  components:{AddScore,DetailScore},
  props:{},
  data(){
    return {
        showColumn:{
          classId:false  
        },
        selectRows:[],
        page:{
            page:1,
            pageSize:2,
            total:0,
            pageSizes:[5, 10, 20, 50, 100]
        },
        dialogVisible:false,
        dialogViewVisible:false,
        dialogEditVisible:false,
        id:null,
        tableData: [],
        formInline: {
          courseNumber: null,
          stuNumber: null,
          courseName:null,
          stuName:null
        },
    }
  },
  watch:{},
  computed:{},
  methods:{
    queryClick(){
            this.axios.get('/Score',{
            params:{
              stuNumber: this.formInline.stuNumber,
              courseNumber: this.formInline.courseNumber,
              courseName: this.formInline.courseName,
              stuName: this.formInline.stuName,
              size:this.page.pageSize,
              current:this.page.page
            }}).then( res =>{
                this.tableData = res.data.records;
                this.page.total = res.data.total;
            })
        },
        handleSizeChange(newPageSize){
            this.page.pageSize = newPageSize;
            this.queryClick();
        },
        handleCurrentChange(newPage){
            this.page.page = newPage;
            this.queryClick();
        },
        handleClose(done) {
            done();
        },
        addScore(){
            this.dialogVisible = true;
        },
        closeAddDialog(){
            this.dialogVisible = false;
            this.dialogEditVisible = false;
            this.queryClick();
        },
        selectionChange(selection){
            this.selectRows = selection;
        },
        handleEdit(index,row){
            index;
            row;
            this.id = row.id
            this.dialogEditVisible = true;
        },
        handleView(index,row){
            index;
            this.id = row.id;       
            this.dialogViewVisible = true;
        },
        formatStatus(status){
            if(status == "0"){
                return "毕业";
            }else if(status == 1){
                return "在校";
            }else if(status == 2){
                return "结业";
            }else if(status == 3){
                return "辍学";
            }
            return "";
        },
        formatGender(value){
            if(value == "0"){
                return "女";
            }else if(value == "1"){
                return "男";
            }
            return "";
        },
        deleteByIds(){
            if(this.selectRows.length == 0){
                this.$message({
                        message: '请勾选需要删除的学生成绩',
                        type: 'warning'
                    });
                return;    
            }
            const ids = this.selectRows.map(row => row.id)
            this.axios.delete('/Score',{
              data:ids
            }).then( res =>{
                if(res.data == ids.length){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                this.queryClick();
            })
        },
  },
  created(){},
  mounted(){}
}
</script>
<style  scoped>
.wrapper{}
</style>