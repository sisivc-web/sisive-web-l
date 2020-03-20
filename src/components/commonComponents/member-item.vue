<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" class="member-item">
            <a href="javascript:;" @click="_gotoDetails(item.id)" class="animation hover-animation">
                <img :src="item.imageUrl" class="image" style="width:100%;height:auto">
            </a>
            <div class="operate" style="padding: 10px 0;" @click="_gotoDetails(item.id)">
                <span style="color: #222;font-weight: bold;font-size: 14px;">{{item.name}}&nbsp;<span style="color:#a0a0a1;">{{item.title}}</span></span>
                <el-button type="text" class="button" style="font-size:12px;color:#a0a0a1;">{{item.country}}</el-button>
            </div>
        </el-card>  
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    item: {},
  },
  data() {
    return {
        userIfo: {},
    }
  },
  methods: { 
    _gotoDetails(memberId) {
      // this.$router.push({path: '/memberDetail', query: {memberId: memberId}})
      let routeData = this.$router.resolve({path: '/memberDetail', query: {memberId: memberId}});
      window.open(routeData.href, '_blank');
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.el-card.member-item
    margin-bottom: 40px
    padding-left: 20px
    padding-right: 20px
    border: none
    border-radius: 0
    box-shadow: none
    a.animation
      line-height: 0;
      img
        -webkit-transition: -webkit-transform 1s;
        -moz-transition: -moz-transform 1s;
        -o-transition: -o-transform 1s;
        transition: transform 1s;
    a.hover-animation
      overflow: hidden;
      display: block;
    a.hover-animation:hover img
      -webkit-transform: scale(1.05);
      -moz-transform: scale(1.05);
      -ms-transform: scale(1.05);
      -o-transform: scale(1.05);
      transform: scale(1.05);
    .operate
        @extend .flex
        @extend .flex-row
        @extend .flex-between
        .button
            color: #808080
            font-size: 12px
            margin: 0
            text-align: right
</style>