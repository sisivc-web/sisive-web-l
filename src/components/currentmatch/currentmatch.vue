<template>
  <div class="container">
    <div class="other">
      <m-anchor :contentDivClass="'home-anchor-container'" :anchorItem="'anchor-item'" :parentMenusCode="'currentmatch'" :subNavList="subNavList"></m-anchor>
      <div class="home-anchor-container">
        <!-- <home-item-solt :itemName="'enroll-div'" :title="$t('subNavs.enroll1')" :isShowMore="false" :marginBottom="'0'"> -->
        <home-item-solt :itemName="'enroll-div'" :title="''" :isShowMore="false" :marginBottom="'0'">
          <div slot="detail">
            <a class="enroll-a" :href="data.registrationAddress" target="_blank">
              <div class="item">
                <h2>{{$t('register')}}</h2>
              </div>
              <div class="item">
                <span>{{$t('registerDesp')}}</span>
                <i class="el-icon-edit-outline"></i>
              </div>
            </a>
          </div>
        </home-item-solt>
        <!-- <div class="enroll-div anchor-item block" style="margin: 0 auto;">
          <a class="enroll-a" href="data.registrationAddress" target="_blank">
            <div class="item">
              <h2>点击报名</h2>
            </div>
            <div class="item">
              <span>点击进入报名页面</span>
              <i class="el-icon-edit-outline"></i>
            </div>
          </a>
        </div> -->
        <div class="match-div">
          <div class="match-item anchor-item">
            <match-item :title="entryRequirements.resourceName" :subTitle="year + ' SISIVC ' + entryRequirements.resourceName" :linkUrl="entryRequirements.resourceUrl" @view="view(1)"></match-item>
          </div>
          <div class="match-item anchor-item">
            <match-item :title="program.resourceName" :subTitle="year + ' SISIVC ' + program.resourceName" :linkUrl="program.resourceUrl" @view="view(2)"></match-item>
          </div>
        </div>
        <div class="match-div" style="position:relative;left:0;top:-184px;">
          <div style="position: absolute;top: 0px;left: 0px;width: 100%;background: #fff;z-index: 889">
            <transition name="draw">   <!--这里的name 和 css 类名第一个字段要一样-->
              <div class="box" v-show="boxshow" style="height:100%">
                <match-item :title="title" :subTitle="year + ' SISIVC ' + title" :isBottomBorder="false"  :linkUrl="contentPdf" @view="view()"></match-item>
                <div v-html="content" style="padding:30px 0 50px;line-height: 1.75;text-align:justify;"></div>
                <div style="text-align:center;padding-bottom:60px;cursor:pointer;" @click="view">
                  <i class="el-icon-arrow-up" style="font-size: 30px;color: #222;font-weight: 600;"></i>
                  <br/>
                  <span style="font-size: 10px;color: #656464;">{{$t('packUp')}}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- <home-item-solt :itemName="'schedul-div'" :title="$t('subNavs.enroll4')" :isShowMore="false" :marginBottom="'30px'"> -->
        <home-item-solt :itemName="'schedul-div'" :title="subNav['Schedule']" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <ul class="schedul-ul">
              <li v-for="(item, index) in data.scheduleVoList" :key="index">
                <p style="font-weight:bold;">{{item.scheduleName.match(/[^:\uff1a]*(?=:|\uff1a){0,1}/)[0]}}</p>
                <p>{{item.scheduleName.match(/(\:|\uff1a)([^\(\uff08]*)/)?item.scheduleName.match(/(\:|\uff1a)([^\(\uff08]*)/)[2]:item.scheduleName.match(/(\:|\uff1a)([^\(\uff08]*)/)}}</p>
                <!-- <p>{{item.startDate}} - {{item.endDate}}</p> -->
                <!-- "889000006（6666(60:0(00)99(000)".match(/(\(|\uff08)[^\)\uff09]*/) -->
                <!-- <p>{{item.scheduleName.match(/(?<=\(|\uff08).+(?=\)|\uff09)/)?"("+item.scheduleName.match(/(?<=\(|\uff08).+(?=\)|\uff09)/)[0]+")":''}}</p> -->
                <p>{{item.scheduleName.match(/(\(|\uff08)[^\)\uff09]*/)?item.scheduleName.match(/(\(|\uff08)[^\)\uff09]*/)[0]+"）":''}}</p>
              </li>
            </ul>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="subNav['Jurys']" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <member-container :data="judgesListSource" :typeName="'judges'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="subNav['Contestants']" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <member-container :data="playersListSource" :typeName="'players'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="subNav['Artists']" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <member-container :data="artistsListSource" :typeName="'artists'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="subNav['Orchestra']" :isShowMore="false" :marginBottom="'30px'">
        </home-item-solt>
        <div class="boxImg">
          <img :src="matchBg">
        </div>
        <home-item-solt :itemName="'introdution-div'" :isAnchorItem="false" :title="$t('name')" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <div class="introduce-div" v-html="competitionOrchestraVo.orchestraDescription"></div>
          </div>
        </home-item-solt>
        <div class="rule-div anchor-item">
          <h1>{{subNav['Rules']}}</h1>
          <div class="downloadPoint">
            <a href="javascript:;" @click="downloadFile(data.contestRules)" class="download"></a><p>{{$t('description')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiHistory, kpiHistoryDetail, kpiCurrentMatch} from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import MemberContainer from 'components/commonComponents/member-container'
import MemberItem from 'components/commonComponents/member-item'
import HomeItemSolt from 'components/home/home-item-solt'
import MatchItem from 'components/currentmatch/match-item'
import { getSubNav, getSubList } from 'apx/util.js'
export default {
  components: {
    MAnchor,
    MemberContainer,
    MemberItem,
    HomeItemSolt,
    MatchItem,
  },
  data() {
    return {
      data: {},
      program: {},
      entryRequirements: {},
      isFixed: false,
      boxshow: false,//比赛须知展开与否
      contentPdf: '',
      title: "",
      content: "<p>为营造一个良好的观赛氛围，不对选手比赛和评委评审工作造成影响，请观众理解并遵守以下规则：</p><p>1.入场前，请寄存您的手机、数码相机、单反相机、DV机等具有摄影摄像功能的电子设备。</p><p><br></p><p>2.入场前，请寄存女式包袋、双肩包、大型包裹、塑料袋、纸袋等随身包袋。</p><p><br></p><p>3.如迟到，您可以先通过入口处的液晶屏观看厅内演出转播，直至该选手结束所有曲目、并在下一个选手上场前在工作人员引领下尽快入场、就近入座。建议您提前半小时到达剧场，</p><p>如您需现场自助取票则提前至少45分钟到达剧场。</p><p><br></p><p>4.不得携带饮料、食物入场。</p><p><br></p><p>5. 1米2以下儿童谢绝入场。</p>",
      judgesListSource: [],
      artistsListSource: [],
      playersListSource: [],
      competitionOrchestraVo: {},
      animationName: '',
      parterList: [],
      scheduleVoList: [],//比赛日程数据
      year: (new Date()).getFullYear() + '',
      matchBg: require('static/image/sisivc/match-bg.png'),
      subNav: {},
      subNavList: [],
    }
  },
  created() {
    // this._getHistoryData()
    this._getData()
    
  },
  computed: {},
  methods: {
    downloadFile(url) {
      let fileName = "";
      let temp = url.split("/");
      fileName = temp[temp.length - 1]
      window.open(`/sisivc/resource/downloadFile?fileName=${fileName}`)
    },
    view(flag) {
      this.boxshow = !this.boxshow
      if(flag === 1) {
        this.content = this.data.entryRequirements.content
        this.contentPdf = this.data.entryRequirements.resourceUrl
        this.title = this.data.entryRequirements.resourceName
      } else if(flag === 2) {
        this.content = this.data.program.content
        this.contentPdf = this.data.program.resourceUrl
        this.title = this.data.program.resourceName
      }
    },
    _getHistoryData() {
      let param = {
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHistory(param, this).then((res) => {
        let nowYearObj = []
        nowYearObj = res.data.data.filter((el) => {
          return el.year === this.year
        })
        this._getData(nowYearObj[0].id)
      })
    },
    _getData(id) {
      let param = {
        reviewId: id,
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiCurrentMatch(param, this).then((res) => {
        let results = res.data.data
        let tempPlayers = results.players
        let tempJurys = results.jurys
        let tempArtists = results.artists
        
        this.subNav = getSubNav("currentmatch");
        this.subNavList = getSubList("currentmatch");
        this.data = results
        this.entryRequirements = results.entryRequirements
        this.program = results.program
        this.competitionOrchestraVo = results.competitionOrchestraVo
        // this.scheduleVoList = results.scheduleVoList
        // this.scheduleVoList.map(el => {
        //   return {
        //     title
        //   }
        // })
        console.log(this.competitionOrchestraVo)
        this.judgesListSource = tempJurys ? tempJurys.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
            title: el.title
          }
        }) : []

        this.playersListSource = tempPlayers ? tempPlayers.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
            title: el.title
          }
        }) : []

        this.artistsListSource = tempArtists ? tempArtists.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
            title: el.title
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
    .enroll-a
      display: -webkit-box
      display: -webkit-flex
      display: -ms-flexbox
      display: flex
      justify-content: space-between
      align-items: center
      height: 80px;
      line-height: 60px;
      border-top: 1px solid #E9E9E9;
      border-bottom: 1px solid #E9E9E9;
      // margin-top: 20px;
      cursor: pointer; 
      h2
        color: $color-item-title;
        font-size: $font-size-item-title;
        font-weight: bold;
      span, i 
        font-size:12px;
        color:#a0a0a1;
      i 
        font-size:16px;
        color: #BFBFBF;
        padding-left: 20px;
    .match-div
      display: -webkit-box
      display: -webkit-flex
      display: -ms-flexbox
      display: flex
      justify-content: space-between
      align-items: center
      width: 1140px;
      margin: 0 auto;
      .match-item
        width: 48%;
    .schedul-ul
      overflow: hidden
      li
        width: 20%;
        display: block;
        float: left;
        height: 100px;
        font-size:14px;
        color:#4c4948;
        line-height: 25px;
        padding-top: 20px;
    .boxImg, .boxImg img
      width: 100%;
      height: auto;
    .introduce-div
      padding-top: 20px;text-align:justify;
      >>> p
        text-align:justify;
        font-size:14px;
        color:#4c4948;
        line-height: 1.6;
        padding-top: 20px;
    .rule-div
      h1
        color: $color-item-title;
        font-size: $font-size-item-title;
        padding-top: 60px;
        text-align: center;
      .downloadPoint{width:100%;margin:30px auto 120px; text-align: center;}
      .downloadPoint .download{text-align: center;  margin:0 auto; background: url('~static/image/sisivc/about/img1.png') no-repeat -64px 0; width: 64px;height: 64px; display: block; background-size: cover;}
      .downloadPoint .download:hover{background: url('~static/image/sisivc/about/img1.png') no-repeat;}
      .downloadPoint p{padding-top: 8px;font-size: 12px; color: #A0A0A1; line-height: 22px;  text-align: center;}
.draw-enter-active, .draw-leave-active {
    transition: all 0.1s ease;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
}    
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
  .match-div {
    width: 1560px!important;
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
  .match-div {
    width: calc(100% - 360px)!important;
  }
    
}
</style>
