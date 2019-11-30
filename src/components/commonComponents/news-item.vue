<template>
    <div style="border-bottom: 1px solid #F5F5F5;">
        <el-card :body-style="{ padding: '0px' }" class="news-item">
            <div>
                <div style="float: left; width: 25%;">
                    <a href="javascript:;" @click="_gotoDetails(item.id)" class="animation hover-animation">
                        <img :src="item.image" class="image" style="width:100%;height:auto">
                    </a>
                </div>
            
            <div style="float: left; width: 75%; padding: 10px 0px 10px 100px;" @click="_gotoDetails(item.id)">
                <div style="width:100%; height:25px;">
                    <span style="float:left; color: #222;font-weight: bold;font-size: 16px;">{{item.title}}</span>
                    <span style="float:right; color: #a0a0a1;font-size: 14px;">{{item.createOn}}</span>
                </div>
                <div style="width: 80%; height: 70px; overflow: hidden;">
                    <p style="font-size:13px; line-height:18px;">{{item.content}}</p>
                </div>
                <el-button type="text" class="button" style="font-size:14px;color:#a0a0a1; float:right; ">阅读全文</el-button>
            </div>
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
    _gotoDetails(newsId) {
      this.$router.push({path: '/newsDetail', query: {newsId: newsId}})
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.el-card.news-item
    padding-left: 100px
    padding-right: 100px
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