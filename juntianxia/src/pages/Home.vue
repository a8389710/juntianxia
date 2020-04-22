<template>
  <div class="home">
    <div class="swipe-box">
      <van-nav-bar :border="false" class="home-nav"> 
        <div @click="xzAddress" slot="title" class="address">{{assignment.name}}
          <div v-if="true" >
            <ul class="down" v-for="(item,index) in dataAddress" :key="index">
              <li @click="dataAssign">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <p slot="title" class="home-title">筠天下</p>
        <img
          src="../assets/img/xiaoxi.png"
          alt
          slot="right"
          class="icon-img"
          style="margin:0"
          @click="toInfo"
        />
      </van-nav-bar>
      <van-swipe :autoplay="3000" indicator-color="white" class="swipe">
        <van-swipe-item v-for="item in bannerImg" :key="item.id">
          <img :src="item.ad_url" alt />
        </van-swipe-item>
      </van-swipe>

      <ul class="home-choose-box">
        <li @click="toBaojianList()">
          <img src="../assets/img/caipin.png" alt />
          <span>包间预约</span>
        </li>
        <li @click="toReserve">
          <img src="../assets/img/baojian.png" alt />
          <span>展示菜品</span>
        </li>
        <li>
          <!--          地图导航-->
          <a href="https://uri.amap.com/marker?position=104.101255,30.660122">
            <img src="../assets/img/daohang.png" alt />
          </a>
          <span>一键导航</span>
        </li>
        <li>
          <a :href="'tel:'+shopTel" style="font-size: 0;">
            <img src="../assets/img/goutong.png" alt />
          </a>
          <span>一键沟通</span>
        </li>
      </ul>
    </div>

    <div class="home-banner">
      <div class="banner-info">
        <p>MENU</p>
        <p>美食榜单</p>
        <p>/</p>
        <p>做最了解你喜好的餐饮品牌</p>
      </div>
      <div class="banner-img" @click="toTopList">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=196872901,801904316&fm=26&gp=0.jpg" alt />
      </div>
    </div>

    <div class="home-nav-title">优选包间</div>

    <van-swipe :show-indicators="false" class="swiper-container" :loop="false" :width="300">
      <van-swipe-item class="swiper-slide" v-for="(item,index) in baojianList" :key="index">
        <img class="swiper-img" :src="item.private_url" />
        <p class="swiper-title">
          {{item.private_name}}
          <span>可预订</span>
        </p>
      </van-swipe-item>
    </van-swipe>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item,index) in baojianList"
          :key="index"
          @click="toBaojian(item)"
        >
          <img class="swiper-img" :src="item.private_url"/>
          <p class="swiper-title">
            {{item.private_name}}
            <span>可预订</span>
          </p>
        </div>
      </div>
    </div>
    <div style="height:300px;width:300px;" id="container" tabindex="0"></div>
  </div>
</template>

<script>
import AMap from 'AMap';
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
// import { AMapManager } from 'vue-amap';
// -----------------------------

export default {
  data() {
    let self = this;
    return {
      // 首页数据
      downAdd:false,
      homeData: {},
      bannerImg: [],
      shopTel: "",
      baojianList: [],
      dataAddress: [],
      assignment: {
        name:"默认地址"
      },
    };
  },
  // ----------------
  created() {},
  // ----------------
  mounted() {
    let _this = this
    this.init()
    // ------------------------------------------------
    //滑动
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      loop: false,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      coverflow: {
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      },
      spaceBetween: 50
    });

    this.Api.get("/api/index/home")
      .then(res => {
        //设置展示 和手机号
        this.bannerImg = res.data.banner;
        this.baojianList = res.data.optimum;
        this.shopTel = res.data.tel;
      })
      .catch(err => {
        // console.log(err)
      });

    // this.Api.get("api/restaurant/lists")
    //   .then(res => {
    //     console.log("餐厅列表", res);
    //     if (res.data.data[0]) {
    //       localStorage.setItem(
    //         "restaurantInfo",
    //         JSON.stringify(res.data.data[0])
    //       );
    //       localStorage.setItem("restaurant_id", res.data.data[0].id);
    //     }
    //     // console.log(res.data.data[0]);
    //   })
    //   .catch(err => {
    //     // console.log(err)
    //   });

  },

  methods: {
    init() {
      // this.Api.get('/apiAdd/v3/ip?output=xml&key=2e3312741a5172ebdc075701b00f865d')
      // .then(res=>{
      //   console.log(res,'地理位置信息')
      // })
      let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10, //设置地图显示的缩放级别
        viewMode: '2D', //设置地图模式
        lang: 'zh_cn', //设置地图语言类型
      })
      let geolocation = ''
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        console.log(geolocation.po,'geolocation')
        AMap.event.addListener(geolocation, 'complete', this.showJW);//返回定位信息
    });
    //解析定位结果
    },
      // 展示当前定位经纬度
      showJW(data){
        console.log(data)
              var lng = data.position.getLng();
              var lat = data.position.getLat();
        // this.lnglatXY = [lng,lat]
        console.log(lng,'lng')
        console.log(lat,'lat')
      },


    // 选择地址
    xzAddress(){
        this.downAdd = !this.downAdd
    },
    Address(){
      // console.log(23),
    },
    //跳转
    toInfo() {
      // 消息中心
      this.$router.push("/info");
    },

    // 我的订单
    goMyOrder(){
      this.$router.push({
        path:'/order',
        query:{
          status:2
        }
      })
    },

    toTopList() {
      //美食榜单
      this.$router.push("/toplist");
    },
    toBaojian(item) {
      // console.log(item.id);
      //去包间 同时保存房间号
      localStorage.setItem("roomID", item.id);
      this.$router.push("/baojiandetail");
    },
    toBaojianList() {
      //包间列表
      this.$router.push("/baojianlist");
    },

    toReserve() {
      //菜品预定
      this.$router.push("/diancan/diancancaipin");
    }
  },

};
</script>
<style lang="less" scoped>

.home {
  width: 100%;
  height: 100%;
  .address {
    text-align: left;
    position: absolute;
    top: 0px;
    left: 15px;
    color: #ffffff;
    .down{
      background: rgba(0, 0, 0, 0.9);
      width: 250px;
      margin: -2px -15px;
      line-height: 50px;
      font-size: 12px;
      padding-left: 15px;

    }
  }
  .swipe-box {
    width: 100%;
    height: 34%;
    background: rgba(127, 255, 212, 0);
    position: relative;

    .icon-img {
      width: 33px;
      height: 31px;
      margin-right: 24px;
    }

    .home-title {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }

    .home-nav {
      background: rgba(17, 17, 17, 1);
      position: fixed;
      width: 100%;
      opacity: 0.5;
      z-index: 9999;
    }

    .swipe {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
      }
    }

    .home-choose-box {
      width: 95%;
      height: 40%;
      margin: -150px auto 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.15);
      border-radius: 36px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      z-index: 1000;
      // left: 24px;
      // top: 80%;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          width: 90px;
          height: 90px;
        }

        span {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }

  .home-banner {
    width: 100%;
    height: 22%;
    //   background: #FB7F38;
    margin-top: 8%;
    display: flex;

    .banner-info {
      width: 347px;
      height: 100%;
      background: #fb7f38;
      box-sizing: border-box;
      padding-left: 31px;

      p:nth-child(1) {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 30px;
      }

      p:nth-child(2) {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 18px;
      }

      p:nth-child(3) {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 14px;
        margin-bottom: 35px;
      }

      p:nth-child(4) {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }

    .banner-img {
      width: 403px;
      height: 100%;
      background: palegoldenrod;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .home-nav-title {
    width: 180px;
    height: 36px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(17, 17, 17, 1);
    // background: red;
    margin-top: 33px;
    margin-left: 30px;
    line-height: 36px;
    box-sizing: border-box;
    padding-left: 10px;
    border-left: 3px solid #f36e21;
  }

  .swiper-container {
    // background-color: rgb(58, 138, 251);
    z-index: 0;
    width: 100%;
    height: 30%;
    padding-top: 40px;
    padding-bottom: 15px;
    // margin-bottom: 50px;
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 80%;

      .swiper-img {
        border-radius: 6vw;
        width: 100%;
        height: 80%;
        padding: 0 15px;
        box-sizing: border-box;
      }

      img {
        width: 100%;
      }

      .swiper-title {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(17, 17, 17, 1);
        margin: 0 auto;
        text-align: center;
        margin-top: 10px;

        span {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(50, 50, 50, 1);
        }
      }
    }
  }
}
</style>
