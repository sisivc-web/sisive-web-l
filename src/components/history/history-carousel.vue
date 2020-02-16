<template>
  <el-carousel :interval="15000" arrow="always" :height="carouselHeight + 'px'" indicator-position="none"> 
    <el-carousel-item v-for="(item, index) in data" :key="index" v-if="index%4 == 0">
      <!-- <h3>{{ item }}</h3> -->
      <el-row :gutter="10"  v-if="index%4 == 0" style="height:100%;">
        <el-col :span="6" style="height:100%;">
            <div class="grid-content" :style="{background:index < data.length ? data[index].color : item.bgImg, backgroundSize: '100% auto'}">
                <div v-if="index < data.length" class="history-item">
                    <p>{{data[index].year}}</p>
                    <p>{{data[index].title}}</p>
                    <el-button type="text" class="button">详细信息</el-button>
                </div>
            </div>
        </el-col>
        <el-col :span="6" style="height:100%;">
            <div class="grid-content" :style="{background:index+1 < data.length ? data[index+1].color : item.bgImg, backgroundSize: '100% auto'}">
                <div v-if="index+1 < data.length" class="history-item">
                    <p>{{data[index+1].year}}</p>
                    <p>{{data[index+1].title}}</p>
                    <el-button type="text" class="button">详细信息</el-button>
                </div>
            </div>
        </el-col>
        <el-col :span="6" style="height:100%;">
            <div class="grid-content" :style="{background:index+2 < data.length ? data[index+2].color : item.bgImg, backgroundSize: '100% auto'}">
              <div v-if="index+2 < data.length" class="history-item">
                <p>{{data[index+2].year}}</p>
                <p>{{data[index+2].title}}</p>
                <el-button type="text" class="button" @click="goHistoryDetail()">详细信息</el-button>
              </div>  
            </div>
        </el-col>
        <el-col :span="6" style="height:100%;">
            <div class="grid-content" :style="{background:index+3 < data.length ? data[index+3].color : item.bgImg, backgroundSize: '100% auto'}">
              <div v-if="index+3 < data.length" class="history-item">
                <p>{{data[index+3].year}}</p>
                <p>{{data[index+3].title}}</p>
                <el-button type="text" class="button">详细信息</el-button>
              </div>  
            </div>
        </el-col>
      </el-row>
    </el-carousel-item>
  </el-carousel>
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
            data: data,
        }
    },

    computed: {
      carouselHeight: function() {
        console.log('computed')
        let width = document.body.clientWidth
        let height = Math.floor(width * 330 / 750)
        return height
      },
    },
    methods: {
        goHistoryDetail() { 
          this.$router.push({path: '/historyDetail', query: {newsId: 3}})
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
  /* .el-carousel__arrow--left {
    left: -52px;
  }
  .el-carousel__arrow--right {
    left: -52px;
  } */
  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
  .history-item {
    color: #fff;
    padding: 20px;
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
    bottom: 25px;
  }
</style>