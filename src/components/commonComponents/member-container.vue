<template>
    <div>
        <div class="details">
            <el-row>
                <el-col :span="6" v-for="(item, index) in data" :key="index" v-if="index < 8">
                    <member-item :item="item"></member-item>
                </el-col>
                <transition name="toTop" class="toTop" v-for="(item, index) in data" :key="index">
                    <el-col :span="6" v-show="showMoreList" v-if="index >= 8">
                        <member-item :item="item"></member-item>
                    </el-col>
                </transition>
            </el-row>
        </div>
        <!-- <div class="details">
            <transition name="draw" class="draw" >
                <el-row>
                    <el-col :span="6" v-for="(item, index) in data.slice(8, data.length - 8)" :key="index" v-show="showMoreList">
                        <member-item :item="item"></member-item>
                    </el-col>
                </el-row>
            </transition>
        </div> -->
        <el-row v-if="data.length > 8">
            <el-col :span="24">
            <div :class="['more-div', nowType===typeName && showMoreList?'rotate':'']" @click="moreClick(typeName)">
                <img src="static/image/sisivc/arrow2.png">
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
            {name: '徐惟聆', country: '中国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
            {name: '扎哈尔·布朗', country: '扎哈尔·布朗', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
            {name: '马丁·坎贝尔-怀特', country: '英国', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
            {name: '格伦·迪克特罗', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
            {name: '奥古斯丁·杜梅', country: '法国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
            {name: '丹尼尔·海菲兹', country: '美国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
            {name: '埃马纽埃尔·翁德雷', country: '法国', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
            {name: '斯雷滕·克里斯蒂奇', country: '塞尔维亚/德国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
            {name: '李伟纲', country: '美国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
            {name: '吕思清', country: '中国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
            {name: '多拉·施瓦茨贝尔格', country: '奥地利', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
            {name: '菲利普·塞策', country: '美国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
            {name: '马克西姆·文格洛夫', country: '摩洛哥', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
            {name: '俞丽拿', country: '中国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        ]
    }
  },
  components: {
    MemberItem
  },
  data() {
    return {
        showMoreList: false,
        nowType: ''
    }
  },
  methods: { 
    moreClick(flag) {
      this.nowType = flag
      this.showMoreList = !this.showMoreList
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
.toTop-enter-active {
  animation: identifier .3s;
}
.toTop-leave-active {
  animation: against .3s ;
}
@keyframes identifier {
 from {transform: translateY(100%);}
 to {transform: translateY(0%);}
}
@keyframes against {
 from {transform: translateY(0%);}
 to {transform: translateY(100%);}
}
// .draw-enter-active, .draw-leave-active {
//     transition: all 1s ease;
// }
// .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
//     height: 0;
// }
</style>