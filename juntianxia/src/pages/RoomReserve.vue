<template>
  <div class="cart">
    <van-nav-bar title="包间预定" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <!-- 菜品列表 -->
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in list"
          clickable
          :key="item"
          :title="`复选框 ${item}`"
          @click="toggle(index)"
        >
          <van-checkbox
            :name="item"
            ref="checkboxes"
            slot="right-icon"
          />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['fdsaf','fdsafdsa,fdsafdsa'],
      result:[]
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    }
  }
};
</script>
<style lang="less" scoped>
  .cart {
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
  }
</style>
