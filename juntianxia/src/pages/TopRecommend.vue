<template>
  <div class="top-recommend">
    <van-nav-bar title="美食榜单" :border="false" :fixed="true" :z-index="999">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
      <van-icon name="cart" alt slot="right" color="#333" size="1rem" :info="badge" @click="toCart" />
    </van-nav-bar>
    <van-tabs :border="false" line-width="40px" color="#F7692B">
      <van-tab title="热度排行" to="/toplist">
      </van-tab>
      <van-tab title="菜品推荐" to="/recommendlist">
      </van-tab>
    </van-tabs>
    <div class="list">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          badge: 9,
          };
    },
  methods: {
    back() {
      this.$router.push('/Home');
    },
    toCart(){
      this.$router.push('/Cart');
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
  }
};
</script>
<style lang="less" scoped>
.top-recommend {
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
