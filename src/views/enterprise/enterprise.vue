<template>
    <el-container>

  <el-header>
     <el-menu :default-active="enterIndex" 
     class="el-menu-demo el-menu-host" mode="horizontal" @select="handleSelect">
  <el-menu-item  index="0">所有数据</el-menu-item>
  <el-menu-item  class="el-menu-hostInput">
    <div>
      <el-input size="mini" placeholder="企业名称" v-model="selectName" >
    </el-input><el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </div>
    </el-menu-item>  
  </el-menu>
  </el-header>
  <el-main>
<el-table
    ref="multipleTable"
    border
    :data="tableData"
     tooltip-effect="dark"
    style="width: 100%"
   >
    <el-table-column
      prop="enterId"
      label="企业id"
      >
    </el-table-column>
    <el-table-column
      prop="enterName"
      label="企业名"
      >
    </el-table-column>
    <el-table-column
      prop="hostNum"
      label="主机数"
      >
    </el-table-column>
    <el-table-column
      prop="linkNum"
      label="已使用"
      >
    </el-table-column>
    <el-table-column
      prop="enterAuth"
      label="认证码"
      >
    </el-table-column>
     <el-table-column
      prop="innetIp"
      label="内网ip"
      >
    </el-table-column>
     <el-table-column
      prop="ipv4"
      label="ip"
      >
    </el-table-column>
        <el-table-column
      prop="enterDay"
      label="授权天数"
      >
    </el-table-column>
    <el-table-column
      prop="signTime"
      label="注册时间"
      >
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="到期时间"
      >
    </el-table-column>
    <el-table-column
      prop="loginTime"
      label="登录时间"
      >
    </el-table-column>
    <el-table-column
      prop="defaultUser"
      label="默认账号"
      >
    </el-table-column>

    <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <el-button @click="enterAuthClick(scope.row)" type="text" size="small">生成授权码</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next"
      :total="pagetotal">
    </el-pagination>
  </div>
  
  </el-main>
</el-container>
</template>
<script>
export default {
    data() {
      return {
        pageSize:10,
        pagetotal:0,
        enterIndex: "0",
        selectName:'',
        currentPage:1,
        addEnterShowDialog:false,
        updateUserShowDialog:false,
        tableData: [
          
        ]
      }
      
    },
    //页面加载
    // created(){
    //    this.selectEnter();
    //  // this.convert();
    // },
    activated() {
     this.selectEnter();
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
         //获取全选
        console.log(this.$refs.multipleTable.selection[0].name);
        this.multipleSelection = val;
      },
      //企业禁用
      enterClickUpdate(val){

          console.log(val);

      },

      //修改企业
      //查询企业
      selectEnter(){
        const token=localStorage.getItem("token");
        this.$axios.defaults.headers.common["token"] = token;
        this.$axios.get(this.GLOBAL.serverSrc+'/enter/list',{ params:{
          enterName: this.selectName,
          enterState:"",
          page:this.currentPage-1
        }}).then(res=> {
              console.log(res);//数据先转换格式
              let data = JSON.parse(res.data.data);
              this.pagetotal=parseInt(data[0].size);//设置总数据大小
              this.tableData=JSON.parse(data[0].data);//表数据
           }).catch(function (error) {
             console.log(error);
           });
      },
      handleCurrentChange(val) {
        console.log(val);
        this.selectEnter();
      },
      //页头
      handleSelect(key, keyPath) {
        console.log(key+""+keyPath);
        if(key!=null){
         this.currentPage=1;
         this.enterIndex=key;
         this.selectEnter();
        }      
      },
      onSubmit(){ 
         this.selectEnter();
      }
    }
}
</script>
<style>
.block{
  margin-top: 10px;
}
.el-header{
 background-color:white;
 text-align: center;
}

.el-form div{
  line-height: 60px;
}
.el-form button{
  margin-top: 15px;
}
</style>