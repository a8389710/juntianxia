<template>
  <div class="order-info">
    <div class="succ-box">
      <van-nav-bar title="订单详情" left-arrow :border="false">
        <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="goback" />
      </van-nav-bar>
    </div>

    <div class="info">
      <div class="top">
        <p class="title">{{orderTit}}</p>
        <p class="text">感谢您对筠天下的信任，期待下次光临</p>
        <van-button
          v-if="orderInfo.status == '0' || orderInfo.status == '1' "
          type="default"
          @click="goBackOrder(orderInfo)"
          class="btn-style"
        >申请退单</van-button>
        <van-button
          v-if="orderInfo.status == '0' || orderInfo.status == '1' "
          type="default"
          plain
          color="#FF9B43"
          @click="gofukuan()"
          class="btn-style"
        >立即付款</van-button>
        <van-button v-if="orderInfo.status == '4'" type="default" class="btn-style">再来一单</van-button>
        <van-button
          v-if="orderInfo.status == '3'"
          type="default"
          class="btn-style"
          @click="toRate(orderInfo.id)"
        >评价</van-button>
      </div>

      <!-- 订单详情 -->
      <div class="middle">
        <!-- 包间信息清单 -->
        <div class="reserve-info">
          <p class="name">筠天下-{{roomName}}</p>
          <p class="info">
            <span class="info-name">时间人数</span>
            <span>{{orderInfo.reserve_time}} {{orderInfo.reserve_time_point}}，{{orderInfo.reserve_num}}人</span>
          </p>
          <p class="info">
            <span class="info-name">位置要求</span>
            <span>{{roomName}}</span>
          </p>
          <p class="info">
            <span class="info-name">联系方式</span>
            <span>{{orderInfo.name}} {{orderInfo.phone}}</span>
          </p>
        </div>
        <!-- 点菜清单 -->
        <p class="title">点菜清单</p>
        <!-- 应该是pot_name -->
        <ul class="goods-list">
          <li class="pot-wrap">
            <span class="name">
              {{orderInfo.pot.pot.pot_title}}
              <van-tag style="display:inline-block" class="pot-tag" type="danger">锅底</van-tag>
            </span>
            <span class="num">x{{orderInfo.pot.pot.pot_num}}</span>
            <span class="price">¥{{orderInfo.pot.pot.pot_price}}</span>
          </li>
          <li v-for="item in foodList" :key="item.id">
            <span class="name">{{item.remarks}}</span>
            <span class="num">x{{item.goods_num}}</span>
            <span class="price">¥{{item.goods_price}}</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p class="title">费用</p>
        <ul class="price">
          <li class="left">合计</li>
          <li class="right">￥{{orderInfo.total_money}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      list: ["fdsaf", "fdsafdsa,fdsafdsa"],
      result: [],
      value1: "",
      value2: "",
      active: 0,
      orderInfo: {
        pot: {
          pot: ""
        }
      },
      foodList: [],
      roomName: '',
      oid: "",
      pri_name: "",
      orderTit: "", // 详情页分类标题
      timer: ""
    };
  },
  methods: {
    // 申请退款
    goBackOrder(item) {
      Dialog.confirm({
        title: "提示",
        message: "确定退单吗?"
      })
        .then(() => {
          // on confirm
          let req = {
            id: item.id
          };
          this.Api.post("api/reserve/reserve_back", req).then(res => {
            if (res.code == "0") {
              Toast.success("退单成功");
              this.$router.push({
                path: "/home"
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 立即付款
    gofukuan() {
      this.$router.push({
        path:'/pay',
        query:{
          orderId:this.orderId,
        }
      })
      return

      let _this = this
      this.Api.get("/api/pay/alipay_trade", {
        reserve_id: this.orderId,
        coupon_id: 0,
        is_integral: 0
      })
        .then(res => {
          this.timer = setInterval(() => {
            this.isMyPayOk();
          }, 3000);

          var airurl = res.data;
          var PAYSERVER = "";
          var id = "alipay"; // 支付方法
          if (id == "alipay") {
            PAYSERVER = airurl;
            // } else if (id == "wxpay") {
            //   PAYSERVER = WXPAYSERVER;
          } else {
            plus.nativeUI.alert("不支持此支付通道！", null, "捐赠");
            return;
          }
          let channel = this.channel;
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

    // 判断订单是否支付成功
    isMyPayOk() {
      let req = {
        id: this.orderId
      };
      this.Api.get("/api/reserve/one", req)
        .then(res => {
          if (res.data.status == 2) {
            this.$router.push({
              path: "/orderInfo",
              query: {
                orderId: res.data.id
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 设置订单详情标题
    setOrderTit(status) {
      // 不传全部订单 0预定中 1待付款 2到店消费 3待评价 4已评价 5退款售后 6退款完成
      let tit = "";
      let type = status;
      console.log(type);
      switch (type) {
        case 0:
          tit = "预定中";
          break;
        case 1:
          tit = "待付款";
          break;
        case 2:
          tit = "到店消费";
          break;
        case 3:
          tit = "待评价";
          break;
        case 4:
          tit = "已评价";
          break;
        case 6:
          tit = "退款完成";
          break;
      }
      this.orderTit = tit;
      console.log(this.orderTit);
    },

    goback() {
      console.log(this.$route.type)
      if (this.$route.query.type == 'pay') {
          this.$router.push({
            path:'/home'
          });
      } else {
          this.$router.push({
            path:'/order'
          });
      }
    },
    toReserveFood() {
      this.$router.push("/reserve/reservefood");
    },
    toRate() {
      localStorage.setItem("commentID", this.orderInfo.id);
      this.$router.push("/rate");
    },
    cancel() {
      Dialog.confirm({
        title: "提示",
        message: "确定要取消包间么？"
      })
        .then(() => {
          let req = {
            id: localStorage.getItem("oid")
          };
          this.Api.get("/api/reserve/del", req)
            .then(res => {
              console.log(res);
              this.$router.push("/roomcancel");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    getOrderInfo() {
      let req = {
        id: this.orderId
      };
      this.Api.get("api/reserve/one", req)
        .then(res => {
          console.log(res);
          this.orderInfo = res.data;
          this.setOrderTit(this.orderInfo.status);
          this.foodList = res.data.goods;
          this.roomName = res.data.room.private_name;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // data(){}
  created() {
    this.orderId = this.$route.query.orderId;
    this.oid = localStorage.getItem("oid");
    console.log(JSON.stringify(this.$route.query))
    this.getOrderInfo();
    let _this = this
      plus.payment.getChannels(function(channels){  
            _this.channel=channels[0];  
            // alert('获取支付通道ok')
        },function(e){  
            alert("获取支付通道失败："+e.message);  
        });  
  },
  // 挂载dom
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
.order-info {
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
  .succ-box {
    background: linear-gradient(to right, #ff9b43, #fb8038);
    padding: 0 4%;
    padding-bottom: 15%;
    .van-nav-bar {
      background: transparent;
      .van-nav-bar__left {
        left: 0;
        .van-icon {
          color: #fff;
          font-size: 1.125rem;
        }
      }
      .van-nav-bar__title {
        color: #fff;
      }
    }
    p {
      color: #fff;
      margin: 0.8rem 0;
    }
    .text-succ {
      font-size: 1rem;
    }
    .text-tip {
      font-size: 0.8rem;
      letter-spacing: 1.5px;
      line-height: 1.5;
    }
    .steps {
      background: transparent;
      .van-step {
        color: #fff;
      }
    }
  }
  .info {
    padding: 0 4%;
    position: relative;
    top: -5%;
    > div {
      padding: 5% 3%;
      border-radius: 14px;
      background: #fff;
    }
    .top {
      .title {
        font-size: 1.125rem;
      }
      .text {
        font-size: 0.75rem;
        color: #bbb;
        line-height: 2.6;
      }
      .van-button {
        width: 100px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        color: #bbb;
      }
    }
    .middle {
      border: 1px dashed #bbb;
      border-left: none;
      border-right: none;
      .goods-list {
        margin-top: 0.6rem;
        li {
          line-height: 2;
          font-size: 0.875rem;
          color: #666;
          span {
            display: inline-block;
          }
          .name {
            width: 60%;
          }
          .num {
            color: #bbb;
          }
          .price {
            width: 30%;
            text-align: right;
          }
        }
        .pot-wrap {
          position: relative;
        }
      }

      //包间 预定详情
    .reserve-info {
      background: #fff;
      position: relative;
      border-bottom: 0.03125rem dashed #bbb;
      margin-bottom: 30px;
      .name {
        font-size: 1rem;
        margin-bottom: 30px;
      }
      .info {
        font-size: 0.8rem;
        margin-bottom: 1rem;
        color: #666;
        line-height: 1em;
        margin-left: -0.7rem;
        .info-name {
          color: #999;
          margin-right: 0.5rem;
        }
      }

      .btns {
        vertical-align: middle;
        overflow: hidden;

        > div {
          text-align: center;
          border-radius: 50px;
        }

        .to-food {
          float: left;
          color: #fff;
          padding: 18px 0;
          font-size: 0.9rem;
          letter-spacing: 2px;
          width: 72%;
          background: linear-gradient(to right, #FF9A43, #FB8038);
        }

        .cancel {
          float: right;
          font-size: 0.75rem;
          color: #bbb;
          border: 1px solid #bbb;
          width: 24%;
          border-radius: 50px;
          padding: 5px 0;
          position: relative;
          top: 0.4rem;
        }
      }
    }

    }
    .bottom {
      ul {
        overflow: hidden;
        margin-top: 0.6rem;
        li {
          float: left;
          font-size: 0.8rem;
          color: #aaa;
        }
        .right {
          float: right;
          color: orange;
          font-size: 1.125rem;
        }
      }
    }
  }
}
</style>
