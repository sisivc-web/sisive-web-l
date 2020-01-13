<template>
  <!-- 有header和footer 首页特有 -->
  <div id="app" class="app">
    <m-header></m-header>
    <div :style="{'min-height': `calc(${height} - ${navHeight} - ${tabbarHeight})`}">
      <router-view class="content"></router-view>
    </div>
    <m-footer v-if="!$route.meta.footShow"></m-footer>
    <detail-footer v-if="$route.meta.footShow"></detail-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import MFooter from 'components/m-footer/m-footer'
import DetailFooter from 'components/m-footer/m-detail-footer'
export default {
  components: {
    MHeader,
    MFooter,
    DetailFooter,
  },
  data() {
    return {
      height: `100vh`,
      navHeight: '70px',
      tabbarHeight: '280px',
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/base"
.app
  width: 100%
  min-width: 1140px
  background-color: #ffffff
  font-family: Helvetica, Arial, "Microsoft YaHei", 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif
  .content
    width 100%
</style>
