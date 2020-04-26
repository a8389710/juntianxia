<template>
  <div class="mine">
    <van-nav-bar style=" background-image: linear-gradient(to right, #ff9942 , #fb8139);" title="个人信息" :border="false">
      <img src="../assets/img/xitongshezhi.png" alt slot="right" class="icon-img" @click="toSetting"/>
      <img src="../assets/img/xiaoxi.png" alt slot="right" class="icon-img" style="margin:0" @click="toInfo"/>
    </van-nav-bar>
    <div class="userinfobox" @click="goLogin">
      <div class="advatar">
        <img  v-if="GoState !== null" :src="'http://47.108.70.59:80'+myData.head_url" alt/> 
        <img v-if="GoState == null" src="../assets/touxiangw.png" alt="">
      </div>
      <p class="username">{{myData.nickname}}</p>
      <div class="usernames" v-if="GoState == null">
        <P>点击登录</P>
        <p class="remarks">登录更精彩</p>
      </div>
      <div class="vip-icon">
        <img src="../assets/img/huiyuan.png">
      </div>
      <div class="vip-status" @click="tovipinfor()">会员用户</div>
    </div>
    <!-- <van-cell title="余额" :value="myData.money" size="large" class="margin-style">
      <img src="../assets/img/yue.png" alt="" class="mine-icon-style" slot="icon">
      <p slot="right-icon" class="tips-style" @click="toVoucher">充值</p>
    </van-cell> -->
    <!-- <van-cell title="积分" :value="myData.integral" size="large">
      <img src="../assets/img/jifen.png" alt="" class="mine-icon-style" slot="icon">
    </van-cell> -->
    <!-- <van-cell title="卡券" :value="myData.coupon" size="large">
      <img src="../assets/img/kajuan.png" alt="" class="mine-icon-style" slot="icon">
      <p slot="right-icon" class="tips-style">即将过期</p>
    </van-cell> -->
    <!-- <van-cell title="待评价" size="large" is-link @click=toOrder>
      <img src="../assets/img/pinglun.png" alt="" class="mine-icon-style" slot="icon">
    </van-cell> -->
  </div>
</template>
<script>
  import {getMyIndex} from "../requests/index";
  import {Toast} from 'vant';
  export default {
    data() {
      return {
        myData: {},
        GoState: localStorage.getItem("token"),
      }
    },
    methods: {
      toSetting() {
        if(this.GoState !== null){
          this.$router.push('/setting')
        }else{
          this.$router.push('/login')
        }
      },
      toVipres() {
        if(this.GoState !== null){
          this.$router.push('/vipres')
        }else{
          this.$router.push('/login')
        }
      },
      toVoucher() {
        if(this.GoState !== null){
          this.$router.push('/voucher')
        }else{
          this.$router.push('/login')
        }
        
      },
      toInfo() {
        if(this.GoState !== null){
          this.$router.push('/info')
        }else{
          this.$router.push('/login')
        }
      },
      goLogin(){
        if(this.GoState == null){
          this.$router.push('/login')
        }
      },
      toOrder() {
        if(this.GoState !== null){
          this.$router.push({
          path:'order',
          query:{
            status:3
          }
        })
        }else{
          this.$router.push('/login')
        }
      },
      tovipinfor() {
        if(this.GoState !== null){
          this.$router.push('/vipinfor')
        }else{
          this.$router.push('/login')
        }
      },
      //求我的信息
      myinformation() {
        this.Api.get('/api/user/myIndex')
          .then(res => {
            console.log(res)
            this.myData = res.data;
            // console.log('da', this.myData.newsMsg);
            // if (this.myData.newsMsg!=0){
            //   let img=document.getElementsByClassName('icon-img')[1]
            //   console.log(img);
            // }
          //看看是否有新消息 有就铃铛标红
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.myinformation()
    }
  };
</script>
<style lang="less" scoped>
  .mine {
    width: 100%;
    height: 100%;
    background: #fff;

    .icon-img {
      color: #ffffff;
      width: 33px;
      height: 31px;
      margin-right: 24px;
    }

    .userinfobox {
      width: 750px;
      height: 166px;
      // background: red;
      overflow: hidden;
      box-shadow: 0px 3px 19px 0px rgba(204, 204, 204, 0.8);
      position: relative;
      .advatar {
        width: 136px;
        height: 136px;
        background: #ccc;
        float: left;
        margin-left: 30px;
        margin-top: 12px;
        border-radius: 10px;
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
        }
      }
      .username {
        float: left;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(17, 17, 17, 1);
        margin-top: 61px;
        margin-left: 14px;
      }
      .usernames{
        float: left;
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(17, 17, 17, 1);
        margin-top: 45px;
        margin-left: 14px;
        .remarks{
          font-size: 14px;
          margin-top: 10px;
          color: #7e7e7e;
        }
      }
      .vip-icon {
        width: 34px;
        height: 34px;
        // background: blueviolet;
        float: left;
        margin-left: 18px;
        margin-top: 64px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .vip-status {
        width: 150px;
        height: 44px;
        background: linear-gradient(90deg, rgba(255, 155, 67, 1), rgba(251, 127, 56, 1));;
        color: #fff;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        box-sizing: border-box;
        padding-left: 25px;
        line-height: 44px;
        border-radius: 22px 0 0 22px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right:0;
      }
    }

    .margin-style {
      margin-top: 20px;
    }

    .mine-icon-style {
      width: 38px;
      height: 33px;
      margin-top: 8px;
      margin-right: 23px;
    }

    .tips-style {
      font-size: 22px;
      color: rgba(255, 72, 72, 1);
      margin-left: 13px;
    }
  }
</style>
