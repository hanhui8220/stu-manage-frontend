<template>
  <el-container :style="containerStyle">
    <el-header :style="headerStyle" class="el-header">
      <el-row>
        <el-col :span="12">
          <i class="el-icon-eleme" :style="logoIconStyle"></i>
          <span :style="logoFontStyle">学生信息管理</span>
        </el-col>
        <el-col :span="12">
          <div :style="divStyle">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
              <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item class="clearfix">
                    <span>管理员：王二</span>
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    系统通知
                    <el-badge class="mark" :value="12" />
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix" @click="userLogout()">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: 91vh;">
      <el-aside width="200px" class="el-aside">
        <el-menu :uniqueOpened="true" router
                 default-active="/InfoManagement"
                 style="width: 200px;font-weight: bold;"
                 class="el-menu-vertical-demo"
                 active-text-color="#303133"
                 @open="handleOpen"
                 @close="handleClose">


          <el-submenu index="/InfoManagement">
            <template #title><i class="el-icon-menu menu-icon"></i><span>系统管理</span></template>
            <el-menu-item index="/SearchUser">用户信息管理</el-menu-item>
            <el-menu-item index="/SearchTeach">教师信息管理</el-menu-item>
            <el-menu-item index="/SearchStu">学生信息管理</el-menu-item>
          </el-submenu>

          <el-submenu index="/ClassManagement">
            <template #title><i class="el-icon-menu menu-icon"></i><span>班级管理</span></template>
            <el-menu-item index="/SearchClass">班级信息管理</el-menu-item>
            <el-menu-item index="/ChooseClass">学生调班</el-menu-item>
          </el-submenu>
          



        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      containerStyle: {
        backgroundColor: 'whitesmoke'
      },
      headerStyle: {
        textAlign: 'right',
        fontSize: '12px',
        height: '9vh'
      },
      logoIconStyle: {
        float: 'left',
        fontSize: '36px',
        marginTop: '15px',
        marginBottom: '15px',
        color: 'white',
      },
      logoFontStyle: {
        float: 'left',
        fontSize: '24px',
        marginTop: '16px',
        marginBottom: '16px',
        color: 'white',
      },
      divStyle: {
        marginTop: '18px',
        marginBottom: '18px',
        float: 'right',
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    userLogout() {
      this.axios.get('/User/logout').then((response) => {
           console.log(response.data);
           this.$router.push('/');
      }).catch((error) => {
         console.log(error)
         this.$message.error('用户名或密码错误');
      })
    }
  }
}
</script>

<style scoped>
.el-header {
  color: #333;
  background-color: #409eff;
  box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
}
.el-aside {
  color: #333;
  margin: 10px;
}
.el-main{
  background-color: #FFFFFF;
  margin: 10px auto;
}
.menu-icon {
  color: #464a51;
}
</style>