<template>
  <div class="container">
    <sub-nav :subNavList="subNavList" :nowClickYear="nowSelYear" @changeData="_getNews"></sub-nav>
    <div class="new-detail">
      <el-card :body-style="{ padding: '0px' }" style="width: 100%; margin:0 auto;padding: 40px 0 0;box-shadow: none; border: none;line-height:1.75;">
        <div style="width:30%; float:left;padding-right:50px;">
          <div style="height:50px;">
            <span style="color: #222;font-weight: bold;font-size: 16px;">{{newsDetail.title}}</span>
          </div>
          <div style="height:30px;">  
            <span style="color: #a0a0a1;font-size: 14px;">{{newsDetail.createOn}}</span>
          </div>

          <div>
            <a :href="newsDetail.externalLink" class="animation hover-animation">
                <img :src="newsDetail.image" class="image" style="width:100%;height:auto">
            </a>
          </div>
        </div>
        <div class="right-content" v-html='newsDetail.content' style="width:70%; float:right; padding:0px 0 20px 50px;">

        </div>
      </el-card>
    </div>
  
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiYears, kpiNews, kpiQueryNewDetail} from 'apx'
import SubNav from 'components/sub-nav/sub-nav'
export default {
  components: {
    SubNav
  },
  async created() {
    await this.getNewsYearList()
  },
  data() {
    return {
      newsDetail: {},
      newsId: 3,
      subNavList: [],
      nowSelYear: '',
    }
  },
  methods: {
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.newsId = query.newsId
        this.nowSelYear = query.nowSelYear
      }
    },
    _getData() {
      let param = {
        id: this.newsId,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiQueryNewDetail(param, this).then((res) => {
        this.newsDetail = res.data.data
      })
    },
    getNewsYearList() {
      kpiYears({}, this).then((res) => {
        this.subNavList = res.data.data.map((el) => {
          return {
            name: el,
            id: el
          }
        })
        this._getURLQuery()
        this._getData()
      })
    },
    _getNews(year) {
      this.$router.push({path: '/news', query: {nowSelYear: year}})
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.new-detail
  width: 1140px
  height: auto
  overflow hidden
  margin 0 auto
  .right-content 
    text-align: justify;
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
      text-align: justify;
    >>>img
      width: 100%
      height: auto
@media (min-width: 1920px)  {
  .container .other .block {
    width: 1560px;
  }
  .container .new-detail {
    width: 1560px;
  }
  .carousel{
    width: 1920px!important;
    margin: 0 auto;
  }
}
@media (min-width: 1500px) and (max-width: 1920px)  {
  .container .other .block {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
  .container  .new-detail {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
