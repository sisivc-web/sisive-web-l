<template>
  <div class="download-item-div block">
    <h1>{{title}}</h1>
    <div class="container-a" v-for="(item, index) in downloadList" :key="index">
      <div class="item">
        <i class="el-icon-document" v-show="isFileIcon" :style="{color: item.resourceType === '1' ? '#0262FF' : '#F86B67', paddingRight: '10px'}"></i>
        <h2>{{item.resourceName}}</h2>
      </div>
      <div class="item">
        <a :href="item.resourceUrl" target="_blank"><i class="el-icon-view"></i></a>
        <a><i class="el-icon-download"></i></a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isFileIcon: {
      type: Boolean,
      default: true
    },
    downloadList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.download-item-div
  border-bottom: 1px solid #E9E9E9;
  h1
    color: $color-item-title;
    font-size: $font-size-item-title;
    padding-top: 60px;
    margin-bottom: 30px;
  .container-a
    display: -webkit-box
    display: -webkit-flex
    display: -ms-flexbox
    display: flex
    justify-content: space-between
    align-items: center
    height: 80px;
    line-height: 60px;
    border-top: 1px solid #E9E9E9;
    cursor: pointer; 
    h2
      color: #222;
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      padding-right: 10px;
    span, i 
      font-size:12px;
      color:#a0a0a1;
    i 
      font-size:16px;
      color: #BFBFBF;
      padding-left: 20px;
</style>