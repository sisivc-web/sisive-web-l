//合作伙伴模块
<template>
  <div>
    <div class="sub-item" v-for="(el,i) in parterList" :key="i">
      <h3 class="sub-h3">{{el.level}}</h3>
      <div style="border-top: 1px solid #80808030;padding-top:40px;" v-if="el.levelId === 1">
        <img :src="el.partnerVoList[0].logoUrl">
        <div v-html="el.partnerVoList[0].description" class="desp"></div>
      </div>
      <div style="padding-top:0;" v-if="el.levelId > 1">
        <el-row>
          <el-col :span="el.levelId === 2 ? 6 : 3" v-for="(item, index) in el.partnerVoList" :key="index">
            <el-card :body-style="{ padding: '0px', paddingBottom: '40px' }">
              <div class="logo" :style="{backgroundImage: `url(${require('static/image/sisivc/hezuo/0.png')})`}">
                <img :src="item.logoUrl" style="width:100%;height:auto;">
              </div>
              <div class="title">{{item.title}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    parterList: {
      type: Array,
      default: () => []
    },
  },
  components: {
  },
  data() {
    return {
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.parter-div
  padding-bottom:30px;
  .sub-item
    h3
      font-size: 14px;
      color:#222;
      font-weight: bold;
      margin: 0;    
      padding-bottom: 20px;
      padding-top: 20px;
    .sub-h3
      padding-top: 40px;
      padding-bottom: 40px;
    p, .desp
      // font-size: 13px;
      // color: #4c4948;
      font-size: $font-size-detail-content;
      color: $color-detail-content;
      margin: 1.6rem 0;
      line-height: 20px;
      text-align:justify;
    .el-row
      border: none;
      .el-card
        border: none;
        border-radius: 0;
        box-shadow: none;
        .title
          text-align: center;
          width: 100%;
          margin-top: 10px;
          // font-size: 13px;
          // color: #4c4948;
          font-size: $font-size-detail-content;
          color: $color-detail-content;

</style>