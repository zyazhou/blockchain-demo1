<template>
  <div>

    <div style="width: 80%; margin:0 auto; margin-top: 10px" >

      <div  v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)" >

        <el-form label-width="120px" :model="form">
          <el-form-item label="标题">
            <el-input v-model="form.title" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="一句话介绍">
            <el-input v-model="form.info" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="form">
          <el-form-item label="发布人姓名">
            <el-input v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="发布人ID">
            <el-input v-model="form.id" ></el-input>
          </el-form-item>
          <el-form-item label="期望金额（元）">
            <el-input v-model="form.money"></el-input>
          </el-form-item>

          <button type="button" @click="ShowContent" >内容</button>
          <button type="button" @click="UploaderByAxios">上传</button>
        </el-form>
      </div>

      <div  id="editor" ></div>
    </div>


  </div>
</template>

<script>
import E from "wangeditor"
import axios from "axios";

export default {
  data() {
    return {
      loading:false,
      form:{
        info:'',
        title:'',
        id:'',
        name:'',
        money:'',
        url:'',
      },
      editor: '',
      msg : {
        msg:""
      }
    }
  },
  methods: {
    setWangEditor() {
      // 创建编辑器
      this.editor = new E('#editor')
      this.editor.config.height= 500
      // 配置 onchange 回调函数
      this.editor.config.onchange = function (newHtml) {
        console.log("change 之后最新的 html", newHtml);
      };
      // 配置触发 onchange 的时间频率，默认为 200ms
      this.editor.config.onchangeTimeout = 500; // 修改为 500ms
      // 插入网络图片的回调
      this.editor.config.linkImgCallback = function (src) {
        console.log('图片 src ', src)
        //console.log('图片文字说明',alt)
        //console.log('跳转链接',href)
      }
      // 自定义检查插入视频的回调
      this.editor.config.onlineVideoCallback = function (video) {
        // 自定义回调内容，内容成功插入后会执行该函数
        console.log('插入视频内容', video)
      }
      //关闭样式过滤
      this.editor.config.pasteFilterStyle = false
      // 配置 server 接口地址
      this.editor.config.uploadImgServer = 'http://124.223.6.219:8081/uploadfiles/upload'
      this.editor.config.withCredentials = true
      this.editor.config.uploadFileName = 'file'
      this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024 //最大上传5M的图片
      this.editor.config.uploadImgMaxLength = 1 // 一次最多上传 1 个图片
      const that1 = this;
      this.editor.config.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          const url = result.data.url;//获取后台返回的url
          insertImg(url);
          console.log(result.data.url)
          if(that1.form.url===''){
            that1.form.url=result.data.url;
            // console.log('url')
            // console.log(that1.form.url)
          }else{
            console.log('url不等于null')
          }
        }
      };
      //this.editor.config.uploadImgShowBase64 = true
      // 配置alt选项
      this.editor.config.showLinkImgAlt = false
      // 配置图片超链接
      this.editor.config.showLinkImgHref = false
      this.editor.create()
    },
    ShowContent(){
      console.log(this.form.url)
      alert(this.editor.txt.html() )
      //alert(this.editor.txt.text())
    },
    UploaderByAxios(){
      const _this = this;
      this.msg.projectinfo = this.editor.txt.html()
      this.msg.projectname=this.form.title
      this.msg.userid=this.form.id
      this.msg.expetationamount=this.form.money
      this.msg.username=this.form.name
      this.msg.info=this.form.info
      this.msg.url=this.form.url
      //alert(_this.msg.msg)
      console.log("_this.msg",_this.msg)

      if(this.msg.url === ''){
        alert("请至少上传一张图片");
      }else{
        let that=this
        that.loading=true
        axios.post('/uploadHtml',_this.msg ).then(function (resp){
          // console.log(resp.data)
          // console.log(resp.data.code)
          //that.loading=false
          // this.$alert('上传项目成功!', '成功', {
          //   confirmButtonText: '确定',})
          if(resp.data.code===200) {
          alert("上传项目成功!")
            this.$router.push("/publichome")
          }else{
            alert("上传项目失败,请检查发起人信息有误或者网络错误!")
          }
          this.$router.push("/publichome")
          const path="/projectInfo/"+resp.data.projectid;
          this.$router.push(path)

        }).catch(error => {
          //that.loading=false
          //alert("上传项目失败,请检查发起人信息有误或者网络错误!")
          console.log("上传项目失败,请检查发起人信息有误或者网络错误!")
          // this.$alert('请检查发起人信息有误或者网络错误!', '上传项目失败', {
          //   confirmButtonText: '确定',})
        })
        that.loading=false
      }
      // axios.get('http://localhost:8181/uploadImg?html'+ _this.msg.Html ).then(function (resp){
      //   console.log(resp.data)
      //   // _this.tableData = resp.data.tableData
      //   // _this.total = resp.data.total
      // })
    }
  },
  // <!--created 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图-->
  // <!--mounted在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。-->
  mounted() {
    this.setWangEditor()
  },
  created() {
    if(!JSON.parse(sessionStorage.getItem("user"))){
      this.$alert('只有管理员才能发布项目', '没有权限', {
        confirmButtonText: '确定',
      });
      this.$router.push("/publichome")
    }else{
      if(JSON.parse(sessionStorage.getItem("user")).name !=="管理员"){
        this.$alert('只有管理员才能发布项目', '没有权限', {
          confirmButtonText: '确定',

        });
        //console.log(" this.$router.push(\"/publichome\")")
        this.$router.push("/publichome")
      }
    }
  }
}
</script>

<style scoped>

</style>


