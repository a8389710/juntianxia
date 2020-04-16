<template>
  <div class="setting">
    <van-nav-bar title="设置" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>
    <van-cell title="个人信息" is-link size='large' @click="toUserInfo"/>

     <van-cell title="账号与安全" is-link size='large' class="margin-style" @click="tozhanhuanquan"/>
    <van-cell title="清除缓存" is-link size='large' @click="clearAll"/>
    <van-button type="default" class="btn-box" @click="logOut">退出账号</van-button>
  </div>
</template>
<script>
  import {Toast} from 'vant';
export default {
    data(){
        return{

        }
    },
    methods:{
        back(){
            this.$router.back(-1)
        },
        toUserInfo(){
            this.$router.push('/userinfo')
        },
        logOut(){
          localStorage.clear();
          this.$router.push('/login');
        },
        clearAll(){
          //获取用户信息,然后清除缓存,在重新填入用户信息
          localStorage.clear();
          Toast('清除成功');
        },
      tozhanhuanquan(){
        this.$router.push('/zhanhaoanquan')

      }
    }
};
</script>
<style lang="less" scoped>
.setting {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  .icon-img {
    width: 17px;
    height: 29px;
    margin-right: 24px;
  }
  .margin-style{
      margin-top: 12px;
  }
  .btn-box{
      width: 703px;
      height: 86px;
      background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
      margin-left: 24px;
      margin-top: 676px;
      border-radius: 18px;
  }
}
</style>
