<template>

  <div class="dianlei">
    <van-nav-bar title="提交订单" :border="false">
      <img src="../../assets/baishe.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>

    <div class="dianlei1">
      <div class="jianbian"></div>

      <div class="xranzhe">
        <div class="l" @click="qieye1('1')">骑手配送</div>
        <div class="r" @click="qieye1('2')">在店用餐</div>
      </div>
      <div class="dizishijian">
        <div class="l">扫码绑定您的包间</div>
        <div class="r" @click="saomaopen"></div>
      </div>
      <div class="zhifufangshi">
        <div class="l">支付</div>
        <span></span>
        <div class="r" @click="zhifuopen">在线支付</div>
      </div>
      <div class="caidan">
        <div class="caidanlist">
          <div class="caipin1">
            <div class="l">
              <img src="../../assets/kaorou.png" alt="">
              <div class="cainame">热辣红锅</div>
              <div class="beizhu">微辣</div>
              <div class="cainumber">×1</div>
            </div>
            <div class="r">￥48</div>
          </div>
          <div class="caipin1">
            <div class="l">
              <img src="../../assets/kaorou.png" alt="">
              <div class="cainame">热辣红锅</div>
              <div class="beizhu">微辣</div>
              <div class="cainumber">×1</div>
            </div>
            <div class="r">￥48</div>
          </div>
          <div class="caipin1">
            <div class="l">
              <img src="../../assets/kaorou.png" alt="">
              <div class="cainame">热辣红锅</div>
              <div class="beizhu">微辣</div>
              <div class="cainumber">×1</div>
            </div>
            <div class="r">￥48</div>
          </div>
        </div>

        <div class="xian"></div>
        <div class="zonji">

          <div class="r">￥<span>128.00</span></div>
          <div class="l">小计</div>
        </div>
      </div>

      <div class="lijizhifu" @click="createOrder">
        立即支付
      </div>
    </div>
    <van-popup
      v-model="zhifushow"
      close-icon-position="top-right"
      position="bottom"
      closeable
      :style="{ height: '250px' }"
    >
      <van-picker :columns="columns" @change="onChange"/>


    </van-popup>
  </div>
</template>

<script>


  export default {
    name: 'dianlei',

    data() {
      return {
        columns: ['在线支付', '现金支付'],
        zhifushow:false
      }
    },
    methods: {
      qieye1(data) {
        if (data == 1) {
          this.$router.push('/diancan/peishon')
        } else if (data == 2) {
          this.$router.push('/diancan/dianlei')

        }
      },
      back() {

        this.$router.push('/diancan/diancancaipin')
        console.log('hh');
      },
      onChange(picker, value, index) {
        alert(`当前值：${value}, 当前索引：${index}`);
      },
      zhifuopen(){
        this.zhifushow=true
        console.log('giao');
      },
      saomaopen(){
        this.$router.push('/saoma')
      },
      //创建文件
      //创建订单
      createOrder(){


        let req={
          // restaurant_id:,
          // remarks:,
          // address_id:,
          // reserve_time:,
          // reserve_time_point:,
          // reserve_num:,
          // room_id:,
          type:0
        }
        this.Api.post('/api/reserve/make_reserve',req).then(res=>{
          console.log('成功打印',res);
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted() {
    // alert(this.$store.state.codeUrl)
      //每次进入页面判断一下this.$store.state.codeUrl是否为空
    },


    computed:{
      // saomacode(){
      //    return this.$store.state.codeUrl
      // }
    },
    watch: {  //监听全局变量componentId的变化
      // saomacode: function(val, oldval){
      //
      //     alert('扫到码了',val);
      //
      // }
      },



  };

</script>

<style lang="less" scoped>
  .van-nav-bar {
    background: RGBA(253, 130, 60, 1)

  }

  .van-nav-bar__title {
    color: #FEFEFE;
  }

  .dianlei1 {
    position: relative;
  }

  .dianlei {
    color: black;
    position: relative;
    width: 100%;
    height: 100%;
    background: #f2f2f2;

    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }

    .jianbian {
      width: 100%;
      height: 217px;
      background: linear-gradient(RGBA(253, 130, 60, 1), RGBA(240, 238, 239, 1));
      position: absolute;
      top: 0px;
      left: 0px;

    }

    .xranzhe {
      height: 94px;

      .l {
        width: 413px;
        height: 66px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.8;
        border-radius: 16px 10px 0px 0px;
        position: absolute;
        top: 28px;
        left: 28px;
        z-index: 9;
        padding-left: 123px;
        line-height: 66px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1)
      }

      .r:before {
        content: '';
        display: block;
        width: 35px;
        height: 66px;
        position: absolute;
        transform: skewX(150deg);
        background: rgba(255, 255, 255, 1);
        border-top-left-radius: 8px;
        top: 0;
        left: -20px;
      }

      .r {
        width: 413px;
        height: 80px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px 10px 0px 0px;
        z-index: 9;

        position: absolute;
        top: 18px;
        right: 18px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        line-height: 66px;

      }
    }

    .dizishijian {
      position: relative;
      width: 714px;
      height: 157px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 16px 16px 16px 16px;
      margin-top: -14px;
      margin-left: 18px;

      .l {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        float: left;
        padding-top: 61px;
        padding-left: 31px;
      }

      .r {
        width: 80px;
        height: 80px;
        background: url("../../assets/shaoma.png") center center;
        background-size: cover;
        float: right;
        margin-top: 36px;
        margin-right: 145px;
      }

    }

    .zhifufangshi {

      width: 714px;
      height: 86px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 24px;
      margin-top: 12px;
      margin-left: 18px;
      text-align: center;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(254, 254, 254, 1);

      .l {
        float: left;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        padding-top: 30px;
        padding-left: 30px;
        color: rgba(17, 17, 17, 1);
      }

      .r {
        float: right;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(17, 17, 17, 1);
        margin-top: 30px;
        margin-right: 13px;
      }

      span {
        background: url("../../assets/next.png") center center;
        background-size: cover;
        width: 13px;
        height: 26px;
        float: right;
        margin-top: 31px;
        margin-right: 30px;
      }

    }

    .caidan {
      width: 714px;

      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 24px;
      margin-top: 12px;
      margin-left: 18px;
      /*margin-top: 432px;*/
      /*margin-left: 18px;*/

      .caidanlist {
        .caipin1 {
          overflow: hidden;

          .l {
            float: left;
            position: relative;

            img {
              height: 122px;
              width: 128px;
              margin-top: 30px;
              margin-left: 30px;
              float: left;
            }

            .cainame {
              position: absolute;
              top: 41px;
              left: 176px;
              width: 130px;
              height: 27px;
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(17, 17, 17, 1);
            }

            .beizhu {

              width: 67px;
              height: 23px;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              position: absolute;
              left: 178px;
              top: 85px;

            }

            .cainumber {
              width: 22px;
              height: 18px;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              position: absolute;
              left: 178px;
              top: 120px;

            }
          }

          .r {
            float: right;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(17, 17, 17, 1);
            padding-top: 46px;
            padding-right: 31px;
          }
        }
      }


      .xian {
        width: 654px;
        height: 2px;
        background: rgba(238, 238, 238, 1);
        margin-left: 30px;
        margin-top: 29px;
      }

      .zonji {
        overflow: hidden;

        .r {
          float: right;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);
          padding-right: 29px;

          line-height: 81px;

          span {
            font-size: 40px;

          }
        }

        .l {
          float: right;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(17, 17, 17, 1);
          padding-right: 13px;
          line-height: 81px;

        }
      }
    }


    .lijizhifu {
      width: 690px;
      height: 98px;
      background: linear-gradient(90deg, rgba(255, 155, 67, 1), rgba(251, 127, 56, 1));
      border-radius: 49px;
      margin-top: 24px;
      margin-left: 30px;
      margin-bottom: 30px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(254, 254, 254, 1);
      line-height: 98px;
      text-align: center;

    }
  }
</style>
