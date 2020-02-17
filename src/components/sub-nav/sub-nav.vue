<template>
  <div>
    <div :class="['sub-nav', isFixed ? 'subNavFixed' : '']">
      <div class="sub-nav-container">
        <ul>
            <li v-for="(item, index) in subNavList" :key="index">
                <a :class="{active: active===index}" @click="handleChange(item.id, index)">{{item.name}}</a>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subNavList: {
      type: Array,
      default: () => ['content-0', 'ctttt-1', 'conthhhent-2', 'content-3', 'content-4']
    },
    nowClickYear: {
      type: [Number, String]
    }
  },
  data() {
    return {
      active: -1, // 当前激活的导航索引
      isFixed: false,
    }
  },
  mounted() {
    this.subNavList.forEach((el, index) => {
      this.active = el.id === this.nowClickYear ? index : -1
    })
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll, false)
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    // 滚动监听器
    onScroll() {
      // 获取当前 offsetTop
      let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 10 时，实现吸顶效果
      this.isFixed = scrollTop > 10 ? true : false
    },
    handleChange(item, index) {
      this.active = index
      this.$emit('changeData', item)      
    } 
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/base'
.sub-nav
  width: 100%;
  height: 42px;
  line-height: 42px;
  background-color: #222;
  // position: fixed;
  // top: 70px;
  // z-index: 997;
  -webkit-animation: hdnav2-show1 .3s;
  -moz-animation: hdnav2-show1 .3s;
  -o-animation: hdnav2-show1 .3s;
  animation: hdnav2-show1 .3s;
  .sub-nav-container
    margin: 0 auto;
    width: 1140px;
    padding-right: 240px;
    padding-left: 240px;
    overflow: hidden;
    ul
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      justify-content: start;
      li
        margin-right: 90px
        a
          cursor: pointer;
          color: #808080;
          font-size:14px;
        a.active, a:hover
          color: #fff
  /* 内容区的样式 */
  .tempcontent {
    background-color: white;
    width: 500px;
  }
  .tempcontent div {
    width: 100%;
    height: 600px;
    font-size: 36px;
    padding: 20px;
    background-color: #7ec384;
  }
  .tempcontent div:nth-child(2n) {
    background-color: #847ec3;
  }
  /* 导航栏的样式 */
  .navs {
    position: fixed;
    top: 80px;
    left: 700px;
    background-color: #efefef;
  }
  .navs li {
    padding: 0 20px;
    line-height: 1.6;
    font-size: 24px;
  }
  /* 当导航被点亮后改变颜色 */
  .navs .active{
    color: #847ec3;
    background-color: #e2e2e2;
  }
.subNavFixed 
  position: fixed;
  top: 70px;
  z-index: 997;
  -webkit-animation: hdnav2-show2 .3s;
  -moz-animation: hdnav2-show2 .3s;
  -o-animation: hdnav2-show2 .3s;
  animation: hdnav2-show2 .3s;
  display: block!important
@-webkit-keyframes hdnav2-show1 {
    0% {
        top: 70px
    }
    100% {
        top: 70px
    }
}
@keyframes hdnav2-show1 {
    0% {
      top: 70px
    }
    100% {
      top: 70px
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
  .sub-nav .sub-nav-container {
    width: 1560px;
    min-width: 1140px;
  }
}
@media (min-width: 1500px) and (max-width: 1920px) {
  .sub-nav .sub-nav-container {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
