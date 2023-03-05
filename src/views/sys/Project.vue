<template>
	<div>
		<el-form :inline="true">
			<el-form-item>
				<el-input
						v-model="searchid"
						placeholder="输入项目ID"
						clearable
				>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button @click="getList">查询</el-button>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="dialogVisible = true">刷新</el-button>
			</el-form-item>
<!--			<el-form-item>-->
<!--				<el-popconfirm title="这是确定批量删除吗？" @confirm="delHandle(null)">-->
<!--					<el-button type="danger" slot="reference" :disabled="delBtlStatu">批量删除</el-button>-->
<!--				</el-popconfirm>-->
<!--			</el-form-item>-->
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
					width="120">
			</el-table-column>
			<el-table-column
					prop="userid"
					label="使用者ID"
					show-overflow-tooltip>
			</el-table-column>
			<el-table-column
					prop="username"
					label="使用者姓名"
					show-overflow-tooltip>
			</el-table-column>

      <el-table-column
          prop="usedamount"
          label="使用的金额"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="usedtime"
          label="使用的时间"
          show-overflow-tooltip>
      </el-table-column>      <el-table-column
        prop="usedinfo"
        label="用途描述"
        show-overflow-tooltip>
    </el-table-column>
		</el-table>


		<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout="total, sizes, prev, pager, next, jumper"
				:page-sizes="[10, 20, 50, 100]"
				:current-page="current"
				:page-size="size"
				:total="total">
		</el-pagination>




	</div>
</template>

<script>
	export default {
		name: "Project",
		data() {
			return {
        searchid: '',
        tableData:[],
				total: 2,
				size: 10,
				current: 1,
				dialogVisible: false,

				// tableData: [
        //   {
        //     projectID: "10",
        //     userID:"10",
        //     userName:"张三",
        //     usedAmount:"1000",
        //     usedTime:"2023-3-18 13:00:00",
        //     usedInfo:"购买座椅",
        //   },
        //   {
        //     projectID: "10",
        //     userID:"10",
        //     userName:"张三",
        //     usedAmount:"2000",
        //     usedTime:"2023-3-19 13:00:00",
        //     usedInfo:"修路",
        //   }
        // ],

			}
		},

		created() {
      //sessionStorage.setItem("projectID_usageInfo_queryHistory","0")
      let that=this;
      if(!JSON.parse(localStorage.getItem("result_projectID_usageInfo_queryHistory") ) && sessionStorage.getItem("projectID_usageInfo_queryHistory")){
        //不存在
        //根据projectid查找，某个项目的使用记录，
        that.projectidUsageInfoqueryhistory();


      }else{
        let re=JSON.parse(localStorage.getItem("result_projectID_usageInfo_queryHistory"));
        console.log(re)
        console.log(re[0])
        var i=0;
        for(i=0;i<re.length;i++){
          that.tableData.push(re[i])
        }
      }
		},
		methods: {

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.size = val
				this.getRoleList()
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val
				this.getRoleList()
			},
      projectidUsageInfoqueryhistory(){
        this.$axios.get('/blockusageinfo/queryhistory?id='+sessionStorage.getItem("projectID_usageInfo_queryHistory")).then(res =>{
          //console.log('/blockrecordinfo/query?id='+sessionStorage.getItem("userid"));


          //console.log(res.data);
          console.log(res.data.data);
          let result_projectID_usageInfo_queryHistory=res.data.data;
          localStorage.setItem("result_projectID_usageInfo_queryHistory",JSON.stringify(result_projectID_usageInfo_queryHistory))
          let u= JSON.parse(localStorage.getItem("result_projectID_usageInfo_queryHistory"))
          console.log(u)

        }).catch(error => {
          console.log('projectidUsageInfoqueryhistory方法捕获到了异常');

        })
      },
      //自定义查找，输入项目id，查项目的使用记录
      getList(){
        sessionStorage.setItem("projectID_usageInfo_queryHistory",this.searchid);
        let that=this
        this.$axios.get('/blockusageinfo/queryhistory?id='+this.searchid).then(res =>{

          //console.log(res.data.data);
          let result_projectID_usageInfo_queryHistory=res.data.data;
          localStorage.setItem("result_projectID_usageInfo_queryHistory",JSON.stringify(result_projectID_usageInfo_queryHistory))
          let re= JSON.parse(localStorage.getItem("result_projectID_usageInfo_queryHistory"))
          that.tableData=[]
          //console.log(re)
          //console.log(re[0])
          var i=0;
          for(i=0;i<re.length;i++){
            that.tableData.push(re[i])
          }

        }).catch(error => {
          console.log('projectidUsageInfoqueryhistory方法捕获到了异常');

        })

      },
    },

	}
</script>

<style scoped>

	.el-pagination {
		float: right;
		margin-top: 22px;
	}

</style>