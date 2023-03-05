<template>
  <div style="background:#f6f6f6">
    <div class="thefirst" >
      <div>
        <el-image
            style="width: 300px; height: 120px;display: flex; margin-top: 4px;margin-left: 20px"
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

    <div style="width: 98%; margin:0 auto; margin-top: 2px" >

      <el-row :gutter="20">
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公益项目</p>
        <el-col :span="20">
          <el-col :span="1">
            <p></p>
          </el-col>
          <div class="grid-content">
            <el-col :span="10" v-for="(o,item) in formdata" :key="item" :offset="item > 0 ? 1 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img :src=o.url class="image">
                <div style="padding: 10px;">
                  <span>{{ o.title }}</span>
                  <div class="bottom clearfix">
                    <!--            <time class="time">{{ currentDate }}</time>-->
                    <p>
                      <time class="time">{{o.info}}</time>
                    </p>
                    <p>
                      <time class="time">已筹款</time>
                      <strong class="txtmoney">{{ o.donationamount }}</strong>
                      <time class="time">元</time>

                      <time class="time">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</time>

                      <time class="time">已捐赠</time>
                      <strong class="txtmoney">{{ o.donationtimes }}</strong>
                      <time class="time">次</time>

                      <el-button type="text" class="button"  @click="skip(o.projectid)">查看详情</el-button>
                    </p>

                  </div>
                </div>
              </el-card>
            </el-col>
        </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple" style="border: 2px solid black; padding: 10px;">
          <p>发起募款项目流程</p>
          <p>1、发布者提交纸质材料</p>
          <p>2、平台管理员审核并发布项目</p>
          <p>3、普通用户可查询捐款记录</p>
          <p>4、发布者上传项目资金使用记录</p>

        </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: "PublicHome",
  data(){
    return{
      userone:{},
      formdata:[],
      showname:false,
    }
  },
  methods:{
    loginbutton(){
      this.$router.push("/login") //
    },
    registerbutton(){
      this.$router.push("/register") //注册
    },
    skip(projectid){
      //console.log(projectid)
      const path="/projectInfo/"+projectid
      this.$router.push(path)
    },
  },
  created(){
    //用户信息附上
    let user1= JSON.parse(sessionStorage.getItem("user"));
    if(!user1){
      //console.log("user为空")
      this.showname=false;
    }else{
      //console.log("user不为空")
      this.userone=user1;
      this.showname=true;
    }

    this.$axios.get('/projectinfo/allproject').then(res =>{
      //console.log('/projectinfo/allproject被调用');
      //console.log(res.data.data);
      let all=res.data.data;
      this.formdata=[]
      //console.log(all[0])
      var i=0;
      for(i=0;i<all.length;i++){
        this.formdata.push(all[i])
      }
      // console.log(this.formdata)

    }).catch(error => {
      console.log('/projectinfo/allproject捕获到了异常');
    })
  }

}
</script>

<style scoped>
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
  background: #f6f6f6;
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
.image {
  width: 100%;
  height:50%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>