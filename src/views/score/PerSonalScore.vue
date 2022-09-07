<template>
  <div class="wrapper">
         <el-form :inline="true" :model="formInline" class="demo-form-inline">
          
            <el-form-item label="课程名称">
                <el-input v-model="formInline.courseName" placeholder="课程名称" clearable></el-input>
            </el-form-item>

            <el-form-item label="学年">
                <el-select v-model="formInline.year" class="m-2" placeholder="请选择学年" size="default" filterable clearable>
                        <el-option
                        v-for="item in yearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                </el-select>
            </el-form-item>

                <el-form-item label="学期">
                    <el-select v-model="formInline.term" class="m-2" placeholder="请选择学期" size="default" filterable clearable>
                        <el-option
                        v-for="item in termOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
            </el-form-item>
             

            <el-form-item>
                <el-button type="primary" @click="queryClick" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form> 


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
            prop="stuName"
            label="姓名"
            width="180">
            </el-table-column>

            <!-- <el-table-column
            prop="stuNumber"
            label="学号"
            width="180">
            </el-table-column> -->

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

  </div>
</template>

<script>
export default {
  name:"PersonalScore",  
  components:{},
  props:{},
  data(){
    return {
        showColumn:{
          classId:false  
        },
        page:{
            page:1,
            pageSize:10,
            total:0,
            pageSizes:[5, 10, 20, 50, 100]
        },
        yearOptions:[],
        termOptions:[],
        tableData: [],
        formInline: {
          stuNumber: null,
          courseName:null,
          term:null,
          year:null
        },
    }
  },
  watch:{},
  computed:{},
  methods:{
    queryClick(){
            const stuNumber = sessionStorage.getItem('USER_CODE');
            this.axios.get('/Score/self',{
            params:{
              stuNumber: stuNumber,
              courseName: this.formInline.courseName,
              year: this.formInline.year,
              term: this.formInline.term,
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
        initYearSelect(){
        var myDate = new Date();
        var year = myDate.getFullYear(); //获取当前年
        this.years = [];
        for (let i = 0; i < 4; i++) {
            this.yearOptions.push({ value: year - i, label: year - i});
        }
        this.termOptions = [];
        this.termOptions.push({ value: "第一学期" , label: "第一学期" });
        this.termOptions.push({ value: "第二学期" , label: "第二学期" });
      }
  },
  created(){},
  mounted(){
    this.initYearSelect();
  }
}
</script>
<style  scoped>
.wrapper{}
</style>