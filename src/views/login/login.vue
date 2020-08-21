<template>
<div class="loginDiv">
    <div class="loginfrom">
    <el-row>
  <el-col :span="9"><div class="grid-content bg-purple"><p></p></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light">
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="账号">
    <el-input v-model="form.no"></el-input>
  </el-form-item>
   <el-form-item label="密码">
    <el-input v-model="form.pow" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onLogin">登录</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form></div></el-col>
  <el-col :span="9"><div class="grid-content bg-purple"><p></p></div></el-col>
</el-row>
</div>
</div>
</template>
<script>
export default {
    data(){
        return{
            form:{
               no:"asd" ,
               pow:"123456"
            }
        }
    },
    methods:{
        onLogin(){ 
       let formData = new FormData();
      formData.append("no", this.form.no);
      formData.append("pow", this.form.pow);
      let _this=this;
      this.$axios
        .post(this.GLOBAL.serverSrc+"/user/login", formData)
        .then(res => {
          console.log(res);
          // console.log(JSON.parse(res.data));//数据先转换格式
          if (res.data.code == "0") {
           // alert(res.data.msg);
            //const redata=JSON.parse(res.data.data);
            localStorage.setItem("token",res.data.token);
            setTimeout(() => {
               _this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$router.push('/Main/Enter'); 
            }, 1000);
          } else {
             _this.$message({
              message: '账号密码错误',
              type: 'warning'
            });
            localStorage.setItem("token","");  
          }
        })
        .catch(function(error) {
           _this.$message({
              message: '服务器异常',
              type: 'warning'
            });
           console.log(error);
        });
        }
    }
}
</script>
<style>
.loginDiv{
    height: 1080px;
    background: -moz-linear-gradient(top, #1F313C 0%, #476374 80%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1F313C), color-stop(80%,#476374));
    background: -webkit-linear-gradient(top, #1F313C 0%,#476374 80%);
    background: -o-linear-gradient(top, #1F313C 0%,#476374 80%);
    background: -ms-linear-gradient(top, #1F313C 0%,#476374 80%);
    background: linear-gradient(to bottom, #1F313C 0%,#476374 80%);
}
.loginDiv{
   
    height: 1080px;
}
.loginDiv .loginfrom{
    padding-top: 10%;
}
.loginDiv .loginfrom label{
    color: #ffffff;
}
</style>
