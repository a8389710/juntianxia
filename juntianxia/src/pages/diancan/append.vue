<template>
  <div class="append">
    <van-nav-bar title="添加地址" :border="false">
      <img src="../../assets/img/fanhui.png" alt slot="left" class="icon-img" @click="back" />
    </van-nav-bar>

  <!-- show-delete show-set-default   show-search-result      show-postal -->

    <van-address-edit
      ref="addEdit"
      :area-list="areaList"
      :show-set-default="true" 
      :address-info="addressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @click-area="clickArea"
      @change-area="changeArea"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    >
      <template slot=""></template>
    </van-address-edit>

    <!-- 输入监听选择地址 -->
    <van-picker v-if="dropDown" class="choice"
    :columns="columns"
    @change="onChange" 
    />

  </div>
</template>
<script>
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        AddressMsg:{

        },
        addressInfo:{},
        save:[],  //保存
        searchResult: [],
        dropDown : false , 
        yuyu: [],
        columns: [],
       addrtit:[],// 地理说明list
       addrList:[],// 地理位置数组
       choseAddr:{},// 选中地理位置
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

      // 改变城市编码
      changeArea(val){
        console.log(val,'改变')

        this.AddressMsg = {
          province:val[0].code,
          city:val[1].code,
          area:val[2].code,
        }


      },
      clickArea(val){
        console.log(val,'点击')
      },
      onDelete(){
        console.log(214)
      },
      onSaveTTT(data) {
          console.log(data,'addres')
          return
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
      },
      // 地址保存按钮
      onSave(data){

        console.log(data,'addresss')
        var param = {
            receiving_name: data.name,  
            receiving_phone: data.tel,
            receiving_address: data.addressDetail,
            is_default: data.isDefault?1:0,
            province:this.AddressMsg.province,
            city:this.AddressMsg.city,
            area:this.AddressMsg.area,
          };

      let apiAdd = 'api/user_receiving_address/add'
      let apiUp  = 'api/user_receiving_address/up'
      let goApi = apiAdd
        if (this.$route.query.id) {
          goApi = apiUp
          param.id = this.$route.query.id
        }

        this.Api.post(goApi,param).then(res => {
          console.log(res)
          if (res.code == 0) {
            // this.save = res
            Toast.success("操作成功");
            this.$router.back(-1)
          }else{
            Toast.error(res.msg)
          }
        })
      },
    // 详细地址输入触发弹框
    // 改变详细地址
      onChangeDetail(val){
        if(val !== null){
          var param = {
            address: val
          }
          this.Api.post('api/user_receiving_address/latlng',param).then(res => {
            if(res.code == 0){
              // this.columns = res.data
              console.log(res.data)
              this.addrList = res.data
              let addrtit = []
              let addrList = res.data
              addrList.forEach((addr)=>{
                addrtit.push(addr.address)
              })
              this.columns = addrtit
            }
        })
          this.dropDown = true
          return val='123'
        }
      },
    // 请求地址
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.choseAddr = this.addrList[index]
      this.dropDown = false
      this.$refs.addEdit.setAddressDetail(this.choseAddr.address)
      console.log(this.choseAddr,'选中地理位置') 
    },
    // 请求经纬度地址
    },

    computed:{},
    created(){
      this.getaDdress()
      let locAdd = JSON.parse(localStorage.getItem('addrInfo'))
      console.log(locAdd)
      this.addressInfo = {
        id:locAdd.id,
        name:locAdd.receiving_name,
        tel:locAdd.receiving_phone,
        // province:locAdd.province,
        // city:locAdd.city,
        // area:locAdd.area,
        addressDetail:locAdd.receiving_address,
        isDefault:locAdd.isDefault
      }
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
    /deep/ .van-button__text{
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:42px;
    }
  }

  // 输入详细地址下拉框
  .choice{
    width: 50%;
    // height: 300px;
    background-color: #ffffff;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: 400px;
    left: 25%;
    padding: 10px;
    color: #323233;
    border-radius: 10px;
    font-size: 12px;

  }
</style>
