<template>
  <div style="position:relative">
    <el-carousel ref="historyCarousel" arrow="never" :interval="15000" :height="carouselHeight + 'px'" indicator-position="none"> 
      <el-carousel-item v-for="(item, index) in data" :key="index" v-if="index%4 == 0">
        <!-- <h3>{{ item }}</h3> -->
        <el-row :gutter="10"  v-if="index%4 == 0" style="height:100%;">
          <el-col :span="6" style="height:100%;">
              <div class="grid-content" :style="{background:index < data.length ? data[index].themeColor : item.bgImg, backgroundSize: '100% auto'}">
                  <div v-if="index < data.length" class="history-item">
                      <p>{{data[index].year}}</p>
                      <p>{{data[index].competitionName}}</p>
                      <el-button type="text" class="button">详细信息</el-button>
                  </div>
              </div>
          </el-col>
          <el-col :span="6" style="height:100%;">
              <div class="grid-content" :style="{background:index+1 < data.length ? data[index+1].themeColor : item.bgImg, backgroundSize: '100% auto'}">
                  <div v-if="index+1 < data.length" class="history-item">
                      <p>{{data[index+1].year}}</p>
                      <p>{{data[index+1].competitionName}}</p>
                      <el-button type="text" class="button">详细信息</el-button>
                  </div>
              </div>
          </el-col>
          <el-col :span="6" style="height:100%;">
              <div class="grid-content" :style="{background:index+2 < data.length ? data[index+2].themeColor : item.bgImg, backgroundSize: '100% auto'}">
                <div v-if="index+2 < data.length" class="history-item">
                  <p>{{data[index+2].year}}</p>
                  <p>{{data[index+2].competitionName}}</p>
                  <el-button type="text" class="button" @click="goHistoryDetail(data[index+2].id)">详细信息</el-button>
                </div>  
              </div>
          </el-col>
          <el-col :span="6" style="height:100%;">
              <div class="grid-content" :style="{background:index+3 < data.length ? data[index+3].themeColor : item.bgImg, backgroundSize: '100% auto'}">
                <div v-if="index+3 < data.length" class="history-item">
                  <p>{{data[index+3].year}}</p>
                  <p>{{data[index+3].competitionName}}</p>
                  <el-button type="text" class="button" @click="goHistoryDetail()">详细信息</el-button>
                </div>  
              </div>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <div class="arrow-div" v-if="this.data.length > 4">
      <button type="button" class="el-carousel__arrow el-carousel__arrow--left" @click="prev"><i class="el-icon-arrow-left"></i></button>
      <button type="button" class="el-carousel__arrow el-carousel__arrow--right" @click="next"><i class="el-icon-arrow-right"></i></button>
    </div>
  </div>
</template>
<script>
var data = [
    {year:'2015',title:'上海艾萨克。斯特恩国际小提琴比赛',url:'www.baidu.com',color:'purple', bgImg:'url(static/image/sisivc/history/bg.png) no-repeat'},
    {year:'2016',title:'上海艾萨克。斯特恩国际小提琴比赛',url:'www.baidu.com',color:'red', bgImg:'url(static/image/sisivc/history/bg.png) no-repeat'},
    {year:'2017',title:'上海艾萨克。斯特恩国际小提琴比赛',url:'www.baidu.com',color:'blue', bgImg:'url(static/image/sisivc/history/bg.png) no-repeat'},
    {year:'2018',title:'上海艾萨克。斯特恩国际小提琴比赛',url:'www.baidu.com',color:'green', bgImg:'url(static/image/sisivc/history/bg.png) no-repeat'},
    {year:'2019',title:'上海艾萨克。斯特恩国际小提琴比赛',url:'www.baidu.com',color:'gray', bgImg:'url(static/image/sisivc/history/bg.png) no-repeat'},
    {year:'2020',title:'上海艾萨克。斯特恩国际小提琴比赛',url:'www.baidu.com',color:'yellow', bgImg:'url(static/image/sisivc/history/bg.png) no-repeat'},
]
export default {
    data() {
        return {
          // data: data,
          carouselHeight: 482,
        }
    },
    props: {
      data: {
          type: Array,
          default: []
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.computerHeight()
      })
      // 2、挂载 reisze 事件 → 屏幕缩放时监听宽度变化
      window.onresize = () => {
        return (() => {
          this.computerHeight()
        })()
      }
    },
    methods: {
      //计算轮播高度
      computerHeight() {
        let containerWidth = document.body.clientWidth
        let width = containerWidth >= 1920 ? 1560 : containerWidth > 1500 && containerWidth < 1920 ? containerWidth - 360 : 1140
        this.carouselHeight = Math.floor(width * 330 / 780)
      },
      prev() {
        this.$refs.historyCarousel.prev()
      },
      next() {
        this.$refs.historyCarousel.next()
      },
      goHistoryDetail(val) { 
        this.$router.push({path: '/historyDetail', query: {reviewId: val}})
      }
    }
}
</script>>

<style scoped>  
  .el-carousel {
    width: 1140px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
  }
  .el-carousel .grid-content {
    width:100%;
    height: 100%;
    position: relative;
  }
  .arrow-div 
    .el-carousel__arrow {
      width: 20px;
      height: 20px;
      background-color: #222222
    }
    .el-carousel__arrow--left {
      left: calc((100% - 1140px) / 2 - 50px);
    }
    .el-carousel__arrow--right {
      right: calc((100% - 1140px)/2 - 50px);
    }
  .history-item {
    color: #fff;
    padding: 10%;
  }
  .history-item p {
    font-size: 16px;
    padding-bottom: 10px;
    line-height: 22px;
  }
  .history-item .button {
    color: #193A80;
    background: #FFF;
    padding: 10px 15px;
    position:absolute;
    bottom: 10%;
  }
@media (min-width: 1920px)  {
  .el-carousel{
    width: 1560px!important;
    margin: 0 auto;
  }
  .arrow-div
    .el-carousel__arrow--left {
      left: calc((100% - 1560px) / 2 - 60px);
    }
    .el-carousel__arrow--right {
      right: calc((100% - 1560px)/2 - 60px);
    }
}
@media (min-width: 1500px) and (max-width: 1920px)  {
  .el-carousel{
    width: calc(100% - 360px);
    min-width: 1140px;
  }
  .arrow-div
    .el-carousel__arrow--left {
      left: 130px
    }
    .el-carousel__arrow--right {
      right: 130px
    }
}
@media (max-width: 1240px)  {
  .arrow-div
    .el-carousel__arrow--left {
      left: 15px;
    }
    .el-carousel__arrow--right {
      right: 15px
    }
}
</style>