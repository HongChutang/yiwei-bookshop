<template>
  <div id="cart">
  <div class="content" v-if="state.mainStore.isAuth">
  <div class="cart-title">
    <p>购物车</p>
  </div>
  <div class="donothave" v-if="!totalGoods.length">
    <div class="cart-image"><img src="..//assets/images/empty.png" height="64" width="64"></div>
    <div class="remind">
      <p>购物车空空如也~</p>
      <p><a v-link="{path:'/home'}" class="hang-out">&nbsp去逛逛 >> </a></p>
    </div>
    <div class="clear"></div>
  </div>
  <div class="dohave" v-else>
    <table class="cart_table">
      <tr class="table_title">
        <th class="table_check"><input type="checkbox" id="check" @click="checkAll()" v-model="flag" class="check"><label for="check">全选</label></th>
        <th class="table_info">商品信息</th>
        <th class="table_price">单价（元）</th>
        <th class="table_amount">数量</th>
        <th class="table_linetotal">金额（元）</th>
        <th class="table_opor">操作</th>
      </tr>
      <tr v-for="goods in totalGoods" class="cart_body">
        <td><input type="checkbox" value="" v-model="goods.checked" class="check"></td>
        <td class="body_info">
        <span><a @click=getDetails(goods.goodsName)>
        <img :src="goods.image" class="goods_img">
        </a></span>
        <span><a @click=getDetails(goods.goodsName)>{{goods.goodsName}}</a></span>
        </td>
        <td class="red_price">¥{{goods.price}}</td>
        <td class="amount_class">
            <button class="btn btn-default amount_button" @click="decrease(goods)">-</button>
            <input type="text" v-model="goods.amount" class="amount_text">
            <button class="btn btn-default amount_button" @click="increase(goods)">+</button>
        </td>
        <td class="red_price">¥{{goods.price*goods.amount}}</td>
        <td><img src="../assets/images/throw.png" @click="deleteGoods(goods)" class="throw"></td>
      </tr>
    </table>
    <div class="footer">
      <ul>
      <li class="footer_check" ><input type="checkbox" id="footer_check" @click="checkAll()" v-model="flag" class="check"><label for="footer_check">全选</label></li>
      <li class="total_out"><span class="total_label">合计：</span><span class="total">¥{{bigamount}}</span></li>
      <li><button class="sumup_button btn" @click="sumUp()">结算</button></li>
      </ul>
    </div>
  </div>
  </div>
  <div v-else class="no_content">
    你还没有登录，请前往<a @click="turnToLogin()">登录</a>或<a @click="turnToRegister()">注册</a>。
  </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      turnToRegister() {
        this.state.mainStore.showRegister = true
      },

      turnToLogin() {
        this.state.mainStore.showLogin = true
      },

      deleteGoods (goods) {
        if (window.confirm('确定删除该商品?')) {
          var url = window.basePath + 'user1/' + this.state.mainStore.user.email + '/cart/' + goods.goodsName
          this.$http({
            url: url,
            method: 'DELETE'}).then(function (response) {
            if (response.status === 200) {
              this.getCartGoods(this.state.mainStore.user.email)
            }
          }, function (response) {
              window.alert('删除失败，请重试！')
          })
        }
      },

      getCartGoods(email) {
      var url = window.basePath + 'user1/'+email+'/cart'
      this.$http({
        url: url,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.state.mainStore.cartGoods = response.data
          }
        }, function (response) {
        })
      },

      getOrderGoods(email) {
      var url = window.basePath + 'user1/'+email+'/order'
      this.$http({
        url: url,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.state.mainStore.orderGoods = response.data
          }
        }, function (response) {
        })
      },

      checkAll () {
        var flag = 1
        for (var i = 0; i < this.totalGoods.length; i++) {
            if (this.totalGoods[i].checked !== true) {
                flag = 0
                break
            }
        }
        if (flag === 0) {
          for (i = 0; i < this.totalGoods.length; i++) {
            this.totalGoods[i].checked = true
          }
        }
        if (flag === 1) {
          for (i = 0; i < this.totalGoods.length; i++) {
            this.totalGoods[i].checked = false
          }
        }
      },

      increase (goods) {
        var url = window.basePath + 'goods/stock/'+ goods.goodsName
          this.$http({
          url: url,
          method: 'GET'}).then(function(response) {
            if (response.status === 200) {
              if (response.data.stock > goods.amount) {
                goods.amount++
              } else {
                window.alert('库存不足了！')
              }
            }
          }, function (response) {
          })
      },

      decrease (goods) {
        if (goods.amount > 1) {
          goods.amount = goods.amount - 1
        }
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

      sumUp () {
        var flag = false
        var length = this.totalGoods.length
        for (var k = 0; k < length; k++) {
          if (this.totalGoods[k].checked) {
            flag = true
          }
        }
        if (!flag) {
          window.alert('您未选择任何商品。')
          return null
        }
        var url = window.basePath + 'user1/'+this.state.mainStore.user.email+'/cart'
        for(var i=0; i<length; i++) {

        var goods = this.totalGoods[i]
        this.$http({
        url: url,
        method: 'PUT',
        data: {goodsName: goods.goodsName, price: goods.price,
          amount: goods.amount, image: goods.image, checked: goods.checked}}).then(
        function (response) {
          if (response.status === 200) {
            this.getCartGoods(this.state.mainStore.user.email)
            this.getOrderGoods(this.state.mainStore.user.email)
            window.alert('购买成功!')
          }
        }, function (response) {
        })

        }
      }
    },
    ready() {
      if (!this.state.mainStore.isAuth) {
        this.state.mainStore.showLogin = true
      }
    },

    computed: {

    totalGoods: function () {
      return this.state.mainStore.cartGoods
    },

    flag: function () {
      var f = 1
      for (var i = 0; i < this.totalGoods.length; i++) {
        if (this.totalGoods[i].checked !== true) {
          f = 0
          break
        }
      }
      if (f === 0) {
        return false
      }
      if (f === 1) {
        return true
      }
    },

    bigamount: function () {
      var sum = 0
      for (var i = 0; i < this.totalGoods.length; i++) {
        if (this.totalGoods[i].checked === true) {
          var temp = this.totalGoods[i].price * this.totalGoods[i].amount
          sum += temp
        }
      }
      return sum.toFixed(2)
    }
  }
}
</script>
<style type="text/css" scoped>
  #cart{
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
  .cart-title{
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
  .hang-out:hover{
    /*text-decoration:underline;*/
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
  .table_check{
    width: 100px;
  }
  .table_info{
    width: 390px;
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
    width: 100px;
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
  .amount_class button{
    height: 20px;
    width: 20px;
    padding: 0px;
  }
  .amount_text{
    width: 60px;
    height: 26px;
    text-align: center;
    border-radius:4px;
    -moz-border-radius:25px;
  }
  .throw{
    width: 22px;
    height: 22px;
  }
  .throw:hover{
    cursor: pointer;
  }
  .footer{
    background: #F9F9F9;
    border-radius:4px;
    -moz-border-radius:25px;
    height: 50px;
    background-color: #D3DADB;
  }
  .footer_check{
    margin-left: 30px;
    line-height: 50px;
    font-size: 16px;
    float: left;
  }
  .sumup_button{
    float: right;
    background: #424040;
    color: white;
    height: 50px;
    /*line-height: 50px;*/
    text-align: center;
    width: 100px;
    font-size: 22px;
    outline: none;
    border-radius:4px;
    -moz-border-radius:25px;
  }
  .sumup_button:hover{
    background: black;
  }
  .total_out{
    float: left;
    width: 200px;
    margin-left: 560px;
  }
  .total_label{
    line-height: 30px;
    width: 30px;
    font-size: 16px;
    font-weight: bolder;
  }
  .total{
    color: red;
    font-weight: bold;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>
