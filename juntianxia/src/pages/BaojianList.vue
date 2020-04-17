

<template>
  <div class="list">
    <van-nav-bar title="包间列表" :border="false">
      <img src="../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>
    <ul class="list-baojian">
      <li v-for="(item,index) in list" @click="toBaojianDetail(item.id)" :key="item.id">
        <div class="list-img">
            <img :src="item.private_url" alt="">
        </div>
        <div class="list-info">
          <p>{{item.private_name}}</p>
          <van-rate v-model="item.score" allow-half readonly size="10px" class="list-rate" />
          <span>{{item.score}}分</span>
        </div>
        <div class="list-detail">
          <p>面积：50m²</p>
          <p>座位数：20</p>
        </div>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    getList(){
      let req = {
        page: 1,
        list_rows: 10
      };
      //渲染房间 但还没有下拉刷新
      this.Api.post('/api/room/roomList')
      .then(res =>{
        this.list = res.data.data
        this.list.forEach((room)=>{
            room.score = Number(room.score)
        })
        console.log('包间',this.list);
      })
      .catch(err =>{
        console.log(err)
      })
    },
    toBaojianDetail(id){
      console.log(id);
      //保存房间id
      localStorage.setItem('roomID',id);
      this.$router.push('/baojiandetail');
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.list {
  width: 100%;
  height: 100%;
  .icon-img {
    width: 17px;
    height: 29px;
    margin-right: 24px;
  }
  .list-baojian {
    width: 690px;
    min-height: 428px;
    // background: blueviolet;
    margin: 0 auto;
    // margin-top: 22px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 333px;
      height: 427px;
    //   background: orangered;
      margin-top: 20px;
      .list-img {
        width: 333px;
        height: 318px;
        border-radius: 10px;
        // background: greenyellow;
        img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
      }
      .list-info {
        padding-top: 18px;
        padding-bottom: 17px;
        // background: aqua;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        span {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #b3b3b3;
        }
      }
      .list-detail {
        padding-top: 17px;
        // background: blue;
        display: flex;
        p {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color:#b3b3b3;
        }
        p:nth-child(2){
            margin-left: 12px;
        }
      }
    }
  }
  .list-baojian:after{
      content: '';
      width: 333px;
  }
}
</style>
