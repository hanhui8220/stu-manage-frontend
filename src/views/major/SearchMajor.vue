<template>
  <div class="wrapper">

    <!-- 搜索区 -->
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="专业编号">
                <el-input v-model="formInline.majorNumber" placeholder="专业编号"></el-input>
            </el-form-item>
            <el-form-item label="专业名称">
                <el-input v-model="formInline.majorName" placeholder="专业名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="queryClick" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>  

        <el-row>
            <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true">新增</el-button>
        </el-row>

        <el-table
            @selection-change="selectionChange"
            :data="tableData"
            stripe
            max-height="400"
            style="width: 100%">

            <el-table-column type="selection" width="55" />

            <el-table-column
            v-if="showColumn.majorId"
            prop="majorId"
            label="主键ID"
            width="180">
            </el-table-column>

            <el-table-column
            prop="majorNumber"
            label="专业编号"
            width="180">
            </el-table-column>

            <el-table-column
            prop="majorName"
            label="专业名称"
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
            title="新增专业"
            v-model="dialogVisible"
            :before-close="handleClose">
            <div class="el-dialog-div">
                <AddMajor @closeAddDialog="closeAddDialog"></AddMajor>
            </div>
    </el-dialog>


    <el-dialog
            title="查看专业"
            v-model="dialogViewVisible"> 
            <div class="el-dialog-div">
                <DetailMajor :id="id" :readOnly=true @closeAddDialog="closeAddDialog"></DetailMajor>
            </div> 
    </el-dialog>

    <el-dialog
            title="修改专业"
            v-model="dialogEditVisible"> 
            <div class="el-dialog-div">
                 <DetailMajor :id="id" :readOnly=false @closeAddDialog="closeAddDialog"></DetailMajor>
            </div> 
    </el-dialog>

  </div>
</template>

<script>
import AddMajor from '@/views/major/AddMajor'
import DetailMajor from '@/views/major/DetailMajor'
export default {
  name:"SearchMajor",  
  components:{AddMajor,DetailMajor},
  props:{},
  data(){
    return {
        showColumn:{
          majorId:false  
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
          majorNumber: null,
          majorName: null
        },
    }
  },
  watch:{},
  computed:{},
  methods:{
    queryClick(){
            this.axios.get('/Major',{
            params:{
              majorNumber: this.formInline.majorNumber,
              majorName: this.formInline.majorName,
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
            this.id = row.majorId
            this.dialogEditVisible = true;
        },
        handleView(index,row){
            index;
            this.id = row.majorId;       
            this.dialogViewVisible = true;
        },
  },
  created(){},
  mounted(){}
}
</script>
<style  scoped>
.wrapper{}
</style>