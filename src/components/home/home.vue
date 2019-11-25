<template>
  <div class="container">
    <div class="other">
      <div class="carousel">
        <el-carousel :interval="80000" :height="carouselHeight + 'px'" arrow="never" indicator-position="none" @change="_change" ref="carousel">
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
      <!-- <div :class="['sub-nav']" style="display: none" > -->
      <!-- <div :class="['sub-nav', isFixed ? 'subNavFixed' : '']" style="display: block" >
        <ul>
          <li><a id="index1" class="active" @click="goAnchor('#anchor1')">{{$t("subNavs.news")}}</a></li>
          <li><a id="index2" @click="goAnchor('#anchor2')">{{$t("subNavs.awardMember")}}</a></li>
          <li><a id="index3" @click="goAnchor('#anchor3')">{{$t("subNavs.judges")}}</a></li>
          <li><a id="index4" onclick="goAnchor('#anchor3')">{{$t("subNavs.contestant")}}</a></li>
          <li><a id="index5" onclick="anchorTo(5, this)">{{$t("subNavs.artist")}}</a></li>
          <li><a id="index6" onclick="anchorTo(6, this)">{{$t("subNavs.partner")}}</a></li>
        </ul>
      </div> -->
      <m-anchor :contentDivClass="'home-anchor-container'" :anchorItem="'anchor-item'" :subNavList="[$t('subNavs.news'), $t('subNavs.awardMember'), $t('subNavs.judges'), $t('subNavs.contestant'), $t('subNavs.artist'), $t('subNavs.partner')]"></m-anchor>
      <div class="home-anchor-container">
        <home-item-solt :itemName="'news-div'" :title="$t('newsList.new')" :isShowMore="true" :more="$t('newsList.more')">
          <div slot="detail">
        <!-- <div class="block news-div anchor-item" >
          <div class="header">
            <p class="little"><span>2018</span>&nbsp;SISIVC</p>
            <h3 class="title">{{$t("newsList.new")}}</h3>
            <div class="more">
              {{$t("newsList.more")}}
              <div class="arrow"></div>
            </div>
          </div> -->
          <div class="details">
            <el-row>
              <el-col :span="12" v-for="(item, index) in newsList.slice(0, 1)" :key="index" class="left">
                <el-card :body-style="{ padding: '0px' }">
                  <a href="javascript:;" class="animation hover-animation"><img :src="item.imageUrl" class="image" style="width:100%;height:auto;"></a>
                  <div style="padding: 30px 0;padding-bottom:12px;">
                    <span class="title">{{item.title}}</span>
                    <div class="operate">
                      <time class="time">{{item.date}}</time>
                      <el-button type="text" class="button">阅读全文</el-button>
                    </div>
                  </div>
                  <el-card class="box-card award-list" :body-style="{ padding: '15px 0', paddingLeft: '0px',
      paddingRight: '0px' }">
                    <div v-for="(el, i) in awardUserList" :key="i" style="font-size:13px;margin-bottom:10px;color: #4c4948;">
                      {{ el.awardName + '：' + el.userName + '（' + el.country + '）' }}
                    </div>
                  </el-card>
                </el-card>
              </el-col>
              <el-col :span="12" class="right">
                <el-col :span="12" v-for="(item, index) in newsList.slice(1, 5)" :key="index">
                  <el-card :body-style="{ padding: '0px' }">
                    <a href="javascript:;" class="animation hover-animation"><img :src="item.imageUrl" class="image" style="width:100%;height:auto;"></a>
                    <div style="padding-top: 10px;">
                      <span class="title">{{item.title}}</span>
                      <div class="operate">
                        <time class="time">{{item.date}}</time>
                        <el-button type="text" class="button">阅读全文</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </div>
        </home-item-solt>
        <!-- </div> -->
        <home-item-solt :itemName="'award-div'" :title="$t('prizeWinners')" :isShowMore="false">
          <div slot="detail">
        <!-- <div class="block award-div anchor-item">
          <div class="header">
            <h3 class="title">{{$t("prizeWinners")}}</h3>
          </div> -->
          <div class="details">
            <el-row>
              <el-col :span="10" class="left">
                <el-collapse accordion @change="handleChange">
                  <el-collapse-item v-for="(item, index) in awardUserList" :key="index" :name="index + 1" >
                    <template slot="title">
                      <el-row ref="awardListItem" :style="{'width' : '100%', 'height' : `${awardItemHeight}` + 'px', 'lineHeight' : `${awardItemHeight}` + 'px'}">
                        <el-col :span="12" class="left">
                          <span :title="item.awardName">{{item.awardName}}</span>
                        </el-col>
                        <el-col :span="8" class="left">
                          <span :title="item.userName">{{item.userName}}</span>
                        </el-col>
                        <el-col :span="4" class="left">
                          <span :title="item.country">{{item.country}}</span>
                        </el-col>
                      </el-row>
                    </template>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
              <el-col :span="14" class="right">
                <transition name="fade">
                <a href="javascript:;" class="animation hover-animation" style="display:block;width:calc(100% - 40px);height:auto;overflow:hiddden;margin-left:40px">
                  <img :src="awardUserImgUrl" :alt="awardUserImgUrl" ref="awardImage" style="width:100%;height:auto;" class="award-img">
                </a>
                </transition>
              </el-col>
            </el-row>
          </div>
          </div>
        </home-item-solt>
        <!-- <div class="block award-div">
          <div class="header">
            <p class="little"><span>2018</span>&nbsp;SISIVC</p>
            <h3 class="title">{{$t("prizeWinners")}}</h3>
          </div>
          <div class="details">
            <el-row>
              <el-col :span="8" class="left">
                <el-collapse accordion @change="handleChange">
                  <el-collapse-item v-for="(item, index) in awardUserList" :key="index" :name="index + 1" >
                    <template slot="title">
                      <span class="title-name">{{item.awardName}}</span>
                    </template>
                    <h3 style="font-size: 26px;margin: 0;">{{item.userName}}</h3>
                    <p style="font-size: 14px;font-weight: bold;">{{ item.country }}</p>
                    <a class="vedio-btn" href="#">视频播放</a>
                  </el-collapse-item>
                </el-collapse>
              </el-col>
              <el-col :span="16" class="right">
                <transition name="fade">
                <a href="javascript:;" class="animation hover-animation" style="display:block;width:100%;height:auto;overflow:hiddden;padding-left:20px">
                  <img :src="awardUserImgUrl" style="width:100%;height:auto;margin-top:-80px;">
                </a>
                </transition>
              </el-col>
            </el-row>
          </div>
        -->
        <home-item-solt :itemName="'member-div'" :title="$t('judges')" :isShowMore="false">
          <div slot="detail">
            <member-container :data="judgesListSource" :typeName="'judges'"></member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('players')" :isShowMore="false">
          <div slot="detail">
            <member-container :data="playersListSource" :typeName="'players'"></member-container>
          </div>
        </home-item-solt>
        <home-item-solt :itemName="'member-div'" :title="$t('artists')" :isShowMore="false">
          <div slot="detail">
            <member-container :data="artistsListSource" :typeName="'artists'"></member-container>
          </div>
        </home-item-solt>
        <!-- <div class="block member-div anchor-item">
          <div class="header">
            <h3 class="title">{{$t("judges")}}</h3>
          </div>
          <div class="details">
            <el-row>
              <el-col :span="6" v-for="(item, index) in judgesList" :key="index">
                <member-item :item="item"></member-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <div :class="['more-div', 'judgesAnimationName']" @click="moreClick('judges')">
                <img src="static/image/sisivc/arrow2.png">
              </div>
            </el-col>
          </el-row>
        </div> -->
        <!-- <div class="block member-div anchor-item">
          <div class="header">
            <h3 class="title">{{$t("players")}}</h3>
          </div>
          <div class="details">
            <el-row>
              <el-col :span="6" v-for="(item, index) in playersList" :key="index">
                <el-card :body-style="{ padding: '0px' }" @click="_gotoDetails(item.index)">
                  <a href="javascript:;" @click="_gotoDetails(item.index)" class="animation hover-animation"><img :src="item.imageUrl" class="image" style="width:100%;height:auto"></a>
                  <div class="operate" style="padding: 10px 0;">
                    <span style="color: #222;font-weight: bold;font-size: 14px;">{{item.name}}</span>
                    <el-button type="text" class="button" style="font-size:12px;color:#a0a0a1;">{{item.country}}</el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <div :class="['more-div', animationName]" @click="moreClick('judges')"><img src="static/image/sisivc/arrow2.png"></div>
            </el-col>
          </el-row>
        </div>
        <div class="block member-div anchor-item">
          <div class="header">
            <h3 class="title">{{$t("artists")}}</h3>
          </div>
          <div class="details">
            <el-row>
              <el-col :span="6" v-for="(item, index) in artistsList" :key="index">
                <el-card :body-style="{ padding: '0px' }" @click="_gotoDetails(item.index)">
                  <a href="javascript:;" @click="_gotoDetails(item.index)" class="animation hover-animation"><img :src="item.imageUrl" class="image" style="width:100%;height:auto"></a>
                  <div class="operate" style="padding: 10px 0;">
                    <span style="color: #222;font-weight: bold;font-size: 14px;">{{item.name}}</span>
                    <el-button type="text" class="button" style="font-size:12px;color:#a0a0a1;">{{item.country}}</el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <div :class="['more-div', animationName]" @click="moreClick('judges')"><img src="static/image/sisivc/arrow2.png"></div>
            </el-col>
          </el-row>
        </div> -->
        <home-item-solt :itemName="'parter-div'" :title="$t('partners')" :isShowMore="false">
          <div slot="detail">
            <!-- <div class="sub-item" style="margin-bottom: 50px;">
              <h3 class="sub-h3">首席合作伙伴</h3>
              <div style="border-top: 1px solid #80808030;padding-top:40px;">
                <img src="static/image/sisivc/hezuo/1-1.jpg">
                <h3>中国太平洋保险（集团）股份有限公司</h3>
                <p>中国太平洋保险（集团）股份有限公司（以下简称“太平洋保险”、“公司”）是在1991年5月13日成立的中国太平洋保险公司的基础上组建而成的保险集团公司，总部设在上海，是国内领先的“A+H”股上市综合性保险集团。</p>
                <p>太平洋保险以打造“在你身边的一流保险金融服务集团”为愿景，坚持“以客户需求为导向，专注保险主业，推动和实现可持续的价值增长”的经营理念，不断完善保险产业链全牌照布局，旗下拥有寿险、产险、资产管理、在线服务、养老保险、健康保险、农业保险等专业子公司，建立了覆盖全国的营销网络和多元化服务平台，提供全方位风险保障解决方案、投资理财和资产管理服务。
                </p>
                <p>2015年，太平洋保险实现营业收入达2472.02亿元，其中保险业务收入2033.05亿元；净利润达177.28亿元。2015年末，总资产达9238.43亿元，净资产达1333.36亿元，客户数9435.6万。截至2015年末，公司拥有近10万名员工和近60万名保险营销员。公司连续第五年入选财富世界500强榜单，排名第328位。在全球最大的品牌咨询公司Interbrand发布的“最佳中国品牌价值排行榜”中，公司品牌价值为241.39亿元，位列行业前三。
                </p>
                <p>  太平洋保险推进“以客户需求为导向”的战略转型，紧密围绕转型三大目标，坚持问题导向，推动转型成果落地：在关注客户需求方面，实现精准销售和精细服务；在改善客户界面方面，积极运用新技术，确保中后台支持前端；在提升客户体验方面，大力推动产品创新，将优质、便捷的保险服务带到客户身边，得到社会各界的广泛认同。
                </p>
                <p>太平洋保险严格遵守法律法规以及监管部门颁布的各项要求，结合公司实际情况，不断完善公司治理结构。公司通过不断优化集团化管理的架构，充分整合内部资源，加强与资本市场的交流沟通，形成了较为完善、相互制衡、相互协调的公司治理体系。公司董事会致力于治理结构和机制的不断完善，构建了较为完善的治理体系，并积极推动和实现了集团一体化管理架构下的子公司治理方案，同时通过各种制度保障和实际行动，积极建立了董事会和管理层之间的桥梁，为董事、监事履职创造条件，保障了董事、监事对公司事务的知情权。
                </p>
                <p>太平洋保险以“做一家负责任的保险公司”为使命，以“诚信天下，稳健一生，追求卓越”为企业核心价值观，将企业社会责任全面融入公司的商业模式中，为客户、股东、员工、行业、社会、环境等利益相关方创造共享价值，受到广泛赞誉，连续六年获中国企业社会责任榜“杰出企业奖”。</p>
              </div>
            </div> -->
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
            <!-- <div class="sub-item">
              <h3>合作伙伴</h3>
              <div style="padding-top:0;">
                <el-row>
                  <el-col :span="3" v-for="(item, index) in bParterList" :key="index">
                    <el-card :body-style="{ padding: '0px', paddingBottom: '40px'  }">
                      <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                        <img :src="item.imgUrl" style="width:100%;height:auto;">
                      </div>
                      <div class="title">{{item.name}}</div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="sub-item">
              <h3 class="sub-h3">合作媒体</h3>
              <div style="padding-top:0;">
                <el-row>
                  <el-col :span="3" v-for="(item, index) in cParterList" :key="index">
                    <el-card :body-style="{ padding: '0px', paddingBottom: '40px'  }">
                      <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                        <img :src="item.imgUrl" style="width:100%;height:auto;">
                      </div>
                      <div class="title">{{item.name}}</div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="sub-item">
              <h3>合作剧场院团</h3>
              <div style="padding-top:0;">
                <el-row>
                  <el-col :span="3" v-for="(item, index) in dParterList" :key="index">
                    <el-card :body-style="{ padding: '0px', paddingBottom: '40px'  }">
                      <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                        <img :src="item.imgUrl" style="width:100%;height:auto;">
                      </div>
                      <div class="title">{{item.name}}</div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div> -->
          </div>
        </home-item-solt>
        <!-- <div class="block parter-div anchor-item">
          <div class="header">
            <h3 class="title">{{$t("partners")}}</h3>
          </div>
          <div class="sub-item" style="margin-bottom: 50px;">
            <h3 class="sub-h3">首席合作伙伴</h3>
            <div style="border-top: 1px solid #80808030;padding-top:40px;">
              <img src="static/image/sisivc/hezuo/1-1.jpg">
              <h3>中国太平洋保险（集团）股份有限公司</h3>
              <p>中国太平洋保险（集团）股份有限公司（以下简称“太平洋保险”、“公司”）是在1991年5月13日成立的中国太平洋保险公司的基础上组建而成的保险集团公司，总部设在上海，是国内领先的“A+H”股上市综合性保险集团。</p>
              <p>太平洋保险以打造“在你身边的一流保险金融服务集团”为愿景，坚持“以客户需求为导向，专注保险主业，推动和实现可持续的价值增长”的经营理念，不断完善保险产业链全牌照布局，旗下拥有寿险、产险、资产管理、在线服务、养老保险、健康保险、农业保险等专业子公司，建立了覆盖全国的营销网络和多元化服务平台，提供全方位风险保障解决方案、投资理财和资产管理服务。
              </p>
              <p>2015年，太平洋保险实现营业收入达2472.02亿元，其中保险业务收入2033.05亿元；净利润达177.28亿元。2015年末，总资产达9238.43亿元，净资产达1333.36亿元，客户数9435.6万。截至2015年末，公司拥有近10万名员工和近60万名保险营销员。公司连续第五年入选财富世界500强榜单，排名第328位。在全球最大的品牌咨询公司Interbrand发布的“最佳中国品牌价值排行榜”中，公司品牌价值为241.39亿元，位列行业前三。
              </p>
              <p>  太平洋保险推进“以客户需求为导向”的战略转型，紧密围绕转型三大目标，坚持问题导向，推动转型成果落地：在关注客户需求方面，实现精准销售和精细服务；在改善客户界面方面，积极运用新技术，确保中后台支持前端；在提升客户体验方面，大力推动产品创新，将优质、便捷的保险服务带到客户身边，得到社会各界的广泛认同。
              </p>
              <p>太平洋保险严格遵守法律法规以及监管部门颁布的各项要求，结合公司实际情况，不断完善公司治理结构。公司通过不断优化集团化管理的架构，充分整合内部资源，加强与资本市场的交流沟通，形成了较为完善、相互制衡、相互协调的公司治理体系。公司董事会致力于治理结构和机制的不断完善，构建了较为完善的治理体系，并积极推动和实现了集团一体化管理架构下的子公司治理方案，同时通过各种制度保障和实际行动，积极建立了董事会和管理层之间的桥梁，为董事、监事履职创造条件，保障了董事、监事对公司事务的知情权。
              </p>
              <p>太平洋保险以“做一家负责任的保险公司”为使命，以“诚信天下，稳健一生，追求卓越”为企业核心价值观，将企业社会责任全面融入公司的商业模式中，为客户、股东、员工、行业、社会、环境等利益相关方创造共享价值，受到广泛赞誉，连续六年获中国企业社会责任榜“杰出企业奖”。</p>
            </div>
          </div>
          <div class="sub-item">
            <h3 class="sub-h3">白银级赞助</h3>
            <div style="padding-top:0;">
              <el-row>
                <el-col :span="6" v-for="(item, index) in aParterList" :key="index">
                  <el-card :body-style="{ padding: '0px', paddingBottom: '40px' }">
                    <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                      <img :src="item.imgUrl" style="width:100%;height:auto;">
                    </div>
                    <div class="title">{{item.name}}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="sub-item">
            <h3>合作伙伴</h3>
            <div style="padding-top:0;">
              <el-row>
                <el-col :span="3" v-for="(item, index) in bParterList" :key="index">
                  <el-card :body-style="{ padding: '0px', paddingBottom: '40px'  }">
                    <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                      <img :src="item.imgUrl" style="width:100%;height:auto;">
                    </div>
                    <div class="title">{{item.name}}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="sub-item">
            <h3 class="sub-h3">合作媒体</h3>
            <div style="padding-top:0;">
              <el-row>
                <el-col :span="3" v-for="(item, index) in cParterList" :key="index">
                  <el-card :body-style="{ padding: '0px', paddingBottom: '40px'  }">
                    <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                      <img :src="item.imgUrl" style="width:100%;height:auto;">
                    </div>
                    <div class="title">{{item.name}}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="sub-item">
            <h3>合作剧场院团</h3>
            <div style="padding-top:0;">
              <el-row>
                <el-col :span="3" v-for="(item, index) in dParterList" :key="index">
                  <el-card :body-style="{ padding: '0px', paddingBottom: '40px'  }">
                    <div class="logo" style="background-image: url('static/image/sisivc/hezuo/0.png');">
                      <img :src="item.imgUrl" style="width:100%;height:auto;">
                    </div>
                    <div class="title">{{item.name}}</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <m-anchor></m-anchor> -->
    <video src="static/image/sisivc/SISIVC.mp4" width="100%" height="auto" controls="controls" poster="static/image/sisivc/poster.jpg" >您的浏览器不支持 video 标签。</video>
  </div>
</template>
<script type="text/ecmascript-6">
import {kpiLogin, kpiHome} from 'apx'
import MAnchor from 'components/m-anchor/m-anchor'
import MemberContainer from 'components/commonComponents/member-container'
import MemberItem from 'components/commonComponents/member-item'
import HomeItemSolt from 'components/home/home-item-solt'
export default {
  components: {
    MAnchor,
    MemberContainer,
    MemberItem,
    HomeItemSolt
  },
  data() {
    return {
      carouselHeight: '',
      carousellist: [
        {desp:'你好呀', imageUrl: 'static/image/home/zs/carousel_01.jpeg', targetUrl: ''},
        {desp:'两只老虎爱跳舞', imageUrl: 'static/image/home/zs/carousel_03.jpeg', targetUrl: ''},
        {desp:'小屋子乖乖拔萝卜', imageUrl: 'static/image/home/zs/carousel_02.jpeg', targetUrl: ''},
        {desp:'这首歌很不多哦', imageUrl: 'static/image/home/zs/carousel_04.jpeg', targetUrl: ''},
        {desp:'童年你的童年我等童年', imageUrl: 'static/image/home/zs/carousel_05.jpeg', targetUrl: ''},
      ],
      carousellistIndex: 0,
      isFixed: false,
      newsList: [
        {
          title: '2018上海艾萨克·斯特恩国际小提琴比赛获奖名单',
          imageUrl: 'static/image/sisivc/news/1.png',
          date: '2019-10-23',
          awardList: [
            {
              award: '一等奖',
              user: '周颖',
              location: '美国'
            },
            {
              award: '二等奖',
              user: '奥尔加·什劳布科娃',
              location: '捷克'
            },
            {
              award: '三等奖',
              user: '戴安娜·季申科',
              location: '乌克兰'
            },
            {
              award: '一等奖',
              user: '周颖',
              location: '美国'
            },
            {
              award: '二等奖',
              user: '奥尔加·什劳布科娃',
              location: '捷克'
            },
            {
              award: '三等奖',
              user: '戴安娜·季申科',
              location: '乌克兰'
            }
          ]
        },
        {
          title: '决赛入围选手名单',
          imageUrl: 'static/image/sisivc/news/2.png',
          date: '2019-10-03',
          awardList: []
        },
        { title: '评委增补公告', imageUrl: 'static/image/sisivc/news/3.png', date: '2019-10-03', awardList: [] },
        { title: '半决赛入围选手名单', imageUrl: 'static/image/sisivc/news/4.png', date: '2019-10-03', awardList: [] },
        { title: '四分之一决赛选手出场顺序', imageUrl: 'static/image/sisivc/news/5.png', date: '2019-10-09', awardList: [] },
      ],
      awardItemHeight: 50,
      awardUserList: [
        { awardName: '一等奖', userName: '周颖', vedioUrl: '', imgUrl: 'static/image/sisivc/award/1.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '美国'},
        { awardName: '二等奖', userName: '奥尔加·什劳布科娃', vedioUrl: '', imgUrl: 'static/image/sisivc/award/2.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '捷克'},
        { awardName: '三等奖', userName: '戴安娜·季申科', vedioUrl: '', imgUrl: 'static/image/sisivc/award/3.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '俄罗斯和瑞士'},
        { awardName: '四等奖', userName: '陈家怡', vedioUrl: '', imgUrl: 'static/image/sisivc/award/4.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '美国'},
        { awardName: '五等奖', userName: '丁章媛', vedioUrl: '', imgUrl: 'static/image/sisivc/award/5.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '美国'},
        { awardName: '六等奖', userName: '唐韵', vedioUrl: '', imgUrl: 'static/image/sisivc/award/6.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '美国'},
        { awardName: '最佳中国作品演绎奖 —— “太平洋之星”', userName: '奥尔加·什劳布科娃', vedioUrl: '', imgUrl: 'static/image/sisivc/award/7.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '捷克'},
        { awardName: '艾萨克·斯特恩奖 —— 人文精神奖', userName: '周颖', vedioUrl: '', imgUrl: 'static/image/sisivc/award/0.jpg', coverImgUrl: 'static/image/sisivc/award/0.jpg', country: '美国'},
      ],
      awardUserImgUrl: '',
      // awardUserImgUrl: 'static/image/sisivc/award/0.jpg',
      nowClickAward: '',
      finalObj: [],
      judgesListSource: [
        {name: '大卫·斯特恩', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '徐惟聆', country: '中国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '扎哈尔·布朗', country: '扎哈尔·布朗', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '马丁·坎贝尔-怀特', country: '英国', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
        {name: '格伦·迪克特罗', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '奥古斯丁·杜梅', country: '法国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '丹尼尔·海菲兹', country: '美国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '埃马纽埃尔·翁德雷', country: '法国', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
        {name: '斯雷滕·克里斯蒂奇', country: '塞尔维亚/德国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '李伟纲', country: '美国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '吕思清', country: '中国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '多拉·施瓦茨贝尔格', country: '奥地利', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
      ],
      artistsListSource: [
        {name: '大卫·斯特恩', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '徐惟聆', country: '中国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '扎哈尔·布朗', country: '扎哈尔·布朗', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '马丁·坎贝尔-怀特', country: '英国', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
        {name: '格伦·迪克特罗', country: '美国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
      ],
      playersListSource: [
        {name: '斯雷滕·克里斯蒂奇', country: '塞尔维亚/德国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '李伟纲', country: '美国', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '吕思清', country: '中国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '多拉·施瓦茨贝尔格', country: '奥地利', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '菲利普·塞策', country: '美国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '马克西姆·文格洛夫', country: '摩洛哥', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
        {name: '俞丽拿', country: '中国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '多拉·施瓦茨贝尔格', country: '奥地利', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '菲利普·塞策', country: '美国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '马克西姆·文格洛夫', country: '摩洛哥', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
        {name: '俞丽拿', country: '中国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
        {name: '多拉·施瓦茨贝尔格', country: '奥地利', imageUrl: 'static/image/sisivc/pingwei/2.jpg'},
        {name: '菲利普·塞策', country: '美国', imageUrl: 'static/image/sisivc/pingwei/3.jpg'},
        {name: '马克西姆·文格洛夫', country: '摩洛哥', imageUrl: 'static/image/sisivc/pingwei/4.jpg'},
        {name: '俞丽拿', country: '中国', imageUrl: 'static/image/sisivc/pingwei/1.jpg'},
      ],
      judgesList: [],
      artistsList: [],
      playersList: [],
      animationName: '',
      parterList: [],
      aParterList: [
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/2-1.jpg'},
      ],
      bParterList: [
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/huoban/1.jpg'},
        {name: '中国有限公司', imgUrl: 'static/image/sisivc/hezuo/huoban/2.jpg'},
        {name: '中国有', imgUrl: 'static/image/sisivc/hezuo/huoban/3.jpg'},
        {name: '中源有限公司', imgUrl: 'static/image/sisivc/hezuo/huoban/4.jpg'},
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/huoban/5.jpg'},
        {name: '中有限公司', imgUrl: 'static/image/sisivc/hezuo/huoban/6.jpg'},
        {name: '中国海外公司', imgUrl: 'static/image/sisivc/hezuo/huoban/7.jpg'},
        {name: '中国海外能源有司', imgUrl: 'static/image/sisivc/hezuo/huoban/8.jpg'}
      ],
      cParterList: [
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/1.jpg'},
        {name: '中国海外公司', imgUrl: 'static/image/sisivc/hezuo/meiti/2.jpg'},
        {name: '限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/3.jpg'},
        {name: '中国海外能公司', imgUrl: 'static/image/sisivc/hezuo/meiti/4.jpg'},
        {name: '中有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/5.jpg'},
        {name: '中源有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/6.jpg'},
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/7.jpg'},
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/8.jpg'},
        {name: '中国有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/9.jpg'},
        {name: '中国海外限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/10.jpg'},
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/meiti/11.jpg'},
        {name: '中国海外能源', imgUrl: 'static/image/sisivc/hezuo/meiti/12.jpg'},
      ],
      dParterList: [
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/juyuan/1.jpg'},
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/juyuan/2.jpg'},
        {name: '中国海外能源有限公司', imgUrl: 'static/image/sisivc/hezuo/juyuan/3.jpg'},
      ],
    }
  },
  created() {
    // this._login()
    this._getData()
    this.judgesList = this.judgesListSource.slice(0, 8)
    this.playersList = this.judgesListSource.slice(0, 8)
    this.artistsList = this.judgesListSource.slice(0, 8)
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
    this.imgLoad()
    this.awardItemLoad()
    // 2、挂载 reisze 事件 → 屏幕缩放时监听宽度变化
    window.onresize = () => {
      return (() => {
        this.carouselHeight = this.$refs.carouselHeight[0].height
        this.awardItemHeight = parseInt(this.$refs.awardImage.height - 9) / 8
      })()
    }
    /**通过给变成固定定位的元素添加一个同等高度的父元素，防止该元素变成固定定位时，脱离文档流导致的页面抖动 */
    // this.tabsHeight = this.$refs.elTabs.offsetHeight;
    window.addEventListener("scroll", this.handleScroll);

    // let height = document.querySelector('.award-div .el-row').offsetHeight;
    // let size = this.awardUserList.length
    // let row = document.querySelector('.award-div >>>.el-collapse-item__header')
    // rowHeight = (height - 1 - size) / size
    // console.log('height--->', height)

  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    awardItemLoad() {
      this.$nextTick(() => {
        let that = this
        setTimeout(() => {
          that.awardItemHeight = parseInt(that.$refs.awardImage.height - 9) / 8
        }, 0)
      })
    },
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
    goAnchor(selector, index) {

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
    _gotoDetails(memberId) {
      debugger
      this.$router.push({path: '/memberDetail', query: {memberId: memberId}})
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

        this.carousellist = tempBanners.map(el => {
          return {
            desp: el.title,
            imageUrl: el.bannerUrl,
            targetUrl: el.externalLink
          }
        })

        this.newsList = tempNews.map(el => {
          return {
            title: el.title,
            imageUrl: el.image,
            targetUrl: el.externalLink,
            date: el.createOn,
            awardList: [],
          }
        })

        this.awardUserList = tempWinners.map(el => {
          return {
            awardName: el.awardName,
            userName: el.playerName,
            imgUrl: el.winnerShow,
            coverImgUrl: el.winnerShow,
            country: el.playerNationality,
          }
        })
        console.log('this.awardUserList--->', this.awardUserList)
        this.finalObj = this.awardUserList.splice(this.awardUserList.length - 1, 1)
        console.log('this.finalObj--->', this.finalObj[0].imgUrl)
        this.$nextTick(() => {
          this.awardUserImgUrl = this.finalObj[0].imgUrl
          this.awardItemLoad()
        })

        this.judgesListSource = tempJurys.map(el => {
          return {
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        })

        this.playersListSource = tempPlayers.map(el => {
          return {
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        })

        this.artistsListSource = tempArtists.map(el => {
          return {
            name: el.userName,
            imageUrl: el.image,
            country: el.nationality,
          }
        })

        this.parterList = tempPartnerVos


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
    .list
      @extend .flex
      @extend .flex-row
      @extend .flex-center
      width 100%
      height 60px
      p
        @extend .pointer
        color $color-text-black_11
        font-size $font-size-level_3
        margin 0 22px
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
    .block
      width: 1140px
      margin: 0 auto
      padding: 50px 0 0
      .header
        @extend .flex
        @extend .flex-column
        @extend .flex-end
        align-items: start;
        width 100%
        position relative
        font-family Helvetica
        .title
          color: #1e2022;
          font-size: 24px;
          font-weight: bold;
        .little
          font-size: 12px;
          color: #808080;
          margin-bottom: 20px;
          margin-top: -20px;
          padding-top: 20px;
        .more
          @extend .flex
          @extend .flex-row
          @extend .flex-end
          height 16px
          color $color-text-gray_2
          font-size $font-size-level_2
          position absolute
          right 0
          bottom: 0
          .arrow
            width 6px
            height 6px
            background-size 100% 100%
            background-image: url('~static/image/home/zs/more_arrow.png')
            margin-left 4px
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
            color: #a0a0a1;
            font-size: 12px;
          .button
            color: #a0a0a1;
            font-size: 12px;
            margin: 0;
            text-align: right;
        .left
          // .award-list
          //   border: none;
          //   border-top: 1px solid rgba(128, 128, 128, 0.19)!important;
          //   border-top-left-radius: 0;
          //   border-top-right-radius: 0;
          //   box-shadow: none;
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
        .vedio-btn
          display: block;
          width: 60px;
          height: 60px;
          font-size: 12px;
          color: #222;
          padding-top: 35px;
          background-image: url('~static/image/sisivc/vedio.png');
          background-size: 30px 30px;
          background-position: top left;
          background-repeat: no-repeat;
        .vedio-btn:hover
          background-image: url('~static/image/sisivc/vedio2.png');
          color: #193A80;
    .news-div
      .left
        .award-list
          border: none;
          border-top: 1px solid rgba(128, 128, 128, 0.19)!important;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          box-shadow: none;
      .right
        .el-card
          margin-bottom: 30px!important;
    .award-div
      .el-row
        width: 100%
        .left
          .el-collapse
            border: none;
            border-top: 1px solid rgb(160, 160, 161);
            .el-collapse-item
              .title-name
                border-bottom: none;
                font-size: 14px;
                font-weight: bold;
                color: #222;
              >>>.el-collapse-item__header__arrow
                display: none;
              >>>.el-collapse-item__header
                padding-left: 0;
                height: 12.5%;
                min-height: 50px;
                position: relative; 
                border-bottom: none;
                color: #000000;
                border-bottom: none;
                .el-col
                  padding-right: 5px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
              // >>>.el-collapse-item__header:after
              // >>>.el-collapse-item__header:before 
              //   position: absolute;
              //   top: 50%;
              //   content: " ";
              //   right: 20px;
              //   margin-top: -1px;
              //   width: 10px;
              //   height: 2px;
              //   background-color: #999;
              // >>>.el-collapse-item__header:before 
              //   -webkit-transform: rotate(90deg);
              //   transform: rotate(90deg);
              //   -webkit-transition: -webkit-transform .25s ease-in-out;
              //   transition: -webkit-transform .25s ease-in-out;
              //   transition: transform .25s ease-in-out;
              //   transition: transform .25s ease-in-out,-webkit-transform .25s ease-in-out;
              >>>.el-collapse-item__content
                padding: 0;
            .el-collapse-item
              border-bottom: 1px solid rgb(160, 160, 161);
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
                color: #000;
              >>>.el-collapse-item__wrap
                display: none
              // >>>.el-collapse-item__header:before
              //   -webkit-transform: rotate(0deg);
              //   -ms-transform: rotate(0deg);
              //   transform: rotate(0deg);
              // >>>.el-collapse-item__header:after 
              //   -webkit-transform: rotate(0deg);
              //   -ms-transform: rotate(0deg);
              //   transform: rotate(0deg);
              // >>>.el-collapse-item__wrap
              //   background-color: #fff;
              //   border-bottom: none;
    // .member-div
    //   .el-row
    //     margin-left: -20px;
    //     margin-right: -20px;
    //     transition: height .3s ease-in-out;
    //     .el-card
    //       margin-bottom: 40px;
    //       padding-left: 20px;
    //       padding-right: 20px;
    //       border: none;
    //       border-radius: 0;
    //       box-shadow: none;
    //     .more-div
    //       background-color: #222;
    //       width: 60px;
    //       height: 60px;
    //       margin: 0 auto;
    //       line-height: 60px;
    //       border-radius: 30px;
    //       text-align: center;
    //       margin-top: 0;
    //       margin-bottom: 30px;
    //     .rotate
    //       -webkit-transform: rotate(180deg);
    //       -moz-transform: rotate(180deg);
    //       -o-transform: rotate(180deg);
    //       -ms-transform: rotate(180deg);
    //       transform: rotate(180deg);
    //       -webkit-transition: -webkit-transform .25s ease-in-out;
    //       transition: -webkit-transform .25s ease-in-out;
    //       transition: transform .25s ease-in-out;
    //       transition: transform .25s ease-in-out,-webkit-transform .25s ease-in-out;
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
          font-size: 13px;
          margin: 1.6rem 0;
          line-height: 20px;
          color: #4c4948;
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
              font-size: 13px;
              color: #4c4948;
.consultant
  @extend .flex
  @extend .flex-row
  flex-wrap wrap
  width 1200px
  height 400px
  padding 5px 38px
  // background-color $color-back-white_0
  border-radius 3px
  color $color-text-black_0
  font-size $font-size-level_4
  .consultantCard
    height 180px
    width 360px
    position relative
    background-size 100% 100%
  .mcard
    margin-right 12px
  .bcard
    margin-right 0px
.serviceCard
  @extend .flex-column
  @extend .flex-center
  width 210px
  height 200px
  background-color $color-back-white_0
  border-radius 105px
  .logo
    width 60px
    height 60px
    background-size 100% 100%
  .title
    color $color-text-gray_15
    font-size 15px
    margin-top 10px
    line-height 18px
    height 36px
    text-align center
.choicesCard
  width 285px
  height 360px
  background-color $color-back-white_0
  border 1px solid $color-layer-gray_3
  overflow hidden
  border-radius 3px
  .logo
    width 100%
    height 150px
    background-size 100% 100%
  .middle
    @extend .flex
    @extend .flex-column
    @extend .flex-around
    @extend .flex-top
    width 100%
    height 180px
    padding 13px
    p
      color $color-text-black_0
      font-size $font-size-level_3
      height 17px
      ellipsis(1)
  .more
    @extend .flex
    @extend .flex-row
    @extend .flex-end
    height 30px
    width 100%
    padding 0 13px
    color $color-back-gray_1
    font-size $font-size-level_1
.whereCard
  width 285px
  height 150px
  background-size 100% 100%
.videoCard
  width 285px
  height 260px
  background-color $color-back-white_0
  border 1px solid $color-layer-gray_3
  overflow hidden
  border-radius 3px
  .pic
    width 100%
    height 160px
    background-size 100% 100%
    border-bottom 1px solid $color-layer-gray_3
    position relative
    .time
      color #FFFFFF
      font-size $font-size-level_3
      position absolute
      right 13px
      bottom 10px
  .video-des
    @extend .flex
    @extend .flex-column
    @extend .flex-between
    width 100%
    height calc(100% - 160px)
    padding 12px
    .des
      color $color-text-black_11
      font-size $font-size-level_3
      ellipsis(2)
      line-height 18px
      height 36px
    .btn
      background-color $color-back-yellow_1
      color $color-back-yellow_2
      font-size $font-size-level_1
      border-radius 3px
      padding 4px
    .btn-blue
      background-color #C9E4FF
      color #5989D1
      font-size $font-size-level_1
      border-radius 3px
      padding 4px
.boardCard
  width 385px
  height 470px
  border-top 3px solid $color-back-blue_0
  background-color $color-back-white_0
  border-left 1px solid $color-layer-gray_3
  border-right 1px solid $color-layer-gray_3
  border-bottom 1px solid $color-layer-gray_3
  overflow hidden
  border-radius 3px
  padding 0 18px
  .boardCard-header
    @extend .flex
    @extend .flex-row
    @extend .flex-start
    color $color-text-black_13
    font-size $font-size-level_4
    width 100%
    height 60px
  .boardItem
    @extend .flex
    @extend .flex-row
    @extend .flex-between
    width 100%
    height 80px
    border-bottom 1px solid $color-layer-gray_3
    .logo
      width 60px
      height 60px
      background-size 100% 100%
    .des
      width calc(100% - 75px)
      height 40px
      line-height 20px
      color $color-text-black_14
      font-size $font-size-level_3
      ellipsis(2)
      word-break keep-all
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
@media (min-width: 1400px) {
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
