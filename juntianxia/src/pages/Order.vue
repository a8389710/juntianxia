<template>
  <div class="order">
    <van-nav-bar title="我的订单" :border="false">
<!--      <img src="../assets/img/sousuo.png" alt slot="right" class="icon-img" />-->
    </van-nav-bar>
    <van-tabs v-model="activeName" color="#FB7F38">
      <!-- 所有订单 -->

      <van-tab  title="全部"  name="0">
          <div class="orderinfo" v-for="(order,key) in orderList0" :key="key">
            <div class="title-box">
              <p class="title">筠天下-{{order.room.private_name}}</p>
              <p class="status">待评价</p>
            </div>
            <div class="detail" @click="toOrderInfo(order.id)">
              <div class="img-show">
                <img :src="order.room.private_url" alt />
              </div>
              <div class="info">
                <p>预约时间：{{order.create_time}} </p>
                <p class="price">总价：{{order.total_money}}元</p>
              </div>
            </div>
            <div class="btn">
              <van-button type="default" class="btn-style">再来一单</van-button>
              <van-button type="default" class="btn-style" @click="toRate(order.id)">评价</van-button>
            </div>
          </div>


      </van-tab>
      <van-tab  title="待付款"  name="1">
1
<!--        v-if="order.staus==0-->
          <div class="orderinfo" v-for="(order,key) in orderList1" :key="key">
            <div class="title-box">
              <p class="title">筠天下-{{order.private_name}}</p>
              <p class="status">待评价</p>
            </div>
            <div class="detail" @click="toOrderInfo(order.id)">
              <div class="img-show">
                <img :src="order.private_url" alt />
              </div>
              <div class="info">
                <p>预约时间：{{order.reserve_time}} {{order.reserve_time_point}}</p>
                <p class="price">总价：{{order.total_money}}元</p>
              </div>
            </div>
            <div class="btn">
              <van-button type="default" class="btn-style">再来一单</van-button>
              <van-button type="default" class="btn-style" @click="toRate(order.id)">评价</van-button>
            </div>
          </div>


      </van-tab>
      <van-tab title="待评价"  name="2">

2
<!--          <div class="orderinfo" v-for="(order,key) in orderList">-->
<!--            <div class="title-box">-->
<!--              <p class="title">筠天下-{{order.private_name}}</p>-->
<!--              <p class="status">待评价</p>-->
<!--            </div>-->
<!--            <div class="detail" @click="toOrderInfo(order.id)">-->
<!--              <div class="img-show">-->
<!--                <img :src="order.private_url" alt />-->
<!--              </div>-->
<!--              <div class="info">-->
<!--                <p>预约时间：{{order.reserve_time}} {{order.reserve_time_point}}</p>-->
<!--                <p class="price">总价：{{order.total_money}}元</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="btn">-->
<!--              <van-button type="default" class="btn-style">再来一单</van-button>-->
<!--              <van-button type="default" class="btn-style" @click="toRate(order.id)">评价</van-button>-->
<!--            </div>-->
<!--          </div>-->


      </van-tab>
      <van-tab title="退款"  name="3">
3

<!--          <div class="orderinfo" v-for="(order,key) in orderList" >-->
<!--            <div class="title-box">-->
<!--              <p class="title">筠天下-{{order.private_name}}</p>-->
<!--              <p class="status">待评价</p>-->
<!--            </div>-->
<!--            <div class="detail" @click="toOrderInfo(order.id)">-->
<!--              <div class="img-show">-->
<!--                <img :src="order.private_url" alt />-->
<!--              </div>-->
<!--              <div class="info">-->
<!--                <p>预约时间：{{order.reserve_time}} {{order.reserve_time_point}}</p>-->
<!--                <p class="price">总价：{{order.total_money}}元</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="btn">-->
<!--              <van-button type="default" class="btn-style">再来一单</van-button>-->
<!--              <van-button type="default" class="btn-style" @click="toRate(order.id)">评价</van-button>-->
<!--            </div>-->
<!--          </div>-->

      </van-tab>


      <!-- 已评价订单 -->

    </van-tabs>
  </div>
</template>
<script>
const title = [
  {
    title: "全部",
    id: "0"
  },
  {
    title: "待付款",
    id: "1"
  },
  {
    title: "待评价",
    id: "2"
  },
  {
    title: "退款",
    id: "3"
  }
];
export default {
  data() {
    return {
      activeName: '0',
      title: title,
      orderList0: [],
      orderList1: [],
      orderList2: [],
      orderList3: [],
      commentList:[],
      status: 0
    };
  },
  methods:{
    getOrderList0(){
      let req = {
        user_id: localStorage.getItem('uid'),
        list_rows: 10,
        page: 1,

      };

      this.Api.get('api/reserve/reserve_lists',req)
        .then(res =>{
          console.log('呵呵',res);
          this.orderList0 = res.data.data;
          // console.log('哈哈',this.orderList);
        })
        .catch(err =>{
          console.log(err)
        })

    },
    getOrderList1(){
      let req = {
        user_id: localStorage.getItem('uid'),
        list_rows: 10,
        page: 1,
        status:1
      };

      this.Api.get('api/reserve/reserve_lists',req)
        .then(res =>{
          console.log('成功1',res);
          this.orderList1 = res.data.data;
          // console.log('哈哈',this.orderList);
        })
        .catch(err =>{
          console.log(err)
        })

    },
    getCommentList(){
      let req = {
          user_id: localStorage.getItem('uid'),
          list_rows: 99,
          page: 1,
        };

      this.Api.get('api/evaluate/lists',req)
      		.then(res =>{
            console.log('含啊哈哈',res);
            this.orderList = res.data.data;
            console.log(this.orderList);
      		})
      		.catch(err =>{
      		  console.log(err)
      		})
    },
    toRate(id){
      console.log(id);
      localStorage.setItem('commentID',id);
      this.$router.push('/rate');
    },
    toOrderInfo(rid){
      console.log(rid);
      localStorage.setItem('oid',rid);
      this.$router.push('/orderinfo');
    }
  },
  mounted() {
    this.getOrderList0()
    this.getOrderList1();
    //切换重新渲染
    // this.getCommentList()
  }
};
</script>
<style lang="less" scoped>
.order {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #f0f0f0;
  .icon-img {
    width: 33px;
    height: 31px;
    margin-right: 24px;
  }
  .orderinfo {
    width: 702px;
    height: 290px;
    background: #fff;
    margin: 0 auto;
    margin-top: 6px;
    border-radius: 10px;
    padding: 0 19px;
    box-sizing: border-box;
    .title-box {
      width: 100%;
      height: 70px;
      border-bottom: 2px solid #f3f3f3;
      line-height: 70px;
      .title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      .status {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        float: right;
      }
    }
    .detail {
      width: 100%;
      height: 156px;
    //   background: red;
      overflow: hidden;
      .img-show {
        width: 132px;
        height: 132px;
        background: #eee;
        margin-top: 18px;
        margin-left: 19px;
        border-radius: 10px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        min-width: 325px;
        height: 70px;
        // background: blue;
        float: left;
        margin-top: 47px;
        margin-left: 12px;
        p {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .price {
          margin-top: 22px;
        }
      }
    }
    .btn {
      width: 100%;
      height: 62px;
    //   background: greenyellow;
      .btn-style {
        height: 38px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 38px;
        border-radius:6px;
        float: right;
        margin-top: 12px;
        margin-right: 18px;
      }
    }
  }
}
</style>
