<template>
  <div class="contain" @click="_click">
    <div class="dot-bule" :class="{active: this.value}">
      <div class="dot-white">
      </div>
    </div>
    <span class="title">{{title}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
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
@import "~common/stylus/base"
@import "~common/stylus/variable"
.contain
  @extend .flex
  @extend .flex-row
  @extend .pointer
  height: 16px
  .dot-bule
    @extend .flex-center
    width:  16px
    height: 16px
    border-radius: 8px
    background-color: $color-back-white_0
    border: 1px solid $color-layer-gray_3
    margin-left: 15px
    margin-right: 10px
    .dot-white
      width:  6px
      height: 6px
      border-radius: 3px
      background-color: $color-back-white_0
  .active
    border: 0px
    background-color: $color-back-blue_0 !important
  .title
    color: $color-text-gray_13
    font-size: $font-size-level_2
</style>