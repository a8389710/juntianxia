<template>
  <div class="roomSucc">
    <div class="succ-box">
      <van-nav-bar
        left-arrow
        @click-left="back"
        color="#fff"
        :border="false"
      /> 
      <p class="text-succ">包间预约成功！</p>
      <p class="text-tip">请务必准时到店就餐，逾时1小时预约将自动取消，包间不保留！</p>
      <van-steps nactive-icon="weapp-nav" :active="active" active-color="#fff" active-icon="checked" class="steps"
                 ref="steps">
        <van-step>预约成功</van-step>
        <van-step>到店就餐</van-step>
        <van-step>订单完成</van-step>
      </van-steps>
    </div>

    <div class="reserve-info">
      <p class="name">筠天下-{{pri_name}}</p>
      <van-divider/>
      <p class="info">
        <span class="info-name">时间人数</span>
        <span>{{orderInfo.reserve_time}} {{orderInfo.reserve_time_point}}，{{orderInfo.reserve_num}}人</span>
      </p>
      <p class="info">
        <span class="info-name">位置要求</span>
        <span>{{pri_name}}</span>
      </p>
      <p class="info">
        <span class="info-name">联系方式</span>
        <span>{{orderInfo.name}} {{orderInfo.phone}}</span>
      </p>
      <div class="btns">
        <div class="to-food" @click="toReserveFood">预定菜品</div>
        <div class="cancel" @click="cancel">取消订单</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Dialog} from 'vant';

  export default {
    data() {
      return {
        list: ['fdsaf', 'fdsafdsa,fdsafdsa'],
        result: [],
        value1: '',
        value2: '',
        active: 0,
        orderInfo: [],
        reserve_id: localStorage.getItem('reserve_id'),
        pri_name: ''

      };
    },
    methods: {
      back() { 
        this.$router.back(-1);
      },
      toReserveFood() {
        //预定菜品
        // this.$router.push('/reserve/reservefood');
        this.$router.push({
          path:'/diancancaipin',
          query:{
            type:'diannei',
            orderId:this.$route.query.orderId
          }
        });
      },
      cancel() {
        Dialog.confirm({
          title: '提示',
          message: '确定要取消包间么？'
        }).then(() => {
          let req = {
            id: this.reserve_id,
          }
          //取消包间
          this.Api.get('api/reserve/del', req)
            .then(res => {
              //保存用户信息
              console.log(res.code);
              if (res.code == 0) {
                localStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
                this.$router.push('/roomcancel')
              }


            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          // on cancel
        });
      },
      getOrderInfo() {
        let req = {
          id: this.reserve_id,
        };
        this.Api.get('api/reserve/one', req)
          .then(res => {
            console.log('res',res);
            this.orderInfo = res.data;
            this.pri_name = this.orderInfo.room.private_name;
            console.log(this.pri_name);
            let destine_roomID=res.data.room_id
            //预定的房间id
            localStorage.setItem('destine_roomID',destine_roomID)
          })
          .catch(err => {
            console.log(err)
          })


      }
    },
    mounted() {
      this.getOrderInfo();
    }
  };
</script>
<style lang="less" scoped>
  /deep/ .steps .van-step--horizontal .van-step__circle-container {
    background: transparent;
    width: 10px;
    text-align: center;
    vertical-align: middle;
  }

  .roomSucc {
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
      background: linear-gradient(to right, #FF9B43, #FB8038);
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

    // 预定详情
    .reserve-info {
      width: 84%;
      margin: 0 auto;
      padding: 5% 2%;
      background: #fff;
      position: relative;
      top: -6%;
      border-radius: 12px;

      .name {
        font-size: 0.9rem;
      }

      .info {
        font-size: 0.8rem;
        margin-bottom: 1rem;
        color: #444;

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
</style>
