<template>
  <div class="pay">
    <van-nav-bar title="支付订单" :border="false">
      <img
        src="../assets/img/fanhui.png"
        alt
        slot="left"
        class="icon-img"
        @click="goback"
      />
    </van-nav-bar>
    <div class="content">
      <div class="leave-time">
        <p class="text">支付剩余时间</p>
        <!-- <p class="pay-time"><span>23:59</span></p> -->
        <p>
          <van-count-down class="time" :time="time" />
        </p>
        <van-divider />
        <div class="order-info">
          <!-- <div>
            <img src="../assets/img/active2.jpg" alt="" class="user-img" />
          </div> -->
          <div class="info">
            <p class="room-name">筠天下-{{ orderInfo.room.private_name }}</p>
            <p class="price">
              ¥<span>{{ orderInfo.total_money }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="">
        <div class="goods-wrap">
          <div class="good-show">
            <van-image
              width="20vw"
              height="15vw"
              fit="cover"
              :src="orderInfo.pot.pot.pot_url"
            />
            <p class="name">
              {{ orderInfo.pot.pot.pot_title }}

              <van-tag class="pot-tag" type="danger">锅底</van-tag>
            </p>
            <p class="num">
              {{ orderInfo.pot.pot.pot_price }} * {{ orderInfo.pot.pot.pot_num }}
            </p>
            <p class="price">
              {{ orderInfo.pot.pot.pot_price * orderInfo.pot.pot.pot_num }} 元
            </p>
          </div>
          <div v-for="(good, idx) in orderInfo.goods" :key="idx">
            <div class="good-show">
              <van-image
                width="20vw"
                height="15vw"
                fit="cover"
                :src="good.goods_url"
              />
              <p class="name">{{ good.goods_name }}</p>
              <p class="num">{{ good.goods_price }} * {{ good.goods_num }}</p>
              <p class="price">{{ good.goods_price * good.goods_num }} 元</p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="">
        <div class="balance">
          <div class="ye-img"></div>
          <div class="info">
            <p class="balance-num">余额(剩余{{ userInfo.money }})</p>
            <p class="tips">
              <span>余额不足</span>
              <span class="to-voucher" @click="toVoucher">立即充值</span>
            </p>
          </div>
          <van-checkbox v-model="balenceCheck" disabled></van-checkbox>
        </div>
      </div> -->
      <div class="">
        <!-- <div class="balance pay-way">
          <div class="wx-img"></div>
          <div class="info">
            <p class>微信支付</p>
          </div>
          <van-checkbox v-model="wxchecked" disabled></van-checkbox>
        </div> -->
        <!-- <van-divider /> -->
        <div class="balance pay-way">
          <div class="zfb-img"></div>
          <div class="info pay-way">
            <p>支付宝支付</p>
          </div>
          <van-checkbox disabled v-model="zfbchecked"></van-checkbox>
        </div>
      </div>
      <!-- <div class="">
        <div class="balance">
          <div class="jf-img"></div>
          <div class="info">
            <p class="balance-num">积分(剩余{{ userInfo.integral }}分)</p>
            <p class="tips">
              <span
                >可用于抵扣{{
                  userInfo.integral / 10 > 0 ? userInfo.integral : 0
                }}元</span
              >
            </p>
          </div>
          <van-checkbox v-model="integralCheck" disabled></van-checkbox>
        </div>
      </div> -->
      <div class="btn-pay" @click="pay">立即支付</div>
      <div v-html="alipayWap" ref="alipayWap" style="display:none"></div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="show" class="layer-box" :close-on-click-overlay="false">
      <p class="title">支付成功</p>
      <p class="money">￥{{ yfk }}</p>
      <p class="integral">本次支付获得{{ yfk < 0 ? 0 : yfk / 10 }}积分</p>
      <div class="btns">
        <div class="to-home" @click="toHome">返回首页</div>
        <div class="to-order" @click="toOrder">返回订单</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
    // 获取支付通道

export default {
  data() {
    return {
      list: ["fdsaf", "fdsafdsa,fdsafdsa"],
      result: [],
      balenceCheck: false,
      integralCheck: false,
      show: false,
      wxchecked: false,
      zfbchecked: true,
      reserve_id: "",
      sum: 0,
      orderInfo: {
        pot:{
          pot:{}
        }
      },
      payNum: 0,
      userInfo: [],
      private_name: "",
      yfk: 0,
      time: 60, // 倒计时
      total_money: 0,
      alipayWap: "",
      channel:'',
      timer:'',// 定时器,
      orderId:'',// 订单id
    };
  },

  created() {
    this.orderId = this.$route.query.orderId
    console.log(this.orderId)
    let _this = this
      plus.payment.getChannels(function(channels){  
            _this.channel=channels[0];  
            // alert('获取支付通道ok')
        },function(e){  
            alert("获取支付通道失败："+e.message);  
        });  
  },
  mounted() {
    this.getOrderInfo();
    this.getUserInfo();
    this.reserve_id = this.orderId;
    this.yfk = this.$route.query.totalPrice;
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
  methods: {
    // 立即支付
    pay() {
      //微信支付暂时没办法解决
      let _this = this
      this.Api.get("/api/pay/alipay_trade", {
        reserve_id: _this.orderId,
        coupon_id:0,
        is_integral:0
      })
        .then(res => {
          // 三秒拉取一次订单
          this.timer = setInterval(()=>{
            this.isMyPayOk()
          },3000)
          var airurl = res.data;
          console.log(airurl)
          var PAYSERVER='';  
          var id  = 'alipay' // 支付方法
          if (id == "alipay") {
              PAYSERVER = airurl;
              // } else if (id == "wxpay") {
              //   PAYSERVER = WXPAYSERVER;
            } else {
            
              plus.nativeUI.alert("不支持此支付通道！", null, "捐赠");
              return;
            }
            let channel = this.channel
              // 手机调用请求
              plus.payment.request(
                channel,
                PAYSERVER,
                function(result) {
                  plus.nativeUI.alert("支付成功！", function() {
                    back();
                  });
                },
                function(error) {
                  _this.Api.post('/api/reserve/new_bill_num',{id:_this.orderId}).then(res=>{
                    console.log('取消支付',res)
                  })

                  plus.nativeUI.alert("支付失败!");
                }
              );
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 2. 发起支付请求


    // 倒计时时间获取处理
    setDownTime() {
      let time = this.orderInfo.create_time;
      let timeSeconds = new Date(time).getTime(); // 下单时间
      let nowTime = new Date().getTime(); // 当前时间
      let endTime = timeSeconds + 3600 * 24 * 1000;
      this.time = Number(endTime) - Number(nowTime);
      console.log(time,'时间')
    },

    goback() {
      Dialog.confirm({
        title:'提示',
        message:'取消支付？'
      }).then(()=>{
      this.$router.push({
        path: "/order",
      });
      }).catch(()=>{})
    },
    toHome() {
      this.$router.push("/home");
    },
    toOrder() {
      this.$router.push("/order");
    },
    toVoucher() {
      this.$router.push("/voucher");
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    getUserInfo() {
      this.Api.get("api/user/myIndex")
        .then(res => {
          // console.log(res);
          this.userInfo = res.data;
        })
        .catch(err => {
          // console.log(err)
        });
    },

    // 判断订单是否支付成功
    isMyPayOk(){
      let req = {
        id: this.orderId
      };
      this.Api.get('api/reserve/one',req)
        .then(res =>{
          if (res.data.status == 2) {
            this.$router.push({
              path:'/orderInfo',
              query:{
                orderId:res.data.id,
                type:'pay'
              }
            })
          }
        })
        .catch(err =>{
          console.log(err)
        })
    },
    // 获取订单信息
    getOrderInfo() {
      let req = {
        id:this.orderId
      };
    // 获取请求看看有没有订单状态变化
      this.Api.get('api/reserve/one',req)
              .then(res =>{
                console.log(res);
                this.orderInfo = res.data;
                this.foodList = res.data.goods;
                this.setDownTime()
              })
              .catch(err =>{
                console.log(err)
              })
    }
    //一进入页面查看是否支付成功

    // 获取
  }
};
</script>
<style lang="less" scoped>
/deep/.van-count-down {
  color: orange !important;
  font-size: 1.2rem;
}

.goods-wrap {
  overflow-y: scroll;
  max-height: 38vh;
  .good-show {
    margin: 10px 0;
    display: flex;
    // justify-content:space-around;
    height: 15vw;
    p {
      line-height: 15vw;
      color: #565656;
      font-size: 4vw;
    }
    .name {
      width: 35%;
      margin-left: 2vw;
      text-align: left;
      position: relative;
      .pot-tag {
        position: absolute;
        right: -2vw;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .num {
      width: 35%;
      text-align: right;
    }
    .price {
      width: 25%;
      text-align: right;
    }
  }
}

.button-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.pay {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  .icon-img {
    width: 17px;
    height: 29px;
    margin-right: 24px;
  }
  .img-box {
    width: 80px;
    height: 80px;
    background: red;
    border-radius: 50%;
  }
  .margin-style {
    margin-top: 12px;
  }
  img {
    width: 100%;
  }
  .content {
    // height: calc(100% - 40px);
    // overflow-y: scroll;
    padding: 0.7rem;
    .leave-time {
      margin-bottom: 4%;
    }
    .btn-pay {
      border-radius: 50px;
      background: orange;
      color: #fff;
      margin: 10% 0 0;
      text-align: center;
    }
    > div {
      border-radius: 20px;
      background: #fff;
      padding: 3vw;
      margin-bottom: 2%;
      > p {
        text-align: center;
      }
      .text {
        padding-bottom: 0.85rem;
        font-size: 0.875rem;
        color: #999;
      }
      .pay-time {
        text-align: center;
        letter-spacing: 1;
      }
      .order-info,
      .balance {
        overflow: hidden;
        line-height: initial;
        color: #4a4a4a;
        font-size: 0.875rem;
        .zfb-img {
          height: 38px;
          width: 38px;
          background: url("../assets/zhifubao@2x.png") center center;
          background-size: cover;
          /*!*border-radius: 200px;*!*/
          /*overflow: auto;*/
          /*background: #eee;*/
          float: left;
        }
        .wx-img {
          width: 40px;
          height: 40px;
          border-radius: 200px;
          overflow: auto;
          background: #eee;
          float: left;
          background: url("../assets/weixin@2x.png") center center;
          background-size: cover;
        }
        .jf-img {
          width: 38px;
          height: 38px;
          background: url("../assets/jifen.png") center center;
          background-size: cover;
          border-radius: 200px;
          overflow: auto;
          float: left;
        }
        .user-img {
          width: 86px;
          height: 86px;
          border-radius: 200px;
          overflow: auto;
          background: #eee;
          float: left;
        }
        .ye-img {
          width: 38px;
          height: 38px;
          border-radius: 200px;
          overflow: auto;
          background: #eee;
          float: left;
          background: url("../assets/yue@2x.png") center center;
          background-size: cover;
        }

        .info {
          float: left;
          span {
            font-size: 1.2rem;
          }
        }
      }
      .balance {
        .user-img {
          width: 60px;
          height: 60px;
        }
        .info {
          margin-left: 3%;
          span {
            font-size: 0.7rem;
            color: #bbb;
          }
          .to-voucher {
            color: firebrick;
          }
        }
      }
      .van-checkbox {
        float: right;
      }
      .pay-way {
        line-height: 1.4;
      }
      .order-info .info {
        position: relative;
        width: 100%;
        .price {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgb(196, 4, 4);
          padding-top: 26px;
          span {
            font-size: 40px;
          }
        }
        .room-name {
          float: left;
          padding-top: 31px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          padding-right: 11px;
        }
      }
    }
  }
  .layer-box {
    width: 60%;
    border-radius: 8px;
    padding: 2rem 1rem 1.5rem 1rem;
    text-align: center;
    .title {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }
    .money {
      font-size: 1.2rem;
      margin-bottom: 0.2rem;
    }
    .integral {
      font-size: 0.7rem;
      color: #fb7f39;
      margin-bottom: 1rem;
    }
    .btns {
      overflow: hidden;
      > div {
        color: #bbb;
        float: left;
        width: 47%;
        padding: 10px 0;
        border: 1px solid #fb7f39;
        border-radius: 40px;
        font-size: 0.8rem;
      }
      .to-order {
        float: right;
      }
    }
  }
}
</style>
