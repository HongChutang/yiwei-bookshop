<template>
      <div class="image_wrap" @click="getGoods(typeName)">
      <div class="image">
      <a>
      <img src="../assets/images/404.png" v-lazyload:opt.fadein="imageUrl">
      </a>
      </div>
      <div id="shade">
        <p>{{typeLabel}}</p>
      </div>
      </div>
</template>
<style type="text/css" scoped>
  .image_wrap{
    height: 320px;
    width: 280px;
    border-radius:6px;
    -moz-border-radius:25px;
  }
  .image{
    height: 320px;
    width: 280px;
    border-radius:6px;
    -moz-border-radius:25px;
  }
  .image a img{
    height: 320px;
    width: 280px;
    border-radius:6px;
    -moz-border-radius:25px;
  }
  #shade{
    color: #464545;
    opacity: 0.9;
    border-radius:6px;
    -moz-border-radius:25px;
    font-size: 26px;
    letter-spacing: 5px;
    text-align: center;
    line-height: 320px;
    margin-top: -320px;
    height: 0px;
    width: 280px;
    background: black;
    transition:all 0.4s;
    -moz-transition:all 0.4s;/* Firefox 4 */
    -webkit-transition:all 0.4s; /* Safari and Chrome */
    -o-transition:all 0.4s; /* Opera */
  }
  #shade:hover{
    opacity: 0.8;
    height: 320px;
    color: white;
  }
  #shade p{
    height: 320px;
    width: 280px;
  }
</style>

<script type="text/javascript">
  export default {
    props: [
      'imageUrl',
      'typeName',
      'typeLabel'
    ],
    methods: {
      getGoods(typeName) {
        var url1 = window.basePath + 'goods/'+typeName
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

        var url2 = window.basePath + 'goods/banner/'+typeName
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
    }
  }
</script>

