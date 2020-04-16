<template>
  <div class="order-info">
    <div class="succ-box">
      <van-nav-bar
        left-arrow
        @click-left="back"
        title="订单详情"
        color="#fff"
        :border="false"
      />
      </van-nav-bar>

    </div>

    <div class="info">
      <div class="top">
        <p class="title">订单已完成</p>
        <p class="text">感谢您对筠天下的信任，期待下次光临</p>
        <van-button type="default" @click="toRate">评价</van-button>
        <van-button type="default">再来一单</van-button>
      </div>
      <div class="middle">
        <p class="title">点菜清单</p>
        <ul class="list">
          <li v-for="item in foodList">
            <span class="name">{{item.remarks}}</span>
            <span class="num">x{{item.goods_num}}</span>
            <span class="price">¥{{item.goods_price}}</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p class="title">费用</p>
        <ul class="price">
          <li class="left">合计</li>
          <li class="right">￥{{orderInfo.total_money}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { Dialog } from 'vant';
export default {
  data() {
    return {
      list: ['fdsaf','fdsafdsa,fdsafdsa'],
      result:[],
      value1:'',
      value2:'',
      active: 0,
      orderInfo:[],
      foodList:[],
      oid: '',
      pri_name:'',
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toReserveFood(){
      this.$router.push('/reserve/reservefood');
    },
    toRate(){
      localStorage.setItem('commentID',this.orderInfo.id);
      this.$router.push('/rate');
    },
    cancel(){
      Dialog.confirm({
        title: '提示',
        message: '确定要取消包间么？'
      }).then(() => {
        let req = {
          id : localStorage.getItem('oid'),
        }
        this.Api.get('api/reserve/del',req)
              	.then(res =>{
                  console.log(res);
                  this.$router.push('/roomcancel')
              		})
              		.catch(err =>{
              		  console.log(err)
              		})
      }).catch(() => {
        // on cancel
      });
    },
	getOrderInfo(){
		let req = {
			id : this.oid,
		};
		this.Api.get('api/reserve/one',req)
		      	.then(res =>{
              console.log(res);
              this.orderInfo = res.data;
              console.log(this.orderInfo);
              this.foodList = res.data.goods;
              console.log(this.foodList);
		      		})
		      		.catch(err =>{
		      		  console.log(err)
		      		})
	}
  },
  mounted() {
    this.oid = localStorage.getItem('oid');
    this.getOrderInfo();
  }
};
</script>
<style lang="less" scoped>
  .order-info {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
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
    .succ-box{
      background: linear-gradient(to right,#FF9B43,#FB8038);
      padding: 0 4%;
      padding-bottom: 15%;
      .van-nav-bar{
        background: transparent;
        .van-nav-bar__left{
          left: 0;
          .van-icon{
            color: #fff;
            font-size: 1.125rem;
          }
        }
        .van-nav-bar__title{
          color: #fff;
        }
      }
      p{
        color: #fff;
        margin: 0.8rem 0;
      }
      .text-succ{
        font-size: 1rem;
      }
      .text-tip{
        font-size: 0.8rem;
        letter-spacing: 1.5px;
        line-height: 1.5;
      }
      .steps{
        background: transparent;
        .van-step{
          color: #fff;
        }

      }

    }
    .info{
      padding: 0 4%;
      position: relative;
      top: -5%;
      >div{
        padding: 5% 3%;
        border-radius: 14px;
        background: #fff;
      }
      .top{
        .title{
          font-size: 1.125rem;
        }
        .text{
          font-size: 0.75rem;
          color: #bbb;
          line-height: 2.6;
        }
        .van-button{
          width: 100px;
          height: 36px;
          line-height: 36px;
          border-radius: 4px;
          color: #bbb;
        }
      }
      .middle{
        border: 1px dashed #bbb;
        border-left: none;
        border-right: none;
        ul{
          margin-top: 0.6rem;
          li{
            line-height: 2;
            font-size: 0.875rem;
            color: #666;
            span{
              display: inline-block;
            }
            .name{
              width: 60%;
            }
            .num{
              color: #bbb;
            }
            .price{
              width: 30%;
              text-align: right;
            }
          }
        }
      }
      .bottom{
        ul{
          overflow: hidden;
          margin-top: 0.6rem;
          li{
            float: left;
            font-size: 0.8rem;
            color: #aaa;
          }
          .right{
            float: right;
            color: orange;
            font-size: 1.125rem;
          }
        }
      }
    }
}

</style>
