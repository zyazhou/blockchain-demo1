<template>

<!--  <el-main>user:把数据存在前端</el-main>-->

<!--  <div>-->
<!--    <el-button >4444</el-button>-->
<!--    <router-link to="/projectInfo/10">跳转</router-link>-->
<!--  </div>-->

<div >

    <el-table
        v-loading="loading"
        :data="recordInfo"
        style="width: 100%">
      <el-table-column
          prop="userid"
          label="用户id"
          width="180">
      </el-table-column>
      <el-table-column
          prop="projectid"
          label="项目id"
          width="180">
      </el-table-column>
      <el-table-column
          prop="donationamount"
          label="捐赠金额"
          width="180">
      </el-table-column>
      <el-table-column
          prop="message"
          label="捐赠留言">
      </el-table-column>
      <el-table-column
          prop="donationtime"
          label="捐赠时间"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看项目详细信息</el-button>
        </template>
      </el-table-column>

    </el-table>
  <div style="margin-top: 20px">

    <el-button @click="setCurrent">刷新数据</el-button>
  </div>
</div>

</template>

<script>

export default {
  name: "user",
  data() {
    return {
      recordInfo: [
        // {
        //   userID: "10",
        //   projectID:"10",
        //   donationAmount:"2000",
        //   donationTime :"2023-3-19 12:00:01",
        //   message:"只要人人献出一点爱，世界将变成美好的明天！",
        //   path :"/projectInfo?id=10",
        // },
        // {
        //   userID : "10",
        //   projectID :"11",
        //   donationAmount:"3000",
        //   donationTime:"2023-3-17 13:00:01",
        //   message:"只要人人献出一点爱，世界将变成美好的明天！",
        //   path: "/projectInfo?id=11"
        // },
      ],
      loading: false

    }

  },

  methods: {
    setCurrent() {
      localStorage.removeItem('result_userID_recordInfo_query')
      this.$router.go(0)
      console.log("刷新数据")
    },

    handleClick(row) {

      // console.log("row.projectID");
      // console.log(row.projectid);
      const path="/projectInfo/"+row.projectid
      this.$router.push(path)
    },
    //查多条
    userIDquery(){
      let that=this
      this.$axios.get('/blockrecordinfo/queryhistory?id='+sessionStorage.getItem("userID_recordInfo_query")).then(res =>{
        console.log(res.data.data);
        let result_userID_recordInfo_query=res.data.data;
        localStorage.setItem("result_userID_recordInfo_query",JSON.stringify(result_userID_recordInfo_query))
        //let u= JSON.parse(localStorage.getItem("result_userID_recordInfo_query"))
        //console.log(u)
        that.recordInfo=[]
        let i;
        for(i=0;i<result_userID_recordInfo_query.length;i++){
          that.recordInfo.push(result_userID_recordInfo_query[i])
        }

      }).catch(error => {
        console.log('userIDquery方法捕获到了异常');

      })
    },
  },
  mounted() {

  },
  created() {

    if(!JSON.parse(sessionStorage.getItem("user"))){
      this.$router.push("/login")
    }
    //useid一定是存在的  userId
      sessionStorage.setItem("userID_recordInfo_query",JSON.parse(sessionStorage.getItem("user")).userId)
    let that=this
      if(!JSON.parse(localStorage.getItem("result_userID_recordInfo_query") ) ){
        //不存在
        //根据userid查找，某个用户的捐款记录，
        that.userIDquery();

        // let re=JSON.parse(localStorage.getItem("result_userID_recordInfo_query"));
        // //console.log(re)
        // this.recordInfo=[]
        // let i;
        //
        // for(i=0;i<re.length;i++){
        //   this.recordInfo.push(re[i])
        // }
      }else{
        let re=JSON.parse(localStorage.getItem("result_userID_recordInfo_query"));
        //console.log(re)
        that.recordInfo=[]
        let i;

        for(i=0;i<re.length;i++){
          that.recordInfo.push(re[i])
        }
        //console.log( this.recordInfo)
        //console.log('result_userID_recordInfo_query存在');

      }


    //
  }
}
</script>

<style scoped>


.el-main{
  color: #333;
  text-align: center;
  line-height: 160px;
}

body {
  margin: 0;
}
</style>