<template>
  <div class="container">
    <div class="other">
      <m-anchor :contentDivClass="'home-anchor-container'" :anchorItem="'anchor-item'" :subNavList="[$t('subNavs.enroll1'), $t('subNavs.enroll2'), $t('subNavs.enroll3'), $t('subNavs.enroll4'), $t('subNavs.enroll5'), $t('subNavs.enroll6'), $t('subNavs.enroll7'), $t('subNavs.enroll8'), $t('subNavs.enroll9')]"></m-anchor>
      <div class="home-anchor-container">
        
        <home-item-solt :itemName="'member-div'" :title="$t('judges')" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <member-container :data="judgesListSource" :typeName="'judges'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('players')" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <member-container :data="playersListSource" :typeName="'players'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('artists')" :isShowMore="false" :marginBottom="'30px'">
          <div slot="detail">
            <member-container :data="artistsListSource" :typeName="'artists'">
              <template slot="item" slot-scope="props">
                <member-item :item="props.item"></member-item>
              </template>
            </member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'parter-div'" :title="$t('partners')" :isShowMore="false">
          <div slot="detail">
            <div class="sub-item" v-for="(el,i) in parterList" :key="i">
              <h3 class="sub-h3">{{el.level}}</h3>
              <div style="border-top: 1px solid #80808030;padding-top:40px;" v-if="el.levelId === 1">
                <img :src="el.partnerVoList[0].logoUrl">
                <div v-html="el.partnerVoList[0].description" class="desp"></div>
              </div>
              <div style="padding-top:0;" v-if="el.levelId > 1">
                <el-row>
                  <el-col :span="el.levelId === 2 ? 6 : 3" v-for="(item, index) in el.partnerVoList" :key="index">
                    <el-card :body-style="{ padding: '0px', paddingBottom: '40px' }">
                      <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                        <img :src="item.logoUrl" style="width:100%;height:auto;">
                      </div>
                      <div class="title">{{item.title}}</div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </home-item-solt>
      </div>
    </div>
    <div style="width:100%;overflow:hidden;">
      <video src="static/image/sisivc/SISIVC.mp4" class="vedio-css" width="100%" height="auto" controls="controls" poster="static/image/sisivc/poster.jpg" >您的浏览器不支持 video 标签。</video>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiHome} from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import MemberContainer from 'components/commonComponents/member-container'
import MemberItem from 'components/commonComponents/member-item'
import HomeItemSolt from 'components/home/home-item-solt'
export default {
  components: {
    MAnchor,
    MemberContainer,
    MemberItem,
    HomeItemSolt,
  },
  data() {
    return {
      isFixed: false,
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
      parterList: [],
    }
  },
  created() {
    this._getData()
  },
  computed: {},
  methods: {
    _getData() {
      let param = {
        competitionId: '1',
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiHome(param, this).then((res) => {
        let results = res.data.data
        let tempPlayers = results.players
        let tempJurys = results.jurys
        let tempArtists = results.artists

        this.judgesListSource = tempJurys.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        })

        this.playersListSource = tempPlayers.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        })

        this.artistsListSource = tempArtists.map(el => {
          return {
            id: el.id,
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
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
