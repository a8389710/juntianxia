<template>
  <div class="userinfo">
    <van-nav-bar title="个人信息" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back"/>
    </van-nav-bar>
    <van-cell title="实名认证" :value="username"
    size='large'/>
    <van-cell title="头像" class="margin-style">
      <div class="img-box" slot="right-icon">
        <input accept="image/*"  type="file" id="uploadIMG"  @change="btnUploadFile"/>
        <img :src="src" alt="">
      </div>
    </van-cell>
<!--    <van-cell title="昵称" is-link :value="info.nickname"/>-->
<!--    <van-cell title="生日" is-link :value="info.birthday"/> -->
    <van-field
      v-model="nickname"
      label="昵称"
      input-align="right"
    />
    <van-field
      v-model="birthday"
      label="生日"
      input-align="right"
      type="date"

    />

    <van-cell title="地址"  is-link @click="toaddress" />
    <div class="button" @click="saveChanges">保存</div>
  </div>
</template>
<script>
import { Toast } from 'vant';
  export default {
    data() {
      return {
        username: '',
        nickname:'',
        birthday:'',
        head_url:'',
        src:'',

      };
    },
    methods: {
      back() {
        this.$router.back(-1);
      },
      //  获取个人信息
      getInfo() {
        this.Api.get('/api/user/userInfo')
          .then(res => {
            console.log('一进入页面获取的', res);
            this.birthday=res.data.birthday
            this.head_url=res.data.head_url
            this.src="http://47.108.70.59"+this.head_url
            this.nickname=res.data.nickname


            this.src="http://47.108.70.59"+this.head_url
            if (res.data.username == '') {
              this.username = '未实名认证';
            } else {
              this.username =res.data.username;

            }
            console.log('username',this.username);

          })
          .catch(err => {

            console.log('失败',err)
          })
      },
      //  跳转地址页面
      toaddress() {
        this.$router.push('/receipt');
      },
      //上传图片
      btnUploadFile(event){
        let files = event.target.files[0];//文件对象
        let reader = new FileReader();//h5读文件
        reader.readAsDataURL(files);
        var that=this
        reader.onload = function (e) {
          var base64 = e.target.result;
          var req={

            file:base64
          }
          that.head_url=base64
          console.log('req',req);
          //接口部分
          that.Api.post("/api/index/upload",req).then(response => {
            console.log('response',response)
             if (response.code==0){
               that.head_url=response.url
               that.src="http://47.108.70.59"+that.head_url
               //.上传成功
             }
          }).catch(function(err) {
            console.log(err);
          });

        }




      },
      //保存修改
      saveChanges(){
        // this.username
        let req={
         username:this.username,
         nickname:this.nickname,
         head_url:this.head_url,
         birthday:this.birthday
       }
        console.log('req', req);

        //接口部分
        this.Api.post("/api/user/editUser",req).then(response => {
          if (response.code == 0){
            Toast("修改成功");
            console.log(res.msg);
            //.上传成功
          }
        }).catch(function(err) {
          console.log(err);
        });

      }
    },
    mounted() {
       this.getInfo();
      // this.Api.post('api/config/lists').then(res=>{
      //   console.log('系统设置列表', res);
      // }).catch(function(err) {
      //   console.log('失败a',err);
      // });
    },
    beforeDestroy(){
      // 更新的
    }
  };
</script>
<style lang="less" scoped>
  .userinfo {
    width: 100%;
    height: 100%;
    background: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }

    .img-box {
      overflow:hidden;
      width: 80px;
      height: 80px;
      background: #ccc;
      border-radius: 50%;
    }

    .margin-style {
      margin-top: 12px;
    }
    #uploadIMG{
      position: absolute;
      top: 19px;
      right: -161px;
      opacity: 0;
    }
    .button{
      margin-right: 30px;
      margin-left: 30px;
      text-align: center;
      background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
      border-radius:40px;
      height: 80px;
      line-height: 80px;
      margin-top: 80px;
      font-size:40px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);

    }

  }
</style>
