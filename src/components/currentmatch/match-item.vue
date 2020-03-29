<template>
  <div class="match-item-div">
    <h1>{{title}}</h1>
    <a :class="['container-a', {'has-border-bbottom': isBottomBorder}]" href="javascript:;">
      <div class="item">
        <i class="el-icon-document" v-show="isFileIcon"></i>
        <h2>{{subTitle}}</h2>
        <span v-show="!isFileIcon">{{$t('description')}}</span>
      </div>
      <div class="item">
        <a v-show="isView"><i class="el-icon-view" @click="viewFun"></i></a>
        <a href="javascript:;"  @click="downloadFile(linkUrl)"><i class="el-icon-download"></i></a>
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
    linkUrl: {
      type: String,
      default: ''
    },
    isFileIcon: {
      type: Boolean,
      default: false
    },
    isBottomBorder: {
      type: Boolean,
      default: true
    },
    isView: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
    viewFun() {
      this.$emit('view')
    },
    downloadFile(url) {
      let fileName = "";
      let temp = url.split("/");
      fileName = temp[temp.length - 1]
      window.open(`/sisivc/resource/downloadFile?fileName=${fileName}`)
    }
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
  .has-border-bbottom
    border-bottom: 1px solid #E9E9E9;
</style>