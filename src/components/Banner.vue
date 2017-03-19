<template>
  <div id="banner_com">
    <div class="banner">
      <img :src="bannerImg" v-lazyload:opt.fadein="img">
    </div>
    <div class="topic">
      <p class="title">{{title}}</p>
      <p class="sub_title">{{subTitle}}</p>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  #banner_com{
    margin:0px auto;
    z-index: -1;
    position: absolute;
    width: 100%;
  }
  .banner{
    height: 520px;
    width: 100%;
  }
  .banner img{
    height: 520px;
    width: 100%;
  }
  .topic{
    margin: 0px auto;
    width: 600px;
    text-align: center;
    color: #F9F9F9;
    margin-top: -400px;
    margin-bottom: 260px;
  }
  .title{
    font-size: 70px;
    /*font-family: 楷体;*/
    letter-spacing: 10px;
    text-shadow: 10px 10px 10px #424040;
  }
  .sub_title{
    font-size: 24px;
    letter-spacing: 5px;
    text-shadow: 5px 5px 5px #424040;
  }
</style>

<script type="text/javascript">
  export default {
    props: ['bannerImg', 'title', 'subTitle']
  }
</script>
