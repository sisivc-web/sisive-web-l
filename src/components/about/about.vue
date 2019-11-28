<template>
<div class="containerA">
  <m-anchor :contentDivClass="'AboutGame'" :anchorItem="'anchor-item'" :subNavList="[$t('subNavs.aboutUs1'), $t('subNavs.aboutUs2'), $t('subNavs.aboutUs3'), $t('subNavs.aboutUs4'), $t('subNavs.aboutUs5')]"></m-anchor>  
 <div class="AboutGame other">
   <div class="mainBox block clearfix">
     <div class="flexBox">
       <div class="fl aItemG">
         <h3>关于比赛</h3>
         <div class="img">
           <img :src="awardsVoList.image" />
         </div>
       </div>
       <div class="aInfo">
         <div class="Desc">
             <p>{{awardsVoList.description}}</P> 
          </div>          
       </div>
     </div>
     <!--关于比赛-->
     <div class="ItemV">
       <h3>织织架构</h3>
       <div class="ItemDl">
         <ul class="ulLIst clearfix">
           <li v-for="(item,index) in awardsVoList.committeeVoList" v-if="item.isUnit == 1 && item.parentId == 0" :key="index">
             <h5>{{item.title}}</h5>
             <p v-for="(item1,index) in item.sonCommitteeVos" v-if="item1.parentId == item.id">{{item1.title}}</p>
           </li>
         </ul>
       </div>
       <div class="colspanRow">
         <div class="left" v-for="(item,index) in awardsVoList.committeeVoList" v-if="item.isUnit == 0 && item.parentId == 0" :key="index">
           <div class="ff"><h5>{{item.title}}</h5></div>
           <div class="ff" v-for="(item1,index) in item.sonCommitteeVos" v-if="item.id == item1.parentId"><label>{{item1.title}}</label><div class="secName"><p v-for="(item2,index) in item1.sonCommitteeVos" v-if="item1.id == item2.parentId">{{item2.title}}</p></div></div>
          </div>
     </div>
     </div>
     <!--组织架构-->
     <div class="ItemV" style="padding-top: 103px;">
       <h3>奖项</h3>
       <div class="ItemDl">
         <ul class="awardList">
           <li v-for="(list,index) in awardsVoList.awardsVoList" v-if="list.isGroup == 0" :class="{'on':receiveIndex == index}" :key="index" @mouseenter="liShowHandle(index)">
             <h5>{{list.awardName}}</h5>
             <p>{{list.bonus}}</p>
           </li>
         </ul>
       </div>
       <div class="perArard">
         <ul class="awardList">
          <li v-for="(item,index) in awardsVoList.awardsVoList" :class="{'on':receiveIndex == index}" :key="index" v-if="item.isGroup == 1" @mouseenter="liShowHandle(index)">
             <p class="firstAr" v-if="item.tag">特设奖项</p>
             <h5>{{item.awardName}}</h5>
             <p>{{item.bonus}}</p>
           </li>
         </ul>
       </div>
     </div>
     <!--奖项-->
     <div class="Point">
       <h2>评分规则</h2>
       <div class="boxPanel">
         <!-- {{awardsVoList.rulesScheduleVos}} -->
         <div class="fl ItemLst" v-for="(item,index) in awardsVoList.rulesScheduleVos" :key="index">
           <h3>{{item.scheduleName}}</h3>
           <div class="ruleContent">
               <dl v-for="(item1,index) in item.scoringRulesVos">
                 <dt>{{index+1}}.{{item1.rules}}</dt>
                 <dd v-for="(item2,index) in item1.sonScoringRulesVos" v-if="item1.id == item2.rulesPid">{{item2.rules}}</dd>
               </dl>
           </div>
 
         </div>
       </div>
       <div class="downloadPoint"><router-link tag="a" to="/download" class="download"></router-link><p>下载评分规则</p></div>
     </div>
      </div>
      <!--图片-->
     <div class="boxImg">
       <img :src="awardsVoList.venueImage">
     </div>
     <!--奖项-->
     <div class="mainBox block clearfix">
     <div class="GamePlace">
       <h2>比赛场地</h2>
       <div class="GameTitBox">
         <div class="fl ItemLst">
           <h3>{{awardsVoList.venueTitle}}</h3>
           <div class="ruleContent">
               <p>{{awardsVoList.venueDescription}}</p>
 
            </div>
         </div>
         </div>
     </div>
    </div>
 </div>
</div>
</template>

<script>
import { kpiAboutUs } from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
export default {
  components: {
    MAnchor
  },
  data() {
    return {
		receiveIndex:0,
		awardsVoList : '',
	}
  },
  mounted:function(){
    this.showData()
  },
  methods:{
    liShowHandle(index){
      this.receiveIndex = index
    },
    showData(){
      let _this = this
      let param = {
        id: '1',
        language: JSON.parse(window.localStorage.getItem('immi_language'))
      }
      kpiAboutUs(param, this).then((res) => {
      // axios.get('sisivc/competition/competitionDetails?language=zh&id=1').then(function(res){
  
        let data = res.data.data        
        _this.awardsVoList = data
      })
    }
  }
}
</script>

<style>
	.containerA{width: 100%;}
	.containerA .other .block{width: 1140px; margin: 0 auto; padding: 50px 0 0;}
	 /* 大屏幕 ：大于等于1200px*/
	 @media (min-width: 1920px) {
	 .containerA .other .block {
	     width: 1560px;
	     margin: 0 auto;
	     padding-top: 50px;
	 }
	 }
	 @media (min-width: 1400px) and (max-width: 1920px) {
	 .containerA .other .block {
	     width: calc(100% - 360px);
	     min-width: 1140px;
	     margin: 0 auto;
	 }
	 }
	.flexBox{display: flex;}
	.mainBox{width: 100%;}
	.aItemG{width:500px;margin-right: 80px;}
	.aItemG .img img{width: 500px;}
	.aItemG h3,.nInfoNameSpec h3{padding:0 0 158px 0; color: #1e2022;font-size: 24px; font-weight: 700;}
	.aInfo{width: 100%}
	.aInfo p,.boxPanel .ItemLst p,.GamePlace .ItemLst p{font-size: 14px; margin: 1.6rem 0; line-height: 24px; color: #4c4948; text-align: justify;}
	.nInfoNameSpec{margin:8rem 0 0 0}
	.nInfoNameSpec h3{font-size:20px; padding:0 0 24px 0}
	
	.downloadPoint{width:72px;margin:70px auto 120px; text-align: center;}
	.downloadPoint .download{text-align: center;  margin:0 auto; background: url('~static/image/sisivc/about/img1.png') no-repeat -64px 0; width: 64px;height: 64px; display: block; background-size: cover;}
	.downloadPoint .download:hover{background: url('~static/image/sisivc/about/img1.png') no-repeat;}
	.downloadPoint p{padding-top: 8px;font-size: 12px; color: #A0A0A1; line-height: 22px;  text-align: justify;}
	/*---织织架构----*/
	.ItemV{padding:111px 0 0 0}
	.ItemV h3{color: #1e2022;font-size: 24px; font-weight: 700;padding-bottom: 35px;}
	.ItemDl .ulLIst{display: grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr));margin-bottom:0;padding: 35px 0;width: 100%;padding: 35px 0;border-top: 1px solid hsla(0,0%,50%,.19)!important;border-bottom: 1px solid hsla(0,0%,50%,.19)!important;}
	.ItemDl .ulLIst li{color: #a0a0a1;}
	.ItemDl .ulLIst li h5{font-size: 18px;color: #222; font-weight: 700; padding:0 0 11px 0;}
	.ItemDl .ulLIst li p{color: #4c4948;line-height: 24px; font-size: 14px;}
	/*---奖项*/
	.ItemDl .awardList{display: grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr)); margin-bottom: 35px; grid-gap:60px;width: 100%;padding: 35px 0 0; border-top: 1px solid hsla(0,0%,50%,.19)!important; }
	.ItemDl .awardList li,.perArard .awardList li{color: #a0a0a1; position: relative;text-align: center; padding-bottom: 35px; flex: 1; border-bottom: 1px solid hsla(0,0%,50%,.19)!important;}
	.ItemDl .awardList li h5,.perArard .awardList li h5{font-size: 18px;color: #222; font-weight: 700; padding:0 0 15px 0;}
	.ItemDl .awardList li p,.perArard .awardList p{font-size: 14px;line-height: 22px;color: #4c4948;}
	.awardList li:after{content: '';display: block;width: 8%;position: absolute;background: #fff; right: 0;bottom: -38px; height: 5px;}
	.awardList li.on:after{border-bottom: 1px solid #1e2022;width: 100%; bottom: -1px;position: absolute; left: 0;}
	.colspanRow{display: grid;grid-template-columns:0.33fr 0.33fr;grid-template-rows:auto; padding-top: 10px;}
	.colspanRow .left .ff{clear: both; padding:27px 0 15px}
	.colspanRow .left label,.colspanRow .left h5{font-size: 14px; color: #222;font-weight: 700; width: 110px; padding: 0 0 4px 0; float: left;}
	.colspanRow .left .secName{float: left;color:#4c4948;font-size: 14px;}
	.colspanRow .left .secName p{padding-bottom: 8px;font-size: 14px;}
	.colspanRow .left .ff h5{font-size: 18px;color: #222; font-weight: 700; display: inline-block;}
	
	.perArard .awardList{display: grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr));margin-bottom: 55px;grid-gap:60px;padding: 35px 0;}
	.ItemDl .awardList li{cursor: pointer;}
	.perArard .awardList li p.firstAr{position: absolute; left: 50%; margin-left: -32px;top: -30px; font-size: 16px; color: #646464;}
	.perArard .awardList li h5{padding-top: 20px;}
	/* ----计分规则 */
	.Point h2,.GamePlace h2{color: #1e2022;font-size: 24px; font-weight: 700;padding-bottom: 30px;}
	.boxPanel {display: grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr));margin-bottom: 55px; grid-gap:60px}
	.boxPanel .ItemLst h3{color: #222; position: relative;text-align: left; font-size: 18px; font-weight: 700; padding-bottom: 20px; flex: 1; border-bottom: 1px solid hsla(0,0%,50%,.19)!important;}
	
	.ruleContent span{display: inline-block;padding-left: 20px; line-height: 28px;}
	.ruleContent dl dd,.ruleContent dl dt{ padding:8px 0 8px 15px; font-size: 14px; color: #4c4948;}
	.ruleContent dl dt{padding-left:0}
	/* ----比赛场地 */
	.GamePlace .ItemLst h3{color: #4c4849; position: relative;text-align: left; font-size: 14px; font-weight: 700;}
	.GamePlace .ItemLst p{margin-top: 12px;}
	.boxImg{position: relative; width: 100%;height: 100%;}
	.boxImg img{width: 100%;height: 100%;}	
</style>
