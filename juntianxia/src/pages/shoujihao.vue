<template>
  <div class="setting">
    <van-nav-bar title="换绑手机号" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>
    <div class="content">

      <van-field v-model="phonenumber" type="tel" label="手机号"  placeholder="请输入新的手机号" />
      <van-field v-model="mimanumber" type="tel" label="验证码"  placeholder="请输入验证码" />
       <div class="yanzhenma">验证码</div>
      <div class="btn-login" @click="huanbang">立即换绑</div>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        mimanumber:'',
        phonenumber:"",

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
    .content{

      .icon-img {
        width: 17px;
        height: 29px;
        margin-right: 24px;
      }
      .img-box{
        width: 80px;
        height: 80px;
        background: red;
        border-radius: 50%;
      }
      .margin-style{
        margin-top: 12px;
      }
      >p{
        font-size: 1.2rem;
        margin: 12% 0 16% 0;
      }

      .btn-login{
        padding: 0.6rem 0;
        border-radius: 50px;
        background: orange;
        color: #fff;
        text-align: center;
        margin-top: 15%;
        width:670px;
        margin-left: 40px;
      }
      .text{
        font-size: 12px;
        color: #bbb;
        text-align: center;
        margin-top: 2%;
      }
      .yanzhenma{
        width:150px;
        height:50px;
        background:rgba(255,152,5,1);
        opacity:0.8;
        border-radius:25px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:42px;
        text-align: center;
        position: absolute;
        top: 180px;
        right: 30px;
        z-index: 9999;
      }
    }

  }
</style>
