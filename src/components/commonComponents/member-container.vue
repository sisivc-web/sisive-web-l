<template>
    <div>
        <div class="details">
            <el-row>
                <el-col :span="span" v-for="(item, index) in data" :key="index" v-if="index < count">
                    <slot name="item" :item="item"></slot>
                    <!-- <member-item :item="item"></member-item> -->
                </el-col>
            </el-row>
            <div :style="{height: nowHeight + 'px', overflow: 'hidden'}" class="more-css">
                <div ref="moreItems">
                    <el-row>
                        <el-col :span="6"  v-for="(item, index) in data" :key="index" v-if="index >= count">
                            <slot name="item" :item="item"></slot>
                            <!-- <member-item :item="item"></member-item> -->
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <el-row v-if="data.length > 8">
            <el-col :span="24">
                <div :class="['more-div', nowType===typeName && showMoreList?'rotate':'']" @click="moreClick(typeName)">
                    <img :src="require('static/image/sisivc/arrow2.png')">
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
import MemberItem from 'components/commonComponents/member-item'
export default {
  props: {
    typeName: {
        type: String,
        default: 'judges'
    },
    data: {
        type: Array,
        default: [
            {name: '大卫·斯特恩', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        ]
    },
    count: {
        type: Number,
        default: 8
    },
    span: {
        type: Number,
        default: 6
    }

  },
  components: {
    MemberItem
  },
  data() {
    return {
        showMoreList: false,
        nowType: '',
        nowHeight: 0,
    }
  },
  mounted() {
  },
  methods: { 
    moreClick(flag) {
      this.nowType = flag
      this.showMoreList = !this.showMoreList
      this.nowHeight = this.nowHeight ? 0 : this.$refs.moreItems.offsetHeight
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.details
    // @extend .flex
    // @extend .flex-row
    // @extend .flex-between
    width 100%
    margin-top 40px
    .el-row
        margin-left: -20px;
        margin-right: -20px;
.more-div
    background-color: #222;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    line-height: 60px;
    border-radius: 30px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 30px;
    -webkit-transition: -webkit-transform .5s ease-in-out;
    transition: -webkit-transform .5 ease-in-out;
    transition: transform .5s ease-in-out;
    transition: transform .5s ease-in-out,-webkit-transform .5s ease-in-out;
.rotate
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
.more-css {
    transition:height 2s;
    -moz-transition:height 2s; /* Firefox 4 */
    -webkit-transition:height 2s; /* Safari and Chrome */
    -o-transition:height 2s; /* Opera */
}
</style>