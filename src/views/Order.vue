<template>
  <div id="order">
  <div class="content" v-if="state.mainStore.isAuth">
  <div class="order-title">
    <p>订单</p>
  </div>
  <div class="donothave" v-if="!totalGoods.length">
    <div class="cart-image"><img src="..//assets/images/empty.png" height="64" width="64"></div>
    <div class="remind">
      <p>还有没订单记录，</p>
      <p><a v-link="{path:'/front_container/'}" class="hang-out">&nbsp去看看有没有想买的>> </a></p>
    </div>
    <div class="clear"></div>
  </div>

    <div class="dohave" v-else>
    <table class="cart_table">
      <tr class="table_title">
        <th class="table_info">商品信息</th>
        <th class="table_price">单价（元）</th>
        <th class="table_amount">数量</th>
        <th class="table_linetotal">金额（元）</th>
        <th class="table_opor">下单日期</th>
      </tr>
      <tr v-for="goods in totalGoods" class="cart_body">
        <td class="info">
        <span><a @click=getDetails(goods.goodsName) class="hoverturn">
        <img :src="goods.image" class="goods_img">
        </a></span>
        <span><a @click=getDetails(goods.goodsName) class="hoverturn">{{goods.goodsName}}</a></span>
        </td>
        <td class="red_price">¥{{goods.price}}</td>
        <td class="amount_class">
          {{goods.amount}}
        </td>
        <td class="red_price">¥{{goods.price*goods.amount}}</td>
        <td>{{goods.date}}</td>
      </tr>
    </table>
  </div>

  </div>
  <div v-else class="no_content">
    你还没有登录，请前往<a @click="turnToLogin()">登录</a>或<a @click="turnToRegister()">注册</a>。
  </div>
  </div>
</template>
<style type="text/css" scoped>
#order{
    margin:0px auto;
  }
  .content{
    margin:0px auto;
    width: 1000px;
  }
  .no_content{
    margin:0px auto;
    width: 1000px;
    height: 300px;
    font-size: 16px;
    text-align: center;
    padding-top: 100px;
  }
  .no_content a{
    font-weight: bold;
  }
  .no_content a:hover{
    cursor: pointer;
    color: black;
  }
  .order-title{
    font-size: 22px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    background: #424040;
    color: white;
    border-radius:4px;
    -moz-border-radius:25px;
  }
  .donothave{
    -moz-box-shadow: 0px 2px 3px #888888;
    box-shadow: 0px 2px 3px #888888;
    height: 300px;
    margin: 0px auto;
    text-align: center;
    padding-top: 90px;
    background: #F9F9F9;
    margin-top: 10px;
    margin-bottom: 20px;
    padding-left: 320px;
    border-radius:4px;
    -moz-border-radius:25px;
  }
  .donothave>div{
    float: left;
  }
  .clear{
    clear: both;
  }
  .cart-image>img{
    width: 80px;
    height: 80px;
  }
  .remind{
    font-size: 18px;
    margin-top: 30px;
    height: 30px;
    margin-left: 20px;
  }
  .remind p{
    float: left;
  }
  .hang-out{
    font-size: 14px;
  }
  .dohave{
    height: auto;
    margin: 0px auto;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius:4px;
    -moz-border-radius:25px;
  }


  .dohave{
    height: auto;
    margin: 0px auto;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius:4px;
    -moz-border-radius:25px;
  }
  .cart_table{
    margin: 0px auto;
    width: 960px;
    margin-bottom: 20px;
  }
  .table_title{
    font-size: 16px;
    -moz-box-shadow: 0px 10px 8px #F9F9F9;
    box-shadow: 0px 10px 8px #F9F9F9;
  }
  .table_title th{
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .table_info{
    width: 340px;
    text-align: center;
  }
  .info{
    text-align: left;
    padding-left: 50px;
  }
  .table_price{
    width: 100px;
  }
  .table_amount{
    width: 180px;
  }
  .line_total{
    width: 100px;
  }
  .table_opor{
    width: 200px;
  }
  .cart_body {
    height: 100px;
    -moz-box-shadow: 0px 10px 8px #F9F9F9;
    box-shadow: 0px 10px 8px #F9F9F9;
  }
  .check{
    width: 16px;
    height: 16px;
  }
  .body_info span{
    float: left;
    line-height: 100px;
    margin-left: 30px;
    font-size: 14px;
  }
  .body_info span:hover{
    cursor: pointer;
  }
  .goods_img{
    width: 80px;
    height: 80px;
    transition:all 0.6s;
    -moz-transition:all 0.6s;/* Firefox 4 */
    -webkit-transition:all 0.6s; /* Safari and Chrome */
    -o-transition:all 0.6s; /* Opera */
  }
  .goods_img:hover{
    width: 90px;
    height: 90px;
  }
  .red_price{
    font: 14px;
    color: red;
    font-weight: bold;
  }
  .hoverturn:hover{
    cursor: pointer;
  }
</style>

<script type="text/javascript">
  export default {
    data() {
      return {

      }
    },
    ready() {
      if (!this.state.mainStore.isAuth) {
        this.state.mainStore.showLogin = true
      }
    },
    computed: {
      totalGoods: function () {
        return this.state.mainStore.orderGoods
    }
  },
    methods: {
      turnToRegister() {
        this.state.mainStore.showRegister = true
      },

      turnToLogin() {
        this.state.mainStore.showLogin = true
      },
      getDetails(goodsName) {
        var url = window.basePath + 'goods/details/' + goodsName
        this.$http({
        url: url,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.state.mainStore.goodsDetails = response.data
            router.go('/details')
          }
        }, function (response) {
          if (response.status === 400) {
            this.state.mainStore.warnAlertDetails = '抱歉，找不到这本书，请重试。'
            this.state.mainStore.showWarnAlert = true
          } else {
            this.state.mainStore.warnAlertDetails = '网络繁忙，请重试。'
            this.state.mainStore.showWarnAlert = true
          }
        })
      },
    }
  }
</script>

