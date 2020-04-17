<template>
  <div class="setting">
    <van-nav-bar title="换绑手机号" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>
    <div class="content">

      <van-field v-model="lodPhonenumber" type="tel" label="手机号"  placeholder="请输入旧的手机号" />
      <van-field v-model="phonenumber" type="tel" label="手机号"  placeholder="请输入新的手机号" />
      <van-field v-model="mimanumber" type="tel" label="验证码"  placeholder="请输入验证码" />
       <div class="yanzhenma" @click="getCode" >验证码</div>
      <div class="btn-login" @click="huanbang">立即换绑</div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';

  export default {
    data(){
      return{
        lodPhonenumber: '',
        mimanumber:'',
        phonenumber:"",

      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
      // 修改手机号
      huanbang(){
        let pearm={
          phone: this.mimanumber,
          new_vertify: this.phonenumber,
          old_vertify: this.lodPhonenumber,
        }
        this.Api.post('/api/user/sendMessage',pearm).then(res =>{
            console.log(res)
            if(res.code==0){
              Toast("修改成功！");
              // localStorage.setItem('token',JSON.stringify(res.data.token));
            }else{
              Toast(res.msg);
            }
          })
          .catch(err =>{
            console.log(err);
          })
      },
            // 获取验证码
      getCode() {
        console.log(23)
        let req = {
          //拿到手机号
          phone: this.phone
        };
        var phone=this.phone.replace(/\s/g, "");//去除空格
        if (phone.length==0){
          Toast('请填写手机号');
          return;
        }
        let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        if (!regs.test(phone)){
          Toast('手机号不正确');
          return;
        }
        if (!this.codeStatus){
          this.Api.post('api/index/getMobileCode',req)
            .then(res =>{
              this.codeStatus = true;
              if(res.code==0){
                this.authcode=res.data
                Toast(res.data);
                // Toast('短信已发送至您的手机，请注意查收');
                const TIME_count = 60;
                this.count = TIME_count;
                this.timer = window.setInterval(() => {
                  this.content=this.count--
                  if  (this.content<=0){
                    clearInterval(this.timer);
                    this.content = "获取验证码";
                    this.codeStatus=false;
                  }
                }, 1000);
              }else{
                Toast(res.msg);
                this.codeStatus=true;
                const TIME_count = 60;
                this.count = TIME_count;
                this.timer = window.setInterval(() => {

                  this.content=this.count--
                  if  (this.content<=0){
                    clearInterval(this.timer);
                    this.content = "获取验证码";
                    this.codeStatus=false;
                  }

                }, 1000);
              }
            })
            .catch(err =>{
              console.log(err)
            })
        }


      },

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
    .content{

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
        font-size: 1.2rem;
        margin: 12% 0 16% 0;
      }

      .btn-login{
        padding: 0.6rem 0;
        border-radius: 50px;
        background: orange;
        color: #fff;
        text-align: center;
        margin-top: 15%;
        width:670px;
        margin-left: 40px;
      }
      .text{
        font-size: 12px;
        color: #bbb;
        text-align: center;
        margin-top: 2%;
      }
      .yanzhenma{
        width:150px;
        height:50px;
        background:rgba(255,152,5,1);
        opacity:0.8;
        border-radius:25px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:42px;
        text-align: center;
        position: absolute;
        top: 180px;
        right: 30px;
        z-index: 9999;
      }
    }

  }
</style>
