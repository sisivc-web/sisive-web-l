<template>
  <div class="container">
    <div class="member-detail">
      <el-row>
          <el-col :span="8">
            <div style="margin-right: 80px">
              <img :src="userIfo.imageUrl" style="width:100%;height:auto;"/>
              <h2 class="name-css">{{userIfo.name}}</h2>
              <p class="contry-css">{{userIfo.country}}</p>
              <h3 v-if="userIfo.roleCode === '3'" class="role-css">{{userIfo.roleName}}</h3>
              <a class="vedio-btn" href="#" v-if="userIfo.roleCode === '2'">视频播放</a>
              <span class="little">2018 上海艾萨克 ̇斯特恩国际小提琴比赛</span>
            </div>
          </el-col>
          <el-col :span="8" v-if="userIfo.roleCode === '2'" class="display-div">
            <h3 class="display-title">曲目</h3>
            <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in raceSongsList" :key="index">
                <h3 class="song-title">{{item.raceName}}</h3>
                <el-card :body-style="{ padding: '0px' }" v-for="(el, i) in item.songList" :key="i">
                    <p class="song">{{el.composer}}</p>
                    <p class="song">{{el.songName}} + ',' + {{el.chapter}}</p>
                </el-card>
            </el-card>
          </el-col>
          <el-col :span="userIfo.roleCode != '2' ? 16 : 8">
              <div v-html="despContent" :class="userIfo.roleCode != '2' ? 'content-css' : 'content-css-8'"></div>
          </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// import {kpiProductPage} from 'apx'
export default {
  components: {
  },
  created() {
    // this._getData()
  },
  mounted() {
    // window.addEventListener('scroll', this._getDataMore)
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this._getDataMore)
  },
  watch: {
    productName() {
    //   this._advancedSearch()
    }
  },
  computed: {
    productName() {
    //   return this.$route.query.name
    }
  },
  data() {
    return {
      personnalId: '',
      userIfo: {
          name: '荒井优利奈',
          imageUrl: 'static/image/sisivc/pingwei/1.jpg',
          country: '日本',
          roleCode: '1',
          roleName: '',
          vedioUrl: 'static/image/sisivc/SISIVC.mp4',
      },
      despContent: `<p style="font-size: 16.000000pt; font-family: &#39;SourceHanSansCN&#39;; color: rgb(44.700000%, 44.300000%, 44.300000%)">
    大卫 ̇斯特恩在音乐上的领导地位横跨三片大陆。凭借他所分享的
坚定的音乐理念与灵活的手法，以及他对音乐在当今世界仍然不可
或缺的信念，无论是指挥交响乐团、上演巴洛克歌剧、指导声乐大
师班或者组织文化活动，斯特恩都能紧紧地联系他的乐手、学生与
听众。他是巴黎“烈火歌剧团”的创始人与总监，同时也是上海巴
洛克音乐节的艺术顾问与首席指挥，并担任佛罗里达棕榈滩歌剧院
的首席指挥。
</p>
<p style="font-size: 16.000000pt; font-family: &#39;SourceHanSansCN&#39;; color: rgb(44.700000%, 44.300000%, 44.300000%)">从 1998 年在普罗旺斯艾克斯音乐节创办国际声乐艺术学院开始，
大卫 ̇斯特恩就一直致力于发掘青年声乐人才。他在 2003 年创立
了烈火歌剧团，为法国青年专业歌手提供了一个平台，这个团体将
青年艺术家演出计划、古乐团和演出制作团队结合在一起，在国内
外上演音乐会版与舞台版演出。从 2014 年开始，作为上海巴洛克
音乐节的艺术总监，斯特恩将上海音乐学院的人才引入了他在上海
交响乐团音乐厅举办的演出和大师班。
</p>
<p style="font-size: 16.000000pt; font-family: &#39;SourceHanSansCN&#39;; color: rgb(44.700000%, 44.300000%, 44.300000%)">斯特恩以他所擅长的广泛曲目而闻名。在以色列以及瑞士圣加仑歌
剧院担任音乐总监时，他将涵盖多种风格的作品搬上了舞台，包括
贝尔格的《沃采克》、布里顿的《旋螺丝》和魏尔的《马哈哥尼城
的兴衰》。从 2010 年起他将四部新歌剧搬上舞台，包括在以色列歌
剧院上演，由吉尔 ̇肖尔查特创作的歌剧《儿童的梦想》、由烈火
歌剧团委约，在巴黎香榭丽舍剧院上演的尼可拉斯 ̇巴克利创作的
</p>
<p style="font-size: 16.000000pt; font-family: &#39;SourceHanSansCN&#39;; color: rgb(44.700000%, 44.300000%, 44.300000%)">《女人心前传》、在棕榈滩歌剧院上演的本 ̇摩尔的《敌人 ̇一个爱
情故事》、和在瑞典卓宁霍姆音乐节上演的简 ̇桑德斯特罗姆的《洛
可可机器》。
</p>
<p style="font-size: 16.000000pt; font-family: &#39;SourceHanSansCN&#39;; color: rgb(44.700000%, 44.300000%, 44.300000%)">大卫 ̇斯特恩从耶鲁大学获得文学学士学位后，在茱莉亚音乐学院
获得音乐硕士学位。
</p>`,
      raceSongsList: [
        { raceId:'1', raceName: '四分之一决赛', songList:[ 
            { songId: '1', songName: '第十八号G大调莫扎特小提琴奏鸣曲', composer: '莫扎特', chapter: 'K. 301' }, 
            { songId: '2', songName: 'g小调第一无伴奏小提琴奏鸣曲', composer: '巴赫', chapter: 'BWV 1001' }, 
            { songId: '3', songName: 'e小调第四小提琴无伴奏奏鸣曲', composer: '伊萨伊', chapter: '作品27' }, 
            { songId: '4', songName: '小提琴随想曲', composer: '帕格尼尼', chapter: '作品1之1、11' }, ] 
        },
        { raceId:'2', raceName: '半决赛', songList:[ 
            { songId: '1', songName: 'd小调第二弦乐四重奏，作品76“五度”', composer: '海顿', chapter: '第一乐章' }, 
            { songId: '2', songName: 'A大调第二小提琴奏鸣曲', composer: '勃拉姆斯', chapter: '作品100' }, 
            { songId: '3', songName: '宣叙调与谐谑随想曲', composer: '伊克莱斯勒萨伊', chapter: '作品6' }, 
            { songId: '4', songName: 'A大调第五小提琴协奏曲，', composer: '莫扎特', chapter: 'K. 219' }, ] 
        },
        { raceId:'3', raceName: '决赛', songList:[ 
            { songId: '1', songName: '《悲喜同源》', composer: '陈其钢', chapter: 'K. 301' }, 
            { songId: '2', songName: 'D大调小提琴协奏曲', composer: '勃拉姆斯', chapter: '作品77' } ] 
        }
      ],
    }
  },
  methods: {
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.personnalId = query.memberId
      }
    },
    _getData() {
      let param = {
        personnalId: '1',
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHome(param, this).then((res) => {

      })
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.member-detail 
    width: calc(100% - 360px)
    min-width: 1140px
    margin: 0 auto
    margin-top: 60px
  .name-css {
    color: $color-item-title;
    font-size: $font-size-item-title;
    margin-top: 60px;
    font-weight: bold
  }
  .contry-css {
    color: $color-item-title;
    font-size: $font-size-item-little;
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: bold
  }
  .role-css {
    color: $color-item-title;
    font-size: $font-size-song-item-title
    font-weight: bold 
  }
  .vedio-btn
    display: block;
    width: 60px;
    height: 60px;
    font-size: $font-size-item-little;
    color: $color-item-more;
    padding-top: 35px;
    background-image: url('~static/image/sisivc/vedio.png');
    background-size: 30px 30px;
    background-position: top left;
    background-repeat: no-repeat;
  .vedio-btn:hover
    background-image: url('~static/image/sisivc/vedio2.png');
    color: #193A80;
  .little
    font-size: $font-size-item-little;
    color: $color-item-more;
  .display-div
    .display-title
      color: $color-item-title;
      font-size: $font-size-song-item-title 
      font-weight: bold
      margin-bottom: 30px
    .song-title
      color: $font-size-detail-title
      font-size: $font-size-song-item-title
      font-weight: bold
      margin-bottom: 20px
    .song 
      font-size: $font-size-detail-content!important;
      color: $color-detail-content!important;
      line-height: 20px;
      margin-bottom: 10px;
  .content-css {
    -webkit-column-count: 2;  /* 分3列 */
    column-count: 2;
    column-rule: none;  /* 列之间的分隔线 */
    column-gap: 40px;          /* 列之间的间距 */
  }
  .content-css-8 {
    -webkit-column-count: 1;  /* 分3列 */
    column-count: 1;
    column-rule: none;  /* 列之间的分隔线 */
    column-gap: 0;          /* 列之间的间距 */
    margin-left: 40px;
  }
  .content-css >>>p, .content-css-8 >>>p {
      font-size: $font-size-detail-content!important;
      color: $color-detail-content!important;
      line-height: 22px;
      margin-bottom: 30px;
      text-align:justify;
    }
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
