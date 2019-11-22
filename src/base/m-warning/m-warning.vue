<template>
  <div>
    <div class="warning">
      <div class="logo"></div>
      <span class="content">{{content}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.warning
  @extend .flex
  @extend .flex-row
  @extend .flex-start
  height: 32px
  .logo
    width: 18px
    height: 18px
    background-size: 100% 100%
    background-image: url('~static/image/base-icon/Warning.png')
  .content
    color: $color-text-gray_11
    font-size: $font-size-level_2
    margin: 0 10px
</style>
