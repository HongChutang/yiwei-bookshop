<template>
<div id="details">
  <div class="content">
     <div class="page-left"><img :src="goodsDetails.image" class="page-left-image"></div>
     <div class="page-right">
         <ul>
         <li class="title-out"><p>{{goodsDetails.goodsName}}</p></li>
         <li class="intro-out1"><p>{{goodsDetails.description}}</p></li>
         <li class="price-out"><span class="price-label">价&nbsp&nbsp格:</span><span class="price-in">&nbsp¥{{goodsDetails.price}}</span></li>
         <li class="writer-out"><span class="writer-label">作&nbsp&nbsp者:</span><span class="writer-in">{{goodsDetails.author}}</span></li>
         <li class="category-out"><span class="category-label">分&nbsp&nbsp类:</span><span class="new_add">{{goodsDetails.typeLabel}}</span></li>
         <li class="amount-out1"><span class="amount-label1">数&nbsp&nbsp量:</span>
         <span class="amount_op">
         <button  @click="decrease()" class="btn btn-default">-</button>
         <input type="text" v-model="amount" class="amountText">
         <button  @click="increase()" class="btn btn-default">+</button>
         </span></li>
         <li class="category-out"><span class="category-label">库&nbsp&nbsp存:</span><span class="new_add">{{goodsDetails.stock}}</span></li>
         <li class="buttons-out"><span>
         <button  @click="addToCart()" class="btn btn-default">加入购物车</button>
         <button  @click="buy()" class="btn btn-default">马上购买</button>
         </li>
         </ul>
     </div>
     <div class="clear"></div>
  </div>
</div>
</template>


<script type="text/javascript">
  export default {
    data () {
    return {
        amount: 1,
        checked: true
      }
    },

    methods: {
      increase () {
        if (this.amount >= this.goodsDetails.stock) {
            window.alert('库存不足了！')
            return null
        }
        this.amount++
      },

      decrease () {
        if (this.amount > 1) {
            this.amount--
        }
      },

      addToCart() {
        if (!this.state.mainStore.isAuth) {
        this.state.mainStore.warnAlertDetails = "你还没有登录，赶紧登录吧"
        this.state.mainStore.showWarnAlert = true
        this.state.mainStore.showLogin = true
        } else {
          // if (this.state.mainStore.goodsDetails.stock < this.amount) {
          //   window.alert('库存不足了！')
          // }
          // 'http://localhost:8080/user1/' + this.state.mainStore.user.email + '/cart'
          var url = window.basePath + 'user1/'+this.state.mainStore.user.email+'/cart'
          this.$http({
          url: url,
          method: 'POST',
          data: {goodsName: this.goodsDetails.goodsName, price: this.goodsDetails.price,
          amount: this.amount, image: this.goodsDetails.image, checked: this.checked}}).then(function(response) {
            if (response.status === 200) {
              this.updateStock()
              this.getCartGoods(this.state.mainStore.user.email)
              window.alert('添加成功！')
            }
          }, function (response) {
              if (response.status === 400) {
                window.alert('库存不足了！')
              }
          })
        }
      },

      updateStock() {
        // 'http://localhost:8080/goods/cartstock/' + this.goodsDetails.goodsName
        var url = window.basePath + 'goods/cartstock/'+ this.goodsDetails.goodsName
          this.$http({
          url: url,
          method: 'GET'}).then(function(response) {
            if (response.status === 200) {
              this.state.mainStore.goodsDetails.stock = response.data.cartStock
            }
          }, function (response) {
          })
      },

      getCartGoods(email) {
        // 'http://localhost:8080/user1/' + email +'/cart'
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

      buy() {
        if (!this.state.mainStore.isAuth) {
        this.state.mainStore.warnAlertDetails = "你还没有登录，赶紧登录吧"
        this.state.mainStore.showWarnAlert = true
        this.state.mainStore.showLogin = true
        } else {
          var url = window.basePath + 'user1/'+this.state.mainStore.user.email+'/order'
          this.$http({
          url: url,
          method: 'POST',
          data: {goodsName: this.goodsDetails.goodsName, price: this.goodsDetails.price,
          amount: this.amount, image: this.goodsDetails.image}}).then(function(response) {
            if (response.status === 200) {
              this.updateStock()
              this.getOrderGoods(this.state.mainStore.user.email)
              window.alert('下单成功！')
            }
          }, function (response) {
              if (response.status === 400) {
                window.alert('库存不足了！')
              }
          })
        }
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
      }
    },
    computed: {
      goodsDetails: function() {
        this.amount = 1
        return this.state.mainStore.goodsDetails
      }
    },
    ready() {

    }
  }
</script>

<style type="text/css" scoped>
    #details{
    margin:0px auto;
    height: 480px;
    margin-bottom: 10px;
    }
    .content{
      margin:0px auto;
      width: 1000px;
      margin-top: 30px;
      height: 420px;
      -moz-box-shadow: 0px 2px 3px #888888; /* 老的 Firefox */
      box-shadow: 0px 2px 3px #888888;
      background: #F9F9F9;
      border-radius:4px;
      -moz-border-radius:25px;
    }
    .content .clear{
      clear: both;
    }
    .page-left{
        height: 100%;
        float: left;
        width: 360px;
        margin-left: 70px;
    }
    .page-left-image{
        margin-top: 30px;
        width: 360px;
        height: 360px;
        transition:all 0.6s;
        -moz-transition:all 0.6s;/* Firefox 4 */
        -webkit-transition:all 0.6s; /* Safari and Chrome */
        -o-transition:all 0.6s; /* Opera */
    }
    .page-left-image:hover{
        width: 400px;
        height: 400px;
        margin-top: 10px;
    }
    .page-right{
        height: 100%;
        float: right;
        width: 400px;
        margin-right: 70px;
    }
    .title-out{
        margin-top: 25px;
        margin-left: 10px;
    }
    .title-out>p{
        font-size: 20px;
        font-weight: bolder;

    }
    .intro-out1{
        margin-top: 5px;
        width: 375px;
        height:80px;
        margin-left: 25px;
    }
    .intro-out1>p{
        color: black;
        font-size: 14px;
        font-family: 微软雅黑;
    }
    .price-out{
        border-top: 1px solid #D9DCDA;
        padding-left: 10px;
        padding-top: 15px;
    }
    .price-label{
        font-size: 16px;
        letter-spacing: 5px;
    }
    .price-in{
        font-size: 18px;
        font-weight: bold;
        margin-left: 10px;
        color: #FE0537;
    }
    .writer-out{
        padding-left: 10px;
        padding-top: 15px;
    }
    .writer-label{
        font-size: 16px;
        letter-spacing: 6px;
    }
    .writer-in{
        font-size: 18px;
        margin-left: 10px;
    }
    .category-out{
        padding-left: 10px;
        padding-top: 15px;
    }
    .category-label{
        font-size: 16px;
        letter-spacing: 6px;
    }
    .amount-out1{
        margin-left: 10px;
        padding-top: 15px;
    }
    .amount-label1{
        font-size: 16px;
        letter-spacing: 6px;
    }
    .amount_op button{
      height: 24px;
      width: 24px;
      padding: 0px;
    }
    .amountText{
        border-radius:4px;
        -moz-border-radius:25px;
        height: 26px;
        text-align: center;
        width: 50px;
    }
    .buttons-out{
        margin-top: 20px;
        margin-left: 10px;
    }
    .buttons-out button{
      width: 120px;
    }
    .new_add{
      margin-left: 10px;
    }
</style>


