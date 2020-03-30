<template>
  <div class="container">
    <div class="other">
      <sub-nav :subNavList="subNavList" :nowClickYear="reviewId" @changeData="_getData"></sub-nav>
      <div class="home-anchor-container">
        <home-item-solt :itemName="'award-div'" :title="$t('prizeWinners')" :isShowMore="false" :marginBottom="'60px'" v-if="awardUserList.length > 0">
          <div slot="detail">
            <award-list :awardUserList="awardUserList" :awardUserImgUrl="awardUserImgUrl" :awardUserId="awardUserId" @handleChange="handleChange"></award-list>
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
        <instersting-news :newsDetail="data"></instersting-news>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiHistory, kpiHistoryDetail} from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import MemberContainer from 'components/commonComponents/member-container'
import MemberItem from 'components/commonComponents/member-item'
import HomeItemSolt from 'components/home/home-item-solt'
import AwardList from 'components/home/award-list'
import SubNav from 'components/sub-nav/sub-nav'
import InsterstingNews from 'components/history/instersting-news'
import { getYearSubList } from 'apx/util.js'

export default {
  components: {
    MAnchor,
    MemberContainer,
    MemberItem,
    HomeItemSolt,
    AwardList,
    SubNav,
    InsterstingNews
  },
  data() {
    return {
      data: {},
      isFixed: false,
      awardUserList: [],
      awardUserId: '',
      awardUserImgUrl: require('static/image/sisivc/award/0.jpg'),
      nowClickAward: '',
      finalObj: [],
      reviewId: 0,
      judgesListSource: [
        {name: '大卫·斯特恩', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
      ],
      artistsListSource: [
        {name: '大卫·斯特恩', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
      ],
      playersListSource: [
        {name: '斯雷滕·克里斯蒂奇', country: '塞尔维亚/德国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
      ],
      animationName: '',
      nowSelYear: '',
      subNavList: [],
    }
  },
  created() {
    this._getURLQuery()
    this._getData()
  },
  computed: {
  },
  mounted() {
    this._getHistoryData()
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleChange(val) {
      this.nowClickAward = val ? val : this.nowClickAward
      this.awardUserId = this.nowClickAward ? this.awardUserList[this.nowClickAward - 1].playerId : ''
      this.awardUserImgUrl = this.nowClickAward ? this.awardUserList[this.nowClickAward - 1].imgUrl : this.finalObj[0].imgUrl
    },
    _getURLQuery() {
      const query = this.$route.query
      if(query) {
        this.reviewId = query.reviewId
      }
    },
    _getHistoryData() {
      let param = {
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHistory(param, this).then((res) => {
        this.subNavList = res.data.data.map((el) => {
          return {
            name: el.year,
            id: el.id
          }
        })
        let temp = getYearSubList(this.subNavList)
        this.subNavList = temp
      })
    },
    _getData(year) {
      let param = {
        reviewId: year ? year : this.reviewId,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHistoryDetail(param, this).then((res) => {
        let results = res.data.data
        let tempWinners = results.winners
        let tempPlayers = results.players
        let tempJurys = results.jurys
        let tempArtists = results.artists

        this.data = results

        this.awardUserList = tempWinners ? tempWinners.map(el => {
          return {
            awardName: el.awardName,
            userName: el.playerName,
            imgUrl: el.winnerShow,
            coverImgUrl: el.winnerShow,
            country: el.playerNationality,
            playerId: el.playerId
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
            if(this.finalObj && this.finalObj.length > 0)
              this.awardUserImgUrl = this.finalObj[0].imgUrl
            this.awardUserId = ''
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
          bottom: 20%;
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
      bottom: 5%;
      left: calc(50% - 40px);
      background: url('~static/image/home/zs/arrow.png') no-repeat 100% 100%; 
      -webkit-animation: myfirst 2s infinite;
      -moz-animation: myfirst 2s infinite;
      -o-animation: myfirst 2s infinite;
      animation: myfirst 2s infinite;
      z-index: 999;
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
      .right
        .el-card
          margin-bottom: 30px!important;
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
  // .sub-nav ul {
  //   width: 1560px;
  // }
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
  // .sub-nav ul {
  //   width: calc(100% - 360px);
  //   min-width: 1140px;
  // }
    
}
</style>
