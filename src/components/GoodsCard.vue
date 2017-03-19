<template>
    <div class="goods_div">
      <div class="goods_card">
        <div class="image_wrap">
        <div class="image">
        <a @click="getDetail(goodsName)">
          <img src="../assets/images/404.png" height="16" width="39" v-lazyload:opt.fadein="imageUrl">
        </a>
        </div>
        </div>
        <div class="info">
          <p class="name"><a @click="getDetail(goodsName)">{{goodsName}}</a></p>
          <p class="author">{{author}}</p>
          <p><span class="price">¥{{price}}</span><span class="add_cart" @click="addToCart()">加入购物车</span></p>
        </div>
      </div>
    </div>
</template>
<style type="text/css" scoped>
  .goods_div{
    width: 172px;
  }
  .goods_card{
    height: 300px;
    width: 172px;
    border-radius:6px;
    -moz-border-radius:25px;
  }
  .image_wrap{
    overflow: hidden;
    height: 190px;
    width: 170px;
    border-radius:6px;
    -moz-border-radius:25px;
  }
  .image_wrap .image a img{
    height: 190px;
    width: 170px;
    border-radius:6px;
    -moz-border-radius:25px;
  }
  .image_wrap .image{
    height: 190px;
    width: 170px;
    transition:all 0.6s;
    -moz-transition:all 0.6s;/* Firefox 4 */
    -webkit-transition:all 0.6s; /* Safari and Chrome */
    -o-transition:all 0.6s; /* Opera */
  }
  .image a{
    cursor: pointer;
  }
  .image_wrap .image:hover{
    transform: scale(1.2);
  }
  .info{
    height: 110px;
    width: 170px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .info .name{
    font-size: 14px;
    font-weight: bold;
  }
  .info .name a{
    cursor: pointer;
  }
  .info .author{
    font-size: 14px;
  }
  .info .price{
    font: 14px;
    color: red;
    font-weight: bold;
  }
  .add_cart{
    float: right;
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }
  .add_cart:hover{
    cursor: pointer;
    text-decoration: underline;
  }
</style>

<script type="text/javascript">
  export default {
    props: [
      'imageUrl',
      'goodsName',
      'author',
      'price'
    ],
    methods: {
      getDetail(goodsName) {
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

    addToCart() {
        if (!this.state.mainStore.isAuth) {
        this.state.mainStore.warnAlertDetails = "你还没有登录，赶紧登录吧"
        this.state.mainStore.showWarnAlert = true
        this.state.mainStore.showLogin = true
        } else {
          // if (this.state.mainStore.goodsDetails.stock < this.amount) {
          //   window.alert('库存不足了！')
          // }
          var url = window.basePath + 'user1/'+this.state.mainStore.user.email+'/cart'
          this.$http({
          url: url,
          method: 'POST',
          data: {goodsName: this.goodsName, price: this.price,
          amount: 1, image: this.imageUrl, checked: true}}).then(function(response) {
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
        var url = window.basePath + 'goods/cartstock/'+ this.goodsName
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
      }
    }
  }
</script>

