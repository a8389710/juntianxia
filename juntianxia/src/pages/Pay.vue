<template>
  <div class="pay">
    <van-nav-bar title="支付订单" :border="false">
      <img
        src="../assets/img/fanhui.png"
        alt
        slot="left"
        class="icon-img"
        @click="back"
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
          <div>
            <img src="../assets/img/active2.jpg" alt="" class="user-img" />
          </div>
          <div class="info">
            <p class="room-name">筠天下{{ private_name }}</p>
            <p class="price">
              ¥<span>{{ yfk }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="">
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
      </div>
      <div class="">
        <div class="balance pay-way">
          <div class="wx-img"></div>
          <div class="info">
            <p class>微信支付</p>
          </div>
          <van-checkbox v-model="wxchecked" disabled></van-checkbox>
        </div>
        <van-divider />
        <div class="balance pay-way">
          <div class="zfb-img"></div>
          <div class="info">
            <p>支付宝支付</p>
          </div>
          <van-checkbox v-model="zfbchecked"></van-checkbox>
        </div>
      </div>
      <div class="">
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
      </div>
      <div class="btn-pay" @click="pay">立即支付</div>
      <div v-html="alipayWap" ref="alipayWap" style="background:none"></div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="show" class="layer-box" :close-on-click-overlay="false">
      <p class="title">支付成功</p>
      <p class="money">￥{{ yfk }}</p>
      <p class="integral">本次支付获得{{ yfk < 0  ? 0 : (yfk / 10) }}积分</p>
      <div class="btns">
        <div class="to-home" @click="toHome">返回首页</div>
        <div class="to-order" @click="toOrder">返回订单</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
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
      orderInfo: [],
      payNum: 0,
      userInfo: [],
      private_name: "",
      yfk: 0,
      time: 24 * 60 * 60 * 1000,
      total_money: 0,
      alipayWap: ""
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
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
    payAlipay(res) {
      let url = res.data;
      this.alipayWap = url;
      this.$nextTick(() => {
        this.$refs.alipayWap.children[0].submit();
      });
      console.log("url", url);
    },
    pay() {
      //微信支付暂时没办法解决

      this.Api.get("/api/pay/alipay_trade", {
        reserve_id: localStorage.getItem("reserve_id")
      })
        .then(res => {
          console.log(res);
          this.payAlipay(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    getOrderInfo() {
      let req = {
        id: localStorage.getItem("reserve_id")
      };
      this.Api.get("api/reserve/one", req)
        .then(res => {
          // console.log('11234',res);
          this.orderInfo = res.data;
          // console.log(this.orderInfo);
          this.private_name = res.data.room.private_name;
        })
        .catch(err => {
          // console.log(err)
        });
    }
    //一进入页面查看是否支付成功
  },
  mounted() {
    this.getOrderInfo();
    this.getUserInfo();
    this.reserve_id = localStorage.getItem("reserve_id");
    this.yfk = localStorage.getItem("total_money");
    // this.yfk = 0.1
    // this.total_money = localStorage.getItem('frontMoney');
  }
};
</script>
<style lang="less" scoped>
/deep/.van-count-down {
  color: orange !important;
  font-size: 1.2rem;
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
    padding: 0.7rem;
    .leave-time {
      margin-bottom: 4%;
    }
    .btn-pay {
      border-radius: 50px;
      background: orange;
      color: #fff;
      margin-top: 15%;
      text-align: center;
    }
    > div {
      border-radius: 20px;
      background: #fff;
      padding: 0.9rem;
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
          margin-left: 5%;

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
        line-height: 2;
      }
      .order-info .info {
        .price {
          float: left;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          padding-top: 26px;
          span {
            font-size: 36px;
          }
        }
        .room-name {
          float: left;
          padding-top: 31px;
          font-size: 24px;
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
