<template>
  <div>
         <!-- 搜索区 -->
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="教师姓名">
                <el-input v-model="formInline.teachName" placeholder="教师姓名"></el-input>
            </el-form-item>
            <el-form-item label="教师编号">
                <el-input v-model="formInline.teachCode" placeholder="教师编号"></el-input>
            </el-form-item>

            <el-form-item label="教师状态">
                <el-select v-model="formInline.status" placeholder="教师状态">
                    <el-option label="离职" value="0">离职</el-option>
                    <el-option label="在职任教" value="1">在职任教</el-option>

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
            ref = "teachGrid"
            :data="tableData"
            stripe
            max-height="400"
            style="width: 100%">

            <el-table-column type="selection" width="55" />

            <el-table-column
            v-if="showColumn.teachId"
            prop="teachId"
            label="主键ID"
            width="180">
            </el-table-column>

            <el-table-column
            prop="teachCode"
            label="教师编号"
            width="180">
            </el-table-column>

            <el-table-column
            prop="teachName"
            label="教师名称"
            width="180">
            </el-table-column>

            <el-table-column
            prop="teachIdentityCard"
            label="身份证号码"
            width="180">
            </el-table-column>

            <el-table-column
            prop="teachGender"
            label="性别"
            width="180">
                <template #default="scope">
                    <span v-text="formatGender(scope.row.teachGender)"></span>
                </template>
            </el-table-column>

            <el-table-column
            prop="teachPhoneNumber"
            label="手机号码"
            width="180">
            </el-table-column>

            <el-table-column
            prop="status"
            label="教师状态"
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
        
        >
    </el-pagination>


        <el-dialog
            width="70%"
            title="新增教师"
            v-model="dialogVisible"
            :before-close="handleClose">
            <div class="el-dialog-div">
                <AddTeacher @closeAddDialog="closeAddDialog"></AddTeacher>
            </div>

            
        </el-dialog>

        <el-dialog
            width="70%"
            title="查看教师"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <DetailTeacher :id="id" :readOnly=true @closeAddDialog="closeAddDialog"></DetailTeacher>
            </div> 
        </el-dialog>


        <el-dialog
            width="70%"
            title="修改教师"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                 <DetailTeacher :id="id" :readOnly=false @closeAddDialog="closeAddDialog"></DetailTeacher>
            </div> 
        </el-dialog>


  </div>
</template>

<script>
import AddTeacher from '@/views/teacher/AddTeacher'
import DetailTeacher from '@/views/teacher/DetailTeacher'
export default {
    name: "SearchTeacher",
    components:{AddTeacher,DetailTeacher},
    data() {
      return {
        showColumn:{
          teachId:false  
        },
        selectRows:[],
        page:{
            page:1,
            pageSize:10,
            total:0,
            pageSizes:[5, 10, 20, 50, 100]
        },
        dialogVisible:false,
        dialogViewVisible:false,
        dialogEditVisible:false,
        id:null,
        tableData: [],
        formInline: {
          teachName: null,
          teachCode: null,
          status:"1"
        },
        formatStatus(status){
            if(status == '1'){
                return "在职任教";
            }else if(status == '0'){
                return "离职";
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
            this.axios.get('/Teacher',{
            params:{
              teachCode: this.formInline.teachCode,
              teachName: this.formInline.teachName,
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
            this.id = row.teachId
            this.dialogEditVisible = true;
        },
        handleView(index,row){
            index;
            this.id = row.teachId;       
            this.dialogViewVisible = true;
        }

        
    }
}
</script>

<style>

</style>