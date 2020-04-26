<template>
  <div class="home">
    <div class="swipe-box">
      <van-nav-bar :border="false" class="home-nav">
        <!-- @click="xzAddress" -->
        <div @click="layerShow" slot="title" class="address">
          {{choseRES.restaurant_name}}
          <!-- <div v-if="true">
            <ul class="down" v-for="(item,index) in dataAddress" :key="index">
              <li @click="dataAssign">{{item.name}}</li>
            </ul>
          </div>-->
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
        <!--地图导航-->
        <li @click="goAMap">
          <div>
            <img src="../assets/img/daohang.png" alt />
          </div>
          <span>一键定位</span>
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
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=196872901,801904316&fm=26&gp=0.jpg"
          alt
        />
      </div>
    </div>

    <div class="home-nav-title">优选包间</div>
    <van-swipe :show-indicators="false" class="swiper-container" :loop="false" :width="300">
      <van-swipe-item class="swiper-slide" v-for="(item,index) in baojianList" :key="index">
        <img class="swiper-img" :src="item.private_url" @click="toBaojian(item)" />
        <p class="swiper-title">
          {{item.private_name}}
          <span>可预订</span>
        </p>
      </van-swipe-item>
    </van-swipe>
    <!-- <div class="swiper-container">
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
    </div>-->
    <!-- 餐厅地址列表 -->
    <van-popup v-model="show" class="layer" style="height: 260px;" position="bottom">
      <div class="down">
        <p class="mendian">门店选择</p>
        <div class="addressList" v-for="(item,index) in RestaurantAddress" :key="index">
          <div class="zhuti">
            <p class="title">店铺：{{item.restaurant_name}}</p>
            <p class="add">位置：{{item.newadd}}</p>
            <p class="phone">商家电话 {{item.restaurant_phone}}</p>
          </div>
          <div @click="addressXZ(item)" class="nianniu">选择</div>
        </div>
      </div>
    </van-popup>
    <!-- 餐厅地址地图 -->
    <van-popup
      v-model="mapShow"
      class="layer"
      style="paddding:30px 0 0;height: 50%;"
      position="bottom"
    >
      <div style="height:100%;" id="container"></div>
    </van-popup>
  </div>
</template>

<script>
import AMap from "AMap";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Popup } from "vant";
// import { AMapManager } from 'vue-amap';
// -----------------------------

export default {
  data() {
    let self = this;
    return {
      // 首页数据
      downAdd: false,
      homeData: {},
      bannerImg: [],
      shopTel: "",
      baojianList: [],
      dataAddress: [],
      RestaurantAddress: {},
      assignment: "",
      show: false,
      mapShow: false,
      choseRES: {} // 选择餐厅
    };
  },
  // ----------------
  created() {
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
  },
  // ----------------
  mounted() {
    // 地址选择
    if (localStorage.getItem("assignment")) {
      this.assignment = localStorage.getItem("assignment");
    } else {
      this.assignment = "选择地址";
    }
    let _this = this;
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

    this.Restaurantlocation();
  },

  methods: {
    // 跳转高德地图
    goAMap() {
      this.mapShow = true;
      setTimeout(() => {
        this.init();
      }, 500);
    },

    // 选择地址
    Restaurantlocation() {
      // 先获取餐厅位置（确定点餐预定的餐厅）
      this.Api.get("/api/restaurant/lists")
        .then(res => {
          console.log("餐厅列表", res);
          this.RestaurantAddress = res.data.data;
          console.log(this.RestaurantAddress);
          if (res.data.data[0]) {
            this.choseRES = res.data.data[0];
            localStorage.setItem(
              "restaurantInfo",
              JSON.stringify(res.data.data[0])
            );
            localStorage.setItem("restaurant_id", res.data.data[0].id);
          }
          // console.log(res.data.data[0]);
        })
        .catch(err => {
          // console.log(err)
        });
    },
    layerShow() {
      this.show = true;
      this.Restaurantlocation();
    },
    addressXZ(item) {
      // this.assignment = e;
      this.choseRES = item;
      // localStorage.setItem("assignment", e);
      this.show = false;
    },
    init() {
      let _this = this;
      let lnglat = this.choseRES.lnglat;

      let box = lnglat.split(",");
      box.forEach(lag => {
        lag = Number(lag);
      });
      let map = new AMap.Map("container", {
        center: box,
        zoom: 12, //设置地图显示的缩放级别
        viewMode: "2D", //设置地图模式
        lang: "zh_cn", //设置地图语言类型
        resizeEnable: true
      });

      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.OverView",
          "AMap.MapType",
          "AMap.Geolocation"
        ],
        function() {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar());

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          // map.addControl(new AMap.Scale());

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          // map.addControl(new AMap.OverView({isOpen:true}));

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          // map.addControl(new AMap.MapType());

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          // map.addControl(new AMap.Geolocation());
        }
      );
      var circle = new AMap.Marker({
        center: new AMap.LngLat(box[0], box[1]), // 圆心位置
        radius: 1000, //半径
        strokeColor: "#F33", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#ee2200", //填充颜色
        fillOpacity: 0.35 //填充透明度
      });
      map.add(circle);
      
      var content =
        "<div style='' clas='showWindowInfo'><div>" +
        `${_this.choseRES.newadd}` +
        "</div></div>";
      var infoWindow = new AMap.InfoWindow({
        content: content //传入 dom 对象，或者 html 字符串
      });
      infoWindow.open(map, map.getCenter());

    },
    Address() {
      // console.log(23),
    },
    //跳转
    toInfo() {
      // 消息中心
      this.$router.push("/info");
    },
    // 我的订单
    goMyOrder() {
      this.$router.push({
        path: "/order",
        query: {
          status: 2
        }
      });
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
  }
};
</script>
<style lang="less" scoped>
.amap-info-contentContainer{
  position: relative;
  top: -16px;
  left: 0px;
}
#container {
  width: 95%;
  margin: 0 auto;
}
.home {
  width: 100%;
  height: 100%;
  .address {
    text-align: left;
    position: absolute;
    top: 0px;
    left: 15px;
    color: #ffffff;
  }
  // 地址弹出框
  .down {
    padding: 20px;
    color: #272525;
    font-size: 1rem;
    .mendian {
      border-left: 5px solid #f16126;
      padding-left: 10px;
      margin-bottom: 10px;
      margin-top: 20px;
    }
    .addressList {
      > div {
        float: left;
      }
      .zhuti {
        width: 85%;
      }
      .nianniu {
        border-left: 1px solid #eee;
        width: 14%;
        color: #f35e22;
        text-align: right;
        font-size: 0.9rem;
        margin-top: 40px;
        line-height: 50px;
      }
      margin-top: 10px;
      padding: 10px;
      height: 4.5rem;
      border-bottom: 1px solid #eee;
    }
    .title {
      font-size: 0.9em;
      color: #272525;
    }
    .add {
      color: #666;
      font-size: 0.8rem;
      margin-top: 0.6rem;
    }
    .phone {
      color: #f35e22;
      font-size: 0.8rem;
      margin-top: 0.6rem;
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
