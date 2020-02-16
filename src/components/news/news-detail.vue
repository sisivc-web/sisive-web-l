<template>
  <div class="container">
    <sub-nav :subNavList="subNavList" :nowClickYear="nowSelYear" @changeData="_getNews"></sub-nav>
    <el-card :body-style="{ padding: '0px' }" style="width: 1140px; margin:0 auto;padding: 40px 0 0;box-shadow: none; border: none;">
      <div style="width:30%; float:left;">
        <div style="height:50px;">
          <span style="color: #222;font-weight: bold;font-size: 16px;">{{newsDetail.title}}</span>
        </div>
        <div style="height:30px;">  
          <span style="color: #a0a0a1;font-size: 14px;">{{newsDetail.createOn}}</span>
        </div>

        <div>
          <a :href="newsDetail.externalLink" class="animation hover-animation">
              <img :src="newsDetail.partnerLogoUrl" class="image" style="width:100%;height:auto">
          </a>
        </div>
      </div>
      <div v-html='newsDetail.content' style="width:70%; float:right; padding:0px 20px 20px 20px;">

      </div>
    </el-card>
  
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
    this._getURLQuery()
    this._getData()
  },
  data() {
    return {
      newsDetail: {},
      newsId: 3,
      subNavList: ['2019', '2018'],
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
        this.subNavList = res.data.data
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

@media (min-width: 1920px)  {
  .container .other .block {
    width: 1560px;
  }
  .container .el-card {
    width: 1560px;
  }
  .carousel{
    width: 1920px!important;
    margin: 0 auto;
  }
}
@media (min-width: 1400px) and (max-width: 1920px)  {
  .container .other .block {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
  .container .el-card {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
