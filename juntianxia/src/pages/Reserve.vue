<template>
  <div class="reserve">
    <!-- <van-nav-bar title="菜品预定" :border="false" :fixed="true" :z-index="999"> -->
      <!-- <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" /> -->
      <!-- <van-icon name="cart" alt slot="right" color="#333" size="1rem" :info="cartNum" @click="toCart" /> -->
    <!-- </van-nav-bar> -->
    
    <div class="list">
      <!-- <v-pot></v-pot> -->
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
	import ReservePot from './reserve/ReservePot';
export default {
  data() {
      return {
            active: 0,
            cartNum: 0,
          };
    },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toCart(){
      alert('进入购物车');
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
        }
  },
  components:{
  },
  mounted() {
    this.cartNum = localStorage.getItem('cartNum');
  }
};
</script>
<style lang="less" scoped>
.reserve {
  width: 100%;
  height: 100%;
  background: #eee;
  .icon-img {
    width: 17px;
    height: 29px;
    margin-right: 24px;
  }
  .van-tabs{
    margin-top: 12%;
  }
  .list{
    height: 100%;
    background: #eee;
    overflow: scroll;
  }

}
</style>
