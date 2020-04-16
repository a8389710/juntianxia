<template>
  <div class="info">
    <van-nav-bar title="系统通知" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
      <p slot="right" class="header-tips">全部已读</p>
    </van-nav-bar>
    <van-cell
      v-for="item in newsList"
      :title="item.news_title"
      :value="item.news_time"
      :label="item.news_content"
      size="large"
      label-class="label-style"
      value-class="value-style"
    >
      <div class="info-img" slot="icon"  ></div>
    </van-cell>

    <!--	  <van-cell title="清除缓存" value=">" />-->

    <div class="piece">
      <div class="l"></div>
      <div class="r">
        <div class="xttz">积分变动消息</div>
        <div class="xiaoxi">恭喜！您的订单支付成功后获得的88积分到账啦！</div>
      </div>
      <div class="rr">
        <div class="time">昨天 07:32</div>
        <div class="red"></div>
      </div>
      <div class="button"></div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        newsList: [],
      }
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      getNewsList(){
        let req = {
          token: localStorage.getItem('token'),
          type: 1,
          page: 1,
          list_rows:99
        };

        this.Api.get('api/user/newsList',req)
          .then(res =>{
            this.newsList = res.data.data;
            console.log('系统通知',this.newsList);
          })
          .catch(err =>{
            console.log(err)
          })

      },
    //  点击清除红点
      haveread(){

      }
    //  点击全部已读清除红点
    },mounted() {
      this.getNewsList();
    }
  };
</script>
<style lang="less" scoped>
  .info {
    width: 100%;
    height: 100%;
    background: #fff;
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
      background: yellowgreen;
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

    .piece{
      overflow: hidden;
      .l{
        width: 80px;
        height: 80px;
        background: url("../assets/tonzhi.png") center center;
        background-size: cover;
        margin-top: 30px;
        margin-left: 30px;
        float: left;
      }
      .r{
        height: 100%;
        float: left;

        .xttz{
          height:28px;
          font-size:30px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          padding-left: 12px;
          padding-top: 40px;
        }
        .xiaoxi{

          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          padding-left: 12px;
          padding-top: 14px;
           width: 472px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .button{
        width:598px;
        height:2px;
        background:rgba(243,243,243,1);
        margin-left: 112px;
        margin-top: 127px;
      }
      .rr{
        float: right;
        .time{
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          margin-top: 45px;
          margin-right: 31px;
        }
        .red{
          width:11px;
          height:11px;
          background:rgba(255,86,27,1);
          border-radius:50%;
          margin-right: 30px;
          margin-top: 20px;
          float: right;
        }
      }
    }
  }
</style>
