<template>
  <div class="info">
    <van-nav-bar title="消息中心" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
      <p slot="right" class="header-tips" @click="haveread">全部已读</p>
    </van-nav-bar>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

    <div class="messagelist">
    <div class="li" v-for="item in newsList">
      <div class="l">
        <img :src="item.news_img" alt="">

      </div>
      <div class="r">
        <div class="t">
          <div class="tit">{{item.news_title}}</div>
          <div class="time">{{item.news_time}}</div>
        </div>
        <div class="b">
          <div class="red" v-if="item.is_read==0"></div>
          <div class="text">{{item.news_content}}</div>


        </div>

        <div class="xian"></div>
      </div>


    </div>
  </div>
    </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
  import { Toast } from 'vant';

  import { PullRefresh } from 'vant';
export default {
  data(){
    return{
      newsList: [],
      loading: false,
      finished: false,
      index:1,
      list:10,
      total:0,
      refreshing: false
    }
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    getNewsList(index,list){
      let req = {
         token: localStorage.getItem('token'),
          type: 1,
          page: this.index,
          list_rows:this.list
        };

      console.log('req', req);
      this.Api.get('api/user/newsList',req)
      		.then(res =>{

            this.total=res.data.total
            for (var i=0;i<res.data.data.length;i++){
              this.newsList.push(res.data.data[i])
            }
           this.loading=false
            this.refreshing=false

            if (this.total>this.index*this.list){
              this.index++

            }else {
              this.finished=true
            }
            console.log('res',res);
          })
      		.catch(err =>{
      		  console.log('uibau',err)
      		})

    },
    //全部已读
    haveread(){
      let req = {
        user_id:localStorage.getItem('uid')
      };
      console.log('req', req);
      this.Api.get('api/user_news/read',req)
        .then(res =>{

          if (res.code==0){
            console.log(res);
            Toast('已读成功');
          }


        })
        .catch(err =>{
          console.log('uibau',err)
        })
    },
    toxitontonzi(){
      this.$router.push('/xitontonzi')
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      this.getNewsList();


    },
    onRefresh() {
      // 清空列表数据
      this.newsList=[]
      this.index=1
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  mounted() {



  }
};
</script>
<style lang="less" scoped>

.info {
  width: 100%;
  height: 100%;
  background: #fff;
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
  .tonzhipiece{
    overflow: hidden;
    .l{
      width: 80px;
      height: 80px;
      background: url("../assets/tonzhi.png") center center;
      background-size: cover;
      margin-top: 30px;
      margin-left: 30px;
      float: left;
    }
    .r{
      height: 100%;
      float: left;

     .xttz{
       height:28px;
       font-size:30px;
       font-family:PingFang SC;
       font-weight:500;
       color:rgba(51,51,51,1);
       padding-left: 12px;
       padding-top: 40px;
     }
      .xiaoxi{
        height:23px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding-left: 12px;
        padding-top: 14px;

      }
    }
    .button{
      width:598px;
      height:2px;
      background:rgba(243,243,243,1);
      margin-left: 112px;
      margin-top: 127px;
    }
  }
  .piece{
    overflow: hidden;
    .l{
      width: 80px;
      height: 80px;
      /*background: url("../assets/tonzhi.png") center center;*/
      /*background-size: cover;*/
      margin-top: 30px;
      margin-left: 30px;
      float: left;
    }
    .r{
      height: 100%;
      float: left;

      .xttz{
        height:28px;
        font-size:30px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        padding-left: 12px;
        padding-top: 40px;
      }
      .xiaoxi{
        height:23px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding-left: 12px;
        padding-top: 14px;

      }
    }
    .button{
      width:598px;
      height:2px;
      background:rgba(243,243,243,1);
      margin-left: 112px;
      margin-top: 127px;
    }
    .rr{
      float: right;
      .time{
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-top: 45px;
        margin-right: 31px;
      }
      .red{
        width:11px;
        height:11px;
        background:rgba(255,86,27,1);
        border-radius:50%;
        margin-right: 30px;
        margin-top: 20px;
        float: right;
      }
    }
  }
  .messagelist{
    width: 100%;

    .li{
      overflow: hidden;
      .l{
        overflow: hidden;

        float: left;
       img {
         width:79px;
         height:79px;
         background:rgba(255,180,1,1);
         border-radius:50%;
         margin-top: 30px;
         margin-left: 30px;
         margin-right: 12px;
       }

      }
      .r{
        overflow: hidden;

        .t{
          overflow: hidden;

          .tit{
            float:left ;
            padding-top: 40px;
            font-size:30px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
          }
          .time{
            float: right;
            padding-top: 40px;
            font-size:24px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            padding-right: 31px;
          }
        }
        .b{
          position: relative;
         .text{
           padding-top: 14px;
           padding-right: 45px;
           font-size:24px;
           font-family:PingFang SC;
           font-weight:400;
           color:rgba(153,153,153,1);
           line-height: 30px;
           text-align: left;
         }
          .red{
            position: absolute;
             top: 30px;
            right: 30px;
            width:11px;
            height:11px;
            background:rgba(255,86,27,1);
            border-radius:50%;
          }
        }
        .xian{
          width:598px;
          height:2px;
          background:rgba(243,243,243,1);
          margin-top: 18px;

        }
      }
    }
  }
}
</style>
