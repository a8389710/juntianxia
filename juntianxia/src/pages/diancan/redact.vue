<template>
  <div class="append">
    <van-nav-bar title="编辑信息" :border="false">
      <img src="../../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>

    <!--   show-delete show-set-default   show-search-result      show-postal
    -->
    <van-address-edit
      show-delete
      :area-list="areaList"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />


  </div>
</template>
<script>
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        areaList:{},
        searchResult: []
      };
    },
    methods: {
      onSave() {
        Toast('save');
      },
      onDelete() {
        Toast('delete');
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      },
      back() {
        this.$router.back(-1);
      },
    },
   created() {
     this.Api.get('api/index/address')
       .then(res =>{

         this.areaList=res.areaList
         console.log('成功', res);


       })
       .catch(err =>{
         console.log('uibau',err)
       })

   },



    computed:{

    },
    mounted() {



    }
  }
</script>
<style lang="less" scoped>
  /deep/.van-card{
    padding: 8px;
  }
  /deep/ .van-nav-bar{
    font-size:36px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(17,17,17,1);

  }
  /deep/.van-button--danger{
    background: linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
    border-radius:40px;
    border: none;

  }
  /deep/.van-address-edit{
    padding: 0;
  }
  /deep/.van-address-edit__buttons{
    padding-right: 30px;
    padding-left: 30px;
  }
  .append {
    width: 100%;
    height: 100%;
    background: #eee;
    .icon-img {
      width: 17px;
      height: 29px;
      margin-right: 24px;
    }
    overflow: hidden;

  }
  .delete{
    width: 100%;
    padding-left: 50px;
    padding-right: 50px;
    box-sizing: border-box;
    div{
      background:linear-gradient(90deg,rgba(255,155,67,1),rgba(251,127,56,1));
      border-radius:40px;
      height: 80px;
      font-size:38px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:80px;
      text-align: center;
      cursor: pointer;
    }

  }
  /deep/ .van-button__text{
    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;

    line-height:42px;
  }
</style>
