<template>
  <div class="container">
    <div class="mainBox">
      <!-- <a href="javascript:;" @click="_gotoDetails(index)" class="animation hover-animation">
          <img src="static/image/sisivc/award/0.jpg" class="image" style="width:100%;height:auto">
      </a> -->
      <history-carousel></history-carousel>
      <!-- <hr/><br/><br/>
      <div class="flexBox">
       <div class="fl aItemG">
         <h3>回顾总结</h3>
       </div>
       <div class="aInfo">
        由上海交响乐团创办的2016首届上海艾萨克·斯特恩国际小提琴比赛于2016年9月2日圆满落下帷幕。自2015年9月全球启动后，历经报名、DVD预选重重关卡，比赛终于在2016年夏季正式开幕。比赛全程历时长达3周，共计25场次，现场赛事长近80小时，创下同类国际顶尖赛事的新纪录。比赛拥有13位享誉世界的音乐节、教育家所组成的权威评委阵容，更邀请到众多知名艺术家以及上海交响乐团的逾百位演奏员与选手同台合作。首届比赛一经启动，便吸引了来自全球各大顶级音乐院校（如茉莉亚音乐学院、柯蒂斯音乐学院、新英格兰音乐学院、曼哈顿音乐学院、圣彼得堡音乐学院等）的140多位报名者，其中不乏有在诸如柴可夫斯基音乐比赛、伊丽莎白女王音乐比赛、帕格尼尼国际小提琴大赛等其他极富盛名的国际音乐赛事中摘取桂冠者，更有坐拥26个冠军头衔的参赛者。比赛开放售票后仅半个月，售票量便高达85%，而后特地增开的上百个座位也迅速脱销，开赛前甚至一票难求。比赛期间，赛事宣传片在上海12个市辖区的18个广场上滚动播放，最高播放频次达60次/天，区域最大人流量高达70万，而比赛颁奖晚会更是荣登美国纽约时代广场。通过乐视音乐所进行的全球直播点击量近300万次。国内外搜索引擎可检索出的相关信息及报道合计超过100万条。这些值得铭记的数字也印证了首届上海艾萨克·斯特恩国际小提琴比赛的成功，并已跻身国际顶尖赛事之列。

        首届比赛的圆满举办也意味着国际音乐赛事的历史长河中增添了一笔浓厚的中国印记，让我们共同期待下一届会更好！ 
       </div>
     </div>
     <br/><br/><hr/> -->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import { kpiNews }from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import HistoryCarousel from './history-carousel'
export default {
  components: {
    MAnchor,
    HistoryCarousel
  },
  created() {
    // this._getURLQuery()
    // this._getData()
  },
  data() {
    return {
      data: [1,2,3],
      year: '2019'
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
        year: this.year,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiNews(param, this).then((res) => {
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

.flexBox{display: flex;}
.mainBox{width: 100%;}
.aItemG{width:500px;margin-right: 80px;}
.aItemG .img img{width: 500px;}
.aItemG h3,.nInfoNameSpec h3{padding:0 0 158px 0; color: #1e2022;font-size: 24px; font-weight: 700;}
.aInfo{width: 100%}
.aInfo p,.boxPanel .ItemLst p,.GamePlace .ItemLst p{font-size: 14px; margin: 1.6rem 0; line-height: 24px; color: #4c4948; text-align: justify;}
</style>
