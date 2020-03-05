<template>
  <div class="container">
    <div class="mainBox" style="margin-top: 42px">
      <history-carousel :data="data"></history-carousel>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import { kpiHistory }from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import HistoryCarousel from './history-carousel'
export default {
  components: {
    MAnchor,
    HistoryCarousel
  },
  created() {
    // this._getURLQuery()
    this._getData()
  },
  data() {
    return {
      data: [],
    }
  },
  methods: {
    _gotoDetails(newsId) {
      this.$router.push({path: '/historyDetail', query: {newsId: 3}})
    },
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.personnalId = query.memberId
      }
    },
    _getData() {
      let param = {
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHistory(param, this).then((res) => {
        this.data = res.data.data
      })
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
  .sub-nav ul {
    width: 1560px;
  }
  .carousel{
    width: 1560px!important;
    margin: 0 auto;
  }
}
@media (min-width: 1500px) and (max-width: 1920px)  {
  .container .other .block {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
  .sub-nav ul {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
  .carousel{
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}

.flexBox{display: flex;}
.mainBox{width: 100%;}
.aItemG{width:500px;margin-right: 80px;}
.aItemG .img img{width: 500px;}
.aItemG h3,.nInfoNameSpec h3{padding:0 0 158px 0; color: #1e2022;font-size: 24px; font-weight: 700;}
.aInfo{width: 100%}
.aInfo p,.boxPanel .ItemLst p,.GamePlace .ItemLst p{font-size: 14px; margin: 1.6rem 0; line-height: 24px; color: #4c4948; text-align: justify;}
</style>
