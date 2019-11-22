<template>
  <div>
    <div class="mask" :style="{display: value ? 'block' : 'none'}" @click.self="_close">
      <transition name="fade">
        <div class="contian" :style="{width: `${width}px`}" v-if="value">
          <div class="header">
            <div style="width: 20px;height: 20px;"></div>
            <p class="title">{{title}}</p>
            <div class="logo" @click="_close"></div>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
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
    },
    width: {
      type: Number,
      default: 780
    }
  },
  methods: {
    _close() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.3)
  z-index: 100
  overflow: auto
  .contian
    @extend .flex
    @extend .flex-column
    border-radius: 8px
    padding: 0
    overflow: hidden
    margin: 100px auto 0 auto
    .header
      @extend .flex
      @extend .flex-row
      @extend .flex-between
      width: 100%
      height: 80px
      padding: 0 25px
      background-color: $color-back-gray_6
      .title
        font-size: $font-size-level_3
        color: $color-text-gray_13
      .logo
        @extend .pointer
        width: 20px
        height: 20px
        background-size: 100% 100%
        background-image: url('~static/image/base-icon/close.png')
    .content
      background-color: $color-back-white_0
      font-size: $font-size-level_2
      color: $color-text-gray_5
      padding: 0 20px 20px 20px
</style>