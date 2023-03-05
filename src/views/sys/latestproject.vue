<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
            v-model="searchid"
            placeholder="项目ID"
            clearable
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="queryidproject">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="re">刷新</el-button>
      </el-form-item>

    </el-form>

    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        stripe>

      <el-table-column
          prop="projectid"
          label="项目ID"
          width="100">
      </el-table-column>
      <el-table-column
          prop="projectname"
          label="项目名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="userid"
          label="发起人ID"
          width="100"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="username"
          label="发起人姓名"
          width="100"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          prop="expetationamount"
          label="期望金额(元)"
          width="100"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="projectinfo"
          label="项目描述信息"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="createtime"
          label="创建的时间"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="donationamount"
        label="已捐赠金额(元)"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="donationtimes"
          label="已捐赠次数"
          width="100"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="项目使用记录"
          width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">上传</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div  v-loading="loading1">
      <el-dialog title="上传项目金额使用记录" :visible.sync="showDialog">
        <sapn>项目id:{{upprojectid}}，项目名：{{upprojectname}}</sapn>
        <el-form ref="form" :model="formData" label-width="100px" >
          <el-form-item label="项目id">
            <el-input v-model="formData.projectid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="使用者姓名">
            <el-input v-model="formData.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="使用者id">
            <el-input v-model="formData.userid" :disabled="true"></el-input>
          </el-form-item>
<!--          <el-form-item label="使用时间">-->
<!--            <el-input v-model="formData.usedtime"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="使用金额(元)">
            <el-input v-model="formData.usedamount"></el-input>
          </el-form-item>
          <el-form-item label="使用时间">
            <el-date-picker v-model="formData.usedtime" type="date" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.usedinfo"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
        <el-button @click="uploadRecord" type="primary">确定</el-button>
        <el-button @click="showDialog = false">取消</el-button>
      </span>
      </el-dialog>
    </div>




  </div>
</template>

<script>
	import axios from "axios";

  export default {
		name: "Latestproject",
		data() {
			return {
        tableData:[],
        upprojectid:'',
        upprojectname:'',
        searchid:'',
        showDialog:false,
        formData:{},
        loading1:false,
			}
		},
    methods: {
      re() {
        localStorage.removeItem('result_projectID_projectInfo_query')
        this.$router.go(0)
        console.log("刷新数据")
      },

      handleClick(row) {

        console.log("handleClick");
        console.log(row.projectid);
        let u1=JSON.parse(sessionStorage.getItem("user"));
        if(row.userid!==u1.userId ){
          //没有权限
          this.$alert('没有权限（您并不是该项目发起者）', '错误', {
            confirmButtonText: '确定',
          })

        }else{
          this.showDialog = true;
          this.upprojectid=row.projectid;
          this.upprojectname=row.projectname;
          this.formData.projectid=row.projectid;
          this.formData.userid=u1.userId;
          this.formData.username=u1.name;

        }
        // const path="/projectInfo/"+row.projectid
        // this.$router.push(path)
      },
      uploadRecord() {
        this.loading1=true;
        // 提交formData数据到服务器或在本地进行处理
        console.log(this.formData);
        axios.post('/blockusageinfo/usagesave' ,this.formData ).then(res =>{
          //console.log(res)
          let blockusageinfo = res.data.data.blockusageinfo
          this.loading1=false;
        }).catch(error => {
          console.log('.catch(error => :error submit!!');

        })


        // 关闭弹框
        this.showDialog = false;
      },

      queryidproject(){ //自定义
        //console.log(this.searchid)
        let that=this
        this.$axios.get('/blockprojectinfo/query?id='+this.searchid).then(res =>{
          //console.log('/blockrecordinfo/query?id='+sessionStorage.getItem("userid"));

          //console.log(res.data);
          //console.log(res.data.data);
          let result_projectID_projectInfo_query=res.data.data;
          that.tableData=[]
          that.tableData.push(result_projectID_projectInfo_query)
          localStorage.setItem("result_projectID_projectInfo_query",JSON.stringify(result_projectID_projectInfo_query))

          sessionStorage.setItem("projectID_projectInfo_query",this.searchid)

        }).catch(error => {
          console.log('userIDquery方法捕获到了异常');

        })
      },
      //初始化的
      projectIDquery(){
        let that=this
        this.$axios.get('/blockprojectinfo/query?id='+sessionStorage.getItem("projectID_projectInfo_query")).then(res =>{
          let result_projectID_projectInfo_query=res.data.data;
          localStorage.setItem("result_projectID_projectInfo_query",JSON.stringify(result_projectID_projectInfo_query))
          //let u= JSON.parse(localStorage.getItem("result_projectID_projectInfo_query"))
          that.tableData.push(result_projectID_projectInfo_query)
        }).catch(error => {
          console.log('userIDquery方法捕获到了异常');

        })
      },
    },



		created() {
      if(!JSON.parse(sessionStorage.getItem("user"))){
        this.$router.push("/login")
      }

      sessionStorage.setItem("projectID_projectInfo_query","359866")
      let that=this;
      if(!JSON.parse(localStorage.getItem("result_projectID_projectInfo_query") ) ){
        //不存在
        //根据userid查找，某个用户的捐款记录，

        that.projectIDquery();

      }else{
        let re=JSON.parse(localStorage.getItem("result_projectID_projectInfo_query"));
        that.tableData.push(re)

      }


    },

	}
</script>

<style scoped>

</style>