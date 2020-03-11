<template>
  <div class="container home-anchor-container">
    <div class="other">
      <div class="carousel">
        <el-carousel :interval="5000" :height="carouselHeight + 'px'" arrow="never" indicator-position="none" @change="_change" ref="carousel">
          <el-carousel-item v-for="(item, index) in carousellist" :key="index" name="index">
            <div class="carousel_img">
            <!-- <div class="carousel_img" :style="{'background-image': `url(${item.imageUrl})`}"> -->
              <h1 class="desp-word">{{item.desp}}</h1>
              <img :src="item.imageUrl" ref="carouselHeight" width="100%" @load="imgLoad">
              <!-- <video src="http://116.62.103.169:8080/sisivc/resource/201910271449065951.mp4" width="100%" height="auto" controls="controls" poster="static/image/sisivc/poster.jpg" >您的浏览器不支持 video 标签。</video> -->
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="spot-bar" :width="carouselHeight">
          <span class="item" v-for="n in carousellist.length" :key="n" :class="{'active': n - 1 === carousellistIndex}" @click="carouselNavClick(n-1)"></span>
        </div>
      </div>
      <div class="arrow-div" v-show="!isFixed"></div>
      <!-- <m-anchor :contentDivClass="'home-anchor-container'" :anchorItem="'anchor-item'" :subNavList="[$t('subNavs.news'), awardUserList.length > 0 ? $t('subNavs.awardMember') : '', judgesListSource.length > 0 ? $t('subNavs.judges') : '', playersListSource.length > 0 ? $t('subNavs.contestant') : '', artistsListSource.length > 0 ? $t('subNavs.artist') : '', parterList.length > 0 ? $t('subNavs.partner') : '', 'Ending']"></m-anchor>       -->
      <m-anchor :contentDivClass="'home-anchor-container'" :anchorItem="'anchor-item'" :subNavList="subNavList"></m-anchor>      
      <div>
        <home-item-solt :itemName="'news-div'" :title="$t('newsList.new')" :isShowMore="true" :more="$t('newsList.more')" @gotoMore="gotoMore" :marginBottom="'60px'" v-if="newsList.length > 0" >
          <div slot="detail">
            <div class="details">
              <el-row>
                <el-col :span="10" v-for="(item, index) in newsList.slice(0, 1)" :key="index" class="left">
                  <!-- <el-card :body-style="{ padding: '0px' }"> -->
                    <a href="javascript:;" class="animation hover-animation" @click="_gotoNewsDetails(item.id)"><img :src="item.imageUrl" class="image" style="width:100%;height:auto;"></a>
                    <div style="padding: 30px 0;padding-bottom:12px;" @click="_gotoNewsDetails(item.id)">
                      <span class="title">{{item.title}}</span>
                      <div class="operate">
                        <time class="time">{{item.date}}</time>
                        <el-button type="text" class="button" style="opacity:0">阅读全文</el-button>
                      </div>
                    </div>
                    <el-card class="box-card award-list" :body-style="{ padding: '15px 0', paddingLeft: '0px',
        paddingRight: '0px' }">
                      <div v-html="item.content" class="news-content">
                      </div>
                    </el-card>
                  <!-- </el-card> -->
                </el-col>
                <el-col :span="14" class="right">
                  <el-col :span="12" v-for="(item, index) in newsList.slice(1, 5)" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                      <a href="javascript:;" class="animation hover-animation" @click="_gotoNewsDetails(item.id)"><img :src="item.imageUrl" class="image" style="width:100%;height:auto;"></a>
                      <div style="padding-top: 10px;" @click="_gotoNewsDetails(item.id)">
                        <span class="title">{{item.title}}</span>
                        <div class="operate">
                          <time class="time">{{item.date}}</time>
                          <el-button type="text" class="button" @click="_gotoNewsDetails(item.id)">阅读全文</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="temp-read">
              <el-button type="text" class="button" @click="_gotoNewsDetails(newsList[0].id)">阅读全文</el-button>
            </div>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'award-div'" :title="$t('prizeWinners')" :isShowMore="false" :marginBottom="'60px'" v-if="awardUserList.length > 0">
          <div slot="detail">
            <award-list :awardUserList="awardUserList" :awardUserImgUrl="awardUserImgUrl" @handleChange="handleChange"></award-list>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('judges')" :isShowMore="false" :marginBottom="'30px'" v-if="judgesListSource.length > 0">
          <div slot="detail">
            <member-container :data="judgesListSource" :typeName="'judges'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('players')" :isShowMore="false" :marginBottom="'30px'" v-if="playersListSource.length > 0">
          <div slot="detail">
            <member-container :data="playersListSource" :typeName="'players'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('artists')" :isShowMore="false" :marginBottom="'30px'" v-if="artistsListSource.length > 0">
          <div slot="detail">
            <member-container :data="artistsListSource" :typeName="'artists'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'parter-div'" :title="$t('partners')" :isShowMore="false" v-if="parterList.length > 0">
          <div slot="detail">
            <partner-list :parterList="parterList"></partner-list>
          </div>
        </home-item-solt>
      </div>
    </div>
    <div style="width:100%;overflow:hidden;" class="anchor-item">
      <video src="static/image/sisivc/SISIVC.mp4" class="vedio-css" width="100%" height="auto" controls="controls" :poster="require('static/image/sisivc/poster.jpg')" >您的浏览器不支持 video 标签。</video>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiLogin, kpiHome} from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import MemberContainer from 'components/commonComponents/member-container'
import MemberItem from 'components/commonComponents/member-item'
import HomeItemSolt from 'components/home/home-item-solt'
import AwardList from 'components/home/award-list'
import PartnerList from 'components/home/partner-list'
// import Divider from 'base/divider/divider'
export default {
  components: {
    MAnchor,
    MemberContainer,
    MemberItem,
    HomeItemSolt,
    AwardList,
    PartnerList
  },
  data() {
    return {
      carouselHeight: '980',
      carousellist: [],
      carousellistIndex: 0,
      isFixed: false,
      subNavList: [],
      newsList: [],
      // awardItemHeight: 50,
      awardUserList: [],
      // awardUserImgUrl: '',
      awardUserImgUrl: require('static/image/sisivc/award/0.jpg'),
      nowClickAward: '',
      finalObj: [],
      judgesListSource: [
        // {name: '大卫·斯特恩', country: '美国', imageUrl: require('static/image/sisivc/pingwei/1.jpg')},
      ],
      artistsListSource: [],
      playersListSource: [],
      animationName: '',
      parterList: [],
    }
  },
  created() {
    this._getData()
  },
  computed: {
    // carouselHeight: function() {
    //   console.log('computed')
    //   let width = document.body.clientWidth
    //   // width = width >= 1140 ? width : 1140
    //   let height = Math.floor(width * 490 / 960)
    //   return height
    // },
  },
  mounted() {
    // this.imgLoad()
    // this.awardItemLoad()
    // 2、挂载 reisze 事件 → 屏幕缩放时监听宽度变化
    window.onresize = () => {
      return (() => {
        this.carouselHeight = this.$refs.carouselHeight[0].height
        // this.awardItemHeight = parseInt(this.$refs.awardImage.height - 9) / 8
      })()
    }
    /**通过给变成固定定位的元素添加一个同等高度的父元素，防止该元素变成固定定位时，脱离文档流导致的页面抖动 */
    // this.tabsHeight = this.$refs.elTabs.offsetHeight;
    window.addEventListener("scroll", this.handleScroll);

  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // awardItemLoad() {
    //   this.$nextTick(() => {
    //     let that = this
    //     setTimeout(() => {
    //       that.awardItemHeight = parseInt(that.$refs.awardImage.height - 9) / 8
    //     }, 0)
    //   })
    // },
    imgLoad() {
      this.$nextTick(() => {
        this.carouselHeight = this.$refs.carouselHeight[0].height
      })
    },
    /**滚动事件 */
    handleScroll() {
      //获取页面滚动条的高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 10) {
        // $subNav.addClass("subNavFixed");
        this.isFixed = true
        // $arrowDiv.css("display", "none");
      } else {
        this.isFixed = false
        // $arrowDiv.css("display", "block");
      }
    },
    gotoMore() {
      this.$router.push({path: '/news'})
    },
    handleChange(val) {
      this.nowClickAward = val ? val : this.nowClickAward
      this.awardUserImgUrl = this.nowClickAward ? this.awardUserList[this.nowClickAward - 1].imgUrl : this.finalObj[0].imgUrl
    },
    moreClick(flag) {
      this[`${flag}List`] = this[`${flag}List`] .length > 8 ? this[`${flag}ListSource`].slice(0,8) : this[`${flag}ListSource`]
      this[`${flag}AnimationName`] = this[`${flag}List`].length > 8 ? 'rotate' : ''
    },
    _change(index) {
      this.carousellistIndex = index
    },
    carouselNavClick(index) {
      this.$refs.carousel.setActiveItem(index)
    },
    _gotoNewsDetails(newsId) {
      this.$router.push({path: '/newsDetail', query: {newsId: newsId}})
    },
    _getData() {
      let param = {
        competitionId: '1',
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHome(param, this).then((res) => {
        let results = res.data.data
        let tempBanners = results.banners
        let tempNews = results.news
        let tempWinners = results.winners
        let tempPlayers = results.players
        let tempJurys = results.jurys
        let tempArtists = results.artists
        let tempPartnerVos = results.partnerVos
        let tempEndings = results.endings

        this.carousellist = tempBanners ? tempBanners.map(el => {
          return {
            desp: el.title,
            imageUrl: el.bannerUrl,
            targetUrl: el.externalLink
          }
        }) : []

        this.newsList = tempNews ? tempNews.map(el => {
          return {
            id: el.id,
            title: el.title,
            imageUrl: el.image,
            targetUrl: el.externalLink,
            date: el.createOn,
            awardList: [],
            content: el.content
          }
        }) : []

        this.awardUserList = tempWinners ? tempWinners.map(el => {
          return {
            awardName: el.awardName,
            userName: el.playerName,
            imgUrl: el.winnerShow,
            coverImgUrl: el.winnerShow,
            country: el.playerNationality,
          }
        }) : []
        //最后一个元素为封面
        if(this.awardUserList.length > 0) {
          let tempIndex = -1
          this.finalObj = this.awardUserList.filter((el, index) => {
            (el.awardName === '不能删' || !el.awardName) && (tempIndex = index)
            return (el.awardName === '不能删' || !el.awardName)
          })
          this.awardUserList.splice(tempIndex, 1)
          // this.finalObj = this.awardUserList.splice(this.awardUserList.length - 1, 1)
          this.$nextTick(() => {
            this.awardUserImgUrl = this.finalObj[0].imgUrl
            // this.awardItemLoad()
          })
        }

        this.judgesListSource = tempJurys ? tempJurys.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        }) : []

        this.playersListSource = tempPlayers ? tempPlayers.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        }) : []

        this.artistsListSource = tempArtists ? tempArtists.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        }) : []
        this.parterList = tempPartnerVos ? tempPartnerVos : []
        this.subNavList = [this.$i18n.t('subNavs.news'), this.awardUserList.length > 0 ? this.$i18n.t('subNavs.awardMember') : '', this.judgesListSource.length > 0 ? this.$i18n.t('subNavs.judges') : '', this.playersListSource.length > 0 ? this.$i18n.t('subNavs.contestant') : '', this.artistsListSource.length > 0 ? this.$i18n.t('subNavs.artist') : '', this.parterList.length > 0 ? this.$i18n.t('subNavs.partner') : '', 'Ending']
        this.subNavList = this.subNavList.filter( el => {
          return el != ''
        })
      })
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
@import "~common/stylus/mixin"
.container
  width 100%
  .other
    @extend .flex
    @extend .flex-column
    overflow: hidden;
    // .list
    //   @extend .flex
    //   @extend .flex-row
    //   @extend .flex-center
    //   width 100%
    //   height 60px
    //   p
    //     @extend .pointer
    //     color $color-text-black_11
    //     font-size $font-size-level_3
    //     margin 0 22px
    .carousel
      width 100%
      position: relative
      .carousel_img
        width 100%
        height 100%
        background-size 100% 100%
        .desp-word
          font-size: 45px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          bottom: 25%;
          text-align: center;
          width: 100%;
        video
          position: absolute;
          top: 0;
          left: 0;
      .spot-bar
        @extend .flex
        @extend .flex-row
        @extend .flex-center
        height: 90px
        position: absolute;
        top: 50%;
        right: - 45px;
        z-index: 900;
        -webkit-transform: rotate(45deg);
        transform: rotate(90deg);
        .item
          width: 10px
          height: 10px
          background-color: $color-back-silvery_0
          border-radius: 5px
          margin: 0 10px
        .active
          width: 20px
          background-color: $color-back-gray_0
    .arrow-div 
      width: 80px;
      height: 50px;
      position: fixed;
      bottom: 2%;
      left: calc(50% - 40px);
      background: url('~static/image/home/zs/arrow.png') no-repeat 100% 100%; 
      -webkit-animation: myfirst 2s infinite;
      -moz-animation: myfirst 2s infinite;
      -o-animation: myfirst 2s infinite;
      animation: myfirst 2s infinite;
      z-index: 999;
    // .block
    //   width: 1140px
    //   margin: 0 auto
    //   padding: 50px 0 0
      // .header
      //   @extend .flex
      //   @extend .flex-column
      //   @extend .flex-end
      //   align-items: start;
      //   width 100%
      //   position relative
      //   font-family Helvetica
      //   .title
      //     color: #1e2022;
      //     font-size: 24px;
      //     font-weight: bold;
      //   .little
      //     font-size: 12px;
      //     color: #808080;
      //     margin-bottom: 20px;
      //     margin-top: -20px;
      //     padding-top: 20px;
      //   .more
      //     @extend .flex
      //     @extend .flex-row
      //     @extend .flex-end
      //     height 16px
      //     color $color-text-gray_2
      //     font-size $font-size-level_2
      //     position absolute
      //     right 0
      //     bottom: 0
      //     .arrow
      //       width 6px
      //       height 6px
      //       background-size 100% 100%
      //       background-image: url('~static/image/home/zs/more_arrow.png')
      //       margin-left 4px
      .details
        @extend .flex
        @extend .flex-row
        @extend .flex-between
        width 100%
        margin-top 40px
        .title
          margin-top: 20px;
          margin-bottom: 10px;
          color: #222;
          font-size: 14px;
          font-weight: 700;
        .operate
          @extend .flex
          @extend .flex-row
          @extend .flex-between
          .time
            // color: #a0a0a1;
            // font-size: 12px;
            color: $color-item-more;
            font-size: $font-size-item-little;
          .button
            // color: #a0a0a1;
            // font-size: 12px;
            color: $color-item-more;
            font-size: $font-size-item-little;
            margin: 0;
            text-align: right;
        .left
          .el-card
            border: none;
            border-radius: 0;
            box-shadow: none;
        .right
          .el-card
            margin-bottom: 40px;
            margin-left: 40px;
            border: none;
            border-radius: 0;
            box-shadow: none;
        // .vedio-btn
        //   display: block;
        //   width: 60px;
        //   height: 60px;
        //   font-size: 12px;
        //   color: #222;
        //   padding-top: 35px;
        //   background-image: url('~static/image/sisivc/vedio.png');
        //   background-size: 30px 30px;
        //   background-position: top left;
        //   background-repeat: no-repeat;
        // .vedio-btn:hover
        //   background-image: url('~static/image/sisivc/vedio2.png');
        //   color: #193A80;
    .news-div
      .left
        .award-list
          border: none;
          border-top: 1px solid rgba(128, 128, 128, 0.19)!important;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          box-shadow: none;
          .news-content
            margin-bottom: 10px;
            line-height: 25px;
            font-size: $font-size-detail-content;
            color: $color-detail-content;
            // font-size: 13px;
            // color: rgb(76, 73, 72);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
            max-height: 30px;
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
              margin: 0
              padding: 0
              border: 0
              font-size: 100%
              font-weight: normal
              vertical-align: baseline 
      .right
        .el-card
          margin-bottom: 30px!important;
      .temp-read
        margin-top: -68px;
        position: relative;
        .button
          color: $color-item-more;
          font-size: $font-size-item-little;
          margin: 0;
          text-align: right;
    .award-div
      .el-row
        width: 100%
        .left
          .el-collapse
            border: none;
            border-top: 1px solid $color-item-more;
            // border-top: 1px solid rgb(160, 160, 161);
            .el-collapse-item
              .title-name
                border-bottom: none;
                // font-size: 14px;
                font-size: $font-size-detail-title;
                font-weight: bold;
                color: $color-detail-title;
                // color: #222;
              >>>.el-collapse-item__header__arrow
                display: none;
              >>>.el-collapse-item__header
                padding-left: 0;
                height: 12.5%;
                min-height: 50px;
                position: relative; 
                border-bottom: none;
                // color: #000000;
                color: $color-detail-title;
                border-bottom: none;
                .el-col
                  padding-right: 5px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
              >>>.el-collapse-item__content
                padding: 0;
            .el-collapse-item
              border-bottom: 1px solid $color-item-more;
              // border-bottom: 1px solid rgb(160, 160, 161);
              >>>.el-collapse-item__wrap
                border-bottom: none;
                display: none;
            .el-collapse-item:hover
              span
                font-weight: bold!important;
            .el-collapse-item.is-active
              font-weight: bold!important;
              span
                font-weight: bold!important;
              >>>.el-collapse-item__header
                color: $color-detail-title;
              >>>.el-collapse-item__wrap
                display: none
    .parter-div
      padding-bottom:30px;
      .sub-item
        h3
          font-size: 14px;
          color:#222;
          font-weight: bold;
          margin: 0;    
          padding-bottom: 20px;
          padding-top: 20px;
        .sub-h3
          padding-top: 40px;
          padding-bottom: 40px;
        p, .desp
          // font-size: 13px;
          // color: #4c4948;
          font-size: $font-size-detail-content;
          color: $color-detail-content;
          margin: 1.6rem 0;
          line-height: 20px;
          text-align:justify;
        .el-row
          border: none;
          .el-card
            border: none;
            border-radius: 0;
            box-shadow: none;
            .title
              text-align: center;
              width: 100%;
              margin-top: 10px;
              // font-size: 13px;
              // color: #4c4948;
              font-size: $font-size-detail-content;
              color: $color-detail-content;
a.animation
  line-height: 0;
  img
    -webkit-transition: -webkit-transform 1s;
    -moz-transition: -moz-transform 1s;
    -o-transition: -o-transform 1s;
    transition: transform 1s;
a.hover-animation
  overflow: hidden;
  display: block;
a.hover-animation:hover img
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -ms-transform: scale(1.05);
  -o-transform: scale(1.05);
  transform: scale(1.05);
@-webkit-keyframes myfirst{
    0% {
        transform: translate(0px, 0px);
    }
    50% {
        transform: translate(0px, -10px);
    }
    100% {
        transform: translate(0px, 0px);
    }
} 
@keyframes myfirst {
    0% {
        transform: translate(0px, 0px);
    }
    50% {
        transform: translate(0px, -10px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}
@-webkit-keyframes hdnav2-show2 {
    0% {
        top: -42px
    }

    100% {
        top: 70px
    }
}
@keyframes hdnav2-show2 {
    0% {
        top: -42px
    }

    100% {
        top: 70px
    }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1920px)  {
  .container .other .block {
    width: 1560px;
  }
  .sub-nav ul {
    width: 1560px;
  }
  .carousel, .vedio-css {
    width: 1920px!important;
    margin: 0 auto!important;
  }
  .vedio-css {
    display: block;
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
    
}
</style>
