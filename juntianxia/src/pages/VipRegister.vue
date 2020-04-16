<template>
  <div class="vipres">
    <van-nav-bar title="会员注册" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <van-field v-model="truename" placeholder="请输入真实姓名" label='真实姓名'/>
    <van-field v-model="phone" placeholder="请输入电话" label='电话' type='number' maxlength='11'/>
    <van-cell title="生日" is-link></van-cell>
     <van-button type="default" class="btn-box">立即完善</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        truename:'',
        phone:''
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.vipres {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  .icon-img {
    width: 17px;
    height: 29px;
    margin-right: 24px;
  }
   .btn-box{
      width: 703px;
      height: 86px;
      background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
      margin-left: 24px;
      margin-top: 676px;
      border-radius: 18px;
  }
}
</style>