<template>
    <div style="border-bottom: 1px solid #F5F5F5;" class="news-item-container">
        <el-card :body-style="{ padding: '0px' }" class="news-item">
            <div>
                <div style="float: left; width: 25%;">
                    <a href="javascript:;" @click="_gotoDetails(item.id)" class="animation hover-animation">
                        <img :src="item.image" class="image" style="width:100%;height:auto">
                    </a>
                </div>
            
            <div class="content" style="float: left; width: 75%; padding: 40px 0px 40px 100px;" @click="_gotoDetails(item.id)">
                <div style="width:100%; height:25px;">
                    <span class="news-title">{{item.title}}</span>
                    <span class="news-time">{{item.createOn}}</span>
                </div>
                <div style="width: 80%; height: 70px; overflow: hidden;">
                    <p class="news-desp" v-html="item.content"></p>
                </div>
                <el-button type="text" class="button">阅读全文</el-button>
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
    width: 1140px;
    margin: 0 auto;
    border: none
    border-radius: 0
    box-shadow: none
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    .news-title
      float:left;
      font-weight: bold;
      font-size: $font-size-detail-title;
      color: $color-detail-title;
    .news-time
      float:right;
      color: $color-item-more;
      font-size: $font-size-item-little;
    .news-desp
      line-height: 25px;
      font-size: $font-size-detail-content;
      color: $color-detail-content;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; 
      >>>div, >>>span, >>>h1, >>>h2, >>>h3, 
      >>>h4, >>>h5, >>>h6, >>>p, >>>blockquote, >>>pre,
      >>>a, >>>abbr, >>>acronym, >>>address, >>>big, >>>cite, >>>code,
      >>>del, >>>dfn, >>>em, >>>img, >>>ins, >>>kbd, >>>q, >>>s, >>>samp,
      >>>small, >>>strike, >>>strong, >>>sub, >>>sup, >>>tt, >>>var,
      >>>b, >>>u, >>>i, >>>center,
      >>>dl, >>>dt, >>>dd, >>>ol, >>>ul, >>>li,
      >>>fieldset, >>>form, >>>label, >>>legend,
      >>>table, >>>caption, >>>tbody, >>>tfoot, >>>thead, >>>tr, >>>th, >>>td,
      >>>article, >>>aside, >>>canvas, >>>details, >>>embed,
      >>>figure, >>>figcaption, >>>footer, >>>header,
      >>>menu, >>>nav, >>>output, >>>ruby, >>>section, >>>summary,
      >>>time, >>>mark, >>>audio, >>>video, >>>input
        margin: 0
        padding: 0
        border: 0
        font-size: 100%
        font-weight: normal
        vertical-align: baseline
    .button
      color: $color-item-more;
      font-size: $font-size-item-little;
      margin: 0;
      text-align: right;
      position: absolute;
      right: 20px;
      bottom: 30px;
.news-item-container:hover{
  background-color: rgba(232,232,232,0.3);
}
.news-item-container .news-item:hover, .news-item-container .content:hover{
  background-color: rgba(232,232,232,0);
}
@media (min-width: 1920px)  {
  .el-card.news-item {
    width: 1560px;
  }
}
@media (min-width: 1500px) and (max-width: 1920px)  {
  .el-card.news-item {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>