<template>
  <my-banner :banner-img="banner.bannerImg" :title="banner.title" :sub-title="banner.subTitle"></my-banner>
  <div id="home">
    <div class="slider_div">
      <my-slider class="slider" :items = "sliderItems"></my-slider>
    </div>
    <div class="goods_type_div">
      <ul v-for="goodsTypesLine in goodsTypes">
        <li>
          <ul v-for="goodsType in goodsTypesLine">
            <li class="type_card"  v-bind:class="{middle: $index===1, left: $index===0, right: $index===2 }">
              <my-typecard :image-url="goodsType.image" :type-name="goodsType.typeName"
              :type-label="goodsType.typeLabel"></my-typecard>
            </li>
          </ul>
        </li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  #home{
    margin:0px auto;
  }
  .slider_div{
    height: 500px;
    margin:0px auto;
    width: 1000px;
    padding-top: 50px;
    padding-bottom: 50px;
    background: white;
    margin-top: 400px;
    z-index: 2;
    -moz-box-shadow: 0px 3px 5px #888888; /* 老的 Firefox */
    box-shadow: 0px 3px 5px #888888;
  }
  .slider{
    margin:0px auto;
    width: 900px;
    height: 410px;
  }
  .goods_type_div{
    height: auto;
    margin:0px auto;
    width: 1000px;
  }
  .type_card{
    float: left;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .middle{
    margin-left: 80px;
  }
  .clear{
    clear: both;
  }
</style>

<script type="text/javascript">
import Banner from '../components/Banner.vue'
import Slider from '../components/slider/Slider.vue'
import TypeCard from '../components/TypeCard.vue'
  export default {
    components: {
      'my-banner': Banner,
      'my-slider': Slider,
      'my-typecard': TypeCard
    },
    data() {
      return {
        banner: {},
        goodsTypes: [],
        sliderItems: []
      }
    },
    methods: {
    },
    ready() {
        this.$http({
        url: window.basePath + 'goods/types/slider',
        method: 'GET',
        data: {}}).then(
        function (response) {
          if (response.status === 200) {
            this.sliderItems = response.data
          }
        }, function (response) {

        })

        this.$http({
        url: window.basePath + 'goods/types/block',
        method: 'GET',
        data: {}}).then(
        function (response) {
          if (response.status === 200) {
            var responseArray = response.data
            var lineNum = 0
            if (responseArray.length%3 === 0) {
              lineNum = responseArray.length/3
            } else {
              lineNum = responseArray.length/3 + 1
            }
            var targetArray = []
            for (var i = 0; i < lineNum; i++) {
              var subArray = []
              for(var j = 0; j < 3; j++) {
                subArray.push(responseArray[i*3+j])
              }
              this.goodsTypes.push(subArray)
            }
          }
        }, function (response) {

        })

        this.$http({
        url: window.basePath + 'goods/banner/home',
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.banner = response.data
          }
        }, function (response) {

        })
    }
  }
</script>

