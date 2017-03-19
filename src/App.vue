<template>
  <div id="app">
    <my-subheader v-if="showSubheader"></my-subheader>
    <my-header id="app_header"></my-header>
    <router-view keep-alive transition-mode="out-in"></router-view>
    <div class="up" @click="toTop()">
      <img src="./assets/images/up.png">
    </div>
    <my-footer></my-footer>

    <my-logindialog :show.sync="showLogin" :title="loginDialog.title" :buttons="loginDialog.buttons" :on-click-outside="hideLoginOnClickOutside">
        <div class="log_body">
          <vs-input :value.sync="loginEmail" label="邮箱:" error="请检查邮箱格式" placeholder="请填写邮箱" :pattern="emailReg"  required icon>
          </vs-input>
          <vs-input :value.sync="loginPassword" label="密码:" error="提示：密码不少于8位" placeholder="请填写密码" minlength="8" required type="password">
          </vs-input>
          <img :src="captchaUrl" class="captcha"><button class="btn btn-default" @click="getCaptcha()">看不清，换一张</button>
          <vs-input :value.sync="loginCaptcha" label="验证码:" required error="请填写验证码">
          </vs-input>
          <input type="checkbox" id="remember" v-model="remember"><label for="remember">记住密码？</label>
          <button class="btn btn-default btn-block log_button" @click="login()">登录</button>
          <p class="turn">还没有账号？<a @click="turnToRegister()" class="turn_link">注册</a>一个吧！</p>
        </div>
    </my-logindialog>

    <my-registerdialog :show.sync="showRegister" :title="registerDialog.title" :buttons="registerDialog.buttons" :on-click-outside="hideRegisterOnClickOutside">
        <div class="log_body">
          <vs-input :value.sync="userName" label="用户名:" placeholder="请填写用户名" error="请填写用户名" required icon :style="background: white;">
          </vs-input>
          <vs-input :value.sync="registerEmail" label="邮箱:" error="请检查邮箱格式" placeholder="请填写邮箱" :pattern="emailReg" required icon >
          </vs-input>
          <vs-input :value.sync="registerPassord" label="密码:" error="密码不少于8位" placeholder="请填写密码" minlength="8" required icon type="password">
          </vs-input>
          <vs-input :value.sync="registerPassord1" label="密码:" error="两次填写密码不一致" :match="registerPassord" placeholder="请再次填写密码" required icon type="password"></vs-input>
          <img :src="captchaUrl" class="captcha"><button class="btn btn-default" @click="getCaptcha()">看不清，换一张</button>
          <vs-input :value.sync="registerCaptcha" label="验证码:" error="请填写验证码" required></vs-input>
          <button class="btn btn-default btn-block log_button" @click="register()">注册</button>
          <p class="turn">已有账号？赶紧<a @click="turnToLogin()" class="turn_link">登录</a>吧！</p>
        </div>
    </my-registerdialog>

    <warn-alert :show.sync="showWarnAlert" placement="top" duration="3000" type="warning" width="400px" dismissable>
      <span class="icon-ok-circled alert-icon-float-left"></span>
      <strong>温馨提醒</strong>
      <p>{{warnAlertDetails}}</p>
    </warn-alert>

    <success-alert :show.sync="showSuccessAlert" placement="top-right" duration="3000" type="success" width="400px" dismissable>
      <span class="icon-ok-circled alert-icon-float-left"></span>
      <strong>{{successTips}}</strong>
    </success-alert>
<!--
    <mt-popup
      :visible.sync="showUserInfo"
      position="right"
      class="mt_popup" :close-on-click-modal="false">

      <p class="bar">
        <span @click="hideUserInfo()" class="back"><<返回</span>
        <span class="title">我的一味</span>
      </p>
      <div class="content" v-if="state.mainStore.isAuth">
      <p class="avatar">
        <img :src="userInfo.avatar">
      </p>
      <p v-if="changeUserInfo">
        <label for="change_avatar">更换头像：</label><input type="file" id="change_avatar" @change="onFileChange">
      </p>
      <vs-input :value.sync="userInfo.username" label="昵称:" error="昵称不能为空" required :disabled = "!changeUserInfo">
      </vs-input>
      <vs-input :value.sync="userInfo.email" label="邮箱:" required disabled = "true">
      </vs-input>
      <vs-input :value.sync="userInfo.tel" label="手机:" error="请检查手机格式" :pattern="telReg" :disabled = "!changeUserInfo">
      </vs-input>
      <vs-input :value.sync="userInfo.address" label="地址:" :disabled = "!changeUserInfo" class="user_address" type="textarea">
      </vs-input>
      <button class="btn btn-default" v-if="!changeUserInfo" @click="changeUserInfo = true">修改信息</button>
      <button class="btn  btn-default" v-if="changeUserInfo" @click="changeUserInfo = false">取消</button>
      <button class="btn btn-default" v-if="changeUserInfo" @click="submitChangeUserInfo(userInfo.email)">确定</button>
      </div>
      <div v-else class="no_content">
        你还没有登录，请前往<a @click="turnToLogin1()">登录</a>或<a @click="turnToRegister1()">注册</a>。
      </div>
    </mt-popup> -->

    <vs-aside :show.sync="showUserInfo" placement="right" :width = "320" class="mt_popup">
      <p class="bar">
        <span @click="hideUserInfo()" class="back">返回</span>
        <span class="title">我的一味</span>
      </p>
      <div class="content" v-if="state.mainStore.isAuth">
      <p class="avatar">
        <img :src="userInfo.avatar">
      </p>
      <p v-if="changeUserInfo">
        <label for="change_avatar">更换头像：</label><input type="file" id="change_avatar" @change="onFileChange">
      </p>
      <vs-input :value.sync="userInfo.username" label="昵称:" error="昵称不能为空" required :disabled = "!changeUserInfo">
      </vs-input>
      <vs-input :value.sync="userInfo.email" label="邮箱:" required disabled = "true">
      </vs-input>
      <vs-input :value.sync="userInfo.tel" label="手机:" error="请检查手机格式" :pattern="telReg" :disabled = "!changeUserInfo">
      </vs-input>
      <vs-input :value.sync="userInfo.address" label="地址:" :disabled = "!changeUserInfo" class="user_address" type="textarea">
      </vs-input>
      <button class="btn btn-default" v-if="!changeUserInfo" @click="changeUserInfo = true">修改信息</button>
      <button class="btn  btn-default" v-if="changeUserInfo" @click="changeUserInfo = false">取消</button>
      <button class="btn btn-default" v-if="changeUserInfo" @click="submitChangeUserInfo(userInfo.email)">确定</button>
      </div>
      <div v-else class="no_content">
        你还没有登录，请前往<a @click="turnToLogin1()">登录</a>或<a @click="turnToRegister1()">注册</a>。
      </div>
    </vs-aside>
  <div>
</template>
<script>
import MyHeader from './components/Header.vue'
import MyFooter from './components/Footer.vue'
import MySubheader from './components/SubHeader.vue'
import Dialog from './components/Dialog.vue'
import {input, alert} from 'vue-strap'
import aside from './components/Aside.vue'
import { Popup } from 'mint-ui'

export default {
  components: {
    MyHeader,
    MyFooter,
    MySubheader,
    "my-logindialog": Dialog,
    "my-registerdialog": Dialog,
    "vs-input": input,
    "vs-aside": aside,
    'warn-alert': alert,
    'success-alert': alert
  },

  data() {
    return {
      loginDialog:{
        title:{
            name:'一味书屋 | 登录',
            className:'log_title'
        },
        buttons:[
            {text:'取消', className:'', clickEvent:'hideLogin'}
        ]
      },
      registerDialog:{
        title:{
            name:'一味书屋 | 注册',
            className:'log_title'
        },
        buttons:[
            {text:'取消', className:'', clickEvent:'hideRegister'}
        ]
      },
      userName: '',
      registerEmail: '',
      registerPassord: '',
      registerPassord1: '',
      loginEmail: '',
      loginPassword: '',
      emailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      telReg: /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/,
      changeUserInfo: false,
      captchaUrl: window.basePath + 'captcha/randomStr',
      loginCaptcha: '',
      registerCaptcha: '',
      avatars: [],
      remember: true
    }
  },

  computed: {
    showSubheader: function() {
    var scollValue = 0
    $(window).scroll(function() {
        scollValue= $(document).scrollTop()// 获取垂直滚动的距离，即滚动了多少
        if (scollValue > 200){ //如果滚动距离大于550px则隐藏，否则删除隐藏类
            return true
        }
        else {
            return false
        }
     })
    },
    showLogin: function() {
      return this.state.mainStore.showLogin
    },
    showRegister: function() {
      return this.state.mainStore.showRegister
    },
    showWarnAlert: function() {
      return this.state.mainStore.showWarnAlert
    },
    warnAlertDetails: function() {
      return this.state.mainStore.warnAlertDetails
    },
    showSuccessAlert: function() {
      return this.state.mainStore.showSuccessAlert
    },
    successTips: function() {
      return this.state.mainStore.successTips
    },
    showUserInfo: function() {
      return this.state.mainStore.showUserInfo
    },
    userInfo: function() {
      return this.state.mainStore.user
    }
  },

  methods: {
    toTop() {
      window.scrollTo(0, 0)
    },

    hideLoginOnClickOutside() {
      this.state.mainStore.showLogin = false
    },

    hideRegisterOnClickOutside() {
      this.state.mainStore.showRegister = false
    },

    login() {
      this.$http({
        url: window.basePath + 'captcha',
        method: 'POST',
        data: {captcha: this.loginCaptcha}}).then(
        function (response) {
          if (response.status === 200) {
            this.loginExcecute()
            this.getCaptcha()
          }
        }, function (response) {
          if (response.status === 401) {
            window.alert('验证码错误！')
          } else {
            window.alert('网络故障，请稍后再试！')
          }
          this.getCaptcha()
        })
    },

    loginExcecute() {
      this.$http({
        url: window.basePath + 'login',
        method: 'POST',
        data: {email: this.loginEmail, password: this.loginPassword}}).then(
        function (response) {
          if (response.status === 200) {
            var token = response.data
            this.state.mainStore.token = token.token_type + ' ' + token.access_token
            window.alert('登陆成功！')
            this.state.mainStore.isAuth = true
            this.state.mainStore.showLogin = false
            if (this.remember === true) {
              // var b = new Base64()
              // window.localStorage.email = b.encode(this.loginEmail)
              // window.localStorage.password = b.encode(this.loginPassword)
              window.localStorage.email = this.loginEmail
              window.localStorage.password = this.loginPassword
            } else {
              window.localStorage.email = ''
              window.localStorage.password = ''
            }
            var email = this.loginEmail
            this.getUserInfo(email)
            this.getCartGoods(email)
            this.getOrderGoods(email)
            this.getCaptcha()
            this.loginPassword = ''
            this.loginEmail = ''
            this.loginCaptcha = ''
          }
        }, function (response) {
          if (response.status === 400) {
            window.alert('登录失败，邮箱或密码错误！')
          } else {
            window.alert('登录失败，邮箱或密码错误！')
          }
          this.getCaptcha()
        })
    },

    register() {
      this.$http({
        url: window.basePath + 'captcha',
        method: 'POST',
        data: {captcha: this.registerCaptcha}}).then(
        function (response) {
          if (response.status === 200) {
            this.registerExcecute()
            this.getCaptcha()
          }
        }, function (response) {
          if (response.status === 401) {
            window.alert('验证码错误！')
          } else {
            window.alert('网络故障，请稍后再试！')
          }
          this.getCaptcha()
        })
    },

    registerExcecute() {
      this.$http({
        url: window.basePath + 'register',
        method: 'POST',
        data: {username: this.userName, email: this.registerEmail, password: this.registerPassord}}).then(
        function (response) {
          if (response.status === 200) {
            window.alert('注册成功！')
            this.state.mainStore.showRegister = false
            this.state.mainStore.showLogin = true
            this.getCaptcha()
          }
        }, function (response) {
          if (response.status === 400) {
            window.alert('注册失败，该邮箱已被注册！')
          } else {
            window.alert('注册失败，请检查网络连接或稍后再试！')
          }
          this.getCaptcha()
        })
    },

    turnToRegister() {
      this.state.mainStore.showLogin = false
      this.state.mainStore.showRegister = true
    },

    turnToLogin() {
      this.state.mainStore.showRegister = false
      this.state.mainStore.showLogin = true
    },

    turnToRegister1() {
      this.state.mainStore.showUserInfo = false
      this.state.mainStore.showRegister = true
    },

    turnToLogin1() {
      this.state.mainStore.showUserInfo = false
      this.state.mainStore.showLogin = true
    },

    getUserInfo(email) {
      var url = window.basePath + 'user/' + email + '/info'
      this.$http({
        url: url,
        method: 'GET',
        data: {
          token: this.state.mainStore.token
        }}).then(
        function (response) {
          if (response.status === 200) {
            this.state.mainStore.user = response.data
          }
        }, function (response) {
            this.state.mainStore.warnAlertDetails = "获取用户信息失败，请检查网络连接或稍后再试！"
            this.state.mainStore.showWarnAlert = true
        })
    },

    //利用随机字符串改变验证码url子路径,重新获取验证码
    getCaptcha() {
      var randomStr = Math.random().toString(36).substr(2)
      this.captchaUrl = window.basePath + 'captcha/' + randomStr
    },

    getCartGoods(email) {
      var url = window.basePath + 'user1/' + email + '/cart'
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
      var url = window.basePath + 'user1/' + email + '/order'
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

    hideUserInfo() {
      this.state.mainStore.showUserInfo = false
    },

    onFileChange (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files)
      },
      createImage (file) {
        var vm = this
        var reader = null
        var leng = file.length
        for (var i = 0; i < leng; i++) {
          reader = new window.FileReader()
          reader.readAsDataURL(file[i])
          reader.onload = function (e) {
            vm.avatars.push(e.target.result)
          }
        }
    },

    submitChangeUserInfo(email) {
      var url = window.basePath + 'user1/' + email + '/info'
      this.$http({
        url: url,
        method: 'PUT',
        data: {username: this.userInfo.username, avatar: this.avatars[0], tel: this.userInfo.tel, address: this.userInfo.address}}).then(
        function (response) {
          if (response.status === 200) {
            this.getUserInfo(email)
            this.changeUserInfo = false
          }
        }, function (response) {
            this.state.mainStore.warnAlertDetails = "获取用户信息失败，请检查网络连接或稍后再试！"
            this.state.mainStore.showWarnAlert = true
        })
    }
  },

  ready() {
    this.loginPassword = window.localStorage.password
    this.loginEmail = window.localStorage.email
  },

  events: {
    hideLogin(){
        this.state.mainStore.showLogin = false
    },

    hideRegister(){
        this.state.mainStore.showRegister = false
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Microsoft YaHei;
}
a{
  text-decoration: none;
  color: black;
}
ul{
  margin: 0px;
  padding: 0px;
}
li{
  list-style: none;
}
.up{
  position: fixed;
  bottom: 60px;
  right: 40px;
  background: #424040;
  padding: 3px;
  border-radius:4px;
  -moz-border-radius:25px;
    z-index: 99;
}
.up:hover{
  background: black;
}
.log_title{
  background: #424040;
  color: #F9F9F9;
  letter-spacing: 5px;
  font-weight: bold;
}
.log_body{
  padding-top: 30px;
  padding-bottom: 30px;
  width: 500px;
  padding-left: 100px;
  padding-right: 100px;
}
.captcha{
  height: 40px;
  width: 100px;
  margin-left: 30px;
  margin-right: 10px;
  margin-bottom: 5px;
}
.log_button{
  margin-top: 30px;
  font-weight: bold;
  letter-spacing: 5px;
}
.turn{
  margin-top: 10px;
  padding-left: 10px;
  font-size: 14px;
}
.turn_link{
  font-weight: bold;
}
.turn_link:hover{
  cursor: pointer;
  color: black
}

.mt_popup .bar{
  background: #424040;
  margin: 0px;
  height: 50px;
  color: white;
  line-height: 50px;
}
.mt_popup .bar .back{
  font-size: 14px;
  margin-left: 20px;
  width: 40px;
}
.mt_popup .bar .back:hover{
  cursor: pointer;
  text-decoration: underline;
}
.mt_popup .bar .title{
  font-size: 16px;
  width: 100px;
  letter-spacing: 10px;
  margin-left: 45px;
}
.content{
  padding-left: 20px;
  padding-right: 20px;
}
.avatar{
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.avatar img{
  width: 80px;
  height: 80px;
  border-radius:50%;
  -moz-box-shadow: 0px 2px 5px #424040;
  box-shadow: 0px 2px 5px #424040;
}
.user_address{
  margin-bottom: 30px;
}
.no_content{
    font-size: 16px;
    text-align: center;
    margin-top: 240px;
  }
.no_content a{
    font-weight: bold;
  }
.no_content a:hover{
    cursor: pointer;
    color: black;
}
</style>
