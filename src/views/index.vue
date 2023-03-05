<template>
<div>

  <span>  <p>项目信息</p></span>

  <el-divider></el-divider>
  <el-row>
    <el-col :span="1">
      <p></p>
    </el-col>
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
  </el-row>

</div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      formdata:[],
      datalength:7,
      currentDate: new Date()
    };
  },
  methods:{
    skip(projectid){
      //console.log(projectid)
      const path="/projectInfo/"+projectid
      this.$router.push(path)
    },

  },
  // created() {
  //   if(!JSON.parse(sessionStorage.getItem("user"))){
  //     this.$router.push("/login")
  //   }
  // }
  created() {
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
.txtmoney{
  color: #F56C6C;
  font-weight:bolder;
  font-size: 18px;
}

.el-main{
  color: #333;
  text-align: center;
  line-height: 160px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
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

.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}

</style>