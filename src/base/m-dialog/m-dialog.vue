<template>
  <div class="mask" v-show="visible">
    <div class="container">
      <div class="header">
        <div class="title"><span>{{title}}</span></div>
        <div class="action">
          <div class="close" @click="close"></div>
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import MButton from 'base/m-button/m-button'
export default {
  components: {
    MButton
  },
  model: {
    prop: 'visible',
    event: 'visible-change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  created: function() {
    this.bodyOverflow = document.body.style.overflow
  },
  beforeDestroy: function() {
    this.bodyOverflow = null
  },
  data() {
    return {
      uploadUrl: '',
      bodyOverflow: null
    }
  },
  watch: {
    visible(val) {
      this.$emit('update:visible', val)
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = this.bodyOverflow
      }
    }
  },
  methods: {
    close() {
      // .sync
      this.$emit('update:visible', false)
      this.$emit('visible-change', false)
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.mask
  @extend .flex-center
  width 100%
  height 100%
  position fixed
  // opacity 0.7
  left 0
  bottom 0
  z-index 999
  background-color rgba(0,0,0,0.2)
  .container
    width 580px
    height auto
    opacity 1
    border-radius 8px
    background-color $color-back-white_0
    border 1px solid $color-layer-gray_8
    .header
      @extend .flex
      @extend .flex-row
      height 50px
      width 100%
      background-color rgba(247,249,250,1)
      .title
        @extend .flex-end
        width 55%
        span
         color rgba(102,107,111,1)
         font-size 16px
      .action
        @extend .flex-end
        width 45%
        .close
          @extend .pointer
          width 20px
          height 20px
          margin-right 15px
          background-size 100% 100%
          background-image url('~static/image/base-icon/close.png')
    .content
      // padding 30px 20px
      color #48576a
      font-size 14px
    .footer
      padding 10px 0px 30px
      text-align center
      box-sizing border-box
</style>
