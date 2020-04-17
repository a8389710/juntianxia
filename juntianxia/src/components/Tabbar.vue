<template>
  <div class="tabbar">
    <van-tabbar v-model="active" safe-area-inset-bottom active-color='#333333'>
     <van-tabbar-item name='/home' to="/home">
          <span>首页</span>
           <img slot="icon" slot-scope="props" :src="props.active ? icon.shouyeActive: icon.shouyeNormal" :class="props.active?'tabbar-img':''"/>
      </van-tabbar-item>
       <van-tabbar-item name="/diancancaipin" to="/diancan/diancancaipin">
          <span>点餐</span>
           <img slot="icon" slot-scope="props" :src="props.active ? icon.orderActive: icon.orderNormal" :class="props.active?'tabbar-img':''"/>
      </van-tabbar-item>
	  <van-tabbar-item name='/order' to="/order">
	      <span>订单</span>
	       <img slot="icon" slot-scope="props" :src="props.active ? icon.orderActive: icon.orderNormal" :class="props.active?'tabbar-img':''"/>
	  </van-tabbar-item>
       <van-tabbar-item name='/mine' to="/mine">
          <span>我的</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.mineActive: icon.mineNormal" :class="props.active?'tabbar-img':''"/>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script>
export default {
    data(){
        return{
            active:this.$route.fullPath,
            icon:{
                shouyeActive:require('../assets/shouyexuanzhong.png'),
                shouyeNormal:require('../assets/shouye.png'),
                orderActive:require('../assets/dingdanxuanzhong.png'),
                orderNormal:require('../assets/dingdan.png'),
                mineActive:require('../assets/wodexuanzhong.png'),
                mineNormal:require('../assets/wode.png')
            },
        }
    },
    methods:{
    }
};
</script>
<style lang="less" scoped>
.tabbar {
  width: 100%;
  height: 98px;
  background: #EEEEEE;
  .van-tabbar{
    background: #EEEEEE;
  }
  .tabbar-img{
      width: 82px;
      height: 82px;
      position: absolute;
       top:-80px;
       left: -41px;
       z-index:9999;
  }
}
</style>
