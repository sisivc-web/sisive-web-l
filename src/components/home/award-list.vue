//获奖选手模块
//等高参考equal-height--https://blog.csdn.net/Sophiego/article/details/84342490
<template>
    <div>
        <div class="details" style="position:relative;">
          <div style="position:absolute;top:0;left:0;width:100%;">
            <el-row class="equal-height">
              <el-col :span="10" class="left left-list line">
                <div v-for="(item, index) in awardUserList" :key="index" class="item">
                  <hr/>  
                </div>
                <div class="item">
                  <hr/>
                </div>
              </el-col>
              <el-col :span="14" class="right" style="opacity:0;">
                <a href="javascript:;" class="animation hover-animation" style="display:block;width:calc(100% - 40px);height:auto;overflow:hiddden;margin-left:40px">
                  <img :src="awardUserImgUrl" ref="awardImage" style="width:100%;height:auto;" class="award-img">
                </a>
              </el-col>
            </el-row>
          </div>
          <el-row class="equal-height">
            <el-col :span="10" class="left left-list">
              <div v-for="(item, index) in awardUserList" :key="index" @click="onClick(index)" :class="['item', {'is-active':clickIndex===index}]">
                <el-row>
                    <el-col :span="12" class="item-column">
                        <span :title="item.awardName">{{item.awardName}}</span>
                    </el-col>
                    <el-col :span="8" class="item-column">
                        <span :title="item.userName">{{item.userName}}</span>
                    </el-col>
                    <el-col :span="4" class="item-column">
                        <span :title="item.country">{{item.country}}</span>
                    </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="14" class="right">
              <a href="javascript:;" @click="_gotoDetails(awardUserId)" class="animation hover-animation" style="display:block;width:calc(100% - 40px);height:auto;overflow:hiddden;margin-left:40px">
                <img :src="awardUserImgUrl" ref="awardImage" style="width:100%;height:auto;" class="award-img">
              </a>
            </el-col>
          </el-row>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    awardUserList: {
        type: Array,
        default: () => []
    },
    awardUserImgUrl: {
        type: String,
        default: ''
    },
    awardUserId: {
      type: String,
      default: ''
    },
  },
  components: {
  },
  data() {
    return {
      clickIndex: 999,
    }
  },
  computed: {
    nowClickIndex: function() {
      return clickIndex
    },
  },
  methods: { 
    onClick(val) {
      this.clickIndex = val
      this.$emit('handleChange', val+1)
    },
    _gotoDetails(memberId) {
      debugger
      if(memberId) {
        // this.$router.push({path: '/memberDetail', query: {memberId: memberId}})
        let routeData = this.$router.resolve({path: '/memberDetail', query: {memberId: memberId}});
        window.open(routeData.href, '_blank');
      }
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.details
    @extend .flex
    @extend .flex-row
    @extend .flex-between
    width 100%
    margin-top 40px
    .equal-height
      width: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: stretch;
      .left-list
        @extend .flex
        @extend .flex-column
        @extend .flex-around
        .item
          width: 100%;
          .item-column
              padding-right: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 13px;
              color: #000;
          hr
            margin: 0;
            color: $color-item-more;
        .item:hover
          span
            font-weight: bold!important;
          hr
            color: $color-detail-title!important;
        .item.is-active
          font-weight: bold!important;
          span
            font-weight: bold!important;
          hr
            color: $color-detail-title!important;
      .left-list.line
        @extend .flex
        @extend .flex-column
        @extend .flex-between

</style>