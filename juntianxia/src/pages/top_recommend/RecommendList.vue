
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
        v-for="(item,idx) in list"
        :key="item.id"
      >
          <div slot="title" class="title">{{item.goods_name}}</div>
          <div slot="desc">
            <van-rate
              v-model= "item.score"
              allow-half
              void-icon="star"
              void-color="#eee"
              size="14px"
              readonly
            />
            <span class="star-num"> {{item.score}} 分</span>
            <span class="sold-num">库存：{{item.stock_num}}</span>
          </div>
          <div slot="desc" class="desc">
            {{item.goods_content}}
          </div>
          <div slot="price" class="price">￥{{item.price}}</div>
          <div v-if="!item.isChose" slot="footer" class="btn-add">
            <van-icon name="add-o" size="2rem" color="#FC934D" @click="addFood(item,idx)"/>
          </div>
            <div v-else slot="footer" class="btn-add">
             <van-icon name="star" color="#FC934D" />
             已添加
          </div>
      </van-card>
      <!-- 一个商品卡结束 -->
    </van-list>
  </div>
</template>
<script>
  import { Toast, Dialog } from 'vant';
export default {
  data() {
      return {
            list: [],
            loading: false,
            numbers:0,
            hasChoseGoodsList:[],
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
      this.finished = true;
          // // 异步更新数据
          // setTimeout(() => {
          //   for (let i = 0; i < 10; i++) {
          //     this.list.push(this.list.length + 1);
          //   }
          //   // 加载状态结束
          //   this.loading = false;
          //   // 数据全部加载完成
          //   if (this.list.length >= 40) {
          //   }
          // }, 500);
    },
    getList(){
      // 获取菜品
      let req = {
              };
      // 获取已经选择菜品
        let reqq = {
              page : 1,
              user_id: localStorage.getItem('uid'),
              room_id: localStorage.getItem('destine_roomID'),
              restaurant_id : localStorage.getItem('restaurant_id'),
              list_rows : 200,
        };
        let Idbox = []
        this.Api.post('api/goods_recommend/lists', reqq).then(hasRes => {
          // this.badge = res.data.goods.length 
          this.hasChoseGoodsList = hasRes.data.goods
          //  列表
          this.Api.post('api/goods_ranking/lists',req).then(res =>{
              this.list = res.data.data;
              this.list.forEach(item=>{
                item.num = Number(item.num)
                item.score = Number(item.score)
                item.isChose = false
                this.hasChoseGoodsList.forEach(hasgood=>{
                  if (hasgood.goods_id == item.goods_id) {
                    item.isChose = true
                  } 
                })
              })
              console.log('list',this.list);
          })
            .catch(err =>{
              console.log(err)
            })
          })

    },
    // 添加餐车
    addFood(foodDetail,idx){
      let that = this
      let newList = [...this.list]
      // console.log
      if (foodDetail.stock_num == 0) {
        Dialog.alert({
          title: '提示',
          message: '当前商品暂无库存无法添加',
        }).then(() => {
        });
      }else{
         let req = {
        restaurant_id: foodDetail.restaurant_id,
        user_id: localStorage.getItem('uid'),
        goods_id: foodDetail.id,
        goods_num: 1,
        goods_price: foodDetail.price,
        remarks: foodDetail.remarks,
        type: "1",
        room_id:localStorage.getItem('destine_roomID'),
      };
      this.Api.post('api/dining_car/add',req).then(res =>{
        if(res.code == 0){
            Toast('添加成功');
            that.$parent.shopcode()// 子组件向发射事件, 
            newList[idx].isChose = true
            this.list = newList
        }  
          })
          .catch(err =>{
            console.log(err)
          })

      }
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
      margin-top:0;
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
    span{
      color: #666;
    }
    .van-card{
      background: #fff;
      border-radius: 4px;
      padding: 8px;
      padding-bottom: 8px;
      .van-image{
        border-radius: 4px;
      }
      .van-card__thumb{
        width: 100px;
        height: 80px;
      }
    }
    .van-card__content{
      min-height: inherit;
    }
    .van-card__footer{
      position: absolute;
      right:10px;
      bottom:12px;
    }
    .van-card:not(:first-child){
      margin-top: 6px;
    }
  }
}
</style>
