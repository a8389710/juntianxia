<template>

  <div class="peishon">
    <van-nav-bar title="提交订单" :border="false">
      <img src="../../assets/baishe.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>

    <div class="peishon1">
      <div class="jianbian"></div>

      <div class="xranzhe">
        <div class="l" @click="qieye('1')">骑手配送</div>
        <div class="r" @click="qieye('2')">在店用餐</div>
      </div>
      <div class="dizishijian">
        <div class="dizi" @click="toAddress">
          <div class="tit">{{provinceName+cityName+areaName+receiving_address}}</div>
          <div class="name">{{receiving_name}}</div>
          <div class="number">{{receiving_phone}}</div>
          <div class="next"></div>
        </div>
        <div class="xian"></div>
        <div class="time">
          <div class="l">送达时间</div>
          <div class="r" @click="popuptime">
            {{timetext}}

          </div>
          <div class="icon"></div>
        </div>
      </div>
      <div class="zhifufangshi">
        <div class="l">支付</div>
        <div class="r">在线支付</div>
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
        <div class="baozuanfei">
          <div class="l">包装费</div>
          <div class="r">￥12</div>
        </div>
        <div class="peishonfei">
          <div class="l">配送费</div>
          <div class="r">￥8</div>
        </div>
        <div class="xian"></div>
        <div class="zonji">

          <div class="r">￥<span>128.00</span></div>
          <div class="l">小计</div>
        </div>
      </div>
      <div class="beizu">
        <div class="beizhu1">

          <van-field v-model="text" label="备注" placeholder='选填，您可以按照您的需求填写...'/>
        </div>
        <div class="beizhunumber">
          <div class="l">餐具数量</div>

          <div class="icon"></div>
          <div class="r" @click="popupcanju">{{tableware}}</div>
        </div>
      </div>
      <div class="lijizhifu">
        <div class="l">￥<span>128.00</span></div>
        <div class="r"  @click="createOrder">立即支付</div>
      </div>
    </div>
    <van-popup
      v-model="timeshow"
      close-icon-position="top-right"
      position="bottom"

      :style="{ height: '250px' }"
    >
      <div class="puptit">选择预计送达时间
        <div class="iconx" @click="closex"></div>
      </div>
      <van-tree-select
        :items="items"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-nav="timeselect1"
        @click-item="timeselect2"

      />


    </van-popup>
    <van-popup
      v-model="canjushow"
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
    name: 'peishon',
    data() {
      return {
        timeshow: false,
        items: [
          {text:  this.jt, children: [{text: '12', id: 1}, {text: '13', id: 2}, {text: '14', id: 3}]},
          {text: this.mt, children: [{text: '1', id: 4}, {text: '2', id: 5}]}
        ],
        activeId: 0,
        activeIndex: 0,
        text: '',
        canjushow: false,
        columns: ['无需餐具', '2份', '4份', '6份', '8份', '10份以上'],
        timetext:'未选择(必选)',
        timeindex:0,
        tableware:'无需餐具',
        areaName:'',
        cityName:'',
        provinceName:'',
        receiving_address:'',
        receiving_name:'',
        receiving_phone:'',
        jt:'',
        mt:""

      }
    },
    methods: {
      //切换页面

      qieye(data) {
        if (data == 1) {
          this.$router.push('/diancan/peishon')
        } else if (data == 2) {
          this.$router.push('/diancan/dianlei')

        }

      },
      //弹出时间选择
      popuptime() {
        this.timeshow = true
      },
      back() {

        this.$router.push('/diancan/diancancaipin')

      },
      closex() {
        this.timeshow = false

      },
      onChange(picker, value, index) {
        // alert(`当前值：${value}, 当前索引：${index}`);
        this.tableware=value
      },
      //弹出餐具选择
      popupcanju() {
        this.canjushow = true

      },
      //  获取收货默认地址信息
      getAddress(){
        let req={
          user_id : localStorage.getItem('uid'),

        }
        this.Api.post('api/user/default_address',req).then(res=>{
          if (res.code==0){
            if (res.data){
            this.areaName=res.data.area.name
             this.cityName=res.data.city.name
             this.provinceName=res.data.province.name
            this.receiving_address=res.data.receiving_address
            this.receiving_name=res.data.receiving_name
            this.receiving_phone=res.data.receiving_phone
            console.log('默认地址',res);
            } else {
              this.addDes = '暂无收货地址,请设置'
            }
          }

 //area   .name
 //city   .name
//province .name
//   receiving_address: "无"
// receiving_name: "river"
// receiving_phone: "17318630224
        }).catch(err=>{
          console.log(err);
        })
      },
      //前往收货地址列表
      toAddress(){
        this.$router.push('/receipt')
      },
      timeselect1(index){
        this.timeindex=index
        console.log(this.timeindex);
      },
      timeselect2(data){
        let text=this.items[this.timeindex].text
        //this.items[index].text
        text+=' '+data.text
        this.timetext=text
        console.log(this.timetext);

      },
      //创建订单
      createOrder(){
        let req={
          restaurant_id:localStorage.getItem('restaurant_id'),
          remarks:'',
          // address_id: '',
          // reserve_time: '',
          // reserve_time_point: '',
          // reserve_num: '',
          // room_id: '',
          // type:0
        }
        this.Api.post('/api/reserve/make_reserve',req).then(res=>{
          console.log('成功打印',res);
        }).catch(err=>{
          console.log(err);
        })
      },
      //添加时间
      addTime(){
        //获取今天
        //最晚12点
        let jt=new Date()
        var weekday=new Array(7);
        weekday[0]="周日";
        weekday[1]="周一";
        weekday[2]="周二";
        weekday[3]="周三";
        weekday[4]="周四";
        weekday[5]="周五";
        weekday[6]="周六";
        console.log('今天',weekday[jt.getDay()]);
        this.jt=`今天(${weekday[jt.getDay()]})`
        let mt
        if (jt.getDay()==6){
          mt=0
        }else {
          mt=jt.getDay()+1
        }

        console.log('明天',weekday[mt]);
        this.mt=`明天(${weekday[mt]})`
        console.log(this.jt, this.mt);
      }
    },
    beforeCreate() {
      this.getAddress()
      this.addTime()
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

  .peishon1 {
    position: relative;
  }

  .peishon {
    width: 100%;
    height: 100%;
    background: #f2f2f2;

    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }

    color: black;
    position: relative;

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
        width: 313px;
        height: 66px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px 10px 0px 0px;
        position: absolute;
        top: 18px;
        left: 18px;
        z-index: 999;
        text-align: center;
        line-height: 66px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }

      .l:after {
        content: '';
        display: block;
        width: 35px;
        height: 66px;
        position: absolute;
        transform: skewX(30deg);
        background: rgba(255, 255, 255, 1);
        border-top-right-radius: 8px;
        top: 0;
        right: -20px;
      }

      .r {
        width: 413px;
        height: 66px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.8;
        border-radius: 16px 10px 0px 0px;
        position: absolute;
        top: 28px;
        left: 310px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        line-height: 66px;

      }
    }

    .dizishijian {
      position: relative;

      width: 714px;
      height: 238px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0px 16px 16px 16px;
      margin-top: -14px;
      margin-left: 18px;

      .dizi {
        width: 100%;
        height: 145px;

        z-index: 99999;

        .tit {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          padding-top: 36px;
          padding-left: 31px;
        }

        .name {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          padding-top: 23px;
          padding-left: 31px;
          float: left;
        }

        .number {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          padding-top: 25px;
          padding-left: 163px;
          float: left;

        }

        .next {
          width: 13px;
          height: 26px;
          background: url("../../assets/next.png") center center;
          background-size: cover;
          float: right;
          margin-top: 13px;
          margin-right: 30px;
        }
      }

      .xian {
        width: 654px;
        height: 2px;
        background: rgba(238, 238, 238, 1);
        margin-left: 30px;
        z-index: -1;
      }

      .time {
        overflow: hidden;

        .l {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          padding-left: 31px;
          padding-top: 29px;
          float: left;
        }

        .r {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(251, 127, 56, 1);
          float: right;
          padding-top: 29px;
          padding-right: 56px;
        }

        .icon {
          width: 13px;
          height: 26px;
          background: url("../../assets/next.png") center center;
          background-size: cover;
          position: absolute;
          bottom: 33px;
          right: 30px;
        }

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

      .r {

        float: right;
        padding-top: 30px;
        padding-right: 33px;
      }

      .l {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(17, 17, 17, 1);
        float: left;
        padding-top: 30px;
        padding-left: 30px;
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

      .baozuanfei {
        overflow: hidden;

        .l {
          float: left;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);
          padding-left: 44px;
          padding-top: 34px;
        }

        .r {
          float: right;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);
          padding-right: 31px;
          padding-top: 34px;

        }
      }

      .peishonfei {

        overflow: hidden;

        .l {
          float: left;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);
          padding-left: 44px;
          padding-top: 34px;
        }

        .r {
          float: right;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);
          padding-right: 31px;
          padding-top: 34px;

        }
      }

      .xian {
        width: 654px;
        height: 2px;
        background: rgba(238, 238, 238, 1);
        margin-left: 30px;
        margin-top: 29px;
        position: relative;
        z-index: 1;
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

    .beizu {
      width: 714px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
      border-radius: 24px;
      margin-top: 12px;
      margin-left: 18px;

      .beizhu1 {
        overflow: hidden;

        /deep/ .van-field {
          border-radius: 24px;
        }
      }

      /deep/ .van-cell__title {
        padding-left: 10px;
      }

      .beizhunumber {
        overflow: hidden;
        padding-bottom: 20px;

        .l {
          float: left;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(17, 17, 17, 1);

          padding-left: 43px;
        }

        .r {
          float: right;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);

          padding-right: 13px;
        }

        .icon {
          width: 13px;
          height: 26px;
          background: url("../../assets/next.png") center center;
          background-size: cover;
          float: right;
          margin-right: 30px;

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

      .l {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 254, 254, 1);
        float: left;
        padding-left: 86px;
        padding-top: 33px;

        span {
          font-size: 40px;

        }
      }

      .r {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(254, 254, 254, 1);
        float: right;
        padding-top: 33px;
        padding-right: 96px;

      }
    }
  }

  .puptit {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding-top: 30px;
    text-align: center;


  }

  .iconx {
    background: url("../../assets/guanbix.png") center center;
    background-size: cover;
    width: 22px;
    height: 22px;
    position: absolute;
    top: 30px;
    right: 30px;
  }
</style>
