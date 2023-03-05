<template>
  <div style="background:#f6f6f6">
    <div class="thefirst">
      <div>
        <el-image
            style="width: 300px; height: 120px;display: flex; margin-top: 0px;margin-left: 20px"
            :src="require('@/assets/fig1.png')"
            fit="contain">
        </el-image>
      </div>
      <div style="margin-top: 30px;margin-left: 150px">

        <el-link href="/publichome" target="_blank" rel="opener">
          <p style="font-weight:bold;font-size:15px">首页</p>
        </el-link>
      </div>
      <div style="margin-top: 30px;margin-left: 70px">
        <el-link href="/sys/users" target="_blank" rel="opener">
          <p style="font-weight:bold;font-size:15px">数据查询</p>
        </el-link>
      </div>

      <div style="margin-top: 30px;margin-left: 70px">
        <el-link href="/releaseproject" target="_blank" rel="opener">
          <p style="font-weight:bold;font-size:15px">项目发布</p>
        </el-link>
      </div>
      <div style="margin-top: 30px;margin-left: 70px">
        <el-link href="/userCenter" target="_blank" rel="opener">
          <p style="font-weight:bold;font-size:15px">个人中心</p>
        </el-link>
      </div>

      <div style="margin-top: 30px;margin-left: 300px">
        <div v-if="!showname">
          <el-button round @click="loginbutton" style="border-color: red;">登录</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button round @click="registerbutton" style="border-color: red;">注册</el-button>
        </div>
        <div v-if="showname">
          <span>用户</span>
          <span>{{ userone.username}}</span>
          <span>您好！</span>
        </div>
<!--        <span>{{ user.name }}</span>-->
      </div>
    </div>

    <div style="width: 85%; margin:0 auto; margin-top: 35px;background-color: #FFFFFFFF;display: flex;" v-loading="loading1">
      <div class="block">
        <el-image :src="url" style="width: 560px; height: 322px;">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>

      <div style="flex-wrap: wrap">
        <p style="color: #333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-weight:bolder;font-size: 20px; margin-left: 30px">
          {{t1}}
        </p>
        <p style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">{{t2}}</p>
        <p style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">项目id:{{t3}}</p>

        <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">已筹款</time>
        <strong class="txtmoney">{{ detail_result_projectID_projectInfo_query[0].donationamount }}</strong>
        <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666;">元</time>

        <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">捐赠次数</time>
        <strong class="txtmoney">{{ detail_result_projectID_projectInfo_query[0].donationtimes }}</strong>
        <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666;">次</time>

        <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">目标金额</time>
        <strong class="txtmoney">{{ detail_result_projectID_projectInfo_query[0].expetationamount }}</strong>
        <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666;">元</time>

        <el-divider content-position="left"></el-divider>

        <el-row>
          <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">捐款金额</time>
          <el-input v-model="blockrecordinfo.donationamount" size="small" style="width: 80px;margin-top: 10px;margin-left: 10px"></el-input>
          <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666;">元</time>

          <time style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 30px">捐赠留言</time>
          <el-input v-model="blockrecordinfo.message" style="width: 50%;margin-top: 10px;margin-left: 10px" ></el-input>

          <el-button type="danger" @click="donation" style="margin-left: 230px; margin-top: 10px">我要捐赠</el-button>

        </el-row>

      </div>
    </div>


    <div style="width: 85%; margin:0 auto; margin-top: 20px;background-color: #FFFFFFFF;" >

      <el-row :gutter="20">
        <el-col :span="18">
          <strong class="txtmoney" style="margin-top: 8px;margin-left: 10px;text-overflow:ellipsis;white-space: nowrap;color: #666;">项目详情</strong>

          <div style=" margin:0 auto; margin-top: 10px" >
            <div v-html="editorData"></div>
          </div>
        </el-col>


        <el-col :span="6">
          <div >
            <p style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 10px">项目发起人:{{detail_result_projectID_projectInfo_query[0].username}}</p>
            <p style="overflow: hidden; text-overflow:ellipsis;white-space: nowrap;color: #666; margin-left: 10px">创建时间:{{detail_result_projectID_projectInfo_query[0].createtime}}</p>


          </div>
        </el-col>
      </el-row>

    </div>


  </div>

<!--  <p>projetcInfo</p>-->
</template>

<script>

  import E from "wangeditor";
  import axios from "axios";
  export default {
    data() {
      return {
        t1:"守三江水护万物源",
        t2:"请和我们一起守护三江源，让七亿人水源重回清澈。",
        t3:"359866",
        showname:false,
        blockrecordinfo:{  //用户捐赠的数据
          donationamount:'1',
          message:'(9)这是用户捐赠的留言内容',
          projectid:'',
          userid:'',
        },
        loading1:false,
        projectid:'',
        detail_result_projectID_projectInfo_query:[],
       // detail_result_projectID_usageInfo_queryHistory:[],
        userone:{},

        donateAmount: "",
        editorData: "",
        url:'',
      }
    },
    methods:{
      //捐赠
      donation(){
        this.blockrecordinfo.projectid=this.projectid;
        let user2= JSON.parse(sessionStorage.getItem("user"));
        this.blockrecordinfo.userid=user2.userId;
        //取出blockrecordinfo，并将其保存在result_userID_recordInfo_query
        this.loading1=true
        axios.post('/blockrecordinfo/user/donation' ,this.blockrecordinfo ).then(res =>{

          //console.log(res)
          let blockrecordinfo = res.data.data.blockrecordinfo
          let tmp=[]
          let i
          let re=JSON.parse(localStorage.getItem("result_userID_recordInfo_query"));
          for(i=0;i<re.length;i++){
            tmp.push(re[i])
          }
          tmp.push(blockrecordinfo)
          localStorage.setItem("result_userID_recordInfo_query",JSON.stringify(tmp))
          // console.log("blockrecordinfo")
          // console.log(blockrecordinfo)
          // console.log("re")
          // console.log(re)
          this.loading1=false
          this.$router.push("/sys/users") //用户捐赠信息页面
        }).catch(error => {
          this.$router.push("/sys/users") //用户捐赠信息页面
          console.log('.catch(error => :error submit!!');

        })
        this.$router.push("/sys/users") //用户捐赠信息页面
      },
      loginbutton(){
        this.$router.push("/login") //登录
      },
      registerbutton(){
        this.$router.push("/register") //注册
      },
      ShowEditor(){
        const _this = this;
        axios.get('/getHtml/?id='+this.projectid).then(function (resp){
          //console.log(resp.data.data.object)
          _this.editorData = resp.data.data.object.context;
          _this.url = resp.data.data.object.url;

          _this.t1 = resp.data.data.object.title;
          _this.t2 = resp.data.data.object.info;
          _this.t3 = resp.data.data.object.projectid;

          // _this.detail_result_projectID_projectInfo_query[0].donationamount=resp.data.data.object.donationamount;
          // _this.detail_result_projectID_projectInfo_query[0].donationtimes=resp.data.data.object.donationtimes;
          // _this.detail_result_projectID_projectInfo_query[0].expetationamount=resp.data.data.object.expetationamount;
              //     this.detail_result_projectID_projectInfo_query.donationamount=s1;
              //     this.detail_result_projectID_projectInfo_query.donationtimes=s2;
         // console.log(resp.data.data.object.url);
        })
      },
      //2.查询该项目在区块链中的最新信息
      detailprojectIDquery(){
        const that1 = this;
        this.$axios.get('/blockprojectinfo/query?id='+this.projectid).then(res =>{
          let detail_result_projectID_projectInfo_query=res.data.data;

          this.detail_result_projectID_projectInfo_query=[]
          this.detail_result_projectID_projectInfo_query.push(detail_result_projectID_projectInfo_query)

          //localStorage.setItem("detail_result_projectID_projectInfo_query",JSON.stringify(detail_result_projectID_projectInfo_query))
          //this.detail_result_projectID_projectInfo_query.push(detail_result_projectID_projectInfo_query)
        }).catch(error => {
          console.log('userIDquery方法捕获到了异常');
        })
      },
      // //3.查询该项目在区块链中的历史使用信息
      // detailprojectidUsageInfoqueryhistory(){
      //   this.$axios.get('/blockusageinfo/queryhistory?id='+sessionStorage.getItem("detail_projectID_usageInfo_queryHistory")).then(res =>{
      //
      //     let result_projectID_usageInfo_queryHistory=res.data.data;
      //     localStorage.setItem("detail_result_projectID_usageInfo_queryHistory",JSON.stringify(detail_result_projectID_usageInfo_queryHistory))
      //     let u= JSON.parse(localStorage.getItem("detail_result_projectID_usageInfo_queryHistory"))
      //   }).catch(error => {
      //     console.log('detailprojectidUsageInfoqueryhistory');
      //   })
      // },
    },
    mounted() {
      this.projectid=this.$route.params.id;
      //初始化
      this.ShowEditor();


    },
    created(){
      //1.给projectid 赋值保留
      this.projectid=this.$route.params.id;

      //2.查询该项目在区块链中的最新信息
      // sessionStorage.setItem("detail_projectID_projectInfo_query",this.projectid)
      // if(!JSON.parse(localStorage.getItem("detail_result_projectID_projectInfo_query") ) ){
      //   this.detailprojectIDquery();
      //
      // }else{
      //   this.detailprojectIDquery();
      //   let re=JSON.parse(localStorage.getItem("detail_result_projectID_projectInfo_query"));
      //  // console.log(re)
      //   this.detail_result_projectID_projectInfo_query=[]
      //   this.detail_result_projectID_projectInfo_query.push(re)
      // }
        this.detailprojectIDquery();

      // //3.查询该项目在区块链中的历史使用信息
      // sessionStorage.setItem("detail_projectID_usageInfo_queryHistory",this.projectid)
      // if(!JSON.parse(localStorage.getItem("detail_result_projectID_usageInfo_queryHistory") ) ){
      //   this.detailprojectidUsageInfoqueryhistory();
      //
      // }else {
      //   let re = JSON.parse(localStorage.getItem("detail_result_projectID_usageInfo_queryHistory"));
      //   // console.log(re)
      //   // console.log(re[0])
      //   var i = 0;
      //   for (i = 0; i < re.length; i++) {
      //     this.detail_result_projectID_usageInfo_queryHistory.push(re[i])
      //   }
      // }

      //4、用户信息附上
      let user1= JSON.parse(sessionStorage.getItem("user"));
      if(!user1){
        //console.log("user为空")
        this.showname=false;
      }else{
        //console.log("user不为空")
        this.userone=user1;
        this.showname=true;
      }


  },

}


</script>

<style scoped>

.txtmoney{
  color: #333;
  font-weight: 700;
  font-size: 16px;
}




.thefirst{
  height: 120px;
  background-color: #ffffff;
  display: flex;
}

.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>