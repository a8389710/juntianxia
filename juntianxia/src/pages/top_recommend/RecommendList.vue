
<template>
  <div class="reserve-food">

    <!-- 加载列表 -->
    <van-list
      class="food-list"
      v-model="loading"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- 一个商品卡 -->
      <van-card
        :thumb="item.goods_url"
        v-for="item in list"
      >
          <div slot="title" class="title">{{item.goods_name}}</div>
          <div slot="desc">
            <van-rate
              v-model="item.score"
              allow-half
              void-icon="star"
              void-color="#eee"
              size="14px"
            />
            <span class="star-num">{{item.score}}分</span>
            <span class="sold-num">已售{{item.num}}份</span>
          </div>
          <div slot="desc" class="desc">
            {{item.goods_content}}
          </div>
          <div slot="price" class="price">￥{{item.price}}</div>
          <div slot="footer" class="btn-add">
            <van-icon name="add-o" size="2rem" color="#FC934D" @click="addFood(item)"/>
          </div>
      </van-card>
      <!-- 一个商品卡结束 -->

    </van-list>
  </div>
</template>
<script>
  import { Toast } from 'vant';
export default {
  data() {
      return {
            list: [],
            loading: false,
          };
    },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toCart(){
      this.$router.push('/Cart');
    },
    onLoad() {
          // // 异步更新数据
          // setTimeout(() => {
          //   for (let i = 0; i < 10; i++) {
          //     this.list.push(this.list.length + 1);
          //   }
          //   // 加载状态结束
          //   this.loading = false;

          //   // 数据全部加载完成
          //   if (this.list.length >= 40) {
              this.finished = true;
          //   }
          // }, 500);
    },
    getList(){
      let req = {
              };
      this.Api.post('api/goods_recommend/lists',req)
          .then(res =>{
            this.list = res.data.data;
            console.log(this.list);
         })
          .catch(err =>{
            console.log(err)
          })
    },
    addFood(foodDetail){

      console.log(foodDetail);
      let req = {
        restaurant_id: foodDetail.restaurant_id,
        user_id: foodDetail.user_id,
        goods_id: foodDetail.goods_id,
        goods_num: 1,
        goods_price: foodDetail.price,
        remarks: foodDetail.remarks
              };
      this.Api.post('api/dining_car/add',req)
          .then(res =>{
            console.log(res);
            Toast('添加成功');
         })
          .catch(err =>{
            console.log(err)
          })
    },
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.reserve-food {
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
  .food-list{
    padding:0.4rem;
    .title{
      font-size: 1rem;
      font-weight: bold;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .star-num{
      display: inline-block;
      width: 2.2rem;
    }
    .price{
      font-size: 1.2rem;
      color: #FC934D;
      margin-top: 15px;
    }
    .desc{
      margin-top: 5px;
      color: #898989;
    }
    .btn-add{
      margin-top: -2rem;
    }
    span{
      color: #666;
    }
    .van-card{
      background: #fff;
      border-radius: 4px;
      padding: 8px;
      padding-bottom: 0;
      .van-image{
        border-radius: 4px;
      }
      .van-card__thumb{
        width: 100px;
        height: 80px;
      }
    }
    .van-card:not(:first-child){
      margin-top: 6px;
    }
  }
}
</style>
