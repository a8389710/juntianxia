<template>
  <div class="yuyuechengong">
    <van-nav-bar title="" :border="false" left-text="返回">
      <van-icon name="arrow-left" slot="left" color="#fff" @click="back"/>
    </van-nav-bar>
    <div class="chengon">
      <div class="title">包间预约成功！</div>
      <div class="txt">请务必准时到店就餐，逾时1小时预约将自动取消，包间不保留。</div>
      <div class="icon">
        <span class="paster1">预约成功</span>
        <span class="paster2">到店就餐</span>
        <span class="paster3">订单完成</span>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content-box">
      <div class="title">筠天下-霁影轩</div>
      <div class="wire"></div>
      <div class="txt1">
        <div class="l">时间人数</div>
        <div class="r">今天 12/20  17:00，2人</div>
      </div>
      <div class="txt2">
        <div class="l">位置要求</div>
        <div class="r">霁影轩</div>
      </div>
      <div class="txt3">
        <div class="l">联系方式</div>
        <div class="r">张先生  19966288362</div>
      </div>
      <div class="button">
        <div class="l" @click="tocaipin">约定菜品 ></div>
        <div class="r" @click="quexiao">取消订单</div>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      // 前往菜品
      tocaipin(){
        this.$router.push('/reserve/reservefood');

      },
      //取消预定
      quexiao(){
        this.$router.push('/yuyuequxiao');

      }
    },
    mounted() {

    }

  };
</script>
<style lang="less" scoped>
  .yuyuechengong {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f0f0f0;

    .van-nav-bar {
      background: linear-gradient(90deg, rgba(255, 155, 67, 1), rgba(251, 127, 56, 1));
    }
  ;

    .chengon {
      width: 100%;
      height: 400px;
      background: url("../assets/yuyuebeijing@2x.png") center center;
      background-size: cover;

      .title {
        padding-top: 35px;
        padding-left: 30px;
        height: 35px;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);

      }

      .txt {
        width: 640px;
        height: 63px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 36px;
        padding-left: 31px;
        padding-top: 20px;
      }

      .icon {
        width: 584px;
        height: 32px;
        background: url("../assets/liuchent@2x.png") center center;
        background-size: cover;
        margin-top: 45px;
        margin-left: 79px;
        position: relative;

        .paster1 {

          height: 21px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          top: 44px;
          left: -27px;
        }

        .paster2 {

          height: 21px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          top: 44px;
          left: 252px;
        }

        .paster3 {
          width: 100px;
          height: 21px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          top: 44px;
          left: 533px;
        }
      }
    }

    .content-box {
      width: 690px;
      height: 439px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 24px;
      margin-top: -94px;
      margin-left: 30px;
      .title{

        height:35px;
        font-size:36px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        padding-top: 47px;
        padding-left: 24px;
        padding-bottom: 17px;
      }
      .wire{
        width:671px;
        height:2px;
        background:#F0F0F0;
        /*margin-top: 17px;*/
        margin-left: 10px;
        margin-bottom: 30px;

      }
      .txt1,.txt2,.txt3{
        overflow: hidden;
        padding-bottom: 47px;

        .l{
          float: left;
          padding-left: 26px;
          height:23px;
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        .r{
          float: left;
          padding-left: 161px;

          height:23px;
          font-size:24px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(17,17,17,1);
        }
      }
      .button{
        .l{
          float: left;
          width:467px;
          height:84px;
          background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
          border-radius:41px;
          font-size:40px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(254,254,254,1);
          box-sizing: border-box;
          padding-left: 142px;
          padding-top: 24px;
          margin-left: 24px;
        }
        .r{
          float: left;
          width:151px;
          height:59px;
          border:1px solid rgba(102,102,102,1);
          border-radius:30px;
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(102,102,102,1);
          margin-left: 24px;
          margin-top: 12.5px;
          box-sizing: border-box;
          padding-left: 29px;
          padding-top: 20px;
        }
      }
    }

  }
</style>
