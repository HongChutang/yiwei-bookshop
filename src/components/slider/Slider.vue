<template>
<div class="slider" @mouseover = "pause && pausePlay()" @mouseout = "pause && goPlay()">
  <ul :style="{'width': `${this.count * 100}%`, 'left': `${-100 * this.current}%`, transitionDuration: `${this.speed}s`}">
    <li class="slider-item" v-for="item in items" :style="{'width': `${100 / this.count}%`}">
      <a :style="width: 100%" @click=getGoods(item.typeName)><img :src="item.image", :alt="item.typeLabel" :style="width: 100%"></a>
    </li>
  </ul>
  <slider-dots v-if="dots", :count="count", :current="current", :turn="turn"></slider-dots>
  <slider-arrows v-if="arrows", :turn="turn"></slider-arrows>
</div>
</template>

<script>
  import SliderDots from './SliderDots'
  import SliderArrows from './SliderArrows'
  export default {
    components: {
      SliderDots,
      SliderArrows
    },
    data () {
      return {
        current: 0,
        autoPlayFlag: null
      }
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      count: {
        type: Number,
        required: false,
        default: 3
      },
      dots: {
        type: Boolean,
        required: false,
        default: false
      },
      arrows: {
        type: Boolean,
        required: false,
        default: true
      },
      autoplay: {
        type: Boolean,
        required: false,
        default: true
      },
      delay: {
        type: Number,
        required: false,
        default: 3
      },
      speed: {
        type: Number,
        required: false,
        default: 2
      },
      pause: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    methods: {
      turn (i) {
        let _i = this.current + i
        if (_i < 0) {
          (_i = _i + this.count)
        }
        if (_i >= this.count) {
          _i = _i - this.count
        }
        this.current = _i
      },
      goPlay () {
        if (this.autoplay) {
          this.autoPlayFlag = setInterval(() => {
            this.turn(1)
          }, this.delay * 1000)
        }
      },
      pausePlay () {
        clearInterval(this.autoPlayFlag)
      },
            getGoods(typeName) {
        var url1 = window.basePath + 'goods/' + typeName
        this.$http({
        url: url1,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            var goods = []
            var responseArray = response.data
            var lineNum = 0
            lineNum = parseInt(responseArray.length/5)
            var numOfRest = responseArray.length - lineNum * 5
            //整行
            for (var i = 0; i < lineNum; i++) {
              var subArray = []
              for(var j = 0; j < 5; j++) {
                subArray.push(responseArray[i*5+j])
              }
              console.log(subArray.length)
              goods.push(subArray)
            }
            //非整行
            var restArray = []
            for (var i = lineNum * 5; i < numOfRest + lineNum * 5; i++) {
              restArray.push(responseArray[i])
            }
            goods.push(restArray)
            this.state.mainStore.goods = goods
          }
        }, function (response) {

        })

        var url2 = window.basePath + 'goods/banner/' +typeName
        this.$http({
        url: url2,
        method: 'GET'}).then(
        function (response) {
          if (response.status === 200) {
            this.state.mainStore.banner = response.data
          }
        }, function (response) {

        })
        router.go('/goods')
      }
    },
    ready () {
      this.goPlay()
    }
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.slider {
  overflow: hidden;
  width: 100%;
  position: relative;
  top: -6px;
  margin-bottom: -5px;
  border-bottom: 1px solid grey;
    border-radius:6px;
    -moz-border-radius:25px;
}
.slider > ul {
  overflow: hidden;
  position: relative;
  left: 0;
  transition: left 1s;
}
.slider .slider-item {
  display: inline-block;
}
.slider .slider-item > a > img {
  display: block;
  width: 100%;
  height: 410px;
}
.slider .slider-arrow {
  display: inline-block;
  color: #fff;
  font-size: 50px;
  position: absolute;
  top: 50%;
  margin-top: -50px;
  z-index: 100;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
}
.slider .slider-arrow:hover {
  background: rgba(0, 0, 0, 0.2);
}
.slider .slider-arrow.slider-arrow-right {
  right: 0;
}
.slider .slider-arrow.slider-arrow-left {
  left: 0;
}
.slider .slider-dots-wrap {
  z-index: 99;
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.slider .slider-dots-wrap .slider-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border: 5px solid #fff;
  margin: 6px;
  cursor: pointer;
  border-radius: 20px;
}
.slider .slider-dots-wrap .slider-dot:hover {
  border: 5px solid #868686;
}
.slider .slider-dots-wrap .slider-dots .slider-dot-selected {
  border: 5px solid red;
}
</style>
