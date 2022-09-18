<template>
  <div>
        <!-- 搜索区 -->
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="班级编号">
                <el-input v-model="formInline.classNumber" placeholder="班级编号"></el-input>
            </el-form-item>
            <el-form-item label="班级名称">
                <el-input v-model="formInline.className" placeholder="班级名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryClick" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>   

        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">新增</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" @click="chooseClass">学生调班</el-button> -->
        </el-row>

         <!-- 数据区 -->
        <el-table
            @selection-change="selectionChange"
            ref = "classGrid"
            :data="tableData"
            stripe
            max-height="400"
            style="width: 100%">

            <el-table-column type="selection" width="55" />

            <el-table-column
            v-if="showColumn.classId"
            prop="classId"
            label="主键ID"
            width="180">
            </el-table-column>

            <el-table-column
            prop="classNumber"
            label="班级编号"
            width="180">
            </el-table-column>

            <el-table-column
            prop="className"
            label="班级名称"
            width="180">
            </el-table-column>


            <el-table-column
            prop="teacher.teachName"
            label="班主任/辅导员"
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
            title="新增班级"
            v-model="dialogVisible"
            :before-close="handleClose">
            <div class="el-dialog-div">
                <AddClass @closeAddDialog="closeAddDialog"></AddClass>
            </div>

            
        </el-dialog>

        <el-dialog
            title="查看班级"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <DetailClass :id="id" :readOnly=true @closeAddDialog="closeAddDialog"></DetailClass>
            </div> 
        </el-dialog>


        <el-dialog
            title="修改班级"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                 <DetailClass :id="id" :readOnly=false @closeAddDialog="closeAddDialog"></DetailClass>
            </div> 
        </el-dialog>


        <el-dialog
           width="55%"
            title="学生调班"
            v-model="chooseClassDialogVisible"> 
            <div class="el-dialog-div">
                 <ChooseClass :classNumber="classNumber" :readOnly=false @closeAddDialog="closeAddDialog"></ChooseClass>
            </div> 
        </el-dialog>
       
  </div>
</template>

<script>

import AddClass from '@/views/class/AddClass'
import DetailClass from '@/views/class/DetailClass'
import ChooseClass from '@/views/class/ChooseClass'
export default {
  name: "SearchClass",
  components:{AddClass,DetailClass,ChooseClass},
  props:{},
  data(){
    return {
        showColumn:{
          classId:false  
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
        chooseClassDialogVisible:false,
        id:null,
        classNumber:null,
        tableData: [],
        formInline: {
          className: null,
          classNumber: null
        },
    }
  },
  watch:{},
  computed:{},
  methods:{
        queryClick(){
            this.axios.get('/ClassInfo',{
            params:{
              className: this.formInline.className,
              classNumber: this.formInline.classNumber,
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
            this.id = row.classId
            this.dialogEditVisible = true;
        },
        handleView(index,row){
            index;
            this.id = row.classId;       
            this.dialogViewVisible = true;
        },
        chooseClass(){
            if(this.selectRows.length != 1){
                this.$message({
                        message: '请选择一条需要操纵的班级',
                        type: 'warning'
                    });
                return; 
            }
            const classInfo = this.selectRows[0];
            this.classNumber = classInfo.classNumber;
            this.chooseClassDialogVisible = true;
        }

  },
  created(){},
  mounted(){}
}
</script>
<style  scoped>

</style>