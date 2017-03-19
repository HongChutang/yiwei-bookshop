import Home from './views/Home.vue'
import Goods from './views/Goods.vue'
import Cart from './views/Cart.vue'
import Order from './views/Order.vue'
import Details from './views/Details.vue'

module.exports = function(router){
    router.map({
      '/home': {
        component: Home
      },
      '/goods': {
        component: Goods
      },
      '/details': {
        component: Details
      },
      '/cart': {
        component: Cart
      },
      '/order': {
        component: Order
      }
    })
}
