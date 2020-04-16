<template>
  <div class="voucher">
    <van-nav-bar title="充值" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <div class="price-box">
      <p class="tips">余额 <span class="user-price">68.8</span></p>
    </div>
    <div class="payment">
      <div class="tit">
        充值方式
      </div>

      <van-radio-group v-model="radio">


<!--            <img src="../assets/zhifubao@2x.png" alt="">-->

            <template >
              <div class="weixin">
                <div class="icon"></div>
                <div class="text">微信支付</div>
                <van-radio name="1" />
              </div>
              <div class="xian"></div>

              <div class="zhifubao">
                <div class="icon"></div>
                <div class="text">支付宝支付</div>
                <van-radio name="2" />

              </div>

            </template>


      </van-radio-group>
    </div>
    <div class="choose-box">
      <div class="tit">
        充值金额
      </div>
      <ul >

        <li class="box-line item" @click="select(40,0)">
          <p>￥40</p>
          <span>4会员积分</span>
        </li>
        <li class="item" @click="select(100,1)">
          <p>￥100</p>
          <span>10会员积分</span>
        </li>
        <li  class="item"  @click="select(200,2)">
          <p>￥200</p>
          <span>20会员积分</span>
        </li>
        <li   class="item" @click="select(400,3)">
          <p>￥400</p>
          <span>40会员积分</span>
        </li>
        <li  class="item"  @click="select(600,4)">
          <p>￥600</p>
          <span>60会员积分</span>
        </li>
        <li  class="item"  @click="select(1000,5)">
          <p>￥1000</p>
          <span>100会员积分</span>
        </li>
      </ul>

    </div>
    <div class="msg">
      充值代表同意 <span style="color: red">《充值服务协议》</span>
    </div>
    <div class="submit" @click="pay">
      <p>
        合计:
        <span>￥{{totalprices}}</span>
      </p>
      <div class="btn-s">确认支付</div>
    </div>
    <div  v-html="alipayWap" ref="alipayWap"  style="background:none"></div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      alipayWap:"",
      radio:'1',
      totalprices:4
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    pay(){
      // api/reserve/recharage?money=0.01&integral=100

      this.Api.get('/api/reserve/recharage',{
        money:0.01
      })
        .then(res =>{
          console.log(res);
          this.payAlipay(res)
        })
        .catch(err =>{
          console.log(err)
        });
    },
    payAlipay(res){
      let url = res.data
      this.alipayWap = url;
      this.$nextTick(() => {
        this.$refs.alipayWap.children[0].submit()
      })
      console.log('url',url);
    },
    select(data,index){
      this.totalprices=data
      //清除全部li
      let arr=document.getElementsByClassName('item')
      console.log(arr);
      for (var i=0;i<arr.length;i++){
        arr[i].classList.remove('box-line')

      }
      arr[index].classList.add('box-line')
    }
  }
};
</script>
<style lang="less" scoped>
.voucher {
  width: 100%;
  height: 100%;
  background:#F7F7F7;
  .icon-img {
    width: 17px;
    height: 29px;
    margin-right: 24px;
  }
  .price-box {
    width: 100%;
    height: 140px;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    .tips {
      font-size:30px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .user-price{
      font-size:60px;
      font-family:PingFang SC;
      font-weight:800;
      color:rgba(51,51,51,1);
    }
  }
  .payment{
    margin-top: 12px;
    width: 100%;
    height: 275px;
    background-color: white;
   .tit{
     font-size:36px;
     font-family:PingFang SC;
     font-weight:bold;
     color:rgba(51,51,51,1);
     padding-left: 31px;
     padding-top: 36px;

   }
    /deep/ .van-hairline--top-bottom::after{
      border: none;
    }
    .weixin{
      overflow: hidden;
     .icon{
       height: 40px;
       width: 40px;
       background: url("../assets/weixin@2x.png") center center;
       background-size: cover;
       float: left;
       margin-left: 58px;
       margin-top: 30px;
     }
      .text{
        float: left;
        font-size:30px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(17,17,17,1);
        margin-left: 19px;
        margin-top: 30px;
      }
      /deep/ .van-radio{
         float: right;
         margin-right: 30px;
        margin-top: 14px;

      }

    }
    .xian{
      width:652px;
      height:2px;
      background:rgba(238,238,238,1);
      margin-left: 50px;
      margin-top: 30px;
    }
    .zhifubao{
      overflow: hidden;
      .icon{
        height: 40px;
        width: 40px;
        background: url("../assets/zhifubao@2x.png") center center;
        background-size: cover;
        float: left;
        margin-left: 58px;
        margin-top: 30px;
      }
      .text{
        float: left;
        font-size:30px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(17,17,17,1);
        margin-left: 19px;
        margin-top: 30px;
      }
      /deep/ .van-radio{
        float: right;
        margin-right: 30px;
        margin-top: 14px;

      }

    }
  }
  .choose-box {
    width: 100%;
    height: 452px;
    margin-top: 12px;
    // background: blue;

   background-color: white;
    .tit{
      font-size:36px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
      padding-top: 40px;
      margin-left: 30px;
         }
    ul{
      width: 100%;
      height: 378px;
      display: flex;
      flex-wrap: wrap;
      justify-content:space-around;
      align-content:space-around;
    }
    li {
      width: 218px;
      height: 138px;
      background: rgba(245, 245, 245, 1);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(17, 17, 17, 1);
      }
      span {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-top: 11px;
      }
    }
  }
  .msg{
    font-size:24px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(102,102,102,1);
    margin-left: 214px;
     position: fixed;
    bottom: 130px;
  }
  .submit {
    width: 750px;
    height: 112px;
    background: white;
    position: fixed;
    bottom: 0;
    z-index: 9999;
    box-sizing: border-box;
    padding: 0 24px;
    line-height: 112px;
    p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      float: left;
      span {
        font-size: 50px;
        font-family: PingFang SC;
        font-weight: 800;
        color: rgba(251, 127, 56, 1);
      }
    }
    .btn-s{
        width: 301px;
        height: 80px;
        float: right;
        background: #FF9B43;
        color: #fff;
        border-radius: 40px;
        line-height: 80px;
        text-align: center;
        margin-top: 16px;
    }
  }
}
.box-line {
  border: 3px solid #ff9b43;
}
</style>
