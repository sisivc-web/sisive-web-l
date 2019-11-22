<template>
  <button class="button" :style="{ height: `${height}px`, width: width === undefined ? '' : `${width}px` }" @click="_click">
    <slot>按钮文字</slot>
  </button>
</template>
<script type="text/ecmascript-6">
/**
 * 默认为线状button type="primary" 面状button
 * disabled属性
 * @click事件
 */
export default {
  props: {
    height: {
      type: Number,
      default: 36
    },
    width: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    _click() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/base"
.button
  @extend .pointer
  background-color: $color-back-gray_6
  color: $color-text-gray_9
  border: 0px
  font-size: $font-size-level_2
  font-family: SourceHanSansCN-Regular
  font-weight: 400
  padding: 0 18px
  border-radius: 2px
  user-select: none
  margin: 5px 0
  &:hover
    background-color: $color-back-blue_0
    color: $color-text-white_0
  &:disabled
    @extend .disabled
.button[type="primary"]
  @extend .pointer
  background-color: $color-back-blue_0
  color: $color-text-white_0
  font-size: $font-size-level_2
  border: 0px
  font-family: SourceHanSansCN-Regular
  font-weight: 400
  padding: 0 18px
  border-radius: 2px
  user-select: none
  &:hover
    opacity: 0.8
  &:disabled
    @extend .disabled
.button[type="common"]
  @extend .pointer
  background-color: rgba(0, 0, 0, 0)
  color: $color-text-blue_1
  font-size: $font-size-level_2
  border: 0px
  font-family: SourceHanSansCN-Regular
  font-weight: 400
  padding: 0 18px
  border-radius: 2px
  user-select: none
  &:disabled
    @extend .disabled
.button[type="white"]
  @extend .pointer
  @extend .flex
  @extend .flex-row
  @extend .flex-center
  background-color: rgba(0, 0, 0, 0)
  color: $color-text-black_5
  font-size: $font-size-level_2
  border: 1px solid $color-layer-gray_7
  border-radius: 2px
  padding: 0 18px
  user-select: none
  &:disabled
    @extend .disabled
</style>
