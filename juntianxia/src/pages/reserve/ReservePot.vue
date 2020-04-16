<template>

  <!-- 锅底列表 -->
  <div class="reserve-pot">

    <!-- 一个锅底 -->
    <div :class="(key%2 ==0)?left:right" v-for="(item,key) in potList">
      <div class="img"><img :src="item.pot_url" alt=""></div>
      <div class="detail">
        <div>
          <p class="type">{{item.pot_name}}</p>
          <p class="desc">{{item.pot_title}}</p>
          <!-- <p class="desc-eng">Hemp and slightly spicy,soup base has material</p> -->
          <div class="gd">
            <p class="pot-choice"><span ref=ld v-for="(ld,index) in item.ld" :class="activeClass[index]?'active':''" @click="ldChecked(key,index)">{{ld}}</span></p>
            <p class="soup-choice"><span v-for="(tl,index) in item.tl" :class="activeClass[index]?'active':''" @click="tlChecked(key,index)">{{tl}}</span></p>
          </div>
          <p class="price">
            <span>¥62</span>
            <van-icon name="add-o" size="22" @click="addPot(key)"/>
          </p>
        </div>
      </div>
    </div>
    <!-- 一个锅底结束 -->


  </div>
</template>
<script>
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
export default {
  data() {
      return {
            list: [],
            loading: false,
            finished: false,
            star_val: 4.5,
            soup: 0,
            potList: [],
            left:'left',
            right:'right',
            ld:'',
            tl:'',
            active:false,
            rid:localStorage.getItem('rid'),
            reserve_id:localStorage.getItem('reserve_id'),
            cartNum:0,
            activeClass:[],
            foodList:[]
          };
    },
  methods: {
    back() {
      this.$router.back(-1);
    },
    ldChecked(key,l){
      this.ld = this.potList[key].ld[l];
      console.log(this.ld);
    },
    tlChecked(key,t){
      // this.tl = this.potList[key].tl[t];
      // console.log(this.tl);
      console.log(t);
      this.activeClass[key] = t;
      console.log(this.activeClass[t]);
    },
    toCart(){
      this.$router.push('/cart');
    },
    addPot(key){
      if(this.reserve_id){
        console.log(this.rid);
        let req = {
          restaurant_id: this.rid,
          reserve_id: this.reserve_id,
          pot_id: this.potList[key].id,
          pot_num: 1,
          ld: '',
          tl: '',
          pot_price: this.potList[key].pot_price,
          remarks: ''
        };
        this.Api.get('api/reserve_pot/add',req)
        		.then(res =>{
              console.log(res);
              if(res.code == 0){
                Toast('锅底添加成功！');
                // this.$router.push('/reserve/reservefood')
                // this.cartNum ++ ;
                // localStorage.setItem('cartNum',this.cartNum);
              }
        		})
        		.catch(err =>{
        		  console.log(err)
        		})
      }else{
        Dialog.confirm({
          title: '提示',
          message: '需要先预定包间哦~'
        }).then(() => {
          // on confirm
          this.$router.push('/baojianlist');
        }).catch(() => {
          // on cancel
        });
      }

    },
    getPotList(){
      var _this = this;
          let req = {
              list_rows: 99,
              page: 1,
            };

          this.Api.get('api/pot/lists',req)
          		.then(res =>{
                console.log(res);
                this.potList = res.data.data;
                console.log(this.potList);
                //给每条锅底添加字段
                for(var i=0;i<this.potList.length;i++){
                  this.activeClass.push(true);
                }
                console.log(this.activeClass);
          		})
          		.catch(err =>{
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
      getCartList(){
              let req = {
                };

              this.Api.get('api/goods/lists',req)
              		.then(res =>{
                    console.log(res);
                    this.foodList = res.data;
                    console.log(this.foodList);
              		})
              		.catch(err =>{
              		  console.log(err)
              		})

      },
  },
  mounted() {
    this.getPotList();
    this.cartNum = localStorage.getItem('cartNum');
    this.getCartList();
  }
};
</script>
<style lang="less" scoped>
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
  img{
    width: 100%;
  }
  .left{
    width: 94%;
    margin: 0 auto;
    margin-top: 0.8rem;
    // overflow: hidden;
    padding-top: 1rem;
    position: relative;
    height: 9rem;
    .img{
      width: 56%;
      height: 9rem;
      overflow: hidden;
      float: left;
      position: relative;
      top: -1rem;
      background: darkgray;
      z-index: 1;
    }
    .detail{
      float: right;
      height: 9rem;
      width: 92%;
      background: #fff;
      position: absolute;
      top: 1rem;
      right: 0;
      >div{
        margin-left: 56%;
        color: #666;
        .type{
          color: #444;
          font-size: 1rem;
          margin-top: 1rem;
        }
        .desc{
          font-size: 0.7rem;
          margin-top: 0.6rem;
          margin-bottom: 0.4rem;
        }
        .desc-eng{
          width: 80%;
          font-size: 0.625rem;
          color: #ccc;
          margin: 0.2rem 0;
        }
        .gd{
          height: 2rem;
          vertical-align: middle;
          .pot-choice,.soup-choice{
            font-size: 0.75rem;
            margin-top: 0.5rem;
            span{
              color: #bbb;
              font-size: 0.625rem;
              margin-right: 8px;
              padding: 2px 8px;
            }
            .active{
              border: 1px solid orange;
              color: orange;
            }
          }
        }

        .price{
          color: orange;
          font-size: 1rem;
          margin-top: 0.8rem;
          .van-icon{
                vertical-align: middle;
                margin-left: 50%;
          }
        }
      }
    }
  }
  // 图片在右边的样式
  .right{
    width: 94%;
    margin: 0 auto;
    margin-top: 0.8rem;
    // overflow: hidden;
    padding-top: 1rem;
    position: relative;
    height: 9rem;
    .img{
      width: 56%;
      height: 9rem;
      overflow: hidden;
      float: right;
      position: relative;
      top: -1rem;
      background: darkgray;
      z-index: 1;
    }
    .detail{
      float: left;
      height: 9rem;
      width: 92%;
      background: #fff;
      position: absolute;
      top: 1rem;
      left: 0;
      >div{
        margin-left: 4%;
        width: 50%;
        color: #666;
        .type{
          color: #444;
          font-size: 1rem;
          margin-top: 1rem;
        }
        .desc{
          font-size: 0.7rem;
          margin-top: 0.6rem;
          margin-bottom: 0.4rem;
        }
        .desc-eng{
          width: 80%;
          font-size: 0.625rem;
          color: #ccc;
          margin: 0.2rem 0;
        }
        .gd{
          height: 2rem;
          vertical-align: middle;
          .pot-choice,.soup-choice{
            font-size: 0.75rem;
            margin-top: 0.5rem;
            span{
              color: #bbb;
              font-size: 0.625rem;
              margin-right: 8px;
              padding: 2px 8px;
            }
            .active{
              border: 1px solid orange;
              color: orange;
            }
          }
        }
        .price{
          color: orange;
          font-size: 1rem;
          margin-top: 0.8rem;
          .van-icon{
                vertical-align: middle;
                margin-left: 50%;
          }
        }
      }
    }
  }
}
</style>
