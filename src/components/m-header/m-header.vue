<template>
  <div class="nav" :class=" isNavFixed ? 'navFixed' : ''">
    <div class="content">
      <div class="left">
        <router-link to="/home">
          <div class="logo"></div>
        </router-link>
        <list></list>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import Notice from './notice/notice'
// import Avatar from './avatar/avatar'
import List from './list/list'
export default {
  props: {
    // 目前type: 1 灰色主题 2 白色主题
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isNavFixed: false,
    }
  },
  components: {
    // Notice,
    // Avatar,
    List
  },
  mounted() {
    /**通过给变成固定定位的元素添加一个同等高度的父元素，防止该元素变成固定定位时，脱离文档流导致的页面抖动 */
    // this.tabsHeight = this.$refs.elTabs.offsetHeight;
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    /**滚动事件 */
    handleScroll() {
      //获取页面滚动条的高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 10) {
        this.isNavFixed = true
      } else {
        this.isNavFixed = false
      }
    },
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/base"
.nav
  width: 100%
  min-width: 1140px
  height: 70px
  user-select: none
  background-color $color-back-white_0
  box-shadow: 0px -3px 7px #000
  .content
    @extend .flex
    @extend .flex-row
    @extend .flex-between
    width: 1140px
    height: 100%
    margin: 0 auto
    .left
      @extend .flex
      @extend .flex-row
      @extend .flex-between
      padding: 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 14px;
      .logo
        width 120px
        height 55px
        margin-right 120px
        background-size 100% 100%
        background-image: url('../../../static/image/header/logo.png')
      .language
        color $color-text-gray_1
        font-size $font-size-level_3
        margin-right 13px
    .right
      @extend .flex
      @extend .flex-row
      @extend .flex-end
      .practice
        @extend .pointer
        color $color-text-blue_0
        font-size $font-size-level_3
        border 1px solid $color-text-blue_1
        border-radius 4px
        padding 9px 15px
        margin-right 33px

.navFixed 
  position: fixed;
  top: 0;
  z-index: 998;
  -webkit-animation: hdnav2-show .3s;
  -moz-animation: hdnav2-show .3s;
  -o-animation: hdnav2-show .3s;
  animation: hdnav2-show .3s;
  display: block!important
@-webkit-keyframes hdnav2-show {
    0% {
        top: -70px
    }

    100% {
        top: 0px
    }
}
@keyframes hdnav2-show {
    0% {
        top: -70px
    }

    100% {
        top: 0px
    }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1920px)  {
  .nav .content {
    width: 1560px;
  }
}
@media (min-width: 1500px) and (max-width: 1920px)  {
  .nav .content {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
