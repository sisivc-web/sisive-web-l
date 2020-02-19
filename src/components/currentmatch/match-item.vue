<template>
  <div class="match-item-div">
    <h1>{{title}}</h1>
    <a class="container-a" href="http://www.baidu.com" target="_blank">
      <div class="item">
        <i class="el-icon-document" v-show="isFileIcon"></i>
        <h2>{{subTitle}}</h2>
        <span v-show="!isFileIcon">详细内容请下载此文档</span>
      </div>
      <div class="item">
        <i class="el-icon-view"></i>
        <i class="el-icon-download"></i>
      </div>
    </a>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: '2020 SISIVC参赛须知'
    },
    isFileIcon: {
      type: Boolean,
      default: false
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
.match-item-div
  h1
    color: $color-item-title;
    font-size: $font-size-item-title;
    padding-top: 60px;
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
    border-bottom: 1px solid #E9E9E9;
    margin-top: 20px;
    cursor: pointer; 
    h2
      color: #222;
      font-size: 20px;
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