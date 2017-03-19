export default {
  name: 'mainStore',
  state: {
    isAuth: false,
    user: {},
    showLogin: false,
    showRegister: false,
    goodsDetails: {},
    cartGoods: [],
    orderGoods: [],
    showWarnAlert: false,
    showSuccessAlert: false,
    warnAlertDetails: '',
    successTips: '',
    showUserInfo: false,
    token: '',
    banner: {},
    goods: []
  }
}
