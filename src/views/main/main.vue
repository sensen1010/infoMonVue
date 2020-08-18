<template>
  <el-container style="height: 1080px; border: 1px solid #eee">
    <el-menu default-active="1" class="el-menu-vertical-demo info-menu" 
    @open="handleOpen"
     @close="handleClose"
       @select="handleSelect"
        text-color="#ffffff"
       >
     <img   style="width: 100px; height: 100px"/>
      <el-menu-item index="1">
        <i class="el-icon-user"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-user"></i>
        <span slot="title">软件更新</span>
      </el-menu-item>
    </el-menu>
    <el-container>
      <el-main class="info-main">
        <keep-alive>
        <router-view name="mianView">
        </router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
      beforeCreate(){
      },
      data(){
        return{
           
        }
    },
      created(){
      
      },
      methods: {
           handleOpen(key, keyPath) {
             console.log(key, keyPath);
           },
           handleClose(key, keyPath) {
             console.log(key, keyPath);
           },
            handleSelect(key, keyPath){
                console.log(keyPath);
                   switch(key){
                     case '1':
                       this.$router.push('/Main/Enter');
                       break;
                     case '2':
                       this.$router.push('/Main/Update');
                       break;
                   }
           }
           
      }
    };

</script>
<style>
.info-menu{
      background: -moz-linear-gradient(top, #1F313C 0%, #476374 80%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1F313C), color-stop(80%,#476374));
    background: -webkit-linear-gradient(top, #1F313C 0%,#476374 80%);
    background: -o-linear-gradient(top, #1F313C 0%,#476374 80%);
    background: -ms-linear-gradient(top, #1F313C 0%,#476374 80%);
    background: linear-gradient(to bottom, #1F313C 0%,#476374 80%);
    }
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }
 .info-main{
      padding: 0px!important;
    }
    .el-aside {
      color: #333;
    }
</style>
