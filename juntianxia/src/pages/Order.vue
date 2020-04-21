<template>
  <div class="order">
    <van-nav-bar title="我的订单" :border="false">
      <!--      <img src="../assets/img/sousuo.png" alt slot="right" class="icon-img" />-->
    </van-nav-bar>
    <van-tabs @click="changeTab" v-model="activeName" color="#FB7F38">
      <!-- 所有订单 -->

      <van-tab
        v-for="item in titleList"
        :key="item.id"
        :title="item.title"
        :name="item.id" 
      >


        <!-- <div v-else>
          <p class="nolist-tips">暂时没有列表内容噢</p>
        </div> -->


        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="orderinfo" v-for="(order, key) in orderList" :key="key">
              <div class="title-box">
                <p class="title">筠天下-{{ order.room.private_name }}</p>
                <p class="status">{{ order.desstr }}</p>
              </div>
              <div class="detail" @click="toOrderInfo(order.id)">
                <div class="img-show">
                  <img :src="order.room.private_url" alt />
                </div>
                <div class="info">
                  <p>预约时间：{{ order.create_time }}</p>
                  <p class="price">总价：{{ order.total_money }}元</p>
                </div>
              </div>
              <div class="btn">
                <van-button
                  v-if="order.status == '0'"
                  type="default"
                  @click="goBackOrder(order)"
                  class="btn-style"
                  >申请退单
                </van-button>
                <van-button
                  v-if="order.status == '4'"
                  type="default"
                  class="btn-style"
                  >再来一单
                </van-button>
                <van-button
                  v-if="order.status == '3'"
                  type="default"
                  class="btn-style"
                  @click="toRate(order.id)"
                  >评价
                </van-button>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      activeName: "0",
      title: "",
      titleList: [
        {
          title: "全部",
          id: ""
        },
        {
          title: "待付款",
          id: "1"
        },
        {
          title: "已完成",
          id: "2"
        },
        {
          title: "退款",
          id: "5"
        }
      ],
      orderList: [],
      commentList: [],
      status: "",
      current_page:1,// 当前请求页,
      has_more:false, // 是否有更多
    };
  },
  created() {
    let status = this.$route.query.status;
    if (status) {
      this.status = status;
      this.activeName = status;
      // switch(status){
      //   case '' :this.activeName = '0';break;
      //   case '1' :this.activeName = '1';break;
      //   case '3' :this.activeName = '3';break;
      //   case '5' :this.activeName = '5';break;
      // }
    }
  },
  mounted() {
    // this.getOrderList()
    //切换重新渲染
  },
  methods: {
    // 下拉渲染列表
    onLoad() {
        console.log('请求一次')
        this.getOrderList()
      setTimeout(() => {
        if (this.refreshing) {
          this.orderList = [];
          this.refreshing = false;
        }
        this.loading = false;
      }, 1000);
    },

    // 重新加载
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.orderList = []
      this.current_page = 1
      this.onLoad();
    },

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
              this.orderList = []
              // this.getOrderList();
              this.onRefresh()
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    getOrderList() {
      let status = this.status;
      let req = {
        status: status,
        user_id: localStorage.getItem("uid"),
        list_rows: 10,
        page: this.current_page
      };

      this.Api.get("api/reserve/reserve_lists", req)
        .then(res => {
          // 不传全部订单 0预定中 1待付款 2到店消费 3待评价 4已评价 5退款售后 6退款完成
          let list = res.data.data;
          list.forEach(order => {
            order.desstr = this.setOrderStatus(order.status);
          });
          // Toast.loading({
          //   message: '加载中...',
          //   forbidClick: true,
          //   duration:600,
          // });
          setTimeout(()=>{
            this.orderList = this.orderList.concat(list);
            this.has_more = res.data.has_more
            if (res.data.has_more) {
              this.current_page++
            } else {
              // 没有更多了
              this.finished = true
              this.loading = false
            }
          },500)
          // console.log('哈哈',this.orderList);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 改变tabs页
    changeTab(status, title) {
      console.log(status, title);
      this.current_page = 1
      
      this.status = status;
      this.onRefresh()
    },

    // 设置订单状态
    setOrderStatus(status) {
      let str = "";
      switch (status) {
        case 0:
          str = "预定中";
          break;
        case 1:
          str = "代付款";
          break;
        case 2:
          str = "到店消费";
          break;
        case 3:
          str = "待评价";
          break;
        case 4:
          str = "已评价";
          break;
        case 5:
          str = "退款售后";
          break;
        case 6:
          str = "退款完成";
          break;
      }
      return str;
    },

    getCommentList() {
      let req = {
        user_id: localStorage.getItem("uid"),
        list_rows: 99,
        page: 1
      };

      this.Api.get("api/evaluate/lists", req)
        .then(res => {
          console.log("含啊哈哈", res);
          this.orderList = res.data.data;
          console.log(this.orderList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toRate(id) {
      console.log(id);
      localStorage.setItem("commentID", id);
      this.$router.push("/rate");
    },
    toOrderInfo(rid) {
      console.log(rid);
      localStorage.setItem("oid", rid);
      this.$router.push({
        path:'/orderinfo',
        query:{
          orderId:rid
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.nolist-tips {
  margin-top: 10vw;
  text-align: center;
  color: #6b6b6b;
  font-size: 0.8rem;
}
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
        line-height: 1;
        border-radius: 6px;
        float: right;
        margin-top: 12px;
        // margin-right: 18px;
      }
    }
  }
}
</style>
