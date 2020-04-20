const Home = () => import('@/pages/Home')
const Tabbar = () => import('@/components/Tabbar')
const Order = () => import('@/pages/Order')
const Mine = () => import('@/pages/Mine')
const Setting = () => import('@/pages/Setting')
const UserInfo = () => import('@/pages/UserInfo')
const VipRegister = () => import('@/pages/VipRegister')
const Voucher = () => import('@/pages/Voucher')
const Info = () => import('@/pages/Info')
const BaojianList = () => import('@/pages/BaojianList')
const BaojianDetail = () => import('@/pages/BaojianDetail')
const TopRecommend = () => import('@/pages/TopRecommend')
const TopList = () => import('@/pages/top_recommend/TopList')
const RecommendList = () => import('@/pages/top_recommend/RecommendList')
const SystemNotice = () => import('@/pages/SystemNotice')
const Reserve = () => import('@/pages/Reserve')
const ReserveFood = () => import('@/pages/reserve/ReserveFood')
const ReservePot = () => import('@/pages/reserve/ReservePot')
const ReserveDessert = () => import('@/pages/reserve/ReserveDessert')
const Cart = () => import('@/pages/Cart')
const RoomReserve = () => import('@/pages/RoomReserve')
const Rate = () => import('@/pages/Rate')
const Pay = () => import('@/pages/Pay')
const Login = () => import('@/pages/Login')
const ReserveRoom = () => import('@/pages/ReserveRoom')
const RoomSucc = () => import('@/pages/RoomSucc')
const RoomCancel = () => import('@/pages/RoomCancel')
const RateSucc = () => import('@/pages/RateSucc')
// const Bak=()=>import('@/pages/bak')
const OrderInfo = () => import('@/pages/OrderInfo')


const yuyuechengong = () => import('@/pages/yuyuechengong')
const yuyuequxiao = () => import('@/pages/yuyuequxiao')
const  diancancaipin= () => import('@/pages/diancan/diancancaipin')
const  diancanchance= () => import('@/pages/diancan/diancanchance')
const  dianchanzhifu= () => import('@/pages/diancan/dianchanzhifu')
const  erwui= () => import('@/pages/erwui')
const  vipinfor= () => import('@/pages/vipinfor')
const  zhanhaoanquan= () => import('@/pages/zhanhaoanquan')

const  mima= () => import('@/pages/mima')
const  shoujihao= () => import('@/pages/shoujihao')
const  xitontonzi= () => import('@/pages/xitontonzi')


const  dianlei= () => import('@/pages/diancan/dianlei')
const  peishon= () => import('@/pages/diancan/peishon')

const  append= () => import('@/pages/diancan/append')
const receipt= () => import('@/pages/diancan/receipt')
const saoma= () => import('@/pages/diancan/saoma')

const redact= () => import('@/pages/diancan/redact')

const showFood= () => import('@/pages/reserve/showFood')
const index= () => import('@/pages/reserve/index')

export default [
  {
    path: '/',
    name: 'Login',
    components: {
      default: Login,

    },
    meta: {
      title: '登录'
    }
  },
  {
    path: '/index',
    name: 'Login',
    components: {
      default: index,

    },
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: Home,
      tabbar: Tabbar
    },
    meta: {
      title: '首页'
    }
  }, {
    path: '/order',
    name: 'order',
    components: {
      default: Order,
      tabbar: Tabbar
    },
    meta: {
      title: '订单'
    }
  }, {
    path: '/mine',
    name: 'mine',
    components: {
      default: Mine,
      tabbar: Tabbar
    },
    meta: {
      title: '个人信息'
    }
  }, {
    path: '/setting',
    name: 'setting',
    components: {
      default: Setting
    },
    meta: {
      title: '设置'
    }
  }, {
    path: '/userinfo',
    name: 'userinfo',
    components: {
      default: UserInfo
    },
    meta: {
      title: '个人信息'
    }
  }, {
    path: '/vipres',
    name: 'vipres',
    components: {
      default: VipRegister
    },
    meta: {
      title: '会员注册'
    }
  },
  {
    path: '/voucher',
    name: 'voucher',
    components: {
      default: Voucher
    },
    meta: {
      title: '充值'
    }
  }, {
    path: '/info',
    name: 'info',
    components: {
      default: Info
    },
    meta: {
      title: '消息中心'
    }
  }, {
    path: '/baojianlist',
    name: 'baojianlist',
    components: {
      default: BaojianList
    },
    meta: {
      title: '包间列表'
    }
  }, {
    path: '/BaojianDetail',
    name: 'baojiandetail',
    components: {
      default: BaojianDetail
    },
    meta: {
      title: '包间详情'
    }
  }, {
    path: '/TopRecommend',
    name: 'toprecommend',
    components: {
      default: TopRecommend
    },
    children: [
      {
        path: '/toplist',
        name: 'toplist',
        component: TopList
      },
      {
        path: '/recommendlist',
        name: 'recommendlist',
        component: RecommendList
      }
    ],
  }, {
    path: '/SystemNotice',
    name: 'systemnotice',
    components: {
      default: SystemNotice
    },
    meta: {
      title: '系统通知'
    }
  },
  {
    path: '/Reserve',
    name: 'reserve',
    components: {
      default: Reserve,
      tabbar: Tabbar,
    },
    meta: {
      title: '订单'
    },
    children: [
      {
        path: '/reserve/ReserveFood',
        name: 'reservefood',
        component: ReserveFood
      },
      {
        path: '/reserve/ReservePot',
        name: 'reservepot',
        component: ReservePot
      },
      {
        path: '/reserve/ReserveDessert',
        name: 'reservedessert',
        component: ReserveDessert
      },
      {
        path: '/reserve/showFood',
        name: 'showFood',
        component: showFood
      }
    ],
  }, {
    path: '/Cart',
    name: 'cart',
    components: {
      default: Cart
    },
    meta: {
      title: '餐车'
    }
  }, {
    path: '/RoomReserve',
    name: 'roomreserve',
    components: {
      default: RoomReserve
    },
    meta: {
      title: '包间预定'
    }
  }, {
    path: '/Rate',
    name: 'rate',
    components: {
      default: Rate,
      meta: {
        title: '评价订单'
      },
    }
  }, {
    path: '/Pay',
    name: 'pay',
    components: {
      default: Pay,
      meta: {
        title: '支付订单'
      },
    }
  }, {
    path: '/Login',
    name: 'login',
    components: {
      default: Login,
      meta: {
        title: '登录'
      },
    }
  }, {
    path: '/ReserveRoom',
    name: 'reserveroom',
    components: {
      default: ReserveRoom,
      meta: {
        title: '预定包间'
      },
    }
  }, {
    path: '/RoomSucc',
    name: 'roomsucc',
    components: {
      default: RoomSucc,
      meta: {
        title: '预定包间'
      },
    }
  }, {
    path: '/RoomCancel',
    name: 'roomcancel',
    components: {
      default: RoomCancel,
      meta: {
        title: '预定包间'
      },
    }
  }, {
    path: '/RateSucc',
    name: 'ratesucc',
    components: {
      default: RateSucc,
      meta: {
        title: '评价成功'
      }
    }
// },{
//     path:'/bak',
//     name:'bak',
//     components:{
//         default:Bak,
//     meta:{
//         title:'评价成功'
//     },
//   }
  },
  {
    path: '/OrderInfo',
    name: 'orderinfo',
    components: {
      default: OrderInfo,
      meta: {
        title: '订单详情'
      },
    }
  },
  {
    path: '/yuyuechengong',
    name: 'yuyuechengong',
    components: {
      default:yuyuechengong,
      meta: {
        title: '预定成功'
      },
    }
  },
  {
    path: '/yuyuequxiao',
    name: 'yuyuequxiao',
    components: {
      default: yuyuequxiao,
      meta: {
        title: '预定取消'
      },
    }
  },

  {
    path: '/diancanchance',
    name: 'diancanchance',
    components: {
      default: diancanchance,
      meta: {
        title: '点餐'
      },
    }
  },
  {
    path: '/dianchanzhifu',
    name: 'dianchanzhifu',
    components: {
      default: dianchanzhifu,
      meta: {
        title: '支付'
      },
    }
  },

  {
    path: '/erwui',
    name: 'erwui',
    components: {
      default: erwui,
      meta: {
        title: 'erwui'
      },
    }
  },
  {
    path: '/vipinfor',
    name: 'vipinfor',
    components: {
      default: vipinfor,
      meta: {
        title: 'vipinfor'
      },
    }
  },
  {
    path: '/zhanhaoanquan',
    name: 'zhanhaoanquan',
    components: {
      default: zhanhaoanquan,
      meta: {
        title: 'zhanhaoanquan'
      },
    }
  },
  {
    path: '/mima',
    name: 'mima',
    components: {
      default: mima,
      meta: {
        title: 'mima'
      },
    }
  },
  {
    path: '/shoujihao',
    name: 'shoujihao',
    components: {
      default: shoujihao,
      meta: {
        title: 'shoujihao'
      },
    }
  }
  ,
  {
    path: '/xitontonzi',
    name: 'xitontonzi',
    components: {
      default: xitontonzi,
      meta: {
        title: 'xitontonzi'
      },
    }
  },
  {
    path: '/diancan',
    name: 'diancan',
    components: {
      default: Reserve,
      tabbar: Tabbar,
    },
    meta: {
      title: '点餐'
    },
    children: [
      {
        path: '/diancan/diancancaipin',
        name: 'diancancaipin',
        component: diancancaipin
      },
      {
        path: '/diancan/diancanchance',
        name: 'diancanchance',
        component: diancanchance
      },
      {
        path: '/diancan/dianchanzhifu',
        name: 'dianchanzhifu',
        component: dianchanzhifu
      },
      {
        path: '/diancan/peishon',
        name: 'peishon',
        component: peishon
      },
      {
        path: '/diancan/dianlei',
        name: 'dianlei',
        component: dianlei
      },

    ],
  },
  {
    path: '/append',
    name: 'append',
    components: {
      default: append,
      meta: {
        title: 'append'
      },
    }
  },
  {
    path: '/receipt',
    name: 'receipt',
    components: {
      default: receipt,
      meta: {
        title: 'receipt'
      },
    }
  },
  {
    path: '/saoma',
    name: 'saoma',
    components: {
      default: saoma
    },
    meta: {
      title: 'saoma'
    }
  },
  {
    path: '/redact',
    name: 'redact',
    components: {
      default: redact
    },
    meta: {
      title: 'redact'
    }
  },

]
