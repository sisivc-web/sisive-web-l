<template>
  <div>
    <div :class="['sub-nav', isFixed ? 'subNavFixed' : '']">
        <ul>
            <li v-for="(item, index) in subNavList" :key="index" v-if="item != ''">
              <a :class="{active: active===index}" @click="scrollTo(index)">{{item}}</a>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentDivClass: {
        type: String,
        default: 'tempcontent'
    },
    anchorItem: {
        type: String,
        default: 'anchor-item'
    },
    subNavList: {
        type: Array,
        default: () => []
    },
  },
  data() {
    return {
      active: 0, // 当前激活的导航索引
      isFixed: false,
    }
  },
  mounted() {
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
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(`.${this.contentDivClass} div.${this.anchorItem}`)
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前 offsetTop
      let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 10 时，实现吸顶效果
      this.isFixed = scrollTop > 10 ? true : false
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop >= offsetTopArr[n] - 112) {
          navIndex = n
        }
      }
      this.active = navIndex
    },
    // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      // const targetOffsetTop = document.querySelector(`.${this.contentDivClass} div.${this.anchorItem}:nth-child(${index + 1})`).offsetTop
      let allSelector = document.querySelectorAll(`.${this.contentDivClass} div.${this.anchorItem}`)
      const targetOffsetTop = allSelector[index].offsetTop
      //获取页面滚动条的高度
      // 获取当前 offsetTop
      let scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop - 112
          document.documentElement.scrollTop = scrollTop - 112
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown)
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop - 112
          document.documentElement.scrollTop = scrollTop - 112
          requestAnimationFrame(smoothUp)
        }
      }
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
  ul
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 1140px;
    padding-right: 240px;
    padding-left: 240px;
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
        top: 70px;
    }
    100% {
        top: 70px;
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
  .sub-nav ul {
    width: 1560px;
    min-width: 1140px;
  }
}
@media (min-width: 1500px) and (max-width: 1920px) {
  .sub-nav ul {
    width: calc(100% - 360px);
    min-width: 1140px;
  }
}
</style>
