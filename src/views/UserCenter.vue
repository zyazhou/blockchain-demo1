<template>
	<div style="text-align: center;">
		<h2>{{ User.name }} 您好, 您已捐赠{{User.totalmoney}}元！</h2>


      <el-form :model="User" :rules="rules" status-icon ref="User" label-width="100px"  class="demo-User" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="User.username" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="username">
          <el-input v-model="User.userId" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name" >
          <el-input v-model="User.name" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="personId">
          <el-input v-model="User.personId" placeholder="确保唯一" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="User.email" placeholder="接收消息" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="User.phone" placeholder="接收消息" size="small"></el-input>
        </el-form-item>

        <el-form-item label="修改后密码" prop="password">
          <el-input type="password" v-model="User.password" autocomplete="off" size="small" show-password></el-input>
        </el-form-item>

        <el-form-item style="margin-top: 35px">
          <el-button type="primary" @click="submitForm('User')" size="small">确认修改</el-button>
        </el-form-item>
      </el-form>

	</div>
</template>

<script>

	import axios from "axios";

  export default {
		name: "Login",
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
          username: 'zya',
          userId:"264487",
          personId: '0000000000000000',
          name: '周迎安',
          email:'2534719204@qq.com',
          phone:'00000000000',
          password: '',
          totalmoney:'5',

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
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.User)
            // console.log(this.User.email)
            axios.post('/updateuser',this.User ).then(res =>{
              console.log(this.User)
              console.log(this.User.email)
              let user = res.data.data.object
              sessionStorage.setItem("user",JSON.stringify(user))
              let user2= JSON.parse(sessionStorage.getItem("user"))
              console.log("user2",user2)

              this.$router.push("/index") //跳到首页

            }).catch(error => {

              alert('修改失败!');
              console.log('.catch(error => :error submit!!');

            })

          } else {
            //alert('修改失败!');
            //console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created() {
      let u=JSON.parse(sessionStorage.getItem("user"));

      this.User.username=u.username
      this.User.userId=u.userId
      this.User.personId=u.personId
      this.User.name=u.name
      this.User.email=u.email
      this.User.phone=u.phone
      this.User.password=u.password
      this.User.totalmoney=u.totalmoney
    }

  }
</script>


<style scoped>
.el-form {
	width: 420px;
	margin: 50px auto;
}
</style>