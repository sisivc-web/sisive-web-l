<template>
  <div class="container" :class="{animated: currentValue && !init, 'animated-reverse': !currentValue && !init}" @click.stop>
    <transition name="opacity">
      <div class="opacity" v-if="currentValue">
        <select class="select" :class="{'select-white': type === 2}" v-model="search_key">
          <option value="0">{{$t("institutions")}}</option>
          <option value="1">{{$t("courses")}}</option>
          <option value="2">{{$t("consultants")}}</option>
          <option value="3">{{$t("services")}}</option>
        </select>
        <input
          v-model="search_content"
          class="search-content"
          :class="[type === 1 ? 'search-content-default' : 'search-content-white']"
          :placeholder="$t('startsearchinghere')"
          @keyup.enter="_search"/>
      </div>
    </transition>
    <div class="search-btn" :class="[type === 1 ? 'search-btn-default' : 'search-btn-white']" @click="_setCurrentValue"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    value: {},
    type: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    document.addEventListener('click', this._clickToClose)
    document.addEventListener('scroll', this._clickToClose)
  },
  beforeDestroy() {
    document.removeEventListener('click', this._clickToClose)
    document.removeEventListener('scroll', this._clickToClose)
  },
  computed: {
    currentValue: {
      get: function() {
        return this.value
      },
      set: function(val) {
        this.$emit('input', val)
      }
    }
  },
  data() {
    return {
      init: true,
      search_key: '0',
      search_content: ''
    }
  },
  methods: {
    _search() {
      console.log('搜索')
      if (this.search_key === '0') {
        this.$router.push({path: '/moreSchools', query: this.search_content ? {name: this.search_content} : {}})
      } else if (this.search_key === '1') {
        this.$router.push({path: '/moreMajor', query: this.search_content ? {name: this.search_content} : {}})
      } else if (this.search_key === '2') {
        this.$router.push({path: '/moreAdvisers', query: this.search_content ? {name: this.search_content} : {}})
      } else if (this.search_key === '3') {
        this.$router.push({path: '/moreServices', query: this.search_content ? {name: this.search_content} : {}})
      }
    },
    _setCurrentValue() {
      if (this.init) {
        this.init = false
        this.currentValue = true
      } else {
        this.currentValue = !this.currentValue
      }
    },
    _clickToClose(e) {
      this.currentValue = false
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/base"
@import "~common/stylus/mixin"
.container
  @extend .flex
  @extend .flex-row
  @extend .flex-end
  padding-right: 20px
  margin-right: 30px
  border-left: 1px solid $color-text-gray_0
  border-right: 1px solid $color-text-gray_0
  overflow: hidden
  position relative
  width: 66px
  height: 24px
  .opacity
    @extend .flex
    @extend .flex-row
    @extend .flex-start
    overflow hidden
    .select
      width: 130px
      height: 26px
      font-size: $font-size-level_3
      color: $color-text-black_0
      border: 0px
      appearance: none
      -moz-appearance: none
      -webkit-appearance: none
      padding: 0 24px 0 10px
      background: url("~static/image/header/arrow.png") no-repeat scroll right center transparent
      background-size 24px 24px
    .select-white
      color: $color-text-white_0
      background: url("~static/image/header/arrow_white.png") no-repeat scroll right center transparent
      background-size 24px 24px
    .search-content
      width: 200px
      height: 18px
      padding: 0 10px
      margin-left 10px
      border-left: 1px solid $color-text-gray_0
      margin-right: 24px
      background-color: transparent
    .search-content-default
      color: $color-text-black_0
    .search-content-white
      color: $color-text-white_0
      placeholder-color($color-text-white_0)
      caret-color: $color-text-white_0
  .search-btn
    @extend .pointer
    position absolute
    width: 24px
    height: 24px
    background-size: 100% 100%
  .search-btn-default
    background-image: url("~static/image/header/search.png")
  .search-btn-white
    background-image: url("~static/image/header/search_white.png")
.animated
  animation-duration: 1s  /*动画时间*/
  animation-fill-mode: both  /*播放后的状态*/
  animation-iteration-count: 1
  animation-duration: 0.5s
  animation-name: container  /*动画的名称*/
  transform-origin: center bottom
  transition-timing-function: ease-out
.animated-reverse
  animation-duration: 1s  /*动画时间*/
  animation-fill-mode: both  /*播放后的状态*/
  animation-iteration-count: 1
  animation-duration: 0.5s
  animation-name: container-reverse  /*动画的名称*/
  transform-origin: center bottom
  transition-timing-function: ease-out
@keyframes container {
  from {
    width: 66px
  }
  to {
    width: 400px 
  }
}
@keyframes container-reverse {
  from {
    width: 400px
  }
  to {
    width: 66px
  }
}
</style>
