<template>
  <div class="container">
    <sub-nav :subNavList="subNavList" :nowClickYear="year" @changeData="_getData"></sub-nav> 
    <home-item-solt :itemName="'parter-div'" :title="$t('newsList.new')" :isShowMore="false">
      <div slot="detail">
      </div>
    </home-item-solt>
    <member-container :data="newsList" :typeName="'news'" :span="24" :count="5">
      <template slot="item" slot-scope="props">
        <news-item :item="props.item"></news-item>
      </template>
    </member-container>
  </div>
</template>
<script type="text/ecmascript-6">

import { kpiYears, kpiNews }from 'apx'
import SubNav from 'components/sub-nav/sub-nav'
import HomeItemSolt from 'components/home/home-item-solt'
import MemberContainer from 'components/commonComponents/member-container'
import NewsItem from 'components/commonComponents/news-item'
import { getYearSubList } from 'apx/util.js'
export default {
  components: {
    SubNav,
    HomeItemSolt,
    MemberContainer,
    NewsItem
  },
  async created() {
    await this.getNewsYearList()
  },
  data() {
    return {
      newsList: [],
      year: (new Date()).getFullYear(),
      subNavList: [],
    }
  },
  methods: {
    // _gotoDetails(newsId) {
    //   this.$router.push({path: '/newsDetail', query: {newsId: 3, nowSelYear: this.year}})
    // },
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.year = query.nowSelYear ? query.nowSelYear : this.subNavList[0].name
      }
    },
    getNewsYearList() {
      kpiYears({}, this).then((res) => {
        this.subNavList = res.data.data.map((el) => {
          return {
            name: el,
            id: el
          }
        })
        let temp = getYearSubList(this.subNavList)
        this.subNavList = temp
        this._getURLQuery()
        this._getData(this.year)
      })
    },
    _getData(year) {
      this.year = year
      let param = {
        year: year ? year : this.year,
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
  padding: 0;
  width: 1140px;
  margin: 0 auto;
@media (min-width: 1920px)  {
  .container .other .block {
    width: 1560px;
  }
  .el-card.news-item {
    width: 1560px;
  }
}
@media (min-width: 1500px) and (max-width: 1920px)  {
  .container .other .block {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
  .el-card.news-item {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
