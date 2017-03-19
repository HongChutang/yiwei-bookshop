<template>
  <div id="header">
    <div class="top_bar">
    </div>

    <div class="body">
      <div class="welcome">
        欢迎进入一味书屋！&nbsp&nbsp
        <span v-if="isAuth"><a @click="logout()">【注销】</a></span>
        <span v-else>
          <a @click="showLogin()">【登录】</a>
          <a @click="showRegister()">【注册】</a>
        </span>
      </div>

      <div class="logo_div"><a href="#"><img src="../assets/images/logo1.png"></a></div>

      <div class="query_div">
        <div>
          <vs-select :value.sync="selectedType" :options="queryTypes" options-value="val" class="type_select" :change="typesFilt()"></vs-select>
          <vs-typeahead :value.sync="queryKey" :data="queryItems" :delay="typeaheadDelay" placeholder="找找想要的书..." class="query_ahead">
          </vs-typeahead>
          <button class="btn query_button" @click="query()">找找</button>
        </div>
      </div>
      <div class="entry_div">
        <vs-tooltip effect="fadein" trigger="hover" placement="top" content="用户信息">
          <a class="user" @click="state.mainStore.showUserInfo = true"><img src="../assets/images/user.png"></a>
        </vs-tooltip>
        <vs-tooltip effect="fadein" trigger="hover" placement="top" content="用户订单">
          <a class="order" v-link="{path:'/order'}"><img src="../assets/images/order.png"></a>
        </vs-tooltip>
        <vs-tooltip effect="fadein" trigger="hover" placement="top" content="购物车">
          <a class="cart" v-link="{path:'/cart'}"><img src="../assets/images/cart.png"></a>
        </vs-tooltip>
        <span class="cart_num" v-show="showCartNum">{{cartNum}}</span>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
  #header{
    margin:0px auto;
    height: 160px;
  }
  .top_bar{
    height: 28px;
    width: 100%;
    background: #424040;
    position: absolute;
    z-index: -1;
  }
  .body{
    height: 160px;
    margin:0px auto;
    width: 1000px;
  }
  .welcome{
    height: 27px;
    background: #424040;
    color: #F9F9F9;
    font-size: 14px;
    line-height: 28px;
    text-align: right;
    padding-right: 10px;
  }
  .welcome span a{
    cursor: pointer;
    color: #F9F9F9;
    font-size: 14px;
  }
  .welcome span a:hover{
    text-decoration: underline;
  }
  .logo_div{
    width: 150px;
    height: 132px;
    margin-left: -100px;
    float: left;
  }
  .logo_div a img{
    width: 150px;
    height: 150px;
    margin-top: -10px;
  }
  .query_div{
    float: left;
    height: 60px;
    margin-top: 30px;
  }
  .type_select{
    width: 120px;
    float: left;
    padding: 10px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .query_ahead{
    width: 745px;
    float: left;
    padding: 10px;
    background: #F9F9F9;
    border:none;
    border-radius:3px;
    -moz-border-radius:25px;
  }
  .query_button{
    height: 54px;
    margin-left: -10px;
    font-size: 16px;
    width: 80px;
    background: #F9F9F9;
    outline: none;
  }
  .query_button:focus{
    outline: none;
  }
  .entry_div{
    float: right;
    margin-right: 14px;
    margin-top: 10px;
  }
  .entry_div .user, .entry_div .order, .entry_div .cart{
    float: left;
  }
  .entry_div .user img, .entry_div .cart img{
    height: 26px;
    width: 26px;
  }
  .entry_div .order img{
    height: 25px;
    width: 25px;
  }
  .entry_div .user, .entry_div .order{
    margin-right: 28px;
  }
  .entry_div .user:hover{
    cursor: pointer;
  }
  .cart_num{
    margin-top: -6px;
    margin-left: -4px;
    background: #F0162C;
    color: #F9F9F9;
    width: 20px;
    height: 20px;
    text-align: center;
    float: left;
    border-radius:50%
  }
  .clear{
    clear: both;
  }
</style>

<script type="text/javascript">
import {select, typeahead, tooltip} from 'vue-strap'
  export default {
    components: {
      'vs-select': select,
      'vs-typeahead': typeahead,
      'vs-tooltip': tooltip
   },
    data() {
      return {
        queryTypes: [
          {val: 'all', label: '全部图书'},
          {val: 'hot', label: '近期热门'},
          {val: 'reco', label: '店家推荐'},
          {val: 'disc', label: '优惠回馈'},
          {val: 'lit', label: '文学长廊'},
          {val: 'life', label: '生活拾贝'},
          {val: 'tech', label: '科技博览'},
          {val: 'manage', label: '经管视野'},
          {val: 'youth', label: '青春成长'},
          {val: 'health', label: '健康同行'}
        ],
        selectedType: 'all',
        queryItems: [],
        typeaheadDelay: 0,
        queryKey: ''
      }
    },
    ready() {
      this.isAuth = this.state.mainStore.isAuth
      var url = window.basePath + 'goods/names/' + this.selectedType
      this.$http({
        url: url,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.queryItems = response.data
          }
        }, function (response) {
        })
    },
    methods: {
      showLogin() {
        this.state.mainStore.showLogin = true
      },
      showRegister() {
        this.state.mainStore.showRegister = true
      },
      showUserInfo() {
        this.state.mainStore.showUserInfo = true
      },
      typesFilt() {
      var url = window.basePath + 'goods/names/' + this.selectedType
      this.$http({
        url: url,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.queryItems = response.data
          }
        }, function (response) {
        })
      },
      query() {
        if (this.queryKey !== '') {
        var url = window.basePath + 'goods/details/' + this.queryKey
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
        }
      },
      logout() {
         if (window.confirm('确定注销吗?')) {
          this.state.mainStore.isAuth = false
         }
      }
    },
    computed: {
    showCartNum: function() {
      return this.state.mainStore.isAuth === true
    },
    cartNum: function(){
      return this.state.mainStore.cartGoods.length
    },
    isAuth: function() {
      return this.state.mainStore.isAuth
    }
  }
  }
</script>
