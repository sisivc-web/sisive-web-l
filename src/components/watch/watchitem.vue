<template>
  <div style="position:relative;">
    <div style="padding:0px 10px;min-height:220px;max-height:300px;overflow:hidden;overflow-y:auto !important;">
      <div v-for="player in watchData.players" :key="player.id">
        <div style="margin: 12px 0;color:white;font-weight:bold;" class="flex-between">
          <div>{{player.userName}}</div>
          <div>{{player.nationality}}</div>
          <div v-show="currentEye !== 'player'+player.id"><i class="el-icon-view" @click="currentEye='player'+player.id"></i></div>
          <img v-show="currentEye == 'player'+player.id" :src="player.image" style="width:44px;"/>
        </div>
        <div :style="{display: currentEye == 'player'+player.id ? 'block' : 'none'}">
          <div style="color:white;font-weight:bold;opacity:0.7;;font-size:10px;line-height:15px;" v-for="(vol,key) in player.playerChapterVoList" :key="key">
            <div style="margin:5px 0;">{{vol.composers}}:</div>
            <div style="margin:5px 0;">{{vol.repertoire}},{{vol.chapters}}</div>
          </div>
        </div>
      </div>
      <div style="padding:0px 0px;"><divider :height="1"></divider></div>
      <div style="padding:0px 0px;" v-for="artist in watchData.artists" :key="artist.id">
        <div style="margin: 12px 0;color:white;font-weight:bold;" class="flex-between">
          <div>{{artist.userName}}</div>
          <div>{{artist.nationality}}</div>
          <span>{{artist.type | personFilter}}</span>
          <div v-show="currentEye !== 'artist'+artist.id"><i class="el-icon-view" @click="currentEye='artist'+artist.id"></i></div>
          <img v-show="currentEye == 'artist'+artist.id" :src="artist.image" style="width:44px;"/>
        </div>
      </div>
      <div style="padding:0px 0px;" v-for="group in watchData.groups" :key="group.id">
        <div style="margin: 12px 0;color:white;font-weight:bold;" class="flex-between">
          <span>{{group.orchestraTitle}}</span>
          <div>{{group.nationality}}</div>
          <span>{{group.type}}</span>
          <div v-show="currentEye !== 'group'+group.id"><i class="el-icon-view" @click="currentEye='group'+group.id"></i></div>
          <img v-show="currentEye == 'group'+group.id" :src="group.image" style="width:44px;"/>
        </div>
      </div>
    </div>
    <div :style="{position:'absolute',bottom:'0px',width:'100%',backgroundColor:themeColor}">
      <div class="flex-center" :style="{backgroundColor:'#FFFFFF33',height:'30px',color:'white',fontWeight:'bold',width:'100%'}" @click="_buyTicket">点击购票</div>
    </div>
  </div>
</template>

<script>
  import divider from '../../base/divider/divider'
  import { kpiWatchDetail } from 'apx'
  // <!-- 人员类型：1 评委，2：选手，3 艺术家 -->
  let typeNames = {
    'zh_CN': {
      '1': '评委',
      '2': '艺术家'
    },
    'en': {
      '1': 'Judge',
      '2': 'Artist'
    }
  }
  export default({
    name: 'watchitem',
    props: {
      watchId: {
        type: String,
        default: ''
      },
      themeColor: {
        type: String,
        default: 'white'
      }
    },
    components: {
      divider
    },
    data() {
      return {
        watchData: {},
        currentEye: ''
      }
    },
    filters: {
      personFilter (val) {
        let locale = JSON.parse(localStorage.getItem('immi_language'))
        return typeNames[locale][val]
      }
    },
    created () {
      this.getDetail()
    },
    methods:{
      getDetail(){
        let _this = this
        let param = {
          id: this.watchId,
          language: JSON.parse(window.localStorage.getItem('immi_language'))
        }
        kpiWatchDetail(param, this).then((res) => {
          _this.watchData = res.data.data
        })
      },
      _buyTicket () {
        if (this.watchData.ticketAddress) {
          window.open(this.watchData.ticketAddress)
        } else {
          window.open('http://www.baidu.com')
        }
      }
    }
  })
</script>
