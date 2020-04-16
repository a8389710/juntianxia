<template>
  <div class="yuyuequxiao">
    <van-nav-bar title="" :border="false" left-text="返回">
      <van-icon name="arrow-left" slot="left" color="#fff" @click="back"/>
    </van-nav-bar>

     <div class="beijin"></div>
    <!-- 内容 -->
    <div class="content-box">
      <div class="title-top">预约取消成功！</div>
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
        <div class="l" @click="toshouye">返回首页</div>
        <div class="r" @click="tobaojian">重新预定</div>
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
      //重新选择包间
      tobaojian(){
        this.$router.push('/baojianlist');
      },
      //返回首页
      toshouye(){
        this.$router.push('/home');
      }
    },
    mounted() {


    }

  };
</script>
<style lang="less" scoped>
  .yuyuequxiao {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f0f0f0;

    .van-nav-bar {
      background: linear-gradient(90deg, rgba(255, 155, 67, 1), rgba(251, 127, 56, 1));
    }
    .van-nav-bar .van-icon::before{
    color: black;
    }
    .beijin{
      background: url("../assets/yuyuebeijing@2x.png") center center;
      background-size: cover;
      width: 100%;
      height: 404px;
    }
    .content-box {
      width: 690px;
      height: 505px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 24px;
      margin-top: -404px;
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
      .title-top{
        font-size:36px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(17,17,17,1);
        padding-top: 35px;
        padding-left: 232px;
      }
      .button{
        .l{
          width:114px;
          height:38px;
          border:1px solid rgba(102,102,102,1);
          border-radius:6px;
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(102,102,102,1);
          float: right;
          margin-right: 24px;
          text-align: center;
          line-height: 38px;
        }
        .r{
          width:114px;
          height:38px;
          border:1px solid rgba(102,102,102,1);
          border-radius:6px;
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(102,102,102,1);
          float: right;
          margin-right: 24px;
          text-align: center;
          line-height: 38px;

        }
      }
    }

  }
</style>
