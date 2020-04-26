<template>
  <div class="setting">
    <van-nav-bar title="账号与安全" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>
    <!-- <van-field v-model="mimanumber" label="登录密码"  placeholder="修改 >"  readonly input-align="right" @click="mima"/> -->

    <van-field v-model="phonenumber" type="tel" label="修改手机号码"  placeholder="修改 >" readonly   input-align="right" @click="shoujihao"/>
  </div>
</template>
<script>

  export default {
    data(){
      return{
        mimanumber:'',
        phonenumber:"",
        phone:123455
      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
      mima(){
        this.$router.push('/mima')

      },
      shoujihao(){
        this.$router.push('/shoujihao')

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

  }
</style>
