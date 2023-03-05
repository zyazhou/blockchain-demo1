<template>

  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6">
        <h2>慈善救助系统</h2>
        <el-image :src="require('@/assets/logo.png')"></el-image>
        <p>
          基于联盟区块链
        </p>
        <p>
          数据可溯源、防篡改
        </p>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="6">
      <el-form :model="loginForm" :rules="rules" label-width="100px"  ref="loginForm" class="demo-loginForm">
        <el-form-item label="用户名" prop="username" style="width: 380px;">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px;">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px;">
          <el-input v-model="loginForm.code" style="width: 172px; float: left;" maxlength="5"></el-input>
          <el-image class="captchaImg" :src="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button>
            <router-link to="/register" class="no-underline">注册</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import qs from 'qs'
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'zya',
        password: '123456',
        code: '',
        token: '',
        i_code:'',
      },
      User :{
        username: '',
        password: '',

      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 5, max: 5, message: '验证码为5个字符', trigger: 'blur'}
        ],
      },
      captchaImg: ''
    }

  },
  methods: {
    submitForm(formName) {
      if(this.loginForm.i_code === this.loginForm.code){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.User.username=this.loginForm.username;
            this.User.password=this.loginForm.password;
            axios.post('/login' ,this.User ).then(res =>{
              console.log('跳到首页');
              // const jwt = res.headers['authorization']
              // 将jwt存储到应用store中,类似token
              //const jwt=res.data.data.object.username;
              let user = res.data.data.object

              console.log(res.data.code)
              if(res.data.code === 200){

                sessionStorage.clear()
                localStorage.clear()
                console.log(res.data.code)
              }
              sessionStorage.setItem("user",JSON.stringify(user))
              let user2= JSON.parse(sessionStorage.getItem("user"))
              // console.log("user",user)
              // console.log("user2",user2)
              // console.log(res);
              // this.$store.commit("SET_TOKEN", jwt)
              // console.log('跳到首页');

              this.$router.push("/publichome") //跳到首页

            }).catch(error => {
              this.getCaptcha();
              console.log('.catch(error => :error submit!!');

            })
          } else {
            this.getCaptcha();
            console.log(' this.getCaptcha();:error submit!!');
            return false;
          }
        });
      }else{
        alert("验证码错误")
        return
      }

    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    getCaptcha(){
      this.$axios.get('/captcha').then(res =>{
        console.log('login页面中的getCaptcha方法被调用');
        console.log(res.data);
        this.loginForm.token=res.data.data.token;
        this.captchaImg=res.data.data.captchaImg;
        this.loginForm.i_code=res.data.data.code;
        this.loginForm.code=res.data.data.code;
      }).catch(error => {
        console.log('getCaptcha方法捕获到了异常');

      })
    }
  },
  created() {
    console.log('login页面中的created方法被调用');
    this.getCaptcha()
  }
}
</script>

<style scoped>

.el-row {
  height: 100%;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  text-align: center;

}
.el-divider {
  height: 200px;
}
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
.no-underline {
  text-decoration: none;
}
</style>