<template>
  <div class="rate-succ">
    <van-nav-bar title="评价成功" :border="false">
      <span slot="right" @click="toOrder">完成</span>
    </van-nav-bar>
    <p><van-icon name="checked" />感谢您的评价！</p>
    <div class="order-box">
      <p class="title">继续评价</p>
      <van-divider />
      <van-cell v-if='order1' value-class="order-value" title-class="order-title" center title="筠天下" :border="false" :label="order1.reserve_time+'您消费过'" >
        <van-button @click="toRate(order1.id)">去评价</van-button>
      </van-cell>
      <van-divider />
      <van-cell v-if='order2'  value-class="order-value" title-class="order-title" center title="筠天下" :border="false" label="2019年12月31日您消费过" >
        <van-button @click="toRate(order2.id)">去评价</van-button>
      </van-cell>
      <van-divider />
      <van-cell title="更多待评价" is-link  title-class="more"/>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['fdsaf','fdsafdsa,fdsafdsa'],
      result:[],
      value1:'',
      value2:'',
      order1:[],
      oder2:[],
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    toOrder(){
      this.$router.push('/order');
    },
    getOrderList(){
          let req = {
              user_id: localStorage.getItem('uid'),
              list_rows: 99,
              page: 1,
            };

          this.Api.get('api/reserve/lists',req)
          		.then(res =>{
                console.log(res);
                this.order1 = res.data.data[0];
                this.order2 = res.data.data[1];
                console.log(this.order1);
                console.log(this.order2);
          		})
          		.catch(err =>{
          		  console.log(err);
          		})
    },
    toRate(cid){
      console.log(cid);
      this.$router.push('/rate');
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>
<style lang="less" scoped>
  .rate-succ {
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
    >p{
      color: #777;
      margin: 4% 0;
      line-height: 2;
      text-align: center;
      .van-icon{
        vertical-align: middle;
        font-size: 1.875rem;
        color: orange;
        margin-right: 5px;
      }
    }
    .order-box{
      background: #fff;
      padding: 5% 0;
      p{
        color: #333;
      }
      .title{
        text-align: center;
        font-size: 0.875rem;
        color: #bbb;
      }
      .more{
        font-size: 0.875rem;
      }
      .order-title{
        font-size: 1rem;
      }
      .order-value{
        font-size: 0.875rem;
      }
    }
    .van-cell{
      padding: 2px 16px
    }
    .van-button{
      border: 1px solid orange;
    }
  }
</style>
