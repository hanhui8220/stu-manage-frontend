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
            <el-form-item label="课程类型">
                <el-input v-model="formInline.courseType" placeholder="课程类型"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryClick" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>  

        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">新增</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="selectCourse">选课</el-button>
        </el-row>


 <!-- 数据区 -->
        <el-table
            @selection-change="selectionChange"
            :data="tableData"
            stripe
            style="width: 100%">

        <el-table-column type="selection" width="55" />
        
         <el-table-column
            v-if="showColumn.courseId"
            prop="courseId"
            label="主键ID"
            width="180">
            </el-table-column>

            <el-table-column
            prop="courseNumber"
            label="课程编号"
            width="180">
            </el-table-column>

            <el-table-column
            prop="courseName"
            label="课程名称"
            width="180">
            </el-table-column>

            <el-table-column
            prop="courseType"
            label="课程类型"
            width="180">
                <template #default="scope">
                    <span v-text="formatCourseType(scope.row.courseType)"></span>
                </template>
            </el-table-column>

            <el-table-column
            prop="courseTotal"
            label="开放人数"
            width="180">
            </el-table-column>

            <el-table-column
            prop="courseRemain"
            label="剩余可选"
            width="180">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="180">
                <template #default="scope">

                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>


                    <el-button
                    size="small"
                    type="danger"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>        

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
            title="新增课程"
            v-model="dialogVisible"
            :before-close="handleClose">
            <div class="el-dialog-div">
                <AddCourse @closeAddDialog="closeAddDialog"></AddCourse>
            </div>

            
        </el-dialog>

        <el-dialog
            title="查看课程"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <DetailCourse :id="id" :readOnly=true @closeAddDialog="closeAddDialog"></DetailCourse>
            </div> 
        </el-dialog>


        <el-dialog
            title="修改课程"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                 <DetailCourse :id="id" :readOnly=false @closeAddDialog="closeAddDialog"></DetailCourse>
            </div> 
        </el-dialog>

  </div>
</template>

<script>

import AddCourse from '@/views/course/AddCourse'
import DetailCourse from '@/views/course/DetailCourse'
export default {
  name:"SearchCourse",  
  components:{AddCourse,DetailCourse},
  props:{},
  data(){
    return {
        showColumn:{
          courseId:false  
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
          courseName: null,
          courseType:null
        },
    }
  },
  watch:{},
  computed:{},
  methods:{

        queryClick(){
            this.axios.get('/Course',{
            params:{
              courseName: this.formInline.courseName,
              courseNumber: this.formInline.courseNumber,
              courseType:this.formInline.courseType,
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
            this.id = row.courseId
            this.dialogEditVisible = true;
        },
        handleView(index,row){
            index;
            this.id = row.courseId;       
            this.dialogViewVisible = true;
        },
        formatCourseType(value){
            if(value == "0"){
                return "必修";
            }else if(value == "1"){
                return "选修";
            }
            return "";
        },
        selectCourse(){
            if(this.selectRows.length != 1){
                this.$message({
                    message: '请选择一门课程',
                    type: 'warning'
                });
                return;
            }
            const courseNumber = this.selectRows[0].courseNumber;
            const stuNumber = sessionStorage.getItem('USER_CODE');
            this.axios.put('/Student/Course/choose',{
              courseNumber: courseNumber,
              stuNumber:stuNumber  
            }).then( res => {
                if(res){
                  this.$message({
                        message: '选课成功',
                        type: 'success'
                    });  
                }
            })

        }

  },
  created(){},
  mounted(){}
}
</script>
<style scoped>
.wrapper{}
</style>