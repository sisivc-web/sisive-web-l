<template>
  <div class="control" :class="[{colseTouch: !canTouch}, {pointer: canTouch}]">
    <div class="star" :class="[{ 'star_light': value > 0 }, type === 1 ? 'star_default' : 'star_blue']" @click="_click(1)"></div>
    <div class="star" :class="[{ 'star_light': value > 1 }, type === 1 ? 'star_default' : 'star_blue']" @click="_click(2)"></div>
    <div class="star" :class="[{ 'star_light': value > 2 }, type === 1 ? 'star_default' : 'star_blue']" @click="_click(3)"></div>
    <div class="star" :class="[{ 'star_light': value > 3 }, type === 1 ? 'star_default' : 'star_blue']" @click="_click(4)"></div>
    <div class="star" :class="[{ 'star_light': value > 4 }, type === 1 ? 'star_default' : 'star_blue']" @click="_click(5)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
// 示例: <m-star-control v-model="score" :canTouch="true"></m-star-control>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    canTouch: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    }
  },
  methods: {
    _click(index) {
      this.$emit('input', index)
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.control
  @extend .flex-between
  @extend .flex-row
  width: 100px
  height: 16px
  .star
    width: 16px
    height: 16px
    background-size: 100% 100%
  .star_default
    background-image: url('~static/image/base-icon/star.png')
  .star_blue
    background-image: url('~static/image/base-icon/star_2.png')
  .star_light
    background-image: url('~static/image/base-icon/star_light.png') !important
</style>
