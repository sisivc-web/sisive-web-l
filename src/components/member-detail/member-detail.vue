<template>
  <div class="container">
    <el-row>
        <el-col :span="8">
            <img :src="userIfo.imageUrl" style="width:100%;height:auto;"/>
            <h2>{{userIfo.name}}</h2>
            <p>{{userIfo.country}}</p>
            <h3 v-if="userIfo.roleCode === '1'">{{userIfo.roleName}}</h3>
            <a class="vedio-btn" href="#" v-if="userIfo.roleCode === '2'">视频播放</a>
            <span>2018 上海艾萨克 ̇斯特恩国际小提琴比赛</span>
        </el-col>
        <el-col :span="8">
            <h3>曲目</h3>
            <el-card :body-style="{ padding: '0px' }" v-for="(item, index) in raceSongsList" :key="index">
                <h3>{{item.raceName}}</h3>
                <el-card :body-style="{ padding: '0px' }" v-for="(el, i) in item.songList" :key="i">
                    <p>{{el.composer}}</p>
                    <p>{{el.songName}} + ',' + {{el.chapter}}</p>
                </el-card>
            </el-card>
        </el-col>
        <el-col :span="userIfo.roleCode != '1' ? 16 : 8">
            <div v-html="despContent"></div>
        </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
// import Divider from 'base/divider/divider'
// import FilterBar from 'base/filter-bar/filter-bar'
// import AdvancedSearch from 'base/more-categories/advanced-search/advanced-search'
// import MPopularServiceCard from 'base/popular/m-popular-service-card/m-popular-service-card'
// import MWarning from 'base/m-warning/m-warning'
// import {kpiProductPage} from 'apx'
export default {
  components: {
    // Divider,
    // FilterBar,
    // AdvancedSearch,
    // MPopularServiceCard,
    // MWarning
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
        userIfo: {
            name: '荒井优利奈',
            imageUrl: 'static/image/sisivc/pingwei/1.jpg',
            country: '日本',
            roleCode: '2',
            roleName: '',
            vedioUrl: 'static/image/sisivc/SISIVC.mp4',
        },
        despContent: `<p>大卫 ̇斯特恩在音乐上的领导地位横跨三片大陆。凭借他所分享的 坚定的音乐理念与灵活的手法，以及他对音乐在当今世界仍然不可 或缺的信念，无论是指挥交响乐团、上演巴洛克歌剧、指导声乐大 师班或者组织文化活动，斯特恩都能紧紧地联系他的乐手、学生与 听众。他是巴黎“烈火歌剧团”的创始人与总监，同时也是上海巴 洛克音乐节的艺术顾问与首席指挥，并担任佛罗里达棕榈滩歌剧院 的首席指挥。</p>
                      <p>从 1998 年在普罗旺斯艾克斯音乐节创办国际声乐艺术学院开始， 大卫 ̇斯特恩就一直致力于发掘青年声乐人才。他在 2003 年创立 了烈火歌剧团，为法国青年专业歌手提供了一个平台，这个团体将 青年艺术家演出计划、古乐团和演出制作团队结合在一起，在国内 外上演音乐会版与舞台版演出。从 2014 年开始，作为上海巴洛克 音乐节的艺术总监，斯特恩将上海音乐学院的人才引入了他在上海 交响乐团音乐厅举办的演出和大师班</p>
                      <p>斯特恩以他所擅长的广泛曲目而闻名。在以色列以及瑞士圣加仑歌 剧院担任音乐总监时，他将涵盖多种风格的作品搬上了舞台，包括 贝尔格的《沃采克》、布里顿的《旋螺丝》和魏尔的《马哈哥尼城 的兴衰》。从 2010 年起他将四部新歌剧搬上舞台，包括在以色列歌 剧院上演，由吉尔 ̇肖尔查特创作的歌剧《儿童的梦想》、由烈火 歌剧团委约，在巴黎香榭丽舍剧院上演的尼可拉斯 ̇巴克利创作的
《女人心前传》、在棕榈滩歌剧院上演的本 ̇摩尔的《敌人 ̇一个爱 情故事》、和在瑞典卓宁霍姆音乐节上演的简 ̇桑德斯特罗姆的《洛 可可机器》。</p>
                      <p>大卫 ̇斯特恩从耶鲁大学获得文学学士学位后，在茱莉亚音乐学院 获得音乐硕士学位。</p>
                     `,
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
    //   entries: [
    //     {
    //       title: this.$t('serviceCategories'),
    //       selected: 0,
    //       children: [
    //         {name: this.$t('all'), value: ''},
    //         {name: this.$t('productTypes.application'), value: 'C'},
    //         {name: this.$t('productTypes.visitVisa'), value: 'S'},
    //         {name: this.$t('productTypes.studyVisa'), value: 'S'},
    //         {name: this.$t('productTypes.workVisa'), value: 'S'},
    //         {name: this.$t('productTypes.skillsMigration'), value: 'S'},
    //         {name: this.$t('productTypes.investmentMigration'), value: 'S'},
    //         {name: this.$t('productTypes.familyMigration'), value: 'S'},
    //         {name: this.$t('productTypes.otherVisaServices'), value: 'S'},
    //         {name: this.$t('productTypes.packageService'), value: 'S'},
    //         {name: this.$t('productTypes.skillsAssessment'), value: 'S'},
    //         {name: this.$t('productTypes.aatReview'), value: 'S'},
    //         {name: this.$t('productTypes.courtAppeal'), value: 'S'},
    //         {name: this.$t('productTypes.additional'), value: 'V'},
    //         {name: this.$t('productTypes.others'), value: 'V'}
    //       ]
    //     },
    //     {
    //       title: this.$t('serviceFee'),
    //       selected: 0,
    //       children: [
    //         {name: this.$t('all'), value: ''},
    //         {name: '0-500', value: '1'},
    //         {name: '500-1000', value: '2'},
    //         {name: '1000-3000', value: '3'},
    //         {name: '3000-5000', value: '4'},
    //         {name: '5000+', value: '5'}
    //       ]
    //     },
    //     {
    //       title: this.$t('serviceGuaranteedTime'),
    //       selected: 0,
    //       children: [
    //         {name: this.$t('all'), value: ''},
    //         {name: '1-2', value: '1'},
    //         {name: '3-4', value: '2'},
    //         {name: '5-6', value: '3'},
    //         {name: '7+', value: '4'}
    //       ]
    //     }
    //   ],
    //   filterList: [this.$t('bestMatch'), this.$t('reviews'), this.$t('popularity')],
    //   datalist: [],
    //   loading: false,
    //   currentPage: 1,
    //   totalCount: 0,
    //   pageCount: 0
    }
  },
  methods: {
    _getDataMore() {
      // console.log(document.documentElement.clientHeight + '-----------' + window.innerHeight) // 可视区域高度
      // console.log(document.documentElement.scrollTop + document.body.scrollTop) // 滚动高度
      // console.log(document.body.offsetHeight) // 文档高度
    //   // 判断是否滚动到底部
    //   if (this.loading === true) return
    //   if (document.documentElement.scrollTop + document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
    //     console.log('滚动到底部', this.currentPage, this.datalist.length)
    //     if (this.datalist.length % 20 === 0) {
    //       this.currentPage++
    //       this._getData()
    //     }
    //   }
    },
    _getData() {
    //   this.loading = true
    //   let param = {
    //     pageNo: this.currentPage,
    //     pageSize: 20,
    //     isWished: 0,
    //     status: '1',
    //     institutionCode: this.entries[1].children[this.entries[1].selected].value,
    //     productType: this.entries[0].children[this.entries[0].selected].value,
    //     productName: this.$route.query.name
    //   }
    //   kpiProductPage(param, this).then((res) => {
    //     console.log(res)
    //     this.loading = false
    //     // if (this.noValue(res.data.data.list)) return
    //     if (!this.noValue(res.data.data.list) && this.currentPage > 1) {
    //       // load more
    //       console.log('load more')
    //       this.datalist = this.datalist.concat(res.data.data.list)
    //     } else {
    //       console.log('load once')
    //       this.datalist = res.data.data.list
    //     }
    //     this.totalCount = res.data.data.totalCount
    //     this.pageCount = res.data.data.pageCount
    //   })
    },
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.container 
    width: calc(100% - 360px)
    min-width: 1140px
    margin: 0 auto
// .title
//   @extend .flex-start
//   padding: 0 15px
//   height: 50px
//   color: $color-text-black_0
//   font-size: $font-size-level_5
//   .number
//     color: $color-text-orange_0
// .cards
//   width: 100%
//   @extend .flex-row
//   @extend .flex-start
//   align-items: flex-start
//   flex-wrap: wrap
//   align-content: flex-start
//   .item
//     margin-bottom: 13.33px
</style>
