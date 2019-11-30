<template>
  <div class="container">
    <m-anchor :contentDivClass="'AboutGame'" :anchorItem="'anchor-item'" :subNavList="[$t('subNavs.aboutUs1'), $t('subNavs.aboutUs2'), $t('subNavs.aboutUs3'), $t('subNavs.aboutUs4'), $t('subNavs.aboutUs5')]"></m-anchor>  
    <div style="height:80px; padding-left: 100px; padding-top:30px; border-bottom: 1px solid #F5F5F5;">
      <span style="font-size:25px; font-weight: bold;">新闻</span>
    </div>
    <div>
      <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in newsList" :key="index" class="news-item">
            <news-item :item="item"></news-item>
        </el-card>  
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import { kpiNews }from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import NewsItem from 'components/commonComponents/news-item'
export default {
  components: {
    MAnchor,
    NewsItem
  },
  created() {
    // this._getURLQuery()
    this._getData()
  },
  data() {
    return {
      newsList: [1,2,3],
      year: '2019'
    }
  },
  methods: {
    _gotoDetails(newsId) {
      this.$router.push({path: '/newsDetail', query: {newsId: 3}})
    },
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.personnalId = query.memberId
      }
    },
    _getData() {
      let param = {
        year: this.year,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiNews(param, this).then((res) => {
        this.newsList = res.data.data
      })
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.el-card.news-item
  border-radius: 0
  border: none
  box-shadow: none
@media (min-width: 1920px)  {
  .container .other .block {
    width: 1560px;
  }
  .sub-nav ul {
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
  .sub-nav ul {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
