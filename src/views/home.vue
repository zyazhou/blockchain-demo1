<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>

        <strong>区块链慈善救助平台</strong>
        <div class="header-avatar">

          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
              <span class="el-dropdown-link">
                {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/userCenter">
                  个人中心
                </router-link>

              </el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="/publichome" target="_blank" rel="opener">首页</el-link>
          <el-link href="/releaseproject" target="_blank" rel="opener">项目发布</el-link>

        </div>
      </el-header>

      <el-main>
        <!--关键的-->
        <Tabs></Tabs>
        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "@/views/inc/SideMenu";
import Tabs from "@/views/inc/Tabs";
export default {
  name: "home",
  components:{
    SideMenu,Tabs
  },
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.userInfo.username=JSON.parse(sessionStorage.getItem("user")).username;
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // this.$axios.get("/sys/userInfo").then(res => {
      //   this.userInfo = res.data.data
      // })
    },
    logout() {
      //console.log("aaa")
      // this.$axios.post("/logout").then(res => {
      //   localStorage.clear()
      //   sessionStorage.clear()
      //   this.$store.commit("resetState") //这个是清除store目录下index.js中存储的信息，调用resetState清除
      //   this.$router.push("/login")
      // })
      sessionStorage.clear()
      this.$router.push("/login")
    }
  },
}
</script>

<style scoped>
.el-container{
  padding: 0;
  margin: 0;
  height: 100%;

}
.header-avatar{
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dropdown-link{
  cursor: pointer;
}


.el-header{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside{
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main{
  color: #333;
  /*text-align: center;*/
  /*!*line-height: 160px;*!*/
  padding: 0;
}
a{
  text-decoration: none;
}
</style>