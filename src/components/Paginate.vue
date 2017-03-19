<template>
    <div id="paging">
        <div class="page_list">
            <ul v-for="line in curPage">
            <li>
            <ul v-for="item in line">
                <li class="goods_card"  v-bind:class="{middle: $index===2, left: $index===0, right: $index===4 }">
              <my-goodscard :image-url="item.image" :goods-name="item.goodsName" :author="item.author" :price="item.price"></my-goodscard>
                </li>
            </ul>
            </li>
            </ul>
            <div class="clear"></div>
        </div>
        <div class="operation">
            <button class="btn btn-default" @click="toFirst()">首页</button>
            <button class="btn btn-default" @click="previous()">上一页</button>
            <span class="pages_index">
                {{curIndex+1}}&nbsp-&nbsp{{pageNum}}
            </span>
            <button class="btn btn-default" @click="next()">下一页</button>
            <button class="btn btn-default" @click="toLast()">尾页</button>
        </div>
    </div>
</template>
<style type="text/css" scoped>
  .goods_card{
    float: left;
    margin-bottom: 5px;
  }
  .left{
    float: left;
    margin-right: 34px;
  }
  .right{
    float: right;
    margin-left: 34px;
  }
  .middle{
    margin-left: 34px;
    margin-right: 34px;
  }
  .clear{
    clear: both;
  }
  .operation{
    margin-top: 40px;
    text-align: center;
    margin-bottom: 40px;
  }
  .pages_index{
    font-size: 18px;
  }
</style>
<script type="text/javascript">
import GoodsCard from '../components/GoodsCard.vue'
export default {
  components: {
    'my-goodscard': GoodsCard
  },
  props: [
    'itemsList'
  ],
  data() {
    return {
      curIndex: 0,
      linesPerPage: 5
    }
  },
  computed: {
    pageNum: function() {
        return Math.ceil(this.itemsList.length/this.linesPerPage)
    },
    curPage: function() {
        let vm = this
        let newPage = []
        let tmp = vm.itemsList.length - vm.curIndex*vm.linesPerPage
        let newLength = (tmp<vm.linesPerPage ? tmp : vm.linesPerPage)
        for (var i = 0; i < newLength; i++) {
            newPage[i] = vm.itemsList[i+vm.curIndex*vm.linesPerPage]
        }
        return newPage
    }
  },
  methods: {
    toFirst() {
        this.curIndex = 0
    },
    previous() {
        if (this.curIndex>0) {
            this.curIndex--
        }
    },
    turnPage(index) {
        this.curIndex = index
    },
    next() {
        if (this.curIndex<this.pageNum-1) {
            this.curIndex++
        }
    },
    toLast() {
        this.curIndex = this.pageNum-1
    },
    saveSearchParams(title, url) {
      this.state.searchResult.url = url
      this.state.searchResult.title = title
    }
  }
}
</script>
