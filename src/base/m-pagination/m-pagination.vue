<template>
  <ul class="control">
    <li class="prefix" @click="currentPage = currentPage - 1" v-show="showPrefix">&lt;</li>
    <li class="page" @click="currentPage = 1" v-show="currentGroup > 1">
      1
    </li>
    <li class="spot" v-show="currentGroup > 1">...</li>
    <li class="page" v-for="n in 5" :key="n" :class="{active: currentPage === (currentGroup-1)*5+n}" @click="currentPage = (currentGroup-1)*5+n" v-show="(currentGroup-1)*5+n <= maxPage">
      {{(currentGroup-1)*5+n}}
    </li>
    <li class="spot" v-show="currentGroup < maxGroup">...</li>
    <li class="page" @click="currentPage = value" v-show="currentGroup < maxGroup">
      {{value}}
    </li>
    <li class="next" @click="currentPage = currentPage + 1" v-show="showNext">&gt;</li>
  </ul>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    // 总页数
    value: {
      type: Number,
      default: 0
    }
  },
  watch: {
    value(val) {
      this.$emit('input', val)
    },
    currentPage(val) {
      this.currentGroup = Math.ceil(this.accDiv(val, 5))
      this.$emit('which', val)
    }
  },
  computed: {
    showPrefix() {
      return this.currentPage > 1
    },
    showNext() {
      return this.currentPage < this.maxPage
    },
    maxPage() {
      return this.value
    },
    maxGroup() {
      return Math.ceil(this.accDiv(this.value, 5))
    }
  },
  data() {
    return {
      currentPage: 1,
      currentGroup: 1
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/base"
@import "~common/stylus/variable"
.control
  @extend .flex-row
  @extend .flex-end
  height: 40px
  user-select: none
  .page
    @extend .flex-center
    @extend .pointer
    width: 40px
    height: 40px
    background-color: $color-back-gray_2
    color: $color-text-gray_6
    font-size: $font-size-level_3
    margin: 0 10px
    border-radius: 2px
  .active
    background-color: $color-back-blue_0 !important
    color: $color-text-gray_7 !important
  .spot
    @extend .flex-center
    width: 40px
    height: 40px
    color: $color-text-gray_6
    font-size: $font-size-level_3
    margin: 0 10px
  .prefix
    @extend .flex-center
    @extend .pointer
    width: 40px
    height: 40px
    background-color: $color-back-gray_2
    color: $color-text-gray_6
    font-size: $font-size-level_3
    margin-right: 10px
    border-radius: 2px
  .next
    @extend .flex-center
    @extend .pointer
    width: 40px
    height: 40px
    background-color: $color-back-gray_2
    color: $color-text-gray_6
    font-size: $font-size-level_3
    margin-left: 10px
    border-radius: 2px
</style>
