<template>
  <div class="reserve">
    <van-nav-bar
      title="菜品预定"
      left-arrow
      @click-left="back"
    />
    <div class="food-type" style="margin-top: 0;">锅底
      <div class="cance" @click="tocance"><span>{{this.cancenum}}</span></div>
    </div>

    <!-- 锅底列表 -->
    <div class="reserve-pot">

      <!-- 一个锅底 -->
      <div :class="(key%2 ==0)?left:right" v-for="(item,key) in potList" :key="item">
        <div class="img"><img :src="item.pot_url" alt=""></div>
        <div class="detail">
          <div>
            <p class="type">{{item.pot_name}}</p>
            <p class="desc">{{item.pot_title}}</p>
            <!-- <p class="desc-eng">Hemp and slightly spicy,soup base has material</p> -->
            <div class="gd">
              <p class="pot-choice"><span ref=ld v-for="(ld,index) in item.ld" :class="activeClass[index]?'active':''"
                                          @click="ldChecked(key,index)" :key="ld">{{ld}}</span></p>
              <p class="soup-choice"><span v-for="(tl,index) in item.tl" :class="activeClass[index]?'active':''"
                                           @click="tlChecked(key,index)" :key="tl">{{tl}}</span></p>
            </div>
            <p class="price">
              <span>¥{{item.pot_price}}</span>
              <van-icon name="add-o" size="22" @click="addPot(key)"/>
            </p>
          </div>
        </div>
      </div>
      <!-- 一个锅底结束 -->
    </div>


    <div class="cart">
      <div v-for="item in cartList" :key="item">
        <!-- 遍历cartList-->
        <p class="food-type">{{item.name}}</p>
        <!-- 加载列表 -->
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-list
            class="food-list"
            @load="onLoad"
          >
            <!-- 一个商品卡 -->
            <van-card
              v-for="(food,index) in item.data"
              :thumb="food.goods_url"
              style="background: #fff;padding-bottom: 0;width: 94%;margin: 0.4rem auto;"
              :key="index"
            >
              <div slot="title" class="title">{{food.goods_name}}</div>
              <div slot="desc">
                <van-rate
                  v-model="star_val"
                  allow-half
                  void-icon="star"
                  void-color="#eee"
                  size="14px"
                />
                <span class="star-num">{{food.score}}分</span>
                <span class="sold-num">库存：{{food.stock_num}}</span>

              </div>
              <div slot="desc" class="desc">
                {{food.goods_content}}
              </div>
              <div slot="price" class="price">￥{{food.price}}</div>
              <div slot="footer" class="check-box">
                <van-checkbox
                  ref="checkboxes"
                  :name="food.goods_name"
                  slot="right-icon"
                  checked-color="#FD8634"
                  v-model="food.isSelect"
                  @click="check(food)"
                />
              </div>
              <div slot="footer" class="stepper">
                <van-stepper v-model="food.goods_num" button-size="26px" @plus="num1(food.id,food.goods_num)"
                             @minus="num2(food.id,food.goods_num)"/>

              </div>

              <div slot="footer" class="isCost" v-show="food.is_pay==1" @click="costInfo">
                <img src="../../assets/img/cost.png" alt="">
              </div>

            </van-card>
            <!-- 一个商品卡结束 -->

          </van-list>

        </van-checkbox-group>
      </div>
      <van-submit-bar
        :price="this.getTotal.totalPrice*100"
        button-text="立即预定"
        @submit="toPay"
      >
        <!-- <van-checkbox @click="selectCart(isSelectAll)" v-model="isSelectAll" >全选</van-checkbox> -->
        <!-- <van-checkbox @click="selectCart(isSelectAll)" v-model="isSelectAll" >全选</van-checkbox> -->
        <span slot="tip">
              支付即表示您已同意付费预定规则说明
            </span>
      </van-submit-bar>
    </div>


    <!-- 餐车 -->

    <van-popup v-model="show" class="layer">
      <div class="middle">
        <p class="title">菜品清单</p>
        <ul class="list">
          <li v-for="item in commitList" :key="item">
            <span class="name">{{item.remarks}}</span>
            <span class="num">x{{item.goods_num}}</span>
            <span class="price">¥{{item.price}}</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p class="title">费用</p>
        <ul class="price">
          <li class="left">合计</li>
          <li class="right">￥{{this.getTotal.totalPrice}}</li>
        </ul>
      </div>
    </van-popup>

    <!-- <div class="icon-cart">
       <img src="../../assets/img/shopcar.png" alt="">
     </div> -->

    <van-icon name="shopping-cart-o" class="icon-cart" @click="layerShow"/>


    <!--    付费预订说明-->
    <div class="zhezao" @click="closeInfo"></div>
    <div class="explain">
      <ul>
        <li class="fufei">付费预订说明</li>
        <li class="fufei-one"><span></span> 商家对特殊菜品要求付费预订，预订价格为特殊菜品的价格。</li>
        <li class="guizhe">退款规则</li>
        <li class="fufei-two red"><span></span> 开餐六个小时前取消订单，付费预订金额自动退还；</li>
        <li class="fufei-two"><span></span> 到店就餐，付费预订用于抵消相应菜品餐费；</li>
        <li class="fufei-two"><span></span> 逾期取消订单/未到店就餐，付费预订金额不予退还。</li>
        <li class="xian"></li>
        <li class="zhidao" @click="closeInfo">我知道啦</li>
      </ul>

    </div>
  </div>
</template>

<script>
  import {Dialog} from 'vant';
  import {Toast} from 'vant';
  import {Popup} from 'vant';

  export default {
    data() {
      return {
        list: [],
        cartList: [],
        result: [],
        loading: false,
        finished: false,
        'star_val': 4.5,
        value: 1,
        checked: true,
        money: 0,
        reserve_id: localStorage.getItem('reserve_id'),
        rid: '',
        info: this.commitList,
        yfk: 0,
        commitList: [],
        loading: false,
        finished: false,
        soup: 0,
        potList: [],
        left: 'left',
        right: 'right',
        ld: '',
        tl: '',
        active: false,
        cartNum: 0,
        activeClass: [],
        allList: [],
        show: false,
        //菜品数量
        cancenum: 0,
        pot: false,
        pot_price: 0,
        pot_name: "",
        potlistobj: {}
      };
    },
    methods: {
      costInfo() {

        // Dialog({ message: '付费预定菜品说明' });
        //展示付费预订说明的样式
        let zhezao = document.getElementsByClassName('zhezao')[0]
        let explain = document.getElementsByClassName('explain')[0]
        zhezao.style.display = 'block'
        explain.style.display = 'block'
      },
      closeInfo() {
        //关闭付费预订说明的样式
        let zhezao = document.getElementsByClassName('zhezao')[0]
        let explain = document.getElementsByClassName('explain')[0]
        zhezao.style.display = 'none'
        explain.style.display = 'none'
      },
      ldChecked(key, l) {
        this.ld = this.potList[key].ld[l];
        console.log(this.ld);
      },
      tlChecked(key, t) {
        // this.tl = this.potList[key].tl[t];
        // console.log(this.tl);
        console.log(t);
        this.activeClass[key] = t;
        console.log(this.activeClass[t]);
      },
      toCart() {
        this.$router.push('/diancan/diancanchance');
      },
      addPot(key) {


        // //选择锅体
        // //检查是否预定包间
          // console.log(this.rid);
          let req = {
            restaurant_id: localStorage.getItem('restaurant_id'),
            goods_id: this.potList[key].id,
            room_id: localStorage.getItem('destine_roomID'),
            goods_num: 1,
            type:0
          };


          this.Api.post('api/dining_car/add', req)
            .then(data => {
              console.log('res'.data);


              if (data.code == 0) {
                //删除之前的锅信息
                // this.getTotal.totalPrice-=parseInt(this.pot_price)/2
                var arr = []
                //去掉原来的锅底
                for (var i = 0; i < this.commitList.length; i++) {
                  if (this.commitList[i].haspot) {

                  } else {
                    arr.push(this.commitList[i])
                  }

                }
                this.commitList = arr
                //添加锅底

                this.pot = true
                this.pot_name = this.potList[key].pot_name

                this.pot_price =Number(data.data.goods_price).toFixed(2)
                console.log('potprice', this.pot_price);

                this.potlistobj = {
                  remarks: this.pot_name,
                  goods_num: 1,
                  price: this.pot_price,
                  haspot: true,
                  id: this.potList[key].id,
                  guo: 1
                }


                // this.getTotal.totalPrice+=parseInt(res.data.pot_price)/2
                console.log('commitList', this.potlist);

                // localStorage.setItem('cartNum',this.cartNum);
                Toast('锅底添加成功！');
              }

            })
            .catch(err => {
              console.log(err)

            })

        }
      ,
      getPotList() {
        var _this = this;
        let req = {
          list_rows: 99,
          page: 1,
        };

        this.Api.get('api/pot/lists', req)
          .then(res => {

            console.log('锅底', res);
            this.potList = res.data.data;
            console.log(this.potList);
            //给每条锅底添加字段
            for (var i = 0; i < this.potList.length; i++) {
              this.activeClass.push(true);
            }
            console.log(this.activeClass);

          })
          .catch(err => {
            console.log(err)
          })

      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      // 锅底结束
      a(item) {
        console.log(item);
      },
      check(item) {


        //切换选择
        item.isSelect = !item.isSelect;
        console.log('item', item);
        if (item.isSelect) {
          //增加
          let req = {
            restaurant_id:localStorage.getItem('restaurant_id'),
            user_id: localStorage.getItem('uid'),
            goods_id: item.id,
            goods_price: item.price,
            goods_num: item.goods_num,
            room_id: localStorage.getItem('destine_roomID'),
            type: 1
            //type为0的话是锅底
          };
          console.log('req', req);

          this.Api.post('api/dining_car/add', req)
            .then(data => {
              if (data.code == 0) {
                console.log('成功');
              }
              console.log(data);


            })
            .catch(err => {
              console.log(err)

            })

        } else {
          //减少
          let req = {

            id: item.id,
            goods_num:item.goods_num,
            room_id:localStorage.getItem('destine_roomID'),
            restaurant_id:localStorage.getItem('restaurant_id')
            //type为0的话是锅底
          };
          console.log('req', req);

          this.Api.post('api/dining_car/del', req)
            .then(data => {
              console.log(data);
              if (data.code == 0) {
                console.log('成功');
              }

            })
            .catch(err => {
              console.log(err)

            })

        }
      },
      toggle(index) {
        console.log(index);
        this.$refs.checkboxes[index].toggle();
      },
      checkAll() {
        this.$refs.checkboxGroup.toggleAll(true);
      },
      toggleAll() {
        this.$refs.checkboxGroup.toggleAll();
      },
      back() {
        this.$router.back(-1);
      },
      getCartList() {
        let req = {
          restaurant_id: localStorage.getItem('restaurant_id'),
        };
        //没写数量
        this.Api.get('api/goods/lists', req)
          .then(res => {
            console.log('很饿', res);

            this.cartList = res.data;
            for (var i = 0; i < this.cartList.length; i++) {


              for (var j = 0; j < this.cartList[i].data.length; j++) {
                this.allList.push(this.cartList[i].data[j]);
              }
            }
            // }
            var _this = this;
            //为allList添加select（是否选中）字段，初始值为true
            this.allList.map(function (item) {
              _this.$set(item, 'isSelect', false);
              _this.$set(item, 'goods_num', 1);
            });
            console.log('嘎嘎', this.cartList);
            console.log('吉吉', this.allList);


          })
          .catch(err => {
            console.log(err)
          })

      },
      layerShow() {
        this.show = true;
      },
      toPay() {
        if (!this.pot) {
          Toast('请选择锅底！');
          return
        }

        if (this.getTotal.totalPrice != 0) {
          //价格不为空

            //房间已预订
            this.yfk = this.getTotal.totalYfk;
            console.log(this.yfk);
            localStorage.setItem('yfk', this.yfk);
            console.log('打印', this.commitList);
            //提交订单
            let req = {
              reserve_id: this.reserve_id,
              add_type: 0,
              info: JSON.stringify(this.commitList)
            };

            this.Api.post('api/dining_car/addreserve', req)
              .then(res => {

                if (res.code == 0) {
                  console.log('添加订单', res);
                  localStorage.setItem('total_money', this.getTotal.totalPrice);

                  this.$router.push('/diancan/peishon');
                }
                if(res.code == 1){
                  Toast(res.msg);
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
      selectCart: function (_isSelect) {
        //遍历cartList，全部取反
        for (var i = 0, len = this.cartList.length; i < len; i++) {
          // this.cartList[i].isSelect = !this.cartList[i].isSelect;
          this.cartList[i].isSelect = !_isSelect;
        }
      },
      //跳转餐车页面
      tocance() {
        this.$router.push("/diancan/diancanchance")
      },
      //菜品分类列表
      dishesSort() {
        let req = {
          goods_type_name: '荤菜',
          list_rows: 10,
          page: 1
        }
        this.Api.post('api/good/lists', req)
          .then(res => {
            console.log('菜品分类列表', res);


          })
          .catch(err => {
            console.log('菜品分类列表', err)

          })
      },
      num1(id) {
        //判断当前id是否是被选中的
        if (this.commitList.length != 0) {

          for (var i = 0; i < this.commitList.length; i++) {
            if (this.commitList[i].id == id) {
              console.log('增加', this.commitList, id)


              let req = {
                restaurant_id: localStorage.getItem('restaurant_id'),
                user_id: localStorage.getItem('uid'),
                goods_id: id,
                goods_price: this.commitList[i].price,
                goods_num: 1,
                room_id: localStorage.getItem('destine_roomID'),
                type: 1
                //type为0的话是锅底
              };
              console.log('req', req);

              this.Api.post('api/dining_car/add', req)
                .then(data => {
                  if (data.code == 0) {
                    console.log('成功');
                  }

                })
                .catch(err => {
                  console.log(err)

                })


            }
          }


          ;
        }

      },
      num2(id) {
        //判断当前id是否是被选中的
        if (this.commitList.length != 0) {

          for (var i = 0; i < this.commitList.length; i++) {
            if (this.commitList[i].id == id) {
              console.log('减少', this.commitList, id)


              let req = {
                id: id,
                goods_num:1,
                room_id:localStorage.getItem('destine_roomID'),
                restaurant_id:localStorage.getItem('restaurant_id')
                //type为0的话是锅底
              };
              console.log('req', req);

              this.Api.post('api/dining_car/del', req)
                .then(data => {
                  if (data.code == 0) {
                    console.log('成功');
                  }

                })
                .catch(err => {
                  console.log(err)

                })


            }
          }



        }
      }

  },
    computed: {
      //检测是否全选
      isSelectAll: function () {
        //如果allList中每一条数据的isSelect都为true，返回true，否则返回false;
        return this.allList.every(function (val) {
          return val.isSelect
        });
      },
      getTotal: function () {
        //计算价格
        var prolist = this.allList.filter(function (val) {
          return val.isSelect
        });
        // 判断锅底是否存在
        for (var i = 0; i < prolist.length; i++) {
          prolist[i].guo = 0
        }
        if (JSON.stringify(this.potlistobj) != "{}") {
          prolist.push(this.potlistobj)
        }
        for (var i = 0; i < prolist.length; i++) {
          prolist[i].goods_id = prolist[i].id
        }


        this.commitList = prolist;
        console.log('菜品', prolist);

        let totalPri = 0;

        let yfk = 0;
        for (var i = 0, len = prolist.length; i < len; i++) {
          totalPri += prolist[i].price * prolist[i].goods_num;
          yfk += prolist[i].yf_pay * prolist[i].goods_num;
        }
        yfk += totalPri
        console.log('总价', totalPri);
        return {totalNum: prolist.length, totalPrice: totalPri, totalYfk: yfk};
      },
    },
    mounted() {
      this.rid = localStorage.getItem('rid');

      this.getCartList();
      // console.log(this.cartList);
      this.getPotList();
      // this.dishesSort()
    }
  }
</script>
<style lang="less" scoped>
  /deep/ .van-card {
    padding: 8px;
  }

  .icon-cart {
    position: fixed;
    right: 0;
    bottom: 20%;
    background: orange;
    border-radius: 50px;
    font-size: 1.4rem;
    padding: 10px;
    color: #fff;
    border: 1px solid #fff;
  }

  .layer {
    width: 70%;
    border-radius: 14px;
    background: #fff;

    > div {
      padding: 8% 5%;
    }

    .middle {
      border-bottom: 1px dashed #bbb;

      ul {
        margin-top: 0.6rem;

        li {
          line-height: 2;
          font-size: 0.875rem;
          color: #666;

          span {
            display: inline-block;
          }

          .name {
            width: 60%;
          }

          .num {
            color: #bbb;
          }

          .price {
            width: 30%;
            text-align: right;
          }
        }
      }
    }

    .bottom {
      ul {
        overflow: hidden;
        margin-top: 0.6rem;

        li {
          float: left;
          font-size: 0.8rem;
          color: #aaa;
        }

        .right {
          float: right;
          color: orange;
          font-size: 1.125rem;
        }
      }
    }
  }

  .food-type {
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
    padding: 1rem 0;
    background: orange;
    margin: 2% 0;
    position: relative;

    .cance {
      width: 36px;
      height: 34px;
      background: url("../../assets/canche.png") center center;
      background-size: cover;
      position: absolute;
      top: 30px;
      right: 30px;

      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }
  }

  // 锅底样式
  .reserve-pot {
    width: 100%;
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

    img {
      width: 100%;
    }

    .left {
      width: 94%;
      margin: 0 auto;
      margin-top: 0.8rem;
      // overflow: hidden;
      padding-top: 1rem;
      position: relative;
      height: 9rem;

      .img {
        width: 56%;
        height: 9rem;
        overflow: hidden;
        float: left;
        position: relative;
        top: -1rem;
        background: darkgray;
        z-index: 1;
      }

      .detail {
        float: right;
        height: 9rem;
        width: 92%;
        background: #fff;
        position: absolute;
        top: 1rem;
        right: 0;

        > div {
          margin-left: 56%;
          color: #666;

          .type {
            color: #444;
            font-size: 1rem;
            margin-top: 1rem;
          }

          .desc {
            font-size: 0.7rem;
            margin-top: 0.6rem;
            margin-bottom: 0.4rem;
          }

          .desc-eng {
            width: 80%;
            font-size: 0.625rem;
            color: #ccc;
            margin: 0.2rem 0;
          }

          .gd {
            height: 2rem;
            vertical-align: middle;

            .pot-choice, .soup-choice {
              font-size: 0.75rem;
              margin-top: 0.5rem;

              span {
                color: #bbb;
                font-size: 0.625rem;
                margin-right: 8px;
                padding: 2px 8px;
              }

              .active {
                border: 1px solid orange;
                color: orange;
              }
            }
          }

          .price {
            color: orange;
            font-size: 1rem;
            margin-top: 0.8rem;

            .van-icon {
              vertical-align: middle;
              margin-left: 10%;
            }
          }
        }
      }
    }

    // 图片在右边的样式
    .right {
      width: 94%;
      margin: 0 auto;
      margin-top: 0.8rem;
      // overflow: hidden;
      padding-top: 1rem;
      position: relative;
      height: 9rem;

      .img {
        width: 56%;
        height: 9rem;
        overflow: hidden;
        float: right;
        position: relative;
        top: -1rem;
        background: darkgray;
        z-index: 1;
      }

      .detail {
        float: left;
        height: 9rem;
        width: 92%;
        background: #fff;
        position: absolute;
        top: 1rem;
        left: 0;

        > div {
          margin-left: 4%;
          width: 50%;
          color: #666;

          .type {
            color: #444;
            font-size: 1rem;
            margin-top: 1rem;
          }

          .desc {
            font-size: 0.7rem;
            margin-top: 0.6rem;
            margin-bottom: 0.4rem;
          }

          .desc-eng {
            width: 80%;
            font-size: 0.625rem;
            color: #ccc;
            margin: 0.2rem 0;
          }

          .gd {
            height: 2rem;
            vertical-align: middle;

            .pot-choice, .soup-choice {
              font-size: 0.75rem;
              margin-top: 0.5rem;

              span {
                color: #bbb;
                font-size: 0.625rem;
                margin-right: 8px;
                padding: 2px 8px;
              }

              .active {
                border: 1px solid orange;
                color: orange;
              }
            }
          }

          .price {
            color: orange;
            font-size: 1rem;
            margin-top: 0.8rem;

            .van-icon {
              vertical-align: middle;
              margin-left: 10%;
            }
          }
        }
      }
    }
  }

  // 菜品样式
  .cart {
    width: 100%;
    padding-bottom: 2rem;
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

    .food-type {
      // text-align: center;
      color: #fff;
      font-size: 1rem;
      padding: 0.5rem 0;
      background: orange;
      margin: 2% 0;
    }

    .food-list {
      // padding:0.4rem;
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
        margin: 0.4rem auto;
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

  .zhezao {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, .7);
    display: none;
    z-index: 9999;
  }

  .explain {
    width: 490px;
    height: 510px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    position: absolute;
    top: 412px;
    left: 130px;
    z-index: 99999;
    box-sizing: border-box;
    display: none;
  }

  .fufei {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(24, 24, 24, 1);
    padding-top: 42px;
    padding-left: 31px;
  }

  .fufei-one {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
    line-height: 30px;
    padding-top: 15px;
    padding-left: 46px;
    position: relative;
    padding-right: 31px;

    span {
      width: 8px;
      height: 8px;
      background: rgba(17, 17, 17, 1);
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      top: 24px;
      left: 31px;
    }
  }

  .guizhe {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(24, 24, 24, 1);
    padding-top: 26px;
    padding-left: 32px;

  }

  .fufei-two {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(24, 24, 24, 1);
    line-height: 30px;
    padding-top: 11px;
    padding-left: 46px;
    position: relative;
    padding-right: 31px;


    span {
      width: 8px;
      height: 8px;
      background: rgba(17, 17, 17, 1);
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      top: 24px;
      left: 31px;
    }
  }

  .red {
    color: #FB7F38;

    span {
      color: #FB7F38;

    }
  }

  .xian {
    width: 100%;
    height: 2px;
    background: rgba(238, 238, 238, 1);
    margin-top: 20px;
  }

  .zhidao {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(251, 127, 56, 1);
    line-height: 30px;
    padding-top: 18px;
    padding-left: 184px;
  }
</style>
