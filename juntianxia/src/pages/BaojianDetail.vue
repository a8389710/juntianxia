<template>
  <div class="baojiandetail">
    <van-nav-bar title="包间详情" :border="false" left-text="返回">
      <van-icon name="arrow-left" slot="left" color="#fff" @click="back"/>
    </van-nav-bar>
    <div class="baojian-img">
      <!--      <img :src="roomInfo.private_url" alt="包间图片加载中..">-->
      <img :src="roomInfo.private_url">

    </div>
    <!-- 内容 -->
    <div class="content-box">
      <div class="info">
        <p>
          <span class="name">{{roomInfo.private_name}}</span>
          <span class="sold-count">月售{{roomInfo.num}}</span>
        </p>
        <p class="detail">
          <van-rate
            v-model="roomInfo.score"
            allow-half
            void-icon="star"
            void-color="#eee"
            size="12"
            readonly
          />
          <span>{{roomInfo.score}}分</span>
          <span>面积:{{roomInfo.private_size}}m²</span>
          <span>座位数：{{roomInfo.private_seat}}</span>
        </p>
        <van-divider/>
        <!-- 包间图片列表 -->
        <div class="img-list">
          <van-swipe :loop="false" :width="100" :height="80" :show-indicators="false">
            <ul>
              <li v-for="(item,index) in roomInfo.imgArr">
                <van-swipe-item>
                  <img :src="item" alt="" @click="datu(index,item)" >
                  <div class='button-icon' v-show="index===0 " ref="icon" @click="playVideo"></div>
                </van-swipe-item>
              </li>
            </ul>
          </van-swipe>
        </div>
      </div>
      <div class="desc">
        <p class="title">包间描述</p>
        <van-divider/>
        <div class="desc-content">{{roomInfo.remarks}}</div>
      </div>
      <div class="like">
        <p class="title">猜你喜欢
          <van-icon name="arrow" size="12" class="to-baojianlist" @click="toBaojianList"/>
        </p>
        <van-divider/>
        <van-grid :border="false" :column-num="3" :gutter="2">
          <van-grid-item v-for="item in likeList" @click="getData(item.id)">
            <van-image :src="item.private_url"/>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="btn-reserve" @click="toReserve">立即预约</div>
    </div>
    <video :src="videoSrc" v-show="false" class="video" ref="video">您的浏览器不支持 video 视屏播放。</video>
    <div class='guanbi' @click="close"  ref="close"></div>
    <div class="videozhezhzo" ref="videozhezhzo"></div>
    <div class="printzhezhzo" ref="printzhezhzo"></div>
    <div class='print'  ref="print"></div>
    <div class='printclose' ref="printclose" @click="closedatu"></div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        starVal: 2.5,
        space: 50,
        seats: 20,
        roomInfo: [],
        likeList: [],
        token: localStorage.getItem('token'),
        videoSrc: ''
      };
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      getData(roomid) {
        let req = {
          id: roomid
        };
        this.Api.get('api/room/roomInfo', req)
          .then(res => {
            this.roomInfo = res.data.roomInfo;

            localStorage.setItem('roomInfo', JSON.stringify(this.roomInfo));
            localStorage.setItem('room_id', res.data.roomInfo.id);
            this.likeList = res.data.like;
            if (this.roomInfo["private_video"]) {
              //有视频
              this.videoSrc = this.roomInfo["private_video"]

            } else {
              //无视频

              this.$nextTick(function () {

                this.videoSrc = ''
                console.log('无视频', this.roomInfo["private_video"]);
                this.$refs.icon[0].style.display = "none"

              })
            }

            console.log('roomInfo', this.roomInfo);
            console.log('likeList', this.likeList);
          })
          .catch(err => {
            console.log(err)
          })
      },
      toBaojianList() {
        this.$router.push('/baojianlist');
      },
      toReserve() {
        console.log('token:' + this.token);
        //如果没有token就登录页面,有就移动
        if (this.token) {
          this.$router.push('/reserveroom');
        } else {
          this.$router.push('/login');
        }
      },
      playVideo() {
        console.log('播放视频');
        let vdo = this.$refs.video
        let closedom=this.$refs.close
        let videozhezhzo=this.$refs.videozhezhzo

        vdo.style.display = 'block'
        videozhezhzo.style.display = 'block'
        closedom.style.display = 'block'

        console.log(vdo);
        vdo.play();
      },
      close(){
        console.log('关闭视频');
        let vdo = this.$refs.video
        let closedom=this.$refs.close
        let videozhezhzo=this.$refs.videozhezhzo

        closedom.style.display = 'none'
        videozhezhzo.style.display = 'none'
        vdo.style.display = 'none'
        console.log(vdo);
        vdo.load();
      },
      datu(tupianid,url){
        console.log(tupianid);
        if (tupianid==0&&this.videoSrc.length!=0){
          console.log('有视频不能点');

        }else {
          console.log('可以点');
          let printzhezhzo=this.$refs.printzhezhzo
          let print=this.$refs.print
          let printclose=this.$refs.printclose
          printzhezhzo.style.display = 'block'
          print.style.display = 'block'
          printclose.style.display = 'block'
          print.style.background=`url("${url}")`+'center   center no-repeat'

        }
      },
      closedatu(){
        let printzhezhzo=this.$refs.printzhezhzo
        let print=this.$refs.print
        let printclose=this.$refs.printclose
        printzhezhzo.style.display = 'none'
        print.style.display = 'none'
        printclose.style.display = 'none'
      }

    },
    mounted() {
      var id = localStorage.getItem('roomID');
      if (localStorage.getItem('roomInfo')) {
        localStorage.removeItem('roomInfo');
      }
      this.getData(id);

    }

  };
</script>
<style lang="less" scoped>
  .baojiandetail {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
    }

    .baojian-img {
      width: 100%;
      height: 30%;
      vertical-align: middle;
    }

    .content-box {
      position: relative;
      top: -8%;
      width: 90%;
      margin: 0 auto;
      height: 60%;
      // background: mistyrose;
      > div {
        border-radius: 6px;
        background: #fff;
        color: #272727;
        padding: 0.75rem;
        margin-bottom: 0.75rem;
      }

      .info {
        p {
          margin: 5px 0;
        }

        .title {
          color: #262626;
        }

        .detail {
          span {
            height: 30px;
          }
        }

        span {
          font-size: 14px;
        }

        .name {
          font-size: 1.8rem;
        }

        .img-list {
          .van-swipe-item {
            padding-right: 10px;
            box-sizing: border-box;
          }
        }
      }

      .desc {
        .desc-content {
          font-size: 0.875rem;
          color: #535353;
        }
      }

      .like {
        overflow: hidden;

        .to-baojianlist {
          float: right;
        }
      }

      .btn-reserve {
        background: #F7692B;
        color: #fff;
        text-align: center;
      }
    }

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

    .van-nav-bar {
      background: transparent;
      color: #fff;
      position: fixed;
      width: 100%;

      .van-nav-bar__title {
        color: #fff;
      }

      .van-icon {
        font-size: 22px;
      }
    }

    .button-icon {
      width: 31px;
      height: 31px;
      background: url("../assets/bofang@2x.png") center      center;
      background-size: cover;
      position: absolute;
      top: 50%-15.5;
      left: 50%-15.5;
      z-index: 9999;
    }

    .video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
    }

    .guanbi {
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      width: 40px;
      height: 40px;
      background: url("../assets/guanbi.png") center   center;
      background-size: cover;
    }

    .printzhezhzo{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: white;
      display: none;
    }
    .videozhezhzo{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: white;
      display: none;
    }
    .print{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      display: none;
      background-size: contain;
    }

    .printclose{
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      width: 40px;
      height: 40px;
      background: url("../assets/guanbi.png") center   center;
      background-size: cover;
    }
  }
</style>
