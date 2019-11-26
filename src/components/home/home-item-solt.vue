<template>
  <div :class="['block', 'anchor-item', itemName]">
    <div class="header">
      <!-- <p class="little"><span>2018</span>&nbsp;SISIVC</p> -->
      <h3 class="title">{{title}}</h3>
      <div class="more" v-if="isShowMore">
        {{more}}
        <div class="arrow"></div>
      </div>
    </div>
    <slot name="detail"></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    itemName: {
      type: String,
      default: 'award-div',
    },
    title: {
      type: String,
      default: '标题',
    },
    isShowMore: {
      type: Boolean,
      default: false,
    },
    more: {
      type: String,
      default: '更多',
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.block
  width: 1140px
  margin: 0 auto
  padding: 50px 0 0
  .header
    @extend .flex
    @extend .flex-column
    @extend .flex-end
    align-items: start;
    width 100%
    position relative
    font-family Helvetica
    .title
      // color: #1e2022;
      // font-size: 24px;
      color: $color-item-title;
      font-size: $font-size-item-title;
      font-weight: bold;
    .little
      font-size: $font-size-item-little;
      color: $color-item-more;
      margin-bottom: 20px;
      margin-top: -20px;
      padding-top: 20px;
    .more
      @extend .flex
      @extend .flex-row
      @extend .flex-end
      height 16px
      color $color-item-more
      font-size $font-size-item-little
      position absolute
      right 0
      bottom: 0
      .arrow
        width 6px
        height 6px
        background-size 100% 100%
        background-image: url('~static/image/home/zs/more_arrow.png')
        margin-left 4px
</style>