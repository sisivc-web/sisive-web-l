<template>
  <div class="container">
    <div class="member-detail">
      <el-row>
          <el-col :span="8">
            <div style="margin-right: 130px">
              <img :src="userIfo.imageUrl" style="width:100%;height:auto;"/>
              <h2 class="name-css">{{userIfo.name}}</h2>
              <p class="contry-css">{{userIfo.country}}</p>
              <h3 v-if="userIfo.roleCode === '3'" class="role-css">{{userIfo.roleName}}</h3>
              <a class="vedio-btn" :href="userIfo.vedioUrl" v-if="userIfo.roleCode === '2'">视频播放</a>
              <span class="little">2018 上海艾萨克 ̇斯特恩国际小提琴比赛</span>
            </div>
          </el-col>
          <el-col :span="8" v-if="userIfo.roleCode === '2'" class="display-div">
            <h3 class="display-title">曲目</h3>
            <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in raceSongsList" :key="index">
                <h3 class="song-title">{{item.scheduleName}}</h3>
                <el-card :body-style="{ padding: '0px' }" v-for="(el, i) in item.playerChapterVoList" :key="i">
                    <p class="song">{{el.composers}}：</p>
                    <p class="song">{{el.repertoire + '，' + el.chapters}}</p>
                </el-card>
            </el-card>
          </el-col>
          <el-col :span="userIfo.roleCode != '2' ? 16 : 8">
              <div v-html="despContent" :class="userIfo.roleCode != '2' ? 'content-css' : 'content-css-8'"></div>
          </el-col>
      </el-row>
    </div>
    <detail-footer v-if="this.GLOBAL.isDetailFoot"></detail-footer>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiMemberDetail} from 'apx'
import DetailFooter from 'components/m-footer/m-detail-footer'
export default {
  components: {
    DetailFooter,
  },
  created() {
    this.GLOBAL.setIsDetailFoot(true)
    this._getURLQuery()
    this._getData()
  },
  mounted() {
    // window.addEventListener('scroll', this._getDataMore)
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this._getDataMore)
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
  },
  watch: {
  },
  computed: {
  },
  data() {
    return {
      personnalId: '',
      userIfo: {
          name: '荒井优利奈',
          imageUrl: 'static/image/sisivc/pingwei/1.jpg',
          country: '日本',
          roleCode: '2',
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
        { scheduleId:'1', scheduleName: '四分之一决赛', playerChapterVoList:[ 
            { repertoire: '第十八号G大调莫扎特小提琴奏鸣曲', composers: '莫扎特', chapters: 'K. 301' }, 
          ]
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
        personnalId: this.personnalId,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiMemberDetail(param, this).then((res) => {
        let el = res.data.data
        this.userIfo = {
          name: el.userName,
          imageUrl: el.image,
          country: el.nationality,
          roleCode: el.type,
          roleName: el.title,
          // roleName: el.type === '1' ? '评委' : el.type==='2'?'参赛选手' : '艺术家',
          vedioUrl: el.externalLink,
        }
        console.log(this.userIfo)
        this.despContent = el.description
        this.raceSongsList = el.personnelScheduleVoList
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
    color: $color-detail-title;
    font-size: $font-size-item-title;
    margin-top: 40px;
    font-weight: bold
  }
  .contry-css {
    color: $color-detail-title;
    font-size: $font-size-detail-title;
    margin-top: 20px;
    margin-bottom: 40px;
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
    font-size: $font-size-detail-content;
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
    .el-card
      border: none;
      border-radius: 0;
      overflow: hidden;
      box-shadow: none;
    .display-title
      color: $color-detail-title;
      font-size: $font-size-song-item-title 
      font-weight: bold
    .song-title
      color: $color-detail-title
      font-size: $font-size-detail-title
      font-weight: bold
      margin-top: 30px
      margin-bottom: 15px
    .song 
      font-size: $font-size-detail-content!important;
      color: $color-detail-content!important;
      line-height: 20px;
      margin-bottom: 5px
  .content-css {
    font-size: $font-size-detail-content!important;
    color: $color-detail-content!important;
    line-height: 22px;
    text-align:justify;
    -webkit-column-count: 2;  /* 分3列 */
    column-count: 2;
    column-rule: none;  /* 列之间的分隔线 */
    column-gap: 40px;          /* 列之间的间距 */
  }
  .content-css-8 {
    font-size: $font-size-detail-content!important;
    color: $color-detail-content!important;
    line-height: 22px;
    text-align:justify;
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
