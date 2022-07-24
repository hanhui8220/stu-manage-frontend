<template>
  <div>
        <!-- 搜索区 -->
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.stuName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="formInline.stuNumber" placeholder="学号"></el-input>
            </el-form-item>

            <el-form-item label="学生状态">
                <el-select v-model="formInline.status" placeholder="学生状态">
                    <el-option label="毕业" value="0">毕业</el-option>
                    <el-option label="在校" value="1">在校</el-option>
                    <el-option label="结业" value="2">结业</el-option>
                    <el-option label="辍学" value="3">辍学</el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryClick" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>   

        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">新增</el-button>
        </el-row>



        <!-- 数据区 -->
        <el-table
            @selection-change="selectionChange"
            ref = "stuGrid"
            :data="tableData"
            stripe
            style="width: 100%">

            <el-table-column type="selection" width="55" />

            <el-table-column
            v-if="showColumn.stuId"
            prop="stuId"
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

            <el-table-column
            prop="stuIdentityCard"
            label="身份证号码"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuGender"
            label="性别"
            width="180">
                <template #default="scope">
                    <span v-text="formatGender(scope.row.stuGender)"></span>
                </template>
            </el-table-column>

            <el-table-column
            prop="stuPhoneNumber"
            label="手机号码"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuGrade"
            label="学生年级"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuFaculty"
            label="学生院系"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuMajor"
            label="学生专业"
            width="180">
            </el-table-column>

            <el-table-column
            prop="stuClass"
            label="学生班级"
            width="180">
            </el-table-column>

            <el-table-column
            prop="status"
            label="账户状态"
            width="180">
                <template #default="scope">
                    <span v-text="formatStatus(scope.row.status)"></span>
                </template>
            </el-table-column>

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
        hide-on-single-page="true"
        >
    </el-pagination>


        <el-dialog
            width="70%"
            title="新增学生"
            v-model="dialogVisible"
            :before-close="handleClose">
            <div class="el-dialog-div">
                <AddStu @closeAddDialog="closeAddDialog"></AddStu>
            </div>

            
        </el-dialog>

        <el-dialog
            width="70%"
            title="查看学生"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <DetailStu :id="id" :readOnly=true @closeAddDialog="closeAddDialog"></DetailStu>
            </div> 
        </el-dialog>


        <el-dialog
            width="70%"
            title="修改学生"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                 <DetailStu :id="id" :readOnly=false @closeAddDialog="closeAddDialog"></DetailStu>
            </div> 
        </el-dialog>


    </div>
</template>

<script>
import AddStu from '@/views/student/AddStu'
import DetailStu from '@/views/student/DetailStu'
export default {
    name: "SearchStu",
    components:{AddStu,DetailStu},
    data() {
      return {
        showColumn:{
          stuId:false  
        },
        selectRows:[],
        page:{
            page:1,
            pageSize:1,
            total:0,
            pageSizes:[5, 10, 20, 50, 100]
        },
        dialogVisible:false,
        dialogViewVisible:false,
        dialogEditVisible:false,
        id:null,
        tableData: [],
        formInline: {
          stuName: null,
          stuNumber: null,
          status:"1"
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
        }
      }
    },
    methods:{
        queryClick(){
            this.axios.get('/Student',{
            params:{
              stuNumber: this.formInline.stuNumber,
              stuName: this.formInline.stuName,
              status:this.formInline.status,
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
            this.id = row.stuId
            this.dialogEditVisible = true;
        },
        handleView(index,row){
            index;
            this.id = row.stuId;       
            this.dialogViewVisible = true;
        }

        
    }
}
</script>

<style>

</style>