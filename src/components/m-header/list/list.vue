<template>
  <div class="contact list">
    <router-link :to="'/' + item.code"  v-for="(item, index) in menus" :key="index" v-if="item.code != 'Contact Us'" @click.native="event => navClick()">
      <span
        class="plate"
        :style="{color: color}"
      >{{item.menu}}
      </span>
    </router-link>
    <!-- <router-link to="/home">
      <span
        class="plate"
        :style="{color: color}"
      >{{$t("home")}}
      </span>
    </router-link>
    <router-link to="/currentmatch">
      <span
        class="plate"
        :style="{color: color}"
      >{{(new Date()).getFullYear()}} SISIVC
      </span>
    </router-link>
    <router-link to="/watch">
      <span
        class="plate"
        :style="{color: color}"
      >{{$t("view")}}
      </span>
    </router-link>
    <router-link to="/news">
      <span
        class="plate"
        :style="{color: color}"
      >{{$t("media")}}
      </span>
    </router-link>
    <router-link to="/historys">
      <span
        class="plate"
        :style="{color: color}"
      >{{$t("history")}}
      </span>
    </router-link>
    <router-link to="/about">
      <span
        class="plate"
        :style="{color: color}"
      >{{$t("aboutus")}}
      </span>
    </router-link> -->
    <a href="javascript:;" ref="contactUs" :class="{'router-link-active': isContactUs}">
    <span
      class="plate"
      :style="{color: color}"
      @click="goFootAnchor('#foot')"
      v-for="(item, index) in menus" 
      :key="index" 
      v-if="item.code === 'Contact Us'"
    >{{item.menu}}
    </span>
    </a>
    <span class="plate" @click="_changeLanguage" :style="{color: color}">{{$t("message.language")}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isContactUs: false
    }
  },
  methods: {
    _changeLanguage() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh_CN' : 'en'
      window.localStorage.setItem('immi_language', JSON.stringify(this.$i18n.locale))
      this.$emit("getNavList", true)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },
    goFootAnchor(selector) {
      var anchor =  document.querySelector(selector)
      document.documentElement.scrollTop = anchor.offsetTop - 200
      // 获取所有锚点元素
      var navList = document.querySelectorAll(`.contact.list a`)
      navList.forEach(el => {
        el.classList.length > 0 && el.classList.remove("router-link-active")
      });
      //联系我们亮
      this.isContactUs = true
    },
    navClick(event) {
      this.isContactUs = false
      // if(event.classList.length > 0) {
      //   document.documentElement.scrollTop = 0
      //   event.classList.add("router-link-active")
      // }
    }
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/base'
.list
  @extend .flex
  @extend .flex-row
  @extend .flex-between
  width: 100%;
  .plate
    @extend .pointer
    font-size: 14px
    color: #000000
a.router-link-active
  span
    color: #193A80 !important
    padding-bottom: 5px
    border-bottom: 1px solid #193A80 !important
</style>
