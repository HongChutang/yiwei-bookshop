<template>
  <div id="sub_header">
    <div class="body">
      <div class="logo_div"><a href=""><img src="../assets/images/logo1.png"></a></div>
      <div class="query_div">
        <div>
          <vs-select :value.sync="selectedType" :options="queryTypes" options-value="val" class="type_select"></vs-select>
          <vs-typeahead :data="queryItems" placeholder="在书屋内找找想要的书..." class="query_ahead">
          </vs-typeahead>
          <button class="btn btn-default query_button">找找</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {select, typeahead} from 'vue-strap'
export default {
  components: {
      'vs-select': select,
      'vs-typeahead': typeahead
  },
  data() {
      return {
        queryTypes: [
          {val: 0, label: '种类一'},
          {val: 1, label: '种类二'},
          {val: 2, label: '种类三'},
          {val: 3, label: '种类四'},
          {val: 4, label: '种类五'},
          {val: 5, label: '种类六'},
          {val: 6, label: '种类七'},
          {val: 7, label: '种类八'}
        ],
        selectedType: 0
      }
    },
  methods: {

  }
}
</script>

<style scoped>
#sub_header{
  position: fixed;
  width: 100%;
  height: 50px;
  margin-top: 0px;
  -moz-box-shadow: 0px 2px 4px #888888; /* 老的 Firefox */
  box-shadow: 0px 2px 4px #888888;
  margin:0px auto;
  background: white;
  z-index: 99;
}
.body{
    height: 50px;
    margin:0px auto;
    width: 1000px;
}
  .logo_div{
    width: 50px;
    height: 50px;
    float: left;
  }
  .logo_div a img{
    width: 50px;
    height: 50px;
  }
  .query_div{
    margin-top: 8px;
    float: right;
    height: 40px;
  }
  .type_select{
    width: 120px;
    float: left;
    padding-left: 5px;
    padding-right: 10px;
  }
  .query_ahead{
    width: 720px;
    float: left;
  }
  .query_button{
    margin-left: 10px;
  }
</style>
