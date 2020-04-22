<template>
  <div class="roomCancel">
    <div class="succ-box">
      <van-nav-bar
        left-arrow
        @click-left="back"
        color="#fff"
        :border="false"
      >
      </van-nav-bar>
    </div>
    <div class="reserve-info">
      <p class="text-cancel">预约取消成功！</p>
      <p class="name">筠天下-{{info.room.private_name}}</p>
      <van-divider />
      <p class="info">
        <span class="info-name">时间人数</span>
        <span>{{info.create_time}}，{{info.reserve_num}}人</span>
      </p>
      <p class="info">
        <span class="info-name">位置要求</span>
        <span>霁影轩</span>
      </p>
      <p class="info">
        <span class="info-name">联系方式</span>
        <span>{{info.name}} {{info.phone}}</span>
      </p>
      <div class="btns">
        <div class="to-reserve" @click="toReserveRoom">重新预定</div>
        <div class="toHome" @click="toHome">返回首页</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Dialog } from 'vant';
export default {
  data() {
    return {
      list: ['fdsaf','fdsafdsa,fdsafdsa'],
      result:[],
      value1:'',
      value2:'',
      active: 0,
      info:{}
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toReserveRoom(){
      this.$router.push('/reserveroom');
    },
    toHome(){
      this.$router.push('/home');
    },
    cancel(){
      Dialog.confirm({
        title: '提示',
        message: '确定要取消包间么？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  },
  mounted() {
    //获取信息
   this.info=JSON.parse(localStorage.getItem('orderInfo'));
    console.log(this.info)
  }
};
</script>
<style lang="less" scoped>
  .roomCancel {
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
    // 预定详情
    .reserve-info{
      width: 84%;
      margin: 0 auto;
      padding: 5% 2%;
      background: #fff;
      position: relative;
      top: -6%;
      border-radius: 12px;
      .text-cancel{
        text-align: center;
        margin-bottom: 1rem;
      }
      .name{
        font-size: 0.9rem;
      }
      .info{
        font-size: 0.8rem;
        margin-bottom: 1rem;
        color: #444;
        .info-name{
          color: #999;
          margin-right: 0.5rem;
        }
      }
      overflow: hidden;
      .btns{
        overflow: hidden;
        >div{
          text-align: center;
          float: right;
          font-size: 0.75rem;
          color: #bbb;
          border: 1px solid #bbb;
          border-radius: 4px;
          padding: 5px;
          margin-left: 3%;

        }
        .to-food{
          float: left;
          color: #fff;
          padding: 18px 0;
          font-size: 0.9rem;
          letter-spacing: 2px;
          width: 72%;
          background: linear-gradient(to right,#FF9A43,#FB8038);
        }
        .cancel{

        }
      }
}
    .van-step--horizontal .van-step__circle-container{
      background: transparent!important;
    }
  }
</style>
