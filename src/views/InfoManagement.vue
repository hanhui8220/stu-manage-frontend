<template>
  <el-row>
    <el-col :span="24">
      <span><h3>信息管理</h3></span>
      <el-divider></el-divider>
    </el-col>
    <el-col :span="24">
      <el-card shadow="never">
        <el-form :inline="true" :model="selectCondition" class="demo-form-inline">
        <el-col :span="7">
          <el-form-item label="学号">
            <el-input size="small" v-model="selectCondition.student_id" placeholder="输入学号"></el-input>
          </el-form-item>
        </el-col>
          <el-col :span="7">
            <el-form-item label="院系">
              <el-select v-model="selectCondition.student_faculty" placeholder="选择院系" size="small">
                <el-option label="信息工程系" value="信息工程系"></el-option>
                <el-option label="经济与管理系" value="经济与管理系"></el-option>
                <el-option label="应用工程系" value="应用工程系"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
          <el-form-item label="专业">
            <el-select v-model="selectCondition.student_major" placeholder="选择专业" size="small">
              <el-option label="软件工程" value="软件工程"></el-option>
              <el-option label="计算机与科学" value="计算机与科学"></el-option>
              <el-option label="财务管理" value="财务管理"></el-option>
              <el-option label="会计学" value="会计学"></el-option>
              <el-option label="网络应用" value="网络应用"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-col :span="16">
              <el-button size="small" type="primary" @click="selectStudentList">查询</el-button>
              </el-col>
              <el-col :span="8">
                <el-button size="small" type="primary" @click="dialogFormVisibleCreate = true">新建</el-button>
              </el-col>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card><br><br>
    </el-col>
    <el-col :span="24">
      <el-table
          :data="tableData"
          :style="{width: '100%'}">
        <el-table-column
            label="学号"
            prop="student_id">
        </el-table-column>
        <el-table-column
            label="姓名"
            prop="student_name">
        </el-table-column>
        <el-table-column
            label="年级"
            prop="student_grade">
        </el-table-column>
        <el-table-column
            label="院系"
            prop="student_faculty">
        </el-table-column>
        <el-table-column
            label="专业"
            prop="student_major">
        </el-table-column>
        <el-table-column
            label="班级"
            prop="student_class">
        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
          <template #default="scope">
            <el-button
                size="mini"
                @click="showFormDate(scope.$index, scope.row, true)">修改</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="deleteStudent(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24"><br><br>
      <el-pagination
          background
          @current-change="handleCurrentChange"
          @prev-click="handleCurrentChangePrev"
          @next-click="handleCurrentChangeNext"
          :currentPage="currentPage"
          :page-size="size"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </el-col>
    <!-- 弹出框1,新建学生信息 -->
    <el-dialog title="新建学生信息" v-model="dialogFormVisibleCreate" width="42%">
      <el-form :model="newFormData" >
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="newFormData.new_student_id" autocomplete="off" size="small" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="newFormData.new_student_name" autocomplete="off" size="small" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-select v-model="newFormData.new_student_grade" placeholder="请选择年级" size="small">
            <el-option label="2018级" value="2018级"></el-option>
            <el-option label="2019级" value="2019级"></el-option>
            <el-option label="2020级" value="2020级"></el-option>
            <el-option label="2021级" value="2021级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系" :label-width="formLabelWidth">
          <el-select v-model="newFormData.new_student_faculty" placeholder="请选择院系" size="small">
            <el-option label="信息工程系" value="信息工程系"></el-option>
            <el-option label="经济与管理系" value="经济与管理系"></el-option>
            <el-option label="应用工程系" value="应用工程系"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-select v-model="newFormData.new_student_major" placeholder="请选择专业" size="small">
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="计算机与科学" value="计算机与科学"></el-option>
            <el-option label="财务管理" value="财务管理"></el-option>
            <el-option label="会计学" value="会计学"></el-option>
            <el-option label="网络应用" value="网络应用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="newFormData.new_student_class" placeholder="请选择班级" size="small">
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisibleCreate = false" size="small">取消</el-button>
      <el-button type="primary" @click="createStudent" size="small">创建</el-button>
    </span>
      </template>
    </el-dialog>
    <!-- 弹出框2,修改学生信息 -->
    <el-dialog title="修改学生信息" v-model="dialogFormVisibleUpdate" width="42%">
      <el-form :model="formData" >
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="formData.student_id" autocomplete="off" size="small" style="width: 80%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formData.student_name" autocomplete="off" size="small" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-select v-model="formData.student_grade" placeholder="请选择年级" size="small">
            <el-option label="2018级" value="2018级"></el-option>
            <el-option label="2019级" value="2019级"></el-option>
            <el-option label="2020级" value="2020级"></el-option>
            <el-option label="2021级" value="2021级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系" :label-width="formLabelWidth">
          <el-select v-model="formData.student_faculty" placeholder="请选择院系" size="small">
            <el-option label="信息工程系" value="信息工程系"></el-option>
            <el-option label="经济与管理系" value="经济与管理系"></el-option>
            <el-option label="应用工程系" value="应用工程系"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-select v-model="formData.student_major" placeholder="请选择专业" size="small">
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="计算机与科学" value="计算机与科学"></el-option>
            <el-option label="财务管理" value="财务管理"></el-option>
            <el-option label="会计学" value="会计学"></el-option>
            <el-option label="网络应用" value="网络应用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="formData.student_class" placeholder="请选择班级" size="small">
            <el-option label="1班" value="1班"></el-option>
            <el-option label="2班" value="2班"></el-option>
            <el-option label="3班" value="3班"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisibleUpdate = false" size="small">取消</el-button>
      <el-button type="primary" @click="updateStudent" size="small">保存</el-button>
    </span>
      </template>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: "InfoManagement",
  data() {
    return {
      selectCondition: {
        student_id: '',
        student_faculty: '',
        student_major: ''
      },
      total: '',
      currentPage: 1,
      size: 5,
      tableData: null,
      newFormData: {
        new_student_id: '',
        new_student_name: '',
        new_student_grade: '',
        new_student_faculty: '',
        new_student_major: '',
        new_student_class: ''
      },
      formData: {
        student_id: '',
        student_name: '',
        student_grade: '',
        student_faculty: '',
        student_major: '',
        student_class: ''
      },
      formLabelWidth: '100px',
      dialogFormVisibleCreate: false,
      dialogFormVisibleUpdate: false,
    }
  },
  mounted() {
    this.selectStudentList();
  },
  methods: {
    handleCurrentChangePrev(val) {
      this.currentPage = val;
      console.log(`上一页: ${val}`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectStudentList();
      console.log(`当前页: ${val}`);
    },
    handleCurrentChangeNext(val) {
      this.currentPage = val;
      console.log(`下一页: ${val}`);
    },
    //按条件查询学生信息，显示学生列表
    selectStudentList() {
      this.axios.get('/student/list',{
        params:{
          page: this.currentPage,
          rows: this.size,
          student_id: this.selectCondition.student_id,
          student_faculty: this.selectCondition.student_faculty,
          student_major: this.selectCondition.student_major
        }}).then((response) => {
            this.total = response.data.total;
            this.tableData = response.data.rows;
    }).catch((error) => {
        console.log(error);
    })},
    //创建学生信息
    createStudent() {
      this.dialogFormVisibleCreate = false;
      this.axios.get('/student/create',{
        params:{
          student_id: this.newFormData.new_student_id,
          student_name: this.newFormData.new_student_name,
          student_grade: this.newFormData.new_student_grade,
          student_faculty: this.newFormData.new_student_faculty,
          student_major: this.newFormData.new_student_major,
          student_class: this.newFormData.new_student_class
        }}).then((response) => {
            this.selectStudentList();
            console.log(response.data);
            this.$message({
              message: '创建成功!',
              type: 'success'
            });
      }).catch((error) => {
         console.log(error);
      })
    },
    //修改学生信息，数据回显
    showFormDate(index, row, dialogFormVisibleUpdate){
      this.dialogFormVisibleUpdate = dialogFormVisibleUpdate;
      this.formData = row;
    },
    //修改学生信息
    updateStudent(index, row) {
      this.axios.get('/student/update',{
        params:{
          student_id: this.formData.student_id,
          student_name: this.formData.student_name,
          student_grade: this.formData.student_grade,
          student_faculty: this.formData.student_faculty,
          student_major: this.formData.student_major,
          student_class: this.formData.student_class
        }}).then((response) => {
            this.selectStudentList();
            console.log(response.data);
            this.$message({
              message: '保存成功',
              type: 'success'
            });
      }).catch((error) => {
        console.log(error);
      })
      this.dialogFormVisibleUpdate = false;
      console.log(index,row);
    },
    //删除学生信息
    deleteStudent(index, row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get('/student/delete',{
          params:{
            studentId: row.student_id
          }}).then((response) => {
              this.selectStudentList();
              console.log(response.data);
        }).catch((error) => {
           console.log(error);
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(index,row);
      },
  }
}
</script>

<style scoped>

</style>