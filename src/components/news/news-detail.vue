<template>
  <div class="container">
    <el-card :body-style="{ padding: '0px' }" style="padding: 40px 100px 0px 100px; box-shadow: none; border: none;">
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
import {kpiQueryNewDetail} from 'apx'
export default {
  components: {
  },
  created() {
    this._getURLQuery()
    this._getData()
  },
  data() {
    return {
      newsDetail: {},
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
      debugger
      let param = {
        id: this.newsId,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiQueryNewDetail(param, this).then((res) => {
        this.newsDetail = res.data.data
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
