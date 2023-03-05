<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6">
      <h1>慈善救助系统</h1>
      <el-image :src="require('@/assets/logo.png')" style="margin-top: 20px"></el-image>
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
      <el-form :model="User" :rules="rules" ref="User" label-width="100px"  class="demo-User" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="User.username" size="small"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="User.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="personId">
          <el-input v-model="User.personId" placeholder="确保唯一" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="User.email" placeholder="接收消息" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="User.phone" placeholder="接收消息" size="small"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="User.password" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="User.checkpass" autocomplete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item style="margin-top: 35px">
          <el-button type="primary" @click="submitForm('User')" size="small">立即注册</el-button>
          <el-button @click="resetForm('User')" size="small">重置</el-button>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.User.checkpass !== '') {
          this.$refs.User.validateField('checkpass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.User.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      User: {
        username: '',
        personId: '',
        name: '',
        email:'2534719204@qq.com',
        phone:'',
        password: '',
        checkpass: '',

      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        personId: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { min: 18, max: 18, message: '18位身份证', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkpass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.User)
          console.log(this.User.email)
          axios.post('/register',this.User ).then(res =>{
            console.log(this.User)
            console.log(this.User.email)
            let user = res.data.data.object
            sessionStorage.setItem("user",JSON.stringify(user))
            let user2= JSON.parse(sessionStorage.getItem("user"))
            console.log("user2",user2)

            this.$router.push("/index") //跳到首页

          }).catch(error => {

            alert('该身份证或用户名已被注册!');
            console.log('.catch(error => :error submit!!');

          })

        } else {

          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
.el-form-item{
  height: 30px;
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>