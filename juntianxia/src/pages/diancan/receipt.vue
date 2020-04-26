<template>
  <div class="receipt">
    <van-nav-bar title="收货地址" :border="false">
      <img src="../../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <div class="list">
      <div v-if="address.length == 0" style="background-color: #f6f6f6; color: #666666;text-align: center;margin-top: 20px;font-size: 14px;" >暂时没有地址信息....</div>
      <div class="li" v-for="item in address" :key="item.id">
        <div class="l">
          <div style="padding-left:4vw" class="xinxi">
          <van-tag class="addrTips"  color="#fb7f38" v-if="item.is_default == 1" type="danger">默认地址</van-tag>
            <span class="xinmin">{{item.receiving_name}}</span>
            <span class="shouji">{{item.receiving_phone}}</span>
          </div>
          <div class="dizhi">
            <p class="dizhi-address">
              {{item.receiving_address}}
            </p>
            </div>
        </div>
        <div class="c"></div>
        <div class="r shanchu" @click="removeAdd(item)">删除</div>
        <div class="r bianji" @click="toredact(item)">编辑</div>
      </div>
    </div>
     <div class="tianjia" @click="toappend">
       <div class="t"></div>
       <div class="b">添加地址</div>
     </div>
  </div>
</template>
<script>
import { Toast } from 'vant';

  export default {
    data() {
      return {
        address: [],
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
      // 删除地址
      removeAdd(item){
        let req = {
          id:item.id
        }
        this.Api.post('api/user_receiving_address/del',req)
          .then(res => {
            if (res.code == 0) {
              Toast.success(res.msg)
              this.getaddress()
            } else {
              Toast.error(res.msg)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    //编辑地址
      toredact(item){
        localStorage.setItem('addrInfo',JSON.stringify(item))
        this.$router.push({
          path:'/append',
          query:{
            id:item.id,
          }
        })

      },
      //获取地址列表
      getaddress(){
        let req={
          user_id:localStorage.getItem('uid'),
          getall:true,
          list_rows:10,
          page: 1
        }
        this.Api.post('api/User_Receiving_Address/lists',req)
          .then(res => {
            this.address = res.data .data
            console.log('成功请求', this.address);
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
  .addrTips{
    position: relative;
    padding-left:1vw;
    display: inline-block;
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
            padding:2vw 8vw;
            letter-spacing: 1px;
            font-size:24px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(34,34,34,1);
            .dizhi-address{
              width: 80%;
            }
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
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:42px;
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          right:0px;
        }
        .shanchu{
          right:5vw;
        }
        .bianji{
          right:15vw;
        }
      }
    }
    .tianjia{
      position: fixed;
      bottom: 20px;
      background-color: #ffffff;
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
