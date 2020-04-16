<template>
  <div class="append">
    <van-nav-bar title="添加地址" :border="false">
      <img src="../../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>

<!--   show-delete show-set-default   show-search-result      show-postal
-->
    <van-address-edit
      :area-list="areaList"
      :show-set-default="true"
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
        areaList:{
          province_list: {
            110000: '北京市',
            120000: '天津市'
          },
          city_list: {
            110100: '北京市',
            110200: '县',
            120100: '天津市',
            120200: '县'
          },
          county_list: {
            110101: '东城区',
            110102: '西城区',
            110105: '朝阳区',
            110106: '丰台区',
            120101: '和平区',
            120102: '河东区',
            120103: '河西区',
            120104: '南开区',
            120105: '河北区',
            // ....
          }
        },
        //设置默认值
        //    :address-info="addressInfo"-->
        // addressInfo:{
        //   isDefault:true
        // }
        // searchResult: []
      };
    },
    methods: {
      onSave(data) {

// addressDetail: "111"  详细地址
// areaCode: "130101" 区号
// city: "石家庄市"  市
// country: "" 国家
// county: "市辖区" 县
// isDefault: true 是否默认地址
// name: "11" 姓名
// postalCode: ""  邮编
// province: "河北省" 省份
// tel: "13151262952" 电话
        let num
        if (data.isDefault){
           num=1
        }else {
          num=0
        }
        let  req={
          user_id:localStorage.getItem('uid'),
          receiving_name:data.name,
          receiving_phone:data.tel,
          is_default:num,

        }
        console.log('data',data);

      },

      back() {
        this.$router.back(-1);
      },
      //获取地址
      getaDdress(){
        this.Api.get('api/index/address')
          .then(res =>{

            this.areaList=res.areaList
            console.log('成功', res);


          })
          .catch(err =>{
            console.log('uibau',err)
          })
      }
    },




    computed:{},
    mounted() {

    },
    created() {
      this.getaDdress()

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
    /deep/ .van-button__text{
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:42px;
    }
  }
</style>
