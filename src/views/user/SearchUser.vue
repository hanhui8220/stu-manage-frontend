<template>

    <div>
        <!-- 搜索区 -->
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.userName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="登录账号">
                <el-input v-model="formInline.userCode" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item label="账户状态">
                <el-select v-model="formInline.status" placeholder="账户状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryUser" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>   

        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">新增</el-button>
            <el-button type="primary" icon="el-icon-delete"  @click="deleteByIds">删除</el-button>
        </el-row>



        <!-- 数据区 -->
        <el-table
            @selection-change="selectionChange"
            ref = "userGrid"
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="400"
            >

            <el-table-column type="selection" width="55" />

            <el-table-column
            v-if="showColumn.userId"
            prop="userId"
            label="用户主键ID"
            width="180">
            </el-table-column>

            <el-table-column
            prop="userName"
            label="姓名"
            width="180">
            </el-table-column>

            <el-table-column
            prop="userCode"
            label="登录账号"
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

            <el-table-column label="操作">
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
            title="新增用户"
            v-model="dialogVisible"
            
            :before-close="handleClose">
            
            <div class="el-dialog-div">
                <AddUser @closeAddDialog="closeAddDialog"></AddUser>
            </div>

            
        </el-dialog>

        <el-dialog
            title="查看用户"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <ViewUser :userData="userData"></ViewUser>
            </div> 
        </el-dialog>


        <el-dialog
            title="修改用户"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                <EditUser :userData="userData" @closeAddDialog="closeAddDialog"></EditUser>
            </div> 
        </el-dialog>


    </div>

</template>

<script>
import AddUser from '@/views/user/AddUser'
import ViewUser from '@/views/user/ViewUser'
import EditUser from '@/views/user/EditUser'
export default {
name: "SearchUser",
components:{AddUser,ViewUser,EditUser},
data() {
      return {
        showColumn:{
          userId:false  
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
        userData:{
            userId:null,
            userName:null,
            userCode:null,
            status:null
        },
        tableData: [],
         formInline: {
          userCode: null,
          userName: null,
          status:"1"
        },
        formatStatus(status){
            if(status == 1){
                return "正常";
            }
            return "禁用";
        }
      }
    },
    methods:{
        queryUser(){
            this.axios.get('/User',{
            params:{
              userCode: this.formInline.userCode,
              userName: this.formInline.userName,
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
            this.queryUser();
        },
        handleCurrentChange(newPage){
            this.page.page = newPage;
            this.queryUser();
        },
        handleClose(done) {
            done();

        },
        closeAddDialog(){
            this.dialogVisible = false;
            this.dialogEditVisible = false;
            this.queryUser();
        },
        selectionChange(selection){
            this.selectRows = selection;
        },
        deleteByIds(){
            if(this.selectRows.length == 0){
                this.$message({
                        message: '请勾选需要删除的用户',
                        type: 'warning'
                    });
                return;    
            }
            const userIds = this.selectRows.map(row => row.userId)
            this.axios.delete('/User',{
              data:userIds
            }).then( res =>{
                if(res.data == userIds.length){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                this.queryUser();
            })
        },
        handleEdit(index,row){
            index;
            row;
            const userId = row.userId;
            this.axios.get('/User'+'/'+userId,{
            }).then( res =>{
                this.userData = res.data
                this.dialogEditVisible = true;
            })
        },
        handleView(index,row){
            index;
            const userId = row.userId;
            this.axios.get('/User'+'/'+userId,{
            }).then( res =>{
                this.userData = res.data
                this.dialogViewVisible = true;
            })
        }

        
    }
}
</script>

<style>

</style>