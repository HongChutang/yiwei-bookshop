<template>
  <my-banner :banner-img="banner.bannerImg" :title="banner.title" :sub-title="banner.subTitle"></my-banner>
  <div id="goods">
    <div class="goods_div">
      <my-paginate :items-list="goods"></my-paginate>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  #goods{
    margin:0px auto;
    margin-top: 400px;
  }
  .goods_div{
    height: auto;
    margin:0px auto;
    width: 1000px;
  }
</style>

<script type="text/javascript">
import Banner from '../components/Banner.vue'
import Slider from '../components/slider/Slider.vue'
import Paginate from '../components/Paginate.vue'

  export default {
    components: {
      'my-banner': Banner,
      'my-slider': Slider,
      'my-paginate': Paginate
    },
    data() {
      return {
      }
    },
    computed: {
      goods: function() {
        return this.state.mainStore.goods
      },
      banner: function() {
        return this.state.mainStore.banner
      }
    }
  }
</script>

