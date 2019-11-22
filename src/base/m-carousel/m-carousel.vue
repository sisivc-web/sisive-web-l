<template>
  <div>
    <div class="container">
      <div class="left-logo" @click="$refs.carousel.prev()"></div>
      <div class="middle">
        <div class="title-bar">
          <h2 class="title">{{title}}</h2>
        </div>
        <el-carousel ref="carousel" :height="height" :autoplay="false" arrow="never" indicator-position="none" @change="_change">
          <div class="empty" v-if="currentList.length < 1">{{$t('empty')}}</div>
          <el-carousel-item v-for="(item, index) in currentList" :key="index">
            <div class="box">
              <div class="item" v-for="(itemChild, indexChild) in item" :key="indexChild">
                <slot :details="itemChild" :height="height"></slot>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="spot-bar">
          <span class="item" v-for="n in currentList.length" :key="n" :class="{'active': n - 1 === currentIndex}" @click="$refs.carousel.setActiveItem(n - 1)"></span>
        </div>
      </div>
      <div class="right-logo" @click="$refs.carousel.next()"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    // 引用element-ui轮播图 设置该轮播的高度,此高度决定内置card的高度,card的宽度在css中设置
    height: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentList() {
      var data = this.list
      var result = []
      for (var i = 0, len = data.length; i < len; i += 4) {
        result.push(data.slice(i, i + 4))
      }
      console.log(result)
      return result
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    _change(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/base"
$card-height = 280px // card的宽度
.container
  @extend .flex
  @extend .flex-row
  @extend .flex-between
  width 1300px
  margin 0 auto
  .left-logo
    @extend .pointer
    width: 27px
    height: 49px
    background-image: url('~static/image/home/leftArrow.png')
    background-size: 100% 100%
  .right-logo
    @extend .pointer
    width: 27px
    height: 49px
    background-image: url('~static/image/home/rightArrow.png')
    background-size: 100% 100%
  .middle
    width: 1200px
    .empty
      @extend .flex-center
      width: 100%
      height: 100%
    .box
      @extend .flex
      @extend .flex-row
      @extend .flex-around
      width 100%
      .item
        width $card-height
.spot-bar
  @extend .flex
  @extend .flex-row
  @extend .flex-center
  width: 100%
  height: 90px
  .item
    width: 10px
    height: 10px
    background-color: $color-back-silvery_0
    border-radius: 5px
    margin: 0 10px
  .active
    width: 20px
    background-color: $color-back-gray_0
.title-bar
  @extend .flex-center
  width: 100%
  height: 90px
  .title
    font-size $font-size-level_6
    color $color-text-black_0
    // font-weight bold
</style>
