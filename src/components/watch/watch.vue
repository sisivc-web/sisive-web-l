<template>
  <div class="containerA">
	  <m-anchor :contentDivClass="'Watch'" :anchorItem="'anchor-item'" :parentMenusCode="'watch'" :subNavList="subNavList"></m-anchor>  
      <div class="other Watch">
        <div class="anchor-item">
          <div class="header">
            <div class="mainBox block clearfix">
              <h3 class="title" style="padding: 10px 0 12px;color:#222222;font-size:16px;font-weight:bold;">{{subNav['Schedule']}}</h3>
              <div class="flex-start">
                <div class="flex-start item" v-for="(item, index) in watchDataIndex.scheduleVoList" :key="index">
                  <div class="circle" :style="{background:item.themeColor}"></div>
                  <div>{{item.scheduleName.match(/[^:\uff1a]*(?=:|\uff1a){0,1}/)[0]}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="padding-top:10px;">
            <FullCalendar
              ref="calendar"
              defaultView="dayGridMonth"
              :header="{
                left: '',
                center: 'prev title next',
                right: ''
              }"
              :locale="locale == 'zh_CN' ? 'zh-cn' : 'en'"
              :events="calendarEvents"
              @eventClick="handleEventClick"
              :plugins="calendarPlugins" />
              <div ref="popperRef"></div>
          </div>
          <!-- <div class="date"></div> -->
        </div>
        <!--直播地址-->
        <div class="mainBox block clearfix anchor-item">
          <h3 class="title" style="padding-bottom: 33px;">{{subNav['Live Broadcast']}}</h3>
          <ul class="Broad_add">
            <li v-for="(item, index) in watchDataIndex.broadcastAddressVoList" :key="index">
              <div class="Broad_add_div">
                <img :src="item.iconUrl" style="width:80px;" />
                <div class="fl" style="padding-left: 120px;">
                  <p>{{item.title}}</p>
                  <p><router-link tag="a" :to ="item.externalLink">{{item.description}}</router-link></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!--观赛须知-->
        <div v-if="watchDataIndex.noticeVoList" class="mainBox block clearfix guidelines anchor-item">
          <h3 class="title" style="padding:80px 0 26px 0;">{{subNav['Notes']}}</h3><!--一级标题-->
          <p v-if="watchDataIndex.noticeVoList.length>0" v-html="watchDataIndex.noticeVoList[0].content" style="line-height: 1.75;text-align:justify;"></p><!--二级标题-->
          <!-- <p v-for="(item, index) in watchDataIndex.noticeVoList.slice(1)" :key="index" v-html="item.content"></p> -->
        </div>
        <!--订票方式-->
        <div class="mainBox block clearfix guidelines anchor-item" style="line-height:1.75;text-align:justify;">
          <h3 class="title" style="padding:63px 0 23px 0;">{{subNav['To Order Tickets']}}</h3><!--一级标题-->
          <div v-for="(item,index) in watchDataIndex.bookingWayVoList" :key="index">
            <div v-if="item.booking" v-html="item.booking"></div><!--二级标题-->
            <p v-if="item.content">{{item.content}}</p>
            <p v-if="item.date">{{$t('officeTime')}}：{{item.date}}</p>
            <p v-if="item.address">{{$t('address')}}：{{item.address}}</p>
            <p class="grey" v-if="item.tips">{{item.tips}}</p>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
  import { kpiWatch } from 'apx'
  import MAnchor from 'components/m-anchor/m-anchor'
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import eventpopover from './event-popover'
  import Vue from 'vue'
  import { getSubNav, getSubList } from 'apx/util.js'
  // import vue from 'vue/dist/vue.js'
  export default({
    components: {
      MAnchor,
      FullCalendar,
      eventpopover
    },
    data() {
      return {
        watchDataIndex: {},//观赛主页
        date:'2019-11-22',
        calendarEvents: [],
        subNav: {},
        subNavList: [],
        calendarPlugins: [ dayGridPlugin, interactionPlugin ]
      }
    },
    computed: {
      locale () {
        return JSON.parse(window.localStorage.getItem('immi_language'))
      }
    },
    mounted () {
      this.showData()
    },
    methods:{
      handleEventClick (evt) {
        let cmpt = Vue.extend(eventpopover)
        let mountEl = this.$refs.popperRef
        new cmpt({
          el: mountEl,
          propsData: {
            watchId: evt.event.id,
            reference: evt.el,
            placement: "right-start",
            themeColor: evt.event.backgroundColor
          }
        }).showPopper = true
      },
      showData(){
        let _this = this
        let param = {	
          language: this.locale
        }
        kpiWatch(param, this).then((res) => {
          let data = res.data.data
          _this.subNav = getSubNav("watch");
          _this.subNavList = getSubList("watch");
          _this.watchDataIndex = data
          data.competitionRoundVoList.forEach(e => {
            _this.calendarEvents.push({
              id: e.id,
              title: e.round + ' ' + e.time,
              start: new Date(e.date),
              color: e.themeColor, //'#46A58F',
              allDay: true
            })
          })
        })
      }
    }
  })
</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.fc-toolbar.fc-header-toolbar {
  background-color: #E9E9E9;
  margin-bottom: 0;
}
.fc-toolbar.fc-header-toolbar h2 {
  font-size: 1em;
}
.fc-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.fc-button-primary {
  color: #A0A0A0;
  background-color: #E9E9E9;
  border-color: #E9E9E9;
}
.fc-button-primary:hover {
  color: #A0A0A0;
  background-color: #E9E9E9;
  border-color: #E9E9E9;
}
.fc-button-primary:not(:disabled):active,
.fc-button-primary:not(:disabled).fc-button-active {
  color: #A0A0A0;
  background-color: #E9E9E9;
  border-color: #E9E9E9;
}
.fc-button-primary:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.fc-button-primary:not(:disabled):active:focus,
.fc-button-primary:not(:disabled).fc-button-active:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.fc-event-container {cursor: pointer;}
.fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content, .fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td {
    border-color: #e9e9e9;
}

.fc-unthemed th, .fc-unthemed thead, .fc-unthemed thead tr {
  border-color: #fff;
  color: #ADAFB2;
  padding: 1rem 0;
  font-size: 12px;
  font-weight: 600;
}
.fc-unthemed td.fc-head-container {
  border-color: #fff;
  border-bottom-color: #e9e9e9
}
.fc-dayGrid-view .fc-week-number, .fc-dayGrid-view .fc-day-number {
    padding: 10px;
    color: #212b34;
}
.fc-view-container {
  width: 1140px;
  margin: 0 auto;
}

</style>

<style scoped>
	.containerA{width: 100%;}
  .containerA .other .block{width: 1140px; margin: 0 auto; padding: 50px 0 0;}
    /* 大屏幕 ：大于等于1200px*/
    @media (min-width: 1920px) {
      .containerA .other .block {
          width: 1560px;
          margin: 0 auto;
          padding-top: 34px;
      }
      .Watch >>>.fc-view-container {
        width: 15600px
      }
    }
    @media (min-width: 1500px) and (max-width: 1920px) {
      .containerA .other .block {
          width: calc(100% - 360px);
          min-width: 1140px;
          margin: 0 auto;
      }
      .Watch >>>.fc-view-container {
        width: calc(100% - 360px)
      }
    }
  .clearfix:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
  }v
	
  .header{background: white;height: 100px;}
  .mainBox .title{color: #1e2022;font-size: 24px;font-weight: 700; padding-bottom: 40px;}
  .item{min-width: 120px; max-width: 160px;font-size: 12px;font-weight: bold;margin-right: 54px;}
  .circle{width: 10px;height: 10px;border-radius: 50%;margin-right: 10px;}
  /*----直播地址*/
  .Broad_add{display: grid;grid-template-columns:0.4fr 0.6fr;grid-template-rows:auto;}
  .Broad_add li{/*border-right: 1px solid #e5e5e5; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;*/  height: 140px; position: relative;}
  .Broad_add li:last-child{border-right: 0;}
	/*   .Broad_add li .Broad_add_div i{background: url(../assets/img/about/icon@2x.png) no-repeat; float: left; display: inline-block; width: 64px;height: 64px; margin-top: 41px;}
	   .Broad_add li .Broad_add_div .iconAdd{background-position: left -209px;}
	   .Broad_add li .Broad_add_div .iconVideo{background-position: left -101px;}
	   .Broad_add li:hover .Broad_add_div .iconAdd{background-position:-64px -209px;}
	   .Broad_add li:hover .Broad_add_div .iconVideo{background-position:-64px -99px;} */
	   .Broad_add li .Broad_add_div img{float: left;margin-top: 30px; margin-left: 0; display: block;opacity:1;transition:opacity .35s ease-out;background-color:#fff;pointer-events:auto!important;-webkit-transition: all .2s ease-in-out 0s;
		transition: all .2s ease-in-out 0s}
	   .Broad_add li:hover .Broad_add_div img{opacity:.75!important;-webkit-transform: scale(1.1) translateZ(0);
		-webkit-transform-origin: 50%;
		transform: scale(1.1) translateZ(0);
		transform-origin: 50%;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges}
	   .Broad_add li .Broad_add_div{position: absolute;left: 0; width: 360px; margin:0 auto}
	   .Broad_add li .Broad_add_div p{padding-top: 50px; text-align: left;color: #4c4849;font-size: 14px;font-weight: 700;}
	   .Broad_add li a{color: #1E2022;text-decoration: none;}
	   .Broad_add li .Broad_add_div p:last-child,.Broad_add li .Broad_add_div p:last-child a{padding-top:4px;font-weight: normal; color: #4c4849;font-size: 14px;}
	   .boxImg{position: relative; width: 100%;height: 100%; margin-bottom: 78px;}
	   .boxImg img{width: 100%;height: 100%;}
	   /*----观赛须知*/
	   .guidelines h4{font-size: 15px; color: #222; font-weight: 700; padding:5px 0 34px 0}
	   .guidelines p{font-size: 14px; line-height: 24px; padding-bottom: 7px; color: #4c4948;}
	   /*.guidelines div{font-size: 14px; padding:10px 0 8px;color: #4c4948;}*/
	   .guidelines .grey{color: #a0a0a1;}
	   .guidelines .abuyTicket .buyTicket{background: url('~static/image/sisivc/moreAdvisers/icon@2x.png') no-repeat left top; display:block; width: 46px;height: 46px;}
	   .guidelines .abuyTicket:hover .buyTicket{background-position: -44px top;}
	   .guidelines .abuyTicket{color: #a0a0a1; text-decoration: none; font-size: 12px;}
	   .guidelines .abuyTicket:hover,.Broad_add li:hover .Broad_add_div p a {color: #222; font-size: 12px;}
	    .Broad_add li:hover .Broad_add_div p a{font-size: 14px;}
	   /*----数据显示*/
	   .dataUl{display: grid;grid-template-columns:0.1fr 0.33fr 0.33fr 0.33fr;grid-template-rows:auto; grid-gap:40px; grid-template-rows:auto;}
	   .dataUl h4{color: #222;font-size: 18px;font-weight: 700;}
	   .ListTBox .imgItemCoumuns img{width: 132px;height: 80px; object-fit: cover;}
	   .dataUl li .panelItem{margin-bottom: 37px; padding-top: 4px;}
	   .dataUl li .panelItem h5{padding-bottom: 19px;}
	   .dataUl li h4{padding-bottom: 17px;}
	   .dataUl li .ItemName{color: #4c4849;font-size: 14px; padding-top:9px;font-weight: 700;}
	   .dataUl li .ListTBox{margin-bottom:90px;}
	   .panelSecond{margin-bottom:60px; min-height: 259px;}
	   .dataUl li .panelItem h5 span,.panelSecond dl dd .ItemCoumnsHd span{display: inline-block;color: #222;font-size: 14px;font-weight: 700;}
	   .panelSecond dl dd .ItemCoumnsHd span{font-size: 18px;}
	   .dataUl li .panelItem h5 span.time{padding-left: 10px;}
	   .panelSecond dl dt,.panelSecond dl dd{float: left;}
	   .panelSecond dl dt{width: 140px;}
	   .panelSecond dl dt img{width: 120px; height: 120px; object-fit: cover;}
	   .panelSecond dl dd .ItemCoumnsHd{border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;}
	   .panelSecond dl dd .ItemCoumnsHd .fm{float: right;font-size: 12px; color: rgb(160, 160, 161);font-weight: normal; margin-top: 8px;;}
	   .panelSecond dl dd h6{font-size: 14px;font-weight: 700; padding:5px 0;color: #222;}
	   .panelSecond dl dd .ItemCoumns{line-height: 24px; padding-bottom: 7px;}
	   .panelSecond dl dd .ItemCoumns label{color: #4c4849;font-size: 14px;font-weight: 700;}

</style>
