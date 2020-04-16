<template>
  <div class="setting">
    <van-nav-bar title="修改密码" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>

      <van-field v-model="number1" placeholder="输入旧密码" />

    <van-cell-group>
    <van-field v-model="number2" placeholder="设置新密码" />
  </van-cell-group> <van-cell-group>
    <van-field v-model="number3" placeholder="确认新密码" />
  </van-cell-group>
   <p class="shomin">
     密码至少要8位，且包含数字和字母
   </p>
    <div class="button">
      保存
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        number1:'',
        number2:'',
        number3:''

      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      }
    }
  };
</script>
<style lang="less" scoped>
  .setting {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }
    .shomin{
      font-size:24px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:42px;
      padding-top: 30px;
      padding-left: 30px;
    }
    .button{
      width:670px;
      height:80px;
      background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
      border-radius:40px;
      margin-top: 40px;
      margin-left: 30px;
      line-height: 80px;
      font-size:30px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      text-align: center;
    }

  }
</style>
