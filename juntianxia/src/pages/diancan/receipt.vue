<template>
  <div class="receipt">
    <van-nav-bar title="收货地址" :border="false">
      <img src="../../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <div class="list">
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r" @click="toredact">编辑</div>
      </div>
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r">编辑</div>
      </div>
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r">编辑</div>
      </div>
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r">编辑</div>
      </div>
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r">编辑</div>
      </div>
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r">编辑</div>
      </div>
      <div class="li">
        <div class="l">
          <div class="xinxi">
            <span class="xinmin">萱萱</span>
            <span class="shouji">18528448981</span>
          </div>
          <div class="dizhi">四川省成都市双流区蜀南春军大源里1-2-2303号</div>
        </div>
        <div class="c"></div>
        <div class="r">编辑</div>
      </div>
    </div>
     <div class="tianjia" @click="toappend">
       <div class="t"></div>
       <div class="b">添加地址</div>
     </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {

      };
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      //添加地址
      toappend(){
        this.$router.push('/append')
      },
    //编辑地址
      toredact(){
        this.$router.push('/redact')

      },
      //获取地址列表
      getaddress(){
        let req={
          user_id:localStorage.getItem('uid'),
          getall:true
        }
        this.Api.get('api/User_Receiving_Address/lists',req)
          .then(res => {
            console.log('成功请求', res);
          })
          .catch(err => {
            console.log(err)
          })
      }
    },



    computed:{},
    mounted() {
      this.getaddress()
    }
  }
</script>
<style lang="less" scoped>
  /deep/.van-card{
    padding: 8px;
  }
  /deep/ .van-nav-bar{
    font-size:36px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(17,17,17,1);

  }
  .receipt {
    width: 100%;
    height: 100%;
    background: RGBA(246, 246, 246, 1);
    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }
    .list{
      background: RGBA(255, 255, 255, 1);
      .li{
        height: 120px;
        width: 100%;
        position: relative;
        .l{
          overflow: hidden;
          float: left;
          padding-top: 22px;
          .xinmin{
            font-size:28px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(34,34,34,1);


            padding-left: 30px;
          }
          .shouji{
            font-size:28px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(34,34,34,1);


            padding-left: 60px;
          }
          .dizhi{
            font-size:24px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(34,34,34,1);

            padding-left:30px;
            padding-top: 21px;

          }
        }
        .c{
          position: absolute;
          top: 35px;
          left: 652px;
          width:1px;
          height:50px;
          background:rgba(225,225,225,1);
        }
        .r{
          float: right;
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:42px;
          padding-right: 30px;
          padding-top: 48px;
        }
      }
    }
    .tianjia{
      width:100%;
      text-align: center;
      padding-top: 100px;
      .t{
        display: inline-block;
        height: 40px;
        width: 40px;
        background: url("../../assets/tianjia@2x.png") center center;
        background-size: cover;

      }
      .b{
        font-size:30px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(34,34,34,1);
        line-height:42px;
        padding-top: 20px;
      }
    }

  }
</style>
