<template>
  <div class="system-notice">
    <van-nav-bar title="消息中心" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <van-cell
      title="筠天下-霁影轩"
      value="昨天 07:32"
      label="您好，您的包间已预订成功。"
      size="large"
      label-class="label-style"
      value-class="value-style"
      info='99'
    >
      <div class="info-img" slot="icon"></div>
      <p slot="dot"></p>
    </van-cell>
    <van-cell
      title="筠天下-霁影轩"
      value="昨天 07:32"
      label="您好，您的包间已预订成功。"
      size="large"
      label-class="label-style"
      value-class="value-style"
    >
      <div class="info-img" slot="icon"></div>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="less" scoped>
  .system-notice {
    width: 100%;
    height: 100%;
    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }
    .header-tips {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .info-img {
      width: 79px;
      height: 79px;
      border-radius: 50%;
      background: url(../assets/img/goutong.png);
      background-size: 100% 100%;
      // margin-top: 25px;
      margin-right: 13px;
    }
    .label-style {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      min-width: 350px;
    }
    .value-style {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
</style>
