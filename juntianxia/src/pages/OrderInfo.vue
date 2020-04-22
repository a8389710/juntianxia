<template>
  <div class="order-info">
    <div class="succ-box">
      <van-nav-bar 
      title="订单详情" 
      left-arrow
      :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
      </van-nav-bar>
    </div>

    <div class="info">
      <div class="top">
        <p class="title">{{orderTit}}</p>
        <p class="text">感谢您对筠天下的信任，期待下次光临</p>
            <van-button 
              v-if="orderInfo.status == '0'"
              type="default" @click="goBackOrder(orderInfo)" class="btn-style">申请退单
            </van-button>
            <van-button 
              v-if="orderInfo.status == '0'"
              type="default" plain color="#FF9B43" @click="gofukuan()" class="btn-style">立即付款
            </van-button>
            <van-button 
              v-if="orderInfo.status == '4'"
              type="default" class="btn-style">再来一单
            </van-button>
            <van-button
              v-if="orderInfo.status == '3'"
              type="default"
              class="btn-style"
              @click="toRate(orderInfo.id)"
              >评价
            </van-button>
      </div>
      <div class="middle">
        <p class="title">点菜清单</p>
          <!-- 应该是pot_name -->
        <ul class="goods-list">
          <li>
            <span class="name">{{orderInfo.pot.pot.pot_title}}</span> 
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
  import { Dialog,Toast } from 'vant';
export default {
  data() {
    return {
      list: ['fdsaf','fdsafdsa,fdsafdsa'],
      result:[],
      value1:'',
      value2:'',
      active: 0,
      orderInfo:[],
      foodList:[],
      oid: '',
      pri_name:'',
      orderTit:'', // 详情页分类标题
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
                path:'/home'
              })
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 立即付款
    gofukuan(){
      this.Api.get("/api/pay/alipay_trade", {
        reserve_id: localStorage.getItem("reserve_id")
      })
        .then(res => {
          setInterval(()=>{
            this.isMyPayOk()
          },3000)

          var airurl = res;
          var PAYSERVER='';  
          var id  = 'alipay' // 支付方法
          if (id == "alipay") {
              PAYSERVER = res;
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
                    console.log(result,'支付成功')
                  });
                },
                function(error) {
                  plus.nativeUI.alert("支付失败：" + error.code);
                }
              );
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 判断订单是否支付成功
    isMyPayOk(){
      let req = {
        id: localStorage.getItem("reserve_id")
      };
      this.Api.get('api/reserve/one',req).then(res =>{
          if (res.data.status == 2) {
            this.$router.push({
              path:'/orderInfo',
              query:{
                orderId:res.data.id
              }
            })
          }
        })
        .catch(err =>{
          console.log(err)
        })
    },


    // 设置订单详情标题
    setOrderTit(status){
      // 不传全部订单 0预定中 1待付款 2到店消费 3待评价 4已评价 5退款售后 6退款完成
      let tit = ''
      let type = status
      console.log(type)
      switch(type){
        case 0:tit = '预定中';break;
        case 1:tit = '待付款';break;
        case 2:tit = '到店消费';break;
        case 3:tit = '待评价';break;
        case 4:tit = '已评价';break;
        case 6:tit = '退款完成';break;
      }
      this.orderTit = tit
      console.log(this.orderTit)
    },


    back() {
      this.$router.back(-1);
    },
    toReserveFood(){
      this.$router.push('/reserve/reservefood');
    },
    toRate(){
      localStorage.setItem('commentID',this.orderInfo.id);
      this.$router.push('/rate');
    },
    cancel(){
      Dialog.confirm({
        title: '提示',
        message: '确定要取消包间么？'
      }).then(() => {
        let req = {
          id : localStorage.getItem('oid'),
        }
        this.Api.get('api/reserve/del',req)
          .then(res =>{
            console.log(res);
            this.$router.push('/roomcancel')
            })
            .catch(err =>{
              console.log(err)
            })
      }).catch(() => {
        // on cancel
      });
    },
	getOrderInfo(){
		let req = {
			id : this.orderId,
    };
		this.Api.get('api/reserve/one',req).then(res =>{
      console.log(res);
      this.orderInfo = res.data;
      this.setOrderTit(this.orderInfo.status)
      this.foodList = res.data.goods;
    })
    .catch(err =>{
      console.log(err)
    })
	}
  },
  created() {
    this.orderId = this.$route.query.orderId
  },
  mounted() {
    this.oid = localStorage.getItem('oid');
    this.getOrderInfo();
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
    .img-box{
        width: 80px;
        height: 80px;
        background: red;
        border-radius: 50%;
    }
    .margin-style{
        margin-top: 12px;
    }
    .succ-box{
      background: linear-gradient(to right,#FF9B43,#FB8038);
      padding: 0 4%;
      padding-bottom: 15%;
      .van-nav-bar{
        background: transparent;
        .van-nav-bar__left{
          left: 0;
          .van-icon{
            color: #fff;
            font-size: 1.125rem;
          }
        }
        .van-nav-bar__title{
          color: #fff;
        }
      }
      p{
        color: #fff;
        margin: 0.8rem 0;
      }
      .text-succ{
        font-size: 1rem;
      }
      .text-tip{
        font-size: 0.8rem;
        letter-spacing: 1.5px;
        line-height: 1.5;
      }
      .steps{
        background: transparent;
        .van-step{
          color: #fff;
        }
      }
    }
    .info{
      padding: 0 4%;
      position: relative;
      top: -5%;
      >div{
        padding: 5% 3%;
        border-radius: 14px;
        background: #fff;
      }
      .top{
        .title{
          font-size: 1.125rem;
        }
        .text{
          font-size: 0.75rem;
          color: #bbb;
          line-height: 2.6;
        }
        .van-button{
          width: 100px;
          height: 36px;
          line-height: 36px;
          border-radius: 4px;
          color: #bbb;
        }
      }
      .middle{
        border: 1px dashed #bbb;
        border-left: none;
        border-right: none;
        .goods-list{
          margin-top: 0.6rem;
          li{
            line-height: 2;
            font-size: 0.875rem;
            color: #666;
            span{
              display: inline-block;
            }
            .name{
              width: 60%;
            }
            .num{
              color: #bbb;
            }
            .price{
              width: 30%;
              text-align: right;
            }
          }
        }
      }
      .bottom{
        ul{
          overflow: hidden;
          margin-top: 0.6rem;
          li{
            float: left;
            font-size: 0.8rem;
            color: #aaa;
          }
          .right{
            float: right;
            color: orange;
            font-size: 1.125rem;
          }
        }
      }
    }
}

</style>
