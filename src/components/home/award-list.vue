<template>
    <div>
        <div class="details">
            <el-row>
                <el-col :span="10" class="left left-list">
                    <el-row v-for="(item, index) in awardUserList" :key="index" @click="onClick" class="item">
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
                </el-col>
                <el-col :span="14" class="right">
                  <transition name="fade">
                  <a href="javascript:;" class="animation hover-animation" style="display:block;width:calc(100% - 40px);height:auto;overflow:hiddden;margin-left:40px">
                    <img src="static/image/sisivc/award/0.jpg" :alt="awardUserImgUrl" ref="awardImage" style="width:100%;height:auto;" class="award-img">
                  </a>
                  </transition>
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
    }
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: { 
    onClick() {

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
    .left-list
        @extend .flex
        @extend .flex-column
        @extend .flex-between
        .item-column
            padding-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

</style>