<template>
  <div class="cart">
    <van-nav-bar title="餐车" :border="false">
      <img src="../../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>
    <!-- 加载列表 -->
    <!--    <van-checkbox-group v-model="result" ref="checkboxGroup">-->
    <van-list
      class="food-list"
      @load="onLoad"
    >
      <!-- 一个商品卡 -->
      <van-card
        v-for="(item,index) in cartList"
        :thumb="item.goods_url"
        style="background: #fff;padding-bottom: 0;"
        :key="index"
      >
        <div slot="title" class="title">{{item.goods_name}}</div>
        <div slot="desc">
          <van-rate
            v-model="star_val"
            allow-half
            void-icon="star"
            void-color="#eee"
            size="14px"
          />
          <span class="star-num">{{item.score}}分</span>
          <span class="sold-num">已售{{item.num}}</span>

        </div>
        <div slot="desc" class="desc">
          {{item.goods_content}}
        </div>
        <div slot="price" class="price">￥{{item.goods_price}}</div>
        <div slot="footer" class="check-box">
          <van-checkbox
            ref="checkboxes"
            :name="item.goods_name"
            slot="right-icon"
            checked-color="#FD8634"
            v-model="item.isSelect"
            @click="check(item)"
            @change="changeItem(item)"
            :disabled="item.pot==0"
          />



        </div>
        <div slot="footer" class="stepper">
          <van-stepper  v-model="item.goods_num" button-size="26px"  :disabled="item.pot==0" />
        </div>

        <div slot="footer" class="isCost" v-show="item.is_pay==1">
          <img src="../../assets/img/cost.png" alt="">
        </div>

      </van-card>
      <!-- 一个商品卡结束 -->

    </van-list>
    <van-submit-bar
      :price="getTotal.totalPrice*100"
      button-text="立即预定"
      @submit="toPay"
    >
      <van-checkbox v-model="checked"  checked-color="#FD8634" @click="checkAll" >全选</van-checkbox>
      <!-- <van-checkbox @click="selectCart(isSelectAll)" v-model="isSelectAll" >全选</van-checkbox> -->
      <!-- <van-checkbox @click="selectCart(isSelectAll)" v-model="isSelectAll" >全选</van-checkbox> -->
      <span slot="tip">
          支付即表示您已同意付费预定规则说明
        </span>
    </van-submit-bar>
    <!--    </van-checkbox-group>-->
  </div>
</template>
<script>
  import {Dialog} from 'vant';

  export default {
    data() {
      return {
        cartList: [

        ],
        loading: false,
        finished: false,
        'star_val': 4.5,
        value: 1,
        checked: true,
        money: 0,
        reserve_id: localStorage.getItem('reserve_id'),
        rid: localStorage.getItem('rid'),
        info: this.cartList,
      };
    },
    methods: {
      a(item) {
        console.log(item);
      },
      check(item) {
        // item.isSelect = !item.isSelect;
        console.log(item.isSelect);
      },
      toggle(index) {
        console.log(index);
        // this.$refs.checkboxes[index].toggle();
      },
      checkAll() {
        for (var i=0;i<this.cartList.length;i++){
          if (this.cartList[i].pot!=0){
            this.cartList[i].isSelect=!this.checked

          }
        }
        console.log(this.cartList,this.checked);
      },
      changeItem(item) {
        console.log(item);

//  goods_content: "延年益寿"
// goods_id: 12
// goods_name: "养生清汤"
// goods_num: 1
// goods_price: "0.01"
// goods_url: "http://47.108.70.59/public/uploads/img/20200108/94c684b7295b7005bbac01c2e7fea4df.jpg"
// isSelect: false
// is_pay: 1
// num: 200
// score: 4.4
//

        if (item.isSelect) {
          //增加

          let req = {
            restaurant_id:localStorage.getItem('restaurant_id'),
            user_id: localStorage.getItem('uid'),
            goods_id: item.goods_id,
            goods_price: item.goods_price,
            goods_num: item.goods_num,
            room_id: localStorage.getItem('destine_roomID'),
            type: item.pot
            //type为0的话是锅底
          };
          console.log('req', req);

          this.Api.post('api/dining_car/add', req)
            .then(data => {
              if (data.code == 0) {
                console.log('成功');
              }
              console.log('成功');

            })
            .catch(err => {
              console.log(err)

            })

        } else {
          //减少
          let req = {

            id: item.goods_id,
            goods_num:item.goods_num,
            room_id:localStorage.getItem('destine_roomID'),
            restaurant_id:localStorage.getItem('restaurant_id'),
            type: item.pot

            //type为0的话是锅底
          };


          this.Api.post('api/dining_car/del', req)
            .then(data => {
              if (data.code == 0) {
                console.log('成功');
              }
              console.log('成功');

            })
            .catch(err => {
              console.log(err)

            })

        }
      },
      back() {
        this.$router.back(-1);
      },
      getCartList() {
        let req = {
          user_id: localStorage.getItem('uid'),
          list_rows: 999,
          room_id: localStorage.getItem('destine_roomID'),
          restaurant_id: localStorage.getItem('restaurant_id'),
          page: 1
        };
        //没数据
        console.log('req', req);
        this.Api.get('api/dining_car/lists', req)
          .then(res => {
            if (res.code==0){
              console.log('餐车列表', res.data);
              if(JSON.stringify(res.data.pot) !== '{}'){
                console.log('添加锅底',res.data.pot);

                this.cartList.push({
                  goods_url:res.data.pot.pot.pot_url,
                  goods_name:res.data.pot.pot.pot_name,
                  score:4.4,
                  isSelect:true,
                  num:200,
                  goods_num:res.data.pot.goods_num,
                  is_pay:1,
                  goods_id:res.data.pot.goods_id,
                  goods_content:res.data.pot.pot.pot_title,
                  goods_price:res.data.pot.pot.pot_price,
                  pot:0
                })
                console.log(this.cartList);
              }

              if(JSON.stringify(res.data.goods) !== '[]'){
                console.log('添加菜品');

                for (var i=0;i<res.data.goods.length;i++){
                  console.log(res.data.goods[i]);
                  this.cartList.push({
                    goods_url:res.data.goods[i].goods.goods_url,
                    goods_name:res.data.goods[i].goods.goods_name,
                    score:4.4,
                    isSelect:true,
                    num:200,
                    goods_num:res.data.goods[i].goods_num,
                    is_pay:1,
                    goods_id:res.data.goods[i].goods_id,
                    goods_content:res.data.goods[i].goods.goods_content,
                    goods_price:res.data.goods[i].goods_price,
                    pot:1

                  })
                }


              }

            }else {
              console.log('请求失败');
            }

            // this.cartList = res.data.data;
            // var _this = this;
            // //为productList添加select（是否选中）字段，初始值为true
            // this.cartList.map(function (item) {
            //   _this.$set(item, 'isSelect', false);
            //   _this.$set(item, 'restaurant_id', _this.rid);
            // });
            // console.log('餐车', res, this.cartList);
            //遍历添加锅和菜品

          })
          .catch(err => {
            console.log('哈哈', err)
          })

      },
      onLoad() {
      },
      toPay() {

        if (this.getTotal.totalPrice != 0) {
            this.yfk = this.getTotal.totalYfk;
            console.log(this.yfk);
            localStorage.setItem('yfk', this.yfk);
            console.log('打印', this.commitList);
            //提交订单
            let req = {
              reserve_id: this.reserve_id,
              add_type: 0,
              info: JSON.stringify(this.info)
            };

            this.Api.post('api/dining_car/addreserve', req)
              .then(res => {

                if (res.code == 0) {
                  console.log('添加订单', res);
                  console.log('添加订单', res);

                  localStorage.setItem('total_money', this.getTotal.totalPrice);

                  this.$router.push('/diancan/peishon');
                }
                console.log('添加订单失败', this.reserve_id, res, req);

              })
              .catch(err => {
                console.log(err)
              })

        } else {
          Dialog.alert({
            title: '提示！',
            message: '还没有选择菜品哦~'
          })
        }


      },
      //
      selectCart: function (_isSelect) {
        //遍历cartList，全部取反
        for (var i = 0, len = this.cartList.length; i < len; i++) {
          // this.cartList[i].isSelect = !this.cartList[i].isSelect;
          this.cartList[i].isSelect = !_isSelect;
        }
      },

    },


    computed: {
      //检测是否全选
      isSelectAll: function () {
        //如果cartList中每一条数据的isSelect都为true，返回true，否则返回false;
        return this.cartList.every(function (val) {
          return val.isSelect
        });
      },
      getTotal: function () {
        var prolist = this.cartList.filter(function (val) {
            return val.isSelect
          }),
          totalPri = 0;
        for (var i = 0, len = prolist.length; i < len; i++) {
          totalPri += prolist[i].goods_price * prolist[i].goods_num;
        }
        return {totalNum: prolist.length, totalPrice: totalPri}
      },
    },
    created() {
      this.getCartList();
      // console.log(this.cartList);
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .van-card {
    padding: 8px;
  }

  .cart {
    width: 100%;
    height: 100%;
    background: #eee;

    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }

    .header-tips {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }

    .info-img {
      width: 79px;
      height: 79px;
      border-radius: 50%;
      background: yellowgreen;
      // margin-top: 25px;
      margin-right: 13px;
    }

    .label-style {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      min-width: 350px;
    }

    .value-style {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    .food-list {
      padding: 0.4rem;

      .title {
        font-size: 1rem;
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: 10px;
      }

      .star-num {
        display: inline-block;
        width: 2.2rem;
      }

      .price {
        font-size: 1rem;
        color: #FC934D;
        margin-top: 8px;
      }

      .desc {
        margin-top: 5px;
        color: #898989;
      }

      span {
        color: #666;
      }

      .van-card {
        background: #fff;
        border-radius: 4px;
        padding: 8px;
        // padding-bottom: 0;
        .van-image {
          border-radius: 4px;
        }

        .check-box {
          position: relative;
          top: -3.5rem;
        }

        .van-card__thumb {
          width: 80px;
          height: 80px;
        }

        .van-card__header {
          margin-left: 8%;
        }

        .stepper {
          margin-top: -3rem;
        }

        .isCost {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      .van-card:not(:first-child) {
        margin-top: 6px;
      }

    }

    .van-submit-bar__bar {
      padding-right: 0;

      .van-submit-bar__button {
        border-radius: 0;
        height: 100%;
        background: linear-gradient(to right, orange, #FD8835);
      }
    }
  }
</style>
