<template>
  <div class="vipinfor">
    <van-nav-bar title="会员信息" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <van-field v-model="username"   placeholder="填写 >"  input-align="right" label="真实姓名" />
    <van-field v-model="usertel"  placeholder="填写 >" input-align="right"  label="电话" />
    <van-field v-model="birthday"   placeholder="填写 >"  input-align="right" label="生日" />
    <div class="button">
      立即完善
    </div>

  </div>
</template>
<script>
  import { Field } from 'vant';
  export default {
    data() {
      return {
        info: [],
        username: '',
        usertel:'',
        birthday:''
      };
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
    },
    mounted() {
    }
  };
</script>
<style lang="less" scoped>
  .vipinfor {

    width: 100%;
    height: 100%;
    background: #f0f0f0;
    img{
      width: 100%;
    }
    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }
    .img-box{
      width: 80px;
      height: 80px;
      background: #ccc;
      border-radius: 50%;
    }
    .margin-style{
      margin-top: 12px;
    }
    .button{
      font-size:36px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      width:702px;
      height:86px;
      line-height: 86px;
      text-align: center;
      background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
      border-radius:18px;
      margin-top: 190px;
      margin-left: 24px;;
    }
  }
</style>
