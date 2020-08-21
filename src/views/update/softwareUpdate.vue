<template>
<div class="updateDiv">
  <div class="updatefrom" v-if="!clientShow">
  <!-- <el-row>
  <el-col :span="10"><div class="grid-content bg-purple"><p></p></div></el-col>
  <el-col :span="4">
      <el-button  style="width:100%;height:200px" @click="client()">客户端更新</el-button>
  </el-col>
  <el-col :span="10"><div class="grid-content bg-purple"><p></p></div></el-col>
</el-row> -->
 <el-row>
  <el-col :span="5"><div class="grid-content bg-purple"><p></p></div></el-col>
  <el-col :span="4">
     <el-button  style="width:100%;height:200px"  @click="client('FRONT')">前端更新</el-button>
  </el-col>
  <el-col :span="1">
    <p></p>
  </el-col>
  <el-col :span="4">
      <el-button  style="width:100%;height:200px" @click="client('BACK')">后端更新</el-button>
  </el-col>
   <el-col :span="1">
    <p></p>
  </el-col>
  <el-col :span="4">
      <el-button  style="width:100%;height:200px" @click="client('APK')">安卓更新</el-button>
  </el-col>
  <el-col :span="5"><div class="grid-content bg-purple"><p></p></div></el-col>
</el-row>
</div>
 <el-row v-if="clientShow" class="clientDiv">
  <el-header>{{typeText}}</el-header>
  <el-col :span="14">
    <el-main>
    <el-table
    ref="multipleTable"
    border
    :data="tableData"
    size="mini"
     tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column
      prop="softMd5"
      label="软件Md5"
      >
    </el-table-column>
    <el-table-column
      prop="softName"
      label="软件名称"
      >
    </el-table-column>
    <el-table-column
      prop="softSize"
      label="软件大小"
      >
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间"
      >
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
   
   </el-col>
  <el-col :span="10" class="upFileDiv">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="选择文件">
    <el-upload
      class="upload-demo"
      :action='upFileUrl+"/clientUpdate/file"'
      :on-success="filesuccess"
      multiple
      :data="form"
      ref="upload"
      :limit="1"
      :file-list="fileList"
      :auto-upload="false"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-text="showTypeText"></div>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitUpload">发布更新</el-button>
    <el-button @click="clientShow=false">取消</el-button>
  </el-form-item>
  </el-form>
  </el-col>
</el-row>
</div>

</template>
<script>
export default {
    data(){
        return{
            pageSize:10,
            pagetotal:0,
            currentPage:1,
            showType:"",
            typeText:"",
            showTypeText:"",
            clientShow:false,
            upFileUrl:this.GLOBAL.serverSrc,
            fileList:[],
            tableData:[],
            form: {
               type:'BACK'
            }
        }
    },
    activated() {
     
    },
    methods:{
      client(val){
        if(val=="BACK"){
          this.showTypeText="只能上传war压缩文件";
          this.typeText="后端更新"
        }else if(val=="FRONT"){
          this.showTypeText="只能上传zip压缩文件";
           this.typeText="前端更新"
        }else{
          this.showTypeText="只能上传apk文件";
           this.typeText="安卓更新"
        }
        this.showType=val;
        this.form.type=val;
        this.clientShow=true;
        this.selectUpdate();
      },
       submitUpload() {
         const fileList=this.fileList;
         const modifyContent=this.form.modifyContent;
         console.log(fileList.length);
         if(modifyContent==""){
           return;
         }
        this.$refs.upload.submit();
      },
      filesuccess(response, file, fileList) {
          const code=response.code;
          console.log(response.code);
          console.log(fileList);
          console.log(file);
          this.fileList=[]
          if(code=="1"){
              this.$message.error('上传失败，请检查文件类型');
          }else{
            this.selectUpdate();
          }
          
          
     },
       //查询更新记录
      selectUpdate(){
        this.$axios.get(this.GLOBAL.serverSrc+'/clientUpdate/update',
        {
          params: {
            page: this.currentPage - 1,
            type:this.showType
          },
        }
        ).then(res=> {
              if(res.data.code==0){
              let data = JSON.parse(res.data.data);
              this.pagetotal=data[0].size;//设置总数据大小
              this.tableData=JSON.parse(data[0].data);//表数据
              }       
           }).catch(function (error) {
             console.log(error);
           });
      },
       handleCurrentChange() {
        this.selectUpdate();
      },
    }
}
</script>
<style>
.updateDiv{
    height: 1080px;
    
}
.updateDiv .updatefrom{
    padding-top: 10%;
    text-align: left!important;
}
.updateDiv .updatefrom label{
    color: #ffffff;
}
.clientDiv .el-main{
  padding: 0px 30px!important;
}
.clientDiv .upFileDiv{
  border: 1px solid #EBEEF5;
  line-height: 0px;;
}
.clientDiv .upFileDiv .text{
  height: 600px;
}
.clientDiv .upFileDiv .el-textarea__inner{
  height: 600px;
}
</style>
