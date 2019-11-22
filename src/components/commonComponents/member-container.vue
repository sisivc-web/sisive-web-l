<template>
    <div>
        <!-- <div class="details">
            <el-row>
            <el-col :span="6" v-for="(item, index) in judgesList" :key="index">
                <member-item :item="item"></member-item>
            </el-col>
            </el-row>
        </div>
        <el-row>
            <el-col :span="24">
            <div :class="['more-div', 'judgesAnimationName']" @click="moreClick('judges')">
                <img src="static/image/sisivc/arrow2.png">
            </div>
            </el-col>
        </el-row> -->
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