<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" @click="_gotoDetails(item.index)" class="member-item">
            <a href="javascript:;" @click="_gotoDetails(item.index)" class="animation hover-animation">
                <img :src="item.imageUrl" class="image" style="width:100%;height:auto">
            </a>
            <div class="operate" style="padding: 10px 0;">
                <span style="color: #222;font-weight: bold;font-size: 14px;">{{item.name}}</span>
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
      this.$router.push({path: '/memberDetail', query: {memberId: memberId}})
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