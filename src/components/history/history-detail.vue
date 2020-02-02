<template>
  <div class="container">
    <div>
      <home></home>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiQueryNewDetail} from 'apx'
import Home from 'components/home/home'
export default {
  components: {
    Home,
  },
  created() {
    this._getURLQuery()
    this._getData()
  },
  data() {
    return {
      data: [],
      newsId: 3,
    }
  },
  methods: {
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.newsId = query.newsId
      }
    },
    _getData() {
      let param = {
        id: this.newsId,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiQueryNewDetail(param, this).then((res) => {
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
