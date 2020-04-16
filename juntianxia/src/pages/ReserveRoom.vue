<template>
  <div class="reserveRoom">
    <van-nav-bar :title="'筠天下-'+roomInfo.private_name" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <div class="notice-box">
      <van-notice-bar
        text="预定成功后请准时到店哦,超时未到餐位不保留."
        left-icon="volume-o"
      />
    </div>
    <div class="detail">
      <div class="content">
        <div class="user">
          <div class="name">
            <van-icon name="contact" size='20px'style="vertical-align: sub;"/>
            <input type="text" placeholder="请输入联系人" v-model="userName" style="width: 50%;">
            <van-radio-group v-model="radio">
              <van-radio name="1" icon-size='14px'>女士</van-radio>
              <van-radio name="2" icon-size='14px'>先生</van-radio>
            </van-radio-group>
            <van-divider />
          </div>
          <div class="tel">
            <van-icon name="phone-o" size='20px'style="vertical-align: sub;"/>
            <input type="tel" placeholder="请输入联系电话" v-model="userTel" maxlength="11">
            <van-divider />
          </div>
          <div class="remarks">
            <van-icon name="orders-o" size='20px'style="vertical-align: sub;"/>
            <input type="tel" placeholder="留言备注,我们将尽量安排" v-model="userRemark" maxlength="25" style="width: 80%;">
            <van-divider />
          </div>
        </div>

        <div class="reserve-detail">
          <ul class="num">
            <li v-for="(item,key) in numList" :class="numActive ==key?'active':''" @click="numChange(key)">{{item}}人</li>
          </ul>
          <ul class="date">
            <li v-for="(item,key) in dateList" :class="dateActive ==key?'active':''" @click="dateChange(key)">{{item.val}}</li>
          </ul>
          <ul class="time">
            <li v-for="(item,key) in timeList" :class="timeActive ==key?'active':''" @click="timeChange(key)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="btn" @click="toSucc">立即预约</div>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'vant';
export default {
  data() {
    return {
      numList: ['6','7','8','9','10','11','12',],
      dateList: ['12.21','12.22','12.23','12.24','12.25','12.25','12.25'],
      timeList: ['17:00','17:30','18:00','18:30','19:00','19:30','20:00',],
      result:[],
      value1:'',
      value2:'',
      radio:'1',
      userName:'',
      userTel:localStorage.getItem('tel'),
      userRemark:'',
      numActive:0,
      dateActive:0,
      timeActive:0,
      roomInfo:[],
      restaurant_id:'',
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    numChange(key) {
      this.numActive = key;
    },
    dateChange(key) {
      this.dateActive = key;
      this.getTime();
    },
    timeChange(key) {
      this.timeActive = key;
    },
    getdate() {
    		      var date = new Date();
    		      var seperator1 = "-";
    		      var year = date.getFullYear();
    		      var month = date.getMonth() + 1;
    		      var strDate = date.getDate();

    		      if (month >= 1 && month <= 9) {
    		        	month = "0" + month;
    		      }
    		      if (strDate >= 0 && strDate <= 9) {
    		      	  strDate = "0" + strDate;
    		      }
    		      var currentdate = year + " 年 " + month + " 月 " + strDate + " 日 ";
    		      return currentdate;
    	    },
    toSucc(){
       //获取用户的信息
      //  增加一个判断,姓名必填
      if(this.userName==''){
        Toast('请填写联系人');

      }else {
        let req = {
          user_id: localStorage.getItem('uid'),
          restaurant_id: this.restaurant_id,
          room_id: this.roomInfo.id,
          name: this.userName,
          sex: this.radio,
          phone: this.userTel,
          reserve_num: this.numList[this.numActive],
          reserve_time: this.dateList[this.dateActive].key,
          reserve_time_point: this.timeList[this.timeActive],
          remarks: this.userRemark,
        };
        console.log(req);

        this.Api.get('api/reserve/add',req)
          .then(res =>{
            console.log(res);

            if(res.code == 0){
              localStorage.setItem('reserve_id',res.data.id);
              console.log(res.data.id);
              //预定成功 跳转预定成功页面
              this.$router.push('/roomsucc');
              // this.$router.push('/reserve/reservefood');
            }else if(res.msg == "已存在预约中的订单！"){
              // localStorage.setItem('reserve_id',res.data.id);
              // this.$router.push('/roomsucc');预定成功跳转预定成功
              // this.$router.push('/reserve/reservefood');
              // this.$router.push('/yuyuechengong');
              Toast(res.msg);

            }else{
              Toast(res.msg);
            }


          })
          .catch(err =>{
            console.log(err);
            Toast(err);
          })
      }


    },
    getDataList(){

    },
    getTime(){
      let req = {
        room_id : this.roomInfo.id,
        reserve_time : this.getdate()
      }
      this.Api.get('/api/reserve/timeList',req)
      		.then(res =>{
            console.log(res);
            this.timeList = res.data.list;
      		})
      		.catch(err =>{
      		  console.log(err)
      		})
    }
  },
  mounted() {
  	this.roomInfo = JSON.parse(localStorage.getItem('roomInfo'));
    console.log(this.roomInfo);
    var r = JSON.parse(localStorage.getItem('restaurantInfo'));
    this.restaurant_id = r.id;
    console.log(this.restaurant_id);
    this.Api.get('/api/pay_order/getdate')
    		.then(res =>{
          console.log('hh',res);
          this.dateList = res.data;
    		})
    		.catch(err =>{
          console.log('jj');
          console.log(err)
    		})

  }
};
</script>
<style lang="less" scoped>
  .reserveRoom {
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
    .notice-box{
      padding-bottom: 2%;
      background: #fff;
      .van-notice-bar{
        width: 84%;
        margin: 0 auto;
        border-radius: 50px;
        height: auto;
      }
    }

    .detail{
      .content{
        background: #fff;
        border-radius: 6px;
        margin-top: 2%;
        padding: 1rem;
        .user{
          color: #333;
          .van-divider{
            padding-left: 4%;
            margin: 10px 0;
          }
          >div{
            overflow: hidden;
            input{
              border: none;
            }
            input::-webkit-input-placeholder{
              color: #ccc;
              font-size: 0.75rem;
            }
            .van-radio-group{
              float: right;
              overflow: hidden;
              font-size: 0.875rem;
              width: auto;
              .van-radio{
                float: left;
                margin-left: 0.625rem;
              }
            }
          }
        }
        .reserve-detail{
          >ul{
            width: 100%;
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            margin: 1.2rem 0;
            li{
              display: inline-block;
              width: 3rem;
              margin-right: 2%;
              text-align: center;
              padding: 10px 0;
              border-radius: 20px;
              font-size: 0.75rem;
            }
            .active{
              color: #FB7F38;
              background: #F7EBE6;
            }
          }
          .date{
            margin: 2rem 0;
          }
          .scroll-wrapper::-webkit-scrollbar{
              display: none;
          }
        }
      }
      .btn{
        border-radius: 50px;
        background: orange;
        color: #fff;
        width: 80%;
        margin: 0 auto;
        margin-top: 25%;
        text-align: center;
        padding: 18px 0;
      }
    }

  }
</style>
