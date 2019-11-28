<template>
  <div class="containerA">
	  <m-anchor :contentDivClass="'AboutGame'" :anchorItem="'anchor-item'" :subNavList="[$t('subNavs.aboutUs1'), $t('subNavs.aboutUs2'), $t('subNavs.aboutUs3'), $t('subNavs.aboutUs4'), $t('subNavs.aboutUs5')]"></m-anchor>  
      <div class="other" >
        <div class="header">
          <div class="mainBox block clearfix">
            <h3 class="title" style="padding-top: 21px; padding-bottom: 12px;">比赛日程</h3>
          </div>
          <!--日期-->
          <dl class="MinMon clearfix">
            <dt class="FullYear">2018</dt>
            <dd class="Prev_month">8月</dd>
            <dd class="Next_month">9月</dd>
          </dl>
        </div>
        <div class="date">
          <ul class="dat_list">
            <li :class="{'on' : receiveIndex == 0}" @click="DateItemLi(0,date)">
              <a href="javascript:void(0)" class="tag_color orange">
                <p>Sat</p>
                <p class="ipn last">11</p>
              </a>
			  <i></i>
              <span></span>
            </li>
            <li :class="{'on' : receiveIndex == 1}" @click="DateItemLi(1,date)">
              <a href="javascript:void(0)" class="tag_color orange">
                <p>Sun</p>
                <p class="ipn last">12</p>
              </a>
              <i></i>
              <span></span>
            </li>
            <li>
              <a href="javascript:void(0)" class="tag_color orange">
                <p>Mon</p>
                <p class="last">13</p>                
              </a>
			  <i></i>
			  <span></span>
            </li>
           <li>
          <a href="javascript:void(0)" class="tag_color orange">
            <p>Tue</p>
            <p class="last">14</p>
          </a>
		  <i></i>
		  <span></span>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color grey">
            <p>Wed</p>
            <p class="last">15</p>
          </a>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Thu</p>
            <p class="last">16</p>
          </a>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Fri</p>
            <p class="last">17</p>
          </a>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Sat</p>
            <p class="last">18</p>
          </a>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color blue">
            <p>Sun</p>
            <p class="last">19</p>
          </a>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color blue">
            <p>Mon</p>
            <p class="last">20</p>
          </a>
          </li>
           <li>
          <a href="javascript:void(0)" class="tag_color blue">
            <p>Tue</p>
            <p class="last">21</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color blue">
            <p>Wed</p>
            <p class="last">22</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color blue">
            <p>Thu</p>
            <p class="last">23</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Fri</p>
            <p class="last">24</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Sat</p>
            <p class="last">25</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Sun</p>
            <p class="last">26</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Mon</p>
            <p class="last">27</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Tue</p>
            <p class="last">28</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Wed</p>
            <p class="last">29</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Thu</p>
            <p class="last">30</p>
          </a>
          </li>
          <li>
          <a href="javascript:void(0)" class="tag_color">
            <p>Fri</p>
            <p class="last">31</p>
          </a>
          </li>         
          </ul>
        </div>
        <!-- {{watchDataIndex}} -->
        <!--观赛banner-->
        <div class="boxImg" v-if="!watchData">
          <img :src="watchDataIndex.scheduleVoList[0].image">
        </div>
		<!--点日期显示下面的数据-->
		<!-- {{watchData}} -->
		<div class="mainBox block clearfix" v-if="watchData">
		  <div class="minLeft">
		    <div class="boxL">
		      <ul class="dataUl">
		        <li>
		          <h4>{{watchData.scheduleName}}</h4>
		          <div class="ListTBox" v-for="(item,index) in watchData.artists" :key="index">
		            <div class="imgItemCoumuns"><img :src="item.image" /></div>
		            <p class="ItemName">{{item.userName}}</p>
		          </div>
		          <div class="ListTBox">
		            <div class="imgItemCoumuns"><img :src="watchData.groupUrl" /></div>
		            <p class="ItemName">{{watchData.groupTitle}}</p>
		          </div>
		        </li>
		        <li v-for="(item,index) in watchData.competitionRoundVos" :key="index">
		          <div class="panelItem clearfix">
		            <h5><span>{{item.round}}</span><span class="time">时间：{{item.time}}</span></h5>
		            <div class="panelSecond clearfix" v-for="(item1,index) in item.players" :key="index">
		              <dl>
		                <dt><img :src= "item1.image" /></dt>
		                <dd>
		                  <div class="ItemCoumnsHd"><span>{{item1.userName}}</span><span class="fm">{{item1.nationality}}</span></div>
		                  <h6>曲目</h6>
		                  <div class="ItemCoumns" v-for="(item2,index) in item1.playerChapterVoList" :key="index"><label>{{item2.composers}}：</label><span>{{item2.chapters}}，{{item2.repertoire}}</span></div>
		                </dd>
		              </dl>
		            </div>
		          </div>
		
		        </li>
		
		      </ul>
		    </div>
		  </div>
		</div>
        <!--直播地址-->
        <div class="mainBox block clearfix">
           <h3 class="title" style="padding-bottom: 33px;">直播地址</h3>
           <ul class="Broad_add">
              <li v-for="(item, index) in watchDataIndex.broadcastAddressVoList" :key="index">
                <div class="Broad_add_div">
                  <img :src="item.iconUrl" />
                  <div class="fl" style="padding-left: 40px;">
                    <p>{{item.title}}</p>
                    <p><router-link tag="a" :to ="item.externalLink">{{item.description}}</router-link></p>
                  </div>
                </div>
              </li>
          </ul>
        </div>
       <!--观赛须知-->
       <div class="mainBox block clearfix guidelines">
          <h3 class="title" style="padding:80px 0 26px 0;">观赛须知</h3><!--一级标题-->
          <h4 v-for="(item, index) in watchDataIndex.noticeVoList" :key="index" v-if="item.id === 1">{{item.content}}</h4><!--二级标题-->
          <p v-for="(item, index) in watchDataIndex.noticeVoList" :key="index" v-if="item.id != 1">{{index}}.{{item.content}}</p>
       </div>
       <!--订票方式-->
       <div class="mainBox block clearfix guidelines">
          <h3 class="title" style="padding:63px 0 7px 0;">订票方式</h3><!--一级标题-->
          <div v-for="(item,index) in watchDataIndex.bookingWayVoList" :key="index">
          <h5 v-if="item.booking">{{item.booking}}</h5><!--二级标题-->
          <p v-if="item.content">{{item.content}}</p>
          <p v-if="item.date">工作时间：{{item.date}}</p>
          <p v-if="item.address">地址：{{item.address}}</p>
          <p class="grey" v-if="item.tips">{{item.tips}}</p>
          <!--
          <p>您可登陆上海交响乐团官方网站 www.shsymphony.com 进行在线选座购票。</p>
          <a href="javascript:void(0)" class="abuyTicket"><i class="buyTicket"></i>点击购票</a>
          <h5>{{item.booking}}</h5>
          <p>您也可前往上海交响乐团售票中心购票。</p>
          <p>工作时间：9:00-20:00。</p>
          <p>地址：上海市徐汇区复兴中路1380号 售票中心。</p> -->
       </div>
       </div>
      
     </div>
    <!--end-->
  </div>
</template>

<script>
  import { kpiWatchDetail, kpiWatch } from 'apx'
  import MAnchor from 'components/m-anchor/m-anchor'
  export default({
    components: {
      MAnchor
    },
    data(){
      return{
        receiveIndex:0,
        watchData:'',//观赛详情
        watchDataIndex:'',//观赛主页
        date:'2019-11-22'
      }
    },
    mounted:function(){
      this.showData()
    },
    methods:{
      DateItemLi(idx,date){
        let _this = this
        this.receiveIndex = idx
        let param = {
          date: date,
          id: '1',
          language: JSON.parse(window.localStorage.getItem('immi_language'))
        }
        kpiWatchDetail(param, this).then((res) => {
          // console.log(res);
          let data = res.data.data
          // console.log(_this)
          _this.watchData = data
        })
      },
      showData(){
        let _this = this
        let param = {	
          id: '1',			 
          language: JSON.parse(window.localStorage.getItem('immi_language'))
        }
        kpiWatch(param, this).then((res) => {
          let data = res.data.data
          console.log(res)
          _this.watchDataIndex = data
        })
      }
    }
  })
</script>

<style>
	.containerA{width: 100%;}
	  .containerA .other .block{width: 1140px; margin: 0 auto; padding: 50px 0 0;}
	   /* 大屏幕 ：大于等于1200px*/
	   @media (min-width: 1920px) {
	   .containerA .other .block {
	       width: 1560px;
	       margin: 0 auto;
	       padding-top: 34px;
	   }
	   }
	   @media (min-width: 1400px) and (max-width: 1920px) {
	   .containerA .other .block {
	       width: calc(100% - 360px);
	       min-width: 1140px;
	       margin: 0 auto;
	   }
	   }
		.clearfix:after {
		    content: '';
		    display: block;
		    height: 0;
		    clear: both;
		    visibility: hidden;
		}
	
	   .header{background: #e3364a;height: 150px;}
	   .mainBox .title{color: #1e2022;font-size: 24px;font-weight: 700; padding-bottom: 40px;}
	
	   .date .dat_list{display: grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr));  grid-template-rows:repeat(2,40px);}
	   .date .dat_list li{text-align: center; position: relative;}
	   .date .dat_list li:hover i{position: absolute;display: block;width:20px; height: 1px; background: #f49950; left: 50%; bottom: 0; margin-left: -10px;}
	   .date .dat_list li.on span{display: block;width:100%; height: 40px;  background: #f49950; position: absolute;bottom: -37px;left: 0;}
	    .date .dat_list li.on p.ipn{color: #fff;z-index: 999;}
	   .date .dat_list li a{color: #c8c8c8; text-decoration: none;}
	   .date .dat_list li p{border-bottom: 1px solid #e5e5e5;padding:10px 0; position: relative;font-size: 12px; height: 40px;}
	   .date .dat_list li p.first{font-size: 12px;}
	   .date .dat_list li p.last{font-size: 14px;}
	   .date .dat_list li a.orange{color: #f49950;}
	   .date .dat_list li a.grey{color: #bebebe;}
	   .date .dat_list li a.blue{color: #1a3880;}
	   .date .dat_list li a.red{color: #e5354c;}
	   .MinMon{position: relative; height: 45px;}
	   .MinMon .FullYear{position: absolute; left: 30px; top: 0; color: #c8c8c8;}
	   .MinMon .Prev_month{position: absolute; left: 30px; top: 20px; font-weight: 700;}
	   .MinMon .Next_month{position: absolute; right: 30px;top: 20px;font-weight: 700;}
	   .header .mainBox .title,.header .MinMon,.header .MinMon .FullYear{color: #fff;}
	   /*----直播地址*/
	   .Broad_add{display: grid;grid-template-columns:0.5fr 0.5fr;grid-template-rows:auto;}
	   .Broad_add li{border-right: 1px solid #e5e5e5; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;  height: 140px; position: relative;}
	   .Broad_add li:last-child{border-right: 0;}
	/*   .Broad_add li .Broad_add_div i{background: url(../assets/img/about/icon@2x.png) no-repeat; float: left; display: inline-block; width: 64px;height: 64px; margin-top: 41px;}
	   .Broad_add li .Broad_add_div .iconAdd{background-position: left -209px;}
	   .Broad_add li .Broad_add_div .iconVideo{background-position: left -101px;}
	   .Broad_add li:hover .Broad_add_div .iconAdd{background-position:-64px -209px;}
	   .Broad_add li:hover .Broad_add_div .iconVideo{background-position:-64px -99px;} */
	   .Broad_add li .Broad_add_div img{float: left;margin-top: 41px; margin-left: -50px; display: inline-block;opacity:1;transition:opacity .35s ease-out;background-color:#fff;pointer-events:auto!important;-webkit-transition: all .2s ease-in-out 0s;
		transition: all .2s ease-in-out 0s}
	   .Broad_add li:hover .Broad_add_div img{opacity:.75!important;-webkit-transform: scale(1.1) translateZ(0);
		-webkit-transform-origin: 50%;
		transform: scale(1.1) translateZ(0);
		transform-origin: 50%;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges}
	   .Broad_add li .Broad_add_div{position: absolute;left: 50%; width: 360px; margin-left: -200px; margin:0 auto}
	   .Broad_add li .Broad_add_div p{padding-top: 50px; text-align: left;color: #4c4849;font-size: 14px;font-weight: 700;}
	   .Broad_add li a{color: #1E2022;text-decoration: none;}
	   .Broad_add li .Broad_add_div p:last-child,.Broad_add li .Broad_add_div p:last-child a{padding-top:4px;font-weight: normal; color: #4c4849;font-size: 14px;}
	   .boxImg{position: relative; width: 100%;height: 100%; margin-bottom: 78px;}
	   .boxImg img{width: 100%;height: 100%;}
	   /*----观赛须知*/
	   .guidelines h4,.guidelines h5{font-size: 15px; color: #222; font-weight: 700; padding:5px 0 34px 0}
	   .guidelines p{font-size: 14px; line-height: 24px; padding-bottom: 7px; color: #4c4948;}
	   .guidelines h5{font-size: 14px; padding:39px 0 8px;color: #4c4948;}
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
	   .panelSecond{margin-bottom:60px;}
	   .dataUl li .panelItem h5 span,.panelSecond dl dd .ItemCoumnsHd span{display: inline-block;color: #222;font-size: 14px;font-weight: 700;}
	   .panelSecond dl dd .ItemCoumnsHd span{font-size: 18px;}
	   .dataUl li .panelItem h5 span.time{padding-left: 10px;}
	   .panelSecond dl dt,.panelSecond dl dd{float: left;}
	   .panelSecond dl dt{width: 140px;}
	   .panelSecond dl dt img{width: 120px; height: 120px; object-fit: cover;}
	   .panelSecond dl dd{font-size: 14px;margin-bottom: 10px; color: #4c4948; width: 295px;}
	   .panelSecond dl dd .ItemCoumnsHd{border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;}
	   .panelSecond dl dd .ItemCoumnsHd .fm{float: right;font-size: 12px; color: rgb(160, 160, 161);font-weight: normal; margin-top: 8px;;}
	   .panelSecond dl dd h6{font-size: 14px;font-weight: 700; padding:5px 0;color: #222;}
	   .panelSecond dl dd .ItemCoumns{line-height: 24px; padding-bottom: 7px;}
	   .panelSecond dl dd .ItemCoumns label{color: #4c4849;font-size: 14px;font-weight: 700;}

</style>
